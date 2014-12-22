Ext.define('App.view.Viewport', {
	extend : 'Ext.container.Viewport',
	
	layout : 'border',
	
	id : 'viewport',
	
	items : [ {
		xtype : 'container',
		id : 'header',
		region : 'north',
		layout : {
			type : 'hbox',
			align : 'stretch'
		},
		items : [ {
			xtype : 'brandbar',
			id : 'brandbar',
			width : 160
		}, {
			xtype : 'container',
			flex : 1,
			layout : {
				type : 'vbox',
				align : 'stretch'
			},
			items : [ {
				xtype : 'topbar',
				id : 'topbar',
				height : 30
			}, {
				xtype : 'optionbar',
				id : 'optionbar',
				height : 55
			} ]
		} ]
	}, {
		xtype : 'container',
		layout : 'border',
		region : 'center',
		items : [{
			xtype : 'panel',
			id : 'navbar',
			region : 'west',
			layout : 'card',
			width : 90,
			items : [{
				xtype : 'favoritebar',
				id : 'favoritebar',
				vertical : true
			}], 
			dockedItems : [{
				xtype : 'button',
				text : T('button.favorite'),
				view : 'Base.view.favorite.Favorite',
				cls : 'btnFavoriteMore',
				dock : 'bottom',
				listeners : {
					afterrender : function(button) {
						Ext.defer(function() {
							if(Ext.getStore('Favorite').getCount() === 0) {
								HF.msg.tip(T('text.Setup Favorites First'), button);
							}
						}, 1000);
					}
				}
			}]
		}, {
			xtype : 'panel',
			region : 'center',
			layout : 'card',
			id : 'content',
			html : '<img src="' + (typeof(CONTENT_IMAGE_URL) == 'undefined' ? '' : CONTENT_IMAGE_URL) + '" alt="CONTENT IMAGE" align="middle"></img>',
			dockedItems : [{
				xtype : 'titlebar',
				id : 'titlebar',
				dock : 'top',
				height : 40
			}]
		}]
	}, {
		xtype : 'bottombar',
		region : 'south',
		height : 40
	} ]
});
