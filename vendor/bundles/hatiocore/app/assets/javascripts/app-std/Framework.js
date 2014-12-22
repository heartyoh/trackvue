Ext.define('App.Framework', {
	
	alternateClassName : ['HF'],
	
	singleton : true,

	mixins : {
		ext : 'Frx.mixin.Ext',
		log : 'Frx.mixin.Log',
		ajaxaspect : 'Frx.mixin.AjaxAspect',
		nav : 'Frx.mixin.Nav',
		history : 'Frx.mixin.History',
		localstore : 'Frx.mixin.LocalStore',
		mixin : 'Frx.mixin.Mixin',
		msg : 'Frx.mixin.Msg',
		util : 'Frx.mixin.Util',
		should : 'Frx.mixin.Should',
		vtypes : 'Frx.mixin.VTypes',
		bundle : 'Frx.mixin.Bundle',
		sound : 'Frx.mixin.Beep',
		realgrid : 'Frx.mixin.RealGrid',
		print : 'Frx.mixin.Print',
		safeedit : 'Frx.mixin.SafeEdit'
	}
});
