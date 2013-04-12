---
title: jQuery UI CSS Framework API
level: intermediate
---

[Back to jQuery UI Theming](/jquery-ui/theming/)

### The jQuery UI CSS Framework

jQuery UI includes a robust CSS Framework designed for building custom jQuery widgets. The framework includes classes that cover a wide array of common user interface needs, and can be manipulated using jQuery UI ThemeRoller. By building your UI components using the jQuery UI CSS Framework, you will be adopting shared markup conventions and allowing for ease of code integration across the plugin community at large.

### Framework Classes

The following CSS classes are split between `ui.core.css` and `ui.theme.css`, depending on whether styles are fixed and structural, or themeable (colors, fonts, backgrounds, etc.) respectively. These classes are designed to be applied to user interface elements to achieve visual consistency across an application and allow components to be themeable by jQuery UI ThemeRoller.

### Layout Helpers

* `.ui-helper-hidden`: Applies `display: none` to elements.
* `.ui-helper-hidden-accessible`: Applies accessible hiding to elements (via absolute positioning off the page.)
* `.ui-helper-reset`: A basic style reset for UI elements. Resets things such as `padding`, `margin`, `text-decoration`, `list-style, etc.
* `.ui-helper-clearfix`: Applies float wrapping properties to parent elements.
* `.ui-helper-zfix`: Applies iframe "fix" CSS to `<iframe>` elements when needed in overlays.

### Widget Containers

* `.ui-widget`: Class to be applied on outer container of all widgets. Applies font family and font size to widget. Also applies same family and 1em font size to child form elements specifically, to combat inheritance issues in Windows browsers.
* `.ui-widget-header`: Class to be applied to header containers. Applies header container styles to an element and its child text, links, and icons.
* `.ui-widget-content`: Class to be applied to content containers. Applies content container styles to an element and its child text, links, and icons. (Can be applied to parent or sibling of header.)

### Interaction States

* `.ui-state-default`: Class to be applied to clickable button-like elements. Applies "clickable default" container styles to an element and its child text, links, and icons.
* `.ui-state-hover`: Class to be applied on mouseover to clickable button-like elements. Applies "clickable hover" container styles to an element and its child text, links, and icons.
* `.ui-state-focus`: Class to be applied on keyboard focus to clickable button-like elements. Applies "clickable hover" container styles to an element and its child text, links, and icons.
* `.ui-state-active`: Class to be applied on mousedown to clickable button-like elements. Applies "clickable active" container styles to an element and its child text, links, and icons.

### Interaction Cues

* `.ui-state-highlight`: Class to be applied to highlighted or selected elements. Applies "highlight" container styles to an element and its child text, links, and icons.
* `.ui-state-error`: Class to be applied to error messaging container elements. Applies "error" container styles to an element and its child text, links, and icons.
* `.ui-state-error-text`: An additional class that applies just the error text color without background. Can be used on form labels for instance. Also applies error icon color to child icons.
* `.ui-state-disabled`: Applies a dimmed opacity to disabled UI elements. Meant to be added in addition to an already-styled element.
* `.ui-priority-primary`: Class to be applied to a priority-1 button in situations where button hierarchy is needed. Applies bold text.
* `.ui-priority-secondary`: Class to be applied to a priority-2 button in situations where button hierarchy is needed. Applies normal weight text and slight transparency to element.

### Icons

#### States and Images

* `.ui-icon`: Base class to be applied to an icon element. Sets dimensions to 16px square block, hides inner text, sets background image to "content" state sprite image. **Note:** *`.ui-icon` class will be given a different sprite background image depending on its parent container. For example, a `ui-icon` element within a `ui-state-default` container will get colored according to the `ui-state-default`'s icon color.*

#### Icon Types

After declaring a `.ui-icon` class, you can follow up with a second class describing the type of icon you'd like. Icon classes generally follow a syntax of `.ui-icon-{icon type}-{icon sub description}-{direction}`.

For example, a single triangle icon pointing to the right looks like this:
`.ui-icon-triangle-1-e`

jQuery UI's [ThemeRoller](http://jqueryui.com/themeroller) provides the full set of CSS framework icons in its preview column. Hover over them to see the class name.

### Miscellaneous Visuals

#### Corner Radius Helpers

* `.ui-corner-tl`: Applies corner-radius to top left corner of element.
* `.ui-corner-tr`: Applies corner-radius to top right corner of element.
* `.ui-corner-bl`: Applies corner-radius to bottom left corner of element.
* `.ui-corner-br`: Applies corner-radius to bottom right corner of element.
* `.ui-corner-top`: Applies corner-radius to both top corners of element.
* `.ui-corner-bottom`: Applies corner-radius to both bottom corners of element.
* `.ui-corner-right`: Applies corner-radius to both right corners of element.
* `.ui-corner-left`: Applies corner-radius to both left corners of element.
* `.ui-corner-all`: Applies corner-radius to all four corners of element.

#### Overlay & Shadow

* `.ui-widget-overlay`: Applies 100% width and height dimensions to an overlay screen, along with background color/texture, and screen opacity.
* `.ui-widget-shadow`: Class to be applied to overlay with opacity, top/left offsets, and shadow "thickness". Thickness is applied via padding to all sides of a shadow that is set to match the dimensions of the overlay element. Offsets are applied via top and left margins (can be positive or negative).
