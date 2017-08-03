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
				formatter = $(col).attr("formatter");		

			if(!formatter) {
				if(!key) {
					console.error("no key or formatter for table column");
					return;
				}
				tdArray.push("<td>{{ elem."+ key + "}}</td>");
			} else {
				tdArray.push('<td><'+ formatter + ' col-idx="'+ idx +'" row-idx="$index" row-data="elem" ' +
	                '></'+ formatter +'></td>');
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
			detailRenderer: '='
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
		let tbodyTr = tElem.find("tbody > tr"),
			trNgRepeat = 'elem in vm.data track by elem.'+ tAttrs.trackBy,
			tdArray = tElem.data("tdArray"),
			_injects = this;

		tbodyTr.attr("ng-repeat", trNgRepeat);

		tdArray.forEach(function(td){
			tbodyTr.append(td);
		});

		return {
			post: function(scope, element, attr, ctrl) {
				let dom = attr.dom,
					detailType = attr.detailType ? attr.detailType : 'column',
					paging = attr.paging == "true" ? true : false,
					pageLength = attr.pageLength;

				ctrl.setDTOption({
					"dom": dom,
					"paging": paging || true,
					"pageLength": pageLength
				});

				if(detailType)
					ctrl.detailType = detailType;

				_injects.$timeout(function(){
					ctrl.initTable(element);
				});
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
	}

	get data(){
		return this._data;
	}

	// watch data change and update datatable
	set data(newData){	
		let _self = this;
				
		if(this.dtInstance) {
			this._data = newData;

			this.$timeout(function(){
				_self.updateTable();
			});
		} else {
			this._data = newData;
		}
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

	initTable(table) {
		let _self = this;
		this.table = table;
		// this.oldTrs is for angular produced datatable's trs
        this.oldTrs = table.find('tbody').children().not(".child");
        
        let tableSettings = {
        	retrieve: true,
        	"aoColumnDefs": this.dtColumnDefs
        }
        tableSettings = $.extend(tableSettings, this.dtOption);

        if(_self.detailRenderer) {
        	tableSettings.responsive = {
		        details: {
		        	renderer: function(api, rowIdx){
		        		return _self.detailRenderer.call(this, api, rowIdx[0])
		        	}
		        }        		
        	}
        }
        console.log(tableSettings);
        this.dtInstance = $(table).DataTable(tableSettings);
	}

	updateTable() {
		// Get the angular trs before dt's draw
        let trs = $(this.table).find('tbody').children().not(".child");

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
UilaTableDirectiveWorker.inject(['$timeout', '$q', '$compile', '$scope', '$sce']);