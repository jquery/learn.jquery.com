/*******************************************************************************/
/*	App */

//
// Javascript Applications 101 v1.0
// @link http://darcyclarke.me/development/javascript-applications-101/
// @author Darcy Clarke <http://darcyclarke.me/> @darcy_clarke
//

var App = {};
App.url = "http://jquery.com/";
App.cache = {};

App.ajax = function(service, data, success, failure){
	$.ajax({
		type: "post",
	    url: App.url+"ajax/"+service, 
	    data: data,
	    dataType: "json",
		success: function (data) {
			App.publish("ajax_request_succes");
			success(data);
		},
		error: function (request, status, error) {
	    	App.publish("ajax_request_succes");
	    	failure(request, status, error);
	    }
	});
},
App.publish = function(topic, args){
	App.cache[topic] && $.each(App.cache[topic], function(){
		this.apply($, args || []);
	});
},
App.subscribe = function(topic, callback){
	if(!App.cache[topic]){
		App.cache[topic] = [];
	}
	App.cache[topic].push(callback);
	return [topic, callback];
},
App.unsubscribe = function(handle){
	var t = handle[0];
	App.cache[t] && $.each(App.cache[t], function(idx){
		if(this == handle[1]){
			App.cache[t].splice(idx, 1);
		}
	});
};

jQuery(function($){
	App.publish("init");
});

jQuery(document).unload(function($){
	App.publish("destroy");
});