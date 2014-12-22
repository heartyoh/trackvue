Ext.define('Frx.mixin.WsClient', {

	mixins : {
		observable : 'Ext.util.Observable'
	},

	state : 'close',
	requestQueue : {},
	ws : null,
	lastRequestId : 0,
	reConnectCounct : 0,

	newRequestId : function() {
		return (++this.lastRequestId).toString();
	},

	doSend : function(message) {
		if (message instanceof Object) {
			console.log('Message : ' + Ext.JSON.encode(message));
			return this.ws.send(Ext.JSON.encode(message));
		} else {
			console.log('Message : ' + message);
			return this.ws.send(message);
		}
	},

	buildRequestMsg : function(message) {
		message.requestId = this.newRequestId();
		return message;
	},

	doRequest : function(message, handler, self) {
		/* message should be a Message object. */
		if(!message.requestId) {
			message.requestId = this.newRequestId();
		}

		var request = {
			message : message,
			handler : handler,
			self : self
		};

		this.requestQueue[message.requestId] = request;
		this.ws.send(Ext.JSON.encode(message));
		return request;
	},

	initSocket : function() {
		var self = this;

		if (this.ws && this.state === 'open') {
			this.ws.close();
		}

		var url = self.getAgentUrl();
		if (!url)
			return;

		console.log('Try to init socket : ' + url);

		var onOpen = function(evt) {
			self.state = 'open';
			self.reConnectCounct = 0;
			console.log('WebSocket Opened : ', url);
			HF.debug('WebSocket Opened : ', url);
			self.fireEvent('open', url);
		};

		var onClose = function(evt) {
			self.state = 'close';
			console.log('WebSocket Closed : ', url, '(code:', evt.code, ', reason:', evt.reason, ')');
			HF.debug('WebSocket Closed : ', url, '(code:', evt.code, ', reason:', evt.reason, ')');
			self.fireEvent('close', url, evt.code, evt.reason);

			setTimeout(function() {
				self.reConnectCounct++;
				if (self.reConnectCounct < 5) {
					self.initSocket();
				}
			}, 3000);
		};

		var onMessage = function(evt) {
			try {
				console.log('On Message : ' + evt.data);
				var response = Ext.JSON.decode(evt.data);
				if(response.success) {
					console.log("id : " + response.requestId + " success");
				} else {
					alert("Message : " + response.msg + ", Detail : " + response.details);
				}
				if (response.requestId === undefined) {
					HF.error('Received Message is not a Response(It doesnt hava reqeust Id) : ', {
						data : evt.data
					});
					return;
				}
				var request = self.requestQueue[response.requestId];
				if (request === undefined) {
					SF.error('Correlated Request Not Found : ', {
						data : evt.data
					});
					return;
				}
				delete self.requestQueue[response.requestId];
				request.handler.call(request.self, response);
				self.fireEvent('message', response);
			} catch (e) {
				alert(e);
				HF.error('Message Received but Error : ', {
					data : evt.data
				}, e);
			}
		};

		var onError = function(evt) {
			var error = evt.data;
			console.log('Init socket error : ' + error);
			//HF.error('WebSocket Error : ', {
			//	error : error
			//});
			//self.fireEvent('error', error);
		};

		if ("WebSocket" in window) {
			this.ws = new WebSocket(url);
			this.ws.onopen = onOpen;
			this.ws.onmessage = onMessage;
			this.ws.onclose = onClose;
			this.ws.onError = onError;
		}
	},

	closeSocket : function() {
		var self = this;
		if (this.ws && this.state === 'open') {
			/*
			 * closeSocket을 명시적으로 할 경우는, 자동 Reconnect를 시도하지 않도록 한다.
			 */
			var url = self.getAgentUrl();
			this.ws.onclose = function(evt) {
				self.state = 'close';
				console.log('WebSocket Closed : ', url, '(code:', evt.code, ',reason:', evt.reason, ')');
				HF.debug('WebSocket Closed : ', url, '(code:', evt.code, ',reason:', evt.reason, ')');
				self.fireEvent('close', url, evt.code, evt.reason);
			};

			// TODO close 메소드 발생후에 onClose 이벤트가 발생하지 않는다.
			// 처리가 필요할경우 close() 호출후 readyState(1 : open, 2 : close) 비교하여
			// onclose를 호출하여야 한다.
			this.ws.close();

			if (this.ws.readyState === 2) {
				var evt = {
					code : '',
					reason : ''
				};
				this.ws.onclose(evt);
			}

		}
	},

	getAgentUrl : function() {
		return HF.setting.get('setting-agent-url');
	},

	constructor : function(config) {
		var self = this;

		this.mixins.observable.constructor.call(this, config);

		if (window.MozWebSocket) {
			window.WebSocket = MozWebSocket;
		}

		Modernizr.load({
			test : Modernizr.websockets,
			nope : 'js/web-socket/web_socket.js'
		});

		// agent URL 설정되있으면 자동연결
		var agentUrl = self.getAgentUrl();
		if (agentUrl) {
			try {
				this.initSocket();
			} catch (e) {
				console.error(e);
			}
		}

		return {
			agent : {
				connect : function() {
					self.initSocket();
				},
				disconnect : function() {
					self.closeSocket();
				},
				send : function(message) {
					self.doSend(message);
				},
				subscribe : function(id, handler) {

				},
				buildRequestMsg : function(message) {
					return self.buildRequestMsg(message);
				},
				request : function(message, handler, scope) {
					self.doRequest(message, handler, scope);
				},
				on : function() {
					self.on.apply(self, arguments);
				},
				state : function() {
					return self.state;
				}
			}
		};
	}
});
