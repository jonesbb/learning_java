var $j = jQuery.noConflict();

$j(function() {

	// #featured fader setup
	$j("#featured").cycle({
		timeout: 5250, //milliseconds between slide transitions (0 to disable auto advance) 
		speed: 750, // speed of the transition (any valid fx speed value) 
		delay: 1250, // additional delay (in ms) for first transition (hint: can be negative)
		slideExpr: "a img", // expression for selecting slides (if something other than all children of container is required)
		next: "#featured #next",  // id of element to use as click trigger for next slide
		prev: "#featured #prev"  // id of element to use as click trigger for previous slide 
	});

	// contact form setup
	$j("#foot-contact, #onpage-contact").alajaContact({
		emptyTextError: "Don't be shy! Please <strong>type something</strong> and ", //
		emptyEmailError: "We don't Spam. <strong>Add your Email</strong> and ", //
		enableAutoGrow: true // textarea auto grow (false - to disable)
	});

	// #showroom slider setup
	$j("#showroom").alajaShow({
		height: 600, // height in pixels (or "auto")
		width: 800, // width in pixels (or "auto")
		pixelsPerSecond: 30, // overage speed of the image transition
		minDisplayTime: 3000, // minimal time (in milliseconds) to display one image (can override "pixelsPerSecond")
		effect: "cross", // slide direction ("up", "down", "cross")
		IE: true // just simple fader in IE
		//, easing: "easeOutBounce" // easing style, other styles you can visualize here: http://www.robertpenner.com/easing/easing_demo.html
	});

});


// utilities onload

