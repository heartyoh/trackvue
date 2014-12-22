Ext.define('App.store.Menu', {
	extend : 'Ext.data.Store',
	
	model : 'App.model.Menu',
	
	autoLoad : false,
	
	remoteSort : true,
	
  	proxy: {
		type: 'rest',
		url : 'menus',
		extraParams : {'_q[category-eq]' : 'TERMINAL', '_q[menu_type-eq]' : 'SCREEN'},
		format : 'json',
	    reader: {
			type: 'json',
			root: 'items',
			successProperty : 'success',
			totalProperty : 'total'			
        },
        writer: {
			type: 'json',
			root : 'items'
        }
	},
	
	sorters: [{
		property: 'rank',
		direction: 'ASC'
	}]
});