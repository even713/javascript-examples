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