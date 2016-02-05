(function($, window){//test

	var levels = {
		error: 0,
		debug: 1,
		log: 2,
		info: 3,
		action: 4
	}
	var oldConsole = window.console;
	var logLevel = null;//"error", "log", "debug", "info";	
	var currentView,
	watchStartTime = new Date().getTime(),
	recordNum = 0
	var lastTime;
	
//	getLogLevel();
	
	function showHistory(){
		var str = "",
		lastTime = watchStartTime;
//		var allHistory = getHistory();
		var allHistory = laygoon.common.history;
		for(var i = 0; i < allHistory.length; i++) {
			if(i == 0) {
				str += "[" + allHistory[i].view + "]";
			} else {
				var duration = (allHistory[i].timeStamp - lastTime);				
				str += " stay for " + formatTime(duration);
				str += "\n -> " + "[" + allHistory[i].view + "]";
			}
			lastTime = allHistory[i].timeStamp;
			if(allHistory[i].clickElements) {
				for(var j = 0; j < allHistory[i].clickElements.length; j++) {
					var duration = (allHistory[i].clickElements[j].timeStamp - lastTime);
					lastTime = allHistory[i].clickElements[j].timeStamp;
					var elHTML = allHistory[i].clickElements[j].el;
					if(elHTML.length > 500) {
						elHTML = elHTML.substr(0, 500) + "...";
					}
					str += "\n wait for " + formatTime(duration) + ", click on " + elHTML;
				}
			}
		}
		
		function formatTime(duration){
			return (duration < 60 * 1000 ? moment.duration(duration, "milliseconds").humanize(): moment.duration(duration, "milliseconds").as("minutes") + 'minutes');
		}
		return str;
	}
	
	$(function(){
		/*$(document.body).on("click", function(e){
			if(laygoon.common.history.length == 0) {
				console.log("history length is 0, return...")
				return;
			}
			if(!laygoon.common.history[laygoon.common.history.length - 1].clickElements) {
				laygoon.common.history[laygoon.common.history.length - 1].clickElements = [];
			}
			laygoon.common.history[laygoon.common.history.length - 1].clickElements.push({el: e.target.outerHTML, timeStamp: new Date().getTime()});
			recordNum ++;
		});*/
		/*$(document.body).on("viewLoaded", function(event, view){
			// if history is too much, put it into localstorage
			if(recordNum > 50) {
				storeHistoryInLocal();
				laygoon.common.history = []; // empty array.
			}
			laygoon.common.history.push({view: view, timeStamp: new Date().getTime()});
		});*/
//		localStorage.setItem("actionHistory", "");
		
		
	});
	
	function formatTime(duration){
		return (duration < 60 * 1000 ? moment.duration(duration, "milliseconds").humanize(): moment.duration(duration, "milliseconds").as("minutes") + 'minutes');
	}
	
	function recordHistory(eventType, content){
		var description = {};
		description["clickEvent"] = " click on ";
		description["viewChange"] = " go to ";
		
		var str = "";
		if(lastTime) {
			str += "wait for " + formatTime(new Date().getTime() - lastTime) + ",";
		}
		str += description[eventType] + content + "\n";
		saveLog("action", [str]);
		if(eventType == "viewChange") {
			lastTime = new Date().getTime();
		}
	}
	
	// combine history from local with js variable, return array
	function getHistory(){
		var oldHistoryStr = localStorage.getItem("actionHistory");
		if(!oldHistoryStr || oldHistoryStr == "") {
			var oldHistoryAry = [];
		} else {
			var oldHistoryAry = JSON.parse(oldHistoryStr);
		}
		
		console.log(["oldhistory", oldHistoryAry]);
		return oldHistoryAry.concat(laygoon.common.history);
	}
	
	function storeHistoryInLocal() {		
		
		var historyStr = JSON.stringify(getHistory());
		console.log(["store in local, hisstr", historyStr]);
		// the local storage for history should not exceed 3M
		if(historyStr.length >= 3 * 1024 * 1024) {
			// remove some pre history;
		} else {
			localStorage.setItem("actionHistory", historyStr);
		}
	}
	
	/*setTimeout(function(){
		laygoon.common.showHistory = showHistory;
	}, 2000);*/
	
	
	function getLogLevel(){
		$.ajax({
      	  url: '/getLogLevel' + '?timeStamp=' + new Date().getTime(),
   		  type: 'GET',
   		  timeout: 10000,
   		  success: function(result){
   			  try{
   				  logLevel = result.split(","); //["debug"]
   				  if(logLevel.length > 0) {
   					  logLevel = logLevel[0];
   					  catchLog();
   				  }
   				  
   				if(logLevel == "action") {
   					$(document.body).on("click", function(e){
   						recordHistory("clickEvent", e.target.outerHTML);
   					});
   					
   					$(document.body).on("viewLoaded", function(event, view){
   						recordHistory("viewChange", view);
   					});
   				}
   			  } catch(e) {
   				  logLevel = null;
   			  }
   		  }
       });		
	}
	
	function uilaLog(type){
		return function(){
			oldConsole[type].apply(oldConsole, arguments);
			if(logLevel == "action") {
				if(levels[0] >= levels[type] || type == "action") {
					saveLog(type, arguments);				
				}
				return;
			}
			if(levels[logLevel] >= levels[type]) {	    	
				saveLog(type, arguments);
			}
		};				
	};
	
	function saveLog(type, messages) {
		var str = ""
		
		try{
			for(var i = 0; i < messages.length; i++) {
				if(i > 0)
					str += ",";
		    	if(Object.prototype.toString.call(messages[i]) === "[object String]") {
		    		str += messages[i];
		    	} else {
		    		var cache = [];
		    		str += JSON.stringify(messages[i], function(key, value) {
		    		    if (typeof value === 'object' && value !== null) {
		    		        if (cache.indexOf(value) !== -1) {
		    		            // Circular reference found, discard key
		    		            return;
		    		        }
		    		        // Store value in our collection
		    		        cache.push(value);
		    		    }
		    		    return value;
		    		});
		    		cache = null; // Enable garbage collection
		    	}
			}
			
			str += "\n detail info: " + showHistory();
	    	
			$.ajax({
	        	  url: '/saveLog',
	     		  type: 'POST',
	     		  dataType: 'json',
	     		  timeout: 10000,
	     		  data:{
	     			  type: type,
	     			  message: str,
	     			  userAgent: $.browser.name + ", " + $.browser.fullVersion + ", webkit:" + $.browser.webkit,
	     			  currentView: currentView,
	     			  timeRange: JSON.stringify(getTimeRange())
	     		  },
	     		  success: function(result){
	     		  }
	         });
		} catch(e){
			oldConsole.log(e.message);
		}		
	}
	
	function getTimeRange(){
		function pInt(sessionValue) {
    		var result;
    		if(!sessionValue || sessionValue == "") {
    			result = undefined;
    		} else {
    			result = parseInt(sessionValue);
    		}
    		return result;
    	}
		
		var timeMode = laygoon.helpers.getTimeRangeConfig("timeMode");
		var timeOption = laygoon.helpers.getTimeRangeConfig("timeOption");
		var start = pInt(laygoon.helpers.getTimeRangeConfig("start"));
		var end = pInt(laygoon.helpers.getTimeRangeConfig("end"));
		var startTime = pInt(laygoon.helpers.getTimeRangeConfig("startTime"));
		var endTime = pInt(laygoon.helpers.getTimeRangeConfig("endTime"));
		
		return {timeMode: timeMode, timeOption: timeOption, start: start, end: end, startTime: startTime, endTime: endTime}
	}
	
	function catchLog(){
		window.console = {};
		for(var p in oldConsole) {
			switch(p){
				case "log":
					console[p] = uilaLog(p);
					break;
				case "info":
					console[p] = uilaLog(p);
					break;
				case "debug":
					console[p] = uilaLog(p);
					break;
				case "error":
					console[p] = uilaLog(p);
					break;
				default:
					console[p] = (function(prop){
						return function(){
							oldConsole[prop].apply(oldConsole);
						};
					})(p);
			}
			
		}
		window.onerror = function(errorMessage, scriptURI, lineNumber,columnNumber,errorObj) {
		    var msg = "Error: " + errorMessage + "\n"
		    		+ "Source file: " + scriptURI + "\n"
		    		+ "Line: " + lineNumber + "\n"
		    		+ "Column: " + columnNumber + "\n"
		    		+ "Stack: " + errorObj;
		    console.error(msg);
		 }
	}

	$(document.body).on("viewLoaded", function(event, view){
		currentView = view;
	});	
})(jQuery, window);