Ext.define('Frx.field.ObjectField', {
	extend: 'Ext.form.field.Base',

	xtype : 'objectfield',
	
	valueToRaw : function(val) {
		return val ? val.name : ''
	}
});
