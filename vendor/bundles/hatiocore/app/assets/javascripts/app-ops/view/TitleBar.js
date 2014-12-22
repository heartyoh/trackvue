Ext.define('App.view.TitleBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'titlebar',
	
	items : [ {
		xtype : 'component',
		id : 'title',
		tpl : '<div class="title">{title}<span>{item}</span></div>'
	}, '->', {
		xtype : 'button',
		id : 'favtog',
		tooltip : T('button.favtog')
	}, {
		xtype : 'button',
		tooltip : T('button.menu'),
		id : 'show_menubar'
	} ],

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
})