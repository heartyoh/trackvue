Ext.define('Frx.mixin.VTypes', function() {
	Ext.apply(Ext.form.field.VTypes, {
		daterange: function(val, field) {
			var date = field.parseDate(val);

			if (!date) {
				return false;
			}
			if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
				var start = field.up('form').down('field[name=' + field.startDateField + ']');
				start.setMaxValue(date);
				start.validate();
				this.dateRangeMax = date;
			} else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
				var end = field.up('form').down('field[name=' + field.endDateField + ']');
				end.setMinValue(date);
				end.validate();
				this.dateRangeMin = date;
			}
			
			/*
             * Always return true since we're only using this vtype to set the
             * min/max allowed values (these are tested for after the vtype test)
             */
			return true;
		},

		daterangeText: 'Start date must be less than end date',

		password: function(val, field) {
			if (field.initialPassField) {
				var pwd = field.up('form').down('#' + field.initialPassField);
				return (val == pwd.getValue());
			}
			return true;
		},

		passwordText: 'Passwords do not match',
		
		presence: function(val, field) {
			return (val == null || val == '') ? false : true;
		},
		
		presenceText: 'This field not allowed empty text!',
		
		currentTimeRange : function(val, field) {
			if(val != null) {
				var currentTime = new Date();
				var valDate = field.parseDate(val);
				if(!valDate) {
					return true;
				}
				return currentTime >= valDate;
			}
			
			return true;
		},
		
		currentTimeRangeText : 'This field not allowed be greater than the current time.',
		
		lteToday : function(val, field) {
			if(val != null) {
				var d = new Date();
				var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				var valDate = field.parseDate(val);
				if(!valDate) {
					return true;
				}
				return today >= valDate;
			}
			
			return true;
		},
		
		lteTodayText : 'This field not allowed be greater than today.',
		
		gteToday : function(val, field) {
			if(val != null) {
				var d = new Date();
				var today = new Date(d.getFullYear(), d.getMonth(), d.getDate());
				var valDate = field.parseDate(val);
				if(!valDate) {
					return true;
				}
				return today <= valDate;
			}
			
			return true;
		},
		
		gteTodayText : 'This field not allowed be less than today.'		
	});
	
	return {
	};
}());
