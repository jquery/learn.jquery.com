/**
 * Doug Neiner's Tooltip plugin
 */
(function ( $ ) {
  $.fn.projectTooltip = function (tooltips) {
    return this.each(function () {
      $( this ).data('tooltip', 
        $( "#tooltip-template" )
          .tmpl( tooltips[ this.id ] )
          .css( 'visibility', 'hidden' )
          .appendTo( this )
          .hide()
          .css( 'visibility', 'visible' )
          .mouseenter( function () {
            $.doTimeout('tthide');
          })
      );
    });
  };
  
  $.fn.projectTooltip.options = {
    animate_in: 150,
    animate_out: 150,
    end_top: 25,
    start_top: 15
  };
  
  $.fn.projectTooltip.showing = false;
  
  $.fn.tooltipIn = function () {
    $.fn.projectTooltip.showing = true;
    return this.css({ top: $.fn.projectTooltip.options.start_top })
      .fadeIn( $.fn.projectTooltip.options.animate_in )
      .animate(
        { top: $.fn.projectTooltip.options.end_top },
        { duration: $.fn.projectTooltip.options.animate_in, queue: false }
      );
  };

  $.fn.tooltipOut = function () {
    $.fn.projectTooltip.showing = false;
    return this.css({ top: $.fn.projectTooltip.options.end_top })
      .fadeOut( $.fn.projectTooltip.options.animate_out )
      .animate(
        { top: $.fn.projectTooltip.options.end_top },
        { duration: $.fn.projectTooltip.options.animate_out, queue: false }
      );
  };
  
}(jQuery));