/*         ______________________________________
  ________|                                      |_______
  \       |           SmartAdmin WebApp          |      /
   \      |      Copyright © 2014 MyOrange       |     /
   /      |______________________________________|     \
  /__________)                                (_________\

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * =======================================================================
 * SmartAdmin is FULLY owned and LICENSED by MYORANGE INC.
 * This script may NOT be RESOLD or REDISTRUBUTED under any
 * circumstances, and is only to be used with this purchased
 * copy of SmartAdmin Template.
 * =======================================================================
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * =======================================================================
 * original filename: app.config.js
 * filesize: ??
 * author: Sunny (@bootstraphunt)
 * email: info@myorange.ca
 * =======================================================================
 *
 * APP CONFIGURATION (HTML/AJAX/PHP Versions ONLY)
 * Description: Enable / disable certain theme features here
 * GLOBAL: Your left nav in your app will no longer fire ajax calls, set 
 * it to false for HTML version
 */	
	$.navAsAjax = true; 
/*
 * GLOBAL: Sound Config
 */
	$.sound_path = "sound/";
	$.sound_on = true; 
/*
 * Impacts the responce rate of some of the responsive elements (lower 
 * value affects CPU but improves speed)
 */
	var throttle_delay = 350,
/*
 * The rate at which the menu expands revealing child elements on click
 */
	menu_speed = 235,	
/*
 * Turn on JarvisWidget functionality
 * dependency: js/jarviswidget/jarvis.widget.min.js
 */
	enableJarvisWidgets = true,
/*
 * Warning: Enabling mobile widgets could potentially crash your webApp 
 * if you have too many widgets running at once 
 * (must have enableJarvisWidgets = true)
 */
	enableMobileWidgets = true,	
/*
 * Turn on fast click for mobile devices?
 * Enable this to activate fastclick plugin
 * dependency: js/plugin/fastclick/fastclick.js 
 */
	fastClick = false,
/*
 * These elements are ignored during DOM object deletion for ajax version 
 * It will delete all objects during page load with these exceptions:
 */
	ignore_key_elms = ["#headerSlider, #left-panel, #main, div.page-footer, #shortcut, #divSmallBoxes, #divMiniIcons, #divbigBoxes, #voiceModal, script"],
/*
 * VOICE COMMAND CONFIG
 * dependency: voicecommand.js
 */
	voice_command = true,
/*
 * Turns on speech without asking
 */	
	voice_command_auto = false,
/*
 * 	Sets the language to the default 'en-US'. (supports over 50 languages 
 * 	by google)
 * 
 *  Afrikaans         ['af-ZA']
 *  Bahasa Indonesia  ['id-ID']
 *  Bahasa Melayu     ['ms-MY']
 *  Català            ['ca-ES']
 *  Čeština           ['cs-CZ']
 *  Deutsch           ['de-DE']
 *  English           ['en-AU', 'Australia']
 *                    ['en-CA', 'Canada']
 *                    ['en-IN', 'India']
 *                    ['en-NZ', 'New Zealand']
 *                    ['en-ZA', 'South Africa']
 *                    ['en-GB', 'United Kingdom']
 *                    ['en-US', 'United States']
 *  Español           ['es-AR', 'Argentina']
 *                    ['es-BO', 'Bolivia']
 *                    ['es-CL', 'Chile']
 *                    ['es-CO', 'Colombia']
 *                    ['es-CR', 'Costa Rica']
 *                    ['es-EC', 'Ecuador']
 *                    ['es-SV', 'El Salvador']
 *                    ['es-ES', 'España']
 *                    ['es-US', 'Estados Unidos']
 *                    ['es-GT', 'Guatemala']
 *                    ['es-HN', 'Honduras']
 *                    ['es-MX', 'México']
 *                    ['es-NI', 'Nicaragua']
 *                    ['es-PA', 'Panamá']
 *                    ['es-PY', 'Paraguay']
 *                    ['es-PE', 'Perú']
 *                    ['es-PR', 'Puerto Rico']
 *                    ['es-DO', 'República Dominicana']
 *                    ['es-UY', 'Uruguay']
 *                    ['es-VE', 'Venezuela']
 *  Euskara           ['eu-ES']
 *  Français          ['fr-FR']
 *  Galego            ['gl-ES']
 *  Hrvatski          ['hr_HR']
 *  IsiZulu           ['zu-ZA']
 *  Íslenska          ['is-IS']
 *  Italiano          ['it-IT', 'Italia']
 *                    ['it-CH', 'Svizzera']
 *  Magyar            ['hu-HU']
 *  Nederlands        ['nl-NL']
 *  Norsk bokmål      ['nb-NO']
 *  Polski            ['pl-PL']
 *  Português         ['pt-BR', 'Brasil']
 *                    ['pt-PT', 'Portugal']
 *  Română            ['ro-RO']
 *  Slovenčina        ['sk-SK']
 *  Suomi             ['fi-FI']
 *  Svenska           ['sv-SE']
 *  Türkçe            ['tr-TR']
 *  български         ['bg-BG']
 *  Pусский           ['ru-RU']
 *  Српски            ['sr-RS']
 *  한국어          ['ko-KR']
 *  中文                            ['cmn-Hans-CN', '普通话 (中国大陆)']
 *                    ['cmn-Hans-HK', '普通话 (香港)']
 *                    ['cmn-Hant-TW', '中文 (台灣)']
 *                    ['yue-Hant-HK', '粵語 (香港)']
 *  日本語                         ['ja-JP']
 *  Lingua latīna     ['la']
 */
	voice_command_lang = 'en-US',
/*
 * 	Use localstorage to remember on/off (best used with HTML Version)
 */	
	voice_localStorage = false;
/*
 * Voice Commands
 * Defines all voice command variables and functions
 */	
 	if (voice_command) {
	 		
		var commands = {
					
			'show dashboard' : function() { window.location.hash = "dashboard" },
			'show inbox' : function() {  window.location.hash = "inbox" },
			'show graphs' : function() {  window.location.hash = "graphs/flot" },
			'show flotchart' : function() { window.location.hash = "graphs/flot" },
			'show morris chart' : function() { window.location.hash = "graphs/morris" },
			'show inline chart' : function() { window.location.hash = "graphs/inline-charts" },
			'show dygraphs' : function() { window.location.hash = "graphs/dygraphs" },
			'show tables' : function() { window.location.hash = "tables/table" },
			'show data table' : function() { window.location.hash = "tables/datatable" },
			'show jquery grid' : function() { window.location.hash = "tables/jqgrid" },
			'show form' : function() { window.location.hash = "forms/form-elements" },
			'show form layouts' : function() { window.location.hash = "forms/form-templates" },
			'show form validation' : function() { window.location.hash = "forms/validation" },
			'show form elements' : function() { window.location.hash = "forms/bootstrap-forms" },
			'show form plugins' : function() { window.location.hash = "forms/plugins" },
			'show form wizards' : function() { window.location.hash = "forms/wizards" },
			'show bootstrap editor' : function() { window.location.hash = "forms/other-editors" },
			'show dropzone' : function() { window.location.hash = "forms/dropzone" },
			'show image cropping' : function() { window.location.hash = "forms/image-editor" },
			'show general elements' : function() { window.location.hash = "ui/general-elements" },
			'show buttons' : function() { window.location.hash = "ui/buttons" },
			'show fontawesome' : function() { window.location.hash = "ui/icons/fa" },
			'show glyph icons' : function() { window.location.hash = "ui/icons/glyph" },
			'show flags' : function() { window.location.hash = "ui/icons/flags" },
			'show grid' : function() { window.location.hash = "ui/grid" },
			'show tree view' : function() { window.location.hash = "ui/treeview" },
			'show nestable lists' : function() { window.location.hash = "ui/nestable-list" },
			'show jquery U I' : function() { window.location.hash = "ui/jqui" },
			'show typography' : function() { window.location.hash = "ui/typography" },
			'show calendar' : function() { window.location.hash = "calendar" },
			'show widgets' : function() { window.location.hash = "widgets" },
			'show gallery' : function() { window.location.hash = "gallery" },
			'show maps' : function() { window.location.hash = "gmap-xml" },
			'go back' :  function() { history.back(1); }, 
			'scroll up' : function () { $('html, body').animate({ scrollTop: 0 }, 100); },
			'scroll down' : function () { $('html, body').animate({ scrollTop: $(document).height() }, 100);},
			'hide navigation' : function() { 
				if ($.root_.hasClass("container") && !$.root_.hasClass("menu-on-top")){
					$('span.minifyme').trigger("click");
				} else {
					$('#hide-menu > span > a').trigger("click"); 
				}
			},
			'show navigation' : function() { 
				if ($.root_.hasClass("container") && !$.root_.hasClass("menu-on-top")){
					$('span.minifyme').trigger("click");
				} else {
					$('#hide-menu > span > a').trigger("click"); 
				}
			},
			'mute' : function() {
				$.sound_on = false;
				$.smallBox({
					title : "MUTE",
					content : "All sounds have been muted!",
					color : "#a90329",
					timeout: 4000,
					icon : "fa fa-volume-off"
				});
			},
			'sound on' : function() {
				$.sound_on = true;
				$.speechApp.playConfirmation();
				$.smallBox({
					title : "UNMUTE",
					content : "All sounds have been turned on!",
					color : "#40ac2b",
					sound_file: 'voice_alert',
					timeout: 5000,
					icon : "fa fa-volume-up"
				});
			},
			'stop' : function() {
				smartSpeechRecognition.abort();
				$.root_.removeClass("voice-command-active");
				$.smallBox({
					title : "VOICE COMMAND OFF",
					content : "Your voice commands has been successfully turned off. Click on the <i class='fa fa-microphone fa-lg fa-fw'></i> icon to turn it back on.",
					color : "#40ac2b",
					sound_file: 'voice_off',
					timeout: 8000,
					icon : "fa fa-microphone-slash"
				});
				if ($('#speech-btn .popover').is(':visible')) {
					$('#speech-btn .popover').fadeOut(250);
				}
			},
			'help' : function() {
				$('#voiceModal').removeData('modal').modal( { remote: "ajax/modal-content/modal-voicecommand.html", show: true } );
				if ($('#speech-btn .popover').is(':visible')) {
					$('#speech-btn .popover').fadeOut(250);
				}
			},		
			'got it' : function() {
				$('#voiceModal').modal('hide');
			},	
			'logout' : function() {
				$.speechApp.stop();
				window.location = $('#logout > span > a').attr("href");
			}
		}; 
		
	};
	
	var appConfig = {};


	appConfig.smartSkin = "smart-style-5";

	appConfig.skins = [
	    {name: "smart-style-0",
	        logo: "styles/img/logo.png",
	        class: "btn btn-block btn-xs txt-color-white margin-right-5",
	        style: "background-color:#4E463F;",
	        label: "Smart Default",
	        iconColor:"#fff"},

	    {name: "smart-style-1",
	        logo: "styles/img/logo-white.png",
	        class: "btn btn-block btn-xs txt-color-white",
	        style: "background:#3A4558;",
	        label: "Dark Elegance",
	        iconColor:"#8b91a0"},

	    {name: "smart-style-2",
	        logo: "styles/img/logo-blue.png",
	        class: "btn btn-xs btn-block txt-color-darken margin-top-5",
	        style: "background:#fff;",
	        label: "Ultra Light",
	        iconColor:"#69737A"},

	 /*   {name: "smart-style-3",
	        logo: "styles/img/logo-pale.png",
	        class: "btn btn-xs btn-block txt-color-white margin-top-5",
	        style: "background:#f78c40",
	        label: "Google Skin",
	        iconColor:"#4D8BA5"},*/

	    {name: "smart-style-4",
	        logo: "styles/img/logo-pale.png",
	        class: "btn btn-xs btn-block txt-color-white margin-top-5",
	        style: "background: #bbc0cf; border: 1px solid #59779E; color: #17273D !important;",
	        label: "PixelSmash",
	        iconColor:"#bbc0cf"},

	    {name: "smart-style-5",
	        logo: "styles/img/logo-pale.png",
	        class: "btn btn-xs btn-block txt-color-white margin-top-5",
	        style: "background: rgba(153, 179, 204, 0.2); border: 1px solid rgba(121, 161, 221, 0.8); color: #17273D !important;",
	        label: "Glass",
	        iconColor:"#fff"}
	];	
/*
 * END APP.CONFIG
 */
 
 
 
 
 
 	
/*         ______________________________________
  ________|                                      |_______
  \       |           SmartAdmin WebApp          |      /
   \      |      Copyright © 2014 MyOrange       |     /
   /      |______________________________________|     \
  /__________)                                (_________\

 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * =======================================================================
 * SmartAdmin is FULLY owned and LICENSED by MYORANGE INC.
 * This script may NOT be RESOLD or REDISTRUBUTED under any
 * circumstances, and is only to be used with this purchased
 * copy of SmartAdmin Template.
 * =======================================================================
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * =======================================================================
 * original filename: app.js
 * filesize: 50,499 bytes
 * author: Sunny (@bootstraphunt)
 * email: info@myorange.ca
 *
 * GLOBAL: Reference DOM
 */
	$.root_ = $('body');
/*
 * GLOBAL: interval array (to be used with jarviswidget in ajax and angular mode) to clear auto fetch interval
 */
	$.intervalArr = [];
/*
 * Calculate nav height
 */
var calc_navbar_height = function() {
		var height = null;
	
		if ($('#header').length)
			height = $('#header').height();
	
		if (height === null)
			height = $('<div id="header"></div>').height();
	
		if (height === null)
			return 49;
		// default
		return height;
	},
	
	navbar_height = calc_navbar_height, 
/*
 * APP DOM REFERENCES
 * Description: Obj DOM reference, please try to avoid changing these
 */	
	shortcut_dropdown = $('#shortcut'),
	
	bread_crumb = $('#ribbon ol.breadcrumb'),
/*
 * Top menu on/off
 */
	topmenu = false,
/*
 * desktop or mobile
 */
	thisDevice = null,
/*
 * JS ARRAY SCRIPT STORAGE
 * Description: used with loadScript to store script path and file name
 * so it will not load twice
 */	
	jsArray = {},	
/*
 * DETECT MOBILE DEVICES
 * Description: Detects mobile device - if any of the listed device is detected
 * a class is inserted to $.root_ and the variable thisDevice is decleard. 
 * (so far this is covering most hand held devices)
 */	
	ismobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
/*
 * CHECK MOBILE VIEW
 */
	if (!ismobile) {
		// Desktop
		$.root_.addClass("desktop-detected");
		device = "desktop";
	} else {
		// Mobile
		$.root_.addClass("mobile-detected");
		device = "mobile";
		
//		if (fastClick) {
//			// Removes the tap delay in idevices
//			// dependency: js/plugin/fastclick/fastclick.js 
//			$.root_.addClass("needsclick");
//			FastClick.attach(document.body); 
//		}
		
	}
/*
 * CHECK FOR MENU POSITION
 */
if ($('body').hasClass("menu-on-top") || localStorage.getItem('sm-setmenu')=='top' ) { 
	topmenu = true;
	$('body').addClass("menu-on-top");
}
/* ~ END: CHECK MOBILE DEVICE */

/*
 * DOCUMENT LOADED EVENT
 * Description: Fire when DOM is ready
 */

