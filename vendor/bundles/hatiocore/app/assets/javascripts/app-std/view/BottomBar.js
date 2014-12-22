Ext.define('App.view.BottomBar', {
	extend : 'Ext.container.Container',
	
	xtype : 'bottombar',
	
	cls : 'bottombar',
	
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	
	items : [{
		xtype : 'progressbar',
		id : 'progressbar',
		width : 160,
		margin : '5 5 5 5'
	}, {
		xtype : 'statusbar',
		id : 'statusbar',
		flex : 1,
		autoClear : 7000,
		defaultText : '',
		text : T('text.Welcome Ment')
	}]

});