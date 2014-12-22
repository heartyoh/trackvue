Ext.define('Frx.common.ListView', {
	
	extend : 'Ext.grid.Panel',
	
	mixins : {
		spotlink : 'Frx.mixin.view.SpotLink'
	},
	
	requires : ['Ext.ux.CheckColumn'],
		
	verticalScroller : { variableRowHeight: true },
	
	selType : 'cellmodel', 
	
	selectionMode : 'MULTI',
	
	bbar : {
		xtype : 'pagingtoolbar',
		cls : 'pagingToolbar',
        displayInfo: true,
        displayMsg: T('text.Paging Toolbar Display Message'),
        emptyMsg: T('text.Paging Toolbar Empty Message'),
		hidden : true
	},
	
	initComponent : function() {
		/**
		 *	피상속 클래스의 플러그인 객체와 셀모델 객체는 공유되어서는 안된다.
		 */
		this.plugins = [ Ext.create('Ext.grid.plugin.CellEditing', {
			clicksToEdit : 1
		}) ];
		
		this.selModel = Ext.create('Ext.selection.CheckboxModel', { pruneRemoved : false, mode : this.selectionMode });
		
		this.callParent(arguments);
		
		this.on('afterrender', function(grid, eOpts) {
			var column = Ext.create('Ext.grid.column.Action', {
				xtype : 'actioncolumn', 
				width : 30, 
				align : 'center', 
				itemId : 'goto_item',
				items : [ { 
					icon : '/assets/std/iconDetail.png', 
					tooltip : T('tooltip.goto_item') 
				} ] 
			});
			grid.headerCt.insert(1, column);
		});
		
		var pagingtoolbar = this.down('pagingtoolbar');
		
		pagingtoolbar.bindStore(this.getStore());
		
		this.getStore().on('load', function(store) {
			if(store.getTotalCount() > store.getCount()) {
				pagingtoolbar.show();
			} else {
				pagingtoolbar.hide();
			}
		});
	}
});