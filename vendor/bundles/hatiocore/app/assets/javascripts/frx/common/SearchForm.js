Ext.define('Frx.common.SearchForm', {
	
	extend : 'Ext.form.Panel',
	
	xtype : 'searchform',
	
	dock : 'top',
	
	cls : 'searchForm',
	
	autoScroll : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
		
	rbar : { 
		xtype : 'controlbar', 
		width : 75,
		layout : {
			type : 'hbox',
			align : 'middle'
		},
		padding : '0 3 0 3',
		items : ['search','reset'] 
	},
	
	initComponent : function() {
		var items = this.items || [];
		this.items = [];
		
		var row;
		Ext.Array.each(items, function(item) {
			if(!row) {
				row = {
					xtype : 'container',
					defaults : {
						margin : 3,
						xtype : 'textfield'
					},
					layout : {
						type : 'hbox',
						align : 'stretch'
					},
					items : []
				};
			}
			
			if(item === '-') {
				item = {
					xtype : 'container'
				}
			}
			
			item.flex = 1;

			row.items.push(item);
			
			if(row.items.length == 2) {
				this.items.push(row);
				row = null;
			}
		}, this);
		
		if(row) {
			row.items.push({
				xtype : 'container',
				flex : 1
			});
			this.items.push(row)
		}
		
		this.callParent();
	}

});