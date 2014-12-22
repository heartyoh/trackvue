Ext.Loader.setConfig({
    enabled : true,
    paths : {
		'Frx' : 'assets/frx',
		'ux' : 'assets/ux'
    },
	bundleRoot : 'assets/bundle/'
});

Ext.require(['App.Framework']);

Ext.onReady(function() {
	Ext.application({
		appFolder: 'assets/app-std',
	    autoCreateViewport: true,
	    name: 'App',

		controllers : Ext.Array.merge(['ApplicationController'], App.bundleControllers),

	    launch: function() {
		}
	});
});
