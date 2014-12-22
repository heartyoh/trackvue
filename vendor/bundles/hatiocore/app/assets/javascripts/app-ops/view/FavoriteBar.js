Ext.define('App.view.FavoriteBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'favoritebar',
	
	vertical : true,
	
	layout : {
		type : 'vbox',
		align : 'stretch'
	},
	
	defaults : {
		textAlign : 'center',
		iconAlign : 'top',
		minHeight : 64,
		scale : 'large'
	}
})