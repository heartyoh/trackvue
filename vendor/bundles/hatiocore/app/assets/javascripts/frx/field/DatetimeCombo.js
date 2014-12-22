Ext.define('Frx.field.DatetimeCombo', {
	
	extend : 'Ext.form.FieldContainer',
	
	requires : ['Frx.store.Year', 'Frx.store.Month', 'Frx.store.Day', 'Frx.store.Hour', 'Frx.store.Min'],

	xtype : ['datetimecombo'],
	
	layout : 'hbox',
	
	initValue : new Date(),
	
	items : [{
		xtype : 'combo',
		itemId : 'yearcombo',
		store : Ext.create('Frx.store.Year'),
		queryMode : 'local',
		displayField : 'name',
		valueField : 'value',
		flex : 1.2
	}, {
		xtype : 'combo',
		itemId : 'monthcombo',
		store : Ext.create('Frx.store.Month'),
		queryMode : 'local',
		displayField : 'name',
		valueField : 'value',
		flex : 1
	}, {
		xtype : 'combo',
		itemId : 'daycombo',
		store : Ext.create('Frx.store.Day'),
		queryMode : 'local',
		displayField : 'name',
		valueField : 'value',
		flex : 1
	}, {
		html :'-',
		width: 15,
		cls : 'bigFont'
	}, {
		xtype : 'combo',
		itemId : 'hourcombo',
		store : Ext.create('Frx.store.Hour'),
		queryMode : 'local',
		displayField : 'hour',
		valueField : 'hour',
		flex : 1
	}, {
		html :':',
		width: 15,
		cls : 'bigFont'
	}, {
	 	xtype : 'combo',
	 	itemId : 'mincombo',
	 	store : Ext.create('Frx.store.Min'),
	 	queryMode : 'local',
	 	displayField : 'min',
	 	valueField : 'min',
		flex : 1
	 }],
	
	getValue : function() {
		var year = this.child('#yearcombo').getValue();
		var month = this.child('#monthcombo').getValue();
		var day = this.child('#daycombo').getValue();
		var hour = this.child('#hourcombo').getValue();
		var min = this.child('#mincombo').getValue();
		var value = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':00';
		var dateTimeValue = Ext.Date.parse(value, T('format.submitDatetime'));
		return dateTimeValue;
	},
	
	setValue : function(value) {
		
		var date = null;
		if(!value) {
			date = new Date();
		} else {
			if(value.getFullYear) {
				date = value;
			} else {
				date = Ext.Date.parse(value, T('format.datetime'), true);
			}
		}
		
		var month = date.getMonth() + 1;
		var monthStr = "" + month;
		
		var day = date.getDate();
		var dayStr = "" + day;
		
		var hour = date.getHours();
		var hourStr = "" + hour;
		
		var min = date.getMinutes();
		var minStr = "" + min;
		
		if(month < 10) {
			monthStr = "0" + monthStr;
		}
		
		if(day < 10) {
			dayStr = "0" + dayStr;
		}
		
		if(hour < 10) {
			hourStr = "0" + hourStr;
		}
		
		if(min < 10) {
			minStr = "0" + minStr;
		}
		
		this.child('#yearcombo').setValue(date.getFullYear());
		this.child('#monthcombo').setValue(monthStr);
		this.child('#daycombo').setValue(dayStr);
		this.child('#hourcombo').setValue(hourStr);
		this.child('#mincombo').setValue(minStr);
	},
	
	initComponent : function() {
		this.callParent();
		if(this.initValue) {
			this.setValue(this.initValue);
		}
	}
});
