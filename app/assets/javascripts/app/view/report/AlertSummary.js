Ext.define('App.view.report.AlertSummary', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.report.ReportController',
		'App.view.report.ReportModel'
	],

	xtype: 'report-alert-summary',
	
	controller: 'report',
	viewModel: {
		type: 'report'
	},

	// title: 'REPORT ALERTS: ARION > >',

	layout: 'border',

	items: [{
		xtype: 'form',
		title: 'REPORT SETTING',
		region: 'west',
		split: true,
		collapsible: true,
		width: 240,
		defaults: {
			padding: 4
		},
		layout: {
			type: 'vbox',
			align: 'stretch'
		},
		items: [{
			xtype: 'combo',
			fieldLabel: 'Location'
		}, {
			xtype: 'combo',
			fieldLabel: 'Driver'
		}, {
			xtype: 'datefield',
			fieldLabel: 'Start Date'
		}, {
			xtype: 'datefield',
			fieldLabel: 'End Date'
		}],
		dockedItems: [{
			xtype: 'toolbar',
			dock: 'bottom',
			items: ['->', {
				xtype: 'button',
				text: 'RESET'
			}, {
				xtype: 'button',
				text: 'CANCEL'
			}, {
				xtype: 'button',
				text: 'SHOW'
			}]
		}]
	}, {
		xtype: 'grid',
		region: 'center',
		tools: [{
			xtype: 'button',
			text: 'Print'
		}, {
			xtype: 'button',
			text: 'Export'
		}],
		title: 'DRIVER ALERTS',
		store: {
			fields:['vehicle', 'driver', 'type', 'speed', 'heading', 'datetime', 'value', 'location'],
			data:[
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', type: 'targeted geofence exit', speed: '70 km/h', heading: 'Souteeast', datetime: '23/12/2014 02:43 PM', value: '', location: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' }
			],
			proxy: {
				type: 'memory'
			}
		},
		columns: [
			{ text: 'VEHICLE',  dataIndex: 'vehicle', width: 80 },
			{ text: 'DRIVER', dataIndex: 'driver', width: 80 },
			{ text: 'TYPE', dataIndex: 'type', width: 160 },
			{ text: 'SPEED', dataIndex: 'speed', width: 80 },
			{ text: 'HEADING', dataIndex: 'heading', width: 120 },
			{ text: 'DATETIME', dataIndex: 'datetime', width: 160 },
			{ text: 'VALUE', dataIndex: 'value', width: 80 },
			{ text: 'LOCATION', dataIndex: 'location', width: 300 }
		]
	}]
});