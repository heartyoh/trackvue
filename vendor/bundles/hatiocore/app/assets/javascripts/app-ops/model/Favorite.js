Ext.define('App.model.Favorite', {
	extend: 'Ext.data.Model',

	fields: [{
		name: 'id',
		type: 'string'
	}, {
		name: 'name',
		type: 'string'
	}, {
		name: 'description',
		type: 'string'
	}, {
		name: 'domain_id',
		type: 'string'
	}, {
		name: 'parent_id',
		type: 'string'
	}, {
		name: 'template',
		type: 'string'
	}, {
		name: 'alias',
		type: 'string',
		convert: function(value, record) {
			return value || T('menu.' + record.get('name'));
		}
	}, {
		name: 'menu_type',
		type: 'string'
	}, {
		name: 'category',
		type: 'string'
	}, {
		name: 'rank',
		type: 'integer'
	}, {
		name: 'creator_id',
		type: 'string'
	}, {
		name: 'updater_id',
		type: 'string'
	}, {
		name: 'created_at',
		type: 'date'
	}, {
		name: 'updated_at',
		type: 'date'
	}, {
		name: '_cud_flag_',
		type: 'string'
	}],

	proxy: {
		type: 'localstorage',
		id: 'std-favorite'
	}
});
