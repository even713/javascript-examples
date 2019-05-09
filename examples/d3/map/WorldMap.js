class WorldMap {
    constructor(...param){
      this.scale = 1;
      this.translate = [0, 0];
      
      this.create(...param);
    }

    create(container, width, height) {
      this.zoom = d3.behavior.zoom()
              .scaleExtent([0.5, 5])
              .on("zoom", () => {
                  this.mapGElement
                    .attr("transform", "translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
              });

      this.mapGElement = d3.select(container).append("svg")
        .attr("width", width)
        .attr("height", height)
        .call(this.zoom)
          .append("g")
          .attr("class", "map-group");

      this.markersGElement = d3.select(container).select("svg")
                                              .append("g")
                                              .attr("class", "marker-group");

      this.projection = d3.geo.mercator()
      .translate([2 * width/3, height])
      .scale(250)

      d3.json("worldData.json", (error, world) => {
          this.drawChart(world);
      })
    }

    drawChart(world){
      let data = topojson.feature(world, world.objects.subunits).features;
      const path = d3.geo.path().projection(this.projection);
      const graticule = d3.geo.graticule();
      this.mapGElement.selectAll(".country")
          .data(data)
          .enter().append("path")
          .attr("class", "country")
          .attr("d", path)
          .style('fill', function(d){
            if(d.id == "USA")
              return 'rgb(0, 153, 51)';
          })
          .on("click", function (d, idx) {
                            console.log(d, idx);
                        });

      this.mapGElement.append("path")
          .datum(graticule)
          .attr("class", "graticule")
          .attr("d", path);
    }

    updateMakers(data) {
      if(!data)
        return;
    //data is an array witch contains longitude, latitude, count, tooltip info
    const g = this.markersGElement.selectAll(".marker")
        .data(data);
    g.exit().remove();
    const newNodes = g.enter().append("g")
        .attr("class", "marker")
        .on("click", (d) => {
            tip.hide();
            this.handleMarkerClick(d);
        });

    const tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-5, 0])
        .html(function(d) {
            return d.tooltipInfo;
        });

    if(data.length)
        g.call(tip);

    newNodes.append("image")
        .attr("x", -27)
        .attr("y", -28)
        .on("mouseover", tip.show)
        .on("mouseout", tip.hide);

    newNodes.append("text")
        .attr("x", 0)
        .attr("y", 0)
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "middle");

    const group = this.markersGElement.selectAll(".marker")
        .attr("transform", (d) => {
            const coords = this.projection([d.longitude, d.latitude]);
            return "translate("+ this.scale * coords[0] +", "+ this.scale * coords[1] +")";
        });

    group.select("image")
        .attr("width", "54px")
        .attr("height", "54px")
        .attr("xlink:href", "s2.svg");

    group.select("text")
        .text(function(d){
            return d.text;
        });

    }
}
