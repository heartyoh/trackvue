Ext.define('App.store.DriverStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Driver',

  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/drivers.json',
    reader: {
      type: 'json'
    }
  }
});
