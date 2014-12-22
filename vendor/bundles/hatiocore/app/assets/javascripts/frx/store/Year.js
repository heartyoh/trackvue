Ext.define('Frx.store.Year', {
	
	extend : 'Ext.data.Store',
	
	autoLoad : true,
	
	fields: [
		{ name : 'name', type : 'string' },
		{ name : 'value', type : 'string' }
	],
	
	// TODO 수정 필요
	data : [
		{"name" : "" + new Date().getFullYear() - 4, "value" : new Date().getFullYear() - 4 },
		{"name" : "" + new Date().getFullYear() - 3, "value" : new Date().getFullYear() - 3 },
		{"name" : "" + new Date().getFullYear() - 2, "value" : new Date().getFullYear() - 2 },
		{"name" : "" + new Date().getFullYear() - 1, "value" : new Date().getFullYear() - 1 },
		{"name" : "" + new Date().getFullYear(), "value" : new Date().getFullYear() },
		{"name" : "" + (new Date().getFullYear() + 1), "value" : (new Date().getFullYear() + 1) }
    ]
});