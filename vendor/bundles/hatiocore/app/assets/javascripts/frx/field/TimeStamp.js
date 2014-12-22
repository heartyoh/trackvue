Ext.define('Frx.field.TimeStamp', {
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['timestamp'],

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	cls : 'timestamp',
	
	items : [ {
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		
		defaults : {
			xtype : 'fieldcontainer',
			layout : {
				type : 'hbox',
				align : 'stretch'
			},
			flex : 1
		},

		items : [ {
			fieldLabel : T('label.created'),
			items : [ { 
				xtype : 'datefield', 
				name : 'created_at', 
				flex : 1,
				disabled : true, 
				format : T('format.datetime'),
				submitValue : false
			}, { 
				xtype : 'objectfield', 
				name : 'creator', 
				flex : 1,
				disabled : true, 
				submitValue : false
			} ]
		},  {
			fieldLabel : T('label.updated'),
			items : [ { 
				xtype : 'datefield', 
				name : 'updated_at', 
				flex : 1,
				disabled : true, 
				format : T('format.datetime'),
				submitValue : false
			}, { 
				xtype : 'objectfield', 
				name : 'updater', 
				flex : 1,
				disabled : true, 
				submitValue : false
			} ]
		} ]
	}]
});