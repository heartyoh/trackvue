Ext.define('Frx.mixin.AjaxAspect', function() {
	function onComplete(conn, resp, options, eOpts) {
	}
	
	var error_codes = {
		0 : 'COMM-FAILURE',
		400 : 'BAD-REQUEST',
		401 : 'UNAUTHORIZED',
		402 : 'PAYMENT-REQUIRED',
		403 : 'FORBIDDEN',
		404 : 'NOT-FOUND',
		405 : 'METHOD-NOT-ALLOWED',
		406 : 'NOT-ACCEPTABLE',
		407 : 'PROXY-AUTHENTICATION-REQUIRED',
		408 : 'REQUEST-TIMEOUT',
		409 : 'CONFLICT',
		410 : 'GONE',
		411 : 'LENGTH-REQUIRED',
		412 : 'PRECONDITION-FAILED',
		413 : 'REQUEST-ENTITY-TOO-LARGE',
		414 : 'REQUEST-URI-TOO-LONG',
		415 : 'UNSUPPORTED-MEDIA-TYPE',
		416 : 'REQUESTED-RANGE-NOT-SATISFIABLE',
		417 : 'EXPECTATION-FAILED',
		422 : 'REQUEST-REJECTED',
		500 : 'SERVER-ERROR',
		501 : 'NOT-IMPLEMENTED',
		502 : 'BAD-GATEWAY',
		503 : 'SERVICE-UNAVAILABLE',
		504 : 'GATEWAY-TIMEOUT',
		505 : 'HTTP-VERSION-NOT-SUPPORTED'
	}
	
	var rails_error_codes = {
		// 1xx Informational
		100	: 'Continue',
		101	: 'Switching Protocols',
		102	: 'Processing',
		
		// 2xx Success
		200	: 'OK',
		201	: 'Created',
		202	: 'Accepted',
		203	: 'Non-Authoritative Information',
		204	: 'No Content',
		205	: 'Reset Content',
		206	: 'Partial Content',
		207	: 'Multi-Status',
		226	: 'IM Used',

		// 3xx Redirection
		300	: 'Multiple Choices',
		301	: 'Moved Permanently',
		302	: 'Found',
		303	: 'See Other',
		304	: 'Not Modified',
		305	: 'Use Proxy',
		307	: 'Temporary Redirect',

		// 4xx Client Error
		400	: 'Bad Request',
		401	: 'Unauthorized',
		402	: 'Payment Required',
		403	: 'Forbidden',
		404	: 'Not Found',
		405	: 'Method Not Allowed',
		406	: 'Not Acceptable',
		407	: 'Proxy Authentication Required',
		408	: 'Request Timeout',
		409	: 'Conflict',
		410	: 'Gone',
		411	: 'Length Required',
		412	: 'Precondition Failed',
		413	: 'Request Entity Too Large',
		414	: 'Request-URI Too Long',
		415	: 'Unsupported Media Type',
		416	: 'Requested Range Not Satisfiable',
		417	: 'Expectation Failed',
		422	: 'Unprocessable Entity',
		423	: 'Locked',
		424	: 'Failed Dependency',
		426	: 'Upgrade Required',

		// 5xx Server Error
		500	: 'Internal Server Error',
		501	: 'Not Implemented',
		502	: 'Bad Gateway',
		503	: 'Service Unavailable',
		504	: 'Gateway Timeout',
		505	: 'HTTP Version Not Supported',
		507	: 'Insufficient Storage',
		510	: 'Not Extended'
	}
	
	function onException(conn, resp, options, eOpts) {
		var err = {
			msg : '[' + resp.status + ' ' + resp.statusText + '(' + options.url + ')]'
		};

		if (resp.responseText) {
			try {
				var error = Ext.JSON.decode(resp.responseText);
				err = {
					msg : error.errors.join('\n'),
					server_response : error
				}
			} catch(e) {
			}
		}
		
		err.issuedBy = 'server';
		
		HF.error(T('error.' + (error_codes[resp.status] || 'INVALID-SESSION'), err), err);
	}
	
	function onBefore(conn, options, eOpts) {
	}
	
	Ext.onReady(function() {
		// Ext.Ajax.on('requestcomplete', onComplete);
		Ext.Ajax.on('requestexception', onException);
		// Ext.Ajax.on('beforerequest', onBefore);
	});

	return {
		ajax : {	
		}
	};
}());