jQuery(document).ready(function() {
	
	
	/*
	 * SMART ACTIONS
	 * ANGULAR: handled via "action" directive
	 */
	/*var smartActions = {
	    
	    // LOGOUT MSG 
	    userLogout: function($this){
	
			// ask verification
			$.SmartMessageBox({
				title : "<i class='fa fa-sign-out txt-color-orangeDark'></i> Logout <span class='txt-color-orangeDark'><strong>" + $('#show-shortcut').text() + "</strong></span> ?",
				content : $this.data('logout-msg') || "You can improve your security further after logging out by closing this opened browser",
				buttons : '[No][Yes]'
	
			}, function(ButtonPressed) {
				if (ButtonPressed == "Yes") {
					$.root_.addClass('animated fadeOutUp');
					setTimeout(logout, 1000);
				}
			});
			function logout() {
				window.location = $this.attr('href');
			}
	
		},

		// RESET WIDGETS
	    resetWidgets: function(){
			$.widresetMSG = $this.data('reset-msg');
			
			$.SmartMessageBox({
				title : "<i class='fa fa-refresh' style='color:green'></i> Clear Local Storage",
				content : $.widresetMSG || "Would you like to RESET all your saved widgets and clear LocalStorage?",
				buttons : '[No][Yes]'
			}, function(ButtonPressed) {
				if (ButtonPressed == "Yes" && localStorage) {
					localStorage.clear();
					location.reload();
				}
	
			});
	    },
	    
	    // LAUNCH FULLSCREEN 
	    launchFullscreen: function(element){
	
			if (!$.root_.hasClass("full-screen")) {
		
				$.root_.addClass("full-screen");
		
				if (element.requestFullscreen) {
					element.requestFullscreen();
				} else if (element.mozRequestFullScreen) {
					element.mozRequestFullScreen();
				} else if (element.webkitRequestFullscreen) {
					element.webkitRequestFullscreen();
				} else if (element.msRequestFullscreen) {
					element.msRequestFullscreen();
				}
		
			} else {
				
				$.root_.removeClass("full-screen");
				
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.mozCancelFullScreen) {
					document.mozCancelFullScreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				}
		
			}
	
	   },
	
	   // MINIFY MENU
	    minifyMenu: function(){
	    	if (!$.root_.hasClass("menu-on-top")){
				$.root_.toggleClass("minified");
				$.root_.removeClass("hidden-menu");
				$('html').removeClass("hidden-menu-mobile-lock");
				$this.effect("highlight", {}, 500);
			}
	    },
	    
	    // TOGGLE MENU 
	    toggleMenu: function(){
	    	if (!$.root_.hasClass("menu-on-top")){
				$('html').toggleClass("hidden-menu-mobile-lock");
				$.root_.toggleClass("hidden-menu");
				$.root_.removeClass("minified");
	    	}
	    },     
	
	    // TOGGLE SHORTCUT 
	    toggleShortcut: function(){
	    	
			if (shortcut_dropdown.is(":visible")) {
				shortcut_buttons_hide();
			} else {
				shortcut_buttons_show();
			}

			// SHORT CUT (buttons that appear when clicked on user name)
			shortcut_dropdown.find('a').click(function(e) {
				e.preventDefault();
				window.location = $(this).attr('href');
				setTimeout(shortcut_buttons_hide, 300);
		
			});
		
			// SHORTCUT buttons goes away if mouse is clicked outside of the area
			$(document).mouseup(function(e) {
				if (!shortcut_dropdown.is(e.target) && shortcut_dropdown.has(e.target).length === 0) {
					shortcut_buttons_hide();
				}
			});
			
			// SHORTCUT ANIMATE HIDE
			function shortcut_buttons_hide() {
				shortcut_dropdown.animate({
					height : "hide"
				}, 300, "easeOutCirc");
				$.root_.removeClass('shortcut-on');
		
			}
		
			// SHORTCUT ANIMATE SHOW
			function shortcut_buttons_show() {
				shortcut_dropdown.animate({
					height : "show"
				}, 200, "easeOutCirc");
				$.root_.addClass('shortcut-on');
			}
	
	    }  
	   
	};


	$.root_.on('click', '[data-action="userLogout"]', function(e) {
		var $this = $(this);
		smartActions.userLogout($this);
		e.preventDefault();
	}); 

	$.root_.on('click', '[data-action="resetWidgets"]', function(e) {	
		var $this = $(this);
		smartActions.resetWidgets($this);
		e.preventDefault();
	});
	
	$.root_.on('click', '[data-action="launchFullscreen"]', function(e) {	
		smartActions.launchFullscreen(document.documentElement);
		e.preventDefault();
	}); 
	
	$.root_.on('click', '[data-action="minifyMenu"]', function(e) {
		var $this = $(this);
		smartActions.minifyMenu($this);
		e.preventDefault();
	}); 
	
	$.root_.on('click', '[data-action="toggleMenu"]', function(e) {	
		smartActions.toggleMenu();
		e.preventDefault();
	});  

	$.root_.on('click', '[data-action="toggleShortcut"]', function(e) {	
		smartActions.toggleShortcut();
		e.preventDefault();
	}); */
	

	/*
	 * Fire tooltips
	 */
	if ($("[rel=tooltip]").length) {
		$("[rel=tooltip]").tooltip();
	}

	// INITIALIZE LEFT NAV
	/* ANGULAR: handled via "navigation" directive
	if (!$topmenu) {
		if (!null) {
			$('nav ul').jarvismenu({
				accordion : true,
				speed : menu_speed,
				closedSign : '<em class="fa fa-plus-square-o"></em>',
				openedSign : '<em class="fa fa-minus-square-o"></em>'
			});
		} else {
			alert("Error - menu anchor does not exist");
		}
	}

	// SHOW & HIDE MOBILE SEARCH FIELD
	$('#search-mobile').click(function() {
		$.root_.addClass('search-mobile');
	});

	$('#cancel-search-js').click(function() {
		$.root_.removeClass('search-mobile');
	});

	// ACTIVITY
	// ajax drop
	$('#activity').click(function(e) {
		var $this = $(this);

		if ($this.find('.badge').hasClass('bg-color-red')) {
			$this.find('.badge').removeClassPrefix('bg-color-');
			$this.find('.badge').text("0");
			// console.log("Ajax call for activity")
		}

		if (!$this.next('.ajax-dropdown').is(':visible')) {
			$this.next('.ajax-dropdown').fadeIn(150);
			$this.addClass('active');
		} else {
			$this.next('.ajax-dropdown').fadeOut(150);
			$this.removeClass('active');
		}

		var mytest = $this.next('.ajax-dropdown').find('.btn-group > .active > input').attr('id');
		//console.log(mytest)

		e.preventDefault();
	});

	$('input[name="activity"]').change(function() {
		//alert($(this).val())
		var $this = $(this);

		url = $this.attr('id');
		container = $('.ajax-notifications');

		loadURL(url, container);

	});*/

	$(document).mouseup(function(e) {
		if (!$('.ajax-dropdown').is(e.target) && $('.ajax-dropdown').has(e.target).length === 0) {
			$('.ajax-dropdown').fadeOut(150);
			$('.ajax-dropdown').prev().removeClass("active");
		}
	});

	$('button[data-btn-loading]').on('click', function() {
		var btn = $(this);
		btn.button('loading');
		setTimeout(function() {
			btn.button('reset');
		}, 3000);
	});

	// NOTIFICATION IS PRESENT
	/* ANGULAR: Handled via "activityButton" directive
	function notification_check() {
		$this = $('#activity > .badge');

		if (parseInt($this.text()) > 0) {
			$this.addClass("bg-color-red bounceIn animated");
		}
	}

	notification_check();*/

	// SLIMSCROLL FOR NAV
	/* ANGULAR: Initialized via "navigation" directive
	if ($.fn.slimScroll) {
		$('nav').slimScroll({
	        height: '100%'
	    });
	}*/

});

(function($) {
    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;

    $.fn.attrchange = function(callback) {
        if (MutationObserver) {
            var options = {
                subtree: false,
                attributes: true
            };

            var observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(e) {
                    callback.call(e.target, e.attributeName);
                });
            });

            return this.each(function() {
                observer.observe(this, options);
            });

        }
    }
    
    var rootClass = $.root_.attr("class");
    var checkTimer;
    // observe body css change to detect left menu change.
    $.root_.attrchange(function(attrName) {

        if(attrName=='class'){
             var newClass = $.root_.attr(attrName);
         	//console.log(["class change", newClass, rootClass, (newClass != rootClass)]);
             if(newClass != rootClass) {
            	 //console.log(["class change", newClass]);
            	 var contentWidth = $("#content").width();
            	 // check if content container's width changed to a stable value
            	 // trigger "resize" event in each check, the resize handler will only fired after width is a stable value.
            	 var checkFn = function(){
            		 var newContentWidth = $("#content").width();
            		 if(newContentWidth != contentWidth) {
            			 $(window).trigger("resize");
            			//console.log("checkfn trigger resize");
                    	 if(checkTimer)
                    		 clearTimeout(checkTimer);
                    	 checkTimer = setTimeout(checkFn, 200);
            			 contentWidth = newContentWidth;
            		 }            		 
            	 }            	 
            	 $(window).trigger("resize");
            	 //console.log("trigger resize");
            	 if(checkTimer)
            		 clearTimeout(checkTimer);
            	 checkTimer = setTimeout(checkFn, 200);
            	 rootClass = newClass;
             }
        }

    });    
})(jQuery);

/*
 * SMART RESIZER
 * Source: https://github.com/louisremi/jquery-smartresize
 * 
 * example to use:
 * $('#debouncedhits').onresize(this.resizeHandler, this);
 * $('#debouncedhits').offresize(this.resizeHandler);
 */

$.fn.extend({
	onresize : function(fn, context, type){
		var elem = this;
        try {
            $.data(elem, "resize-size", {
                w: elem.width(),
                h: elem.height()
            });
        } catch (e) {
            $.data(elem, "resize-size", {
                w: elem.width, // elem.width();
                h: elem.height // elem.height();
            });
        }		
		laygoon.common.resizeEvents.push({fn: fn, context: context, el: elem, fnIdentification: type});
		//console.log(["onresize", $(this).attr("class"), $(this).attr("id")]);
	},
	offresize: function(fn) {
		var es = laygoon.common.resizeEvents;
		for (var i = 0; i < es.length; i ++) {
			var selector = es[i].el.selector;
			if(!selector || selector === this.selector || selector === "**" && this.selector) {
				var r;
				if((!fn) || (fn && es[i].fn === fn)) {
				// when user pass fn and el or user doesn't pass fn
					r = es.splice(i, 1);
					i --; // the length of array is reduced 1
					//console.log(["offresize", this.selector, $(this).attr("class"), $(this).attr("id")]);
				} 
			
				 if (fn &&　(typeof fn == 'string') && (es[i].fnIdentification === fn)) {
					 r = es.splice(i, 1);
					 i --; // the length of array is reduced 1
					 //console.log(["offresize", this.selector, $(this).attr("class"), $(this).attr("id")]);
				   }
			
				 if(r && r.length > 0) {
					 var elem = r[0].el;
					 elem.removeData("resize-size");
				 }
			}
		}
	}
});

var resizeHandler = function() {
	//console.log("resize")
	// If we don't wan't to trigger resize event, we can set this flag.
	if(laygoon.common.pauseResizeEvent) {
		setTimeout(function(){
			laygoon.common.pauseResizeEvent = false;
		}, 3000);
		return;
	}
	var es = laygoon.common.resizeEvents;
	for(var i = 0; i < es.length; i++) {
		if(es[i].el.length > 0) {
			if(es[i].fn) {
                var width, height;
                var elem = es[i].el;
                try {
                    width = elem.width();
                } catch (e) {
                    width = elem.width;
                }

                try {
                    height = elem.height();
                } catch (e) {
                    height = elem.height;
                }
                
                var data = $.data(elem, "resize-size"); 
                //console.log([width, height, data.w, data.h])    
                if(width == data.w && height == data.h) {
                	//console.log("no need to resize");
                	continue;
                } else {
                    $.data(elem, "resize-size", {
                        w: width,
                        h: height
                    });               	
                }					
				es[i].fn.apply(es[i].context || es[i].el, es[i].el);
			} else {
				console.log("The handler is not defined when resize");
			}
		}
		else {
			console.log(["the element is not exist when resize", es[i].fn, es[i].el, es[i].context]);
		}
	}
};

$(window).bind("debouncedresize", resizeHandler);

(function(){
	// make $(elem).on("resize", function(){}) still can be used
	$.event.special.resize = {
			setup: function(data, namespace, handler) {
				return false;
			},
			teardown: function() {
				return false;
			},
			add: function(handlerObj) {
				if(this != window) {
					var old_handler, namespace = "";
					if ($.isFunction(handlerObj)) {
						old_handler = handlerObj;
					} else {
						old_handler = handlerObj.handler
						namespace = handlerObj.namespace;										
					}				
		
		            $(this).onresize(old_handler, this, namespace);
				}
			},
			remove: function(handlerObj) {
				if(this != window) {
					var old_handler, namespace = "";
					if ($.isFunction(handlerObj)) {
						old_handler = handlerObj;
					} else {
						old_handler = handlerObj.handler
						namespace = handlerObj.namespace;										
					}				
	
		            $(this).offresize(old_handler, this, namespace);
				}				
			}
		};

	// click event for mobiles, will actually trigger "tap", "press"
	var isCheckbox = function(el) {
		return (el.tagName == "INPUT" && $(el).attr("type") == "checkbox")
	}
	
	$.fn.isChildAndSelfOf = function(b){ 
		return (this.closest(b).length > 0); 
	}; 		
	
	if (device == "mobile") {
		/*$.event.special.click = {
			setup: function(data, namespace, handler) {
				if(isCheckbox(this))
					return false;
				
				return true;
			},
			teardown: function() {
				if(isCheckbox(this))
					return false;
								
				return true;
			},
			add: function(handlerObj) {
				// work around for the issue that "tap" on mobile cannot get correct value of checkbox
				// to use native "click".
				if(isCheckbox(this)) {
					return false;
				}
				
				var old_handler, namespace = "", data, selector;
				if ($.isFunction(handlerObj)) {
					old_handler = handlerObj;
				} else {
					old_handler = handlerObj.handler
					namespace = handlerObj.namespace;
					data = handlerObj.data;
					selector = handlerObj.selector;
				}
				
				if(!old_handler) {
					console.log("no handler defined");
					return;
				}
				
//				console.log(["add handlerObj", this, old_handler]);   
				var els = this;
		        var h = new Hammer(this);
		        var hammerData = $(this).data("hammer") || {};
		        hammerData[handlerObj.guid] = h;
		        //console.log(["add event", this]);
		        $(this).data("hammer", hammerData); // update
		        h.on("tap press", function(e){
		        	var elems;
		        	console.log(["trigger", e.type, els]);
		        	if(selector && selector != "") {
		        		elems = $(els).find(selector);
		        		// If there's still no matched elem, do nothing.
		        		if(!elems.length){
		        			console.log("no el matched selector")
		        			return;
		        		}
		        		//els = elems;
		        		//selector = undefined; // once match the elem, won't match agian.
		        	} else {
		        		elems = $(els);
		        	}
		        	// If the target element is not the lisenter element
		        	var elem;
		        	for(var i = 0; i < elems.length; i ++) {
		        		if($(e.target).isChildAndSelfOf(elems[i])) {
		        			elem = elems[i]
		        			break;
		        		}
		        	}
		        	if(!elem) {
		        		console.log(["elem target is wrong", e.target])
		        		return;
		        	}
		        	//console.log(["hammer tap", e, old_handler]);
		        	if(data) {
		        		e.data = data;
		        	}
		        	//console.log(old_handler);
		        	old_handler.apply(elem, [e]);
		        });	
			},
			remove: function(handlerObj) {
				if(isCheckbox(this)) {
					return false;
				}				
				var hammerData = $(this).data("hammer");
				var h = hammerData[handlerObj.guid];
				//console.log("off event");
				h && h.destroy();
				delete hammerData[handlerObj.guid];
			}
		};*/
		
		$.event.special.mouseover = 
		$.event.special.mousedown =
		$.event.special.mousemove =
		$.event.special.mouseup = {
				setup: function(data, namespace, handler) {
					return true;
				},
				teardown: function() {
					return true;
				},
				add: function(handlerObj){
					if ($.isFunction(handlerObj)) {
						handlerObj = function(){};
					} else {
						handlerObj.handler = function(){};
					}
				},
				remove: function(){
					return false;
				}
			}
	}
}());
/*
 * RESIZER WITH THROTTLE
 * Source: http://benalman.com/code/projects/jquery-resize/examples/resize/
 */

