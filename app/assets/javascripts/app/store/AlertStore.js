Ext.define('App.store.AlertStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Alert',

  autoLoad: true,

  proxy: {
    type: 'rest',
    url: 'alerts',
    reader: {
      type: 'json'
    }
  }
});
