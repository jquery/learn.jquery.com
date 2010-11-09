<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'learn_jquery');

/** MySQL database username */
define('DB_USER', 'learn-jquery');

/** MySQL database password */
define('DB_PASSWORD', 'R4q6RxLEKY83');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'YorfvS9}]E0[/Py+,R-ua+*YZ$FGf+%.!j-WK6fO9s.uNIw<].Vd}5e<z3:-9(9}');
define('SECURE_AUTH_KEY',  'E%f;W^pCyEB$8P4)&sY^>Tgh*=&ST9bQd}$Ek5ZO!Gu8b-|y++jI4*Y$vacMZ=u%');
define('LOGGED_IN_KEY',    'hfwE`Dm?Y $0?w)h9R<>kShd0yYG.&%(++-cH+evocJCHbwml8y~4?H2]kj!0,,[');
define('NONCE_KEY',        'fm|D2UZ<[EVW~,.+oX2b|d+vh9 UkOdEEQtsdJ;<`TX-GpvQrJ</-FWxd-^:OgL+');
define('AUTH_SALT',        'Vuo~h.6QAG#-ki7IxR%6URJD.Z$<Hhxu:Zs&GE=L|kShx7-j<pVOquo(--+_-&mq');
define('SECURE_AUTH_SALT', 'ika|&5h</c!r*4o|]T|qSf+? tNjJ1f1U{Yp-WbI>%Bcg)--|h-l$Y)i408_|idW');
define('LOGGED_IN_SALT',   '3H/s4rUbBL?@;%[ZT5w~ykRwUDDO6]{>^>S+=^5Q4NlCe>FC.HsXNQ11 Trs%Ghd');
define('NONCE_SALT',       '|}+tOzf;Ae/,za<IM;8I<T5OXz$PPlleQ[!+K v+!Lg~~+1M,*S-8^#hnRd7$/>i');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress.  A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de.mo to wp-content/languages and set WPLANG to 'de' to enable German
 * language support.
 */
define ('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
