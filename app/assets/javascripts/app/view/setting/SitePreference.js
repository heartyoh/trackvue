Ext.define('App.view.setting.SitePreference', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.setting.SettingController',
		'App.view.setting.SettingModel',
		'Ext.ux.GMapPanel'
	],

	xtype: 'setting-site-preference',
	
	controller: 'setting',
	viewModel: {
		type: 'setting'
	},

	title: 'SITE PREFERENCE',

	layout: {
		type: 'vbox',
		align: 'center'
	},

	items: [{
		xtype: 'form',
		width: 400,
		items: [{
			xtype: 'fieldset',
			title: 'Distance & Speed',
			defaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				xtype: 'radiogroup',
				fieldLabel: 'Units',
				layout: 'hbox',
				items: [{
					xtype: 'radio',
					name: 'unit',
					boxLabel: 'Miles',
					flex: 1
				}, {
					xtype: 'radio',
					name: 'unit',
					boxLabel: 'Kilometers',
					flex: 1
				}]
			}]
		}, {
			xtype: 'fieldset',
			title: 'Date & Time',
			defaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				xtype: 'radiogroup',
				fieldLabel: 'Date Format',
				layout: 'hbox',
				items: [{
					xtype: 'radio',
					name: 'dateformat',
					boxLabel: 'MM/DD/YYYY',
					flex: 1
				}, {
					xtype: 'radio',
					name: 'dateformat',
					boxLabel: 'DD/MM/YYYY',
					flex: 1
				}]
			}, {
				xtype: 'radiogroup',
				fieldLabel: 'Time Format',
				layout: 'hbox',
				items: [{
					xtype: 'radio',
					name: 'timeformat',
					boxLabel: 'AM/PM',
					flex: 1
				}, {
					xtype: 'radio',
					name: 'timeformat',
					boxLabel: '24 HR',
					flex: 1
				}]
			}]
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: [{
				xtype: 'button',
				text: 'SAVE'
			}, {
				xtype: 'button',
				text: 'RESET'
			}]
		}]
	}]
});