Ext.define('Frx.common.ControlBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'controlbar',

	dock : 'bottom',

	items : [ '->', 'close' ],

	initComponent : function() {
		var me = this;
		this.on('afterrender', this.afterrenderExe);
		this.items = Ext.Array.map(this.items, function(b) {
			if (typeof(b) === 'string' && b !== '-' && b !== '->' && b !== ' ') {
				return {
					text : T('button.' + b),
					itemId : Ext.String.uncapitalize(b),
					auth : me.getButtonAuth(b),
					minWidth : 75
				};
			}
			return b;
		});

		this.callParent();
	},

	getOwner : function() {
		return this.up();
	},
	
	afterrenderExe: function(obj, eOpts) {
		this.getMenuAuth(this);
		
		if(this.beforeUpObj) {
			this.authApply();
		}
	},
	
	getButtonAuth : function(buttonName) {
		if(!buttonName) {
			return '';
			
		} else if(buttonName == 'add' || buttonName == 'new' || buttonName == 'import' || buttonName == 'create') {
			return 'C';
			
		} else if(buttonName == 'update' || buttonName == 'save') {
			return 'U';
			
		} else if(buttonName == 'delete') {
			return 'D';
			
		} else if(buttonName == 'inquiry' || buttonName == 'show' || buttonName == 'export') {
			return 'R';
			
		} else {
			return '';
		}
	},
	
	authApply: function() {
		var me = this;
		var menuDatas = Ext.getStore("Menu").data.items;
		
		if(menuDatas.length == 0) {
			var task = new Ext.util.DelayedTask(function(){
			    me.authApply();
			});
			task.delay(500);
			
		} else {
			if(menuDatas[0].data) {
				for(var i = 0 ; i < menuDatas.length; i++) {
					if(this.beforeUpObj.itemId == menuDatas[i].data.template) {
						if(menuDatas[i].data.auth) {
							var authDatas = menuDatas[i].data.auth.split(",");
							
							if(authDatas.indexOf('C') == -1) {
								var createAuthButtons = me.query('button[auth=C]');
								me.hideButtons(createAuthButtons);
							} 
							
							if(authDatas.indexOf('U') == -1) {
								var updateAuthButtons = me.query('button[auth=U]');
								me.hideButtons(updateAuthButtons);
							} 
							
							if(authDatas.indexOf('D') == -1) {
								var deleteAuthButtons = me.query('button[auth=D]');
								me.hideButtons(deleteAuthButtons);
							}
						}
					}
				}
			} else {
				var task = new Ext.util.DelayedTask(function(){
				    me.authApply();
				});
				task.delay(500);
			}
		}
	},
	
	hideButtons : function(buttons) {
		Ext.Array.each(buttons, function(button) {
			button.hide();
		});
	},
	
	beforeUpObj: null,
	
	getMenuAuth: function(tarView) {
		try {
			if(!tarView) {
				return;
			}
			var upObj = tarView.up();
			if(upObj && upObj.id && upObj.id == 'content') {
				return;
			} else {
				this.beforeUpObj = upObj;
				this.getMenuAuth(upObj)
			}
		} catch(e) {
			return;
		}
	}
});