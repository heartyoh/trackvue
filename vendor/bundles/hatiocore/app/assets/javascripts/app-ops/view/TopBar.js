Ext.define('App.view.TopBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'topbar',
	
	padding : '0 0 0 0',
	
	items : [ '->' ],
	
	initComponent : function() {
		this.callParent();

		if(!login.operator_flag) {
			this.add({
				text : T('button.standard_platform'),
				id : 'linkto_std'
			});
		}

		this.add({
			text : T('button.logout'),
			id : 'logout'
		});
		

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
})