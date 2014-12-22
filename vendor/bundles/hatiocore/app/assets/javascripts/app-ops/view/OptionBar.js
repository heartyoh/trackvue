Ext.define('App.view.OptionBar', {
	extend : 'Ext.toolbar.Toolbar',
	
	xtype : 'optionbar',
	
	items : ['->'],
	
	initComponent : function() {
		this.callParent();

		Ext.Array.each(HF.custom.optionbar(), function(component) {
			try {
				var cmp = this.add(component);
				if(cmp.setValue) {
					cmp.setValue(HF.setting.get(cmp.name));
					HF.setting.on(cmp.name, function(value) {
						cmp.setValue(value);
					});
				}
				cmp.on('change', function(field, value) {
					HF.setting.set(cmp.name, value);
				});
			} catch (e) {
				HF.error(T('error.CUSTOM-OPTIONBAR-FAILURE', {
					view : component
				}), e);
			}
		}, this);
	}
})