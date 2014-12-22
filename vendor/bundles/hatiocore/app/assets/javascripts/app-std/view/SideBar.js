Ext.define('App.view.SideBar', {
	extend : 'Ext.panel.Panel',

	xtype : 'sidebar',

	id : 'sidebar',

	layout : 'card',

	dockedItems : [{
		xtype : 'component',
		dock : 'top',
		height : 40,
		data : login,
		tpl : "<div class='sidebarInfo'>{current_domain_name}</div><span>{email}</span>"
	}],

	hidden : HF.setting.get('setting-folding_sidebar'),

	items : [ {
		xtype : 'container',
		itemId : 'base',
		layout : {
			type : 'vbox',
			align : 'stretch'
		},
		items : [ {
			xtype : 'label',
			text : 'Recent Views'
		}, {
			xtype : 'dataview',
			itemId : 'recentviews',
			autoScroll : true,
			height : 250,
			cls : 'recentviews',
			itemSelector : '.recentview',
			overItemCls : 'recentviews-item-hover',
			tpl : '<tpl for="."><div class="recentview">{title}<span>{itemname}</span></div></tpl>',
			store : Ext.create('Ext.data.Store', {
				fields: [
					{ name : 'title', type : 'string' },
					{ name : 'itemname', type : 'string' },
					{ name : 'view', type : 'auto' }
				]
			}),
			listeners : {
				render : function(dataview) {
					var content = Ext.getCmp('content');
					var handler = function(view) {
						var items = content.items;
						var last = dataview.store.first();

						if(last && last.get('view') === view) {
							last.set('title', view.title);
							last.set('itemname', view.itemname);

							return;
						}

						var links = [];
						items.each(function(i) {
							var link = {
								title : i.title,
								itemname : i.itemname,
								view : i
							};
							if(i.isVisible()) {
								links.unshift(link);
							} else {
								links.push(link);
							}
						});
						dataview.store.loadData(links);
					};

					App.getApplication().on('titlechange', handler);
				},
				itemclick : function(view, record, item, index, e, opt) {
					HF.show(record.get('view'));
				}
			}
		}, {
			xtype : 'label',
			text : 'Common Codes'
		}, {
			xtype : 'dataview',
			itemId : 'commoncodes',
			autoScroll : true,
			height : 150,
			cls : 'commoncodes',
			itemSelector : '.commoncode',
			overItemCls : 'commoncodes-item-hover',
			tpl : '<tpl for="."><div class="commoncode">{description}<button>add</button></div></tpl>',
			store : Ext.create('Ext.data.Store', {
				fields: [
					{ name : 'codename', type : 'string' },
					{ name : 'description', type : 'string' }
				]
			}),
			listeners : {
				render : function(dataview) {
					var content = Ext.getCmp('content');

					var handler = function(content, view) {
						var codes = [];

						if(view) {
							var fields = Ext.ComponentQuery.query('codecombo', view);

							for(var i = 0;i < fields.length;i++) {
                                var field = fields[i];
                                var label = field.fieldLabel

                                if(!label) {
                                    var csc = field.up('codesearchcombo')
                                    if(csc)
                                        label = csc.fieldLabel
                                }

								codes.push({
									codename : field.commonCode,
									description : label
								});
							}
						}

						dataview.store.loadData(codes);
					};

					content.on('showcontent', handler);
				},
				itemclick : function(view, record, item, index, e, opt) {
					if(e.target.tagName=='BUTTON') {
						Ext.Ajax.request({
						    url: 'common_codes/show_by_name.json',
							method : 'GET',
						    params: {
						        name : record.get('codename')
						    },
						    success: function(response){
								var obj = Ext.JSON.decode(response.responseText);
								HF.popup('Base.view.common_code.AddCommonCodePopup', obj);
						    }
						});
					} else {
						Ext.Ajax.request({
						    url: 'common_codes/show_by_name.json',
							method : 'GET',
						    params: {
						        name : record.get('codename')
						    },
						    success: function(response){
								var obj = Ext.JSON.decode(response.responseText);
								HF.show('Base.view.common_code.CommonCodeItem', {
									id : obj.id
								});
						    }
						});
					}
				}
			}
		}, {
			xtype : 'container',
			flex : 1,
			items : [ ]
		} ]
	} ]
});
