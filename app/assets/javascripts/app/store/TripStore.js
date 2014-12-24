Ext.define('App.store.TripStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Trip',

  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: 'trips',
    reader: {
      type: 'json'
    }
  }
});
