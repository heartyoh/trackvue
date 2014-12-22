Ext.define('Frx.field.ColorField', {
	extend: 'Ext.form.field.Trigger',

	value: '',
	width: 150,
	fieldLabel: 'Color',
	labelWidth: 60,
	editable: false,

	hiddenValue: '',

	onTriggerClick: function(event) {
		this.fireEvent('triggerclick', event);
	},

	getValue: function() {
		return this.hiddenValue;
	},

	setValue: function(color) {
		this.hiddenValue = color;
		this.setFieldStyle('background-color: #' + color + '; background-image: none;');
	},


	initComponent: function() {
		this.hiddenValue = this.value;
		this.value = '';

		var config = {},
			me = this;

		Ext.apply(this, Ext.apply(this.initialConfig, config));
		this.callParent(arguments);

		me.on('triggerclick', function(event) {
			var colourMenu = Ext.create('Ext.menu.ColorPicker', {
				value: me.value,
				listeners: {
					select: function(picker, color) {
						me.setValue(color);
						me.fireEvent('select', me, color);
					}
				}
			});
			colourMenu.showAt(event.getXY());
		}, this);
	}
});
