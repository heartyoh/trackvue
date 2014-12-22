Ext.define('App.view.TopBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'topbar',
	
	padding : '0 0 0 0',
	
	items : [ '->', {
		text : T('button.operating_studio'),
		id : 'linkto_ops',
		cls : 'linkto_ops'
	}, {
		text : T('button.logout'),
		id : 'logout',
		cls : 'linkto_logout'
	} ],
	
	initComponent : function() {
		this.callParent();
		
		Ext.Array.each(HF.custom.topbar(), function(component) {
			try {
				this.insert(1, component);
			} catch (e) {
				HF.error(T('error.CUSTOM-TOPBAR-FAILURE', {
					view : component
				}), e);
			}
		}, this);
	}
});
