// a base class to be used in setting DT options.
class UilaTableSettingsHelper extends laygoon.util.BaseNgClass {
	constructor(...injects) {
		super(...injects);

		// http://legacy.datatables.net/usage/options
		// http://legacy.datatables.net/usage/callbacks
		this.dtOptions = {
			dom: "tr",
			paging: false,
			fnCreatedRow: this.fnCreatedRow.bind(this),
			fnInitComplete: this.fnInitComplete.bind(this),
			fnDrawCallback: this.fnDrawCallback.bind(this),
			rowCallback: this.rowCallback.bind(this)
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
	}

	fnInitComplete(oSettings, json) {

	}

	fnDrawCallback(oSettings) {

	}

	rowCallback( row, data, index ) {

	}
}

class UilaResponsiveTableSettingsHelper extends UilaTableSettingsHelper {
	constructor(...injects) {
		super(...injects);

		this.setOptions({
			responsive: {
				details: {
					renderer: this.myRenderer.bind(this)
				}
			}
		});
	}
}