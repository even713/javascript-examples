class UilaColumnDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";
		this.scope = {
			key: '@',
			formatter: '@'
		}

		this.require = "^^uilaTable";
		this.transclude = true;
		this.template = "<th ng-transclude></th>";
		this.replace = true;
	}

	link (scope, element, attr, uilaTable){
		if(!scope.formatter) {
			if(!scope.key) {
				console.error("no key or formatter for table column");
				return;
			}
			uilaTable.addTd('{{ elem.'+ scope.key +'}}');
		} else {
			let nodesList = $(element).parent().children(),
				colIdx = $(element).index(nodesList);
			
			uilaTable.addTd('<'+ scope.formatter + ' row-data="person" ' +
                'row-idx="$$index" col-idx="'+ colIdx +'"></'+ scope.formatter +'>', scope.formatter);
		}
	}
}