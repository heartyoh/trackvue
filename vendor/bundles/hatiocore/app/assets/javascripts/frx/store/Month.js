Ext.define('Frx.store.Month', {
	
	extend : 'Ext.data.Store',
	
	autoLoad : true,
	
	fields: [
		{ name : 'name', type : 'string' },
		{ name : 'value', type : 'string' }
	],
	
	data : [
		{"name" : "01", "value" : "01" },
		{"name" : "02", "value" : "02" },
		{"name" : "03", "value" : "03" },
		{"name" : "04", "value" : "04" },
		{"name" : "05", "value" : "05" },
		{"name" : "06", "value" : "06" },
		{"name" : "07", "value" : "07" },
		{"name" : "08", "value" : "08" },
		{"name" : "09", "value" : "09" },
		{"name" : "10", "value" : "10" },
		{"name" : "11", "value" : "11" },
		{"name" : "12", "value" : "12" }
    ]
});