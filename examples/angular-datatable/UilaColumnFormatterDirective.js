class UilaColumnFormatterDirective extends laygoon.util.BaseDirectiveClass {
	constructor(...injects) {
		super(...injects);

		// make rowData, rowIdx, colIdx accessable
		this.setScope({
            rowData: '=',// rowData represents the datasource of the row
            rowIdx: '=', // which row
            colIdx: '=' // which col
        });

        this.restrict = "E";
	}
}