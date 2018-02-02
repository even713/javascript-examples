class BubbleChart {
    getLevels(){
        return {
            "Critical": {color: "rgb(219, 27, 27)", y: this.height / 6},
            "Major": {color: "rgb(255, 99, 33)", y: this.height / 3},
            "Minor": {color: "rgb(255, 208, 51)", y: this.height / 2},
            "Normal": {color: "rgb(123, 220, 42)", y: 2 * this.height / 3},
            "NoData": {color: "#ccc", y: 5 * this.height / 6}
        }
    }

    constructor(option, data){
        this.GRAVITY = option.gravity || 0.5;
        this.FRICTION = option.friction || 0.3;

        this.width = option.width || 600;
        this.height = option.height || 800;
        this.container = option.container;

        this.sourceData = data;

        if(this.container)
            this._create();
    }

    _create(){
        this._newWorker();

        this.svg = d3.select(this.container)
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height);
    }

    refresh(data){
        this.sourceData = data;
        this._postData();
    }

    w_updateData(newData){
        this.sourceData = newData;

        this.nodesData = this._createNodes(newData);

        var force = d3.layout.force()
            .size([this.width, this.height])
            .charge(this._charge)
            .gravity(this.GRAVITY)
            .friction(this.FRICTION);

        force.nodes(this.nodesData);

        force.start();

        // Run the layout a fixed number of times.
        let n = this.nodesData.length / 6;
        console.time("force");
        for (var i = n * n; i > 0; --i) force.tick();
        force.stop();
        console.timeEnd("force");
    }

    _newWorker(){
        this.worker = new Worker("bubbleChartWebwoker.js");

        this._postData();

        this.worker.onmessage = event => {
            switch (event.data.type) {
                case "end": return this.updateChart(event.data.nodesData);
            }
        }
    }

    _postData(){
        let postObj = Object.assign({}, this);
        // to avid webworker post error
        delete postObj._force;
        delete postObj.worker;
        delete postObj.svg;
        delete postObj._bubbles;

        this.worker.postMessage({
            chartConfig: postObj
        });
    }

    updateChart(nodesData){
        this._bubbles = this.svg.selectAll(".bubble")
            .data(nodesData);
        this._bubbles.exit()
            .remove();
        this._bubbles.enter()
            .append("circle");

        this._bubbles.attr("class", "bubble")
            .attr("fill", d => d.color)
            .attr("r", d => d.radius)
            .attr("cx", d => d.x)
            .attr("cy", d => d.y);
    }

    _createNodes(data){

        this._setRadiusScale(data);

        let nodes = data.map(function(d){
            let healthLevel = this._getHealthLevel(d.healthScore),
                healthLevelObj = this.getLevels()[healthLevel];
            //d.value = 300;
            return {
                name: d.name,
                value: d.value,
                radius: this._getRadiusScale()(d.value), // the circle size depends on
                level: healthLevel,
                x: Math.random() * this.width,
                y: healthLevelObj.y,
                color: healthLevelObj.color
            }
        }.bind(this));

        nodes.sort(function (a, b) { return b.value - a.value; });

        return nodes;
    }

    _charge(d){
        return -Math.pow(d.radius, 2.0) * 2.5;
    }

    _getRadiusScale(){
        if(!this._radiusScale)
        {
            this._radiusScale = d3.scale.pow()
                .exponent(0.5)
            //.range([0, Math.min(this.width, this.height) / 7]);
        }

        return this._radiusScale;
    }

    _setRadiusScale(data){
        let maxV = d3.max(data, function(d){return +d.value || 0;}),
            sumV = d3.sum(data, function(d){return +d.value || 0;}),
            domain = [0, maxV],
            maxRange = ((Math.min(this.width, this.height)/ 2) * Math.pow(maxV/sumV, 0.5)) + 1,
        // avg = Math.,
            ranges = [1, maxRange * 0.65];
        console.log("ranges", ranges);
        console.log("domain", domain);
        this._getRadiusScale()
            .range(ranges)
            .domain(domain);
    }

    _getHealthLevel(healthScore){
        let levels = d3.keys(this.getLevels());
        if(healthScore >= 0 && healthScore < 25) {
            return levels[0];
        } else if(healthScore >= 25 && healthScore < 50) {
            return levels[1];
        } else if(healthScore >= 50 && healthScore < 75) {
            return levels[2];
        } else if(healthScore >= 75 && healthScore <= 100) {
            return levels[3];
        } else {
            return levels[4];
        }
    }
}