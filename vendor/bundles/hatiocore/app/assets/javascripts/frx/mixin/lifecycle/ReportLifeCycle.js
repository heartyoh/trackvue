Ext.define('Frx.mixin.lifecycle.ReportLifeCycle', {

	ReportEventHandler : function(handler) {
		return Ext.apply({
			click_print : this.onReportClickPrint
		}, handler);
	},

	/**
	 * callback on delete button click
	 *
	 * @view
	 */
	onReportClickPrint : function(view) {
		HF.print(view);
	}

});