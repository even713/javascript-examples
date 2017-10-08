// Mini logger
var debug = 1 ? console.log.bind(console, '[uila-datatable]') : function() {};

const DATA_ORDER_PROP = "dataOrder";

class UilaTableFirstDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";
		this.priority = 1;
		this.compile = this._compile.bind(this);
	}

	// without setting template, we can get the inside element "uila-column"s.
	// use "uila-column" to render tds per column settings.
	_compile(tElem, tAttrs) {
		let columns = tElem.children("uila-column"),
			tdArray = [];

		columns.each(function(idx, col){
			let key = $(col).attr("key"),
				formatter = $(col).attr("formatter"),
				filter = $(col).attr("filter");

			if(formatter) {
				tdArray.push('<td><'+ formatter + ' dt-info="vm.dtInfo" col-idx="'+ idx +'" row-idx="$index" row-data="elem" ' +
					'></'+ formatter +'></td>');
			} else if(filter) {
				tdArray.push(`<td><span ng-bind-html=elem.`+ key + `|`+ filter +`:elem:"`+ idx +`":$index></td>`);
			} else if(key){
				tdArray.push("<td>{{ elem."+ key + "}}</td>");
			} else {
				console.error("no key/formatter/filter for table column");
				return;
			}
		});

		tElem.data("tdArray", tdArray);
	}
}

class UilaTableSecondDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects){
		super(...injects);

		this.restrict = "EA";

		this.scope = {
			sourceData: '=data',
			dtOptions: '=',
			detailRenderer: '=',
			fnCreatedRow: '=',
			dtInfo: '='
		}

		this.controller = UilaTableDirectiveWorker.create();
		this.controllerAs = "vm";
		this.bindToController = true;
		this.transclude = true;
		this.replace = true;
		this.priority = 0;
		this.compile = this._compile.bind(this);

		this.template = `<table>
		<thead>
	        <tr ng-transclude>

    		</tr>
		</thead>
		<tbody>
			<tr>
				<!-- Insert formatted column td here -->
			</tr>
		</tbody>
	</table>`;
	}

	_compile(tElem, tAttrs) {
		tElem.css("visibility", "hidden");

		let tbodyTr = tElem.find("tbody > tr"),
			trackBy = tAttrs.trackBy ? "elem." + tAttrs.trackBy : "$index",
			trNgRepeat = 'elem in vm.data track by '+ trackBy,
			tdArray = tElem.data("tdArray"),
			_injects = this;

		tbodyTr.attr("ng-repeat", trNgRepeat);
		tbodyTr.attr("ng-init", "$last && finished()");
		tbodyTr.attr("key-idx", "{{"+ trackBy +"}}");

		tdArray.forEach(function(td){
			tbodyTr.append(td);
		});


		return {
			post: function(scope, element, attr, ctrl) {
				let firstLoad = true;
				ctrl.setDTOption(ctrl.dtOptions);
				let trackBy = attr.trackBy;
				ctrl.setTableKey(trackBy);

				// will be call when ng-repeat finished(if data.length == 0, won't fire this function)
				scope.finished = function(){
					//debug("ng repeate finished...")
					onUIChanged();
				}; 

				// listen uiChanged event for manually update/create dt.
				scope.$on(scope.$id + "uiChanged", onUIChanged);

				// at the first time initiliaze dt, but data length is 0
				if(ctrl.data && ctrl.data.length == 0) {
					onUIChanged();
				}

				scope.$on("$destroy", function(){
					ctrl.destroyTable();
				});

				element.on("$destroy", function(){
					scope.$destroy();
				});

				function onUIChanged(){
					//debug("onUIChanged...");
					ctrl.storeNgRepeatComment(element);
					_injects.$timeout(function(){
						if(firstLoad) {
							ctrl.initTable(element);
							element.css("visibility", "visible");
							firstLoad = false;
						} else {
							ctrl.updateTable();
						}
					});
				}

			}
		}
	}
}

UilaTableSecondDirective.inject(['$timeout']);

class UilaTableDirectiveWorker extends laygoon.util.BaseNgClass {
	constructor(...injects){
		super(...injects);
		this.oldTrs = null; // store the current UI trs element
		this.dtInstance = null; // a refrence that can access datatable api
		this.dtColumnDefs = [];
		this.sortFns = [];
		this.extraInfos = [];
	}

	get sourceData(){
		return this._sourceData;
	}

	// watch data change and update datatable
	set sourceData(newData){
		this._sourceData = newData;
		if(!newData){
			debug("set data with undefined");
			return;
		}

		if(this.dtInstance) {
			// this._data = this.prepareData(newData);
			this.data = this.sortData(newData);

		} else {
			this.data = newData;
		}

		if(this.data && this.data.length == 0) {
			// ngrepeat finish event won't fired when data length is 0, so we need to trigger it mannually
			this.$scope.$broadcast(this.$scope.$id + "uiChanged");
		}
	}

