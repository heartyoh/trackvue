function initLocalization(options) {
	options = options || {};
	options.scope = options.scope || this;
	options.language = options.language || getLocale();
	options.scope.zz_terms_zz = options.scope.zz_terms_zz || {};

	function getLocale() {
		if (navigator) {
			if (navigator.language) {
				return navigator.language;
			} else if (navigator.browserLanguage) {
				return navigator.browserLanguage;
			} else if (navigator.systemLanguage) {
				return navigator.systemLanguage;
			} else if (navigator.userLanguage) {
				return navigator.userLanguage;
			}
		}
	}

	function merge(source, key, value) {
		if (typeof key === 'string') {
			if (value && value.constructor === Object) {
				if (source[key] && source[key].constructor === Object) {
					arguments.callee(source[key], value);
				} else {
					source[key] = value;
				}
			} else {
				source[key] = value;
			}

			return source;
		}

		var i = 1, ln = arguments.length, object, property;

		for (; i < ln; i++) {
			object = arguments[i];

			for (property in object) {
				if (object.hasOwnProperty(property)) {
					arguments.callee(source, property, object[property]);
				}
			}
		}

		return source;
	}

	options.scope.T = function(t, params) {
		if (t && t.constructor === Object) {
			return merge(options.scope.zz_terms_zz, t);
		} else {
			var attrs = t.split('.');
			var value = options.scope.zz_terms_zz;
			for ( var i = 0; i < attrs.length; i++) {
				value = value[attrs[i]];
				if (value === undefined)
					return '[' + t + ']';
			}
			
			if(params && params.constructor === Object) {
				for(var key in params) {
					value = value.replace('{'+key+'}', params[key]);
				}
			}

			return value;
		}
	};
	
	function loadLocaleResource(path, locale) {
		locale = locale || getLocale();
		document.write('<script type="text/javascript" src="' + path + '/' + locale + '.js"></script>');
	}
	
	if(options.paths && options.paths instanceof Array) {
		for(var i = 0;i < options.paths.length;i++) {
			loadLocaleResource(options.paths[i], options.language);
		}
	}

	options.scope.loadLocaleResource = loadLocaleResource;	

	Date.prototype.toString = function() {
		return Ext.Date.format(this, options.scope.T('format.datetime'));
	};
}