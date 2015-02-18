Ext.define('App.store.TripStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Trip',

  autoLoad: false,

  pageSize: 10,

  remoteSort: true,

  proxy: {
    type: 'rest',
    url: 'trips',
    reader: {
      type: 'json',
      root: 'trips',
      totalProperty: 'total'
    }
  }
});
