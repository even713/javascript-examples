class BubbleChartClass {
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
                    this.updateChart(event.data.nodesData);
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


    // To be override
    updateChart(nodesData){
        this._createGroups(nodesData)
            .append("circle")
            .attr("class", "bubble");

        this._groups.select(".bubble")
            .attr("fill", d => d.color)
            .attr("r", d => d.radius);
    }

    _createGroups(nodesData){
        this.nodesData = nodesData;
        this._groups = this.svg.selectAll(".bubble-group")
            .data(nodesData);
        this._groups.exit().remove();

        let newGroups = this._groups.enter()
            .append("g");

        this._groups.attr("class", "bubble-group")
            .attr("transform", d => "translate("+ (d.x) +", "+ (d.y) +")");

        return newGroups;
    }

    resizeChart(width, height){
        this.width = width;
        this.height = height;

        this._postData("resize");
    }

    // To be override
    changeSize(nodesData){
        this._changeSize(nodesData);

        this._groups.select(".bubble")
            .attr("r", d => d.radius);
    }

    _changeSize(nodesData){
        this.nodesData = nodesData;

        this.svg
            .attr("width", this.width)
            .attr("height", this.height);

        this._groups = this.svg.selectAll(".bubble-group")
            .data(nodesData)
            .attr("transform", d => "translate("+ (d.x) +", "+ (d.y) +")");
    }

    _createNodes(data){
        this._setRadiusScale(data);

        let colorArray = d3.map(data, function(d) { return d.color; }),
            colorSize = colorArray.size();

        let colorCenterMap = {}, i = 0;
        colorArray.forEach(color => {
            colorCenterMap[color] = {y: (i + 1) * this.height/colorSize};
            i ++;
        });

        let nodes = data.map(function(d){
            return {
                name: d.name,
                value: d.value,
                radius: this._getRadiusScale()(d.value),
                x: Math.random() * this.width,
                y: colorCenterMap[d.color].y,
                color: d.color
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
                .exponent(0.5);
            // k = (R2 - R1) / (Math.pow(D2, 0.5) - Math.pow(D1, 0.5))
            // R = k * Math.pow(D, 0.5)
        }

        return this._radiusScale;
    }

    _setRadiusScale(data){
        let R1 = 1, // indicates Range1, the min Radius pixcel should be larger than 1
            R2, // indicates Range2, the max Radius could a circle be, to be calculated
            D1 = 0, // min data can be 0
            D2 = d3.max(data, function(d){return +d.value || 0;}), // the max value among the data list
            sumV = d3.sum(data, function(d){return +d.value || 0;}),
            domain = [D1, D2];
            //ranges = [0, maxV],
            //maxRange = ((Math.min(this.width, this.height)/ 2) * Math.pow(maxV/sumV, 0.5)) + 1,
            //maxRange = Math.min(this.width, this.height) / (1 * Math.pow(sumV, 0.5)) + 1,
            //R2 = 2 * Math.pow(maxV * sumV, 0.5)/Math.min(this.width, this.height) + 1,
        //R2 = ((Math.min(this.width, this.height)/ 2) * Math.pow(D2/sumV, 0.5)) + 1;
        //R2 = ((Math.min(this.width, this.height)/ 4) * Math.pow(Math.PI * D2/sumV, 0.5));
        //R2 = Math.pow(Math.min(this.width, this.height) * D2/(8 * sumV), 0.5) + 1;
        R2 = ((Math.min(this.width, this.height) / 3) * Math.pow(D2/sumV, 0.5)) + 1
        //R2 = 58.92707251507495;
        //R2 = 13.5;
        // avg = Math.,
        let ranges = [R1, R2];
            //domain = [1, maxDomain];
        console.log("ranges", ranges);
        console.log("domain", domain);
        console.log("D2", D2, "sum", sumV);
        this._getRadiusScale()
            .range(ranges)
            .domain(domain);
    }

    destroy(){
        this.worker.terminate();
        this.worker = null;
    }
}