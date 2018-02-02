
importScripts("/vendor/d3/d3.v35.js");
importScripts("BubbleChartClass.js");

onmessage = function(event) {
    var chartConfig = event.data.chartConfig;
    var chartInstance = new BubbleChart({
        width: chartConfig.width,
        height: chartConfig.height,
        gravity: chartConfig.gravity,
        friction: chartConfig.friction
    });

    chartInstance.w_updateData(chartConfig.sourceData);

    postMessage({type: "end", nodesData: chartInstance.nodesData});
};
