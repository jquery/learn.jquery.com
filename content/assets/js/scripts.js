
/*******************************************************************************/
/*	Subscriptions */
/*******************************************************************************/

//
// Executes on DOM ready
//
App.subscribe("init", function(){

	//
	// Set Auto Height
	//
	$(window).bind("load resize", function(){
		App.autoHeight();
	});
	
	//
	// Project Select Show/Hide
	//
	$(".toggle-projects").bind("click", function(e){
		e.preventDefault();
		var el = $(this);
		if(el.hasClass('active')){
			el.removeClass('active');
			$("body").css({"marginTop":"0"});
			el.removeClass('down');
		} else {
			el.addClass('active');
			$("body").css({"marginTop":"150px"});
			el.addClass('down');
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

	//
	// Footer Books + Presentations
	//
	$(".presentations img, .books img").each(function (i, el) {
		var $img = $(this),
		$span = $img.parent();
		$span.css("background-image", "url(" + $img.attr('src') + ")");
		$img.css("visibility", "hidden");
	});
	
	//
	// Footer Social Icons
	//
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
		
	//
	// Run Van Gogh - Syntax Highlighting
	//
	$("pre").children("code").text(function(i, t) {
		return $.trim( t );
	}).parent().vanGogh();
	
	//
	// Learning Site Specific
	//
	$("#sidebar .paper_edges").bind("click", function(e){
		e.preventDefault();
		var el = $(this),
			container = el.parents(".paper");
		if(container.hasClass("open")){
			container.addClass("open").animate({"width":"24%","margin-left":"-30.5%"}, 500, function(){});
		} else {
			container.addClass("open").animate({"width":"120%","margin-left":"-126.5%"}, 500, function(){});
		}
	});
	
	
});
