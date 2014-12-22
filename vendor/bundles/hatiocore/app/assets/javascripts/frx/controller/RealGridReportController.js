Ext.define('Frx.controller.RealGridReportController', {
	extend : 'Ext.app.Controller',

	EntryPoint : function() {
		var base = {
			paramschange : this.onParamsChange
		};

		if(arguments.length > 0) {
			Ext.each(arguments, function(arg) {
				Ext.apply(base, arg);
			});
		}

		return base;
	},
	EntryPointWith : function() {
		return this.EntryPoint.apply(this, arguments);
	},
	
	onParamsChange : function(view, params) {
		// Override This..
	}
});