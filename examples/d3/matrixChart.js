var colorArray = ["#DDDDDD","#7BDC2A","#FFD033","#FF6321","#DB1B1B"];
	var matrixChart = function(element, data, size) {
		this.element = d3.select(element[0]);
		this.data = data;
		this.chartContainer = this.element;
		this.width = size.width;
		this.height = size.height;
		
		this.initialze();
	}
	
	matrixChart.prototype = {			
		initialze: function() {
			this.drawChart(this.element);					
		},
		
		drawChart: function(svgEl) {
			//console.log("draw matrix chart");
			var that = this;
			
			if(svgEl[0][0].childNodes.length == 0) {		
				//draw the grid background
				svgEl.append("rect")
					.attr("class", "grid-background")
					.attr("width", this.width)
					.attr("height", this.height);			
			} else {				
				svgEl.select('rect.grid-background').attr('width', this.width).attr('height', this.height);				
			}
			this.updateData(svgEl, this.width, this.height);			 
		},
		
		updateData: function(svg, width, height){
			if(!this.data.numOfColumn || ! this.data.yLabels) {
				console.error("wrong data format for matrix")
				return;
			}
			//var colorArray = laygoon.common.colorArray;
			// create rect with class "date" for num of data length and position each rect.
			var numOfColumn = this.data.numOfColumn,
				numOfRow = this.data.yLabels && this.data.yLabels.length;
			this.numOfRow = numOfRow;
			this.numOfColumn = numOfColumn;
			var	cellWidth = width / numOfColumn,
				cellHeight = height / numOfRow;	
			var heatMap = svg.selectAll(".date")
			.data(this.data.timeSeries);
			heatMap.exit().remove();
			heatMap.enter().append("rect").attr("class", "date");
			heatMap.style("fill", function(d) {return colorArray[d.g]; });
			heatMap.attr("width", cellWidth);
			heatMap.attr("height", cellHeight);	
			heatMap.attr("x", function(d) { 
				return d.col * cellWidth; 
				});
			heatMap.attr("y", function(d) { return d.row * cellHeight; });
		},
		
		changeSize: function(size) {
			//console.log("change matrix size");
			this.width = size.width;
			this.height = size.height;
			
			var cellWidth = this.width / this.numOfColumn;
			var cellHeight  = this.height / this.numOfRow;
			//update rect grid-background
			this.element.select('rect.grid-background').attr('width', this.width).attr('height', this.height);
			//update rect date
			this.element.selectAll('rect.date')
			   .attr("x", function(d){
				  // //console.log(cellWidth);
				   return d.col * cellWidth;})
			   .attr("y", function(d){ return d.row * cellHeight; })
			   .attr("width", cellWidth)
			   .attr("height", cellHeight);
		},
		
		refreshChart: function(data) {		
			this.data = data;
			this.drawChart(this.element);		
		},
		
		destroy: function() {			
			this.element.selectAll("*").remove();
			
			this.data = [];
			//console.log('destroy-martrux');
		}
	   
	}