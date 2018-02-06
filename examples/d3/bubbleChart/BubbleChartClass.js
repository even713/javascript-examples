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

        this.maxTickTime = 60;

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
            .friction(this.FRICTION)
            .on("tick", this._tick.bind(this));

        force.nodes(this.nodesData);

        force.start();

        // Run the layout a fixed number of times.
        let n = this.nodesData.length / 6;
        n = Math.max(n, this.maxTickTime);
       // n = 30;
        console.time("force");
        for (var i = n * n; i > 0; --i) force.tick();
        force.stop();
        console.timeEnd("force");
    }

    _newWorker(){
        this.worker = new Worker("bubbleChartWebworker.js");

        this._postData();

        this.worker.onmessage = event => {
            this.nodesData = event.data.nodesData;
            switch (event.data.type) {
                case "update":
                    this._updateChart(event.data.nodesData);
                case "resize":
                    this.changeSize(event.data.nodesData)
            }
        }
    }

    _postData(eventType){
        let postObj = Object.assign({}, this);
        // to avid webworker post error
        delete postObj._force;
        delete postObj.worker;
        delete postObj.svg;
        delete postObj._groups;

        this.worker.postMessage({
            chartConfig: postObj,
            eventType: eventType || "update"
        });
    }

    _tick(e) {
        var q = d3.geom.quadtree(this.nodesData),
            i = 0,
            n = this.nodesData.length;

        while (++i < n) q.visit(this._collide(this.nodesData[i]));
    }

    _collide(node){
        let padding = 0;
        var r = node.radius + padding,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.x -= x *= l;
                    node.y -= y *= l;
                    quad.point.x += x;
                    quad.point.y += y;
                }
            }
            return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
        };
    }

    _updateChart(nodesData){
        this.nodesData = nodesData;
        this._groups = this.svg.selectAll(".bubble-group")
            .data(nodesData);
        this._groups.exit().remove();
        this._groups.enter()
            .append("g")
            .append("circle")
            .attr("class", "bubble");

        console.log("transform groups num", this._groups[0].length);
        this._groups.attr("class", "bubble-group")
        .attr("transform", d => "translate("+ (d.x) +", "+ (d.y) +")");

        this._groups.select(".bubble")
            .attr("fill", d => d.color)
            .attr("r", d => d.radius);

        console.timeEnd("createChart")
    }

    resizeChart(width, height){
        this.width = width;
        this.height = height;

        this._postData("resize");
    }

    changeSize(nodesData){
        this.nodesData = nodesData;

        this.svg
            .attr("width", this.width)
            .attr("height", this.height);

        this._groups = this.svg.selectAll(".bubble-group")
                        .data(nodesData)
                        .attr("transform", d => "translate("+ (d.x) +", "+ (d.y) +")");

        this._groups.select(".bubble")
            .attr("r", d => d.radius);
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

    destroy(){


        this.worker.terminate();
        this.worker = null;
    }
}