$j(function() {

	// body.js-on flag
	$j("body").addClass("js-on");

	// topmenu search
	if ($j(".search a", "#topmenu").length) {
		$j(".search a", "#topmenu").click(function() {
			var input = $j(".search input", "#topmenu");
			var form = $j(".search form", "#topmenu");

			$j(this).
				text($j(this).text() + ":"). // comment this line to disable adding ":"
				unbind().
				bind("click", function() { input.focus(); return false; });
			form.
				css({ display: "inline" });
			input.
				data("width", input.width()).
				css({ width: "1px" }).
				focus().
				animate({ width: input.data("width") });

			return false;
		});
	}

	// sleek page scrolling
	$j.localScroll({ duration: 500, easing: "easeInExpo" });

	// sleek image preload
	$j("#logo, #content").alajaImagePreloader();

	// setup Alaja Show
	$j(".alajaShow", "#content").alajaShow();

	// setup Alaja Tweet
	$j("ins.tweet").alajaTweet({ excludeReplies: true, showAge: true, clearTags: true });

	// togglers
	$j("dl.toggle").each(function() {
		var 
			holder = $j(this),
			trigger = holder.find("dt").css({ cursor: "pointer" }),
			triggerText = trigger.text(),
			triggerOn = "&ndash; " + triggerText,
			triggerOff = "+ " + triggerText,
			target = holder.find("dd").hide();

		trigger.html(triggerOff);

		trigger.toggle(function() {
			trigger.html(triggerOn);
			holder.addClass("active");
		}, function() {
			trigger.html(triggerOff);
			holder.removeClass("active");
		});

		trigger.click(function() {
			target.slideToggle("fast");
			return false;
		});

	});

	// Alaja fancybox setup
	{
		var videoWidth = 680, videoHeight = 495; // default playback window size

		var fancyboxRegion = "#content, #featured";
		var grab_param = function(name, url) { name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]"); var regexS = "[\\?&]" + name + "=([^&#]*)", regex = new RegExp(regexS), results = regex.exec(url); return (results == null) ? null : results[1]; }
		var get_w = function(href) { var res = grab_param("width", href); if (res == null) return videoWidth; return parseInt(res); }
		var get_h = function(href) { var res = grab_param("height", href); if (res == null) return videoHeight; return parseInt(res); }
		var formatTitle = function(title, currentArray, currentIndex, currentOpts) { var grouptext = (currentArray.length > 1) ? (currentIndex + 1) + " / " + currentArray.length + ". " : ""; title = (title) ? title : ""; return (currentArray.length == 1) ? "" : "<span id=\"fancybox-title-over\">" + grouptext + title + "</span>"; };
		var fancyboxDefaults = { titleFormat: formatTitle, titlePosition: "over", transitionIn: "elastic", transitionOut: "elastic", easingIn: "easeInExpo", easingOut: "easeOutExpo", padding: 0, centerOnScroll: true, hideOnContentClick: true, showCloseButton: false, opacity: true };
		var fancyboxVideoDefaults = { width: videoWidth, height: videoHeight, padding: 0, autoScale: false, hideOnContentClick: false, hideOnOverlayClick: false, transitionIn: "none", transitionOut: "none", centerOnScroll: true, title: "", type: "swf", swf: { wmode: "transparent", allowfullscreen: true} };
		var fancyboxMovDefaults = $j.extend({}, fancyboxVideoDefaults, { type: "mov", mov: { wmode: "transparent", autoplay: true, showlogo: false, type: "video/quicktime", cache: true, scale: "tofit", bgcolor: "white", postdomevents: true, controller: false} });

		$j("a.lightbox:not(.white, .black, .youtube, .vimeo, .mov)", fancyboxRegion).fancybox(fancyboxDefaults);
		$j("a.lightbox.white", fancyboxRegion).fancybox($j.extend({}, fancyboxDefaults, { overlayColor: "white", overlayOpacity: 4 / 5 }));
		$j("a.lightbox.black", fancyboxRegion).fancybox($j.extend({}, fancyboxDefaults, { overlayColor: "black", overlayOpacity: 3 / 4 }));
		$j("a.lightbox.youtube", fancyboxRegion).click(function() { $j.fancybox($j.extend({}, fancyboxVideoDefaults, { href: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/') + "&autoplay=1", width: get_w(this.href), height: get_h(this.href) })); return false; });
		$j("a.lightbox.vimeo", fancyboxRegion).click(function() { $j.fancybox($j.extend({}, fancyboxVideoDefaults, { href: this.href.replace(new RegExp("([0-9])", "i"), "moogaloop.swf?autoplay=1&clip_id=$1"), width: get_w(this.href), height: get_h(this.href) })); return false; });
		$j("a.lightbox.mov", fancyboxRegion).click(function() { $j.fancybox($j.extend({}, fancyboxMovDefaults, { href: this.href, width: get_w(this.href), height: get_h(this.href) })); return false; });
	}

});


// --------------------------------------------------------------------------
// Alaja jQuery plugins

/*
* Alaja Tweet, Alaja Show, Alaja Contact, Alaja Image Preloader
* Copyright 2010 Alaja Web Solutions
* All rights reserved.
*/

(function($) {

	// * * * * * * * * * * * * * * * * * * * * * * * * 
	// Alaja Tweet

	$.fn.alajaTweet = function(options) {

		var defaults = {
			excludeReplies: false,
			clearTags: false,
			showAge: false,
			cutOff: 20 * 2
		};

		var options = $.extend(defaults, options);

		return this.each(function() {
			var 
				holder = $(this),
				username = this.getAttribute("cite"),
				url = "http://twitter.com/status/user_timeline/" + username + ".json?count=" + options.cutOff + "&callback=?";

			holder.fn = {

				init: function() {
					$.getJSON(url, function(data) {
						$(data).each(function(i, t) {

							if (t.in_reply_to_user_id != null && options.excludeReplies)
								return;

							holder.fn.placeTweet(t);
							return false;
						});
					});
				},

				placeTweet: function(t) {
					var 
						html = t.text,
						age = holder.fn.getAge(t),
						recreateUrls = function(t) { return t.replace(/((ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?)/gi, "<a href=\"$1\">$1</a>"); },
						clearTags = function(t) { return t.replace(/[\#]+([A-Za-z0-9-_]+)/gi, ""); };

					html = recreateUrls(html);
					if (options.clearTags)
						html = clearTags(html);
					if (options.showAge)
						html = html + " (" + age + ")";

					holder.html(html);
				},

				getAge: function(t) {
					var 
						age = Date.parse(t.created_at.replace(/^([a-z]{3})( [a-z]{3} \d\d?)(.*)( \d{4})$/i, "$1,$2$4$3")),
						rage = parseInt(((new Date()).getTime() - age) / 1000), // relative age in seconds
						plur = function(s, n) { return n + " " + s + (n == 1 ? "" : "s") + " ago"; };

					if (rage < 60) return "less than a minute ago";
					if ((rage /= 60) < 60) return plur("minute", ~ ~rage);
					if ((rage /= 60) < 24) return plur("hour", ~ ~rage);
					return plur("day", ~ ~(rage /= 24));
				}
			}

			holder.fn.init();

		});
	}

	// * * * * * * * * * * * * * * * * * * * * * * * * 
	// Alaja Show

	$.fn.alajaShow = function(options) {

		var defaults = {
			height: "auto",
			width: "auto",
			minDisplayTime: 4000,
			pixelsPerSecond: 30,
			effect: "cross",
			easing: "jswing",
			bgColorContainer: "#main",
			IE: true
		};

		var options = $.extend(defaults, options);

		return this.filter(":has(img ~ img)").each(function() {

			var 
				holder = $(this).css({ opacity: 0 }).prepend($(this).find("img.active").clone().removeClass("active")),
				imgs = holder.find('img:not(.active)'), cache,
				fadeTime = options.minDisplayTime / 1.5, timer,
				imgeq = 0, counter = 0,
				buffer,
				height, width;

			holder.fn = {

				init: function() {

					if (!holder.fn.isReady())
						return;

					clearInterval(initTimer);

					height = (options.height == "auto") ? holder.height() : options.height;
					width = (options.width == "auto") ? holder.width() : options.width;

					buffer = $("<div/>", { "class": "buffer",
						css: {
							backgroundColor: $(options.bgColorContainer).css("backgroundColor"),
							backgroundRepeat: "no-repeat",
							display: "block",
							position: "absolute",
							width: width, height: height,
							opacity: 0,
							zIndex: 10
						}
					});

					holder.
						css({ display: "block", position: "relative", width: width, height: height, opacity: 1 }).
						html(null);

					if ($.browser.msie && options.IE) {
						holder.
							html(imgs).
							cycle({ timeout: options.minDisplayTime });
						return;
					}

					holder.fn.go();
				},

				// are the images ready?
				isReady: function() {
					var result = true;

					cache = $.map(imgs, function(img, i) {
						return { w: $(img).width(), h: $(img).height(), src: $(img).attr("src") };
					});

					$(cache).each(function() {
						if (this.w == 0 || this.h == 0 || this.src == "") { result = false; return false; }
					});

					return result;
				},

				// setup the timers
				go: function() {
					clearInterval(timer);
					timer = setInterval(function() { holder.fn.go() }, holder.fn.next());
				},

				// next slide calculations
				next: function() {
					var 
						img = imgs.eq(imgeq),
						offheight = Math.max(0, cache[imgeq].h - height),
						offwidth = width - cache[imgeq].w,
						duration = Math.max((offheight / options.pixelsPerSecond) * 1000, options.minDisplayTime);

					holder.fn.addSlide(img, offheight, offwidth, duration);
					imgeq = (imgeq + 1 == imgs.length) ? 0 : imgeq + 1;
					counter = counter + 1;

					return duration;
				},

				// add to the holder & animate new slide
				addSlide: function(img, offheight, offwidth, duration) {
					var 
						startBgPos = offwidth / 2 + "px 0px",
						endBgPos = offwidth / 2 + "px -" + offheight + "px";

					if (options.effect == "down" || (options.effect == "cross" && counter % 2)) {
						var a = startBgPos;
						startBgPos = endBgPos;
						endBgPos = a;
					}

					var slide = buffer.clone().css({ backgroundImage: "url(" + cache[imgeq].src + ")", backgroundPosition: startBgPos });

					holder.append(slide);

					slide.
						animate({ opacity: 1 }, { queue: false, duration: fadeTime }).
						animate({ backgroundPosition: endBgPos }, duration, options.easing, function() { $(this).animate({ opacity: 0 }, { duration: fadeTime, complete: function() { $(this).remove(); } }) });
				}
			}

			var initTimer = setInterval(function() { holder.fn.init() }, 100);

		});
	};

	// * * * * * * * * * * * * * * * * * * * * * * * * 
	// Alaja Image Preloader

	$.fn.alajaImagePreloader = function(options) {

		var defaults = { animationCurfew: 500, preloadedImageClass: "preloaded", timeLimit: 2000 };
		var options = $.extend(defaults, options);

		return this.each(function() {

			var imgList = $(this).find("img:not(." + options.preloadedImageClass + ")");
			var startedIn = (new Date()).getTime();

			imgList.parent("a").css({ border: "none" });

			if ($.browser.msie) return;
			imgList.each(function() {
				var img = $(this);
				img.data("src", img.attr("src")).attr("src", "").css({ opacity: 0 });
			});

			load(0);

			function load(id) {
				var img = imgList.eq(id);

				if (img.length) {
					img.attr("src", img.data("src"));
					img.load(function() {
						var loaded = $(this).addClass(options.preloadedImageClass);

						if ((new Date()).getTime() - startedIn > options.animationCurfew)
							loaded.animate({ opacity: 1 }, 'slow', function() { $(this).attr("style", ""); });
						else
							loaded.attr("style", "");
					});

					load(id + 1);
				}
			}
		});

	};


	// * * * * * * * * * * * * * * * * * * * * * * * * 
	// Alaja Contact

	$.fn.alajaContact = function(options) {

		var defaults = {
			emptyTextError: "Don't be shy! Type something and re-",
			emptyEmailError: "We don't spam! Add your Email and re-",
			enableAutoGrow: true
		};

		var options = $.extend(defaults, options);

		return this.filter("form").each(function() {
			var form = $(this);
			var textarea = form.find("textarea");
			var label = form.find("label.textarea");
			var submit = form.find("input[type=submit]");
			var error = form.find("span.error");
			var newsubmit = $("<a/>", { href: "#", text: submit.val() });

			if (options.enableAutoGrow)
				textarea.attr("rows", 2).elastic();

			submit.replaceWith(newsubmit);

			newsubmit.click(function() {
				var 
					message = textarea.val(),
					isEmptyText = !(jQuery.trim(message).length > 0),
					isEmptyEmail = !(message.match(/[a-zA-Z0-9_\.\-]+\@([a-zA-Z0-9\-]+\.)+[a-zA-Z0-9]{2,4}/));

				if (isEmptyText || isEmptyEmail) {
					error.html(isEmptyText ? options.emptyTextError : options.emptyEmailError);
					label.focus();
					return false;
				}

				error.html("");
				newsubmit.remove();

				$.post(form.attr("action"), form.serialize(), function(msg) {
					form.fadeOut(function() { form.replaceWith(msg).fadeIn() });
				});

				return false;
			});
		});
	};

	// * * * * * * * * * * * * * * * * * * * * * * * *

	$.iSafari = function() {
		return (/Apple/.test(navigator.vendor));
	}

})(jQuery);



// --------------------------------------------------------------------------
// jQuery 3rd party plugins


/*
* jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
* Open source under the BSD License. 
* Copyright 2008 George McGinley Smith
* Copyright 2001 Robert Penner
* All rights reserved.
*/
; jQuery.easing['jswing'] = jQuery.easing['swing']; jQuery.extend(jQuery.easing, { def: 'easeOutExpo', swing: function(x, t, b, c, d) { return jQuery.easing[jQuery.easing.def](x, t, b, c, d) }, easeInQuad: function(x, t, b, c, d) { return c * (t /= d) * t + b }, easeOutQuad: function(x, t, b, c, d) { return -c * (t /= d) * (t - 2) + b }, easeInOutQuad: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t + b; return -c / 2 * ((--t) * (t - 2) - 1) + b }, easeInCubic: function(x, t, b, c, d) { return c * (t /= d) * t * t + b }, easeOutCubic: function(x, t, b, c, d) { return c * ((t = t / d - 1) * t * t + 1) + b }, easeInOutCubic: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t + b; return c / 2 * ((t -= 2) * t * t + 2) + b }, easeInQuart: function(x, t, b, c, d) { return c * (t /= d) * t * t * t + b }, easeOutQuart: function(x, t, b, c, d) { return -c * ((t = t / d - 1) * t * t * t - 1) + b }, easeInOutQuart: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b; return -c / 2 * ((t -= 2) * t * t * t - 2) + b }, easeInQuint: function(x, t, b, c, d) { return c * (t /= d) * t * t * t * t + b }, easeOutQuint: function(x, t, b, c, d) { return c * ((t = t / d - 1) * t * t * t * t + 1) + b }, easeInOutQuint: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b; return c / 2 * ((t -= 2) * t * t * t * t + 2) + b }, easeInSine: function(x, t, b, c, d) { return -c * Math.cos(t / d * (Math.PI / 2)) + c + b }, easeOutSine: function(x, t, b, c, d) { return c * Math.sin(t / d * (Math.PI / 2)) + b }, easeInOutSine: function(x, t, b, c, d) { return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b }, easeInExpo: function(x, t, b, c, d) { return (t == 0) ? b : c * Math.pow(2, 10 * (t / d - 1)) + b }, easeOutExpo: function(x, t, b, c, d) { return (t == d) ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b }, easeInOutExpo: function(x, t, b, c, d) { if (t == 0) return b; if (t == d) return b + c; if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b; return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b }, easeInCirc: function(x, t, b, c, d) { return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b }, easeOutCirc: function(x, t, b, c, d) { return c * Math.sqrt(1 - (t = t / d - 1) * t) + b }, easeInOutCirc: function(x, t, b, c, d) { if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b; return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b }, easeInElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b }, easeOutElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3; if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b }, easeInOutElastic: function(x, t, b, c, d) { var s = 1.70158; var p = 0; var a = c; if (t == 0) return b; if ((t /= d / 2) == 2) return b + c; if (!p) p = d * (.3 * 1.5); if (a < Math.abs(c)) { a = c; var s = p / 4 } else var s = p / (2 * Math.PI) * Math.asin(c / a); if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b; return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b }, easeInBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * (t /= d) * t * ((s + 1) * t - s) + b }, easeOutBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b }, easeInOutBack: function(x, t, b, c, d, s) { if (s == undefined) s = 1.70158; if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= (1.525)) + 1) * t - s)) + b; return c / 2 * ((t -= 2) * t * (((s *= (1.525)) + 1) * t + s) + 2) + b }, easeInBounce: function(x, t, b, c, d) { return c - jQuery.easing.easeOutBounce(x, d - t, 0, c, d) + b }, easeOutBounce: function(x, t, b, c, d) { if ((t /= d) < (1 / 2.75)) { return c * (7.5625 * t * t) + b } else if (t < (2 / 2.75)) { return c * (7.5625 * (t -= (1.5 / 2.75)) * t + .75) + b } else if (t < (2.5 / 2.75)) { return c * (7.5625 * (t -= (2.25 / 2.75)) * t + .9375) + b } else { return c * (7.5625 * (t -= (2.625 / 2.75)) * t + .984375) + b } }, easeInOutBounce: function(x, t, b, c, d) { if (t < d / 2) return jQuery.easing.easeInBounce(x, t * 2, 0, c, d) * .5 + b; return jQuery.easing.easeOutBounce(x, t * 2 - d, 0, c, d) * .5 + c * .5 + b } });

