Ext.define('App.view.Viewport', {
	extend : 'Ext.container.Viewport',
	
	layout : 'border',
	
	id : 'viewport',
	
	items : [ {
		xtype : 'container',
		id : 'header',
		region : 'north',
		height : 60,
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [{
			xtype : 'brandbar',
			id : 'brandbar',
			width : 170
		}, {
			xtype : 'container',
			flex : 1,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [{
				xtype : 'topbar',
				id : 'topbar',
				height : 30
			}, {
				xtype : 'ribonbar',
				id : 'ribonbar',
				height : 30
			}]
		}]
	}, {
		xtype : 'navbar',
		id : 'navbar',
		region : 'west',
		width : 170,
		vertical : true
	}, {
		xtype : 'sidebar',
		id : 'sidebar',
		cls : 'sidebar',
		region : 'east',
		vertical : true,
		width : 200
	}, {
		xtype : 'bottombar',
		region : 'south',
		height : 30
	}, {
		xtype : 'panel',
		region : 'center',
		layout : 'card',
		id : 'content',
		// items : [{ /* Dashboard 클래스를 만들고, 다른 뷰들과 동일한 방법으로 올리자. 크고 작은 문제를 야기시키니까.*/
		// 	xtype : 'component',
		// 	title : 'Dashboard',
		// 	html : '<div id="dashboard"></div>'
		// }],
		dockedItems : [{
			xtype : 'titlebar',
			id : 'titlebar',
			cls : 'titlebar',
			dock : 'top',
			height : 25
		}]
	} ]
});
