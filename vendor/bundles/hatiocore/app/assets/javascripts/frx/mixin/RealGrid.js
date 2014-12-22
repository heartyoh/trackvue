Ext.define('Frx.mixin.RealGrid', function() {
	var registry = {};
	
	RealGrids.onload = function(id) {
		var handler = registry[id];
		
		if(handler) {
			handler.callback.call(handler.scope, id);
		} else {
			throw 'RealGrid (' + id + ') OnLoad Handler is Not Registered for ';
		}
	}
	
	function register(id, callback, scope) {
		registry[id] = {
			scope : scope,
			callback : callback
		};
	}
	
	function unregister(id) {
		delete registry[id];
	}

	return {
		realgrid : {
			register : register,
			unregister : unregister
		}
	};
}());
