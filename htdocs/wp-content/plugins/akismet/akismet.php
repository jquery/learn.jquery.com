<?php
/**
 * @package Akismet
 */
/*
Plugin Name: Akismet
Plugin URI: http://akismet.com/
Description: Akismet checks your comments against the Akismet web service to see if they look like spam or not. You need an <a href="http://akismet.com/get/">API key</a> to use it. You can review the spam it catches under "Comments." To show off your Akismet stats just put <code>&lt;?php akismet_counter(); ?&gt;</code> in your template. See also: <a href="http://wordpress.org/extend/plugins/stats/">WP Stats plugin</a>.
Version: 2.4.0
Author: Automattic
Author URI: http://automattic.com/wordpress-plugins/
License: GPLv2
*/

/*
This program is free software; you can redistribute it and/or modify 
it under the terms of the GNU General Public License as published by 
the Free Software Foundation; version 2 of the License.

This program is distributed in the hope that it will be useful, 
but WITHOUT ANY WARRANTY; without even the implied warranty of 
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the 
GNU General Public License for more details. 

You should have received a copy of the GNU General Public License 
along with this program; if not, write to the Free Software 
Foundation, Inc., 51 Franklin St, Fifth Floor, Boston, MA  02110-1301  USA 
*/

define('AKISMET_VERSION', '2.4.0');

/** If you hardcode a WP.com API key here, all key config screens will be hidden */
if ( defined('WPCOM_API_KEY') )
	$wpcom_api_key = constant('WPCOM_API_KEY');
else
	$wpcom_api_key = '';

// Make sure we don't expose any info if called directly
if ( !function_exists( 'add_action' ) ) {
	echo "Hi there!  I'm just a plugin, not much I can do when called directly.";
	exit;
}

if ( $wp_db_version <= 9872 )
	include_once( dirname(__FILE__) . '/legacy.php' );

function akismet_init() {
	global $wpcom_api_key, $akismet_api_host, $akismet_api_port;

	if ( $wpcom_api_key )
		$akismet_api_host = $wpcom_api_key . '.rest.akismet.com';
	else
		$akismet_api_host = get_option('wordpress_api_key') . '.rest.akismet.com';

	$akismet_api_port = 80;
	add_action('admin_menu', 'akismet_config_page');
	add_action('admin_menu', 'akismet_stats_page');
	akismet_admin_warnings();
}
add_action('init', 'akismet_init');

function akismet_admin_init() {
	if ( function_exists( 'get_plugin_page_hook' ) )
		$hook = get_plugin_page_hook( 'akismet-stats-display', 'index.php' );
	else
		$hook = 'dashboard_page_akismet-stats-display';
	add_action('admin_head-'.$hook, 'akismet_stats_script');
}
add_action('admin_init', 'akismet_admin_init');

if ( !function_exists('wp_nonce_field') ) {
	function akismet_nonce_field($action = -1) { return; }
	$akismet_nonce = -1;
} else {
	function akismet_nonce_field($action = -1) { return wp_nonce_field($action); }
	$akismet_nonce = 'akismet-update-key';
}

if ( !function_exists('number_format_i18n') ) {
	function number_format_i18n( $number, $decimals = null ) { return number_format( $number, $decimals ); }
}

function akismet_config_page() {
	if ( function_exists('add_submenu_page') )
		add_submenu_page('plugins.php', __('Akismet Configuration'), __('Akismet Configuration'), 'manage_options', 'akismet-key-config', 'akismet_conf');

}