/*
* jQuery Cycle Lite Plugin
* Copyright (c) 2008 M. Alsup
* Version: 1.0 (06/08/2008)
* Dual licensed under the MIT and GPL licenses:
* http://www.opensource.org/licenses/mit-license.php
* http://www.gnu.org/licenses/gpl.html
* Requires: jQuery v1.2.3 or later
*/
; (function(D) { var A = "Lite-1.0"; D.fn.cycle = function(E) { return this.each(function() { E = E || {}; if (this.cycleTimeout) { clearTimeout(this.cycleTimeout) } this.cycleTimeout = 0; this.cyclePause = 0; var I = D(this); var J = E.slideExpr ? D(E.slideExpr, this) : I.children(); var G = J.get(); if (G.length < 2) { if (window.console && window.console.log) { window.console.log("terminating; too few slides: " + G.length) } return } var H = D.extend({}, D.fn.cycle.defaults, E || {}, D.metadata ? I.metadata() : D.meta ? I.data() : {}); H.before = H.before ? [H.before] : []; H.after = H.after ? [H.after] : []; H.after.unshift(function() { H.busy = 0 }); var F = this.className; H.width = parseInt((F.match(/w:(\d+)/) || [])[1]) || H.width; H.height = parseInt((F.match(/h:(\d+)/) || [])[1]) || H.height; H.timeout = parseInt((F.match(/t:(\d+)/) || [])[1]) || H.timeout; if (I.css("position") == "static") { I.css("position", "relative") } if (H.width) { I.width(H.width) } if (H.height && H.height != "auto") { I.height(H.height) } var K = 0; J.css({ position: "absolute", top: 0, left: 0 }).hide().each(function(M) { D(this).css("z-index", G.length - M) }); D(G[K]).css("opacity", 1).show(); if (D.browser.msie) { G[K].style.removeAttribute("filter") } if (H.fit && H.width) { J.width(H.width) } if (H.fit && H.height && H.height != "auto") { J.height(H.height) } if (H.pause) { I.hover(function() { this.cyclePause = 1 }, function() { this.cyclePause = 0 }) } D.fn.cycle.transitions.fade(I, J, H); J.each(function() { var M = D(this); this.cycleH = (H.fit && H.height) ? H.height : M.height(); this.cycleW = (H.fit && H.width) ? H.width : M.width() }); J.not(":eq(" + K + ")").css({ opacity: 0 }); if (H.cssFirst) { D(J[K]).css(H.cssFirst) } if (H.timeout) { if (H.speed.constructor == String) { H.speed = { slow: 600, fast: 200}[H.speed] || 400 } if (!H.sync) { H.speed = H.speed / 2 } while ((H.timeout - H.speed) < 250) { H.timeout += H.speed } } H.speedIn = H.speed; H.speedOut = H.speed; H.slideCount = G.length; H.currSlide = K; H.nextSlide = 1; var L = J[K]; if (H.before.length) { H.before[0].apply(L, [L, L, H, true]) } if (H.after.length > 1) { H.after[1].apply(L, [L, L, H, true]) } if (H.click && !H.next) { H.next = H.click } if (H.next) { D(H.next).bind("click", function() { return C(G, H, H.rev ? -1 : 1) }) } if (H.prev) { D(H.prev).bind("click", function() { return C(G, H, H.rev ? 1 : -1) }) } if (H.timeout) { this.cycleTimeout = setTimeout(function() { B(G, H, 0, !H.rev) }, H.timeout + (H.delay || 0)) } }) }; function B(J, E, I, K) { if (E.busy) { return } var H = J[0].parentNode, M = J[E.currSlide], L = J[E.nextSlide]; if (H.cycleTimeout === 0 && !I) { return } if (I || !H.cyclePause) { if (E.before.length) { D.each(E.before, function(N, O) { O.apply(L, [M, L, E, K]) }) } var F = function() { if (D.browser.msie) { this.style.removeAttribute("filter") } D.each(E.after, function(N, O) { O.apply(L, [M, L, E, K]) }) }; if (E.nextSlide != E.currSlide) { E.busy = 1; D.fn.cycle.custom(M, L, E, F) } var G = (E.nextSlide + 1) == J.length; E.nextSlide = G ? 0 : E.nextSlide + 1; E.currSlide = G ? J.length - 1 : E.nextSlide - 1 } if (E.timeout) { H.cycleTimeout = setTimeout(function() { B(J, E, 0, !E.rev) }, E.timeout) } } function C(E, F, I) { var H = E[0].parentNode, G = H.cycleTimeout; if (G) { clearTimeout(G); H.cycleTimeout = 0 } F.nextSlide = F.currSlide + I; if (F.nextSlide < 0) { F.nextSlide = E.length - 1 } else { if (F.nextSlide >= E.length) { F.nextSlide = 0 } } B(E, F, 1, I >= 0); return false } D.fn.cycle.custom = function(K, H, I, E) { var J = D(K), G = D(H); G.css({ opacity: 0 }); var F = function() { G.animate({ opacity: 1 }, I.speedIn, I.easeIn, E) }; J.animate({ opacity: 0 }, I.speedOut, I.easeOut, function() { J.css({ display: "none" }); if (!I.sync) { F() } }); if (I.sync) { F() } }; D.fn.cycle.transitions = { fade: function(F, G, E) { G.not(":eq(0)").css("opacity", 0); E.before.push(function() { D(this).show() }) } }; D.fn.cycle.ver = function() { return A }; D.fn.cycle.defaults = { timeout: 4000, speed: 1000, next: null, prev: null, before: null, after: null, height: "auto", sync: 1, fit: 0, pause: 0, delay: 0, slideExpr: null} })(jQuery);

