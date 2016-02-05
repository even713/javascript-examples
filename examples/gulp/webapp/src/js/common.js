// namespace
laygoon = {};
laygoon.version = versionNum;//get version Num from gloable varible in index.html.
laygoon.language="en";
laygoon.pages = {};
laygoon.pages.appTopology = {};
laygoon.pages.flowAnalysis = {};
laygoon.pages.vimGuide = {};
laygoon.widgets = {};
laygoon.localize={};
laygoon.common = {
		history: [],
		vmNetWorkDefs:[],
		NetWorkDefs:[],
		vmMemoryDefs:[],
		MemoryDefs:[],
		vmCPUDefs:[],
		CPUDefs:[],
		ApplicationPerformanceDefs:[],
		StorageDefs:[],
		hostStorageDefs:[],
		noDataCenter: false,
	 // the common color for matrixbar/areachart in rootcause
		colorArray: ["#DDDDDD","#7BDC2A","#FFD033","#FF6321","#DB1B1B"],
		
		backgroundArray: ["#DDDDDD", "#A9D96C", "#FCEB00", "#EE8802", "#FF6C60"],
		
		resizeEvents: [],
		
		pauseResizeEvent: false,

		chartTypes: {
    		dashboard: "matrix",
    		appTopology: "matrix",
    		flowAnalysis: "areaChart",
    		cpuUsage: "matrix",
    		memoryUsage: "matrix",
    		storageUsage: "matrix",
    		resourceBrowser: "matrix",
    		netConversation: "matrix",
    		criticalResources: "stackMatrix"
    	},
    	copyObject:function(obj){
    		var copyDataObj = new Object();
    		if(obj != undefined) {
	        	var copyDataStr = '';
	        	try{
	        		copyDataStr = JSON.stringify(obj);
	        		copyDataObj = JSON.parse(copyDataStr);  
	        	} catch(e) {
	        		console.log([e.message, obj]);
	        	}
    		} else {
    			copyDataObj = undefined;
    		}
        	return copyDataObj;
       },
		// render with version number
		getHtml: function(url){
			return function(){
				return url + "?v=" + laygoon.version;
			}
		},
		
		getUuidJsUrl: function(jsUrl){
			return function(){
                 return jsUrl + "&" + laygoon.uuid;                				
			}
		},
		
		getUniqueUrlTimeStamp: function(url){
			return function(){
                return url + "?timeStamp=" + new Date().getTime();                				
			}
		},
		
		getPackUuid: function(str) {
            return str + laygoon.uuid;			
		},
		//easyPieChart Color Constants
		EasyPieChartColorGrade : {
			greenColor : "#7BDC2A",  //green
			yellowColor : "#FFD033", //yellow
			brownColor : "#FF6321",  //orange
			redColor : "#DB1B1B", //red
			greyColor : "#DDDDDD"
		},
		//datatable setting
	  dataTableSettings:{
				"paging": false,
				"filter": false,
				"scrollY": 700,
				"order": [[ 0, "desc" ]],
				"breakpoints":{
					breakpoints:[
					            { name: 'desktop', width: Infinity },
					            { name: 'tablet',  width: 1024 },
					            { name: 'fablet',  width: 768 },
					            { name: 'phone',   width: 480 }
					        ]
				},
			    "fullScreen":false
		},
		nameColumn:{
			"data": "name",
			"render": function (data, type, row, meta) {
				var name = data;
        		if (type === 'display') {
        			return "<div class='text-overflow'>" + name + "</div>";
        		}
        		return name;
        	},
        	className: "text-align-left ",
        	"width": "10%",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 0
		},
		/* table column config start*/
		healthColumn:{
			"data": "grades.healthScore",
			"render": function (data, type, row, meta) {
				var health = data;
        		if (type === 'display') {
        			return (health == -1) ? 'N/A' : (health + '');
        		}
        		return health;
        	},
        	"width": "6%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 1
		},
		artColumn:{
			"data": "appRespTime",
			"render": function (data, type, row, meta) {
				var ART = data;
        		if (type === 'display') {
        			return (ART == -1) ? 'N/A' : (ART + ' ms');
        		}
        		return ART;
        	},
        	"width": "6%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 2
		},
		transactionsColumn:{
			"data": "avgTypeSpecificStat",
			"render": function (data, type, row, meta) {
				var transactions = data;
        		var data=laygoon.helpers.packetExchange(transactions+"");
        		if (type === 'display') {
        			return data;
        		}
        		return transactions;
        		
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		trafficColumn:{
			"data": "trafficVolum",
			"render": function (data, type, row, meta) {
				var traffic = data;
        		if (type === 'display') {
        			if(traffic==0){
        				return traffic;
        			}else{
        				return laygoon.helpers.byteExchange(traffic, 'b', 'auto');
        			}
	        		
        		}
        		return traffic;
        	},
        	"width": "6%",
        	"asSorting": [ "desc", "asc" ],
        	className: "text-align-right "
		},
		packetsColumn:{
			"data": "packets",
			"render": function (data, type, row, meta) {
				var packets = data;
        		if (type === 'display') {
        			return laygoon.helpers.packetExchange(packets+"");
        		}
        		return packets;
        	},
        	"width": "7%",
        	"asSorting": [ "desc", "asc" ],
        	className: "text-align-right"
		},
		readLatencyColumn:{
			"data": "diskReadLatency",
			"render": function (data, type, row, meta) {
				var readLatency = data;
        		if (type === 'display') {
        			return readLatency+" ms";
        		}
        		return readLatency;
        		
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 2
		},
		readIOPSColumn:{
			"data": "readOperations",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		writeLatencyColumn:{
			"data": "diskWriteLatency",
			"render": function (data, type, row, meta) {
				var writeLatency = data;
        		if (type === 'display') {
	        		return writeLatency+" ms";
	        		}
	        		return writeLatency;
        	},
        	"width": "7%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		writeIOPSColumn:{
			"data": "writeOperations",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 5
		},
		dataStoreNameColumn:{
			"data": "parentName", 
			"render": function (data, type, row, meta) {
	        		var dataStoreName=data;
	        		if (type === 'display') {
		        		return dataStoreName;
	        		}
	        		return dataStoreName;
	        	},
	        	"width": "7%",
	        	className: "text-align-right ",
	        	"asSorting": [ "desc", "asc" ],
	        	"targets": 6
		},
		cpuUsageColumn:{
			"data": "cpuUsagePct",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets":2
		},
		memUsageColumn:{
			"data": "memUsagePct",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets":2
		},
		usageMHzColumn:{
			"data": "cpuUsageMhz",
			"render": function (data, type, row, meta) {
        		return data;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		CPUReadyColumn:{
			"data": "cpuReady",
			"render": function (data, type, row, meta) {
				var cpuReady = data;
        		if (type === 'display') {
        			return cpuReady+"%";
        		}
        		return cpuReady;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		memActiveColumn:{
			"data": "memActive",
			"render": function (data, type, row, meta) {
				var memActive = data;
        		if (type === 'display') {
        			return memActive == -1 ? 'N/A' : laygoon.helpers.byteExchange(memActive+"", 'kb', 'auto');
        		}
        		return memActive;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		CPUSwapWaitColumn:{
			"data": "cpuSwapWait",
			"render": function (data, type, row, meta) {
				var cpuSwapWait = data;
        		if (type === 'display') {
        			return cpuSwapWait+" ms";
        		}
        		return cpuSwapWait;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 4
		},
		netRespTimeColumn:{
			"data": "netRespTime",
			"render": function (data, type, row, meta) {
				var RTT = data;
        		if (type === 'display') {
	        		return (RTT == -1) ? 'N/A' : (RTT + ' ms');
        		}
        		return RTT;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 3
		},
		virtualPktDropColumn:{
			"render": function (data, type, row, meta) {
				var virtualPktDrop = row.virtualPktDropIn + "/" + row.virtualPktDropOut;
        		if (type === 'display') {
	        		return virtualPktDrop;
        		}
        		return virtualPktDrop;
        	},
        	"width": "7%",
        	className: "text-align-right  ",
        	"asSorting": [ "desc", "asc" ],
        	"targets": 5
		},
		tcpFatalRetryColumn:{
			 "render": function (data, type, row, meta) {
	        		var tcpFatalRetry= row.fatalRetryIn + "/" + row.fatalRetryOut;
	        		if (type === 'display') {
	        			return tcpFatalRetry;
	        		}
	        		return tcpFatalRetry;
	        	},
	        	"asSorting": [ "desc", "asc" ],
	        	"width": "7%",
	        	className: "text-align-right  ",
	        	"targets": 4
		},
		dataColumn:{
			"data": function (row, type, val, meta) {
        		return row.data;
        	}
		},
		tooltipNameColumn:{
			"data": function (row, type, val, meta) {
        		return row.tooltipName;
        	}
		},
		/*end table column config*/
		
		// auto adjust text font size
		autoSetFontSize:function(maxHeight,wordbox){
			wordbox.css('font-size', '12px');
			for (var i = 10; i < 200; i++) {
			    if (wordbox.height() > maxHeight) {
			        //当容器高度大于最大高度的时候，上一个尝试的值就是最佳大小。
			        wordbox.css('font-size', (i - 4) + 'px');
			        //结束循环
			        break;
			    } else {
			        //如果小于最大高度，文字大小加1继续尝试
			        wordbox.css('font-size', i + 'px');
			    }
			}
			
		},
		 removeItem:function(array,item){
	    	 for(var i = array.length - 1; i >= 0; i--) {
	 		    if(array[i] === item) {
	 		    	array.splice(i, 1);
	 		    }
	 		}
	    },
	    removeItemById:function(array,id){
	    	 for(var i = array.length - 1; i >= 0; i--) {
	 		    if(array[i].id === id) {
	 		    	array.splice(i, 1);
	 		    }
	 		}
	    },
	     setColor:function(grade){
			var color;
			if(grade==0){
				color='#7BDC2A';
			}else if(grade==1){
				color='#FFD033';
			}else if(grade==2){
				color='#FF6321';
			}else if(grade==3){
				color='#DB1B1B';
			}
			return color;
		},
		checkMinHealthScore :function(worstByGroupData){
			var nodeTypeComplete = ["VCenter",
				                       "DataCenter",
				                       "Cluster",
				                       "Host",
				                       "VSwitch",
				                       "PortGroup",
				                       "vApp",
				                       "VM",
				                       "VNic",
				                       "Protocol",
				                       "Classifier",
				                       "TORSwitch",
				                       "PhysicalStorage",
				                       "DataStore",
				                       "VirtualDisk"];  
			var easyPieData = laygoon.helpers.easyPieChartParamsExchange(worstByGroupData.spanText);
		       var obj = {};
				 obj.nodeType = nodeTypeComplete[worstByGroupData.nodeType];
				 obj.name = worstByGroupData.nodeName;
				 obj.d = worstByGroupData.beanForWorstByGroup;
				 obj.appRespTime = worstByGroupData.appRespTime;
				 obj.dataPercent = easyPieData.percent;
				 obj.barColor = easyPieData.barColor;
				 obj.trackColor = easyPieData.trackColor; 
		         obj.spanText = worstByGroupData.spanText;
				 obj.dataPieSize = 50;
				 obj.dataSize = 50;
				
				 return obj;
		},
	
	    //cpu/memory Usage
	    formatToolTipsDataOnMouseOver: function(d){
    		var dataObject = {}, tableData = {}, classifiers = [], showClassifiers = true;
    		dataObject.healthScore = d.grades.healthScore;	
    		dataObject.appRespTime = (d.appRespTime == -1) ? 'N/A' : (d.appRespTime + 'ms');
    		dataObject.cpuUsagePct = d.cpuUsagePct;
    		dataObject.cpuUsageMhz = d.cpuUsageMhz;
    		dataObject.cpuReady = d.cpuReady;
    		dataObject.memUsagePct = d.memUsagePct;
    		dataObject.memActiveDisplay = laygoon.helpers.byteExchange(d.memActive, 'kb', 'auto');
    		dataObject.cpuSwapWait = d.cpuSwapWait;
    		
    		showClassifiers  = (d.classifiers && d.classifiers.length != 0) ? true : false; 
    		if (showClassifiers) {
    			classifiers = laygoon.helpers.formatClassifiers(d);
    		}
    		
    		if (classifiers && classifiers.length != 0){
    			showClassifiers = true;
    		} else {
    			showClassifiers = false;
    		}
    		
    		dataObject.name = d.name;
    		dataObject.showOptions = (d.nodeType == 7 && showClassifiers) ? true : false;
    	    dataObject.showClassifiers = showClassifiers;
    	    dataObject.classifiersData = classifiers;
    	    
    	    return dataObject;
	    },
		formatToolTipsDataOnMouseClick: function(d){
			var that=this;
    		var NODETYPE = {
    				DataCenter:1,
    				Cluster:2,
    				Host:3,
    				PortGroup:5,
    				Vapp:6,
    				VM:7
    		}
    		var dataObject = {}, classifiers = [], showClassifiers = true;
    		
    		var grades = laygoon.helpers.getGrades('CPU', d);    		
    		showClassifiers  = (d.classifiers && d.classifiers.length != 0) ? true : false; 
    		if (showClassifiers) {
    			classifiers = laygoon.helpers.formatClassifiers(d);
    		}
    		
    		if (classifiers && classifiers.length != 0){
    			showClassifiers = true;
    		} else {
    			showClassifiers = false;
    		}
    		dataObject.name = d.name;
    		dataObject.cpuUsagePct = d.cpuUsagePct;
    	    dataObject.grades = grades;
    	    dataObject.showClassifiers = showClassifiers;
    	    dataObject.classifiersData = classifiers;
    	    dataObject.nodeType = laygoon.pages.flowAnalysis.nodeTypesScheme[d.nodeType];
    	    dataObject.bFilter=false;
    		dataObject.memUsagePct = d.memUsagePct;
    	  //  dataObject.bFilter = (d.nodeType == NODETYPE.DataCenter || d.nodeType == NODETYPE.Host ||  d.nodeType == NODETYPE.VM) ? true :  false;
    	    if(d.nodeType == NODETYPE.VM){
    	    	dataObject.updateTree = "none";
    	    }else if(d.nodeType == NODETYPE.DataCenter){
    	    	dataObject.updateTree = d.expand==true ? "ZoomIn" : "none";
    	    }
    	    else{
    	    	dataObject.updateTree = "ZoomIn";
    	    	
    	    }
    	    return dataObject;
		},
	   
	    
	    formActions: function(d){
            var  $this = d.tooltipName=='cpuUsage'?$('.popover .cpuTree-mouseclick-on-node').find('.easy-pie-chart'):$('.popover .memTree-mouseclick-on-node').find('.easy-pie-chart');
            $this.each(function () {
            	laygoon.helpers.showEasyPieChart($(this));
            });
		
	    },
    	
	// a common method for showing rootCause view,
	// param viewName is "summary"/"cpu" etc.
	// args is an object that contains what needs for page like nodename, classifier etc.
		showRootCauseViewFn: function(viewName, args){
		    var id = "#rootCauseModal";
			var scope = angular.element(id).scope();
			scope.setView(viewName, args);

			$('#rootCauseModal').modal({show: true, backdrop: 'static', keyboard: false});

			// to show tooltips for full-screen
		    if ($('#jarviswidget-fullscreen-mode').get(0)){
		    	  var resetZ_Index = $('#jarviswidget-fullscreen-mode').css('z-index');
		    	  $('#rootCauseModal').css('z-index', resetZ_Index + 1);
			   }
			//$('#rootCauseModal').modal({keyboard: true});

			$('#fadeModal').on('click', function(){
		    	$('#rootCauseModal').modal('hide');
		    });
		},

		showQuickHelper: function(page, subPage){
			var scope = angular.element("#quick-helper-root-cause").scope();
	    	scope.page = page;
	    	scope.subPage = subPage;
	    	$("#quick-helper-root-cause").modal({show: true, keyboard: true});
			$('#quick-helper-root-cause .fadeModal').on('click', function(){
		    	$('#quick-helper-root-cause').modal('hide');
		    });
		},

		bindQuickHelper: function(page, subPage) {
			var el = $("#quick-helper");
			$.data(el[0], "page", page);
			$.data(el[0], "subPage", subPage);
		},

		 showTooltip:function(title,color){
			$.smallBox({
				title : title,
				content : "<i class='fa fa-clock-o'></i><i>1 seconds ago...</i>",
				color : color,
				iconSmall : "fa fa-check bounce animated",
				timeout : 4000
			});
	   },
		showReport:function(name){
			$("#reportTable tr").each(function(){
				$(this).addClass("whiteColor");
				$(this).removeClass("grayColor");
			});
			 var url="/report/showReport?name="+name;
			 var report=$("#childPage");
			 report.attr("src",url);
			 report.load();
		},
		convAlarmDrillDown: function(node, protocol, signInstance, startTime, endTime){
            var startTime = parseInt(startTime, 10);
            var endTime = parseInt(endTime, 10);
			//console.debug(['common********************', signInstance, new Date(startTime), new Date(endTime)]);
			laygoon.common.showRootCauseViewFn("summary",
					{classifier: protocol, nodeName: node, signInstance : signInstance, startTime : startTime, endTime : endTime});
		},

		serverAlarmDrillDown: function(node, protocol){
			var url = "#/appTopology?node=" + node + "&nodeType=VMData&classifier="+ protocol +""+'&currentTab='+'depServiceTab';;
			window.location.href = url;
		},
		
		alertMessage: function(message) {
			$.SmartMessageBox({
				title : "<i class='fa'></i> "+ message +"",
				buttons : '[OK]'
			}, function(ButtonPressed) {
	
			});			
		},

	/*
	 * The width of right side bar.
	 */
	RIGHT_SIDE_BAR_WIDTH: 240,

	showRootCauseView: true, // a flag indicates whether we need to show rootCauseview automatically.
	/*
	 * Attach events for dashboard page.
	 */
	attachEvents: function(){
		
		//To show Stackable modal. 
		$(document)  
		  .on('show.bs.modal', '.modal', function(event) {
			  $(this).appendTo($('body'));
		  })
		  .on('shown.bs.modal', '.modal.in', function(event) {
		    setModalsAndBackdropsOrder();
		  })
		  .on('hidden.bs.modal', '.modal', function(event) {
		    setModalsAndBackdropsOrder();
		  });

		  function setModalsAndBackdropsOrder() {  
		  var modalZIndex = 1040;
		  $('.modal.in').each(function(index) {
		    var $modal = $(this);
		    modalZIndex++;
		    $modal.css('zIndex', modalZIndex);
		    $modal.next('.modal-backdrop.in').addClass('hidden').css('zIndex', modalZIndex - 1);
		  });
		   
		  $('.modal.in:visible:last').focus().next('.modal-backdrop.in').removeClass('hidden');
		 
		  }
		  
		  // Add event when local/session storage change
		  $(window).bind("storage", function(event){
			  var e = event.originalEvent;
			  if(e.key == "customID" && e.newValue != e.oldValue) {
				  $(window).trigger("customIDChange", [e.newValue]);
			  }
		  });
		  		
		  //set cache: false for all $.ajax
			/*  $.ajaxSetup ({
			      cache: false,
			      headers: {'Cache-Control': 'no-cache', 'Pragma': 'no-cache'}
			  });*/
		
		  /*
		 * Attach events to resize the width of matrixbar when right siderbar show/hide
		 */
		/*$('.toggle-right-box .fa-bars').click(function(){
			laygoon.common.matrixContainerResize();
		});*/

		/*
		 * Resize the height of treeview and forcelayout as the maximum height of window's view.
		 */
		/*$(window).resize(function(){
			 laygoon.common.matrixContainerResize();
		});*/
	},
	/*
	 * Resize matrix container width if needed
	 */
	matrixContainerResize: function() {
		var totalWidth = $("#container").outerWidth(),
		brandWidth = $("#container .brand").outerWidth();
		//console.log([totalWidth, brandWidth]);
		$(".matrix-container").css("width", (totalWidth - brandWidth - 0 - 15) + "px");
	},

	setTimeRange: function(){
		var startTime = laygoon.helpers.getUrlParam("startTime"),
			endTime = laygoon.helpers.getUrlParam("endTime");
		if (startTime && startTime != "" && endTime && endTime != "") {
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.START_TIME, startTime);
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.END_TIME, endTime);
			laygoon.helpers.setTimeRangeConfig(laygoon.helpers.SESSIONKEY.RANGE, "Custom");
		}
	},
	localize:function(){
		var localizedata={};
		if(laygoon.localize.datas != undefined) {
		   localizedata=laygoon.localize.datas;
		} else {
			localizedata.localizemessage="load local data error";
		}

		return localizedata;
	},
	goToRootCause: function(colorWheelName, nodeName, classifier, signInstance, startTime, endTime){
		if (colorWheelName == 'application') {
			if(signInstance) {
				laygoon.common.showRootCauseViewFn("summary",
						{classifier: classifier, nodeName: nodeName, signInstance: signInstance,
					startTime: startTime, endTime: endTime});
			} else {
				laygoon.common.showRootCauseViewFn("summary",
					{classifier: classifier, nodeName: nodeName});
			}
	    } else if (colorWheelName == 'network'){
			laygoon.common.showRootCauseViewFn("network",
					{classifier: classifier, nodeName: nodeName});
	    } else if (colorWheelName == 'CPU'){
			laygoon.common.showRootCauseViewFn("cpu",
					{classifier: classifier, nodeName: nodeName});
	    } else if (colorWheelName == 'Memory'){
			laygoon.common.showRootCauseViewFn("memory",
					{classifier: classifier, nodeName: nodeName});
	    }else {
			laygoon.common.showRootCauseViewFn("storage",
					{classifier: classifier, nodeName: nodeName});
	    }
	},
	 goToStatBrowserPage: function(nodeName, nodeType) {
     	 var d = {};
     	 d.name = nodeName;
     	 d.nodeType = nodeType;
     	 var service = angular.injector(['smartApp']).get('resBrowserConfigService');
     	 service.goToStatBrowserPage(d);
	 },
	 commonStartCapture:function(nodeName) {
		 var captureService = angular.injector(['smartApp']).get('captureService');
		 captureService.doStartCaptureVM(nodeName);
			/*if(nodeType=='3'){
				var hostName=nodeName;
				captureService.handleCapture(hostName);
			}*/
	 },
	 /* A method to show progress bar, disable all the page
	  * to show: laygoon.common.progressBar("Please wait...").show();
	  * to hide: laygoon.common.progressBar().hide();
	  *  */
	 progressBar: function(){
		 var mask, content;
		 return function(text){
			mask = mask || $("<div></div>").appendTo("body").addClass("global-progress-bar-background");
			content = content ? content.html(text) : $("<div>"+ text +"</div>").appendTo("body").addClass("global-progress-bar");
			return {
				show: function(){
					content.show();
					mask.show();	
				},
				hide: function(){
					content.hide();
					mask.hide();
				}
			};
		 };
	 }()
};

/*
 * Useful helpers
 */
laygoon.helpers = {

		SESSIONKEY: {
			RANGE:"range",
			START_TIME:"startTime",
			END_TIME:"endTime"
		},
		isMobile: {
    		    Android: function() {
    		        return navigator.userAgent.match(/Android/i);
    		    },
    		    BlackBerry: function() {
    		        return navigator.userAgent.match(/BlackBerry/i);
    		    },
    		    iOS: function() {
    		        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    		    },
    		    Opera: function() {
    		        return navigator.userAgent.match(/Opera Mini/i);
    		    },
    		    Windows: function() {
    		        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    		    }
    		},
    	/**
		 * Get values of parameters on location
		 */
		getUrlParam: function (name) {
			var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			var hash = window.location.hash.split("?");
			var r;
			if(hash[1]){
				r = hash[1].match(reg);
			}
			if (r!=null) return unescape(r[2]); return null;
		},

      /**
	    * 鐎瑰綊鍣洪崡鏇氱秴鐠侊紕鐣婚敍灞炬暜閹镐礁鐣炬稊澶婄毈閺侀绻氶悾娆撴毐鎼达讣绱辩�姘疅鐠у嘲顫愰崪宀�窗閺嶅洤宕熸担宥忕礉閹存牗瀵�024閼奉亜濮╂潻娑楃秴
	    *
	    * @param int  size,鐎瑰綊鍣虹拋鈩冩殶
	    * @param type unit,鐎瑰綊鍣虹拋鈩冩殶閸楁洑缍呴敍宀勭帛鐠併倓璐熺�妤勫Ν
	    * @param type decimals,鐏忓繑鏆熼悙鐟版倵娣囨繄鏆�惃鍕秴閺佸府绱濇妯款吇娣囨繄鏆�稉锟界秴
	    * @param type targetUnit,鏉烆剚宕查惃鍕窗閺嶅洤宕熸担宥忕礉姒涙顓婚懛顏勫З鏉╂稐缍�
	    * @return type 鏉╂柨娲栫粭锕�値鐟曚焦鐪伴惃鍕敨閸楁洑缍呯紒鎾寸亯
	    */
		byteExchange: function (size, unit, targetUnit){
			if(size>=0){
			   var units = ['B', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb'];
			   var upper_units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB'];

			   var theUnit = $.inArray(unit.toUpperCase(), upper_units);

			   if (targetUnit != 'auto'){
				   targetUnit = $.inArray(targetUnit.toUpperCase(), upper_units);
			   }

			   while (size >= 1024) {
		           size/=1024;
		           theUnit++;
		           if (theUnit == targetUnit)//瀹歌尙顑侀崥鍫㈢舶鐎规艾鍨柅锟藉毉瀵邦亞骞嗛崥褝绱�
		               break;
		       }
		       var flowUnitCoin = upper_units[theUnit];
		       var result;
		       if(size!=0){
		    	    result = size.toString();
			       
			       if(theUnit > 0){
				       var point = $.inArray('.', result);
				       result = result.substring(0, point + 3);
			       }else{
			    	   var point = $.inArray('.', result);
			    	   if(point>0)
				       result = result.substring(0, point);
			       }
		       }else{
		    	   result=size;
		       }
		      
		       return  result + ' ' + flowUnitCoin;
			}

		   },

		   /**
		    * format packet on tooltip
		    * @param size
		    *
		    */
		   packetExchange: function(size) {
			  if(size!=undefined){
				  var units = ['K','M','G'];
				  var theUnit = -1;
				  while(size >= 1000) {
					  size/=1000;
					  theUnit++;
				  }
				  var flowUnitCoin = theUnit==-1?'':units[theUnit];
				  var result = size.toString();
				  if(theUnit >= 0){
					  var point = $.inArray('.', result);
					  result = result.substring(0, point + 2);
				  }
				  return result + flowUnitCoin;
			  }
			 
		   },

		   /**
		    * easyPieData params  exchange
		    * @param    percent
		    * @param    barColor
		    * @param    trackColor
		    */

		easyPieChartParamsExchange : function (healthScore) {

			var obj = {};
		    obj.percent = null; obj.barColor = null;
		    obj.trackColor = null;

		if (67 <= healthScore && healthScore <= 100) {

			obj.percent = Math.round((healthScore - 66) / 34 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.greenColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.yellowColor;
		} else if (34 <= healthScore && healthScore <= 66) {
			obj.percent = Math.round((healthScore - 33) / 33 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.yellowColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.brownColor;
		} else if (0 <= healthScore &&  healthScore <= 33) {
			obj.percent = Math.round(healthScore / 33 * 100);
			obj.barColor = laygoon.common.EasyPieChartColorGrade.brownColor;
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.redColor;
		} else {
			obj.percent = 0;
			obj.barColor = laygoon.common.EasyPieChartColorGrade.greyColor
			obj.trackColor = laygoon.common.EasyPieChartColorGrade.greyColor;
		}

		    return obj;
		},

		/**
		    * show easyPieChart
		    * @param $this
		    */

		showEasyPieChart : function ($this){


			var trackColor = $this.attr('data-trackColor');
			var size = parseInt($this.data('pie-size')) || 25;
	        var barColor = $this.attr('data-barColor');
	        var spanText = parseInt($this.attr('data-spanText'));
	        try {
	        $this.easyPieChart({
				easing: 'easeOutCirc',
				barColor : barColor,
				trackColor: trackColor,
				scaleColor : false,
				lineCap : 'butt',
				lineWidth : parseInt(size / 8.5),
				animate : 1500,
				rotate : -90,
				size : size,
				onStep : function(value) {
					var spanText = parseInt($this.attr('data-spanText'));
					this.$el.find('span').text(Math.round(spanText));
				  }
		    	});

	        }catch(e){
	        	console.log('The error is : ' +e);
	        }

      },

		/**
		    * init trsanction data
		    * @param    container
		    * @param    d
		    */

		initTransaction: function (container, d){
		   var transaction = {};
		   if (!d ||　!d.name) {
			   if (container == "AppResponse") {
			    	  transaction.type = 'Transaction';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = '';
			    	//Network Health = avg Traffic volumn / min
				    	//Average ? MB traffic per minute
			      } else if (container == "NetWork") {
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = '';
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else if (container == "Storage") {

			    	  transaction.type = 'Disk';
			    	  transaction.unit = 'IOPS';
			    	  transaction.data = '';
			    	  //Memory Health = avg memory usage / min
			    	 // Average ?% usage per minute

			      } else if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = '';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = '';
			      }
		   
		   }else {
		     var avgTypeSpecificStat = d.avgTypeSpecificStat;
		      //App Resp Time = avg num of Transactions / min
	 	      //Average ? transactions per minute
		     if(avgTypeSpecificStat){
		    	 if (container == "AppResponse") {
			    	  transaction.type = 'Transaction';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = this.packetExchange(d.avgTypeSpecificStat) +' ' +'per minute';
			    	//Network Health = avg Traffic volumn / min
				    	//Average ? MB traffic per minute
			      } else if (container == "NetWork") {
			    	  avgTypeSpecificStat = this.byteExchange(d.avgTypeSpecificStat / 60+"", 'b', 'auto');
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = avgTypeSpecificStat + "ps";
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else if (container == "Storage") {

			    	  transaction.type = 'Disk';
			    	  transaction.unit = 'IOPS';
			    	  transaction.data = avgTypeSpecificStat + " "+ 'per second';
			    	  //Memory Health = avg memory usage / min
			    	 // Average ?% usage per minute

			      } else if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = avgTypeSpecificStat / 100 +'%';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = avgTypeSpecificStat / 100 +'%';
			      }
		     }else{
		    	 if (container == "Memory") {

			    	  transaction.type = 'Memory';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = d.memUsagePct +'%';
			    	  //CPU Health = avg CPU usage / min
			    	  //Average ?% usage per minute

			      }else if (container == "NetWork") {
			    	  avgTypeSpecificStat =d.avgTypeSpecificStat?this.byteExchange(d.avgTypeSpecificStat / 60+"", 'b', 'auto'):'N/A';
			    	  transaction.type = 'Traffic';
			    	  transaction.unit = 'Rate';
			    	  transaction.data = avgTypeSpecificStat + " ps";
			    	  //Storage Health = avg I/O numbers / min
			    	  //Average ? I/O operations per minute
			      } else {
			    	  transaction.type = 'CPU';
			    	  transaction.unit = 'Usage';
			    	  transaction.data = d.cpuUsagePct  +'%';
			      }
		     }
		      
         
		   }
		      
		      return  transaction;

		},

		setTimeRangeConfig: function(key, value) {
			localStorage.setItem(key, value);
	  },

	  /**
	    * format trsanction data
	    * @param    d
	    */
	  formatTransaction:  function (d){

		  return    this.packetExchange(d.avgTypeSpecificStat);
	   },

	   /**
	    * formatClassifierInfo
	    * @param    d
	    */
	  formatClassifierInfo: function(d) {
		  var arr = [];
		  var  array = d.classifierInfo;

			 for (var i=0; i<array.length; i++){

				 var obj = {};
				 var data = array[i];
				     obj.ServicesProvided = data.name;
				     obj.AppResTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + ' ms');
				     obj.AvgTransPerMin = this.formatTransaction(data);
				     obj.TranVolu = this.byteExchange(data.trafficVolum, 'b', 'auto');
				     obj.Packets = this.packetExchange(data.packets);
				     obj.grades = data.grades;

				  if(obj.grades.avgGrade != -1){
					  arr.push(obj);
				  }
			 }

	         return arr;
	   },
	   
	   /**
	    * formatClassifierInfo
	    * @param    d
	    */
	  formatChildInfo: function(d, d_child) {
		  var arr = [];
		  var  array = d.classifierInfo;

			 for (var i=0; i<array.length; i++){

				 if(array[i].name == d_child.name) {
					 var obj = {};
					 var data = array[i];
					     obj.ServicesProvided = data.name;
					     obj.AppResTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + 'ms');
					     obj.AvgTransPerMin = this.formatTransaction(data);
					     obj.TranVolu = this.byteExchange(data.trafficVolum, 'b', 'auto');
					     obj.Packets = this.packetExchange(data.packets);
					     obj.grades = data.grades;
	
					  if(obj.grades.avgGrade != -1){
						  arr.push(obj);
					  }
				 }
			 }

	         return arr;
	   },

	   /**
	    * formatClassifiers
	    * @param    d
	    */
	   formatClassifiers: function(d) {
		   var arr = [];
			  var  array = d.classifiers;

				 for (var i=0; i<array.length; i++){

					 var obj = {};
					 var data = array[i];
					     obj.name = data.name;
					     obj.appRespTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + ' ms');
					     obj.avgTransPerMinDisplay = this.packetExchange(data.avgTransPerMin);
					     obj.trafficVolumeDisplay = this.byteExchange(data.trafficVolume, 'b', 'auto');
					     obj.packetsDisplay = this.packetExchange(data.packets);
					     obj.grades = data.grades;

					     if(obj.grades.avgGrade != -1){
							  arr.push(obj);
						  }
				 }

				    return arr;


		   },

	  
		   /**
		    * formatClassifier
		    * @param    d
		    */
		   formatClassifierTopology: function(d) {
			   var arr = [];
				  var  array = d.classifier;

					 for (var i=0; i<array.length; i++){

						 var obj = {};
						 var data = array[i];
						     obj.name = data.name;
						     obj.appRespTime = (data.appRespTime == -1) ? 'N/A' : (data.appRespTime + 'ms');
						     obj.avgTransPerMin = this.formatTransaction(data);
						     obj.trafficVolume = this.byteExchange(data.trafficVolum, 'b', 'auto');
						     obj.packets = this.packetExchange(data.packets);
						     obj.grades = data.grades;

						  if(obj.grades.avgGrade != -1){
							  arr.push(obj);
						  }
					 }

			         return arr;
			   },
		   
		/**
		    * Dealing with grades  is  ready for dashboardFoot data.
		    * @param    container
		    * @param    d
		    */

		 getGrades: function (container, d){
			 if (!d ||　!d.name){
				  var   transaction = null, grades = {}; 
				    transaction = this.initTransaction(container, d);
				    grades.transaction = transaction;
				    /*grades.criticalRatio = ;
					grades.minorRatio = minorRatio;
					grades.majorRatio = majorRatio;
					grades.normalRatio = normalRatio;*/
				
			}else {
			    var easyPieData = {};
			  try {
				easyPieData = this.easyPieChartParamsExchange(d.grades.healthScore);
			} catch (e) {
				console.log('Roy');
			}
		    var gradeCriticalCount = d.grades.gradeCriticalCount,
				gradeMinorCount = d.grades.gradeMinorCount,
				gradeMajorCount = d.grades.gradeMajorCount,
				gradeNormalCount = d.grades.gradeNormalCount,
			    transaction =  this.initTransaction(container, d),
			    dataPercent = easyPieData.percent,
			    dataPieSize = 50,
			    dataSize = 55,
			    spanText = d.grades.healthScore == -1 ? 0:d.grades.healthScore,
			    trackColor = easyPieData.trackColor,
			    barColor = easyPieData.barColor;


			var totalCount = gradeCriticalCount + gradeMinorCount + gradeMajorCount
					+ gradeNormalCount;
			var criticalRatio = Math.round(gradeCriticalCount / totalCount * 100)
					+ "%";
			minorRatio = Math.round(gradeMinorCount / totalCount * 100) + "%";
			majorRatio = Math.round(gradeMajorCount / totalCount * 100) + "%";
			normalRatio = Math.round(gradeNormalCount / totalCount * 100) + "%";
			var grades = {};
			if(!d.isNoData){
				grades.gradeCriticalCount = gradeCriticalCount;
				grades.criticalRatio = criticalRatio;
				grades.gradeMinorCount = gradeMinorCount;
				grades.minorRatio = minorRatio;
				grades.gradeMajorCount = gradeMajorCount;
				grades.majorRatio = majorRatio;
				grades.gradeNormalCount = gradeNormalCount;
				grades.normalRatio = normalRatio;
			}
			/*grades.gradeCriticalCount = gradeCriticalCount;
			grades.criticalRatio = criticalRatio;
			grades.gradeMinorCount = gradeMinorCount;
			grades.minorRatio = minorRatio;
			grades.gradeMajorCount = gradeMajorCount;
			grades.majorRatio = majorRatio;
			grades.gradeNormalCount = gradeNormalCount;
			grades.normalRatio = normalRatio;*/
			grades.transaction = transaction;
			grades.dataPercent = dataPercent;
			grades.dataPieSize = dataPieSize;
			grades.dataSize = dataSize;
			grades.barColor = barColor;
			grades.trackColor = trackColor;
			grades.spanText = spanText;

	      }
			
			
			return grades;
    
	   },


	   setSession: function(key, value) {
			$.session.set(key, value);

		},

		getTimeRangeConfig: function(key) {
			return localStorage.getItem(key);
		},

		clearTimeRangeConfig: function(){
			localStorage.removeItem("start");
			localStorage.removeItem("end");
			localStorage.removeItem("startTime");
			localStorage.removeItem("endTime");
		},

		removeTimeRangeConfig: function(key){
			localStorage.removeItem(key);
		},

		/**
		 * nStr: The number to be formatted, as a string or number. No validation is done, so don't input a formatted number. If inD is something other than a period, then nStr must be passed in as a string.
		 * inD: The decimal character for the input, such as '.' for the number 100.2
		 * outD: The decimal character for the output, such as ',' for the number 100,2
		 * sep: The separator character for the output, such as ',' for the number 1,000.2
		 */
		addSeparatorsNF: function(nStr, inD, outD, sep){
			nStr += '';
			var dpos = nStr.indexOf(inD);
			var nStrEnd = '';
			if (dpos != -1) {
				nStrEnd = outD + nStr.substring(dpos + 1, nStr.length);
				nStr = nStr.substring(0, dpos);
			}
			var rgx = /(\d+)(\d{3})/;
			while (rgx.test(nStr)) {
				nStr = nStr.replace(rgx, '$1' + sep + '$2');
			}
			return nStr + nStrEnd;
		},
		// call following safeApply method instead of $apply
		safeApply: function(scope, fn) {
			  var phase = scope.$root && scope.$root.$$phase;
			  if(phase == '$apply' || phase == '$digest')
				  fn && scope.$eval(fn);
			  else
				  fn && scope.$apply(fn) || scope.$apply();
		},
		// do something until element is loaded
		// the max wait time is 200 * 25 = 5s;
		onElementReady: function(){
			var times = {},
				MAX_TIMES = 25,
				INTERVAL = 200;
			return function(selector, callback){
				times[selector] = times[selector] ? (times[selector] + 1) : 1 ;
				if(times[selector] > MAX_TIMES) {
					times[selector] = 0;
					console.log(["onElementReady exceed the max time", selector]);
					return;
				}
				var that = this;
				if($(selector).length == 0) {
					setTimeout(function(){
						that.onElementReady(selector, callback);
					}, INTERVAL);
					return;
				}
				times[selector] = 0;
				callback();
			}
		}(),
		
		onArrayIsNotNull: function(obj, callback){
			var that = this;
			if(!obj || obj == '') {
				setTimeout(function(){
					that.onArrayIsNotNull(obj, callback);
				}, 200);
				return;
			}
			callback();
		},
		
		emptyNode: function(parentNode){
			var l = parentNode.childNodes.length;
			for(var i = 0; i < l; i++) {
				parentNode.removeChild(parentNode.childNodes[0]);
			}
		},
        // get smartApp module.
        getSmartAppModule: function() {
        	 return angular.injector(['smartApp']);
        },    
        //get EasyPieChart Service
        getEasyPieChartService: function() {
        	return this.getSmartAppModule().get('easyPieChartService');
        },
        //control the jarviswidget-loader On Resource Browser Page
	  	controlJarvisWidgetLoader: function(param){
        	  var dis = param ? 'block' : 'none';
        	  $('#resourceBrowserWidget>header>.jarviswidget-loader').css('display', dis);
         },

		fnRenderLoadingIcon: function(selector, param){
			var display = param ? 'block' : 'none';
			$(selector + ">header>.jarviswidget-loader").css('display', display);
		},
         
        handleVicRepeater: function(vicRepeater, callback){
        	if($('#vicRepeatModal').css("display") != "none")
        		return true;
        	$('#vicRepeatModal').modal("show");
			$("#vicRepeatModal input:radio[name=vicAction]:checked" ).prop('checked', false);
			$("#vicRepeatModal .err-msg").hide();
			$("#vicRepeatModal .vicRepeatOKBtn").off("click").on("click", function(){
				var vicAction = $("#vicRepeatModal input:radio[name=vicAction]:checked" ).val();
				if(!vicAction) {
					$("#vicRepeatModal .err-msg").show();
					return;
				}
				$('#vicRepeatModal').modal("hide");
				vicRepeater.vicAction = vicAction;
				
				$.ajax({
			        type: "POST",
			        url: '/multiDC/action',
			        data: JSON.stringify(vicRepeater),
			        contentType: "application/json; charset=utf-8",
			        dataType: "json",
//			        traditional: true,
			        context: this,
			        success: function (data) {
			        	callback();
			            console.log("success");
			        },
			       error: function(){
			    	   callback();
			            console.log("success");
			       }
			    }); 
			});
         }
};

// shortCut
var sc = {};
sc.html = laygoon.common.getHtml;



$(document).ready(function(){
	laygoon.common.matrixContainerResize();
	laygoon.common.attachEvents();
	laygoon.common.setTimeRange();
	var isMobile = laygoon.helpers.isMobile;
	$.browser.device = {};
	$.browser.device.isMobile = (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
});

// Polyfill

// Object.assgin
if (typeof Object.assign != 'function') {
	  (function () {
	    Object.assign = function (target) {
	      'use strict';
	      if (target === undefined || target === null) {
	        throw new TypeError('Cannot convert undefined or null to object');
	      }

	      var output = Object(target);
	      for (var index = 1; index < arguments.length; index++) {
	        var source = arguments[index];
	        if (source !== undefined && source !== null) {
	          for (var nextKey in source) {
	            if (source.hasOwnProperty(nextKey)) {
	              output[nextKey] = source[nextKey];
	            }
	          }
	        }
	      }
	      return output;
	    };
	  })();
}
