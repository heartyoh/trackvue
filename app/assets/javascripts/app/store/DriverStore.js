Ext.define('App.store.DriverStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Driver',

  autoLoad: false,

  proxy: {
    type: 'rest',
    url: 'drivers',
    reader: {
      type: 'json'
    }
  }
});
