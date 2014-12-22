Ext.define('App.mixin.ErrorHandler', {
	constructor : function(config) {
		HF.logger.on('error', function(msg, e) {
			HF.msg.failure({
			    msg: msg.replace('\n', '<br/>')
			});
		});
		
		HF.logger.on('warn', function(msg, e) {
			HF.msg.notice({
			    msg: msg.replace('\n', '<br/>')
			});
		});
		
		HF.logger.on('success', function(msg) {
			HF.msg.success({
			    msg: msg.replace('\n', '<br/>')
			});
		});
		
		HF.logger.on('info', function(msg, e) {
			HF.msg.notice({
			    msg: msg.replace('\n', '<br/>')
			});
		});
	}
});
