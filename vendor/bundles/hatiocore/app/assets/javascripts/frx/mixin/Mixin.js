Ext.define('Frx.mixin.Mixin', {
	mixin : function(clazz, config) {
		try {
			switch (typeof (clazz)) {
			case 'string':
				Ext.apply(HF, Ext.create(clazz, config));
				return;
			case 'object':
				Ext.apply(HF, clazz);
			}
		} catch (e) {
			HF.error(T('error.MIXIN', {
				clazz : clazz
			}), e);
		}
	}
});