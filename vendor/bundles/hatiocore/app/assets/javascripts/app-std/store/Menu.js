Ext.define('App.store.Menu', {
	extend : 'Ext.data.Store',
	
	model : 'App.model.Menu',
	
	autoLoad : false,
	
	remoteSort : true,
	
	pageSize : 10000,
	
  	proxy: {
		type: 'rest',
		url : 'menus',
		extraParams : { 'mode' : 'AUTH' },
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