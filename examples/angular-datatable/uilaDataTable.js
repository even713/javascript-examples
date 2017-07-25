class UilaTableDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects){
		super(...injects);

		this.restrict = "EA";

		this.scope = {
			trackBy: '@',
			data: '='
		}

		this.controller = UilaTableDirectiveWorker.create();
		this.controllerAs = "vm";
		this.bindToController = true;
		this.transclude = true;
		this.replace = true;

		this.template = `<table>
			<thead>
		        <tr ng-transclude>
		        	
        		</tr>
			</thead>
			<tbody>
				<tr>
					<td ng-repeat="key in vm.tds" >{{key}}</td>
				</tr>
			</tbody>
		</table>`;
	}

	link (scope, element, attr, ctrl) {
		ctrl.compileTemplate(element).then(function(){
			ctrl.initTable(element);
		});
	}
}
//UilaTableDirective.inject(['$compile', '$timeout']);

class UilaTableDirectiveWorker extends laygoon.util.BaseNgClass {
	constructor(...injects){
		super(...injects);
		this.tds = [];
		this.oldTrs = null; // store the current UI trs element
		this.dtInstance = null; // a refrence that can access datatable api
		this.columns = [];
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

	sortData() {
		if(!this.dtInstance)
			return;

		//var order = this.dtInstance.order();
	}

	addTd(key) {
		this.columns.push(key);
		this.tds.push('{{ elem.'+ key +'}}');
	}

	// compile initial template
	compileTemplate(element) {
		let _injects = this,
			_ctrl = this;

		return _injects.$q(function(resolve, reject) {
			_injects.$timeout(function(){
				let trNgRepeat = 'elem in vm.data track by elem.'+ _ctrl.trackBy;			
				element.find("tbody>tr:first-child").attr("ng-repeat", trNgRepeat);
				element.find("[ng-transclude]").removeAttr("ng-transclude");
				element.find("tbody td[ng-repeat]").removeAttr("ng-repeat");

				_injects.$compile(element.contents())(_injects.$scope);

				_injects.$timeout(function(){
					resolve(element);
				});
			})
		});		
	}

	initTable(table) {
		this.table = table;
        this.oldTrs = table.find('tbody').children().not(".child");
        this.dtInstance = $(table).DataTable();
        // {
        //     responsive: true,
        //     retrieve: true
        // }
	}

	updateTable() {
        let trs = $(this.table).find('tbody').children().not(".child"),
        	trsToBeRemoved = this.diffRows(this.oldTrs, trs),
        	trsToBeAdded = this.diffRows(trs, this.oldTrs);

        this.dtInstance.rows(trsToBeRemoved).remove()
                .rows.add(trsToBeAdded)
                .draw();

        this.oldTrs = $(this.table).find('tbody').children().not(".child");
	}

	diffRows(oldTrs, newTrs){
	    return $.grep(oldTrs, function(x) {return $.inArray(x, newTrs) < 0})
	} 
}
UilaTableDirectiveWorker.inject(['$timeout', '$q', '$compile', '$scope']);

class UilaColumnDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";
		this.scope = {
			key: '@'
		}

		this.require = "^^uilaTable";
		this.transclude = true;
		this.template = "<th ng-transclude></th>";
		this.replace = true;
	}

	link (scope, element, attr, uilaTable){
		uilaTable.addTd(scope.key);
	}
}

angular.module("uilaDatatable", [])

.directive("uilaTable", UilaTableDirective.create())

.directive("uilaColumn", UilaColumnDirective.create());

