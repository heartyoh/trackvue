Ext.define('Frx.mixin.Beep', function() {
	function beep(url) {
		new Audio(url).play();
	}
	
	function notice() {
		beep('assets/sounds/notice.wav');
	}
	
	function failure() {
		beep('assets/sounds/failure.wav');
	};
	
	function success() {
		beep('assets/sounds/success.wav');
	};
	
	return {
		beep : {
			beep : beep,
			notice : notice,
			failure : failure,
			success : success
		}
	};
}());