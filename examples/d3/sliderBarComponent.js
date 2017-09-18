	var sliderBarComponent = function(element, timeRangeValue, config) {
		config = config || {};
    	this.config = config;
    	this.start = timeRangeValue.start;
    	this.end = timeRangeValue.end;
    	this.startTime = timeRangeValue.startTime;
    	this.endTime = timeRangeValue.endTime;
    	this.element = element;
    	this.maxTimeRange = config.maxTimeRange || null;
    	this.labels = config.labels;
    	this.hasMouseOverTip = config.hasMouseOverTip == "true" ? true : false;
    	this.hasBrush = config.hasBrush == "false" ? false: true;
    	
    	this.initalize();    	
    	
    	if(config.tooltipTemplate && config.tooltipCallBackFn) {
    		this.addHover(d3.select(this.element[0]).select('.brush'));
    	}
	}
	
	sliderBarComponent.prototype = {
			
		maxTimeRange: null,
				
		_initalize: function(){
			this.layout(this.element)
			.then(function(){
				return this.addLabels(this.element, this.labels||[]);
			}.bind(this))
			.then(function(){
				this.drawSliderBar(this.element);
				this.element.on("resize", function(event){
					this.responsive();
				}.bind(this));
				if(this.hasMouseOverTip) 
					this.addEventForMouseMove();				
				console.log(performance.now() - gT1);
				// uilaFastdom.mutate(function(){
				// 	this.drawSliderBar(this.element);
				// }, this)
				// .then(function(){
				// 	this.element.on("resize", function(event){
				// 		this.responsive();
				// 	}.bind(this));
				// 	if(this.hasMouseOverTip) 
				// 		this.addEventForMouseMove();
				// }.bind(this));
								
			}.bind(this));

		},

		initalize: function(){
			uilaFastdom.measure(function(){
				this.svgWidth = this.element.width();
				var margin = this.config.margin;
				this.height = this.config.sliderHeight - margin.top - margin.bottom;

				this.firstLayout(this.element).then(function(){
					// calc the width of sliderbar and transform the text groups to most right
					this.labelGBBox = {width: 0};
					try {
						// firefox cannot getBBox when labelG has no label inside it.
						this.labelGBBox = this.labelG.node().getBBox();
					} catch(e) {
						
					}

					return this.adjustLayoutSize();
				}.bind(this)).then(function(){

					this.drawSliderBar(this.element);
					
					this.element.on("resize", function(event){
						this.responsive();
					}.bind(this));

					if(this.hasMouseOverTip) 
						this.addEventForMouseMove();
				}.bind(this));

				uilaFastdom.mutate(function(){
					// for bar chart:
					this.chartSvg = this._svg.append("g").attr("class", "chart")
						.attr("height", this.height);
					
					// for highlighter layer
					this.highlighterLayer = this._svg.append("g").attr("class", "high-lighter");
					
					// for x axis
					// create x axis as g element. 
					this.xAxis = this._svg.append("g")
						.attr("class", "x axis");
				}, this);
			}, this);

		},
		
		firstLayout: function(container){
			if(!container || !container.length) {
				console.error("no proper container for sliderbar");
				return;
			}
			var margin = this.config.margin;
			var canvasHeight = this.config.sliderHeight;

			return uilaFastdom.mutate(function(){		
				// create canvas
				this._canvas = d3.select(container[0]).append("svg")
					.attr("width", this.svgWidth)
					.attr("height", canvasHeight);
				
				var rootG = this._canvas
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				this._svg = rootG;

				this.labelG = rootG.append("g").attr("class", "labels");

				this.addLabels(this.element, this.labels||[]);

			}, this);
		},

		layout: function(container){
			if(!container || !container.length) {
				console.error("no proper container for sliderbar");
				return;
			}
			var margin = this.config.margin;
			var canvasHeight = this.config.sliderHeight;

			return uilaFastdom.measure(function(){
				var canvasWidth = container.width();
				this.height = this.config.sliderHeight - margin.top - margin.bottom;

				return uilaFastdom.mutate(function(){		
					// create canvas
					this._canvas = d3.select(container[0]).append("svg")
						.attr("width", canvasWidth)
						.attr("height", canvasHeight);
					
					var rootG = this._canvas
						.append("g")
						.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					this._svg = rootG;
					
					// for bar chart:
					this.chartSvg = rootG.append("g").attr("class", "chart")
						.attr("height", this.height);
					
					// for highlighter layer
					this.highlighterLayer = rootG.append("g").attr("class", "high-lighter");
					
					// for x axis
					// create x axis as g element. 
					this.xAxis = rootG.append("g")
						.attr("class", "x axis");
					
					this.labelG = rootG.append("g").attr("class", "labels");
				}, this);

			}, this);
		},
		
	    _invertX: function( mouseX ) {
	    	var inputX  = null;
	        try {
	        	inputX =  this.xS.invert(mouseX);
	          }catch(e){
	        	 //console.log(e);
	        }
	    	if (inputX){
	    		
	    		// if mouse is out of range, return -1
	    	  return ( inputX < this.start ) ? -1 :
		          ( inputX > this.end ) ? -1 :
		        inputX;
	    	  }
	    	
	    	},
	    
		drawSliderBar: function(container){
			if(!this.width) {
				console.error("cannot draw sliderbar without undefined width");
				return;
			}
			//setup X axis
			// var x = d3.time.scale()
			// 	.domain([this.start, this.end])
			// 	.range([0, this.width]);
			// this.xS = x;
			//setup Y axis
			this.y = d3.scale.linear().range([this.height, 0]);
			
			// for x axis
			// set scale and set scale label on the bottom of x axis
			// this.xAxis
			// 	.attr("transform", "translate(0," + this.height + ")")
			// 	.call(d3.svg.axis().scale(x).orient("bottom"));	
			
			if(!this.startTime && !this.endTime) {
				this.startTime = this.start;
				this.endTime = this.start + 1;
			 }
			if(this.hasBrush)
				this.drawBrush(this.xS); 
		},
		
		updateY: function(maxY){
			if(maxY)
				this.y.domain([0, maxY]);
		},

		updateMouseMoveEvent: function(hasMouseOverTip){
			if(hasMouseOverTip != this.hasMouseOverTip) {
				if(hasMouseOverTip) 
					this.addEventForMouseMove();
				else {
					this.removeEventForMouseMove();
				}
			}
			this.hasMouseOverTip = hasMouseOverTip;
		},
		removeEventForMouseMove: function(){
			this.hideTooltip();
			var container = d3.select(this.element[0]).select('.brush');
			container
		      .on( "mouseover.tooltip", null)
		      .on( "mousemove.tooltip", null)
		      .on( "mouseout.tooltip", null);			
		},
		addEventForMouseMove: function(){
			var that = this;
			var container = d3.select(this.element[0]).select('.brush');
						
			var mousemove = function() {
				if(that.status == "loading")
					return;
				
				 var mousePos = d3.mouse(container[0][0])[0];
				var xValue = that._invertX(mousePos);
				if(!xValue)
					return;
				
				var xTime = xValue.getTime ? xValue.getTime() : xValue;
				var roundTimeValue = Math.floor(xTime/60000) * 60000;
				//console.log(roundTimeValue);
				// mouse is out of left range, don't show tooltip
				if(xValue == -1 || roundTimeValue > that.end) {
					return;
				}
								
				that.showTooltip("mouse-over");

				// see api: https://github.com/mbostock/d3/wiki/Selections#d3_mouse
 				var relY = d3.mouse(that.chartSvg[0][0])[1];

				$(that.element).trigger("mouseoverSliderbar", [roundTimeValue, that.height, relY]);
			};
						
			var mouseleave = function(){
				that.hideTooltip();
			};
			
			// hover layer
			container
		      .on( "mouseover.tooltip", mousemove )
		      .on( "mousemove.tooltip", mousemove )
		      .on( "mouseout.tooltip", mouseleave );			
		},
		
		addHover: function(container){
			if(!this.config.tooltipTemplate || this.config.tooltipTemplate == "") {
				//console.debug("tooltip must have a template");
				return;
			}
			var collectDataFn = this.config.tooltipCallBackFn || function(datetime){
				return {datetime: datetime};
			};
			
			var that = this;
			var mouseTag = false;
			container.classed("hover-layer");
						
			var mousemove = function(d, flag) {
			    if (flag == 'show-hight-lighter'){
			    	showHightLighter(d);// Manually Trigger hightLight
			    	return;
			    }	
				
				mouseTag = true;
				 var mousePos = d3.mouse(container[0][0])[0];
				 hightLighter.classed("hide", false)
				.attr( "transform", "translate(" + mousePos + "," + 0 + ")" );
				var xValue = that._invertX(mousePos);
				if(!xValue)
					return;
				
				var xTime = xValue.getTime ? xValue.getTime() : xValue;
				//xTime -= 30 * 1000; // make it so that time is calc from point of timestamp
				var roundTimeValue = Math.floor(xTime/60000) * 60000;
				//console.log(roundTimeValue);
				// mouse is out of left range, don't show tooltip
				if(xValue == -1 || roundTimeValue > that.end) {
					hightLighter.classed("hide", true);
					return;
				}
				
				var data = collectDataFn(roundTimeValue);
				that.hightLighterToolTip.showPopover(container, data, d3.event);
				$(that.element).trigger("sliderbarTimeChange", [roundTimeValue]);
			};
			
			var mouseover = function(){
				mouseTag = true;
			}
			
			var mouseleave = function(){
				mouseTag = false;
				setTimeout(function(){
					if(mouseTag == false) {
						hightLighter.classed("hide", true);
					}
				}, 500);
			};
			
			// hover layer
		      container
		      .on( "mousemove.hoverLayer", mousemove )
		      .on( "mouseout.hoverLayer", mouseleave );
		    
		    
		    var showHightLighter = function(timeStamp){
		      var mousePos = that.xS(timeStamp);
		      hightLighter.classed("hide", false)
				.attr( "transform", "translate(" + mousePos + "," + 0 + ")" );
		    }
		      
		      // hightlighter
		    var hightLighter = this.highlighterLayer.append( "line" )
		      .attr( "class", "line-hover hide" )
		      .attr( "x1", 0 )
		      .attr( "y1", 0 )
		      .attr( "x2", 0 )
		      .attr( "y2", this.height)
		      .attr( "height", 2 )
		      .attr( "height", this.height)
		      .on( "mouseout", mouseleave )
		      .on( "mouseover.hoverLayer", mouseover );
		   	    
		    this.hightLighterToolTip = new laygoon.widgets.ToolTips(null, {templateSelector: this.config.tooltipTemplate, element: ".hover-layer", priority:1, triggerEvent: 'mousemove.tooltip' });
		    this.hightLighterToolTip.disableEvent = true; // make it trigger manually.
		    this.hightLighterToolTip.stopProp = true;
		    this.hightLighterToolTip.bind(container);
		},		
		
		showTooltip: function(eventType, text){
			text = text || "";
			this.tooltipDiv.transition()		
        	.duration(200)		
        	.style("opacity", .9);
			
			var event = d3.event.sourceEvent || d3.event;
			var winWidth = $(window).width(),
				tooltipWidth = $(this.tooltipDiv[0]).width();
			var left = event.pageX;
			if(winWidth*0.9 - left < tooltipWidth) {
				left -= tooltipWidth + 40;
			}
			
			this.mouseOverTip.style("display", "none");
			this.mouseMoveTip.style("display", "none");
			if(eventType == "mouse-over") {
				this.mouseOverTip
					.style("display", "block");
				if(!!text)
					this.mouseOverTip.html(text);
			} else if(eventType == "mouse-move") {
				this.mouseMoveTip
					.style("display", "block");
				if(!!text)
					this.mouseMoveTip.html(text);
				
			} else {
				// no event type match
			}
			
			this.tooltipDiv
        	.style("left", left + "px")		
           	.style("top", (event.pageY - $(window).scrollTop() - 32) + "px");
		},
		hideTooltip: function(){
			this.tooltipDiv.transition()		
        	.duration(500)		
        	.style("opacity", 0);
		},
		_backgroudstart: function(){
				var eventTarget = d3.event.target;
				//console.log(eventTarget.classList[0]);
				var e = d3.event.sourceEvent || d3.event;
				if ( e && e.stopPropagation )
					e.stopPropagation(); 
				else
					window.event.cancelBubble = true;
				return false;
		},
		_brushmove: function() {
				var that = this;

				var s = brush.extent();
				
				var start = s[0] && (s[0].getTime ? s[0].getTime() : s[0]),
				end = s[1] && (s[1].getTime ? s[1].getTime() : s[1]);
				
				start = that.roundTime(start);
				end = that.roundTime(end);
				if (end == start) {
					end = start + 60 * 1000;
				}
				end -= 1;				
	            
	            var fromStr = jq.localizedata.currentLocaleData.from;
	            var toStr = jq.localizedata.currentLocaleData.to;
	            
				var timeFormatter = d3.time.format("%x %H:%M");
				that.tooltipDiv.style("text-align", "right");
                that.showTooltip("mouse-move", fromStr + ": " + timeFormatter(new Date(start)) + "<br/>" + toStr + ": "  + timeFormatter(new Date(end)));						
		},		
		_brushend: function() {	
			var that = this;
				that.hideTooltip();
	            
				var s = brush.extent();
				if(!s || s.length <= 1) {
					return;
				}
				var start = s[0] && (s[0].getTime ? s[0].getTime() : s[0]),
					end = s[1] && (s[1].getTime ? s[1].getTime() : s[1])
				// should not exceed the max time range.
				if(that.maxTimeRange && (that.maxTimeRange < (end - start))) {
					if(that.endTime == end) {
						that.startTime = that.endTime - that.maxTimeRange;
					} else if(that.startTime == start){
						that.endTime = that.startTime + that.maxTimeRange;
					} else {
						that.startTime = start;
						that.endTime = end;						
					}
				} else {
					that.startTime = start;
					that.endTime = end;
				}

				//if (angular.isDate(that.startTime) && angular.isDate(s[1])) {
					//e.g. if you move brush to 3:34 p.m. the startTime actually is 15:34:00 and the endTime is 15:34:59
					// if you move brush start equal to end, will change end to xx:xx:59 so that it has the smallest time range - 1 minute.
					that.startTime = that.roundTime(that.startTime);
					that.endTime = that.roundTime(that.endTime);
					if (that.endTime == that.startTime) {
						that.endTime = that.startTime + 60 * 1000;
					}
					that.endTime -= 1;
				//}
				
				that.refreshTimeRange(null, null, that.startTime, that.endTime); // update brush ui.
				$(that.element).trigger("brushRangeChange", [that.startTime, that.endTime]);		
		},		
		drawBrush: function(x){
			var brush = d3.svg.brush()
			.x(x)
			//.extent([this.config.startDate, this.config.endDate])	//select init x range
			.extent([this.startTime, this.endTime]) //select init x range
			.on("brush", this._brushmove.bind(this))
			.on("brushend", this._brushend.bind(this));
			
			// Initialize the brush component
			var slider = this._svg.append("g")
				.attr("class", "brush")
				.call(brush);

			slider.selectAll(".background")
			.on("mousedown.brush", this._backgroudstart.bind(this))
			.on("touchstart.brush", this._backgroudstart.bind(this));

			var that = this,
				height = (that.config.sliderHeight - that.config.margin.top - that.config.margin.bottom);
			// Set pretty resize handles
			slider.selectAll(".resize").append("path").attr("d", function(d) {
				var e = +(d == "e"),
				x = e ? 1 : -1,
				y = height / 3;
				return "M" + (.5 * x) + "," + y
					+ "A6,6 0 0 " + e + " " + (6.5 * x) + "," + (y + 6)
					+ "V" + (2 * y - 6)
					+ "A6,6 0 0 " + e + " " + (.5 * x) + "," + (2 * y)
					+ "Z"
					+ "M" + (2.5 * x) + "," + (y + 8)
					+ "V" + (2 * y - 8)
					+ "M" + (4.5 * x) + "," + (y + 8)
					+ "V" + (2 * y - 8);				
			});

			// Set the brush viewing rect
			slider.selectAll("rect")
				.attr("height", height);
			
			// Define the div for the tooltip
			this.tooltipDiv = d3.select(this.element[0]).append("div")	
			    .attr("class", "tooltip")				
			    .style("opacity", 0);
			
			this.mouseOverTip = this.tooltipDiv.append("div")
				.attr("class", "mouse-over");
			
			this.mouseMoveTip = this.tooltipDiv.append("div")
				.attr("class", "mouse-move");


			this.brush = brush;

			this.setBrushRange(this.startTime, this.endTime, this.xS);
			return slider;
		},
		
		roundTime: function(time){
			time = parseInt(time);
			var t = time % 60000;
			var dt;
			if (t >= 30000) {
				dt = 60000 - t;
			} else { 
				dt = 0 - t;
			}
			var r = time + dt;
			return r;
		},
		
		setBrushRange: function(startTime, endTime, x) {
			if(!this.hasBrush)
				return;
			
			if (x) {
				this.brush.x(x);
			}
			this.brush.extent([startTime, endTime]);
			this._svg.select(".brush").call(this.brush);
		},
		
		_eventFn: function(){
			d3.event.preventDefault();
			d3.event.stopPropagation();
			return false;
		},
		
		wait: function(){
			// Initialize wait layer
			this.status = "loading";
			var brush = this._svg.selectAll(".brush");
			brush.classed("loading", true);
			var width = brush.selectAll(".background").attr("width"),
				height = brush.selectAll(".background").attr("height");
			var waitLayer = brush.insert("rect", "g.resize.e")
				.attr("class", "wait-layer")
				.attr("width", width)
				.attr("height", height);

			waitLayer.on("mousemove", this._eventFn)
					 .on("mouseup", this._eventFn)
				     .on("mousedown", this._eventFn)
				     .on("drag", this._eventFn);
			
			var resizers = brush.selectAll(".resize");
			resizers.on("mousemove", this._eventFn)
			 .on("mouseup", this._eventFn)
		     .on("mousedown", this._eventFn)
		     .on("drag", this._eventFn);			
		},
		
		cancelWait: function(){
			this.status = "loaded";
			var brush = this._svg.selectAll(".brush");
			brush.classed("loading", false);
			brush.selectAll("rect.wait-layer").remove();
			var resizers = brush.selectAll(".resize");
			resizers.on("mousemove", null)
			 .on("mouseup", null)
		     .on("mousedown", null)
		     .on("drag", null);
		},
		
		destroy: function(){
			// remove event listeners
			if(this.hasBrush)
				this.brush.on("brush", null).on("brushend", null);
				
			this._svg.selectAll(".background").on("mousedown.brush", null).on("touchstart.brush", null);
			this.element.off("resize");
			if(this.hasMouseOverTip) 
				this.removeEventForMouseMove();
			//this.hightLighterToolTip && this.hightLighterToolTip.unbindAll();
		},
		
		redrawX: function() {
			
		  /*var str = $(this._svg.node().parentNode.parentNode).attr('class').toString();
		  if (str.indexOf('root-cause-toolbar') != -1){
			   return;
		  }*/
		  
			this.xAxis.html("");// clear the selection
			
			//setup X axis
			var axisScale = d3.time.scale()
				.domain([this.start, this.end])
				.range([0, this.width]);

			//Create the Axis
			var x = d3.svg.axis()
                   .scale(axisScale)
                   .orient("bottom");		
			
			this.xAxis
			.attr("transform", "translate(0," + this.height + ")")
			.call(x);

		    this.xS = axisScale;
			return  x;
		},
		
		refreshTimeRange: function(start, end, startTime, endTime) {
			
			this.start = start || this.start;
			this.end = end || this.end;
			this.startTime = startTime || this.startTime;
			this.endTime = endTime || this.endTime;
			this.redrawX(this.width);
			this.setBrushRange(startTime, endTime, this.xS);
		},
		 
		addLabels: function(container, labels) {
			var that = this;
			var numOfRow = labels.length || 1,
				cellHeight = this.height / numOfRow;
			var dayLabels = this.labelG.selectAll(".errorLabel")
			.data(labels);
			dayLabels.exit().remove();
			dayLabels.enter().append("text");
			dayLabels.text(function (d) { return d; })
			.attr("text-key", function (d) { return d; })
			.attr("class", "errorLabel text-localize")
			.attr("y", function (d, i) { return i * cellHeight; })
			.style("font-size", "1.1em");
			//.attr("transform", "translate(-6," + cellHeight / 1.5 + ")");	
			
			//return this.adjustLayoutSize();
		},
		
		updateLabels: function(labels){
			this.labels = labels || [];
			this.addLabels(this.element, this.labels);
		},
		
		adjustLayoutSize: function(){
			var container = this.element;
			var lableMarginLeft = 10;
			this.width = this.svgWidth - this.config.margin.left - this.labelGBBox.width - this.config.margin.right - lableMarginLeft;
			var ml = this.svgWidth - this.config.margin.left - this.labelGBBox.width - this.config.margin.right;	
			
			return uilaFastdom.mutate(function(){
				this.labelG.attr("transform", "translate("+ ml +", 12)");
				this.chartSvg.attr("width", this.width);
				this._canvas.attr("width", this.svgWidth);
				this.redrawX(this.width);
				
				if(this.brush) {
					this.setBrushRange(this.startTime, this.endTime, this.xS);
				}
			}, this);

		},
						
		removeLabels: function(){
			this._svg.selectAll(".errorLabel").remove();
		},
		
		responsive: function(){
			//console.log("sliderbar responsive")
			return this.adjustLayoutSize();
		}
		
	}