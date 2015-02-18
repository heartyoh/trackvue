Ext.define('App.store.AlertStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Alert',

  autoLoad: false,

  pageSize: 20,

  remoteSort: true,

  proxy: {
    type: 'rest',
    url: 'alerts',
    reader: {
      type: 'json',
      root: 'alerts',
      totalProperty: 'total'
    }
  }
});
