Ext.define('Frx.mixin.Log', function() {
	
	var logger = Ext.create('Ext.util.Observable');
	
	function notify(severity, msg, e, who) {
		e = e || new Error(msg);
		
		e.issuedAt = new Date();
		e.issuedBy = e.issuedBy || 'client';

		if(who) {
			if(!e.sourceMethod)
				e.sourceMethod = (who.$name ? who.$name : '');
			if(!e.sourceClass)
				e.sourceClass = (who.$owner ? who.$owner.$className : '');
		}

		logger.fireEvent(severity, msg, e);
	}

	function debug() {
		var dt = Ext.Date.format(new Date(), 'Y-m-d h:i:s ');
		var msg = [];
		for(var i = 0;i < arguments.length;i++)
			msg.push(arguments[i].toString());
		
		Ext.log('[DEBUG]\n',
		'\tIssued At : ' + dt + '\n',
		'\tSource Class : ' + (debug.caller.$owner ? debug.caller.$owner.$className : ''), '\n',
		'\tSource Method : ' + (debug.caller.$name || ''), '\n',
		'[CONTENT]\n', msg.join('\n'));
	}
	
	function trace(msg, e) {
		notify('trace', msg, e, trace.caller);
	}
	
	function info(msg, e) {
		notify('info', msg, e, info.caller);
	}
	
	function warn(msg, e) {
		notify('warn', msg, e, warn.caller);
	}
	
	function error(msg, e) {
		notify('error', msg, e, error.caller);
	}

	function success(msg, e) {
		notify('success', msg, e, success.caller);
	}
	
	/* Default logger event handlers */
	
	function log(severity, msg, e) {
		var dt = Ext.Date.format(e.issuedAt, 'Y-m-d h:i:s ');
		
		if(e && e.issuedBy === 'server') {
			Ext.log('[' + severity.toUpperCase() + ']\t' + msg, '\n',
			'\tIssued At : ' + dt, '\n',
			'\tError : ' + e.msg);
		} else {
			Ext.log('[' + severity.toUpperCase() + ']\t' + msg, '\n',
				'\tIssued At : ' + dt, '\n',
				'\tSource Class : ' + e.source_class, '\n',
				'\tSource Method : ' + e.source_method, '\n',
				'\tError : ' + e, '\n',
				(e instanceof Error ? printStackTrace({
					e : e
				}).join('\t\n') : '\n')
			);
		}
	}
	
	logger.on('trace', function(msg, e) {
		log('trace', msg, e);
	});
	
	logger.on('info', function(msg, e) {
		log('info', msg, e);
	});
	
	logger.on('error', function(msg, e) {
		log('error', msg, e);
	});
	
	logger.on('warn', function(msg, e) {
		log('error', msg, e);
	});
	
	Ext.Error.handle = function(err) {
		error(err.msg, err);
	};
	
	window.onerror = function(msg, file, line) {
		error(msg, {
			msg : msg,
			sourceFile : file,
			sourceLine : line
		});
	};
	
	return {
		trace : trace,
		error : error,
		warn : warn,
		info : info,
		debug : debug,
		success : success,
		logger : logger
	};
}());