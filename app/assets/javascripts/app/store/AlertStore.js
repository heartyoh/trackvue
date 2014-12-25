Ext.define('App.store.AlertStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Alert',

  autoLoad: false,

  proxy: {
    type: 'rest',
    url: 'alerts',
    reader: {
      type: 'json'
    }
  }
});