function akismet_conf() {
	global $akismet_nonce, $wpcom_api_key;

	if ( isset($_POST['submit']) ) {
		if ( function_exists('current_user_can') && !current_user_can('manage_options') )
			die(__('Cheatin&#8217; uh?'));

		check_admin_referer( $akismet_nonce );
		$key = preg_replace( '/[^a-h0-9]/i', '', $_POST['key'] );

		if ( empty($key) ) {
			$key_status = 'empty';
			$ms[] = 'new_key_empty';
			delete_option('wordpress_api_key');
		} else {
			$key_status = akismet_verify_key( $key );
		}

		if ( $key_status == 'valid' ) {
			update_option('wordpress_api_key', $key);
			$ms[] = 'new_key_valid';
		} else if ( $key_status == 'invalid' ) {
			$ms[] = 'new_key_invalid';
		} else if ( $key_status == 'failed' ) {
			$ms[] = 'new_key_failed';
		}

		if ( isset( $_POST['akismet_discard_month'] ) )
			update_option( 'akismet_discard_month', 'true' );
		else
			update_option( 'akismet_discard_month', 'false' );
	} elseif ( isset($_POST['check']) ) {
		akismet_get_server_connectivity(0);
	}

	if ( empty( $key_status) ||  $key_status != 'valid' ) {
		$key = get_option('wordpress_api_key');
		if ( empty( $key ) ) {
			if ( empty( $key_status ) || $key_status != 'failed' ) {
				if ( akismet_verify_key( '1234567890ab' ) == 'failed' )
					$ms[] = 'no_connection';
				else
					$ms[] = 'key_empty';
			}
			$key_status = 'empty';
		} else {
			$key_status = akismet_verify_key( $key );
		}
		if ( $key_status == 'valid' ) {
			$ms[] = 'key_valid';
		} else if ( $key_status == 'invalid' ) {
			delete_option('wordpress_api_key');
			$ms[] = 'key_empty';
		} else if ( !empty($key) && $key_status == 'failed' ) {
			$ms[] = 'key_failed';
		}
	}

	$messages = array(
		'new_key_empty' => array('color' => 'aa0', 'text' => __('Your key has been cleared.')),
		'new_key_valid' => array('color' => '2d2', 'text' => __('Your key has been verified. Happy blogging!')),
		'new_key_invalid' => array('color' => 'd22', 'text' => __('The key you entered is invalid. Please double-check it.')),
		'new_key_failed' => array('color' => 'd22', 'text' => __('The key you entered could not be verified because a connection to akismet.com could not be established. Please check your server configuration.')),
		'no_connection' => array('color' => 'd22', 'text' => __('There was a problem connecting to the Akismet server. Please check your server configuration.')),
		'key_empty' => array('color' => 'aa0', 'text' => sprintf(__('Please enter an API key. (<a href="%s" style="color:#fff">Get your key.</a>)'), 'http://akismet.com/get/')),
		'key_valid' => array('color' => '2d2', 'text' => __('This key is valid.')),
		'key_failed' => array('color' => 'aa0', 'text' => __('The key below was previously validated but a connection to akismet.com can not be established at this time. Please check your server configuration.')));
?>
<?php if ( !empty($_POST['submit'] ) ) : ?>
<div id="message" class="updated fade"><p><strong><?php _e('Options saved.') ?></strong></p></div>
<?php endif; ?>
<div class="wrap">
<h2><?php _e('Akismet Configuration'); ?></h2>
<div class="narrow">
<form action="" method="post" id="akismet-conf" style="margin: auto; width: 400px; ">
<?php if ( !$wpcom_api_key ) { ?>
	<p><?php printf(__('For many people, <a href="%1$s">Akismet</a> will greatly reduce or even completely eliminate the comment and trackback spam you get on your site. If one does happen to get through, simply mark it as "spam" on the moderation screen and Akismet will learn from the mistakes. If you don\'t have an API key yet, you can get one at <a href="%2$s">Akismet.com</a>.'), 'http://akismet.com/', 'http://akismet.com/get/'); ?></p>

<h3><label for="key"><?php _e('Akismet API Key'); ?></label></h3>
<?php foreach ( $ms as $m ) : ?>
	<p style="padding: .5em; background-color: #<?php echo $messages[$m]['color']; ?>; color: #fff; font-weight: bold;"><?php echo $messages[$m]['text']; ?></p>
<?php endforeach; ?>
<p><input id="key" name="key" type="text" size="15" maxlength="12" value="<?php echo get_option('wordpress_api_key'); ?>" style="font-family: 'Courier New', Courier, mono; font-size: 1.5em;" /> (<?php _e('<a href="http://akismet.com/get/">What is this?</a>'); ?>)</p>
<?php if ( isset( $invalid_key) && $invalid_key ) { ?>
<h3><?php _e('Why might my key be invalid?'); ?></h3>
<p><?php _e('This can mean one of two things, either you copied the key wrong or that the plugin is unable to reach the Akismet servers, which is most often caused by an issue with your web host around firewalls or similar.'); ?></p>
<?php } ?>
<?php } ?>
<?php akismet_nonce_field($akismet_nonce) ?>
<p><label><input name="akismet_discard_month" id="akismet_discard_month" value="true" type="checkbox" <?php if ( get_option('akismet_discard_month') == 'true' ) echo ' checked="checked" '; ?> /> <?php _e('Automatically discard spam comments on posts older than a month.'); ?></label></p>
	<p class="submit"><input type="submit" name="submit" value="<?php _e('Update options &raquo;'); ?>" /></p>
</form>

<form action="" method="post" id="akismet-connectivity" style="margin: auto; width: 400px; ">

<h3><?php _e('Server Connectivity'); ?></h3>
<?php
	if ( !function_exists('fsockopen') || !function_exists('gethostbynamel') ) {
		?>
			<p style="padding: .5em; background-color: #d22; color: #fff; font-weight:bold;"><?php _e('Network functions are disabled.'); ?></p>
			<p><?php echo sprintf( __('Your web host or server administrator has disabled PHP\'s <code>fsockopen</code> or <code>gethostbynamel</code> functions.  <strong>Akismet cannot work correctly until this is fixed.</strong>  Please contact your web host or firewall administrator and give them <a href="%s" target="_blank">this information about Akismet\'s system requirements</a>.'), 'http://blog.akismet.com/akismet-hosting-faq/'); ?></p>
		<?php
	} else {
		$servers = akismet_get_server_connectivity();
		$fail_count = count($servers) - count( array_filter($servers) );
		if ( is_array($servers) && count($servers) > 0 ) {
			// some connections work, some fail
			if ( $fail_count > 0 && $fail_count < count($servers) ) { ?>
				<p style="padding: .5em; background-color: #aa0; color: #fff; font-weight:bold;"><?php _e('Unable to reach some Akismet servers.'); ?></p>
				<p><?php echo sprintf( __('A network problem or firewall is blocking some connections from your web server to Akismet.com.  Akismet is working but this may cause problems during times of network congestion.  Please contact your web host or firewall administrator and give them <a href="%s" target="_blank">this information about Akismet and firewalls</a>.'), 'http://blog.akismet.com/akismet-hosting-faq/'); ?></p>
			<?php
			// all connections fail
			} elseif ( $fail_count > 0 ) { ?>
				<p style="padding: .5em; background-color: #d22; color: #fff; font-weight:bold;"><?php _e('Unable to reach any Akismet servers.'); ?></p>
				<p><?php echo sprintf( __('A network problem or firewall is blocking all connections from your web server to Akismet.com.  <strong>Akismet cannot work correctly until this is fixed.</strong>  Please contact your web host or firewall administrator and give them <a href="%s" target="_blank">this information about Akismet and firewalls</a>.'), 'http://blog.akismet.com/akismet-hosting-faq/'); ?></p>
			<?php
			// all connections work
			} else { ?>
				<p style="padding: .5em; background-color: #2d2; color: #fff; font-weight:bold;"><?php  _e('All Akismet servers are available.'); ?></p>
				<p><?php _e('Akismet is working correctly.  All servers are accessible.'); ?></p>
			<?php
			}
		} else {
			?>
				<p style="padding: .5em; background-color: #d22; color: #fff; font-weight:bold;"><?php _e('Unable to find Akismet servers.'); ?></p>
				<p><?php echo sprintf( __('A DNS problem or firewall is preventing all access from your web server to Akismet.com.  <strong>Akismet cannot work correctly until this is fixed.</strong>  Please contact your web host or firewall administrator and give them <a href="%s" target="_blank">this information about Akismet and firewalls</a>.'), 'http://blog.akismet.com/akismet-hosting-faq/'); ?></p>
			<?php
		}
	}
	
	if ( !empty($servers) ) {
?>
<table style="width: 100%;">
<thead><th><?php _e('Akismet server'); ?></th><th><?php _e('Network Status'); ?></th></thead>
<tbody>
<?php
		asort($servers);
		foreach ( $servers as $ip => $status ) {
			$color = ( $status ? '#2d2' : '#d22');
	?>
		<tr>
		<td><?php echo htmlspecialchars($ip); ?></td>
		<td style="padding: 0 .5em; font-weight:bold; color: #fff; background-color: <?php echo $color; ?>"><?php echo ($status ? __('No problems') : __('Obstructed') ); ?></td>
		
	<?php
		}
	}
?>
</tbody>
</table>
	<p><?php if ( get_option('akismet_connectivity_time') ) echo sprintf( __('Last checked %s ago.'), human_time_diff( get_option('akismet_connectivity_time') ) ); ?></p>
	<p class="submit"><input type="submit" name="check" value="<?php _e('Check network status &raquo;'); ?>" /></p>
</form>

</div>
</div>
<?php
}