/*
* jQuery.ScrollTo - Easy element scrolling using jQuery.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 5/25/2009
*/
; (function(d) { var k = d.scrollTo = function(a, i, e) { d(window).scrollTo(a, i, e) }; k.defaults = { axis: 'xy', duration: parseFloat(d.fn.jquery) >= 1.3 ? 0 : 1 }; k.window = function(a) { return d(window)._scrollable() }; d.fn._scrollable = function() { return this.map(function() { var a = this, i = !a.nodeName || d.inArray(a.nodeName.toLowerCase(), ['iframe', '#document', 'html', 'body']) != -1; if (!i) return a; var e = (a.contentWindow || a).document || a.ownerDocument || a; return d.browser.safari || e.compatMode == 'BackCompat' ? e.body : e.documentElement }) }; d.fn.scrollTo = function(n, j, b) { if (typeof j == 'object') { b = j; j = 0 } if (typeof b == 'function') b = { onAfter: b }; if (n == 'max') n = 9e9; b = d.extend({}, k.defaults, b); j = j || b.speed || b.duration; b.queue = b.queue && b.axis.length > 1; if (b.queue) j /= 2; b.offset = p(b.offset); b.over = p(b.over); return this._scrollable().each(function() { var q = this, r = d(q), f = n, s, g = {}, u = r.is('html,body'); switch (typeof f) { case 'number': case 'string': if (/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)) { f = p(f); break } f = d(f, this); case 'object': if (f.is || f.style) s = (f = d(f)).offset() } d.each(b.axis.split(''), function(a, i) { var e = i == 'x' ? 'Left' : 'Top', h = e.toLowerCase(), c = 'scroll' + e, l = q[c], m = k.max(q, i); if (s) { g[c] = s[h] + (u ? 0 : l - r.offset()[h]); if (b.margin) { g[c] -= parseInt(f.css('margin' + e)) || 0; g[c] -= parseInt(f.css('border' + e + 'Width')) || 0 } g[c] += b.offset[h] || 0; if (b.over[h]) g[c] += f[i == 'x' ? 'width' : 'height']() * b.over[h] } else { var o = f[h]; g[c] = o.slice && o.slice(-1) == '%' ? parseFloat(o) / 100 * m : o } if (/^\d+$/.test(g[c])) g[c] = g[c] <= 0 ? 0 : Math.min(g[c], m); if (!a && b.queue) { if (l != g[c]) t(b.onAfterFirst); delete g[c] } }); t(b.onAfter); function t(a) { r.animate(g, j, b.easing, a && function() { a.call(this, n, b) }) } }).end() }; k.max = function(a, i) { var e = i == 'x' ? 'Width' : 'Height', h = 'scroll' + e; if (!d(a).is('html,body')) return a[h] - d(a)[e.toLowerCase()](); var c = 'client' + e, l = a.ownerDocument.documentElement, m = a.ownerDocument.body; return Math.max(l[h], m[h]) - Math.min(l[c], m[c]) }; function p(a) { return typeof a == 'object' ? a : { top: a, left: a} } })(jQuery);

