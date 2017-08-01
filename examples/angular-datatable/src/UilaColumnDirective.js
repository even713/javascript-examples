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

		let sType = attr.sType,
			sClass = attr.sClass,
			bSortable = attr.bSortable,
			className = attr.className;

		if(sType != null)
			settings["sType"] = sType;
		if(sClass != null)
			settings["sClass"] = sClass;
		if(bSortable != null)
			settings["bSortable"] = bSortable == 'true';
		if(className != null)
			settings["className"] = className;

		uilaTable.setColumnDef(colIdx, settings);
	}
}