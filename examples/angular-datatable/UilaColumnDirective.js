class UilaColumnDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		this.restrict = "EA";

		this.require = "^^uilaTable";
		this.transclude = true;
		this.template = "<th ng-transclude></th>";
		this.replace = true;
	}

	link (scope, element, attr, uilaTable){
		let nodesList = $(element).parent().children(),
			colIdx = nodesList.index(element),
			settings = {};

		let type = attr.type,
			notSortable = attr.notSortable;

		if(type != null)
			settings["sType"] = type;
		if(css != null)
			settings["sClass"]
		if(notSortable != null)
			settings["bSortable"] = false;

		uilaTable.setColumnDef(colIdx, settings);
	}
}