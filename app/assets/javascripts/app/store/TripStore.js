Ext.define('App.store.TripStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Trip',

  autoLoad: true,

  proxy: {
    type: 'rest',
    url: 'trips',
    reader: {
      type: 'json'
    }
  }
});