/*(function ($, window, undefined) {

    var elems = $([]),
        jq_resize = $.resize = $.extend($.resize, {}),
        timeout_id, str_setTimeout = 'setTimeout',
        str_resize = 'resize',
        str_data = str_resize + '-special-event',
        str_delay = 'delay',
        str_throttle = 'throttleWindow';

    jq_resize[str_delay] = throttle_delay;

    jq_resize[str_throttle] = true;
    
    var noResize = true;

    $.event.special[str_resize] = {

        setup: function () {
        	if(noResize) {
        		return false;
        	}
        	
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.add(elem);
            try {
                $.data(this, str_data, {
                    w: elem.width(),
                    h: elem.height()
                });
            } catch (e) {
                $.data(this, str_data, {
                    w: elem.width, // elem.width();
                    h: elem.height // elem.height();
                });
            }

            if (elems.length === 1) {
                loopy();
            }
        },
        teardown: function () {
        	if(noResize) {
        		return false;
        	}
        	       	
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }

            var elem = $(this);
            elems = elems.not(elem);
            elem.removeData(str_data);
            if (!elems.length) {
                clearTimeout(timeout_id);
            }
        },

        add: function (handleObj) {
        	if(noResize) {
        		return false;
        	}
        	        	
            if (!jq_resize[str_throttle] && this[str_setTimeout]) {
                return false;
            }
            var old_handler;

            function new_handler(e, w, h) {
                var elem = $(this),
                    data = $.data(this, str_data);
                data.w = w !== undefined ? w : elem.width();
                data.h = h !== undefined ? h : elem.height();

                old_handler.apply(this, arguments);
            }
            if ($.isFunction(handleObj)) {
                old_handler = handleObj;
                return new_handler;
            } else {
                old_handler = handleObj.handler;
                handleObj.handler = new_handler;
            }
        }
    };

    function loopy() {
        timeout_id = window[str_setTimeout](function () {
            elems.each(function () {
                var width;
                var height;

                var elem = $(this),
                    data = $.data(this, str_data); //width = elem.width(), height = elem.height();

                // Highcharts fix
                try {
                    width = elem.width();
                } catch (e) {
                    width = elem.width;
                }

                try {
                    height = elem.height();
                } catch (e) {
                    height = elem.height;
                }
                //fixed bug


                if (width !== data.w || height !== data.h) {
                    elem.trigger(str_resize, [data.w = width, data.h = height]);
                }

            });
            loopy();

        }, jq_resize[str_delay]);

    }

})(jQuery, this);*/

// Plot resize
if($.plot) {
(function ($) {
    var options = { }; // no options

    function init(plot) {
        function onResize() {
            var placeholder = plot.getPlaceholder();

            // somebody might have hidden us and we can't plot
            // when we don't have the dimensions
            if (placeholder.width() == 0 || placeholder.height() == 0)
                return;

            plot.resize();
            plot.setupGrid();
            plot.draw();
        }
        
        function bindEvents(plot, eventHolder) {
            plot.getPlaceholder().resize(onResize);
        }

        function shutdown(plot, eventHolder) {
            plot.getPlaceholder().unbind("resize", onResize);
        }
        
        plot.hooks.bindEvents.push(bindEvents);
        plot.hooks.shutdown.push(shutdown);
    }
    
    $.plot.plugins.push({
        init: init,
        options: options,
        name: 'resize',
        version: '1.0'
    });
    
})(jQuery);
}
/*
* ADD CLASS WHEN BELOW CERTAIN WIDTH (MOBILE MENU)
* Description: changes the page min-width of #CONTENT and NAV when navigation is resized.
* This is to counter bugs for min page width on many desktop and mobile devices.
* Note: This script uses JSthrottle technique so don't worry about memory/CPU usage
*/

$(window).on("resize", check_if_mobile_width);


function check_if_mobile_width() {
	if ($(window).width() < 979) {
		$.root_.addClass('mobile-view-activated');
		if(!$.root_.hasClass('minified'))
			$.root_.addClass('minified');
	} else if ($.root_.hasClass('mobile-view-activated')) {
		$.root_.removeClass('mobile-view-activated');
		$.root_.removeClass('minified');
	}
}

/* ~ END: NAV OR #LEFT-BAR RESIZE DETECT */

/*
 * DETECT IE VERSION
 * Description: A short snippet for detecting versions of IE in JavaScript
 * without resorting to user-agent sniffing
 * RETURNS:
 * If you're not in IE (or IE version is less than 5) then:
 * //ie === undefined
 *
 * If you're in IE (>=5) then you can determine which version:
 * // ie === 7; // IE7
 *
 * Thus, to detect IE:
 * // if (ie) {}
 *
 * And to detect the version:
 * ie === 6 // IE6
 * ie > 7 // IE8, IE9 ...
 * ie < 9 // Anything less than IE9
 */

