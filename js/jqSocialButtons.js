// jQuery Custom Social Button Plugin
// A plugin to retrieve and set share counts for custom sharing buttons.
// Supports: Facebook, Google, Twitter, LinkedIn
// version 0.1, January 29 2013
// by James "eGandalf" Stout

(function ($) {
    $.ekSocial = function (element, options) {

        var defaults = {
            removeClass: true,
            classToRemove: 'ekDoSet',
            facebookClass: 'facebook',
            googleClass: 'google',
            linkedinClass: 'linkedin',
            twitterClass: 'twitter',
            linkTarget: '_blank',
            //
            googleAPI: '/handlers/googleplus.ashx?url=',
            linkedinAPI: 'http://www.linkedin.com/countserv/count/share',
            facebookAPI: 'http://graph.facebook.com/',
            twitterAPI: 'http://cdn.api.twitter.com/1/urls/count.json',
            googleShare: 'https://plus.google.com/share?hl=en-US&url=',
            linkedInShare: 'http://www.linkedin.com/shareArticle?mini=true',
            facebookShare: 'http://www.facebook.com/sharer/sharer.php?u=',
            twitterShare: 'https://twitter.com/intent/tweet'
        };

        var plugin = this;

        plugin.settings = {
            removeClass: true,
            classToRemove: 'ekDoSet',
            facebookClass: 'facebook',
            googleClass: 'google',
            linkedinClass: 'linkedin',
            twitterClass: 'twitter',
            linkTarget: '_blank'
        };

        var $element = $(element),
             element = element;

        plugin.init = function () {
            plugin.settings = $.extend({}, defaults, options);
            if (plugin.settings.facebookClass != '') {
                var $fb_links = $element.find("." + plugin.settings.facebookClass);
                if ($fb_links.length > 0) {
                    configure_facebook($fb_links);
                }
            }
            if (plugin.settings.googleClass != '') {
                var $g_links = $element.find("." + plugin.settings.googleClass);
                if ($g_links.length > 0) {
                    configure_google($g_links);
                }
            }
            if (plugin.settings.linkedinClass != '') {
                var $in_links = $element.find('.' + plugin.settings.linkedinClass);
                if ($in_links.length > 0) {
                    configure_linkedin($in_links);
                }
            }
            if (plugin.settings.twitterClass != '') {
                var $tw_links = $element.find('.' + plugin.settings.twitterClass);
                if ($tw_links.length > 0) {
                    configure_twitter($tw_links);
                }
            }
            if (plugin.settings.removeClass) {
                $element.removeClass(plugin.settings.classToRemove);
            }
        };

        var configure_facebook = function ($links) {
            var fb_count = 0;
            var url = $element.data("url");
            var trimmedUrl = url.replace(/\/$/, '');
            $.ajax({
                url: plugin.settings.facebookAPI + encodeURIComponent(trimmedUrl),
                dataType: 'jsonp'
            }).done(function (data) {
                if (data.shares !== undefined) {
                    fb_count = data.shares;
                }
            }).always(function () {
                $links.each(function (index) {
                    var $link = $(this);
                    $link.find('span').text(fb_count);
                    $link.attr("href", plugin.settings.facebookShare + url);
                    $link.attr("target", plugin.settings.linkTarget);
                });
            });
        };

        var configure_google = function ($links) {
            var g_count = 0;
            var url = $element.data("url");
            $.ajax({
                url: plugin.settings.googleAPI + encodeURIComponent(url),
                dataType: 'json'
            }).done(function (data) {
                if (data[0].result.metadata.globalCounts.count !== undefined) {
                    g_count = data[0].result.metadata.globalCounts.count;
                }
            }).always(function () {
                $links.each(function (index) {
                    $link = $(this);
                    $link.find('span').text(g_count);
                    $link.attr("href", plugin.settings.googleShare + encodeURIComponent(url));
                    $link.attr("target", plugin.settings.linkTarget);
                });
            });
        };

        var configure_linkedin = function ($links) {
            var in_count = 0;
            var url = $element.data("url");
            var title = $element.data("title");
            $.ajax({
                url: plugin.settings.linkedinAPI + "?url=" + encodeURIComponent(url) + "&callback=?&format=jsonp",
                dataType: 'jsonp'
            }).done(function (data) {
                if (data.count !== undefined) {
                    in_count = data.count;
                }
            }).always(function () {
                $links.each(function (index) {
                    var $link = $(this);
                    var href = plugin.settings.linkedInShare;
                    if (title != '') {
                        href += "&title=" + encodeURIComponent(title);
                    }
                    href += "&url=" + encodeURIComponent(url);
                    $link.find('span').text(in_count);
                    $link.attr("href", href);
                    $link.attr("target", plugin.settings.linkTarget);
                });
            });
        };

        var configure_twitter = function ($links) {
            var tw_count = 0;
            var url = $element.data("url") != undefined ? $element.data("url") : '';
            var hash = $element.data("hash") != undefined ? $element.data("hash") : '';
            var title = $element.data("title") != undefined ? $element.data("title") : '';
            var via = $element.data("via") != undefined ? $element.data("via") : '';
            $.ajax({
                url: plugin.settings.twitterAPI + "?callback=?&url=" + encodeURIComponent(url),
                dataType: 'jsonp'
            }).done(function (data) {
                if (data.count !== undefined) {
                    tw_count = data.count;
                }
            }).always(function () {
                $links.each(function (index) {
                    var $link = $(this);
                    var hasParam = false;
                    var href = plugin.settings.twitterShare + '?';
                    if (hash != '') {
                        if (hasParam) { href += '&'; }
                        href += "hashtags=" + encodeURIComponent(hash);
                        hasParam = true;
                    }
                    if (title != '') {
                        if (hasParam) { href += '&'; }
                        href += "text=" + encodeURIComponent(title);
                        hasParam = true;
                    }
                    if (via != '') {
                        if (hasParam) { href += '&'; }
                        href += "via=" + encodeURIComponent(via);
                        hasParam = true;
                    }
                    if (hasParam) { href += '&'; }
                    href += "original_referrer=" + encodeURIComponent(document.location.href);
                    href += "&source=tweetbutton";
                    href += "&url=" + encodeURIComponent(url);

                    $link.find('span').text(tw_count);
                    $link.attr("href", href);
                    $link.attr("target", plugin.settings.linkTarget);
                });
            });
        };

        plugin.init();
    };

    $.fn.ekSocial = function (options) {
        return this.each(function () {
            if (undefined == $(this).data('ekSocial')) {
                var plugin = new $.ekSocial(this, options);
                $(this).data('ekSocial', plugin);
            }
        });
    };
})(jQuery);