function akismet_stats_page() {
	if ( function_exists('add_submenu_page') )
		add_submenu_page('index.php', __('Akismet Stats'), __('Akismet Stats'), 'manage_options', 'akismet-stats-display', 'akismet_stats_display');

}

function akismet_stats_script() {
	?>
<script type="text/javascript">
function resizeIframe() {
    var height = document.documentElement.clientHeight;
    height -= document.getElementById('akismet-stats-frame').offsetTop;
    height += 100; // magic padding
    
    document.getElementById('akismet-stats-frame').style.height = height +"px";
    
};
function resizeIframeInit() {
	document.getElementById('akismet-stats-frame').onload = resizeIframe;
	window.onresize = resizeIframe;
}
addLoadEvent(resizeIframeInit);
</script><?php
}


function akismet_stats_display() {
	global $akismet_api_host, $akismet_api_port, $wpcom_api_key;
	$blog = urlencode( get_option('home') );
	$url = "http://".akismet_get_key().".web.akismet.com/1.0/user-stats.php?blog={$blog}";
	?>
	<div class="wrap">
	<iframe src="<?php echo $url; ?>" width="100%" height="100%" frameborder="0" id="akismet-stats-frame"></iframe>
	</div>
	<?php
}

function akismet_stats() {
	if ( !function_exists('did_action') || did_action( 'rightnow_end' ) ) // We already displayed this info in the "Right Now" section
		return;
	if ( !$count = get_option('akismet_spam_count') )
		return;
	$path = plugin_basename(__FILE__);
	echo '<h3>'.__('Spam').'</h3>';
	global $submenu;
	if ( isset( $submenu['edit-comments.php'] ) )
		$link = 'edit-comments.php';
	else
		$link = 'edit.php';
	echo '<p>'.sprintf(__('<a href="%1$s">Akismet</a> has protected your site from <a href="%2$s">%3$s spam comments</a>.'), 'http://akismet.com/', clean_url("$link?page=akismet-admin"), number_format_i18n($count) ).'</p>';
}
add_action('activity_box_end', 'akismet_stats');

function akismet_get_key() {
	global $wpcom_api_key;
	if ( !empty($wpcom_api_key) )
		return $wpcom_api_key;
	return get_option('wordpress_api_key');
}