// TODO: delete this function later on - no longer needed (?)
var ie = ( function() {

		var undef, v = 3, div = document.createElement('div'), all = div.getElementsByTagName('i');

		while (div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->', all[0]);

		return v > 4 ? v : undef;

	}()); // do we need this? 

/* ~ END: DETECT IE VERSION */

/*
 * CUSTOM MENU PLUGIN
 */

$.fn.extend({

	//pass the options variable to the function
	jarvismenu : function(options) {

		var defaults = {
			accordion : 'true',
			speed : 200,
			closedSign : '[+]',
			openedSign : '[-]'
		};

		// Extend our default options with those provided.
		var opts = $.extend(defaults, options);
		//Assign current element to variable, in this case is UL element
		var $this = $(this);

		//add a mark [+] to a multilevel menu
		$this.find("li").each(function() {
			if ($(this).find("ul").size() !== 0) {
				//add the multilevel sign next to the link
				$(this).find("a:first").append("<b class='collapse-sign'>" + opts.closedSign + "</b>");

				//avoid jumping to the top of the page when the href is an #
				if ($(this).find("a:first").attr('href') == "#") {
					$(this).find("a:first").click(function() {
						return false;
					});
				}
			}
		});

		//open active level
		$this.find("li.active").each(function() {
			$(this).parents("ul").slideDown(opts.speed);
			$(this).parents("ul").parent("li").find("b:first").html(opts.openedSign);
			$(this).parents("ul").parent("li").addClass("open");
		});
		
		// open parent menu if it is set to open
		$this.find("li.group-open").each(function(){
			$(this).find("ul").slideDown(opts.speed);
			$(this).find("b:first").html(opts.openedSign);
			$(this).addClass("open");			
		})

		$this.find("li a").click(function() {

			if ($(this).parent().find("ul").size() !== 0) {

				if (opts.accordion) {
					//Do nothing when the list is open
					if (!$(this).parent().find("ul").is(':visible')) {
						parents = $(this).parent().parents("ul");
						visible = $this.find("ul:visible");
						visible.each(function(visibleIndex) {
							var close = true;
							parents.each(function(parentIndex) {
								if (parents[parentIndex] == visible[visibleIndex]) {
									close = false;
									return false;
								}
							});
							if (close) {
								if ($(this).parent().find("ul") != visible[visibleIndex]) {
									$(visible[visibleIndex]).slideUp(opts.speed, function() {
										$(this).parent("li").find("b:first").html(opts.closedSign);
										$(this).parent("li").removeClass("open");
									});

								}
							}
						});
					}
				}// end if
				if ($(this).parent().find("ul:first").is(":visible") && !$(this).parent().find("ul:first").hasClass("active")) {
					$(this).parent().find("ul:first").slideUp(opts.speed, function() {
						$(this).parent("li").removeClass("open");
						$(this).parent("li").find("b:first").delay(opts.speed).html(opts.closedSign);
					});

				} else {
					$(this).parent().find("ul:first").slideDown(opts.speed, function() {
						/*$(this).effect("highlight", {color : '#616161'}, 500); - disabled due to CPU clocking on phones*/
						$(this).parent("li").addClass("open");
						$(this).parent("li").find("b:first").delay(opts.speed).html(opts.openedSign);
					});
				} // end else
			} // end if
		});
	} // end function
});


/* ~ END: CUSTOM MENU PLUGIN */

/*
 * ELEMENT EXIST OR NOT
 * Description: returns true or false
 * Usage: $('#myDiv').doesExist();
 */

jQuery.fn.doesExist = function() {
	return jQuery(this).length > 0;
};

/* ~ END: ELEMENT EXIST OR NOT */

/*
 * FULL SCREEN FUNCTION
 

// Find the right method, call on correct element
function launchFullscreen(element) {

	if (!$.root_.hasClass("full-screen")) {

		$.root_.addClass("full-screen");

		if (element.requestFullscreen) {
			element.requestFullscreen();
		} else if (element.mozRequestFullScreen) {
			element.mozRequestFullScreen();
		} else if (element.webkitRequestFullscreen) {
			element.webkitRequestFullscreen();
		} else if (element.msRequestFullscreen) {
			element.msRequestFullscreen();
		}

	} else {
		
		$.root_.removeClass("full-screen");
		
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			document.webkitExitFullscreen();
		}

	}

}*/

/*
 * ~ END: FULL SCREEN FUNCTION
 */

/*
 * INITIALIZE FORMS
 * Description: Select2, Masking, Datepicker, Autocomplete
 */

function runAllForms() {

	/*
	 * BOOTSTRAP SLIDER PLUGIN
	 * Usage:
	 * Dependency: js/plugin/bootstrap-slider
	 */
	if ($.fn.slider) {
		$('.slider').slider();
	}

	/*
	 * SELECT2 PLUGIN
	 * Usage:
	 * Dependency: js/plugin/select2/
	 */
	if ($.fn.select2) {
		$('.select2').each(function() {
			var $this = $(this);
			var width = $this.attr('data-select-width') || '100%';
			//, _showSearchInput = $this.attr('data-select-search') === 'true';
			$this.select2({
				//showSearchInput : _showSearchInput,
				allowClear : true,
				width : width
			});
		});
	}

	/*
	 * MASKING
	 * Dependency: js/plugin/masked-input/
	 */
	if ($.fn.mask) {
		$('[data-mask]').each(function() {

			var $this = $(this);
			var mask = $this.attr('data-mask') || 'error...', mask_placeholder = $this.attr('data-mask-placeholder') || 'X';

			$this.mask(mask, {
				placeholder : mask_placeholder
			});
		});
	}

	/*
	 * Autocomplete
	 * Dependency: js/jqui
	 */
	if ($.fn.autocomplete) {
		$('[data-autocomplete]').each(function() {

			var $this = $(this);
			var availableTags = $this.data('autocomplete') || ["The", "Quick", "Brown", "Fox", "Jumps", "Over", "Three", "Lazy", "Dogs"];

			$this.autocomplete({
				source : availableTags
			});
		});
	}

	/*
	 * JQUERY UI DATE
	 * Dependency: js/libs/jquery-ui-1.10.3.min.js
	 * Usage:
	 */
/*	if ($.fn.datepicker) {
		$('.datepicker').each(function() {

			var $this = $(this);
			var dataDateFormat = $this.attr('data-dateformat') || 'dd.mm.yy';

			$this.datepicker({
				dateFormat : dataDateFormat,
				prevText : '<i class="fa fa-chevron-left"></i>',
				nextText : '<i class="fa fa-chevron-right"></i>',
			});
		});
	}
*/
	/*
	 * AJAX BUTTON LOADING TEXT
	 * Usage: <button type="button" data-loading-text="Loading..." class="btn btn-xs btn-default ajax-refresh"> .. </button>
	 */
	/* ANGUlAR: NOT NEEDED
	$('button[data-loading-text]').on('click', function() {
		var btn = $(this);
		btn.button('loading');
		setTimeout(function() {
			btn.button('reset');
		}, 3000);
	});*/

}

/* ~ END: INITIALIZE FORMS */

/*
 * INITIALIZE CHARTS
 * Description: Sparklines, PieCharts
 */

function runAllCharts() {
	/*
	 * SPARKLINES
	 * DEPENDENCY: js/plugins/sparkline/jquery.sparkline.min.js
	 * See usage example below...
	 */

	/* Usage:
	 * 		<div class="sparkline-line txt-color-blue" data-fill-color="transparent" data-sparkline-height="26px">
	 *			5,6,7,9,9,5,9,6,5,6,6,7,7,6,7,8,9,7
	 *		</div>
	 */

	if ($.fn.sparkline) {

		// variable declearations:

		var barColor,
		    sparklineHeight,
		    sparklineBarWidth,
		    sparklineBarSpacing,
		    sparklineNegBarColor,
		    sparklineStackedColor,
		    thisLineColor,
		    thisLineWidth,
		    thisFill,
		    thisSpotColor,
		    thisMinSpotColor,
		    thisMaxSpotColor,
		    thishighlightSpotColor,
		    thisHighlightLineColor,
		    thisSpotRadius,			        
			pieColors,
		    pieWidthHeight,
		    pieBorderColor,
		    pieOffset,
		 	thisBoxWidth,
		    thisBoxHeight,
		    thisBoxRaw,
		    thisBoxTarget,
		    thisBoxMin,
		    thisBoxMax,
		    thisShowOutlier,
		    thisIQR,
		    thisBoxSpotRadius,
		    thisBoxLineColor,
		    thisBoxFillColor,
		    thisBoxWhisColor,
		    thisBoxOutlineColor,
		    thisBoxOutlineFill,
		    thisBoxMedianColor,
		    thisBoxTargetColor,
			thisBulletHeight,
		    thisBulletWidth,
		    thisBulletColor,
		    thisBulletPerformanceColor,
		    thisBulletRangeColors,
			thisDiscreteHeight,
		    thisDiscreteWidth,
		    thisDiscreteLineColor,
		    thisDiscreteLineHeight,
		    thisDiscreteThrushold,
		    thisDiscreteThrusholdColor,
			thisTristateHeight,
		    thisTristatePosBarColor,
		    thisTristateNegBarColor,
		    thisTristateZeroBarColor,
		    thisTristateBarWidth,
		    thisTristateBarSpacing,
		    thisZeroAxis,
		    thisBarColor,
		    sparklineWidth,
		    sparklineValue,
		    sparklineValueSpots1,
		    sparklineValueSpots2,
		    thisLineWidth1,
		    thisLineWidth2,
		    thisLineColor1,
		    thisLineColor2,
		    thisSpotRadius1,
		    thisSpotRadius2,
		    thisMinSpotColor1,
		    thisMaxSpotColor1,
		    thisMinSpotColor2,
		    thisMaxSpotColor2,
		    thishighlightSpotColor1,
		    thisHighlightLineColor1,
		    thishighlightSpotColor2,
		    thisFillColor1,
		    thisFillColor2;
				    				    

		$('.sparkline').each(function() {
			var $this = $(this);
			var sparklineType = $this.data('sparkline-type') || 'bar';

			// BAR CHART
			if (sparklineType == 'bar') {

					barColor = $this.data('sparkline-bar-color') || $this.css('color') || '#0000f0';
				    sparklineHeight = $this.data('sparkline-height') || '26px';
				    sparklineBarWidth = $this.data('sparkline-barwidth') || 5;
				    sparklineBarSpacing = $this.data('sparkline-barspacing') || 2;
				    sparklineNegBarColor = $this.data('sparkline-negbar-color') || '#A90329';
				    sparklineStackedColor = $this.data('sparkline-barstacked-color') || ["#A90329", "#0099c6", "#98AA56", "#da532c", "#4490B1", "#6E9461", "#990099", "#B4CAD3"];
				        
				$this.sparkline('html', {
					barColor : barColor,
					type : sparklineType,
					height : sparklineHeight,
					barWidth : sparklineBarWidth,
					barSpacing : sparklineBarSpacing,
					stackedBarColor : sparklineStackedColor,
					negBarColor : sparklineNegBarColor,
					zeroAxis : 'false'
				});

			}

			//LINE CHART
			if (sparklineType == 'line') {

					sparklineHeight = $this.data('sparkline-height') || '20px';
				    sparklineWidth = $this.data('sparkline-width') || '90px';
				    thisLineColor = $this.data('sparkline-line-color') || $this.css('color') || '#0000f0';
				    thisLineWidth = $this.data('sparkline-line-width') || 1;
				    thisFill = $this.data('fill-color') || '#c0d0f0';
				    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000';
				    thisMinSpotColor = $this.data('sparkline-minspot-color') || '#ed1c24';
				    thisMaxSpotColor = $this.data('sparkline-maxspot-color') || '#f08000';
				    thishighlightSpotColor = $this.data('sparkline-highlightspot-color') || '#50f050';
				    thisHighlightLineColor = $this.data('sparkline-highlightline-color') || 'f02020';
				    thisSpotRadius = $this.data('sparkline-spotradius') || 1.5;
					thisChartMinYRange = $this.data('sparkline-min-y') || 'undefined'; 
					thisChartMaxYRange = $this.data('sparkline-max-y') || 'undefined'; 
					thisChartMinXRange = $this.data('sparkline-min-x') || 'undefined'; 
					thisChartMaxXRange = $this.data('sparkline-max-x') || 'undefined'; 
					thisMinNormValue = $this.data('min-val') || 'undefined'; 
					thisMaxNormValue = $this.data('max-val') || 'undefined'; 
					thisNormColor =  $this.data('norm-color') || '#c0c0c0';
					thisDrawNormalOnTop = $this.data('draw-normal') || false;
				    
				$this.sparkline('html', {
					type : 'line',
					width : sparklineWidth,
					height : sparklineHeight,
					lineWidth : thisLineWidth,
					lineColor : thisLineColor,
					fillColor : thisFill,
					spotColor : thisSpotColor,
					minSpotColor : thisMinSpotColor,
					maxSpotColor : thisMaxSpotColor,
					highlightSpotColor : thishighlightSpotColor,
					highlightLineColor : thisHighlightLineColor,
					spotRadius : thisSpotRadius,
					chartRangeMin : thisChartMinYRange,
					chartRangeMax : thisChartMaxYRange,
					chartRangeMinX : thisChartMinXRange,
					chartRangeMaxX : thisChartMaxXRange,
					normalRangeMin : thisMinNormValue,
					normalRangeMax : thisMaxNormValue,
					normalRangeColor : thisNormColor,
					drawNormalOnTop : thisDrawNormalOnTop

				});

			}

			//PIE CHART
			if (sparklineType == 'pie') {

					pieColors = $this.data('sparkline-piecolor') || ["#B4CAD3", "#4490B1", "#98AA56", "#da532c","#6E9461", "#0099c6", "#990099", "#717D8A"];
				    pieWidthHeight = $this.data('sparkline-piesize') || 90;
				    pieBorderColor = $this.data('border-color') || '#45494C';
				    pieOffset = $this.data('sparkline-offset') || 0;
				    
				$this.sparkline('html', {
					type : 'pie',
					width : pieWidthHeight,
					height : pieWidthHeight,
					tooltipFormat : '<span style="color: {{color}}">&#9679;</span> ({{percent.1}}%)',
					sliceColors : pieColors,
					borderWidth : 1,
					offset : pieOffset,
					borderColor : pieBorderColor
				});

			}

			//BOX PLOT
			if (sparklineType == 'box') {

					thisBoxWidth = $this.data('sparkline-width') || 'auto';
				    thisBoxHeight = $this.data('sparkline-height') || 'auto';
				    thisBoxRaw = $this.data('sparkline-boxraw') || false;
				    thisBoxTarget = $this.data('sparkline-targetval') || 'undefined';
				    thisBoxMin = $this.data('sparkline-min') || 'undefined';
				    thisBoxMax = $this.data('sparkline-max') || 'undefined';
				    thisShowOutlier = $this.data('sparkline-showoutlier') || true;
				    thisIQR = $this.data('sparkline-outlier-iqr') || 1.5;
				    thisBoxSpotRadius = $this.data('sparkline-spotradius') || 1.5;
				    thisBoxLineColor = $this.css('color') || '#000000';
				    thisBoxFillColor = $this.data('fill-color') || '#c0d0f0';
				    thisBoxWhisColor = $this.data('sparkline-whis-color') || '#000000';
				    thisBoxOutlineColor = $this.data('sparkline-outline-color') || '#303030';
				    thisBoxOutlineFill = $this.data('sparkline-outlinefill-color') || '#f0f0f0';
				    thisBoxMedianColor = $this.data('sparkline-outlinemedian-color') || '#f00000';
				    thisBoxTargetColor = $this.data('sparkline-outlinetarget-color') || '#40a020';
				    
				$this.sparkline('html', {
					type : 'box',
					width : thisBoxWidth,
					height : thisBoxHeight,
					raw : thisBoxRaw,
					target : thisBoxTarget,
					minValue : thisBoxMin,
					maxValue : thisBoxMax,
					showOutliers : thisShowOutlier,
					outlierIQR : thisIQR,
					spotRadius : thisBoxSpotRadius,
					boxLineColor : thisBoxLineColor,
					boxFillColor : thisBoxFillColor,
					whiskerColor : thisBoxWhisColor,
					outlierLineColor : thisBoxOutlineColor,
					outlierFillColor : thisBoxOutlineFill,
					medianColor : thisBoxMedianColor,
					targetColor : thisBoxTargetColor

				});

			}

			//BULLET
			if (sparklineType == 'bullet') {

				var thisBulletHeight = $this.data('sparkline-height') || 'auto';
				    thisBulletWidth = $this.data('sparkline-width') || 2;
				    thisBulletColor = $this.data('sparkline-bullet-color') || '#ed1c24';
				    thisBulletPerformanceColor = $this.data('sparkline-performance-color') || '#3030f0';
				    thisBulletRangeColors = $this.data('sparkline-bulletrange-color') || ["#d3dafe", "#a8b6ff", "#7f94ff"];
				    
				$this.sparkline('html', {

					type : 'bullet',
					height : thisBulletHeight,
					targetWidth : thisBulletWidth,
					targetColor : thisBulletColor,
					performanceColor : thisBulletPerformanceColor,
					rangeColors : thisBulletRangeColors

				});

			}

			//DISCRETE
			if (sparklineType == 'discrete') {

				 	thisDiscreteHeight = $this.data('sparkline-height') || 26;
				    thisDiscreteWidth = $this.data('sparkline-width') || 50;
				    thisDiscreteLineColor = $this.css('color');
				    thisDiscreteLineHeight = $this.data('sparkline-line-height') || 5;
				    thisDiscreteThrushold = $this.data('sparkline-threshold') || 'undefined';
				    thisDiscreteThrusholdColor = $this.data('sparkline-threshold-color') || '#ed1c24';
				    
				$this.sparkline('html', {

					type : 'discrete',
					width : thisDiscreteWidth,
					height : thisDiscreteHeight,
					lineColor : thisDiscreteLineColor,
					lineHeight : thisDiscreteLineHeight,
					thresholdValue : thisDiscreteThrushold,
					thresholdColor : thisDiscreteThrusholdColor

				});

			}

			//TRISTATE
			if (sparklineType == 'tristate') {

				 	thisTristateHeight = $this.data('sparkline-height') || 26;
				    thisTristatePosBarColor = $this.data('sparkline-posbar-color') || '#60f060';
				    thisTristateNegBarColor = $this.data('sparkline-negbar-color') || '#f04040';
				    thisTristateZeroBarColor = $this.data('sparkline-zerobar-color') || '#909090';
				    thisTristateBarWidth = $this.data('sparkline-barwidth') || 5;
				    thisTristateBarSpacing = $this.data('sparkline-barspacing') || 2;
				    thisZeroAxis = $this.data('sparkline-zeroaxis') || false;
				    
				$this.sparkline('html', {

					type : 'tristate',
					height : thisTristateHeight,
					posBarColor : thisBarColor,
					negBarColor : thisTristateNegBarColor,
					zeroBarColor : thisTristateZeroBarColor,
					barWidth : thisTristateBarWidth,
					barSpacing : thisTristateBarSpacing,
					zeroAxis : thisZeroAxis

				});

			}

			//COMPOSITE: BAR
			if (sparklineType == 'compositebar') {

				 	sparklineHeight = $this.data('sparkline-height') || '20px';
				    sparklineWidth = $this.data('sparkline-width') || '100%';
				    sparklineBarWidth = $this.data('sparkline-barwidth') || 3;
				    thisLineWidth = $this.data('sparkline-line-width') || 1;
				    thisLineColor = $this.data('sparkline-color-top') || '#ed1c24';
				    thisBarColor = $this.data('sparkline-color-bottom') || '#333333';
				    
				$this.sparkline($this.data('sparkline-bar-val'), {

					type : 'bar',
					width : sparklineWidth,
					height : sparklineHeight,
					barColor : thisBarColor,
					barWidth : sparklineBarWidth
					//barSpacing: 5

				});

				$this.sparkline($this.data('sparkline-line-val'), {

					width : sparklineWidth,
					height : sparklineHeight,
					lineColor : thisLineColor,
					lineWidth : thisLineWidth,
					composite : true,
					fillColor : false

				});

			}

			//COMPOSITE: LINE
			if (sparklineType == 'compositeline') {

					sparklineHeight = $this.data('sparkline-height') || '20px';
				    sparklineWidth = $this.data('sparkline-width') || '90px';
				    sparklineValue = $this.data('sparkline-bar-val');
				    sparklineValueSpots1 = $this.data('sparkline-bar-val-spots-top') || null;
				    sparklineValueSpots2 = $this.data('sparkline-bar-val-spots-bottom') || null;
				    thisLineWidth1 = $this.data('sparkline-line-width-top') || 1;
				    thisLineWidth2 = $this.data('sparkline-line-width-bottom') || 1;
				    thisLineColor1 = $this.data('sparkline-color-top') || '#333333';
				    thisLineColor2 = $this.data('sparkline-color-bottom') || '#ed1c24';
				    thisSpotRadius1 = $this.data('sparkline-spotradius-top') || 1.5;
				    thisSpotRadius2 = $this.data('sparkline-spotradius-bottom') || thisSpotRadius1;
				    thisSpotColor = $this.data('sparkline-spot-color') || '#f08000';
				    thisMinSpotColor1 = $this.data('sparkline-minspot-color-top') || '#ed1c24';
				    thisMaxSpotColor1 = $this.data('sparkline-maxspot-color-top') || '#f08000';
				    thisMinSpotColor2 = $this.data('sparkline-minspot-color-bottom') || thisMinSpotColor1;
				    thisMaxSpotColor2 = $this.data('sparkline-maxspot-color-bottom') || thisMaxSpotColor1;
				    thishighlightSpotColor1 = $this.data('sparkline-highlightspot-color-top') || '#50f050';
				    thisHighlightLineColor1 = $this.data('sparkline-highlightline-color-top') || '#f02020';
				    thishighlightSpotColor2 = $this.data('sparkline-highlightspot-color-bottom') ||
				        thishighlightSpotColor1;
				    thisHighlightLineColor2 = $this.data('sparkline-highlightline-color-bottom') ||
				        thisHighlightLineColor1;
				    thisFillColor1 = $this.data('sparkline-fillcolor-top') || 'transparent';
				    thisFillColor2 = $this.data('sparkline-fillcolor-bottom') || 'transparent';
				    
				$this.sparkline(sparklineValue, {

					type : 'line',
					spotRadius : thisSpotRadius1,

					spotColor : thisSpotColor,
					minSpotColor : thisMinSpotColor1,
					maxSpotColor : thisMaxSpotColor1,
					highlightSpotColor : thishighlightSpotColor1,
					highlightLineColor : thisHighlightLineColor1,

					valueSpots : sparklineValueSpots1,

					lineWidth : thisLineWidth1,
					width : sparklineWidth,
					height : sparklineHeight,
					lineColor : thisLineColor1,
					fillColor : thisFillColor1

				});

				$this.sparkline($this.data('sparkline-line-val'), {

					type : 'line',
					spotRadius : thisSpotRadius2,

					spotColor : thisSpotColor,
					minSpotColor : thisMinSpotColor2,
					maxSpotColor : thisMaxSpotColor2,
					highlightSpotColor : thishighlightSpotColor2,
					highlightLineColor : thisHighlightLineColor2,

					valueSpots : sparklineValueSpots2,

					lineWidth : thisLineWidth2,
					width : sparklineWidth,
					height : sparklineHeight,
					lineColor : thisLineColor2,
					composite : true,
					fillColor : thisFillColor2

				});

			}

		});

	}// end if

	/*
	 * EASY PIE CHARTS
	 * DEPENDENCY: js/plugins/easy-pie-chart/jquery.easy-pie-chart.min.js
	 * Usage: <div class="easy-pie-chart txt-color-orangeDark" data-pie-percent="33" data-pie-size="72" data-size="72">
	 *			<span class="percent percent-sign">35</span>
	 * 	  	  </div>
	 */

/*if ($.fn.easyPieChart) {

		$('.easy-pie-chart').each(function() {
			var $this = $(this);
			var barColor = $this.css('color') || $this.data('pie-color'),
			    trackColor = $this.data('pie-track-color') || '#FFFFFF',
			    size = parseInt($this.data('pie-size')) || 25;
			   
			$this.easyPieChart({
				easing: 'easeOutCirc',
				barColor : barColor,
				trackColor : trackColor,
				scaleColor : false,
				lineCap : 'butt',
				lineWidth : parseInt(size / 8.5),
				animate : 1500,
				rotate : -90,
				size : size,
				onStep : function(value) {
					this.$el.find('span').text(Math.round(value));
				}
				
			});
		});

	} */

	
	// end if

}

/* ~ END: INITIALIZE CHARTS */

/*
 * INITIALIZE JARVIS WIDGETS
 */

// Setup Desktop Widgets
function setup_widgets_desktop() {

	if ($.fn.jarvisWidgets && enableJarvisWidgets) {

		$('#widget-grid').jarvisWidgets({

			grid : 'article',
			widgets : '.jarviswidget',
			localStorage : true,
			deleteSettingsKey : '#deletesettingskey-options',
			settingsKeyLabel : 'Reset settings?',
			deletePositionKey : '#deletepositionkey-options',
			positionKeyLabel : 'Reset position?',
			sortable : true,
			buttonsHidden : false,
			// toggle button
			toggleButton : true,
			toggleClass : 'fa fa-minus | fa fa-plus',
			toggleSpeed : 200,
			onToggle : function() {
			},
			// delete btn
			deleteButton : true,
			deleteClass : 'fa fa-times',
			deleteSpeed : 200,
			onDelete : function() {
			},
			// edit btn
			editButton : true,
			editPlaceholder : '.jarviswidget-editbox',
			editClass : 'fa fa-cog | fa fa-save',
			editSpeed : 200,
			onEdit : function() {
			},
			// color button
			colorButton : true,
			// full screen
			fullscreenButton : true,
			fullscreenClass : 'fa fa-expand | fa fa-compress',
			fullscreenDiff : 3,
			onFullscreen : function() {
				$(".tooltip.fade.bottom.in").css("display","none");
			},
			// custom btn
			customButton : false,
			customClass : 'folder-10 | next-10',
			customStart : function() {
				alert('Hello you, this is a custom button...');
			},
			customEnd : function() {
				alert('bye, till next time...');
			},
			// order
			buttonOrder : '%refresh% %custom% %edit% %toggle% %fullscreen% %delete%',
			opacity : 1.0,
			dragHandle : '> header',
			placeholderClass : 'jarviswidget-placeholder',
			indicator : true,
			indicatorTime : 600,
			ajax : true,
			timestampPlaceholder : '.jarviswidget-timestamp',
			timestampFormat : 'Last update: %m%/%d%/%y% %h%:%i%:%s%',
			refreshButton : true,
			refreshButtonClass : 'fa fa-refresh',
			labelError : 'Sorry but there was a error:',
			labelUpdated : 'Last Update:',
			labelRefresh : 'Refresh',
			labelDelete : 'Delete widget:',
			afterLoad : function() {
			},
			rtl : false, // best not to toggle this!
			onChange : function() {
				
			},
			onSave : function() {
				
			},
			ajaxnav : $.navAsAjax // declears how the localstorage should be saved (HTML or AJAX page)

		});

	}

}

// Setup Desktop Widgets
function setup_widgets_mobile() {

	if (enableMobileWidgets && enableJarvisWidgets) {
		setup_widgets_desktop();
	}

}

/* ~ END: INITIALIZE JARVIS WIDGETS */

/*
 * GOOGLE MAPS
 * description: Append google maps to head dynamically (only execute for ajax version)
 * Loads at the begining for ajax pages
 */

if ($.navAsAjax || $(".google_maps")){
	var gMapsLoaded = false;
	window.gMapsCallback = function() {
		gMapsLoaded = true;
		$(window).trigger('gMapsLoaded');
	};
	window.loadGoogleMaps = function() {
		if (gMapsLoaded)
			return window.gMapsCallback();
		var script_tag = document.createElement('script');
		script_tag.setAttribute("type", "text/javascript");
		script_tag.setAttribute("src", "http://maps.google.com/maps/api/js?sensor=false&callback=gMapsCallback");
		(document.getElementsByTagName("head")[0] || document.documentElement).appendChild(script_tag);
	};
}

/* ~ END: GOOGLE MAPS */

/*
 * LOAD SCRIPTS
 * Usage:
 * Define function = myPrettyCode ()...
 * loadScript("js/my_lovely_script.js", myPrettyCode);
 */

var jsArray = {};

function loadScript(scriptName, callback) {

	if (!jsArray[scriptName]) {
		jsArray[scriptName] = true;

		// adding the script tag to the head as suggested before
		var body = document.getElementsByTagName('body')[0];
		var script = document.createElement('script');
		script.type = 'text/javascript';
		script.src = scriptName;

		// then bind the event to the callback function
		// there are several events for cross browser compatibility
		//script.onreadystatechange = callback;
		script.onload = callback;

		// fire the loading
		body.appendChild(script);

	} else if (callback) {// changed else to else if(callback)
		//console.log("JS file already added!");
		//execute function
		callback();
	}

}

/* ~ END: LOAD SCRIPTS */

/*
* APP AJAX REQUEST SETUP
* Description: Executes and fetches all ajax requests also
* updates naivgation elements to active
*/
/* ANGULAR: Handled via ngRoute
if($.navAsAjax)
{
    // fire this on page load if nav exists
    if ($('nav').length) {
	    checkURL();
    }

	// ANGULAR: Handled via "navItem" directive
    $(document).on('click', 'nav a[href!="#"]', function(e) {
	    e.preventDefault();
	    var $this = $(e.currentTarget);

	    // if parent is not active then get hash, or else page is assumed to be loaded
		if (!$this.parent().hasClass("active") && !$this.attr('target')) {

		    // update window with hash
		    // you could also do here:  device === "mobile" - and save a little more memory

		    if ($.root_.hasClass('mobile-view-activated')) {
			    $.root_.removeClass('hidden-menu');
			    window.setTimeout(function() {
					if (window.location.search) {
						window.location.href =
							window.location.href.replace(window.location.search, '')
								.replace(window.location.hash, '') + '#' + $this.attr('href');
					} else {
						window.location.hash = $this.attr('href');
					}
			    }, 150);
			    // it may not need this delay...
		    } else {
				if (window.location.search) {
					window.location.href =
						window.location.href.replace(window.location.search, '')
							.replace(window.location.hash, '') + '#' + $this.attr('href');
				} else {
					window.location.hash = $this.attr('href');
				}
		    }
	    }

    });

    // fire links with targets on different window
    $(document).on('click', 'nav a[target="_blank"]', function(e) {
	    e.preventDefault();
	    var $this = $(e.currentTarget);

	    window.open($this.attr('href'));
    });

    // fire links with targets on same window
    $(document).on('click', 'nav a[target="_top"]', function(e) {
	    e.preventDefault();
	    var $this = $(e.currentTarget);

	    window.location = ($this.attr('href'));
    });

    // all links with hash tags are ignored
    $(document).on('click', 'nav a[href="#"]', function(e) {
	    e.preventDefault();
    });

    // DO on hash change
    $(window).on('hashchange', function() {
	    checkURL();
    });
}

// CHECK TO SEE IF URL EXISTS
function checkURL() {

	// bootstrap backdrop bug for ajax version
	if ($('.modal-backdrop')[0] && $.navAsAjax){
		$('.modal-backdrop').remove();
		//console.log("backdrop removed");
	}

	//get the url by removing the hash
	var url = location.hash.replace(/^#/, '');
	
	//BEGIN: IE11 Work Around
	if (!url) {
	
		try {
			var documentUrl = window.document.URL;
			if (documentUrl) {
				if (documentUrl.indexOf('#', 0) > 0 && documentUrl.indexOf('#', 0) < (documentUrl.length + 1)) {
					url = documentUrl.substring(documentUrl.indexOf('#', 0) + 1);
	
				}
	
			}
	
		} catch (err) {}
	}
	//END: IE11 Work Around

	container = $('#content');
	// Do this if url exists (for page refresh, etc...)
	if (url) {
		// remove all active class
		$('nav li.active').removeClass("active");
		// match the url and add the active class
		$('nav li:has(a[href="' + url + '"])').addClass("active");
		var title = ($('nav a[href="' + url + '"]').attr('title'));

		// change page title from global var
		document.title = (title || document.title);
		//console.log("page title: " + document.title);

		// parse url to jquery
		loadURL(url + location.search, container);
	} else {

		// grab the first URL from nav
		var $this = $('nav > ul > li:first-child > a[href!="#"]');

		//update hash
		window.location.hash = $this.attr('href');

	}

}
*/

// LOAD AJAX PAGES
function loadURL(url, container) {
	//console.log(container)

	$.ajax({
		type : "GET",
		url : url,
		dataType : 'html',
		cache : true, // (warning: setting it to false will cause a timestamp and will call the request twice)
		beforeSend : function() {
			
			//IE11 bug fix for googlemaps (delete all google map instances)
			//check if the page is ajax = true, has google map class and the container is #content
			if ($.navAsAjax && $(".google_maps")[0] && (container[0] == $("#content")[0]) ) {
				
				// target gmaps if any on page
				var collection = $(".google_maps"),
					i = 0;
				// run for each	map
				collection.each(function() {
				    i ++;
				    // get map id from class elements
				    var divDealerMap = document.getElementById(this.id);
				    
				    if(i == collection.length + 1) {
					    // "callback"
					    //console.log("all maps destroyed");
					} else {
						// destroy every map found
						if (divDealerMap) divDealerMap.parentNode.removeChild(divDealerMap);
						//console.log(this.id + " destroying maps...");
					}
				});
				
				//console.log("google maps nuked!!!");
				
			}; //end fix
			
			// destroy all datatable instances
			if ( $.navAsAjax && $('.dataTables_wrapper')[0] && (container[0] == $("#content")[0]) ) {
				
				var tables = $.fn.dataTable.fnTables(true);				
				$(tables).each(function () {
				    $(this).dataTable().fnDestroy();
				});
				//console.log("datatable nuked!!!");
			}
			// end destroy
			
			// pop intervals (destroys jarviswidget related intervals)
			if ( $.navAsAjax && $.intervalArr.length > 0 && (container[0] == $("#content")[0]) && enableJarvisWidgets ) {
				
				while($.intervalArr.length > 0)
        			clearInterval($.intervalArr.pop());
        			//console.log("all intervals cleared..")
        			
			}
			// end pop intervals
			
			// empty container to start garbage memory collection
			container.html("");
			
			// place cog
			container.html('<h1 class="ajax-loading-animation"><i class="fa fa-cog fa-spin"></i> Loading...</h1>');
		
			// Only draw breadcrumb if it is main content material
			if (container[0] == $("#content")[0]) {
				
				// clear everything else except these key DOM elements
				// we do this because sometime plugins will leave dynamic elements behind
				$('body').find('> *').filter(':not(' + ignore_key_elms + ')').empty().remove();
				
				// draw breadcrumb
				drawBreadCrumb();
				
				// scroll up
				$("html").animate({
					scrollTop : 0
				}, "fast");
			} 
			// end if
		},
		success : function(data) {
			container.css({
				opacity : '0.0'
			}).html(data).delay(50).animate({
				opacity : '1.0'
			}, 300);
		},
		error : function(xhr, ajaxOptions, thrownError) {
			container.html('<h4 class="ajax-loading-error"><i class="fa fa-warning txt-color-orangeDark"></i> Error 404! Page not found.</h4>');
		},
		async : true 
	});

	//console.log("ajax request sent");
}

/* ANGULAR: Handled via 'ribbon > breadcrumb' directive
// UPDATE BREADCRUMB
function drawBreadCrumb() {
	var nav_elems = $('nav li.active > a'), count = nav_elems.length;
	
	//console.log("breadcrumb")
	bread_crumb.empty();
	bread_crumb.append($("<li>Home</li>"));
	nav_elems.each(function() {
		bread_crumb.append($("<li></li>").html($.trim($(this).clone().children(".badge").remove().end().text())));
		// update title when breadcrumb is finished...
		if (!--count) document.title = bread_crumb.find("li:last-child").text();
	});

}*/

/* ~ END: APP AJAX REQUEST SETUP */

/*
 * PAGE SETUP
 * Description: fire certain scripts that run through the page
 * to check for form elements, tooltip activation, popovers, etc...
 */
function pageSetUp() {

	if (device === "desktop"){
		// is desktop
		
		// activate tooltips
		$("[rel=tooltip]").tooltip();
	
		// activate popovers
		$("[rel=popover]").popover();
	
		// activate popovers with hover states
		$("[rel=popover-hover]").popover({
			trigger : "hover"
		});

		// setup widgets
		setup_widgets_desktop();
	
		// activate inline charts
		runAllCharts();
	
		// run form elements
		runAllForms();

	} else {
		
		// is mobile
		
		// activate popovers
		$("[rel=popover]").popover();
	
		// activate popovers with hover states
		$("[rel=popover-hover]").popover({
			trigger : "hover"
		});
	
		// activate inline charts
		runAllCharts();
	
		// setup widgets
		setup_widgets_mobile();
	
		// run form elements
		runAllForms();
		
	}
	
	$("#wt-topo-bytype .dropdown-menu a").click(function(){
		var txt = $(this).text();
		var val = $(this).attr("val");
		$("#wt-topo-bytype button span").text(txt);
		window.localStorage['topoByType'] = val;
		
		var selectednode=laygoon.widgets.treeView.getSelectedNode();
		var searchobj=laygoon.widgets.treeView.getSelectedNodes();
		laygoon.widgets.appTopology.handle(searchobj.selectedNodes,searchobj.isSelectAll,selectednode);
	});
	
}

// Keep only 1 active popover per trigger - also check and hide active popover if user clicks on document
$('body').on('click', function(e) {
	$('[rel="popover"]').each(function() {
		//the 'is' for buttons that trigger popups
		//the 'has' for icons within a button that triggers a popup
		if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
			$(this).popover('hide');
		}
	});
}); 

