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
				tdArray.push('<td><'+ formatter + ' col-idx="'+ idx +'" row-idx="$index" row-data="elem" ' +
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
			fnCreatedRow: '='
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
				ctrl.setDTOption(ctrl.dtOptions);
				let trackBy = attr.trackBy;
				ctrl.setTableKey(trackBy);
				
				scope.finished = function(){
					_injects.$timeout(function(){
						ctrl.initTable(element);
						element.css("visibility", "visible");
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
	}

	// prepare data with data attribute for sorting etc.
	// prepareData(newData){
	// 	let _self = this;

	// 	if(!newData)
	// 		return false;

	// 	newData.forEach(function(d){
	// 		_self.sortFns.forEach(function(sortfn, idx){
	// 			if(sortfn) {
	// 				d[DATA_ORDER_PROP + idx] = sortfn(d, idx);
	// 			}
	// 		});
	// 	});
	// 	return newData;
	// }

	get sourceData(){
		return this._sourceData;
	}

	// watch data change and update datatable
	set sourceData(newData){				
		this._sourceData = newData;
		if(!newData){
			console.log("set data with undefined");
			return;
		}

		let _self = this;
		if(this.dtInstance) {
			// this._data = this.prepareData(newData);
			this.data = this.sortData(newData);

			this.$timeout(function(){
				_self.updateTable();
			});
		} else {
			this.data = newData;
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

		resultAry = resultAry.concat(data);

		// let _self = this;
		// let order = this.dtInstance.order()[0];
		// let col = order[0], dir = order[1];
		// if(this.sortFns[col]) {
		// 	let sortFn = this.sortFns[col];
		// 	data.sort(function(a, b){
		// 		let aa = sortFn(a, col),
		// 			bb = sortFn(b, col);

		// 		if(dir == "asc")
		// 			return ((aa < bb) ? -1 : ((aa > bb) ?  1 : 0));
		// 		if(dir == "desc")
		// 			return ((bb < aa) ? -1 : ((bb > aa) ?  1 : 0));
		// 	});
		// }

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

        console.log(tableSettings);
        this.dtInstance = $(table).DataTable(tableSettings);
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
        		console.log("error when update table");
        	}
        }

    	let trsToBeRemoved = this.diffRows(this.oldTrs, trs),
        	trsToBeAdded = this.diffRows(trs, this.oldTrs);

        this.dtInstance.rows(trsToBeRemoved).remove()
                .rows.add(trsToBeAdded)
                .draw();

        this.oldTrs = trs;
	}

	diffRows(oldTrs, newTrs){
	    return $.grep(oldTrs, function(x) {return $.inArray(x, newTrs) < 0})
	} 
}
UilaTableDirectiveWorker.inject(['$timeout', '$q', '$compile', '$scope']);