function akismet_verify_key( $key, $ip = null ) {
	global $akismet_api_host, $akismet_api_port, $wpcom_api_key;
	$blog = urlencode( get_option('home') );
	if ( $wpcom_api_key )
		$key = $wpcom_api_key;
	$response = akismet_http_post("key=$key&blog=$blog", 'rest.akismet.com', '/1.1/verify-key', $akismet_api_port, $ip);
	if ( !is_array($response) || !isset($response[1]) || $response[1] != 'valid' && $response[1] != 'invalid' )
		return 'failed';
	return $response[1];
}

// Check connectivity between the WordPress blog and Akismet's servers.
// Returns an associative array of server IP addresses, where the key is the IP address, and value is true (available) or false (unable to connect).
function akismet_check_server_connectivity() {
	global $akismet_api_host, $akismet_api_port, $wpcom_api_key;
	
	$test_host = 'rest.akismet.com';
	
	// Some web hosts may disable one or both functions
	if ( !function_exists('fsockopen') || !function_exists('gethostbynamel') )
		return array();
	
	$ips = gethostbynamel($test_host);
	if ( !$ips || !is_array($ips) || !count($ips) )
		return array();
		
	$servers = array();
	foreach ( $ips as $ip ) {
		$response = akismet_verify_key( akismet_get_key(), $ip );
		// even if the key is invalid, at least we know we have connectivity
		if ( $response == 'valid' || $response == 'invalid' )
			$servers[$ip] = true;
		else
			$servers[$ip] = false;
	}

	return $servers;
}

// Check the server connectivity and store the results in an option.
// Cached results will be used if not older than the specified timeout in seconds; use $cache_timeout = 0 to force an update.
// Returns the same associative array as akismet_check_server_connectivity()
function akismet_get_server_connectivity( $cache_timeout = 86400 ) {
	$servers = get_option('akismet_available_servers');
	if ( (time() - get_option('akismet_connectivity_time') < $cache_timeout) && $servers !== false )
		return $servers;
	
	// There's a race condition here but the effect is harmless.
	$servers = akismet_check_server_connectivity();
	update_option('akismet_available_servers', $servers);
	update_option('akismet_connectivity_time', time());
	return $servers;
}

// Returns true if server connectivity was OK at the last check, false if there was a problem that needs to be fixed.
function akismet_server_connectivity_ok() {
	// skip the check on WPMU because the status page is hidden
	global $wpcom_api_key;
	if ( $wpcom_api_key )
		return true;
	$servers = akismet_get_server_connectivity();
	return !( empty($servers) || !count($servers) || count( array_filter($servers) ) < count($servers) );
}

function akismet_admin_warnings() {
	global $wpcom_api_key;
	if ( !get_option('wordpress_api_key') && !$wpcom_api_key && !isset($_POST['submit']) ) {
		function akismet_warning() {
			echo "
			<div id='akismet-warning' class='updated fade'><p><strong>".__('Akismet is almost ready.')."</strong> ".sprintf(__('You must <a href="%1$s">enter your Akismet API key</a> for it to work.'), "plugins.php?page=akismet-key-config")."</p></div>
			";
		}
		add_action('admin_notices', 'akismet_warning');
		return;
	} elseif ( get_option('akismet_connectivity_time') && empty($_POST) && is_admin() && !akismet_server_connectivity_ok() ) {
		function akismet_warning() {
			echo "
			<div id='akismet-warning' class='updated fade'><p><strong>".__('Akismet has detected a problem.')."</strong> ".sprintf(__('A server or network problem is preventing Akismet from working correctly.  <a href="%1$s">Click here for more information</a> about how to fix the problem.'), "plugins.php?page=akismet-key-config")."</p></div>
			";
		}
		add_action('admin_notices', 'akismet_warning');
		return;
	}
}

function akismet_get_host($host) {
	// if all servers are accessible, just return the host name.
	// if not, return an IP that was known to be accessible at the last check.
	if ( akismet_server_connectivity_ok() ) {
		return $host;
	} else {
		$ips = akismet_get_server_connectivity();
		// a firewall may be blocking access to some Akismet IPs
		if ( count($ips) > 0 && count(array_filter($ips)) < count($ips) ) {
			// use DNS to get current IPs, but exclude any known to be unreachable
			$dns = (array)gethostbynamel( rtrim($host, '.') . '.' );
			$dns = array_filter($dns);
			foreach ( $dns as $ip ) {
				if ( array_key_exists( $ip, $ips ) && empty( $ips[$ip] ) )
					unset($dns[$ip]);
			}
			// return a random IP from those available
			if ( count($dns) )
				return $dns[ array_rand($dns) ];
			
		}
	}
	// if all else fails try the host name
	return $host;
}

// return a comma-separated list of role names for the given user
function akismet_get_user_roles($user_id ) {
	$roles = false;
	
	if ( !class_exists('WP_User') )
		return false;
	
	if ( $user_id > 0 ) {
		$comment_user = new WP_User($user_id);
		if ( isset($comment_user->roles) )
			$roles = join(',', $comment_user->roles);
	}
	
	return $roles;
}

