Ext.define('App.view.TitleBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'titlebar',
	
	cls : 'titlebar',
	
	padding : '0 0 0 0',
	
	items : [ {
		xtype : 'component',
		id : 'title',
		tpl : '<div class="title">{title}<span>{item}</span></div>'
	}, '->' ],
	
	initComponent : function() {
		this.callParent();
		
		Ext.Array.each(HF.custom.titlebar(), function(component) {
			try {
				this.add(component);
			} catch (e) {
				HF.error(T('error.CUSTOM-TITLEBAR-FAILURE', {
					view : component
				}), e);
			}
		}, this);
	}
});