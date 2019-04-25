{
class UilaColumnDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";

		this.require = "^^uilaTable";
		this.transclude = true;
		this.template = "<th ng-transclude></th>";
		this.replace = true;

		this.setScope({
			// sort function for sorting the column, 
			// currently it only for make it consist with UI when dynimic update
			// if we use "data-order" attribute with sortFn, it has issue when cell is canvas
			// jquery.datatable.js line 6370
			// because "data-order" is equal to set mData on column and DT will copy cell html and failed to draw the canvas
			// besides, copy html is unnecessay since the html is already there.
			sortFn: '=' 
		});
	}

	link (scope, element, attr, uilaTable){
		let nodesList = $(element).parent().children(),
			colIdx = nodesList.index(element),
			settings = {};

		let sType = attr.sType,
			sClass = attr.sClass,
			bSortable = attr.bSortable,
			className = attr.className,
			sWidth = attr.sWidth,
			key = attr.key;

		if(sType != null)
			settings["sType"] = sType;
		if(sClass != null)
			settings["sClass"] = sClass;
		if(bSortable != null)
			settings["bSortable"] = bSortable == 'true';
		if(className != null)
			settings["className"] = className;
		if(sWidth != null)
			settings["sWidth"] = sWidth;

		uilaTable.setColumnDef(colIdx, settings);

		let sortFn = scope.sortFn;
		if(!sortFn && key) {
			sortFn = function(key){
				return function(elem){
					return elem[key];
				}
			}(key);
			//element.attr("sort-fn", true);
		} 

		uilaTable.setSortFn(colIdx, sortFn);
	}
}
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
			data: '=',
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

		tdArray.forEach(function(td){
			tbodyTr.append(td);
		});


		return {
			post: function(scope, element, attr, ctrl) {
				ctrl.setDTOption(ctrl.dtOptions);
				
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

	get data(){
		return this._data;
	}

	// watch data change and update datatable
	set data(newData){
		let _self = this;
		if(!newData){
			console.log("set data with undefined");
			return;
		}

		if(this.dtInstance) {
			// this._data = this.prepareData(newData);
			this._data = this.sortData(newData);

			this.$timeout(function(){
				_self.updateTable();
			});
		} else {
			this._data = newData;
		}
	}

	// sort data with current order
	sortData(data){
		if(!this.dtInstance)
			return;

		let _self = this;
		let order = this.dtInstance.order()[0];
		let col = order[0], dir = order[1];
		if(this.sortFns[col]) {
			let sortFn = this.sortFns[col];
			data.sort(function(a, b){
				let aa = sortFn(a, col),
					bb = sortFn(b, col);

				if(dir == "asc")
					return ((aa < bb) ? -1 : ((aa > bb) ?  1 : 0));
				if(dir == "desc")
					return ((bb < aa) ? -1 : ((bb > aa) ?  1 : 0));
			});
		}

		return data;
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

	updateTable() {

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

angular.module("uilaDatatable", [])

.directive("uilaTable", UilaTableFirstDirective.create())

.directive("uilaTable", UilaTableSecondDirective.create())

.directive("uilaColumn", UilaColumnDirective.create())

}
class UilaColumnFormatterDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		// make rowData, rowIdx, colIdx accessable
		this.setScope({
            rowIdx: '=', // which row
            colIdx: '=', // which col
            rowData: '='// rowData represents the datasource of the row
        });

        this.restrict = "E";
	}
}
// a base class to be used in setting DT options.
class UilaTableSettingsHelper extends laygoon.util.BaseNgClass {
	constructor(...injects) {
		super(...injects);

		// http://legacy.datatables.net/usage/options
		// http://legacy.datatables.net/usage/callbacks
		this.dtOptions = {
			dom: "tr",
			paging: false,
			fnCreatedRow: this.fnCreatedRow.bind(this),
			fnInitComplete: this.fnInitComplete.bind(this),
			fnDrawCallback: this.fnDrawCallback.bind(this),
			rowCallback: this.rowCallback.bind(this)
		}
	}

	// override dt options so that we can customize dtoptions
	setOptions(setting) {
		this.dtOptions = $.extend(this.dtOptions, setting);
	}

	/* below methods are mapping DT apis and to be overriden */
	myRenderer (api, rowIdx) {

	}

	fnCreatedRow(nRow, aData, iDataIndex) {
	}

	fnInitComplete(oSettings, json) {

	}

	fnDrawCallback(oSettings) {

	}

	rowCallback( row, data, index ) {

	}
}

class UilaResponsiveTableSettingsHelper extends UilaTableSettingsHelper {
	constructor(...injects) {
		super(...injects);

		this.setOptions({
			responsive: {
				details: {
					renderer: this.myRenderer.bind(this)
				}
			}
		});
	}
}