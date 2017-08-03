
angular.module("uilaDatatable", ['ngSanitize'])

.directive("uilaTable", UilaTableFirstDirective.create())

.directive("uilaTable", UilaTableSecondDirective.create())

.directive("uilaColumn", UilaColumnDirective.create())

// TODO: combine js to hide variable, create service to get columnformatter, tablehelper etc

// a base class to be used in setting DT options.
class UilaTableSettingsHelper extends laygoon.util.BaseNgClass {
	constructor(...injects) {
		super(...injects);

		// http://legacy.datatables.net/usage/options
		// http://legacy.datatables.net/usage/callbacks
		this.dtOptions = {
			dom: "tr",
			responsive: {
				details: {
					renderer: this.myRenderer.bind(this)
				}
			},
			fnCreatedRow: this.fnCreatedRow.bind(this)
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
		console.log(arguments);
	}
}