var laygoon = {
	common: {
		pauseResizeEvent: false
	}
}

/*
 * SMART RESIZER
 * Source: https://github.com/louisremi/jquery-smartresize
 * 
 * example to use:
 * $('#debouncedhits').onresize(this.resizeHandler, this);
 * $('#debouncedhits').offresize(this.resizeHandler);
 */

{
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
			resizeEvents.push({fn: fn, context: context, el: elem, fnIdentification: type});
			//console.log(["onresize", $(this).attr("class"), $(this).attr("id")]);
		},
		offresize: function(fn) {
			var es = resizeEvents;
			for (var i = 0; i < es.length; i ++) {
				var selector = es[i].el.selector;
				if(!selector || selector === this.selector || selector === "**" && this.selector) {
					var r;
					if(this.length == 0 && selector == this.selector) {
						// in case offresize after remove element
						r = es.splice(i, 1);
						i --; // the length of array is reduced 1
					} else
					if(es[i].el[0] == this[0]) {
						r = es.splice(i, 1);
						i --; // the length of array is reduced 1
					} else if(fn && (fn && es[i].fn === fn)) {
					// when user pass fn and el or user doesn't pass fn
						r = es.splice(i, 1);
						i --; // the length of array is reduced 1
						//console.log(["offresize", this.selector, $(this).attr("class"), $(this).attr("id")]);
					} else 	
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

	var resizeEvents = [];

	var resizeHandler = function() {
		//console.log("resize")
		// If we don't wan't to trigger resize event, we can set this flag.
		if(laygoon.common.pauseResizeEvent) {
			setTimeout(function(){
				laygoon.common.pauseResizeEvent = false;
			}, 3000);
			return;
		}
		var es = resizeEvents;
		// check if there any bootstrap/angularui modal is being shown
		var modals = $("div.modal.ng-isolate-scope.in, div.modal.fade.ng-scope.in");
		// pick the modal with highest z-index.
		var showingModal,
			zIndex = 0;
		modals.each(function(){
			var zidx = parseInt($(this).css("zIndex"));
			if(zidx > zIndex) {
				zIndex = zidx;
				showingModal = this;
			}
		});
		
		for(var i = 0; i < es.length; i++) {
			if(es[i].el.length > 0) {
				var elem = es[i].el;
				if(showingModal) {
					// If there's any modal being shown, check if element is within the modal, if not, no need to resize
					if(!$(showingModal).find(elem).length) {
						//console.log(["no need to resize", elem]);
						continue;
					}
				}
				if(es[i].fn) {
	                var width, height;                
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
					//console.log([elem, "resizes"]);
				} else {
					//console.log("The handler is not defined when resize");
				}
			}
			else {
				//console.log(["the element is not exist when resize", es[i].fn, es[i].el, es[i].context]);
			}
		}
	};

	$(window).bind("debouncedresize", resizeHandler);

	laygoon.common.getResizeEvents = function(){
		return resizeEvents;
	}
}