/*
* jQuery.LocalScroll - Animated scrolling navigation, using anchors.
* Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
* Dual licensed under MIT and GPL.
* Date: 3/11/2009
*/
; (function($) { var l = location.href.replace(/#.*/, ''); var g = $.localScroll = function(a) { $('body').localScroll(a) }; g.defaults = { duration: 1e3, axis: 'y', event: 'click', stop: true, target: window, reset: true }; g.hash = function(a) { if (location.hash) { a = $.extend({}, g.defaults, a); a.hash = false; if (a.reset) { var e = a.duration; delete a.duration; $(a.target).scrollTo(0, a); a.duration = e } i(0, location, a) } }; $.fn.localScroll = function(b) { b = $.extend({}, g.defaults, b); return b.lazy ? this.bind(b.event, function(a) { var e = $([a.target, a.target.parentNode]).filter(d)[0]; if (e) i(a, e, b) }) : this.find('a,area').filter(d).bind(b.event, function(a) { i(a, this, b) }).end().end(); function d() { return !!this.href && !!this.hash && this.href.replace(this.hash, '') == l && (!b.filter || $(this).is(b.filter)) } }; function i(a, e, b) { var d = e.hash.slice(1), f = document.getElementById(d) || document.getElementsByName(d)[0]; if (!f) return; if (a) a.preventDefault(); var h = $(b.target); if (b.lock && h.is(':animated') || b.onBefore && b.onBefore.call(b, a, f, h) === false) return; if (b.stop) h.stop(true); if (b.hash) { var j = f.id == d ? 'id' : 'name', k = $('<a> </a>').attr(j, d).css({ position: 'absolute', top: $(window).scrollTop(), left: $(window).scrollLeft() }); f[j] = ''; $('body').prepend(k); location = e.hash; k.remove(); f[j] = d } h.scrollTo(f, b).trigger('notify.serialScroll', [f]) } })(jQuery);

/*
* Elastic by Jan Jarfalk
* http://www.unwrongest.com
* MIT License - http://www.opensource.org/licenses/mit-license.php
*/
; (function(jQuery) { jQuery.fn.extend({ elastic: function() { var mimics = ['paddingTop', 'paddingRight', 'paddingBottom', 'paddingLeft', 'fontSize', 'lineHeight', 'fontFamily', 'width', 'fontWeight']; return this.each(function() { if (this.type != 'textarea') { return false } var $textarea = jQuery(this), $twin = jQuery('<div />').css({ 'position': 'absolute', 'display': 'none', 'word-wrap': 'break-word' }), lineHeight = parseInt($textarea.css('line-height'), 10) || parseInt($textarea.css('font-size'), '10'), minheight = parseInt($textarea.css('height'), 10) || lineHeight * 3, maxheight = parseInt($textarea.css('max-height'), 10) || Number.MAX_VALUE, goalheight = 0, i = 0; if (maxheight < 0) { maxheight = Number.MAX_VALUE } $twin.appendTo($textarea.parent()); var i = mimics.length; while (i--) { $twin.css(mimics[i].toString(), $textarea.css(mimics[i].toString())) } function setHeightAndOverflow(height, overflow) { curratedHeight = Math.floor(parseInt(height, 10)); if ($textarea.height() != curratedHeight) { $textarea.css({ 'height': curratedHeight + 'px', 'overflow': overflow }) } } function update() { var textareaContent = $textarea.val().replace(/&/g, '&amp;').replace(/  /g, '&nbsp;').replace(/<|>/g, '&gt;').replace(/\n/g, '<br />'); var twinContent = $twin.html(); if (textareaContent + '&nbsp;' != twinContent) { $twin.html(textareaContent + '&nbsp;'); if (Math.abs($twin.height() + lineHeight - $textarea.height()) > 3) { var goalheight = $twin.height() + lineHeight; if (goalheight >= maxheight) { setHeightAndOverflow(maxheight, 'auto') } else if (goalheight <= minheight) { setHeightAndOverflow(minheight, 'hidden') } else { setHeightAndOverflow(goalheight, 'hidden') } } } } $textarea.css({ 'overflow': 'hidden' }); $textarea.keyup(function() { update() }).keydown(function() { update() }); $textarea.live('input paste', function(e) { setTimeout(update, 250) }); update() }) } }) })(jQuery);

/*
* Background-Position Animation Plugin v. 1.21
* Alexander Farkas
* Dual licensed under MIT and GPL.
*/
; (function($) { if (!document.defaultView || !document.defaultView.getComputedStyle) { var oldCurCSS = jQuery.curCSS; jQuery.curCSS = function(elem, name, force) { if (name === 'background-position') { name = 'backgroundPosition' } if (name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[name]) { return oldCurCSS.apply(this, arguments) } var style = elem.style; if (!force && style && style[name]) { return style[name] } return oldCurCSS(elem, 'backgroundPositionX', force) + ' ' + oldCurCSS(elem, 'backgroundPositionY', force) } } var oldAnim = $.fn.animate; $.fn.animate = function(prop) { if ('background-position' in prop) { prop.backgroundPosition = prop['background-position']; delete prop['background-position'] } if ('backgroundPosition' in prop) { prop.backgroundPosition = '(' + prop.backgroundPosition } return oldAnim.apply(this, arguments) }; function toArray(strg) { strg = strg.replace(/left|top/g, '0px'); strg = strg.replace(/right|bottom/g, '100%'); strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g, "$1px$2"); var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/); return [parseFloat(res[1], 10), res[2], parseFloat(res[3], 10), res[4]] } $.fx.step.backgroundPosition = function(fx) { if (!fx.bgPosReady) { var start = $.curCSS(fx.elem, 'backgroundPosition'); if (!start) { start = '0px 0px' } start = toArray(start); fx.start = [start[0], start[2]]; var end = toArray(fx.options.curAnim.backgroundPosition); fx.end = [end[0], end[2]]; fx.unit = [end[1], end[3]]; fx.bgPosReady = true } var nowPosX = []; nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0]; nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1]; fx.elem.style.backgroundPosition = nowPosX[0] + ' ' + nowPosX[1] } })(jQuery);

/* 
* Copyright (c) 2009 Brandon Aaron (http://brandonaaron.net)
* Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
* and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
*/
; (function(c) { var a = ["DOMMouseScroll", "mousewheel"]; c.event.special.mousewheel = { setup: function() { if (this.addEventListener) { for (var d = a.length; d; ) { this.addEventListener(a[--d], b, false) } } else { this.onmousewheel = b } }, teardown: function() { if (this.removeEventListener) { for (var d = a.length; d; ) { this.removeEventListener(a[--d], b, false) } } else { this.onmousewheel = null } } }; c.fn.extend({ mousewheel: function(d) { return d ? this.bind("mousewheel", d) : this.trigger("mousewheel") }, unmousewheel: function(d) { return this.unbind("mousewheel", d) } }); function b(f) { var d = [].slice.call(arguments, 1), g = 0, e = true; f = c.event.fix(f || window.event); f.type = "mousewheel"; if (f.wheelDelta) { g = f.wheelDelta / 120 } if (f.detail) { g = -f.detail / 3 } d.unshift(f, g); return c.event.handle.apply(this, d) } })(jQuery);