Ext.define('App.view.BrandBar', {
	extend : 'Ext.Component',
	
	xtype : 'brandbar',
	
	html : '<img src="' + (typeof(BRAND_IMAGE_URL) == 'undefined' ? '' : BRAND_IMAGE_URL) + '" alt="BRAND IMAGE"></img><div class="brand_name">' + BRAND_NAME + '</div>'
});