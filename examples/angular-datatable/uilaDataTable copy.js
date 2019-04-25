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

		this.template = `<table>
			<thead>
		        <tr>
		        	<th ng-repeat="th in vm.ths">{{th}}</th>
        		</tr>
			</thead>
			<tbody>
				<tr>
					<td ng-repeat="key in vm.tds" >{{key}}</td>
				</tr>
			</tbody>
		</table><ng-transclude></ng-transclude>`;
	}

	link (scope, element, attr, ctrl) {
		ctrl.initTrRepeat();
		element.find("tbody>tr:first-child").attr("ng-repeat", ctrl.trRepeat);
	}
}

class UilaTableDirectiveWorker extends laygoon.util.BaseNgClass {
	constructor(...injects){
		super(...injects);
		this.ths = [];
		this.tds = [];
	}

	addTh(title) {
		this.ths.push(title);
		// this.ths += "<th>"+ title +"</th>";
		//this.element.find("thead tr").append("<th>"+ title +"</th>");
	}

	addTd(key) {
		// this.tds += "<td>{{ elem."+ key +" }}</td>";
		// this.tds.push(key);
		this.tds.push('{{ elem.'+ key +'}}');
	}

	initTrRepeat() {	
		this.trRepeat = 'elem in vm.data track by elem.'+ this.trackBy;
	}
}
//UilaTableDirectiveWorker.inject(['$sce']);

class UilaColumnDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";
		this.scope = {
			key: '@'
		}

		this.require = "^^uilaTable";
		// this.transclude = true;
	}

	link (scope, element, attr, uilaTable){
		uilaTable.addTh(element.text());
		uilaTable.addTd(scope.key)
		// element.
	}
}

angular.module("uilaDatatable", [])

.directive("uilaTable", UilaTableDirective.create())

.directive("uilaColumn", UilaColumnDirective.create());

