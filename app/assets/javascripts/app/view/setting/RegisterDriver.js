Ext.define('App.view.setting.RegisterDriver', {
	extend: 'Ext.form.Panel',
	requires: [
		'App.view.setting.SettingController',
		'App.view.setting.SettingModel',
		'Ext.ux.GMapPanel'
	],

	xtype: 'setting-register-driver',

	controller: 'setting',
	viewModel: {
		type: 'setting'
	},

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'panel',
		title: 'REGIST DRIVER & VEHICLE',
		split: true,
		width: 440,
		defaults: {
			margin: 6
		},
		items: [{
			xtype: 'fieldset',
			title: 'Group',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			defaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				xtype: 'combo',
				fieldLabel: 'Group',
				displayField: 'name',
				valueField: 'name',
				queryMode: 'local',
				bind: {
					selection: '{current.group_selection}',
					store: '{stores.groups}'
				}
			}]
		}, {
			xtype: 'fieldset',
			title: 'Driver',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				margin: 6
			},
			items: [{
				xtype: 'container',
				width: 280,
				defaults: {
					labelWidth: 80,
					labelAlign: 'right',
					margin: 6
				},
				items: [{
					xtype: 'filefield',
					fieldLabel: 'Image',
					hidden: true
				}, {
					xtype: 'textfield',
					fieldLabel: 'Lastname'
				}, {
					xtype: 'textfield',
					fieldLabel: 'Firstname'
				}, {
					xtype: 'textfield',
					fieldLabel: 'Email'
				}]
			}, {
				xtype: 'image',
				flex: 1,
				height: 120,
				border: 4,
				margin: '0 0 8 0',
				style: {
				    borderColor: 'lightgray',
				    borderStyle: 'solid'
				},
				bind: {
					src: '{register.driver_image}'
				}
			}]
		}, {
			xtype: 'fieldset',
			title: 'Vehicle',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				margin: 6
			},
			items: [{
				xtype: 'container',
				width: 280,
				defaults: {
					labelWidth: 80,
					labelAlign: 'right',
					margin: 6
				},
				items: [{
					xtype: 'filefield',
					fieldLabel: 'Image',
					hidden: true
				}, {
					xtype: 'textfield',
					fieldLabel: 'Vehicle ID'
				}, {
					xtype: 'textfield',
					fieldLabel: 'Car Model'
				}, {
					xtype: 'textfield',
					fieldLabel: 'Email'
				}]
			}, {
				xtype: 'image',
				flex: 1,
				height: 120,
				border: 4,
				margin: '0 0 8 0',
				style: {
				    borderColor: 'lightgray',
				    borderStyle: 'solid'
				},
				bind: {
					src: '{register.vehicle_image}'
				}
			}]
		}, {
			xtype: 'fieldset',
			title: 'Driver Speed',
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults: {
				labelWidth: 60,
				width: 120,
				labelAlign: 'right',
				flex: 1
			},
			padding: 6,
			items: [{
				xtype: 'numberfield',
				fieldLabel: 'Slow',
                value: 32
			}, {
				xtype: 'numberfield',
				fieldLabel: 'Normal',
                value: 97
			}, {
				xtype: 'numberfield',
				fieldLabel: 'Fast',
                value: 121
			}]
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: ['->', {
				xtype: 'button',
				text: 'SAVE'
			}, {
				xtype: 'button',
				text: 'RESET'
			}]
		}]
	}, {
		xtype: 'panel',
		title: 'Driver Address',
		flex: 1,
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'textfield',
			fieldLabel: 'Address',
			margin: 6,
			emptyText: 'ex) Seoul, KR'
		}, {
			xtype: 'gmappanel',
			flex: 1,
			gmapType: 'map',
			zoomLevel: 14,
			center: {
				lat: 40.782686,
				lng: -73.96524,
				// geoCodeAddr: "221B Baker Street",
				marker: {
					title: 'Central Park'
				}
			},
			mapOptions : {
				mapTypeId: google.maps.MapTypeId.ROADMAP
			}
		}]
	}]
});
