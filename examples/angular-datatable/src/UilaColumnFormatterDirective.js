class UilaColumnFormatterDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		// make rowData, rowIdx, colIdx accessable
		this.setScope({
            rowIdx: '=', // which row
            colIdx: '=', // which col
            rowData: '='// rowData represents the datasource of the row
        });

        this.restrict = "E";
	}
}