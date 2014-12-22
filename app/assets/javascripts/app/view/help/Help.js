Ext.define('App.view.help.Help', {
	extend: 'Ext.panel.Panel',
	requires: [
		'App.view.main.MainController',
		'App.view.main.MainModel',
		'Ext.ux.GMapPanel'
	],

	xtype: 'help-help',
	
	// controller: 'trip-summary',
	// viewModel: {
	// 	type: 'trip-summary'
	// },

	title: 'HELP: ARION > >',

	layout: 'fit',

	items: []
});