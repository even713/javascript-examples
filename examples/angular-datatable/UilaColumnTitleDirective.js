class UilaColumnTitleDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "E";

		//this.require = "^^uilaColumn";
		this.transclude = true;
		this.template = "<div ng-transclude></div>";
		this.replace = true;
	}

	link (scope, element, attr, uilaTableColumn){
		//uilaTable.addTd(scope.key);
	}
}