	setTableKey(key){
		this.tableKey = key;
	}

	// sort data with current order
	sortData(data){
		if(!this.dtInstance)
			return;

		let _data = data.slice(0);// copy source data
		let _self = this;
		let trs = this.table.find('>tbody').children().not(".child");
		let resultAry = [];
		trs.each(function(idx, tr){
			let keyIdx = $(tr).attr("key-idx");
			for(let i = 0; i < _data.length; i++) {
				if(_data[i][_self.tableKey] == keyIdx) {
					resultAry.push(_data[i]);
					_data.splice(i, 1);
					break;
				}
			}
		});

		//debug(resultAry, _data);
		resultAry = resultAry.concat(_data);

		if(!_data.length && resultAry.length <= this.data.length) {
			//debug("trigger uiChanged...")
			// _data.length means new data's keys all matched the existed trs.
			// new result ary length not larger than old data length means no new data enter
			// thus won't trigger ng-repeat on finish event, need to manually trigger "uiChanged" event
			this.$scope.$broadcast(this.$scope.$id + "uiChanged");
			
		}

		return resultAry;
	}

	// set column defination, see aoColumnDefs: http://legacy.datatables.net/usage/columns
	// note: if the same column is targeted multiple times in aoColumnDefs,
	// the first elements in the array will take the highest priority, and the last the lowest.
	setColumnDef(targetCol, settings) {
		settings["aTargets"] = targetCol;

		this.dtColumnDefs.push(settings);
	}

	setDTOption(settings) {
		this.dtOption = $.extend(this.dtOption, settings);
	}

	setSortFn(targetCol, sortFn) {
		this.sortFns[targetCol] = sortFn;
	}

	setExtraInfo(targetCol, extraInfo){
		this.extraInfos[targetCol] = extraInfo;
	}

	// store ngrepeat comment node(e.g. <!-- ngRepeat: elem in vm.data track by elem.id -->)
	// assisate with tr element, angular use these comments to track elements,
	// so restore these comments after sort DT
	storeNgRepeatComment(table){
		let ngRepeatTrs = $(table).find("tbody > tr[ng-repeat]");
		let tbody = $(table).find("tbody");
		let comments = tbody.contents().filter(function(){
			return this.nodeType == 8 && tbody[0] == this.parentNode;
		});
		ngRepeatTrs.each(function(idx, tr){
			let comment = comments[idx + 1];
			if(comment && comment.nodeType == 8) {
				$(tr).data("comment", comment);
			} else {
				debug("cannot find assosicate comment node");
			}
		});
	}

	initTable(table) {
		let _self = this;
		this.table = table;
		// this.oldTrs is for angular produced datatable's trs
		this.oldTrs = table.find('>tbody').children().not(".child");

		let tableSettings = {
			retrieve: true,
			"aoColumnDefs": this.dtColumnDefs
		}
		tableSettings = $.extend(tableSettings, this.dtOption);

		$(table).on('order.dt', function(event, tableSettings){
			// to prevent nested jq datatable event fired.
			if(tableSettings.nTable !== this)
				return;
			_self.restoreNgRepeatComment();
		});
		this.dtInstance = $(table).DataTable(tableSettings);
	}

	restoreNgRepeatComment(){
		let ngRepeatTrs = $(this.table).find("tbody > tr[ng-repeat]");

		ngRepeatTrs.each(function(idx, tr){
			let comment = $(tr).data("comment");
			$(comment).insertAfter(tr);
		});
	}

	updateTable(){
		// use rows().every() instead when datatable is 1.10.6+
		let table = this.dtInstance;
		table.rows().eq(0).each( function ( index ) {
			table.row( index ).invalidate(); // update row data
		} );

		this._updateTable();
	}

	_updateTable() {

		// Get the angular trs before dt's draw
		let trs = $(this.table).find('>tbody').children().not(".child");

		if(this.oldTrs && this.oldTrs.length == 0) {
			// have no data for last view, there will be a tr show "No data..."
			// exclude this tr
			if(trs[trs.length - 1].childNodes.length == 1) {
				Array.prototype.pop.call(trs);
			} else {
				debug("error when update table");
			}
		}

		let trsToBeRemoved = this.diffRows(this.oldTrs, trs),
			trsToBeAdded = this.diffRows(trs, this.oldTrs);

		this.dtInstance.rows(trsToBeRemoved).remove()
			.rows.add(trsToBeAdded)
			.draw();

		this.oldTrs = trs;
	}

	destroyTable(){
		this.dtInstance.destroy(true);
		//console.log("destroy table");
	}

	diffRows(oldTrs, newTrs){
		return $.grep(oldTrs, function(x) {return $.inArray(x, newTrs) < 0})
	}
}
UilaTableDirectiveWorker.inject(['$timeout', '$q', '$compile', '$scope']);