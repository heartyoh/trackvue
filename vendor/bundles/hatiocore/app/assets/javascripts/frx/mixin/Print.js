Ext.define('Frx.mixin.Print', function() {
	function show_print_dialog(html) {
		var win = window.open("", "_print_");

		win.document.open();
		win.document.write(html);

		win.addEventListener('load', function() {
			win.focus();
			win.print();
			win.close();
		}, false);

		win.document.close();
	}
	
	function print_html(what, how) {
		/* parameter 'what' should be a instance of HTMLElement */
		var html = '<HTML>' +
		'<HEAD>' +
		'<meta http-equiv="Content-type" content="text/html; charset=utf-8">' +
		'<meta http-equiv="X-UA-Compatible" content="chrome=1">' +
		'<title>Print</title>' +
        '<link href="assets/application.css" rel="stylesheet" type="text/css" />' +
		'</HEAD>' +
		'<BODY>' +
		what.innerHTML +
		'</BODY>' +
		'</HTML>';

		show_print_dialog(html);
	}
	
	function print_canvas(what, how) {
		/* parameter 'what' should be a instance of HTMLElement for CANVAS */
	    var dataUrl = what.toDataURL("image/png"); //attempt to save base64 string to server using this var  
		
	    var html = '<!DOCTYPE html>' +
		'<html>' +
		'<head><title>Print</title></head>' +
		'<body>' +
		'<img src="' + dataUrl + '">' +
		'</body>' +
		'</html>';

		show_print_dialog(html);
	}
	
	function print_delo(what, how) {
		/* parameter 'what' should be a instance of Delo.DocumentView */
		what.toDataUrl(function(url) {
		    var html = '<!DOCTYPE html>' +
			'<html>' +
			'<head><title>Print</title></head>' +
			'<body>' +
			'<img src="' + url + '">' +
			'</body>' +
			'</html>';

			// TODO Chrome 외(Safari, Firefox)에는 여기서 호출되는 show_print_dialog가 잘 실행되지 않는다.
			// window.open() 이 잘 되지 않는다.
			show_print_dialog(html);
		});
	}

	function print(what, how) {
		
		if(typeof(what) == 'string') {
			/* what 파라미터가 문자열인 경우는 HTMLElement의 id를 의미하는 것으로 한다. */
			var el = document.getElementById(what);
			if(!el) {
				throw 'Element having given id (' + what + ') not exist';
			}
			arguments.callee(el, how);
		} else if(what instanceof HTMLElement) {
			if(what.tagName.toUpperCase() === 'CANVAS') {
				print_canvas(what, how);
			} else {
				print_html(what, how);
			}
		} else if(what instanceof Ext.dom.Element) {
			print_html(what.dom, how);
		} else if(what instanceof Ext.Component) {
			print_html(what.getEl().dom, how);
		} else if(what instanceof Delo.DocumentView) {
			print_delo(what, how);
		}
	}

	return {
		print : print
	};

}());