// Returns array with headers in $response[0] and body in $response[1]
function akismet_http_post($request, $host, $path, $port = 80, $ip=null) {
	global $wp_version;
	
	$akismet_version = constant('AKISMET_VERSION');

	$http_request  = "POST $path HTTP/1.0\r\n";
	$http_request .= "Host: $host\r\n";
	$http_request .= "Content-Type: application/x-www-form-urlencoded; charset=" . get_option('blog_charset') . "\r\n";
	$http_request .= "Content-Length: " . strlen($request) . "\r\n";
	$http_request .= "User-Agent: WordPress/$wp_version | Akismet/$akismet_version\r\n";
	$http_request .= "\r\n";
	$http_request .= $request;
	
	$http_host = $host;
	// use a specific IP if provided - needed by akismet_check_server_connectivity()
	if ( $ip && long2ip(ip2long($ip)) ) {
		$http_host = $ip;
	} else {
		$http_host = akismet_get_host($host);
	}

	$response = '';
	if( false != ( $fs = @fsockopen($http_host, $port, $errno, $errstr, 10) ) ) {
		fwrite($fs, $http_request);

		while ( !feof($fs) )
			$response .= fgets($fs, 1160); // One TCP-IP packet
		fclose($fs);
		$response = explode("\r\n\r\n", $response, 2);
	}
	return $response;
}

// filter handler used to return a spam result to pre_comment_approved
function akismet_result_spam( $approved ) {
	// bump the counter here instead of when the filter is added to reduce the possibility of overcounting
	if ( $incr = apply_filters('akismet_spam_count_incr', 1) )
		update_option( 'akismet_spam_count', get_option('akismet_spam_count') + $incr );
	return 'spam';
}

function akismet_auto_check_comment( $commentdata ) {
	global $akismet_api_host, $akismet_api_port;

	$comment = $commentdata;
	$comment['user_ip']    = $_SERVER['REMOTE_ADDR'];
	$comment['user_agent'] = $_SERVER['HTTP_USER_AGENT'];
	$comment['referrer']   = $_SERVER['HTTP_REFERER'];
	$comment['blog']       = get_option('home');
	$comment['blog_lang']  = get_locale();
	$comment['blog_charset'] = get_option('blog_charset');
	$comment['permalink']  = get_permalink($comment['comment_post_ID']);
	
	$comment['user_role'] = akismet_get_user_roles($comment['user_ID']);

	$ignore = array( 'HTTP_COOKIE', 'HTTP_COOKIE2', 'PHP_AUTH_PW' );

	foreach ( $_SERVER as $key => $value )
		if ( !in_array( $key, $ignore ) && is_string($value) )
			$comment["$key"] = $value;
		else
			$comment["$key"] = '';

	$query_string = '';
	foreach ( $comment as $key => $data )
		$query_string .= $key . '=' . urlencode( stripslashes($data) ) . '&';

	$response = akismet_http_post($query_string, $akismet_api_host, '/1.1/comment-check', $akismet_api_port);
	$commentdata['akismet_result'] = $response[1];
	if ( 'true' == $response[1] ) {
		// akismet_spam_count will be incremented later by akismet_result_spam()
		add_filter('pre_comment_approved', 'akismet_result_spam');

		do_action( 'akismet_spam_caught' );

		$post = get_post( $comment['comment_post_ID'] );
		$last_updated = strtotime( $post->post_modified_gmt );
		$diff = time() - $last_updated;
		$diff = $diff / 86400;
		
		if ( $post->post_type == 'post' && $diff > 30 && get_option( 'akismet_discard_month' ) == 'true' && empty($comment['user_ID']) ) {
			// akismet_result_spam() won't be called so bump the counter here
			if ( $incr = apply_filters('akismet_spam_count_incr', 1) )
				update_option( 'akismet_spam_count', get_option('akismet_spam_count') + $incr );
			die;
		}
	}
	
	if ( function_exists('wp_next_scheduled') && function_exists('wp_schedule_event') ) {
		// WP 2.1+: delete old comments daily
		if ( !wp_next_scheduled('akismet_scheduled_delete') )
			wp_schedule_event(time(), 'daily', 'akismet_scheduled_delete');
	} elseif ( (mt_rand(1, 10) == 3) ) {
		// WP 2.0: run this one time in ten
		akismet_delete_old();
	}
	return $commentdata;
}

function akismet_delete_old() {
	global $wpdb;
	$now_gmt = current_time('mysql', 1);
	$comment_ids = $wpdb->get_col("SELECT comment_id FROM $wpdb->comments WHERE DATE_SUB('$now_gmt', INTERVAL 15 DAY) > comment_date_gmt AND comment_approved = 'spam'");
	if ( empty( $comment_ids ) )
		return;

	do_action( 'delete_comment', $comment_ids );
	$wpdb->query("DELETE FROM $wpdb->comments WHERE comment_id IN ( " . implode( ', ', $comment_ids ) . " )");
	$n = mt_rand(1, 5000);
	if ( apply_filters('akismet_optimize_table', ($n == 11)) ) // lucky number
		$wpdb->query("OPTIMIZE TABLE $wpdb->comments");

}

add_action('akismet_scheduled_delete', 'akismet_delete_old');

