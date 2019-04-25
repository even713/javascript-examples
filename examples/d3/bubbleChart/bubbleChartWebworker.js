
importScripts("/vendor/d3/d3.v35.js");
importScripts("BubbleChartClass.js");

onmessage = function(event) {
    let t1 = Date.now();
    var chartConfig = event.data.chartConfig,
        eventType = event.data.eventType;
    var chartInstance = new BubbleChartClass({
        width: chartConfig.width,
        height: chartConfig.height,
        gravity: chartConfig.GRAVITY,
        friction: chartConfig.FRICTION,
        logger: chartConfig.container
    });
    chartInstance.timeList.push(t1); // t5: worker receive message from UI

    chartInstance.w_updateData(chartConfig.sourceData);
    chartInstance.timeList.push(Date.now()) // t8: start to postMessage
    postMessage({type: eventType, nodesData: chartInstance.nodesData, timeList: chartInstance.timeList});
};
// when destroy, onmessage destroy and remove tick on event
// try on tick several time and see performance