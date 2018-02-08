class BubbleChartWithPieClass extends BubbleChartClass {
    updateChart(nodesData){
        this._createGroups(nodesData);

        let pieLayout = d3.layout.pie()
            .value(d => d.value); // pieLayout: used to generate data for piechart, it includes startAngle etc.

        let arc = d3.svg.arc()
                    .innerRadius(0)
                    .outerRadius(d => d.data.radius); // generate the path for each piece of pie

        // each group(<g></g>) will have one or more ".arcs" to be a pie
        let arcs = this._groups.selectAll(".arcs")
                .data(wholeData => {
                    return pieLayout(wholeData.pieData.map(d => {
                                        d.radius = wholeData.radius;
                                        return d;
                    }));
                });

        arcs.exit().remove();
        arcs.enter().append("g")
                    .attr("class", "arcs")
                    .append("path")
                    .attr("class", "bubble-pie");

        // note arcs is group, use "select" instead of selectAll to make data inherited
        // <g class='arcs'>
        //      <path class='bubble-pie'></path>
        // </g>
        arcs.select(".bubble-pie")
                .attr("d", arc)
                .attr("fill", function(d, i){
                    return d.data.color ? d.data.color : "#fff";
                })
    }
}