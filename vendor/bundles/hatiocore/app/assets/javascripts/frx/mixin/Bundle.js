Ext.define('Frx.mixin.Bundle', function() {
	function loadBundleResource(path) {
		document.write('<script type="text/javascript" src="' + path + '/index.js"></script>');
	}
	
	function bundle(bundle_name, controllers) {
		var capitalized = Ext.String.capitalize(HF.camelize(bundle_name));
		var path = (Ext.Loader.getConfig().bundleRoot || 'assets/bundle/') + bundle_name;
		
		loadBundleResource(path);
		Ext.Loader.setPath(capitalized, path);
		
		Ext.Array.each(controllers, function(controller) {
			try {
				if(!App.bundleControllers) {
					App.bundleControllers = [];
				}
				App.bundleControllers.push(controller);
			} catch(e) {
				;
			}
		});
	}
	
	return {
		bundle : bundle
	};
}());
