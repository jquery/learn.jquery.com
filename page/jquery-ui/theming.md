<script>{
	"title": "Theming jQuery UI",
	"level": "intermediate"
}</script>

All jQuery UI plugins are designed to allow a developer to seamlessly integrate UI widgets into the look and feel of their site or application. Each plugin is styled with CSS and contains two layers of style information: standard [jQuery UI CSS Framework](http://api.jqueryui.com/theming/css-framework/) styles and plugin-specific styles.

The jQuery UI CSS Framework provide semantic presentation classes to indicate the role of an element within a widget such as a header, content area, or clickable region. These are applied consistently across all widgets so a clickable tab, accordion, or button will all have the same `ui-state-default` class applied to indicate that it is clickable. When a user mouses over one of these elements, this class is changed to `ui-state-hover`, then `ui-state-active` when selected. This level of class consistency makes it easy to ensure that all elements with a similar role or interaction state will look the same across all widgets.

The CSS Framework styles are encapsulated in a single file called `theme.css` and this is the file modified by the [ThemeRoller](/jquery-ui/theming/themeroller/) application. Framework styles only include attributes that affect the look and feel (primarily color, background images, and icons) so these are "safe" styles that will not affect functionality of individual plugins. This separation means that a developer can create a custom look and feel by modifying the colors and images in the `theme.css` file and know that as future plugins or bug fixes become available, these should work with the theme without modification.

Since the framework styles only cover look and feel, plugin specific stylesheets are separated. These contain all the additional structural style rules required to make the widget functional, such as dimensions, padding, margins, positioning, and floats. When downloading jQuery UI, these can be found in `jquery-ui.structure.css`.

We encourage all developers creating jQuery plugins to leverage the jQuery UI CSS Framework because it will make it much easier for end users to theme and use your plugin.

### Getting started

There are three general approaches to theming jQuery UI plugins:

* **Download a ThemeRoller theme**: The easiest way to build a theme is to use [ThemeRoller](/jquery-ui/theming/themeroller/) to generate and download a theme. This app will create a new `jquery-ui.theme.css` file and an `images` directory containing all necessary background images and icon sprites which can simply be dropped into your project. This approach will be the easiest to create and maintain but limits customization to the options provided in ThemeRoller.
* **Modify the CSS files**: To get a bit more control over the look and feel, you may choose to start with the default theme (Smoothness) or a ThemeRoller-generated theme and then adjust the `jquery-ui.theme.css` file or any of the individual plugin stylesheets. For example, you could easily tweak the corner radius for all buttons to be different than the rest of the UI components or change the path for the icon sprite to use a custom set.  With a bit of style scoping, you can even use multiple themes together in a single UI. To keep maintenance simple, restricting changes to just the `jquery-ui.theme.css` file and images is recommended.
* **Write completely custom CSS**: For the greatest amount of control, the CSS for each plugin can be written from scratch without using the framework classes or plugin-specific stylesheet. This may be necessary if the desired look and feel can't be achieved by modifying the CSS or if highly customized markup is used. This approach requires deep expertise in CSS and will require manual updates for future plugins.
