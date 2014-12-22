Ext.define('App.view.setting.GroupInfo', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.setting.SettingController',
		'App.view.setting.SettingModel',
		'Ext.ux.GMapPanel'
	],

	xtype: 'setting-group-info',
	
	controller: 'setting',
	viewModel: {
		type: 'setting'
	},

	title: 'GROUP INFORMATION',

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'form',
		padding: 8,
		width: 360,
		items: [{
			xtype: 'fieldset',
			title: 'Group',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			padding: 6,
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
			title: 'Group Information',
			layout: {
				type: 'vbox',
				align: 'stretch'
			},
			padding: 6,
			defaults: {
				labelWidth: 120,
				labelAlign: 'right'
			},
			items: [{
				xtype: 'textfield',
				fieldLabel: 'Name',
				emptyText: 'ex) Arion'
			}, {
				xtype: 'textarea',
				fieldLabel: 'Description',
				emptyText: 'ex) Arion Co. LTD.'
			}, {
				xtype: 'textarea',
				fieldLabel: '*Address',
				emptyText: 'ex) Seoul, KR'
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
});