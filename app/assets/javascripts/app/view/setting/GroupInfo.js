Ext.define('App.view.setting.GroupInfo', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.setting.GroupInfoController',
		'App.view.setting.GroupInfoModel',
		'Ext.ux.GMapPanel'
	],

	xtype: 'setting-group-info',

	controller: 'group_info',
	viewModel: {
		type: 'group_info'
	},

	title: 'GROUP INFORMATION',

	layout: {
		type: 'hbox',
		align: 'stretch'
	},

	items: [{
		xtype: 'form',
        border: 0,
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
                itemId: 'combo_group',
				fieldLabel: 'Group',
				displayField: 'name',
				valueField: 'name',
				queryMode: 'local',
				bind: {
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
				emptyText: 'ex) Arion',
                bind: {
                    value: '{current_group.name}'
                }
			}, {
				xtype: 'textarea',
				fieldLabel: 'Description',
				emptyText: 'ex) Arion Co. LTD.',
                bind: {
                    value: '{current_group.description}'
                }
			}, {
				xtype: 'textarea',
				fieldLabel: '*Address',
				emptyText: 'ex) Seoul, KR',
                bind: {
                    value: '{current_group.address}'
                }
			}]
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: ['->', {
				xtype: 'button',
				itemId: 'btn_save',
				text: 'SAVE'
			}, {
				xtype: 'button',
				itemId: 'btn_reset',
				text: 'RESET'
			}]
		}]
	}, {
		xtype: 'gmappanel',
		flex: 1,
        itemId: 'gmap',
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