function akismet_submit_nonspam_comment ( $comment_id ) {
	global $wpdb, $akismet_api_host, $akismet_api_port, $current_user, $current_site;
	$comment_id = (int) $comment_id;

	$comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment_id'");
	if ( !$comment ) // it was deleted
		return;
	$comment->blog = get_option('home');
	$comment->blog_lang = get_locale();
	$comment->blog_charset = get_option('blog_charset');
	$comment->permalink = get_permalink($comment->comment_post_ID);
	if ( is_object($current_user) ) {
	    $comment->reporter = $current_user->user_login;
	}
	if ( is_object($current_site) ) {
		$comment->site_domain = $current_site->domain;
	}

	$comment->user_role = '';
	if ( isset( $comment->user_ID ) )
		$comment->user_role = akismet_get_user_roles($comment->user_ID);

	$query_string = '';
	foreach ( $comment as $key => $data )
		$query_string .= $key . '=' . urlencode( stripslashes($data) ) . '&';

	$response = akismet_http_post($query_string, $akismet_api_host, "/1.1/submit-ham", $akismet_api_port);
	do_action('akismet_submit_nonspam_comment', $comment_id, $response[1]);
}

function akismet_submit_spam_comment ( $comment_id ) {
	global $wpdb, $akismet_api_host, $akismet_api_port, $current_user, $current_site;
	$comment_id = (int) $comment_id;

	$comment = $wpdb->get_row("SELECT * FROM $wpdb->comments WHERE comment_ID = '$comment_id'");
	if ( !$comment ) // it was deleted
		return;
	if ( 'spam' != $comment->comment_approved )
		return;
	$comment->blog = get_option('home');
	$comment->blog_lang = get_locale();
	$comment->blog_charset = get_option('blog_charset');
	$comment->permalink = get_permalink($comment->comment_post_ID);
	if ( is_object($current_user) ) {
	    $comment->reporter = $current_user->user_login;
	}
	if ( is_object($current_site) ) {
		$comment->site_domain = $current_site->domain;
	}

	$comment->user_role = '';
	if ( !isset( $comment->user_id ) )
		$comment->user_role = akismet_get_user_roles($comment->user_ID);

	$query_string = '';
	foreach ( $comment as $key => $data )
		$query_string .= $key . '=' . urlencode( stripslashes($data) ) . '&';

	$response = akismet_http_post($query_string, $akismet_api_host, "/1.1/submit-spam", $akismet_api_port);
	do_action('akismet_submit_spam_comment', $comment_id, $response[1]);
}

add_action('preprocess_comment', 'akismet_auto_check_comment', 1);

// For old versions of WP only
function akismet_set_comment_status( $comment_id, $status ) {
	if ( $status == 'spam' ) {
		akismet_submit_spam_comment( $comment_id );
	} elseif ( $status == 'approve' ) {
		akismet_submit_nonspam_comment( $comment_id );
	}
}

// For WP 2.7+
function akismet_transition_comment_status( $new_status, $old_status, $comment ) {
	if ( $new_status == $old_status )
		return;

	if ( $new_status == 'spam' ) {
		akismet_submit_spam_comment( $comment->comment_ID );
	} elseif ( $old_status == 'spam' && ( $new_status == 'approved' || $new_status == 'unapproved' ) ) {
		akismet_submit_nonspam_comment( $comment->comment_ID );
	}
}

function akismet_spamtoham( $comment ) { akismet_submit_nonspam_comment( $comment->comment_ID ); }

if ( function_exists( 'wp_transition_comment_status' ) ) {
	add_action( 'transition_comment_status', 'akismet_transition_comment_status', 10, 3 );
} else {
	add_action('wp_set_comment_status', 'akismet_set_comment_status', 10, 2);
	add_action('edit_comment', 'akismet_submit_spam_comment');
	add_filter( 'comment_spam_to_approved', 'akismet_spamtoham' );
	add_filter( 'comment_spam_to_unapproved', 'akismet_spamtoham' );
}
// Total spam in queue
// get_option( 'akismet_spam_count' ) is the total caught ever
function akismet_spam_count( $type = false ) {
	global $wpdb;

	if ( !$type ) { // total
		$count = wp_cache_get( 'akismet_spam_count', 'widget' );
		if ( false === $count ) {
			if ( function_exists('wp_count_comments') ) {
				$count = wp_count_comments();
				$count = $count->spam;
			} else {
				$count = (int) $wpdb->get_var("SELECT COUNT(comment_ID) FROM $wpdb->comments WHERE comment_approved = 'spam'");
			}
			wp_cache_set( 'akismet_spam_count', $count, 'widget', 3600 );
		}
		return $count;
	} elseif ( 'comments' == $type || 'comment' == $type ) { // comments
		$type = '';
	} else { // pingback, trackback, ...
		$type  = $wpdb->escape( $type );
	}

	return (int) $wpdb->get_var("SELECT COUNT(comment_ID) FROM $wpdb->comments WHERE comment_approved = 'spam' AND comment_type='$type'");
}


