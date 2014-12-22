Ext.define('Frx.mixin.Should', function() {
	function raise(code, param, who) {
		var err = {
			msg : T('error.' + code, param),
			issuedAt : new Date(),
			sourceMethod : (who ? who.$name : undefined),
			sourceClass : ((who && who.$owner) ? who.$owner.$className : undefined)
		};

		Ext.Error.raise(err);
	}
	
	var should_be = function(v1, v2) {
		if(v1 !== v2) 
			raise('SHOULD_BE', {
				v1 : v1,
				v2 : v2
			}, should_be.caller);
	}
	
	var should_not_be = function(v1, v2) {
		if(v1 === v2) 
			raise('SHOULD_NOT_BE', {
				v1 : v1,
				v2 : v2
			}, should_not_be.caller);
	}
	
	var should_be_a_type_of = function(value, type) {
		if(type instanceof Array) {
			if(type.indexOf(typeof(value)) === -1) {
				raise('SHOULD_BE_A_TYPE_OF', {
					value : value,
					type : type
				}, should_be_a_type_of.caller);
			}
		} else {
			if(typeof(value) !== type) {
				raise('SHOULD_BE_A_TYPE_OF', {
					value : value,
					type : type
				}, should_be_a_type_of.caller);
			}
		}
	}
	
	var should_be_a_instance_of = function(value, type) {
		should_be_a_type_of(value, 'object');
		
		if(type instanceof Array) {
			Ext.Array.each(type, function(t) {
				if(!(value instanceof t))
					raise('SHOULD_BE_A_INSTANCE_OF', {
						value : value,
						type : type
					}, should_be_a_instance_of.caller);
			});
		} else {
			if(!(value instanceof type))
				raise('SHOULD_BE_A_INSTANCE_OF', {
					value : value,
					type : type
				}, should_be_a_instance_of.caller);
		}
	}
	
	function should_not_be_empty(value) {
		if(value instanceof Array && value.length === 0)
			raise('SHOULD_NOT_BE_EMPTY', {
				value : value
			}, should_not_be_empty.caller);
		if(!value)
			raise('SHOULD_NOT_BE_EMPTY', {
				value : value
			}, should_not_be_empty.caller);
	}
	
	return {
		should : {
			be : should_be,
			not_be : should_not_be,
			be_same : should_be,
			be_a : should_be_a_instance_of,
			be_a_instance_of : should_be_a_instance_of,
			be_a_type_of : should_be_a_type_of,
			not_be_empty : should_not_be_empty
		}
	};
}());