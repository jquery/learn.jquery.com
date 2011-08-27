// The plugin included by SyntaxHighlighter breaks Number
// parsing in the jQuery Animate function. You must use
// strings instead of numbers so it still works.
jQuery.InFieldLabels.defaultOptions.defaultOpacity = "1.0";
jQuery.InFieldLabels.defaultOptions.fadeOpacity    = "0.5";


//
// Executes on DOM ready
//
App.subscribe("init", function(){
  
  //  
  // Add Syntax Highlighting
  //
  SyntaxHighlighter.all();
  
  //
  // Add Search Interactions
  //
  $("#search").inFieldLabels();
  
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
  
  //
  // Project Tooltips
  //  
  $(".projects .jquery, .projects .jquery-ui, .projects .jquery-mobile").bind("mouseover", function(){
    var el = $(this), tooltips = $(".tooltips"), tooltip = {};
    if(el.hasClass('jquery')){
      tooltip = $(".tooltips .jquery");
    } else if(el.hasClass('jquery-ui')){
      tooltip = $(".tooltips .jquery-ui");
    } else if(el.hasClass('jquery-mobile')){
      tooltip = $(".tooltips .jquery-mobile");
    }
    if($(".tooltip:visible",tooltips) !== tooltip){
      clearTimeout(App.tooltip_timeout);
      $(".tooltip:visible",tooltips).fadeOut(200);
    }
    if(tooltip.is(":hidden")){
      setTimeout(function(){ tooltip.fadeIn(300); }, 300);
    }
  });
  
  $(".tooltips .jquery, .tooltips .jquery-ui, .tooltips .jquery-mobile").bind("mouseout", function(){
    var el = $(this);
    App.tooltip_timeout = setTimeout(function(){ el.fadeOut(200) }, 300);
  }).bind("mouseover", function(){
    clearTimeout(App.tooltip_timeout);
  });
  
  //
  // Fancy Dropdown
  //
  $(".links .dropdown").hover(function(){
    $(this).children("ul").stop(true, true).slideDown(100);
  }, function(){
    $(this).children("ul").stop(true, true).slideUp(100);
  });

  //
  // Temporary: REMOVE
  // Change page color
  //
  var colors = [ "jquery", "jquery-ui", "jquery-mobile", "jquery-project" ],
    color_string = colors.join(' ');
  $("ul.projects").delegate("li:lt(3)", "click", function(e) {
    e.preventDefault();
    $(document.documentElement)
      .removeClass(color_string)
      .addClass(this.className);
    window.location.hash = this.className;
  });
  
  if (window.location.hash && $.inArray(window.location.hash.substr(1), colors) > -1) {
    $(document.documentElement)
      .removeClass(color_string)
      .addClass(window.location.hash.substr(1));
  }

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




