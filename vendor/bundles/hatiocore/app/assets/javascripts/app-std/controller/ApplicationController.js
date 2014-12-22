Ext.define('App.controller.ApplicationController', {
	extend: 'Ext.app.Controller',

	requires : ['App.mixin.ErrorHandler'],

	stores : [ 'Menu', 'SubMenu' ],
	models : [ 'Menu' ],
	views : ['BrandBar', 'NavBar', 'RibonBar', 'SideBar', 'BottomBar', 'TitleBar', 'TopBar'],

	controllers : [
	'Frx.controller.ControlBar',
	'Frx.controller.SearchForm'
	],

	refs : [{
		selector : '#content',
		ref : 'content'
	}, {
		selector : '#title',
		ref : 'title'
	}, {
		selector : '#ribonbar',
		ref : 'ribonBar'
	}, {
		selector : '#sidebar',
		ref : 'sideBar'
	}],

	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportAfterRender
			},
			'#content' : {
				afterrender : this.onContentAfterRender,
				showcontent : this.onShowContent,
				add : this.onContentAdd,
				remove : this.onContentRemove
			},
			'#navbar dataview' : {
				itemclick : this.onMenuItemClick
			},
			'#ribonbar button' : {
				click : this.onTopLevelMenuClick
			},
			'#linkto_ops' : {
				click : this.onOpsLinkClick
			},
			'#logout' : {
				click : this.onLogoutClick
			}
		});

		App.getApplication().on('titlechange', this.onTitleChange, this);

		Ext.each(this.controllers, function(controller) {
			this.getController(controller);
		}, this);

		HF.mixin('App.mixin.ErrorHandler');

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.pageinfo'),
			cls : 'btnPageInfo',
			handler : function() {
				// Dependency 제거 해야 함. ==> Base 번들로 옮길 것.
				var resource = HF.current.resource();

				Ext.Ajax.request({
				    url: 'infographics/show_by_entity.json',
					method: 'GET',
				    params: {
						entity_type : HF.classify(resource.type),
						entity_id : resource.id
					},
				    success: function(response){
						HF.infographic(Ext.JSON.decode(response.responseText))
				    }
				});
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.print'),
			cls : 'btnPrint',
			handler : function() {
				var current = HF.current.view();

				if(!current) {
					return;
				}

				if(current instanceof Ext.tab.Panel) {
					var active = current.getActiveTab();
					active.fireEvent('click_print', active);
				} else {
					current.fireEvent('click_print', current);
				}
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.slideshow'),
			cls : 'btnSlideshow',
			handler : function() {
				// TODO 아래는 샘플 기능임.
				var resource = HF.current.resource();

				if(resource.id) {
					var store = Ext.create('Base.store.Attachment');

					store.load({
						params : {
							'_q[on_type-eq]' : HF.classify(resource.type),
							'_q[on_id-eq]' : resource.id,
							'_q[tag-eq]' : 'attachment'
						},
						callback : function(records, operation, success) {
							if(success) {
								HF.slideshow(Ext.Array.map(records, function(record) {
									return record.data;
								}));
							}
						}
					})
				} else {
					Ext.create('Frx.common.PageInfoPopup').show();
				}
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.enlarge'),
			cls : 'btnEnlarge',
			handler : function() {
				var header = Ext.getCmp('header');
				var navbar = Ext.getCmp('navbar');
				var body = Ext.getBody();

				if(header.isHidden()) {
					header.show();
					navbar.show();
					body.removeCls('fullscreen');
				} else {
					header.hide();
					navbar.hide();
					body.addCls('fullscreen');
				}
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.collapse_search'),
			cls : 'btnCollapseSearch',
			handler : function() {
				var content = Ext.getCmp('content');
				view = content.getLayout().getActiveItem();

				if(view) {
					var searchbar = view.down('searchform');
					if(searchbar) {
						searchbar[searchbar.isHidden() ? 'show' : 'hide']();
					}
				}
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.folding_sidebar'),
			cls : 'btnCollapseSidebar',
			handler : function() {
				var sidebar = Ext.getCmp('sidebar');
				sidebar[sidebar.isHidden() ? 'show' : 'hide']();
			}
		});

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.close'),
			cls : 'btnClose',
			handler : function() {
				var content = Ext.getCmp('content');
				var active = content.getLayout().getActiveItem();

				if(active) {
					content.remove(active);
				}
			}
		});

		HF.custom.statusbar({
			xtype : 'label',
			id : 'clock',
			text : new Date().toString(T('format.time'))
		});

		var clock;

		setInterval(function() {
			if(!clock) {
				clock = Ext.getCmp('clock');
			}
			if(clock) {
				clock.setText(new Date().toString(T('format.time')));
			}
		}, 1000);
	},

	onContentAdd : function(content, comp) {
		// sidebar에 supplement_view가 있으면, 추가한다.
		if(comp.supplementView) {
			this.getSideBar().add({
				xtype : comp.supplementView,
				itemId : comp.supplementView
			});
		}
	},

	onContentRemove : function(content, comp) {
		// sidebar에 supplement_view가 있으면, 제거한다.
		if(comp.supplementView) {
			this.getSideBar().remove(comp.supplementView);
		}

		var view = HF.current.view();

		if(view) {
			view.show();
			content.fireEvent('showcontent', content, view);
		} else {
			this.getSideBar().getLayout().setActiveItem('base');
			content.fireEvent('showcontent', content, null);
			App.getApplication().fireEvent('titlechange');
		}

		HF.history.add(view);
	},

	onViewportAfterRender : function() {
		var menuStore = Ext.getStore('Menu');
		menuStore.on('load', function(store) {
			var ribonBar = Ext.getCmp('ribonbar');
			ribonBar.removeAll();

			store.each(function(record) {
				// category가 TERMINAL이거나 hidden_flag가 true이면 메뉴에 보여주지 않는다.
				if(record.get('menu_type') == 'MENU' && record.get('category') != 'TERMINAL' && !record.get('hidden_flag')) {
					ribonBar.add({
						menu_id : record.get('id'),
						text : T('menu.' + record.get('name'))
					});
				}
			});

			// 현재 액티브 화면의 톱레벨 메뉴와 서브메뉴를 디스플레이 한다.
			var view = HF.current.view();
			if(view) {
				var menu = store.findRecord('template', view.itemId);

				// TODO 메뉴에 등록되지 않은 화면인 경우 대표 리소스 화면의 메뉴를 찾는 방법이 궁색하다. (Item으로 끝나는 경우 Item을 떼고 다시 찾아본다.)
				if(!menu && Ext.String.endsWith(view.itemId, 'Item')) {
					menu = store.findRecord('template', view.itemId.slice(0, -4));
				}

				if(menu) {
					var parent_menu_id = menu.get('parent_id');
					var topmenu = Ext.getCmp('ribonbar').down('[menu_id=' + parent_menu_id + ']');
					if(topmenu) {
						this.showSubMenus(topmenu, true);
					}
				} else {
					var first = ribonBar.items.first();
					if(first) {
						this.showSubMenus(first, true);
					}
				}
			} else {
				var first = ribonBar.items.first();
				if(first) {
					this.showSubMenus(first, true);
				}
			}
		}, this);

		menuStore.load();
	},

	onContentAfterRender : function(content) {
		// Ext.getStore('Favorite').load();

		// 첫 화면에 도메인에 지정된 Infographic을 보임
		Ext.Ajax.request({
		    url: 'infographics/show_by_entity.json',
			params : {
				entity_type : 'Domain'
			},
			method: 'GET',
		    success: function(response){
				var infographic = Ext.JSON.decode(response.responseText);

				var v = new Delo.Viewer({
					el : $('#dashboard')[0],
				    collection : new Delo.Document()
				});

				v.collection.load(infographic.diagram);
		    }
		});

		// 원할한 화면 레이아웃팅을 위해서 강제로 지연시킴.
		setTimeout(function() {
			if(!location.hash && Ext.util.Cookies.get('_anchor'))
				location.hash = Ext.util.Cookies.get('_anchor')

			Ext.util.Cookies.clear('_anchor', '/');

			HF.history.force();
		}, 1);

		// if(HF.setting.get('setting-folding_sidebar')) {
		// 	this.getSideBar().hide();
		// }
	},

	showSubMenus : function(button, prohibitAutoStartFirstMenu) {
		Ext.Array.each(this.getRibonBar().query('button'), function(button) {
			if(!button.hasCls('active'))
				return;
			button.removeCls('active');
			return false;
		});

		button.addCls('active');

		var parent_id = button.menu_id;

		var menuStore = Ext.getStore('Menu');
		var subMenuStore = Ext.getStore('SubMenu');
		var subMenus = [];
		menuStore.each(function(record) {
			if(record.get('parent_id') == parent_id && !record.get('hidden_flag')) {
				subMenus.push(record.data);
			}
		});
		subMenuStore.loadData(subMenus);

		Ext.getCmp('submenu_title').setText(button.getText());

		// Top Menu 가 선택되면, 첫번째 서브메뉴를 자동으로 시작한다.
		if(!prohibitAutoStartFirstMenu) {
			Ext.Array.each(subMenus, function(menu) {
				if(menu.menu_type !== 'SEPARATOR') {
					HF.show(menu.template);
					return false;
				}
				return true;
			});
		}
	},

	onTitleChange : function(view) {
		var active = this.getContent().getLayout().getActiveItem();
		if(!active) {
			this.getTitle().update({
				title : '',
				item : ''
			});
			return;
		}

		if(view === active) {
			this.getTitle().update({
				title : view ? view.title : '',
				item : view? view.itemname : ''
			});
		}
	},

	onShowContent : function(content, view) {
		if(!view) {
			var ribonBar = Ext.getCmp('ribonbar');

			var first = ribonBar.items.first();
			if(first) {
				this.showSubMenus(first, true);
			}

			return;
		}

		content.getLayout().setActiveItem(view);
		App.getApplication().fireEvent('titlechange', view);

		// sidebar에 supplement_view가 있으면, activate 시킨다.
		if(view.supplementView) {
			this.getSideBar().getLayout().setActiveItem(view.supplementView);
		} else {
			this.getSideBar().getLayout().setActiveItem('base');
		}

		// 현재 새로 추가된 화면과 관련된 TOP Level 메뉴와 서브메뉴를 표현한다.
		var menuStore = Ext.getStore('Menu');
		var menu = menuStore.findRecord('template', view.itemId);
		// TODO 메뉴에 등록되지 않은 화면인 경우 대표 리소스 화면의 메뉴를 찾는 방법이 궁색하다. (Item으로 끝나는 경우 Item을 떼고 다시 찾아본다.)
		if(!menu && Ext.String.endsWith(view.itemId, 'Item')) {
			menu = menuStore.findRecord('template', view.itemId.slice(0, -4));
		}

		if(menu) {
			var parent_menu_id = menu.get('parent_id');
			var topmenu = Ext.getCmp('ribonbar').down('[menu_id=' + parent_menu_id + ']');
			if(topmenu) {
				this.showSubMenus(topmenu, true);
			}
		} else {
			var ribonBar = Ext.getCmp('ribonbar');

			var first = ribonBar.items.first();
			if(first) {
				this.showSubMenus(first, true);
			}
		}
	},

	onTopLevelMenuClick : function(button) {
		this.showSubMenus(button);
	},

	onOpsLinkClick : function() {
		document.location.href = OPS_URL;
	},

	onLogoutClick : function() {
		HF.msg.confirm({
			msg : T('text.Sure to logout'),
			fn : function(confirm) {
				if (confirm === 'yes') {
					document.location.href = typeof(LOGOUT_URL) === 'undefined' ? 'logout?targetUrl=/' : LOGOUT_URL;
				}
			}
		});
	},

	onMenuItemClick : function(view, record, item, index, e, opt) {
		if(record.get('menu_type') !== 'SEPARATOR')
			HF.show(record.get('template'));
	}
});
