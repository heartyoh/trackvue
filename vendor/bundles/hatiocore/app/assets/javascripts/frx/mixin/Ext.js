Ext.define('Frx.mixin.Ext', function() {
	Ext.override(Ext.data.proxy.Server, {
		constructor: function(config) {
			this.callOverridden([config]);

			this.addListener("exception",  function (proxy, resp, operation) {
				if(resp.status >= 400)
					return;

				/* 
					Timeout, Aborted 가 아닌, 서버에서 success : false를 보낸 경우임.
					Timeout, Aborted 등은 AjaxAspect에서 처리함.
					
					TODO : 요청정보, 응답정보를 오류 정보에 포함할 것.
				*/
				HF.error(T('error.BUG'));
			});
		}
	});

	//Ext.form.field.Base의 labelSeparator의 기본값을 ':' -> '' 변경했다
	Ext.override(Ext.form.field.Base, {
		labelSeparator : '',
		msgTarget : 'side'
	});

	//Ext.form.field.Base의 labelSeparator의 기본값을 ':' -> '' 변경했다
	Ext.override(Ext.form.FieldContainer, {
		labelSeparator : '',
		msgTarget : 'side'
	});

	//flash component Adobe provides a tool called(install/version up) 경로수정
	Ext.flash.Component.EXPRESS_INSTALL_URL = 'swf/expressInstall.swf';
	
	return {};
}());