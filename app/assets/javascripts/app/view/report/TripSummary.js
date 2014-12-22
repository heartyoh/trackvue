Ext.define('App.view.report.TripSummary', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.report.ReportController',
		'App.view.report.ReportModel'
	],

	xtype: 'report-trip-summary',
	
	controller: 'report',
	viewModel: {
		type: 'report'
	},

	// title: 'REPORT TRIP: ARION > >',

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
		title: 'TRIP SUMMARY',
		tools: [{
			xtype: 'button',
			text: 'Print'
		}, {
			xtype: 'button',
			text: 'Export'
		}],
		store: {
			fields:['vehicle', 'driver', 'trip', 'speedavg', 'distance', 'startdate', 'duration', 'startloc'],
			data:[
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' },
				{ vehicle: 'Lisa',  driver: 'V001', trip: 11, speedavg: 20.225, distance: 19.085, startdate: '23/12/2014 02:43 PM', duration: '38:33', startloc: '146-2 Gaebong 1(il)-dong, Guro-gu, Seoul, South Korea' }
			],
			proxy: {
				type: 'memory'
			}
		},
		columns: [
			{ text: 'VEHICLE',  dataIndex: 'vehicle', width: 80 },
			{ text: 'DRIVER', dataIndex: 'driver', width: 80 },
			{ text: 'TRIP', dataIndex: 'trip', width: 40 },
			{ text: 'AVG. SP', dataIndex: 'speedavg', width: 120 },
			{ text: 'DISTANCE', dataIndex: 'distance', width: 120 },
			{ text: 'START DATE', dataIndex: 'startdate', width: 160 },
			{ text: 'DURATION', dataIndex: 'duration', width: 80 },
			{ text: 'START LOCATION', dataIndex: 'startloc', width: 300 }
		]
	}]
});