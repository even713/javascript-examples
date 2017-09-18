var colorArray = ["#DDDDDD","#7BDC2A","#FFD033","#FF6321","#DB1B1B"];
var backgroundArray = ["#DDDDDD", "#A9D96C", "#FCEB00", "#EE8802", "#FF6C60"];
	var stackMatrixChart = function(element, data, size) {
		this.element = d3.select(element[0]);
		this.data = data || [];
		this.width = size.width;
		this.height = size.height;
		
		this.initialize(this.element);
	}
	
	stackMatrixChart.prototype = {
		
		initialize: function(element) {
			this.drawChart(element);					
		},
		
		drawChart: function(svgEl) {
					
			if(svgEl[0][0].childNodes.length == 0) {					
				//console.log("Draw matrix tool bar...");
				//draw the grid background
				svgEl.append("rect")
					.attr("class", "grid-background")
					.attr("width", this.width)
					.attr("height", this.height);
				
			} else {				
				svgEl.select('rect.grid-background').attr('width', this.width).attr('height', this.height);			
			}
			uilaFastdom.mutate(function(){
				this.updateData(svgEl, this.width, this.height);
			}, this);
			
		},
		
		updateData: function(svg, width, height){
			//var t1 = new Date().getTime();
			var backgroudArray = backgroundArray;
			//var colorArray = laygoon.common.colorArray;
			
			var numOfColumn = this.data.numOfColumn,
				numOfRow = this.data.yLabels && this.data.yLabels.length || this.data.numOfRow,
				numOfItem = this.data.numOfVM || this.data.numOfItem || 0;
			this.numOfRow = numOfRow;
			var	cellWidth = width / numOfColumn,
				cellHeight = height / numOfRow;	
			
			var heatMapCT = svg.selectAll("rect.ct")
			.data(this.data.timeSeries);
			
			// remove
			heatMapCT.exit().each(function(){
				var parent = this.parentNode,
				bg = this.previousSibling;
			    if (parent) {
			    	parent.removeChild(this);
			    	parent.removeChild(bg);
			    }
			});
			
			var enters = heatMapCT.enter(),
				isNew = false;
			if(enters[0] && enters[0].length) {
				var parentNode = enters[0].parentNode,
					namespace = parentNode.namespaceURI,
					update = heatMapCT[0],
					fragment = document.createDocumentFragment();
				isNew = enters[0].update.length && enters[0].update[0] == undefined;
				
				for(var i = 0, e = enters[0], l = enters[0].length; i < l; i++) {
					if(!enters[0][i])
						continue;
					
					var bg = document.createElementNS(namespace, "rect");
					bg.setAttributeNS(null, "class", "bg");
					bg.setAttributeNS(null, "height", cellHeight);
					fragment.appendChild(bg);
					
					var ct = document.createElementNS(namespace, "rect");
					ct.setAttributeNS(null, "class", "ct");
					fragment.appendChild(ct);
					
					bg.__data__ = ct.__data__ = e[i].__data__;
					
					if(isNew)
						updateStyle(ct, bg, e[i].__data__);
					else
						update[i] = ct;
				}
				parentNode.appendChild(fragment);
			}
			
			if(!isNew) {
				//console.log("it's an update");
				// reduce repaint and reflow, visibility only inscrease 2 repaint and 0 reflow.
				svg.style("visibility", "hidden");
				heatMapCT.each(function(d, i){				
					updateStyle(this, this.previousSibling, d);
				});
				svg.style("visibility", "visible");
			}
			
			function updateStyle(ct, bg, d){
				ct.style.fill = colorArray[d.g];
				ct.setAttributeNS(null, "width", cellWidth);
				ct.setAttributeNS(null, "height", function(d){
					if(numOfItem == 0)
						return 0;
					return (d.v/numOfItem) * cellHeight;
				}(d));
				ct.setAttributeNS(null, "y", function(d){
					if(numOfItem == 0)
						return d.row * cellHeight + cellHeight;
					return d.row * cellHeight + ((numOfItem - d.v)/numOfItem) * cellHeight;
				}(d));
				ct.setAttributeNS(null, "x", d.col * cellWidth);

				bg.__data__ = d;
				bg.style.fill = backgroudArray[d.g];
				bg.setAttributeNS(null, "y", d.row * cellHeight);
				bg.setAttributeNS(null, "width", cellWidth);
				bg.setAttributeNS(null, "x", d.col * cellWidth);
			}
												
			//console.log("new method cost time: " + (new Date().getTime() - t1));
		},
				
		changeSize: function(size){
			this.width = size.width;
			this.height = size.height;
			
			var numOfColumn = this.data.numOfColumn;
			var numOfRow = this.numOfRow;
			var cellWidth = this.width / numOfColumn;
			var cellHeight  = this.height / numOfRow;
			//update rect grid-background
			this.element.select('rect.grid-background').attr('width', this.width).attr('height', this.height);
			//update rect date
			this.element.selectAll('rect.bg, rect.ct')
				.attr("x", function(d) { 
					return d.col * cellWidth;
				})
				.attr("width", cellWidth);
		},
		
		refreshChart: function(data) {
			this.data = data || [];
			this.drawChart(this.element);	
			
		},
		
		destroy: function() {
			this.element.selectAll("*").remove();
			
			this.data = [];
			//console.log('destroy stack matrix bar');
		}
	   
	}