function sessionTimeOutModal()
{
	window.location.replace("/login?sessionExpired");
//	$('#sessionTimeOutModal').modal('show');
//	$('#sessionTimeOutModal').css('z-index',5000);
}


$.ajaxSetup({
	statusCode : {
		302 : sessionTimeOutModal,
		901 : sessionTimeOutModal
	}
});
// namespace
laygoon = {};
laygoon.version = versionNum;//get version Num from gloable varible in index.html.
laygoon.language="en";
laygoon.pages = {};
laygoon.pages.appTopology = {};
laygoon.pages.flowAnalysis = {};
laygoon.pages.vimGuide = {};
laygoon.widgets = {};
laygoon.localize={};
laygoon.common = {
		history: [],
		vmNetWorkDefs:[],
		NetWorkDefs:[],
		vmMemoryDefs:[],
		MemoryDefs:[],
		vmCPUDefs:[],
		CPUDefs:[],
		ApplicationPerformanceDefs:[],
		StorageDefs:[],
		hostStorageDefs:[],
		noDataCenter: false,
	 // the common color for matrixbar/areachart in rootcause
		colorArray: ["#DDDDDD","#7BDC2A","#FFD033","#FF6321","#DB1B1B"],
		
		backgroundArray: ["#DDDDDD", "#A9D96C", "#FCEB00", "#EE8802", "#FF6C60"],
		
		resizeEvents: [],
		
		pauseResizeEvent: false,

		chartTypes: {
    		dashboard: "matrix",
    		appTopology: "matrix",
    		flowAnalysis: "areaChart",
    		cpuUsage: "matrix",
    		memoryUsage: "matrix",
    		storageUsage: "matrix",
    		resourceBrowser: "matrix",
    		netConversation: "matrix",
    		criticalResources: "stackMatrix"
    	},
    	copyObject:function(obj){
    		var copyDataObj = new Object();
    		if(obj != undefined) {
	        	var copyDataStr = '';
	        	try{
	        		copyDataStr = JSON.stringify(obj);
	        		copyDataObj = JSON.parse(copyDataStr);  
	        	} catch(e) {
	        		console.log([e.message, obj]);
	        	}
    		} else {
    			copyDataObj = undefined;
    		}
        	return copyDataObj;
       },
		// render with version number
		getHtml: function(url){
			return function(){
				return url + "?v=" + laygoon.version;
			}
		},
		
		getUuidJsUrl: function(jsUrl){
			return function(){
                 return jsUrl + "&" + laygoon.uuid;                				
			}
		},
		
		getUniqueUrlTimeStamp: function(url){
			return function(){
                return url + "?timeStamp=" + new Date().getTime();                				
			}
		},
		
		getPackUuid: function(str) {
            return str + laygoon.uuid;			
		},
		//easyPieChart Color Constants
		EasyPieChartColorGrade : {
			greenColor : "#7BDC2A",  //green
			yellowColor : "#FFD033", //yellow
			brownColor : "#FF6321",  //orange
			redColor : "#DB1B1B", //red
			greyColor : "#DDDDDD"
		},
		//datatable setting
	  dataTableSettings:{
				"paging": false,
				"filter": false,
				"scrollY": 700,
				"order": [[ 0, "desc" ]],
				"breakpoints":{
					breakpoints:[
					            { name: 'desktop', width: Infinity },
					            { name: 'tablet',  width: 1024 },
					            { name: 'fablet',  width: 768 },
					            { name: 'phone',   width: 480 }
					        ]
				},
			    "fullScreen":false
		},
		nameColumn:{
			"data": "name",
			"render": function (data, type, row, meta) {
				var name = data;
        		if (type === 'display') {
        			return "<div class='text-overflow'>" + name + "</div>";
        		}
        		return name;
        	},
        	className: "text-align-left ",
        	"width": "10%",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 0
		},
		/* table column config start*/
		healthColumn:{
			"data": "grades.healthScore",
			"render": function (data, type, row, meta) {
				var health = data;
        		if (type === 'display') {
        			return (health == -1) ? 'N/A' : (health + '');
        		}
        		return health;
        	},
        	"width": "6%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 1
		},
		artColumn:{
			"data": "appRespTime",
			"render": function (data, type, row, meta) {
				var ART = data;
        		if (type === 'display') {
        			return (ART == -1) ? 'N/A' : (ART + ' ms');
        		}
        		return ART;
        	},
        	"width": "6%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 2
		},
		transactionsColumn:{
			"data": "avgTypeSpecificStat",
			"render": function (data, type, row, meta) {
				var transactions = data;
        		var data=laygoon.helpers.packetExchange(transactions+"");
        		if (type === 'display') {
        			return data;
        		}
        		return transactions;
        		
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		trafficColumn:{
			"data": "trafficVolum",
			"render": function (data, type, row, meta) {
				var traffic = data;
        		if (type === 'display') {
        			if(traffic==0){
        				return traffic;
        			}else{
        				return laygoon.helpers.byteExchange(traffic, 'b', 'auto');
        			}
	        		
        		}
        		return traffic;
        	},
        	"width": "6%",
        	"asSorting": [ "desc", "asc" ],
        	className: "text-align-right "
		},
		packetsColumn:{
			"data": "packets",
			"render": function (data, type, row, meta) {
				var packets = data;
        		if (type === 'display') {
        			return laygoon.helpers.packetExchange(packets+"");
        		}
        		return packets;
        	},
        	"width": "7%",
        	"asSorting": [ "desc", "asc" ],
        	className: "text-align-right"
		},
		readLatencyColumn:{
			"data": "diskReadLatency",
			"render": function (data, type, row, meta) {
				var readLatency = data;
        		if (type === 'display') {
        			return readLatency+" ms";
        		}
        		return readLatency;
        		
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 2
		},
		readIOPSColumn:{
			"data": "readOperations",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		writeLatencyColumn:{
			"data": "diskWriteLatency",
			"render": function (data, type, row, meta) {
				var writeLatency = data;
        		if (type === 'display') {
	        		return writeLatency+" ms";
	        		}
	        		return writeLatency;
        	},
        	"width": "7%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		writeIOPSColumn:{
			"data": "writeOperations",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 5
		},
		dataStoreNameColumn:{
			"data": "parentName", 
			"render": function (data, type, row, meta) {
	        		var dataStoreName=data;
	        		if (type === 'display') {
		        		return dataStoreName;
	        		}
	        		return dataStoreName;
	        	},
	        	"width": "7%",
	        	className: "text-align-right ",
	        	"asSorting": [ "desc", "asc" ],
	        	"targets": 6
		},
		cpuUsageColumn:{
			"data": "cpuUsagePct",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets":2
		},
		memUsageColumn:{
			"data": "memUsagePct",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets":2
		},
		usageMHzColumn:{
			"data": "cpuUsageMhz",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		CPUReadyColumn:{
			"data": "cpuReady",
			"render": function (data, type, row, meta) {
				var cpuReady = data;
        		if (type === 'display') {
        			return cpuReady+"%";
        		}
        		return cpuReady;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		memActiveColumn:{
			"data": "memActive",
			"render": function (data, type, row, meta) {
				var memActive = data;
        		if (type === 'display') {
        			return memActive == -1 ? 'N/A' : laygoon.helpers.byteExchange(memActive+"", 'kb', 'auto');
        		}
        		return memActive;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		CPUSwapWaitColumn:{
			"data": "cpuSwapWait",
			"render": function (data, type, row, meta) {
				var cpuSwapWait = data;
        		if (type === 'display') {
        			return cpuSwapWait+" ms";
        		}
        		return cpuSwapWait;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		netRespTimeColumn:{
			"data": "netRespTime",
			"render": function (data, type, row, meta) {
				var RTT = data;
        		if (type === 'display') {
	        		return (RTT == -1) ? 'N/A' : (RTT + ' ms');
        		}
        		return RTT;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		virtualPktDropColumn:{
			"render": function (data, type, row, meta) {
				var virtualPktDrop = row.virtualPktDropIn + "/" + row.virtualPktDropOut;
        		if (type === 'display') {
	        		return virtualPktDrop;
        		}
        		return virtualPktDrop;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 5
		},
		tcpFatalRetryColumn:{
			 "render": function (data, type, row, meta) {
	        		var tcpFatalRetry= row.fatalRetryIn + "/" + row.fatalRetryOut;
	        		if (type === 'display') {
	        			return tcpFatalRetry;
	        		}
	        		return tcpFatalRetry;
	        	},
	        	"asSorting": [ "desc", "asc" ],
	        	"width": "7%",
	        	className: "text-align-right  ",
	        	"targets": 4
		},
		dataColumn:{
			"data": function (row, type, val, meta) {
        		return row.data;
        	}
		},
		tooltipNameColumn:{
			"data": function (row, type, val, meta) {
        		return row.tooltipName;
        	}
		},
		/*end table column config*/
		
		// auto adjust text font size
		autoSetFontSize:function(maxHeight,wordbox){
			wordbox.css('font-size', '12px');
			for (var i = 10; i < 200; i++) {
			    if (wordbox.height() > maxHeight) {
			        //当容器高度大于最大高度的时候，上一个尝试的值就是最佳大小。
			        wordbox.css('font-size', (i - 4) + 'px');
			        //结束循环
			        break;
			    } else {
			        //如果小于最大高度，文字大小加1继续尝试
			        wordbox.css('font-size', i + 'px');
			    }
			}
			
		},
		 removeItem:function(array,item){
	    	 for(var i = array.length - 1; i >= 0; i--) {
	 		    if(array[i] === item) {
	 		    	array.splice(i, 1);
	 		    }
	 		}
	    },
	    removeItemById:function(array,id){
	    	 for(var i = array.length - 1; i >= 0; i--) {
	 		    if(array[i].id === id) {
	 		    	array.splice(i, 1);
	 		    }
	 		}
	    },
	     setColor:function(grade){
			var color;
			if(grade==0){
				color='#7BDC2A';
			}else if(grade==1){
				color='#FFD033';
			}else if(grade==2){
				color='#FF6321';
			}else if(grade==3){
				color='#DB1B1B';
			}
			return color;
		},
		checkMinHealthScore :function(worstByGroupData){
			var nodeTypeComplete = ["VCenter",
				                       "DataCenter",
				                       "Cluster",
				                       "Host",
				                       "VSwitch",
				                       "PortGroup",
				                       "vApp",
				                       "VM",
				                       "VNic",
				                       "Protocol",
				                       "Classifier",
				                       "TORSwitch",
				                       "PhysicalStorage",
				                       "DataStore",
				                       "VirtualDisk"];  
			var easyPieData = laygoon.helpers.easyPieChartParamsExchange(worstByGroupData.spanText);
		       var obj = {};
				 obj.nodeType = nodeTypeComplete[worstByGroupData.nodeType];
				 obj.name = worstByGroupData.nodeName;
				 obj.d = worstByGroupData.beanForWorstByGroup;
				 obj.appRespTime = worstByGroupData.appRespTime;
				 obj.dataPercent = easyPieData.percent;
				 obj.barColor = easyPieData.barColor;
				 obj.trackColor = easyPieData.trackColor; 
		         obj.spanText = worstByGroupData.spanText;
				 obj.dataPieSize = 50;
				 obj.dataSize = 50;
				
				 return obj;
		},
	
	    //cpu/memory Usage
	    formatToolTipsDataOnMouseOver: function(d){
    		var dataObject = {}, tableData = {}, classifiers = [], showClassifiers = true;
    		dataObject.healthScore = d.grades.healthScore;	
    		dataObject.appRespTime = (d.appRespTime == -1) ? 'N/A' : (d.appRespTime + 'ms');
    		dataObject.cpuUsagePct = d.cpuUsagePct;
    		dataObject.cpuUsageMhz = d.cpuUsageMhz;
    		dataObject.cpuReady = d.cpuReady;
    		dataObject.memUsagePct = d.memUsagePct;
    		dataObject.memActiveDisplay = laygoon.helpers.byteExchange(d.memActive, 'kb', 'auto');
    		dataObject.cpuSwapWait = d.cpuSwapWait;
    		
    		showClassifiers  = (d.classifiers && d.classifiers.length != 0) ? true : false; 
    		if (showClassifiers) {
    			classifiers = laygoon.helpers.formatClassifiers(d);
    		}
    		
    		if (classifiers && classifiers.length != 0){
    			showClassifiers = true;
    		} else {
    			showClassifiers = false;
    		}
    		
    		dataObject.name = d.name;
    		dataObject.showOptions = (d.nodeType == 7 && showClassifiers) ? true : false;
    	    dataObject.showClassifiers = showClassifiers;
    	    dataObject.classifiersData = classifiers;
    	    
    	    return dataObject;
	    },
		formatToolTipsDataOnMouseClick: function(d){
			var that=this;
    		var NODETYPE = {
    				DataCenter:1,
    				Cluster:2,
    				Host:3,
    				PortGroup:5,
    				Vapp:6,
    				VM:7
    		}
    		var dataObject = {}, classifiers = [], showClassifiers = true;
    		
    		var grades = laygoon.helpers.getGrades('CPU', d);    		
    		showClassifiers  = (d.classifiers && d.classifiers.length != 0) ? true : false; 
    		if (showClassifiers) {
    			classifiers = laygoon.helpers.formatClassifiers(d);
    		}
    		
    		if (classifiers && classifiers.length != 0){
    			showClassifiers = true;
    		} else {
    			showClassifiers = false;
    		}
    		dataObject.name = d.name;
    		dataObject.cpuUsagePct = d.cpuUsagePct;
    	    dataObject.grades = grades;
    	    dataObject.showClassifiers = showClassifiers;
    	    dataObject.classifiersData = classifiers;
    	    dataObject.nodeType = laygoon.pages.flowAnalysis.nodeTypesScheme[d.nodeType];
    	    dataObject.bFilter=false;
    		dataObject.memUsagePct = d.memUsagePct;
    	  //  dataObject.bFilter = (d.nodeType == NODETYPE.DataCenter || d.nodeType == NODETYPE.Host ||  d.nodeType == NODETYPE.VM) ? true :  false;
    	    if(d.nodeType == NODETYPE.VM){
    	    	dataObject.updateTree = "none";
    	    }else if(d.nodeType == NODETYPE.DataCenter){
    	    	dataObject.updateTree = d.expand==true ? "ZoomIn" : "none";
    	    }
    	    else{
    	    	dataObject.updateTree = "ZoomIn";
    	    	
    	    }
    	    return dataObject;
		},
	   
	    
	    formActions: function(d){
            var  $this = d.tooltipName=='cpuUsage'?$('.popover .cpuTree-mouseclick-on-node').find('.easy-pie-chart'):$('.popover .memTree-mouseclick-on-node').find('.easy-pie-chart');
            $this.each(function () {
            	laygoon.helpers.showEasyPieChart($(this));
            });
		
	    },
    	
	// a common method for showing rootCause view,
	// param viewName is "summary"/"cpu" etc.
	// args is an object that contains what needs for page like nodename, classifier etc.
		showRootCauseViewFn: function(viewName, args){
		    var id = "#rootCauseModal";
			var scope = angular.element(id).scope();
			scope.setView(viewName, args);

			$('#rootCauseModal').modal({show: true, backdrop: 'static', keyboard: false});

			// to show tooltips for full-screen
		    if ($('#jarviswidget-fullscreen-mode').get(0)){
		    	  var resetZ_Index = $('#jarviswidget-fullscreen-mode').css('z-index');
		    	  $('#rootCauseModal').css('z-index', resetZ_Index + 1);
			   }
			//$('#rootCauseModal').modal({keyboard: true});

			$('#fadeModal').on('click', function(){
		    	$('#rootCauseModal').modal('hide');
		    });
		},

		showQuickHelper: function(page, subPage){
			var scope = angular.element("#quick-helper-root-cause").scope();
	    	scope.page = page;
	    	scope.subPage = subPage;
	    	$("#quick-helper-root-cause").modal({show: true, keyboard: true});
			$('#quick-helper-root-cause .fadeModal').on('click', function(){
		    	$('#quick-helper-root-cause').modal('hide');
		    });
		},

		bindQuickHelper: function(page, subPage) {
			var el = $("#quick-helper");
			$.data(el[0], "page", page);
			$.data(el[0], "subPage", subPage);
		},

		 showTooltip:function(title,color){
			$.smallBox({
				title : title,
				content : "<i class='fa fa-clock-o'></i><i>1 seconds ago...</i>",
				color : color,
				iconSmall : "fa fa-check bounce animated",
				timeout : 4000
			});
	   },
		showReport:function(name){
			$("#reportTable tr").each(function(){
				$(this).addClass("whiteColor");
				$(this).removeClass("grayColor");
			});
			 var url="/report/showReport?name="+name;
			 var report=$("#childPage");
			 report.attr("src",url);
			 report.load();
		},
		convAlarmDrillDown: function(node, protocol, signInstance, startTime, endTime){
            var startTime = parseInt(startTime, 10);
            var endTime = parseInt(endTime, 10);
			//console.debug(['common********************', signInstance, new Date(startTime), new Date(endTime)]);
			laygoon.common.showRootCauseViewFn("summary",
					{classifier: protocol, nodeName: node, signInstance : signInstance, startTime : startTime, endTime : endTime});
		},

		serverAlarmDrillDown: function(node, protocol){
			var url = "#/appTopology?node=" + node + "&nodeType=VMData&classifier="+ protocol +""+'&currentTab='+'depServiceTab';;
			window.location.href = url;
		},
		
		alertMessage: function(message) {
			$.SmartMessageBox({
				title : "<i class='fa'></i> "+ message +"",
				buttons : '[OK]'
			}, function(ButtonPressed) {
	
			});			
		},

	/*
	 * The width of right side bar.
	 */
	RIGHT_SIDE_BAR_WIDTH: 240,

	showRootCauseView: true, // a flag indicates whether we need to show rootCauseview automatically.
	/*
	 * Attach events for dashboard page.
	 */
	attachEvents: function(){
		
		//To show Stackable modal. 
		$(document)  
		  .on('show.bs.modal', '.modal', function(event) {
			  $(this).appendTo($('body'));
		  })
		  .on('shown.bs.modal', '.modal.in', function(event) {
		    setModalsAndBackdropsOrder();
		  })
		  .on('hidden.bs.modal', '.modal', function(event) {
		    setModalsAndBackdropsOrder();
		  });

		  function setModalsAndBackdropsOrder() {  
		  var modalZIndex = 1040;
		  $('.modal.in').each(function(index) {
		    var $modal = $(this);
		    modalZIndex++;
		    $modal.css('zIndex', modalZIndex);
		    $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
		  });
		   
		  $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
		 
		  }
		  
		  // Add event when local/session storage change
		  $(window).bind("storage", function(event){
			  var e = event.originalEvent;
			  if(e.key == "customID" && e.newValue != e.oldValue) {
				  $(window).trigger("customIDChange", [e.newValue]);
			  }
		  });
		  		
		  //set cache: false for all $.ajax
			/*  $.ajaxSetup ({
			      cache: false,
			      headers: {'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}
			  });*/
		
		  /*
		 * Attach events to resize the width of matrixbar when right siderbar show/hide
		 */
		/*$('.toggle-right-box .fa-bars').click(function(){
			laygoon.common.matrixContainerResize();
		});*/

		/*
		 * Resize the height of treeview and forcelayout as the maximum height of window's view.
		 */
		/*$(window).resize(function(){
			 laygoon.common.matrixContainerResize();
		});*/
	},
	/*
	 * Resize matrix container width if needed
	 */
	matrixContainerResize: function() {
		var totalWidth = $("#container").outerWidth(),
		brandWidth = $("#container .brand").outerWidth();
		//console.log([totalWidth, brandWidth]);
		$(".matrix-container").css("width", (totalWidth - brandWidth - 0 - 15) + "px");
	},

	setTimeRange: function(){
		var startTime = laygoon.helpers.getUrlParam("startTime"),
			endTime = laygoon.helpers.getUrlParam("endTime");
		if (startTime && startTime != "" && endTime && endTime != "") {
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.START_TIME, startTime);
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.END_TIME, endTime);
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.RANGE, "Custom");
		}
	},
	localize:function(){
		var localizedata={};
		if(laygoon.localize.datas != undefined) {
		   localizedata=laygoon.localize.datas;
		} else {
			localizedata.localizemessage="load local data error";
		}

		return localizedata;
	},
	goToRootCause: function(colorWheelName, nodeName, classifier, signInstance, startTime, endTime){
		if (colorWheelName == 'application') {
			if(signInstance) {
				laygoon.common.showRootCauseViewFn("summary",
						{classifier: classifier, nodeName: nodeName, signInstance: signInstance,
					startTime: startTime, endTime: endTime});
			} else {
				laygoon.common.showRootCauseViewFn("summary",
					{classifier: classifier, nodeName: nodeName});
			}
	    } else if (colorWheelName == 'network'){
			laygoon.common.showRootCauseViewFn("network",
					{classifier: classifier, nodeName: nodeName});
	    } else if (colorWheelName == 'CPU'){
			laygoon.common.showRootCauseViewFn("cpu",
					{classifier: classifier, nodeName: nodeName});
	    } else if (colorWheelName == 'Memory'){
			laygoon.common.showRootCauseViewFn("memory",
					{classifier: classifier, nodeName: nodeName});
	    }else {
			laygoon.common.showRootCauseViewFn("storage",
					{classifier: classifier, nodeName: nodeName});
	    }
	},
	 goToStatBrowserPage: function(nodeName, nodeType) {
     	 var d = {};
     	 d.name = nodeName;
     	 d.nodeType = nodeType;
     	 var service = angular.injector(['smartApp']).get('resBrowserConfigService');
     	 service.goToStatBrowserPage(d);
	 },
	 commonStartCapture:function(nodeName) {
		 var captureService = angular.injector(['smartApp']).get('captureService');
		 captureService.doStartCaptureVM(nodeName);
			/*if(nodeType=='3'){
				var hostName=nodeName;
				captureService.handleCapture(hostName);
			}*/
	 },
	 /* A method to show progress bar, disable all the page
	  * to show: laygoon.common.progressBar("Please wait...").show();
	  * to hide: laygoon.common.progressBar().hide();
	  *  */
	 progressBar: function(){
		 var mask, content;
		 return function(text){
			mask = mask || $("<div></div>").appendTo("body").addClass("global-progress-bar-background");
			content = content ? content.html(text) : $("<div>"+ text +"</div>").appendTo("body").addClass("global-progress-bar");
			return {
				show: function(){
					content.show();
					mask.show();	
				},
				hide: function(){
					content.hide();
					mask.hide();
				}
			};
		 };
	 }()
};

/*
 * Useful helpers
 */
laygoon.helpers = {

		SESSIONKEY: {
			RANGE:"range",
			START_TIME:"startTime",
			END_TIME:"endTime"
		},
		isMobile: {
    		    Android: function() {
    		        return navigator.userAgent.match(/Android/i);
    		    },
    		    BlackBerry: function() {
    		        return navigator.userAgent.match(/BlackBerry/i);
    		    },
    		    iOS: function() {
    		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    		    },
    		    Opera: function() {
    		        return navigator.userAgent.match(/Opera Mini/i);
    		    },
    		    Windows: function() {
    		        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    		    }
    		},
    	/**
		 * Get values of parameters on location
		 */
		getUrlParam: function (name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var hash = window.location.hash.split("?");
			var r;
			if(hash[1]){
				r = hash[1].match(reg);
			}
			if (r!=null) return unescape(r[2]); return null;
		},

      /**
	    * 鐎瑰綊鍣洪崡鏇氱秴鐠侊紕鐣婚敍灞炬暜閹镐礁鐣炬稊澶婄毈閺侀绻氶悾娆撴毐鎼达讣绱辩�姘疅鐠у嘲顫愰崪宀�窗閺嶅洤宕熸担宥忕礉閹存牗瀵�024閼奉亜濮╂潻娑楃秴
	    *
	    * @param int  size,鐎瑰綊鍣虹拋鈩冩殶
	    * @param type unit,鐎瑰綊鍣虹拋鈩冩殶閸楁洑缍呴敍宀勭帛鐠併倓璐熺�妤勫Ν
	    * @param type decimals,鐏忓繑鏆熼悙鐟版倵娣囨繄鏆�惃鍕秴閺佸府绱濇妯款吇娣囨繄鏆�稉锟界秴
	    * @param type targetUnit,鏉烆剚宕查惃鍕窗閺嶅洤宕熸担宥忕礉姒涙顓婚懛顏勫З鏉╂稐缍�
	    * @return type 鏉╂柨娲栫粭锕�値鐟曚焦鐪伴惃鍕敨閸楁洑缍呯紒鎾寸亯
	    */
		byteExchange: function (size, unit, targetUnit){
			if(size>=0){
			   var units = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb'];
			   var upper_units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

			   var theUnit = $.inArray(unit.toUpperCase(), upper_units);

			   if (targetUnit != 'auto'){
				   targetUnit = $.inArray(targetUnit.toUpperCase(), upper_units);
			   }

			   while (size >= 1024) {
		           size/=1024;
		           theUnit++;
		           if (theUnit == targetUnit)//瀹歌尙顑侀崥鍫㈢舶鐎规艾鍨柅锟藉毉瀵邦亞骞嗛崥褝绱�
		               break;
		       }
		       var flowUnitCoin = upper_units[theUnit];
		       var result;
		       if(size!=0){
		    	    result = size.toString();
			       
			       if(theUnit > 0){
				       var point = $.inArray('.', result);
				       result = result.substring(0, point + 3);
			       }else{
			    	   var point = $.inArray('.', result);
			    	   if(point>0)
				       result = result.substring(0, point);
			       }
		       }else{
		    	   result=size;
		       }
		      
		       return  result + ' ' + flowUnitCoin;
			}

		   },

		   /**
		    * format packet on tooltip
		    * @param size
		    *
		    */
		   packetExchange: function(size) {
			  if(size!=undefined){
				  var units = ['K','M','G'];
				  var theUnit = -1;
				  while(size >= 1000) {
					  size/=1000;
					  theUnit++;
				  }
				  var flowUnitCoin = theUnit==-1?'':units[theUnit];
				  var result = size.toString();
				  if(theUnit >= 0){
					  var point = $.inArray('.', result);
					  result = result.substring(0, point + 2);
				  }
				  return result + flowUnitCoin;
			  }
			 
		   },

		   /**
		    * easyPieData params  exchange
		    * @param    percent
		    * @param    barColor
		    * @param    trackColor
		    */

		easyPieChartParamsExchange : function (healthScore) {

			var obj = {};
		    obj.percent = null; obj.barColor = null;
		    obj.trackColor = null;

		if (67 <= healthScore && healthScore <= 100) {

			obj.percent = Math.round((healthScore - 66) / 34 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.greenColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.yellowColor;
		} else if (34 <= healthScore && healthScore <= 66) {
			obj.percent = Math.round((healthScore - 33) / 33 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.yellowColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.brownColor;
		} else if (0 <= healthScore &&  healthScore <= 33) {
			obj.percent = Math.round(healthScore / 33 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.brownColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.redColor;
		} else {
			obj.percent = 0;
			obj.barColor = laygoon.common.EasyPieChartColorGrade.greyColor
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.greyColor;
		}

		    return obj;
		},

		/**
		    * show easyPieChart
		    * @param $this
		    */

		showEasyPieChart : function ($this){


			var trackColor = $this.attr('data-trackColor');
			var size = parseInt($this.data('pie-size')) || 25;
	        var barColor = $this.attr('data-barColor');
	        var spanText = parseInt($this.attr('data-spanText'));
	        try {
	        $this.easyPieChart({
				easing: 'easeOutCirc',
				barColor : barColor,
				trackColor: trackColor,
				scaleColor : false,
				lineCap : 'butt',
				lineWidth : parseInt(size / 8.5),
				animate : 1500,
				rotate : -90,
				size : size,
				onStep : function(value) {
					var spanText = parseInt($this.attr('data-spanText'));
					this.$el.find('span').text(Math.round(spanText));
				  }
		    	});

	        }catch(e){
	        	console.log('The error is : ' +e);
	        }

      },

		/**
		    * init trsanction data
		    * @param    container
		    * @param    d
		    */

		initTransaction: function (container, d){
		   var transaction = {};
		   if (!d ||　!d.name) {
			   if (container == "AppResponse") {
			    	  transaction.type = 'Transaction';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = '';
			    	//Network Health = avg Traffic volumn / min
				    	//Average ? MB traffic per minute
			      } else if (container == "NetWork") {
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = '';
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else if (container == "Storage") {

			    	  transaction.type = 'Disk';
			    	  transaction.unit = 'IOPS';
			    	  transaction.data = '';
			    	  //Memory Health = avg memory usage / min
			    	 // Average ?% usage per minute

			      } else if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = '';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = '';
			      }
		   
		   }else {
		     var avgTypeSpecificStat = d.avgTypeSpecificStat;
		      //App Resp Time = avg num of Transactions / min
	 	      //Average ? transactions per minute
		     if(avgTypeSpecificStat){
		    	 if (container == "AppResponse") {
			    	  transaction.type = 'Transaction';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = this.packetExchange(d.avgTypeSpecificStat) +' ' +'per minute';
			    	//Network Health = avg Traffic volumn / min
				    	//Average ? MB traffic per minute
			      } else if (container == "NetWork") {
			    	  avgTypeSpecificStat = this.byteExchange(d.avgTypeSpecificStat / 60+"", 'b', 'auto');
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = avgTypeSpecificStat + "ps";
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else if (container == "Storage") {

			    	  transaction.type = 'Disk';
			    	  transaction.unit = 'IOPS';
			    	  transaction.data = avgTypeSpecificStat + " "+ 'per second';
			    	  //Memory Health = avg memory usage / min
			    	 // Average ?% usage per minute

			      } else if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = avgTypeSpecificStat / 100 +'%';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = avgTypeSpecificStat / 100 +'%';
			      }
		     }else{
		    	 if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = d.memUsagePct +'%';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      }else if (container == "NetWork") {
			    	  avgTypeSpecificStat =d.avgTypeSpecificStat?this.byteExchange(d.avgTypeSpecificStat / 60+"", 'b', 'auto'):'N/A';
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = avgTypeSpecificStat + " ps";
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = d.cpuUsagePct  +'%';
			      }
		     }
		      
         
		   }
		      
		      return  transaction;

		},

		setTimeRangeConfig: function(key, value) {
			localStorage.setItem(key, value);
	  },

	  /**
	    * format trsanction data
	    * @param    d
	    */
	  formatTransaction:  function (d){

		  return    this.packetExchange(d.avgTypeSpecificStat);
	   },

	   /**
	    * formatClassifierInfo
	    * @param    d
	    */
	  formatClassifierInfo: function(d) {
		  var arr = [];
		  var  array = d.classifierInfo;

			 for (var i=0; i<array.length; i++){

				 var obj = {};
				 var data = array[i];
				     obj.ServicesProvided = data.name;
				     obj.AppResTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + ' ms');
				     obj.AvgTransPerMin = this.formatTransaction(data);
				     obj.TranVolu = this.byteExchange(data.trafficVolum, 'b', 'auto');
				     obj.Packets = this.packetExchange(data.packets);
				     obj.grades = data.grades;

				  if(obj.grades.avgGrade != -1){
					  arr.push(obj);
				  }
			 }

	         return arr;
	   },
	   
	   /**
	    * formatClassifierInfo
	    * @param    d
	    */
	  formatChildInfo: function(d, d_child) {
		  var arr = [];
		  var  array = d.classifierInfo;

			 for (var i=0; i<array.length; i++){

				 if(array[i].name == d_child.name) {
					 var obj = {};
					 var data = array[i];
					     obj.ServicesProvided = data.name;
					     obj.AppResTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + 'ms');
					     obj.AvgTransPerMin = this.formatTransaction(data);
					     obj.TranVolu = this.byteExchange(data.trafficVolum, 'b', 'auto');
					     obj.Packets = this.packetExchange(data.packets);
					     obj.grades = data.grades;
	
					  if(obj.grades.avgGrade != -1){
						  arr.push(obj);
					  }
				 }
			 }

	         return arr;
	   },

	   /**
	    * formatClassifiers
	    * @param    d
	    */
	   formatClassifiers: function(d) {
		   var arr = [];
			  var  array = d.classifiers;

				 for (var i=0; i<array.length; i++){

					 var obj = {};
					 var data = array[i];
					     obj.name = data.name;
					     obj.appRespTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + ' ms');
					     obj.avgTransPerMinDisplay = this.packetExchange(data.avgTransPerMin);
					     obj.trafficVolumeDisplay = this.byteExchange(data.trafficVolume, 'b', 'auto');
					     obj.packetsDisplay = this.packetExchange(data.packets);
					     obj.grades = data.grades;

					     if(obj.grades.avgGrade != -1){
							  arr.push(obj);
						  }
				 }

				    return arr;


		   },

	  
		   /**
		    * formatClassifier
		    * @param    d
		    */
		   formatClassifierTopology: function(d) {
			   var arr = [];
				  var  array = d.classifier;

					 for (var i=0; i<array.length; i++){

						 var obj = {};
						 var data = array[i];
						     obj.name = data.name;
						     obj.appRespTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + 'ms');
						     obj.avgTransPerMin = this.formatTransaction(data);
						     obj.trafficVolume = this.byteExchange(data.trafficVolum, 'b', 'auto');
						     obj.packets = this.packetExchange(data.packets);
						     obj.grades = data.grades;

						  if(obj.grades.avgGrade != -1){
							  arr.push(obj);
						  }
					 }

			         return arr;
			   },
		   
		/**
		    * Dealing with grades  is  ready for dashboardFoot data.
		    * @param    container
		    * @param    d
		    */

		 getGrades: function (container, d){
			 if (!d ||　!d.name){
				  var   transaction = null, grades = {}; 
				    transaction = this.initTransaction(container, d);
				    grades.transaction = transaction;
				    /*grades.criticalRatio = ;
					grades.minorRatio = minorRatio;
					grades.majorRatio = majorRatio;
					grades.normalRatio = normalRatio;*/
				
			}else {
			    var easyPieData = {};
			  try {
				easyPieData = this.easyPieChartParamsExchange(d.grades.healthScore);
			} catch (e) {
				console.log('Roy');
			}
		    var gradeCriticalCount = d.grades.gradeCriticalCount,
				gradeMinorCount = d.grades.gradeMinorCount,
				gradeMajorCount = d.grades.gradeMajorCount,
				gradeNormalCount = d.grades.gradeNormalCount,
			    transaction =  this.initTransaction(container, d),
			    dataPercent = easyPieData.percent,
			    dataPieSize = 50,
			    dataSize = 55,
			    spanText = d.grades.healthScore == -1 ? 0:d.grades.healthScore,
			    trackColor = easyPieData.trackColor,
			    barColor = easyPieData.barColor;


			var totalCount = gradeCriticalCount + gradeMinorCount + gradeMajorCount
					+ gradeNormalCount;
			var criticalRatio = Math.round(gradeCriticalCount / totalCount * 100)
					+ "%";
			minorRatio = Math.round(gradeMinorCount / totalCount * 100) + "%";
			majorRatio = Math.round(gradeMajorCount / totalCount * 100) + "%";
			normalRatio = Math.round(gradeNormalCount / totalCount * 100) + "%";
			var grades = {};
			if(!d.isNoData){
				grades.gradeCriticalCount = gradeCriticalCount;
				grades.criticalRatio = criticalRatio;
				grades.gradeMinorCount = gradeMinorCount;
				grades.minorRatio = minorRatio;
				grades.gradeMajorCount = gradeMajorCount;
				grades.majorRatio = majorRatio;
				grades.gradeNormalCount = gradeNormalCount;
				grades.normalRatio = normalRatio;
			}
			/*grades.gradeCriticalCount = gradeCriticalCount;
			grades.criticalRatio = criticalRatio;
			grades.gradeMinorCount = gradeMinorCount;
			grades.minorRatio = minorRatio;
			grades.gradeMajorCount = gradeMajorCount;
			grades.majorRatio = majorRatio;
			grades.gradeNormalCount = gradeNormalCount;
			grades.normalRatio = normalRatio;*/
			grades.transaction = transaction;
			grades.dataPercent = dataPercent;
			grades.dataPieSize = dataPieSize;
			grades.dataSize = dataSize;
			grades.barColor = barColor;
			grades.trackColor = trackColor;
			grades.spanText = spanText;

	      }
			
			
			return grades;
    
	   },


	   setSession: function(key, value) {
			$.session.set(key, value);

		},

		getTimeRangeConfig: function(key) {
			return localStorage.getItem(key);
		},

		clearTimeRangeConfig: function(){
			localStorage.removeItem("start");
			localStorage.removeItem("end");
			localStorage.removeItem("startTime");
			localStorage.removeItem("endTime");
		},

		removeTimeRangeConfig: function(key){
			localStorage.removeItem(key);
		},

		/**
		 * nStr: The number to be formatted, as a string or number. No validation is done, so don't input a formatted number. If inD is something other than a period, then nStr must be passed in as a string.
		 * inD: The decimal character for the input, such as '.' for the number 100.2
		 * outD: The decimal character for the output, such as ',' for the number 100,2
		 * sep: The separator character for the output, such as ',' for the number 1,000.2
		 */
		addSeparatorsNF: function(nStr, inD, outD, sep){
			nStr += '';
			var dpos = nStr.indexOf(inD);
			var nStrEnd = '';
			if (dpos != -1) {
				nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
				nStr = nStr.substring(0, dpos);
			}
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(nStr)) {
				nStr = nStr.replace(rgx, '$1' + sep + '$2');
			}
			return nStr + nStrEnd;
		},
		// call following safeApply method instead of $apply
		safeApply: function(scope, fn) {
			  var phase = scope.$root && scope.$root.$$phase;
			  if(phase == '$apply' || phase == '$digest')
				  fn && scope.$eval(fn);
			  else
				  fn && scope.$apply(fn) || scope.$apply();
		},
		// do something until element is loaded
		// the max wait time is 200 * 25 = 5s;
		onElementReady: function(){
			var times = {},
				MAX_TIMES = 25,
				INTERVAL = 200;
			return function(selector, callback){
				times[selector] = times[selector] ? (times[selector] + 1) : 1 ;
				if(times[selector] > MAX_TIMES) {
					times[selector] = 0;
					console.log(["onElementReady exceed the max time", selector]);
					return;
				}
				var that = this;
				if($(selector).length == 0) {
					setTimeout(function(){
						that.onElementReady(selector, callback);
					}, INTERVAL);
					return;
				}
				times[selector] = 0;
				callback();
			}
		}(),
		
		onArrayIsNotNull: function(obj, callback){
			var that = this;
			if(!obj || obj == '') {
				setTimeout(function(){
					that.onArrayIsNotNull(obj, callback);
				}, 200);
				return;
			}
			callback();
		},
		
		emptyNode: function(parentNode){
			var l = parentNode.childNodes.length;
			for(var i = 0; i < l; i++) {
				parentNode.removeChild(parentNode.childNodes[0]);
			}
		},
        // get smartApp module.
        getSmartAppModule: function() {
        	 return angular.injector(['smartApp']);
        },    
        //get EasyPieChart Service
        getEasyPieChartService: function() {
        	return this.getSmartAppModule().get('easyPieChartService');
        },
        //control the jarviswidget-loader On Resource Browser Page
	  	controlJarvisWidgetLoader: function(param){
        	  var dis = param ? 'block' : 'none';
        	  $('#resourceBrowserWidget>header>.jarviswidget-loader').css('display', dis);
         },

		fnRenderLoadingIcon: function(selector, param){
			var display = param ? 'block' : 'none';
			$(selector + ">header>.jarviswidget-loader").css('display', display);
		},
         
        handleVicRepeater: function(vicRepeater, callback){
        	if($('#vicRepeatModal').css("display") != "none")
        		return true;
        	$('#vicRepeatModal').modal("show");
			$("#vicRepeatModal input:radio[name=vicAction]:checked" ).prop('checked', false);
			$("#vicRepeatModal .err-msg").hide();
			$("#vicRepeatModal .vicRepeatOKBtn").off("click").on("click", function(){
				var vicAction = $("#vicRepeatModal input:radio[name=vicAction]:checked" ).val();
				if(!vicAction) {
					$("#vicRepeatModal .err-msg").show();
					return;
				}
				$('#vicRepeatModal').modal("hide");
				vicRepeater.vicAction = vicAction;
				
				$.ajax({
			        type: "POST",
			        url: '/multiDC/action',
			        data: JSON.stringify(vicRepeater),
			        contentType: "application/json; charset=utf-8",
			        dataType: "json",
//			        traditional: true,
			        context: this,
			        success: function (data) {
			        	callback();
			            console.log("success");
			        },
			       error: function(){
			    	   callback();
			            console.log("success");
			       }
			    }); 
			});
         }
};

// shortCut
var sc = {};
sc.html = laygoon.common.getHtml;



$(document).ready(function(){
	laygoon.common.matrixContainerResize();
	laygoon.common.attachEvents();
	laygoon.common.setTimeRange();
	var isMobile = laygoon.helpers.isMobile;
	$.browser.device = {};
	$.browser.device.isMobile = (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
});

// Polyfill

// Object.assgin
if (typeof Object.assign != 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var output = Object(target);
	      for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (var nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  })();
}

(function($, window){//test

	var levels = {
		error: 0,
		debug: 1,
		log: 2,
		info: 3,
		action: 4
	}
	var oldConsole = window.console;
	var logLevel = null;//"error", "log", "debug", "info";	
	var currentView,
	watchStartTime = new Date().getTime(),
	recordNum = 0
	var lastTime;
	
//	getLogLevel();
	
	function showHistory(){
		var str = "",
		lastTime = watchStartTime;
//		var allHistory = getHistory();
		var allHistory = laygoon.common.history;
		for(var i = 0; i < allHistory.length; i++) {
			if(i == 0) {
				str += "[" + allHistory[i].view + "]";
			} else {
				var duration = (allHistory[i].timeStamp - lastTime);				
				str += " stay for " + formatTime(duration);
				str += "\n -> " + "[" + allHistory[i].view + "]";
			}
			lastTime = allHistory[i].timeStamp;
			if(allHistory[i].clickElements) {
				for(var j = 0; j < allHistory[i].clickElements.length; j++) {
					var duration = (allHistory[i].clickElements[j].timeStamp - lastTime);
					lastTime = allHistory[i].clickElements[j].timeStamp;
					var elHTML = allHistory[i].clickElements[j].el;
					if(elHTML.length > 500) {
						elHTML = elHTML.substr(0, 500) + "...";
					}
					str += "\n wait for " + formatTime(duration) + ", click on " + elHTML;
				}
			}
		}
		
		function formatTime(duration){
			return (duration < 60 * 1000 ? moment.duration(duration, "milliseconds").humanize(): moment.duration(duration, "milliseconds").as("minutes") + 'minutes');
		}
		return str;
	}
	
	$(function(){
		/*$(document.body).on("click", function(e){
			if(laygoon.common.history.length == 0) {
				console.log("history length is 0, return...")
				return;
			}
			if(!laygoon.common.history[laygoon.common.history.length - 1].clickElements) {
				laygoon.common.history[laygoon.common.history.length - 1].clickElements = [];
			}
			laygoon.common.history[laygoon.common.history.length - 1].clickElements.push({el: e.target.outerHTML, timeStamp: new Date().getTime()});
			recordNum ++;
		});*/
		/*$(document.body).on("viewLoaded", function(event, view){
			// if history is too much, put it into localstorage
			if(recordNum > 50) {
				storeHistoryInLocal();
				laygoon.common.history = []; // empty array.
			}
			laygoon.common.history.push({view: view, timeStamp: new Date().getTime()});
		});*/
//		localStorage.setItem("actionHistory", "");
		
		
	});
	
	function formatTime(duration){
		return (duration < 60 * 1000 ? moment.duration(duration, "milliseconds").humanize(): moment.duration(duration, "milliseconds").as("minutes") + 'minutes');
	}
	
	function recordHistory(eventType, content){
		var description = {};
		description["clickEvent"] = " click on ";
		description["viewChange"] = " go to ";
		
		var str = "";
		if(lastTime) {
			str += "wait for " + formatTime(new Date().getTime() - lastTime) + ",";
		}
		str += description[eventType] + content + "\n";
		saveLog("action", [str]);
		if(eventType == "viewChange") {
			lastTime = new Date().getTime();
		}
	}
	
	// combine history from local with js variable, return array
	function getHistory(){
		var oldHistoryStr = localStorage.getItem("actionHistory");
		if(!oldHistoryStr || oldHistoryStr == "") {
			var oldHistoryAry = [];
		} else {
			var oldHistoryAry = JSON.parse(oldHistoryStr);
		}
		
		console.log(["oldhistory", oldHistoryAry]);
		return oldHistoryAry.concat(laygoon.common.history);
	}
	
	function storeHistoryInLocal() {		
		
		var historyStr = JSON.stringify(getHistory());
		console.log(["store in local, hisstr", historyStr]);
		// the local storage for history should not exceed 3M
		if(historyStr.length >= 3 * 1024 * 1024) {
			// remove some pre history;
		} else {
			localStorage.setItem("actionHistory", historyStr);
		}
	}
	
	/*setTimeout(function(){
		laygoon.common.showHistory = showHistory;
	}, 2000);*/
	
	
	function getLogLevel(){
		$.ajax({
      	  url: '/getLogLevel' + '?timeStamp=' + new Date().getTime(),
   		  type: 'GET',
   		  timeout: 10000,
   		  success: function(result){
   			  try{
   				  logLevel = result.split(","); //["debug"]
   				  if(logLevel.length > 0) {
   					  logLevel = logLevel[0];
   					  catchLog();
   				  }
   				  
   				if(logLevel == "action") {
   					$(document.body).on("click", function(e){
   						recordHistory("clickEvent", e.target.outerHTML);
   					});
   					
   					$(document.body).on("viewLoaded", function(event, view){
   						recordHistory("viewChange", view);
   					});
   				}
   			  } catch(e) {
   				  logLevel = null;
   			  }
   		  }
       });		
	}
	
	function uilaLog(type){
		return function(){
			oldConsole[type].apply(oldConsole, arguments);
			if(logLevel == "action") {
				if(levels[0] >= levels[type] || type == "action") {
					saveLog(type, arguments);				
				}
				return;
			}
			if(levels[logLevel] >= levels[type]) {	    	
				saveLog(type, arguments);
			}
		};				
	};
	
	function saveLog(type, messages) {
		var str = ""
		
		try{
			for(var i = 0; i < messages.length; i++) {
				if(i > 0)
					str += ",";
		    	if(Object.prototype.toString.call(messages[i]) === "[object String]") {
		    		str += messages[i];
		    	} else {
		    		var cache = [];
		    		str += JSON.stringify(messages[i], function(key, value) {
		    		    if (typeof value === 'object' && value !== null) {
		    		        if (cache.indexOf(value) !== -1) {
		    		            // Circular reference found, discard key
		    		            return;
		    		        }
		    		        // Store value in our collection
		    		        cache.push(value);
		    		    }
		    		    return value;
		    		});
		    		cache = null; // Enable garbage collection
		    	}
			}
			
			str += "\n detail info: " + showHistory();
	    	
			$.ajax({
	        	  url: '/saveLog',
	     		  type: 'POST',
	     		  dataType: 'json',
	     		  timeout: 10000,
	     		  data:{
	     			  type: type,
	     			  message: str,
	     			  userAgent: $.browser.name + ", " + $.browser.fullVersion + ", webkit:" + $.browser.webkit,
	     			  currentView: currentView,
	     			  timeRange: JSON.stringify(getTimeRange())
	     		  },
	     		  success: function(result){
	     		  }
	         });
		} catch(e){
			oldConsole.log(e.message);
		}		
	}
	
	function getTimeRange(){
		function pInt(sessionValue) {
    		var result;
    		if(!sessionValue || sessionValue == "") {
    			result = undefined;
    		} else {
    			result = parseInt(sessionValue);
    		}
    		return result;
    	}
		
		var timeMode = laygoon.helpers.getTimeRangeConfig("timeMode");
		var timeOption = laygoon.helpers.getTimeRangeConfig("timeOption");
		var start = pInt(laygoon.helpers.getTimeRangeConfig("start"));
		var end = pInt(laygoon.helpers.getTimeRangeConfig("end"));
		var startTime = pInt(laygoon.helpers.getTimeRangeConfig("startTime"));
		var endTime = pInt(laygoon.helpers.getTimeRangeConfig("endTime"));
		
		return {timeMode: timeMode, timeOption: timeOption, start: start, end: end, startTime: startTime, endTime: endTime}
	}
	
	function catchLog(){
		window.console = {};
		for(var p in oldConsole) {
			switch(p){
				case "log":
					console[p] = uilaLog(p);
					break;
				case "info":
					console[p] = uilaLog(p);
					break;
				case "debug":
					console[p] = uilaLog(p);
					break;
				case "error":
					console[p] = uilaLog(p);
					break;
				default:
					console[p] = (function(prop){
						return function(){
							oldConsole[prop].apply(oldConsole);
						};
					})(p);
			}
			
		}
		window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
		    var msg = "Error: " + errorMessage + "\n"
		    		+ "Source file: " + scriptURI + "\n"
		    		+ "Line: " + lineNumber + "\n"
		    		+ "Column: " + columnNumber + "\n"
		    		+ "Stack: " + errorObj;
		    console.error(msg);
		 }
	}

	$(document.body).on("viewLoaded", function(event, view){
		currentView = view;
	});	
})(jQuery, window);