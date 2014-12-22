Ext.syncRequire(['Ext.data.Store', 'Ext.data.proxy.LocalStorage']);

Ext.define('Frx.mixin.LocalStore', function() {
	var store = Ext.create('Ext.data.Store', {
		fields : [{
			name : 'id',
			type : 'string'
		}, {
			name : 'value',
			type : 'auto'
		}],
        proxy: {
            type: 'localstorage',
            id  : 'hatio-settings'
        },
		autoSync : true
	});
	
	function getSettingsObject(filterFn) {
		var obj = {};
		
		if(filterFn) {
			store.each(function(record) {
				var id = record.get('id');
				var value = record.get('value');
				if(filterFn(id, value))
					obj[id] = value;
			});
		} else {
			store.each(function(record) {
				obj[record.get('id')] = record.get('value');
			});
		}

		return obj;
	}
	
	function getLocalStore(name) {
		var record = store.getById(name);
		if(record)
			return record.get('value');
		else
			return undefined;
	}
	
	function setLocalStore(name, value) {
		var record = store.getById(name);

		if(!record) {
			store.add({
				id : name,
				value : undefined
			});
			record = store.getById(name);
		}
		
		var old = record;

		record.set('value', value);
		record.commit();
		
		return old;
	}
	
	Ext.define('mixin.LocalStore.Inner', {
		mixins: {
			observable : 'Ext.util.Observable'
		},
		
		constructor: function (config) {
	        this.mixins.observable.constructor.call(this, config);
	    },
	
		set : function(id, val) {
			var old = setLocalStore(id, val);
			this.fireEvent(id, val, old);
		},
		
		get : function(id) {
			return getLocalStore(id);
		},
		
		all : function(filterFn) {
			return getSettingsObject(filterFn);
		}
	});
	
	try {
		store.load();
	} catch(e) {
		/* 잘못된 형식의 local cache인 경우 로컬스토리지를 클리어시킴 */
		store.getProxy().clear();
		store.load();
		
		// TODO 지금 시점에는 HF 객체가 생성되지 않음. 수정할 것.
		HF.error(T('error.LOCALSTORE-LOAD-FAILURE'), e);
	}

	return {
		setting : Ext.create('mixin.LocalStore.Inner')
	};
}());
