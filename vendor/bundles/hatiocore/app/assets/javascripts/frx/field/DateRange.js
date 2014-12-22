Ext.define('Frx.field.DateRange', {
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['daterange'],

	layout : 'hbox',

	defaults : {
		flex : 1,
		hideLabel : true
	},

	initComponent : function() {
		this.fieldLabel = T('label.range', {
			t : this.fieldLabel
		});
		
		this.items = [{
			xtype: 'datefield',
			name: this.name + '-gte',
			margin: '0 5 0 0',
			allowBlank: true,
			format: T('format.date'),
			submitFormat : T('format.submitDate'),
			value : this.from_value
		}, {
			xtype: 'datefield',
			name: this.name + '-lte',
			allowBlank: true,
			vtype: 'daterange',
	        startDateField: this.name + '-gte',
			format: T('format.date'),
			submitFormat : T('format.submitDate'),
			value : this.to_value
		}];
		
		this.callParent();
	}
});
