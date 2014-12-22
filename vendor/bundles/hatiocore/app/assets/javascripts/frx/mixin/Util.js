Ext.define('Frx.mixin.Util', function() {

	/**
	 * toDate와 fromDate의 차이의 일수 차이를 계산
	 */
	function calDateRange(fromDate, toDate) {
		if(toDate == null || fromDate == null)
			return -1;

		if(getClassName(fromDate) != 'Date') {
			var fromDtStr = fromDate.split('-');
			fromDate = new Date(fromDtStr[0], (Number(fromDtStr[1]) - 1) + "", fromDtStr[2]);
		}

		if(getClassName(toDate) != 'Date') {
			var toDtStr = toDate.split('-');
			toDate = new Date(toDtStr[0], (Number(toDtStr[1]) - 1) + "", toDtStr[2]);
		}

		return (toDate.getTime() - fromDate.getTime()) / 1000 / 60 / 60 / 24;
	}

	/**
	 * obj의 class name을 반환
	 */
	function getClassName(obj) {
		if (typeof obj != "object" || obj === null) return false;
		return /(\w+)\(/.exec(obj.constructor.toString())[1];
	}

	/**
	 * Shift를 고려한 현재 날짜 - 서버에서 현재 날짜를 구한다.
	 */
	function getCurrentShiftDate() {
		var newDate = null;
		Ext.Ajax.request({
			url : '/shifts/' + login.current_domain_id + '/current_work_date.json',
			method : 'GET',
			async : false,
			success : function(response) {
				var result = Ext.JSON.decode(response.responseText);
				newDate = result.work_date;
			},
			scope : this
		});

		return Ext.Date.parse(newDate, T('format.submitDate'));
	}

	/**
	 * Shift를 고려한 현재 날짜에서 addCount만큼을 더한 날짜를 넘겨준다.
	 */
	function getShiftDate(addCount) {
		var date = getCurrentShiftDate();
		date.setDate(date.getDate() + addCount);
		return date;
	}

	/**
	 * 현재 날짜에 addCount만큼을 더한 날짜를 계산해서 Date 객체로 리턴
	 */
	function getDate(addCount) {
		var date = new Date();
		date.setDate(date.getDate() + addCount);
		return Ext.Date.parse(date, T('format.submitDate'));
	}

	/**
	 * date 객체를 기본 format으로 변경하여 문자열로 리턴
	 */
	function getFormattedDate(date) {
		return Ext.util.Format.date(date, T('format.date'));
	}

	/**
	 * date 객체를 기본 format으로 변경하여 문자열로 리턴
	 */
	function getFormattedTime(date) {
		return Ext.util.Format.date(date, T('format.datetime'));
	}

	/**
	 * date 객체를 format으로 변경하여 문자열로 리턴
	 */
	function formattedDate(date, format) {
		return Ext.util.Format.date(date, format);
	}

	/**
	 * date 객체를 format으로 변경하여 문자열로 리턴
	 */
	function formattedTime(date, format) {
		return Ext.util.Format.date(date, format);
	}

	function camelize(src) {
		var lowers = src.toLowerCase();
		return lowers.replace(/[A-Z]([A-Z]+)|(?:^|[-_])(\w)/g, function(x, c) {
			var x0 = x.charAt(0);

			if (x0 == '-' || x0 == '_')
				return x.substr(1).toUpperCase();
			return x;
		});
	}

	function underscored(src) {
		return src.replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
	}

	/**
	 * Id에서 도메인 아이디를 제거한 이름을 리턴한다.
	 */
	function idToName (value) {
		return value ? value.replace((login.current_domain_id + '-'), '') : '';
	}

    function humanize(src) {
        var lowers = src.toLowerCase();
        var result = lowers.replace(/[A-Z]([A-Z]+)|(?:^|[-_])(\w)/g, function(x, c) {
            var x0 = x.charAt(0);

            if (x0 == '-' || x0 == '_') {
                return ' ' + x.substr(1).toUpperCase();
            }
            return x;
        });
        return result.substring(0, 1).toUpperCase() + result.substring(1);
    }

    function classify(src) {
        var lowers = src.toLowerCase();
        var result = lowers.replace(/[A-Z]([A-Z]+)|(?:^|[-_])(\w)/g, function(x, c) {
            var x0 = x.charAt(0);

            if (x0 == '-' || x0 == '_') {
                return x.substr(1).toUpperCase();
            }
            return x;
        });
        return result.substring(0, 1).toUpperCase() + result.substring(1);
    }

	function elapsedTime(from, to, unit) {
		var diff = to - from;

		// strip the miliseconds
		diff /= 1000;

		var seconds = Math.round(diff % 60);
		// remove seconds from the date
		diff = Math.round(diff / 60);
		// get minutes
		var minutes = Math.round(diff % 60);
		// remove minutes from the date
		diff = Math.round(diff / 60);
		// get hours
		var hours = Math.round(diff % 24);
		// remove hours from the date
		diff = Math.round(diff / 24);

		// the rest of Time Diff is number of days
		var days = diff;

		var text = 'Text.Elapsed Hours';

		if(unit) {
			switch(unit.charAt(0)) {
			case 's' :
				text = 'text.Elapsed Seconds';
				break;
			case 'm' :
				text = 'text.Elapsed Minutes';
				break;
			case 'h' :
				text = 'text.Elapsed Hours';
				break;
			case 'd' :
				text = 'text.Elapsed Days';
				break;
			}
		}

		return T(text, {
			days : days,
			hours : hours,
			minutes : minutes,
			seconds : seconds
		});
	}

	function exportScreen(grid, exportUrl) {
		if(!(grid instanceof Ext.grid.Panel)) {
			return;
		}

		var sendArr = [], columns = grid.columns, headerObj = {}, sendInfo = {}, sendform = null, sendInput = null;
		for(var i = 0; i < columns.length; i++) {
			if(!columns[i].hidden) {
				headerObj[columns[i].dataIndex] = columns[i].text;
				sendInfo['col'+ i] = { sendAble : true, dataIndex : columns[i].dataIndex };
			} else {
				sendInfo['col'+ i] = { sendAble : false };
			}
		}
		sendArr.push(headerObj);

		var dom = grid.getView().tableTpl.owner.dom;
		var rowInfo = Ext.dom.Query.jsSelect('*[class^=x-grid-row]', dom);
		for(var i = 0; i < rowInfo.length; i++) {
			if(rowInfo[i].className == "x-grid-row-checker") {
				continue;
			}
			var dataInfo = Ext.dom.Query.jsSelect('*[class^=x-grid-cell-inner]', rowInfo[i]);
			var dataObj = {};
			for(var k = 0; k < dataInfo.length; k++) {
				if(sendInfo['col' + k] && sendInfo['col' + k].sendAble){
					dataObj[sendInfo['col' + k].dataIndex] = dataInfo[k].innerText;
				}
			}
			sendArr.push(dataObj);
		}

		if(document.getElementById('xlsForm')) {
			sendform = document.getElementById('xlsForm');
			sendInput = document.getElementById('xlsGridInfo');
		} else {
			sendform = document.createElement("form");
			sendform.setAttribute("name", "xlsForm");
			sendform.setAttribute("id", "xlsForm");
	        sendform.setAttribute("method", "post");
	        var sendInput = document.createElement('input');
	        sendInput.setAttribute('type','hidden');
	        sendInput.setAttribute('name','xlsGridInfo');
	        sendInput.setAttribute('id','xlsGridInfo');
	        sendform.appendChild(sendInput);
	        var bodyArr = Ext.query("body");
	        bodyArr[0].appendChild(sendform);
		}

		sendInput.setAttribute('value', Ext.JSON.encode(sendArr));
        sendform.setAttribute("action", exportUrl);
        sendform.submit();
	}

	return {
		getClassName : getClassName,
		calDateRange : calDateRange,
		getCurrentShiftDate : getCurrentShiftDate,
		getShiftDate : getShiftDate,
		getDate : getDate,
		getFormattedDate : getFormattedDate,
		getFormattedTime : getFormattedTime,
		formattedDate : formattedDate,
		formattedTime : formattedTime,
		camelize : camelize,
		underscored : underscored,
		humanize : humanize,
        classify : classify,
		elapsedTime : elapsedTime,
		idToName : idToName,
		getFormattedDate: getFormattedDate,
		exportScreen : exportScreen
	};
}());
