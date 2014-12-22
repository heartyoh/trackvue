/*
[목적]

브라우저에서 편집시 오랜 작업 내용을 잃지 않도록 브라우저내에서 자동 임시저장을 제공한다.

[방안]

사용자의 편집 내용을 수시로 로컬스토리지에 저장하고, 세션 유지기간 내에 지속적으로 유지하여,
편집화면에서 다른 화면으로 이동했다가 다시 돌아올 때 로컬에 저장된 내용을 로딩하여 직전 작업 상태를 유지해준다. 

[생명주기]

1. init
편집화면을 열 때, 해당 아이템 연관 키로 로컬스토리지에 저장된 내용이 있으며, 그 내용을 편집화면에 로딩한다.
없으면, 새로 생성되는 경우에는 초기 데이타를 로딩하고, 기존의 아이템을 편집하는 경우에는 서버로부터 받은 데이타를 로딩한다.
만약, 로컬에 저장된 데이타가 있으면 LOCAL SAVED가 되며, 없으면 INITIALIZED가 된다.
(서버로부터 받은 데이타를 편집기에 로딩하는 부분은 사용자가 정의한다. - oninit callback)

2. local save
수시로 현재의 작업 상태를 로컬브라우저에 저장한다.
이 때 상태는 LOCAL SAVED 상태가 된다.
(로컬브라우저에 저장할 데이타를 제공하는 부분은 사용자가 정의한다. - onsave callback)

3. sync
서버에 저장하는 단계이다.
작업 결과가 서버에 반영되면, 로컬에 저장된 임시 저장 내용은 제거된다.
이 때 상태는 SYNCHRONISED 가 된다.
(서버에 저장하기위한 전 작업을 사용자가 정의한다. - onreadysync)
서버에 저장이 완료되면 complete_sync를 호출한다.

4. reset
로컬에 저장된 내용을 삭제하고. 서버로부터 받은 데이타로 다시 로딩한다.
이 때 상태는 INITIALIZED 가 된다.
(reset을 위한 작업은 사용자가 정의한다. - onreset)

[고려사항]
너무 잦은 local save는 퍼포먼스를 현저히 다운시킬 수 있다.
적절한 타이밍에 할 수 있도록 고려한다.

*/

Ext.define('Frx.mixin.SafeEdit', function() {
	function SafeEdit(target, options) {
		var target = target;
		var options = options;
		var supported = typeof(Storage) !== 'undefined';
	
		var status = {
			NONE : 0,
			INITIALIZED : 1,
			LOCALSAVED : 2,
			MODIFIED : 3,
			SYNCHRONISED : 4,
		};
	
		var status_text = ['None', 'Initialized', 'Local Saved', 'Modified', 'Synchronised'];
	
		var state = status.NONE;

		var getlocal = !supported ? function() {} : function() {
			return sessionStorage[options.id.call(target)];
		};
	
		var setlocal = !supported ? function() { return false; } : function(data) {
			if(typeof(data) === 'undefined' || data === null) {
				delete sessionStorage[options.id.call(target)];
				return false;
			} else {
				sessionStorage[options.id.call(target)] = data;
				return true;
			}
		};
	
		var setstate = function(newstate) {
			var old = state;
			state = newstate;
			options.onstatechange(state, status_text[state]);
		};
	
		/*
	
		*/
		this.init = function() {
			var saved = getlocal();
			if(typeof(saved) !== 'undefined' && saved !== null) {
				/* FF에서는 null을 리턴하기 때문에, null도 체크함 */
				setstate(status.LOCALSAVED);
				options.oninit.call(target, saved);
			} else {
				setstate(status.INITIALIZED);
				options.onreset.call(target);
			}
		};
	
		this.save = function() {
			var saved = options.onsave.call(target);
			setstate(setlocal(saved) ? status.LOCALSAVED : status.MODIFIED);
		};
	
		this.ready_sync = function() {
			options.onreadysync.call(target)
		};
	
		this.complete_sync = function() {
			setlocal(); // Clear local storage
			setstate(status.SYNCHRONISED);
		};
	
		this.reset = function() {
			options.onreset.call(target);
			setlocal();
			setstate(status.INITIALIZED);
		};
	
		this.init();
	}

	return {
		createSafeEdit : function(target, options) {
			return new SafeEdit(target, options);
		}
	};
}());
