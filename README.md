EktronShareButtons
==================

This plugin is not specific to Ektron, but developed and shared by me as an Ektron employee. A jquery plugin and supporting files to get "share counts" for Twitter, Facebook, LinkedIn and Google+ and create stylable links that open in new tabs/windows, making sharing a more customizable, mobile-friendly experience.

Includes:

* jQuery plugin
* Example HTML
* ASHX handler for dealing with the Google API
* Share images

JQUERY PLUGIN
* Intended as a rough POC for now, will gain polish with time.
* Uses HTML5 data attributes to store information about the page to be shared.
* Can specify shared page url, title, and, in the case of Twitter, properties for via and a hash tag.
* Can use a "temporary" class that will be removed after the buttons are configured. This prevents the plugin from operating on the same elements again in cases where more are loaded into the same page via AJAX.
* Count defaults to 0 if there is an error or no data is returned.

FUTURE TASKS
* More configurable options for sharing:
	* Configure shared summary
	* Configure shared image
* Clean up code

If you run the html file directly from the filesystem, the GooglePlus count will fail to load. The handler must be used in a .NET enabled web site.