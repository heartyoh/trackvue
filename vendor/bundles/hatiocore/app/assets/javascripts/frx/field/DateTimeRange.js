Ext.define('Frx.field.DateTimeRange', {
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['datetimerange'],

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
			xtype: 'datetimefield',
			name: this.name + '-gte',
			margin: '0 5 0 0',
			allowBlank: true,
			format: T('format.date')
		}, {
			xtype: 'datetimefield',
			name: this.name + '-lte',
			allowBlank: true,
			vtype: 'daterange',
	        startDateField: this.name + '-gte',
			format: T('format.date')
		}];
		
		this.callParent();
	}
});
