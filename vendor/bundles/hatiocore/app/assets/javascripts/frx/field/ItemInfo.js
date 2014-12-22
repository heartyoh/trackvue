Ext.define('Frx.field.ItemInfo', {
	extend : 'Ext.form.FieldContainer',
	
	xtype : ['iteminfo'],

	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	// cls : 'timestamp',
	
	items : [ {
	// 	html : '<div class="itemInfo">item name<span>description</span></div>'
	// }, {
		xtype : 'fieldcontainer',
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [ { 
			xtype : 'textfield',
			name : 'name', 
			disabled : true, 
			format : T('format.datetime'),
			submitValue : false
		}, { 
			xtype : 'textfield', 
			name : 'description', 
			flex : 1,
			disabled : true, 
			submitValue : false
		} ]
	}, {
		xtype : 'timestamp'
	} ]
});