// WP 2.5+
function akismet_rightnow() {
	global $submenu, $wp_db_version;

	// clean_url was deprecated in WP 3.0
	$esc_url = 'clean_url';
	if ( function_exists( 'esc_url' ) )
		$esc_url = 'esc_url';

	if ( 8645 < $wp_db_version  ) // 2.7
		$link = 'edit-comments.php?comment_status=spam';
	elseif ( isset( $submenu['edit-comments.php'] ) )
		$link = 'edit-comments.php?page=akismet-admin';
	else
		$link = 'edit.php?page=akismet-admin';

	if ( $count = get_option('akismet_spam_count') ) {
		$intro = sprintf( __ngettext(
			'<a href="%1$s">Akismet</a> has protected your site from %2$s spam comment already,',
			'<a href="%1$s">Akismet</a> has protected your site from %2$s spam comments already,',
			$count
		), 'http://akismet.com/', number_format_i18n( $count ) );
	} else {
		$intro = sprintf( __('<a href="%1$s">Akismet</a> blocks spam from getting to your blog,'), 'http://akismet.com/' );
	}

	if ( $queue_count = akismet_spam_count() ) {
		$queue_text = sprintf( __ngettext(
			'and there\'s <a href="%2$s">%1$s comment</a> in your spam queue right now.',
			'and there are <a href="%2$s">%1$s comments</a> in your spam queue right now.',
			$queue_count
		), number_format_i18n( $queue_count ), clean_url($link) );
	} else {
		$queue_text = sprintf( __( "but there's nothing in your <a href='%1\$s'>spam queue</a> at the moment." ), $esc_url($link) );
	}

	// _c was deprecated in WP 2.9.0
	if ( function_exists( '_x' ) )
		$text = sprintf( _x( '%1$s %2$s', 'akismet_rightnow' ), $intro, $queue_text );
	else 
		$text = sprintf( _c( '%1$s %2$s|akismet_rightnow' ), $intro, $queue_text );

	echo "<p class='akismet-right-now'>$text</p>\n";
}
	
add_action('rightnow_end', 'akismet_rightnow');


// For WP >= 2.5
function akismet_check_for_spam_button($comment_status) {
	if ( 'approved' == $comment_status )
		return;
	if ( function_exists('plugins_url') )
		$link = 'admin.php?action=akismet_recheck_queue';
	else
		$link = 'edit-comments.php?page=akismet-admin&amp;recheckqueue=true&amp;noheader=true';
	echo "</div><div class='alignleft'><a class='button-secondary checkforspam' href='$link'>" . __('Check for Spam') . "</a>";
}
add_action('manage_comments_nav', 'akismet_check_for_spam_button');

function akismet_recheck_queue() {
	global $wpdb, $akismet_api_host, $akismet_api_port;

	if ( ! ( isset( $_GET['recheckqueue'] ) || ( isset( $_REQUEST['action'] ) && 'akismet_recheck_queue' == $_REQUEST['action'] ) ) )
		return;

	$moderation = $wpdb->get_results( "SELECT * FROM $wpdb->comments WHERE comment_approved = '0'", ARRAY_A );
	foreach ( (array) $moderation as $c ) {
		$c['user_ip']    = $c['comment_author_IP'];
		$c['user_agent'] = $c['comment_agent'];
		$c['referrer']   = '';
		$c['blog']       = get_option('home');
		$c['blog_lang']  = get_locale();
		$c['blog_charset'] = get_option('blog_charset');
		$c['permalink']  = get_permalink($c['comment_post_ID']);

		$c['user_role'] = '';
		if ( isset( $c['user_ID'] ) )
			$c['user_role']  = akismet_get_user_roles($c['user_ID']);

		$id = (int) $c['comment_ID'];

		$query_string = '';
		foreach ( $c as $key => $data )
		$query_string .= $key . '=' . urlencode( stripslashes($data) ) . '&';

		$response = akismet_http_post($query_string, $akismet_api_host, '/1.1/comment-check', $akismet_api_port);
		if ( 'true' == $response[1] ) {
			if ( function_exists('wp_set_comment_status') )
				wp_set_comment_status($id, 'spam');
			else
				$wpdb->query("UPDATE $wpdb->comments SET comment_approved = 'spam' WHERE comment_ID = $id");

		}
	}
	wp_redirect( $_SERVER['HTTP_REFERER'] );
	exit;
}

add_action('admin_action_akismet_recheck_queue', 'akismet_recheck_queue');

function akismet_check_db_comment( $id ) {
	global $wpdb, $akismet_api_host, $akismet_api_port;

	$id = (int) $id;
	$c = $wpdb->get_row( "SELECT * FROM $wpdb->comments WHERE comment_ID = '$id'", ARRAY_A );
	if ( !$c )
		return;

	$c['user_ip']    = $c['comment_author_IP'];
	$c['user_agent'] = $c['comment_agent'];
	$c['referrer']   = '';
	$c['blog']       = get_option('home');
	$c['blog_lang']  = get_locale();
	$c['blog_charset'] = get_option('blog_charset');
	$c['permalink']  = get_permalink($c['comment_post_ID']);
	$id = $c['comment_ID'];

	$query_string = '';
	foreach ( $c as $key => $data )
	$query_string .= $key . '=' . urlencode( stripslashes($data) ) . '&';

	$response = akismet_http_post($query_string, $akismet_api_host, '/1.1/comment-check', $akismet_api_port);
	return $response[1];
}

