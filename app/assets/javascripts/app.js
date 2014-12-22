Ext.Loader.setConfig({
  enabled : true,
  paths : {
    'Ext.ux': 'assets/ext/src/ux',
    'App': 'assets/app'
  }
});

Ext.require(['App.Framework']);

Ext.application({
  extend: 'App.Application',

  name: 'App',

  appFolder: 'assets/app'
});
