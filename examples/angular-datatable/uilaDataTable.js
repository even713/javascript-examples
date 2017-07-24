class UilaTableDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects){
		super(...injects);

		this.restrict = "EA";

		this.scope = {
			trackBy: '@',
			data: '='
		}

		//this.replace = true;
		this.controller = UilaTableDirectiveWorker.create();
		this.controllerAs = "vm";
		this.bindToController = true;

		// this.template = "<div>{{vm.ths}}<br/>{{vm.tds}}</div><ng-transclude></ng-transclude>";

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
		var _injects = this;

		// ctrl.element = element;
		ctrl.initTrRepeat();

		_injects.$timeout(function(){			
			element.find("tbody>tr:first-child").attr("ng-repeat", ctrl.trRepeat);
			element.find("[ng-transclude]").removeAttr("ng-transclude");
			element.find("tbody td[ng-repeat]").removeAttr("ng-repeat");

			var p = _injects.$compile(element.contents())(scope);

			_injects.$timeout(function(){
				ctrl.initTable(element);
			}, 0);
		}, 0);
	}
}
UilaTableDirective.inject(['$compile', '$timeout']);

class UilaTableDirectiveWorker extends laygoon.util.BaseNgClass {
	constructor(...injects){
		super(...injects);
		this.tds = [];
		this.oldTrs = null; // store the current UI trs element
	}

	get data(){
		return this._data;
	}

	set data(newData){
		let firstLoad = this._data ? false : true,
			_self = this;

		this._data = newData;
				
		if(!firstLoad) {
			this.$timeout(function(){
				_self.updateTable();
			}, 0);
		}
	}

	addTd(key) {
		this.tds.push('{{ elem.'+ key +'}}');
	}

	initTrRepeat() {	
		this.trRepeat = 'elem in vm.data track by elem.'+ this.trackBy;
	}

	initTable(table) {
		this.table = table;
        this.oldTrs = table.find('tbody').children().not(".child");
        $(table).dataTable();
        // {
        //     responsive: true,
        //     retrieve: true
        // }
	}

	updateTable() {
		debugger;
        let dt = $(this.table).DataTable(),
            trs = $(this.table).find('tbody').children().not(".child"),
        	trsToBeRemoved = this.diffRows(this.oldTrs, trs),
        	trsToBeAdded = this.diffRows(trs, this.oldTrs);

        dt.rows(trsToBeRemoved).remove()
                .rows.add(trsToBeAdded);

        this.oldTrs = $(this.table).find('tbody').children().not(".child");
	}

	diffRows(oldTrs, newTrs){
	    return $.grep(oldTrs, function(x) {return $.inArray(x, newTrs) < 0})
	} 
}
UilaTableDirectiveWorker.inject(['$timeout']);

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

