Ext.define('Frx.mixin.Nav', function() {
	function show(view, params, config) {
		var content = Ext.getCmp('content');

		HF.should.not_be_empty(content);

		var screen = null;

		if (Ext.isString(view)) {

			try {
				if (!Ext.ClassManager.get(view)) {
					var controller = view.replace('.view.', '.controller.');
					Ext.syncRequire(controller);
					App.getApplication()
						.getController(controller);
				}

				screen = content.getComponent(view) || content.insert(0, Ext.create(view, Ext.merge({
					itemId: view,
					header: false
				}, config)));
			} catch (e) {
				HF.error(T('error.LOAD-FAILURE', {
					view: view
				}), e);
				return;
			}
		} else {
			screen = view;
		}

		if (screen.setParams) {
			screen.setParams(params || screen.getParams());
		} else {
			HF.history.add(view, params);
		}

		content.fireEvent('showcontent', content, screen);
	}

	function popup(view, params, config) {
		var screen = null;

		if (Ext.isString(view)) {

			try {
				if (!Ext.ClassManager.get(view)) {
					var controller = view.replace('.view.', '.controller.');
					Ext.syncRequire(controller);
					App.getApplication()
						.getController(controller);
				}

				screen = Ext.create(view, Ext.merge({
					modal: true
				}, config));

				if (config && config.by) screen.showBy(config.by)
				else screen.show();
			} catch (e) {
				HF.error(T('error.LOAD-FAILURE', {
					view: view
				}), e);
				return;
			}
		}

		if (screen.setParams) {
			screen.setParams(params);
		}
	}

	var _app;

	function app(application) {
		if (application) _app = application;
		return _app;
	}

	var titleBarAddendums = [];
	var optionBarAddendums = [];
	var topBarAddendums = [];
	var statusBarAddendums = [];
	var settingAddendums = [];

	function titlebar(component) {
		if (component) {
			if (component instanceof Array) {
				Ext.Array.each(component, function(comp) {
					titleBarAddendums.push(comp);
				});
			} else {
				titleBarAddendums.push(component);
			}
		}

		return titleBarAddendums;
	}

	function optionbar(component) {
		if (component) {
			if (component instanceof Array) {
				Ext.Array.each(component, function(comp) {
					optionBarAddendums.push(comp);
				});
			} else {
				optionBarAddendums.push(component);
			}
		}

		return optionBarAddendums;
	}

	function topbar(component) {
		if (component) {
			if (component instanceof Array) {
				Ext.Array.each(component, function(comp) {
					topBarAddendums.push(comp);
				});
			} else {
				topBarAddendums.push(component);
			}
		}

		return topBarAddendums;
	}

	function setting(component) {
		if (component) {
			if (component instanceof Array) {
				Ext.Array.each(component, function(comp) {
					settingAddendums.push(comp);
				});
			} else {
				settingAddendums.push(component);
			}
		}

		return settingAddendums;
	}

	function statusbar(component) {
		if (component) {
			if (component instanceof Array) {
				Ext.Array.each(component, function(comp) {
					statusBarAddendums.push(comp);
				});
			} else {
				statusBarAddendums.push(component);
			}
		}

		return statusBarAddendums;
	}

	var downloader;

	function download(url) {
		if (!downloader) {
			downloader = document.createElement('iframe');
			downloader.style.display = 'none';
			downloader.onload = function() {

			// if(downloader.contentDocument.body.childNodes[0].wholeText == '404') {
			if(downloader.contentDocument.body.childNodes[0]) {
				// TODO 다운로드가 실패하는 경우에는 childNodes가 있는 경우이다. 서버에서 404등 오류발생시에 무언가 컨텐츠를 보내준다고 보기때문이다. 나이스하게 수정하면 좋겠다.
				// TODO 아래부분에 Ext 종속성을 없앤다.
				Ext.Msg.show({
					title: 'Attachment missing',
					msg: 'The document you are after can not be found on the server.',
					buttons: Ext.Msg.OK,
					icon: Ext.MessageBox.ERROR
				})
			}
			};
			document.body.appendChild(downloader);	
		}
				
		downloader.src = url;
	}

	var slideshowbar;

	function slideshow(attachments) {
		if (!Ext.isArray(attachments) || attachments.length == 0) return;

		if (!slideshowbar) {
			slideshowbar = document.createElement('div');
			slideshowbar.style.display = 'none';
			document.body.appendChild(slideshowbar);	
		}

		var images = Ext.Array.filter(attachments, function(attachment) {
			if (attachment.mimetype && attachment.mimetype.indexOf('image') === 0) return true;
			return false;
		});

		if (images.length == 0) return;

		var html = '';
		Ext.Array.each(images, function(image) {
			html += '<a href="' + image.url + '" class="slide" title="' + image.name + '">' + image.name + '</a>';
		})
		
		$(slideshowbar).html(html);

		$(slideshowbar).children('a').colorbox({
			rel: 'group'
		}).eq(0).click();
	}

	var contentLayout;

	function currentview() {
		if (!contentLayout) {
			contentLayout = Ext.getCmp('content').getLayout();
		}
		if (!contentLayout) return;

		return contentLayout.getActiveItem();
	}
	
	function currentresource() {
		var cv = currentview();
		if(!cv) {
			return null;
		}
		
		if(!cv.resource_name) {
			var classname = cv.self.getName();
			var names = classname.split('.');
		
			cv.resource_name = names[2];
		}

		return {
			type : cv.resource_name,
			id : cv.getParams && cv.getParams() ? cv.getParams().id : null
		}
	}

	function currentmodule() {
		var cv = currentview();
		if(!cv) {
			return null;
		}
		
		if(!cv.module_name) {
			var classname = cv.self.getName();
			var names = classname.split('.');
		
			cv.module_name = names[0];
		}

		return cv.module_name;
	}

	return {
		show: show,
		popup: popup,
		app: app,
		current: {
			view: currentview,
			resource: currentresource,
			module: currentmodule
		},
		download: download,
		slideshow: slideshow,
		custom: {
			topbar: topbar,
			optionbar: optionbar,
			titlebar: titlebar,
			statusbar: statusbar,
			setting: setting
		}
	};
}());
