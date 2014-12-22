Ext.define('App.controller.ApplicationController', {
	extend: 'Ext.app.Controller',
	
	requires : ['App.mixin.ErrorHandler'],
	
	stores : [ 'Menu', 'Favorite' ],
	models : [ 'Menu', 'Favorite' ],
	views : [ 'BrandBar', 'TopBar', 'FavoriteBar', 'OptionBar', 'TitleBar', 'BottomBar' ],
	
	refs : [{
		selector : '#content',
		ref : 'content'
	}, {
		selector : '#favtog',
		ref : 'favTog'
	}, {
		selector : '#title',
		ref : 'title'
	}],
	
	init : function() {
		this.control({
			'viewport' : {
				afterrender : this.onViewportAfterRender
			},
			'#content' : {
				afterrender : this.onContentAfterRender,
				showcontent : this.onShowContent,
				remove : this.onContentRemove
			},
			'#navbar button' : {
				click : this.onShowButtonClick
			},
			'#linkto_std' : {
				click : this.onStdLinkClick
			},
			'#logout' : {
				click : this.onLogoutClick
			},
			'#show_menubar' : {
				click : this.onMenuBarClick
			},
			'#favtog' : {
				click : this.onFavTogClick
			}
		});
		
		HF.mixin('App.mixin.ErrorHandler');
		
		App.getApplication().on('titlechange', this.onTitleChange, this);

		HF.custom.titlebar({
			xtype : 'button',
			tooltip : T('button.folding_sidebar'),
			cls : 'btnCollapseSidebar',
			handler : function() {
				var navbar = Ext.getCmp('navbar');
				if(navbar) {
					navbar[navbar.isHidden() ? 'show' : 'hide']();
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
	
	onMenuBarClick : function() {
		var store = Ext.getStore('Menu');
		if(store.count() <= 0) {
			store.load();
		}

		var box = Ext.getCmp('content').getBox(true);
		HF.popup('Base.view.menu.MenuBar', null, {
			height : box.height - 118,
			x : box.width - 308,
			y : 92
		});
	},
	
	onContentRemove : function(content, comp) {
		var view = this.getContent().getLayout().getActiveItem();
		if(view)
			view.show();

		HF.history.add(view);
		
		App.getApplication().fireEvent('titlechange', view);
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
	
	onFavTogClick : function() {
		var view = this.getContent().getLayout().getActiveItem();

		var menustore = Ext.getStore('Menu');
		var favstore = Ext.getStore('Favorite');

		var menu = menustore.findRecord('template', Ext.getClassName(view));
		var fav = favstore.findRecord('template', Ext.getClassName(view));
		
		if(fav) {
			favstore.remove(fav);
		} else if(menu){
			// localstorage에 추가할 때는 모델의 id를 지정해주어서는 안된다.
			var data = Ext.clone(menu.data);
			delete data.id;
			fav = favstore.add(data);
		}
		
		this.getFavTog().setText(favstore.findRecord('template', Ext.getClassName(view)) ? 'Remove' : 'Add');
			
		this.changeEffect(Ext.getCmp('favoritebar'));
	},
	
	onViewportAfterRender : function() {
		if(HF.setting.get('setting-folding_sidebar')) {
			Ext.getCmp('navbar').hide();
		}

		var menuStore = Ext.getStore('Menu');
		menuStore.load();
	},
	
	onContentAfterRender : function() {
		var favStore = Ext.getStore('Favorite');		
		
		favStore.on('datachanged', function(store) {
			var favbar = Ext.getCmp('favoritebar');
			favbar.removeAll();
			
			store.each(function(record) {
				favbar.add({
					view : record.get('template'),
					text : record.get('alias'),
					tooltip : record.get('description') || record.get('alias'),
					icon : 'assets/menu/' + record.get('name') + '.png'
				});
			});
		});
		
		favStore.load();
		
		setTimeout(function() {
			if(!location.hash && Ext.util.Cookies.get('_anchor'))
				location.hash = Ext.util.Cookies.get('_anchor')

			Ext.util.Cookies.clear('_anchor', '/');
			
			HF.history.force();
		}, 1);
	},
	
	onShowContent : function(content, view) {
		content.getLayout().setActiveItem(view);
		App.getApplication().fireEvent('titlechange', view);
	},
	
	onShowButtonClick : function(button) {
		HF.show(button.view);
	},
	
	onStdLinkClick : function() {
		document.location.href = STD_URL;
	},
	
	onLogoutClick : function() {
		HF.msg.confirm({
			msg : T('text.Sure to logout'),
			fn : function(confirm) {
				if (confirm === 'yes') {
					document.location.href = typeof(LOGOUT_URL) === 'undefined' ? 'logout?targetUrl=/ops' : LOGOUT_URL;
				}
			}
		});
	},
	
	changeEffect : function(view) {
		var el = view.getEl();
		el.fadeOut({ opacity: 0.2, duration: 100}).fadeIn({ opacity: 1, duration: 200});
	}
});