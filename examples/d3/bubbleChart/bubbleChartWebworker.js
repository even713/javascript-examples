
importScripts("/vendor/d3/d3.v35.js");
importScripts("BubbleChartClass.js");

onmessage = function(event) {
    var chartConfig = event.data.chartConfig,
        eventType = event.data.eventType;
    var chartInstance = new BubbleChartClass({
        width: chartConfig.width,
        height: chartConfig.height,
        gravity: chartConfig.GRAVITY,
        friction: chartConfig.FRICTION
    });

    chartInstance.w_updateData(chartConfig.sourceData);

    postMessage({type: eventType, nodesData: chartInstance.nodesData});
};
