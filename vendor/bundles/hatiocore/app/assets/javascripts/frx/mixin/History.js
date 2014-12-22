/**
 * @class mixin.History
 * 
 */
Ext.define('Frx.mixin.History', function() {
	/* 메인화면을 벗어나려고 할 때, 확인 메시지를 뿌리는 부분임.	TODO 다른 곳으로 옮기면 좋겠음. */
	window.onbeforeunload = function(e) {
		return T('text.Sure to close');
	};
	
	/*
	 * Browser History 기능을 위한 부분임.
	 * 아래와 같이 수정하는 이유는, History에 넣은 후에 다시 동작하지 않도록 하기 위해서임.
	 * (원래 구성에서는 doMenu 시에 두 번 동작하게 됨. History에 추가하는 경우는 change 이벤트를 발생시키지 않도록 하기 위해서임.)
	 */
	Ext.apply(Ext.util.History, {
		suppressChange : false,
		add : function(token, preventDup, suppressChange) {
			var me = this;
			this.suppressChange = suppressChange ? true : false;
			if (preventDup !== false) {
				if (me.getToken() === token) {
					return true;
				}
			}
			if (me.oldIEMode) {
				return me.updateIFrame(token);
			} else {
				window.top.location.hash = token;
				return true;
			}
		},
		handleStateChange : function(token) {
			this.currentToken = token;
			// only fire "change" event if suppressChange is false
			if (!this.suppressChange) {
				this.fireEvent('change', token);
			}
			// now just reset the suppressChange flag
			this.suppressChange = false;
		}
	});
	
	/* 네비게이션의 히스토리 시스템을 셋업한다. */
	Ext.util.History.init();

	var _locked = false;
	
	function parse(token) {
		if (!token)
			return {
				view : undefined,
				params : undefined
			};

		var params = token.match(/([^:]*):{0,1}([\S\s]*)/);
		params.shift();

		return {
			view : params[0],
			params : params[1] ? Ext.Object.fromQueryString(params[1], true) : undefined
		};
	}

	Ext.util.History.on('change', function(token) {
		if(!token)
			return;
		
		var anchor = parse(token);
		
		var vm = anchor.view;
		var params = anchor.params;
		
		HF.show(vm, params);
	});
	
	/*
	 * History Change 이벤트가 발생하지 않는 경우에 강제로 발생시키는 메쏘드이다.
	 * 예를 들면, 화면이 최초에 열리는 시점에 발생시킨다. 
	 */
	function force() {
		Ext.util.History.fireEvent('change', Ext.util.History.getToken());
	}
	
	function anchor() {
		var args = [];
		for(var i = 0;i < arguments.length;i++) {
			if(!arguments[i])
				args[i] = '';
			else if(arguments[i] instanceof Array || arguments[i] instanceof Object)
				args[i] = Ext.Object.toQueryString(arguments[i], true);
			else
				args[i] = '' + arguments[i];
		}
		
		return args.join(':');
	}
	
	function add(comp, params, force) {
		if(_locked)
			return;

		var token = '';
		var view = (typeof comp === 'string') ? comp : Ext.getClassName(comp);
		
		if (view) {
			if (params !== undefined)
				token = anchor(view, params);
			else if (comp.getParams && comp.getParams() !== undefined)
				token = anchor(view, comp.getParams());
			else
				token = anchor(view);
		}

		var oldtoken = Ext.util.History.getToken();

		if ((!oldtoken) || oldtoken != token) {
			Ext.History.add(token, true, true);
		}
	}

	function back() {
		Ext.util.History.back();
	}

	function forward() {
		Ext.util.History.forward();
	}
	
	function lock() {
		_locked = true;
	}
	
	function unlock() {
		_locked = false;
	}
	
	return {
		history : {
			force : force,
			add : add,
			back : back,
			forward : forward,
			lock : lock,
			unlock : unlock
		}
	};
}());
