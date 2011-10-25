
/*******************************************************************************/
/*	App */
/*******************************************************************************/

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

/*******************************************************************************/
/*	Events */
/*******************************************************************************/

jQuery(function($){
	App.publish("init");
});

jQuery(document).unload(function($){
	App.publish("destroy");
});


/*******************************************************************************/
/*	Subscriptions */
/*******************************************************************************/

//
// Executes on DOM ready
//
App.subscribe("init", function(){


	//
	// Project Select Show/Hide
	//
	$(".toggle-projects").bind("click", function(e){
		e.preventDefault();
		var el = $(this);
		if(el.hasClass('active')){
			el.removeClass('active');
			$("body").animate({"marginTop":"0"}, 300, function(){
			el.removeClass('down');
		});
		} else {
			el.addClass('active');
			$("body").animate({"marginTop":"150px"}, 300, function(){
			el.addClass('down');
		});
		}
	});

	//
	// Project Select Clickoutside
	//
	$(".project-select").bind("clickoutside", function(e){
		var el = $(".toggle-projects");
		if(el.hasClass('down')){
			el.removeClass("active down");
			$("body").animate({"marginTop":"0"}, 300);
		}
	});



	$(".presentations img, .books img").each(function (i, el) {
		var $img = $(this),
		$span = $img.parent();

		$span.css("background-image", "url(" + $img.attr('src') + ")");
		$img.css("visibility", "hidden");
	});

	$(".footer-icon-links")
	.find("li a")
	.append("<span></span>")
	.end()
	.delegate("li a", "mouseenter", function () {
		$(this).find("span").stop(true, false).fadeTo(250, 1.0);
	})
	.delegate("li a", "mouseleave", function () {
		$(this).find("span").stop(true, false).fadeOut(250);
	});
});