// Widget stuff
function widget_akismet_register() {
	if ( function_exists('register_sidebar_widget') ) :
	function widget_akismet($args) {
		extract($args);
		$options = get_option('widget_akismet');
		$count = number_format_i18n(get_option('akismet_spam_count'));
		?>
			<?php echo $before_widget; ?>
				<?php echo $before_title . $options['title'] . $after_title; ?>
				<div id="akismetwrap"><div id="akismetstats"><a id="aka" href="http://akismet.com" title=""><?php printf( __( '%1$s %2$sspam comments%3$s %4$sblocked by%5$s<br />%6$sAkismet%7$s' ), '<span id="akismet1"><span id="akismetcount">' . $count . '</span>', '<span id="akismetsc">', '</span></span>', '<span id="akismet2"><span id="akismetbb">', '</span>', '<span id="akismeta">', '</span></span>' ); ?></a></div></div>
			<?php echo $after_widget; ?>
	<?php
	}

	function widget_akismet_style() {
		$plugin_dir = '/wp-content/plugins';
		if ( defined( 'PLUGINDIR' ) )
			$plugin_dir = '/' . PLUGINDIR;

		?>
<style type="text/css">
#aka,#aka:link,#aka:hover,#aka:visited,#aka:active{color:#fff;text-decoration:none}
#aka:hover{border:none;text-decoration:none}
#aka:hover #akismet1{display:none}
#aka:hover #akismet2,#akismet1{display:block}
#akismet2{display:none;padding-top:2px}
#akismeta{font-size:16px;font-weight:bold;line-height:18px;text-decoration:none}
#akismetcount{display:block;font:15px Verdana,Arial,Sans-Serif;font-weight:bold;text-decoration:none}
#akismetwrap #akismetstats{background:url(<?php echo get_option('siteurl'), $plugin_dir; ?>/akismet/akismet.gif) no-repeat top left;border:none;color:#fff;font:11px 'Trebuchet MS','Myriad Pro',sans-serif;height:40px;line-height:100%;overflow:hidden;padding:8px 0 0;text-align:center;width:120px}
</style>
		<?php
	}

	function widget_akismet_control() {
		$options = $newoptions = get_option('widget_akismet');
		if ( isset( $_POST['akismet-submit'] ) && $_POST["akismet-submit"] ) {
			$newoptions['title'] = strip_tags(stripslashes($_POST["akismet-title"]));
			if ( empty($newoptions['title']) ) $newoptions['title'] = __('Spam Blocked');
		}
		if ( $options != $newoptions ) {
			$options = $newoptions;
			update_option('widget_akismet', $options);
		}
		$title = htmlspecialchars($options['title'], ENT_QUOTES);
	?>
				<p><label for="akismet-title"><?php _e('Title:'); ?> <input style="width: 250px;" id="akismet-title" name="akismet-title" type="text" value="<?php echo $title; ?>" /></label></p>
				<input type="hidden" id="akismet-submit" name="akismet-submit" value="1" />
	<?php
	}

	if ( function_exists( 'wp_register_sidebar_widget' ) ) {
		wp_register_sidebar_widget( 'akismet', 'Akismet', 'widget_akismet', null, 'akismet');
		wp_register_widget_control( 'akismet', 'Akismet', 'widget_akismet_control', null, 75, 'akismet');
	} else {
		register_sidebar_widget('Akismet', 'widget_akismet', null, 'akismet');
		register_widget_control('Akismet', 'widget_akismet_control', null, 75, 'akismet');
	}
	if ( is_active_widget('widget_akismet') )
		add_action('wp_head', 'widget_akismet_style');
	endif;
}

add_action('init', 'widget_akismet_register');

// Counter for non-widget users
function akismet_counter() {
	$plugin_dir = '/wp-content/plugins';
	if ( defined( 'PLUGINDIR' ) )
		$plugin_dir = '/' . PLUGINDIR;

?>
<style type="text/css">
#akismetwrap #aka,#aka:link,#aka:hover,#aka:visited,#aka:active{color:#fff;text-decoration:none}
#aka:hover{border:none;text-decoration:none}
#aka:hover #akismet1{display:none}
#aka:hover #akismet2,#akismet1{display:block}
#akismet2{display:none;padding-top:2px}
#akismeta{font-size:16px;font-weight:bold;line-height:18px;text-decoration:none}
#akismetcount{display:block;font:15px Verdana,Arial,Sans-Serif;font-weight:bold;text-decoration:none}
#akismetwrap #akismetstats{background:url(<?php echo get_option('siteurl'), $plugin_dir; ?>/akismet/akismet.gif) no-repeat top left;border:none;color:#fff;font:11px 'Trebuchet MS','Myriad Pro',sans-serif;height:40px;line-height:100%;overflow:hidden;padding:8px 0 0;text-align:center;width:120px}
</style>
<?php
$count = number_format_i18n(get_option('akismet_spam_count'));
?>
<div id="akismetwrap"><div id="akismetstats"><a id="aka" href="http://akismet.com" title=""><div id="akismet1"><span id="akismetcount"><?php echo $count; ?></span> <span id="akismetsc"><?php _e('spam comments') ?></span></div> <div id="akismet2"><span id="akismetbb"><?php _e('blocked by') ?></span><br /><span id="akismeta">Akismet</span></div></a></div></div>
<?php
}

?>
