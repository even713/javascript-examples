angular.module("myApp").factory("ToolTips", ['$compile', '$timeout', '$templateRequest', '$rootScope',
	function($compile, $timeout, $templateRequest, $rootScope){
	/**
	 * A widget to show tooltip as table view on given element
	 *
	 * @param template the template container id
	 * @param config
	 */
	var ToolTips = function(template, config) {
		this.template = template;
		this.config = {
			callback: typeof(config.callback)==="function" ? config.callback : function(){},
			callback4Restore: typeof(config.callback4Restore)==="function" ? config.callback4Restore : function(){},
			context: typeof(config.context)!=="undefined" ? config.context : this,
			placement: typeof(config.placement)!=="undefined" ? config.placement : "mousePosition",
			formatData: typeof(config.formatData)==="function" ? config.formatData : function(d){var o={}; $.extend(o,d); return o;},
			triggerEvent: typeof(config.triggerEvent)!=="undefined" ? config.triggerEvent : "mouseover",
			element: config.element,
			priority: config.priority,
			templateUrl: config.templateUrl,
			templateSelector: config.templateSelector,
			bShowParent: config.bShowParent || false,
			titleHandler: typeof(config.titleHandler)==="boolean" ? config.titleHandler : null
		};
		if (this.config.placement == "mousePosition") {
			var that = this;
			this.config.placement = function (tip, element){
				that.getPlacement(tip, element);
			};
		}
		ToolTips.instances.push({ins: this, priority: this.config.priority});
		this.attachEvents();
		this.popOverTargets = []; // store the element that are binded with popover
		this.beClickedNode = null;
	};

	ToolTips.instances = [];//{ins: object}

	ToolTips.prototype = {
		currentEl: null, // the current element that with popover div.
		//popOverTargets: [], // store the element that are binded with popover
		///template: null,	// template that used to show tableview
		timer: null, // the timer for distinguish click from dblclick
		popoverEl: null,
		showing: false, // if the instance is showing popover
		destroy: function(){
			ToolTips.instances = ToolTips.instances.filter(tooltip => tooltip.ins != this);
			this.unbindAll();
			this.tableViewString = null;
			this.templateScope && this.templateScope.$destroy();
			this.templateScope = null;
			if(this.hidePopoverWhenClickOtherHanlder) {
				//console.log("remove events for " + this.config.triggerEvent);
				$(document.body).off(this.config.triggerEvent, this.hidePopoverWhenClickOtherHanlder);
			}
		},
		getPlacement: function(tip, element){
			this.popoverEl = tip;
		},
		/**
		 * Bind element to show tooltip when given eventType is trigger
		 * @param el {d3 element} the element that will show popover
		 */
		bind: function(el) {
			var that = this;
			el.on(that.config.triggerEvent, function(d) {
				if (d3.event.defaultPrevented) return;
				if (that.disableEvent) return;

				var targetEl = this, event = d3.event;
				event.stopPropagation();
				if (event &&　event.type == 'mouseover') that.showPopover(targetEl, d, event);
				else {
					// To avoid trigger click event when user dblclick on the node, delay to show popover 300 milliseconds.
					if (that.timer) {
						clearTimeout(that.timer);
						that.timer = null;
					}
					that.timer = setTimeout(function() {
						that.beClickedNode = d;
						that.showPopover(targetEl, d, event);
					}, 300);
				}
			});
			this.popOverTargets.push(el);
		},
		showPopover: function(el, d, event){
			var that = this;
			//console.debug(["current", that.config.priority, ToolTips.instances])
			for(var i = 0; i < ToolTips.instances.length; i++){
				//console.debug(["showing", ToolTips.instances[i].ins.showing, Math.random()])
				if(ToolTips.instances[i].ins.showing) {
					//console.debug(ToolTips.instances[i].ins.config.priority)
					if (ToolTips.instances[i].ins.config.priority < that.config.priority) return;
					else ToolTips.instances[i].ins.hidePopover();
				}
			}
			that.getTemplateContent(el, d, function(){
				that.handlePopover(el, d, event);
			}, event);

// 			if (that.config.triggerEvent == 'click') {
// 				var $targetPopover = $(that.popoverEl);
// 				var dragOpt = {
// 					handle: 'h3.popover-title',
// 					cursor: 'move',
// 					scroll: true,
// 					start: function(event, ui) {
// 						$(this).data("startingScrollTop", window.pageYOffset);
// 					},
// 					drag: function(event, ui) {
// 						var st = parseInt($(this).data("startingScrollTop"));
// 						ui.position.top -= st;
// 					}
// 				}
// 				$targetPopover.draggable(dragOpt);
// 			}
			//if the config params exists callback, do it
			if (that.config.callback) {
				var params = [];
				params.push(d);
				params.push(that.config.context);
				that.config.callback.apply(that.config.context, params);
			}
			that.resetTooltipsPlacement(event);//reset tooltips placement

			// to show tooltips for full-screen
			//if ($('#jarviswidget-fullscreen-mode').get(0)){
			//	var resetZ_Index = $('#jarviswidget-fullscreen-mode').css('z-index');
			//	$('.popover').css('z-index', resetZ_Index + 1);
			//}
		},

		getTemplateContent: function(el, d, callback, event){
			var that = this;
			if (!d) return;//modified
			if(that.config.templateSelector) {
				var templateNodeScope = angular.element(that.config.templateSelector).scope();
				if (!templateNodeScope) return;
				var data = that.config.bShowParent ? that.config.formatData(d.parent, d) : that.config.formatData(d);
				if(data && data.classifiers){
					$.each(data.classifiers,function(n,value){
						value.avgTransPerMinDisplay = laygoon.helpers.packetExchange(value.avgTransPerMin);
						value.trafficVolumeDisplay = laygoon.helpers.byteExchange(value.trafficVolume, 'b', 'auto');
						value.packetsDisplay = laygoon.helpers.packetExchange(value.packets);
					});
				}
				if (data && data.memActive) data.memActiveDisplay = laygoon.helpers.byteExchange(data.memActive, 'b', 'auto');
				templateNodeScope.d = data;
				templateNodeScope.$apply();
				that.ppId = that.getUniqueId();
				that.tableViewString = "<div id='"+ that.ppId +"'></div>";
				if (callback) callback();

				// although we destroy the old popover, but it needs some millseconds to destroy, so we may append the template a bit latter to avoid duplicate content.
				var duplicateTemplate = 0;
				var t;
				var doAppendChild = function(){
					clearTimeout(t);
					t = null;
					if (duplicateTemplate > 5) {
						//console.debug("Error, please ensure the selector of template is unique in application");
						return;
					}
					if($(that.config.templateSelector).length > 1) {
						duplicateTemplate ++
						t = setTimeout(doAppendChild, 300);
					} else {
						$("#"+ that.ppId +"").empty();
						$("#"+ that.ppId +"").append($(that.config.templateSelector).clone(true));
					}
				}
				doAppendChild();
			}
			else if(that.template) {
				that.tableViewString = that.template(d);
				if (callback) callback();
			} else if(that.config.templateUrl) {
				if(!that.templateScope) {
					that.createTemplateScope(el, d, callback, event);
				} else {
					that.updateTemplate(d, callback, event);
				}

			}
		},

		updateTemplate(d, callback, event){
			const data = this.config.bShowParent ? this.config.formatData(d.parent, d) : this.config.formatData(d);
			this.templateScope.d = data;
			laygoon.helpers.safeApply(this.templateScope);
			if (callback) callback();
			this.resetTooltipsPlacement(event);
		},

		createTemplateScope(el, d, callback, event){
			$templateRequest(this.config.templateUrl).then(contents => {
				this.templateScope = $rootScope.$new();
				const data = this.config.bShowParent ? this.config.formatData(d.parent, d) : this.config.formatData(d);
				this.templateScope.d = data;
				this.tableViewString = $compile(contents)(this.templateScope);
				$timeout(()=>{
					if (callback) callback();
					this.resetTooltipsPlacement(event);
				});
			});
		},

		getUniqueId: function(){
			return "tip-id-" + Math.ceil((Math.random()*(100-0)+0));
		},
		/**
		 * Show popover on current element
		 * @param el {htmlElement}
		 * @param d {jsonObject} to replace template to tableview html string.
		 * @param event {event}
		 */
		handlePopover: function(el, d, event) {
			var isAPI = false;
			if (event && this.stopProp) event.stopPropagation();
			var target = $(el);
      //if (this.currentEl && target !== this.currentEl) this.hidePopover();

      if(!target.data('bs.popover')) {
			var lang = {};//modified
			var popoverConfig = {
				placement: this.config.placement,
				content: this.tableViewString, //html String
				html: true,
				trigger: 'manual',
				animation: false,
				container: 'body'
			};
			// if(this.config.titleHandler &&  typeof this.config.titleHandler == "function") popoverConfig.title = this.config.titleHandler(d);
			// else if (d && d.name) {
			// 	var name = this.config.bShowParent ? d.parent.name : d.name;
			// 	var title = name;
			// 	if  (d.capacityData) {
			// 		var numCores = d.capacityData.cpuCores < 0 ? "N/A" : d.capacityData.cpuCores;
			// 		var cpuCap = d.capacityData.cpuCapacity < 0 ? "N/A" : d.capacityData.cpuCapacity;
			// 		var memCap = d.capacityData.memCapacity < 0 ? "N/A" : d.capacityData.memCapacity;
			// 		if (isAPI!=true) title = name + " (CPU: " + numCores + " x " + cpuCap + " GHz Memory: " + memCap + " GB)";
			// 		else title = name;
			// 	}
			// 	if (title.length > 100) title = title.substr(0, 100) + "<br />" + title.substr(100);
			// 	var titleHover = "<span><i class='fa fa-comment' style='margin-right: 5px;'></i></span><span>" + title + "</span>";
			// 	var titleClick = "<span><i class='fa fa-comment' style='margin-right: 5px;'></i></span><span>" + title + "</span>" +
			// 					"<a href='javascript:void(0)' rel='tooltip' data-placement='bottom' data-original-title='"+ lang.GT_Close +"' class='pull-right close'><i class='fa fa-times'></i></a>";
			// 	if (this.config.triggerEvent == 'click') popoverConfig.title = titleClick;
			// 	else popoverConfig.title = titleHover;
			// }
			   target.popover(popoverConfig);
 			   this.currentEl = target;
      } else {
        // console.log("update tooltip");
        let popover = target.data('bs.popover');
        popover.options.content = this.tableViewString;
      }
			target.popover('show');
			this.showing = true;
      this.currentEl = target;
      this.tableViewString = null;
		},
		/**
		 * Hide popover on current element
		 * @param el {htmlElement}
		 */
		hidePopover: function() {
			if (!this.currentEl || this.currentEl.length == 0) return;
			else {
        if(this.showing == true) {
          //d3.select(this.currentEl[0]).on("mouseover", null);
          this.currentEl.popover('hide');
  				//this.currentEl.popover('destroy');
  				// fix bootstrap bug: https://github.com/twbs/bootstrap/issues/10740
  				// var tooltips = $('.tooltip, .popover[role=tooltip]');
  				// if (tooltips && tooltips.length) {
  				// 	tooltips.each(function(idx, element){
  				// 		if ($(element).attr("class").indexOf("tooltip") > -1 && $(element).attr("class") != "tooltip") {
  				// 			// console.log("other tooltip", do nothing);
  				// 		}
  				// 		else {
  				// 			console.log("remove", $(element).attr("class"))
  				// 			$(element).remove();
  				// 		}
  				// 	});
  				// }
  				this.showing = false;
  				//this.currentEl = null;
  				//this.popoverEl = null;
        }
			}
			if (this.config.callback4Restore) {
				var params = [];
				params.push(this.config.context);
				this.config.callback4Restore.apply(this.config.context, params);
			}
		},
		resetTooltipsPlacement: function(event){
      return;
			if(!this.popoverEl)
				return;

			var self = this;
			var e = event || window.event;
			var mouse_x = e.clientX;
			var mouse_y = e.clientY;
			/*
			var dom_width = $(window).width();//window 视窗的可见高度
			var domOffsetHight = $(window).height();
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var distance_x = dom_width - mouse_x;
			var distance_y = domOffsetHight - mouse_y;
			var top = 0, left = 0;
			var tootips_width = $(self.popoverEl).width();
			var tootips_height = $(self.popoverEl).height();
			left = (distance_x > (tootips_width + 5)) ? mouse_x + 5  : mouse_x - tootips_width - 5;
			top = (distance_y > (tootips_height + 5)) ? mouse_y + 5 : mouse_y - tootips_height - 5;
			$(self.popoverEl).css("top", top + scrollY  + "px").css("left", left + scrollX  + "px");
			*/
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var winSize = self._findDimensions();
			var tootipsWidth = $(self.popoverEl).width();
			var tootipsHeight = $(self.popoverEl).height();
			var delta = 15;
			var left = mouse_x > winSize.winWidth - mouse_x ? (mouse_x - tootipsWidth - delta) : mouse_x + delta;
			var top = mouse_y > winSize.winHeight - mouse_y ? (mouse_y - tootipsHeight) : mouse_y;
			//console.debug(["mouse_y", mouse_y, "clientHeight", winSize.winHeight, "clientWidth", winSize.winWidth]);
			$(self.popoverEl).css("top", top + scrollY  + "px").css("left", left + scrollX  + "px");
		},
		_findDimensions: function()
		{
      let winWidth, winHeight;
			if (window.innerWidth) winWidth = window.innerWidth;
			else if ((document.body) && (document.body.clientWidth)) winWidth = document.body.clientWidth;
			if (window.innerHeight) winHeight = window.innerHeight;
			else if ((document.body) && (document.body.clientHeight)) winHeight = document.body.clientHeight;
			if (document.documentElement  && document.documentElement.clientHeight && document.documentElement.clientWidth)
			{
				winHeight = document.documentElement.clientHeight;
				winWidth = document.documentElement.clientWidth;
			}
			return {winWidth: winWidth, winHeight: winHeight};
		},
		// Attach events if any
		attachEvents: function() {
			//console.log("attachEvents", this.hidePopoverWhenClickOtherHanlder);
			this.hidePopoverWhenClickOtherHanlder = this._hidePopoverWhenClickOther.bind(this);
			$(document.body).on(this.config.triggerEvent, this.hidePopoverWhenClickOtherHanlder);
		},
		// Hide popover when user click on other place.
		_hidePopoverWhenClickOther: function(event){
			if(this.showing == false)
				return;
			// console.log(this.config.triggerEvent + " body hide popover")
			// console.log(this.tableViewString);
			var tagName = $(event.target).context.tagName.toLocaleLowerCase();
			var tableTdClass=$(event.target).attr("class");
			if(tagName != "td"&&tableTdClass!=="text-overflow"){
				this.hidePopover();
			}
		},
		// Unbind all popovers
		unbindAll: function() {
			this.hidePopover();
			if (this.timer) {
				// If there's popover task, cancel it.
				clearTimeout(this.timer);
				this.timer = null;
			}
			var el = this.popOverTargets.pop();
			while(el) {
        // for(let i = 0; i < el[0].length; i ++) {
        //   if($(el[0][i]).attr("has-tooltip"))
        //     $(el[0][i]).popover('destroy');
        //   else {
        //     console.log("no need to destroy tooltip since it never shown");
        //   }
        // }
        // el.attr("has-tooltip", null);
				el.on(this.config.triggerEvent, null);
				el = this.popOverTargets.pop();
			}
			this.showing = false;
		},
		updatePopOver: function(d){
			var that = this;
			if (!d) {
				that.hidePopover();
				return;
			}

			if (that.config.triggerEvent == 'click' && that.popoverEl) {
				var $template = angular.element('.tooltip-templates').find(that.config.templateSelector);
				var currentPopOverScope = $template.scope();
				var data = that.config.bShowParent ? that.config.formatData(d.parent, d) : that.config.formatData(d);
				if (data && data.classifiers) {
					$.each(data.classifiers,function(n,value){
						value.avgTransPerMinDisplay = laygoon.helpers.packetExchange(value.avgTransPerMin);
						value.trafficVolumeDisplay = laygoon.helpers.byteExchange(value.trafficVolume, 'b', 'auto');
						value.packetsDisplay = laygoon.helpers.packetExchange(value.packets);
					});
				}
				if (data && data.memActive) data.memActiveDisplay = laygoon.helpers.byteExchange(data.memActive, 'b', 'auto');
				currentPopOverScope.d = data;
				laygoon.helpers.safeApply(currentPopOverScope);
				$("#"+ that.ppId +"").empty();
				$("#"+ that.ppId +"").append($template.clone(true));
				//if the config params exists callback, do it
				if (that.config.callback) {
					var params = [];
					params.push(d);
					params.push(that.config.context);
					that.config.callback.apply(that.config.context, params);
				}
			}
		}
	}
	// laygoon.widgets.ToolTips = ToolTips;

	return ToolTips;
}]);
