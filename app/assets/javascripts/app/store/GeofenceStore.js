Ext.define('App.store.GeofenceStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Geofence',

  autoLoad: true,

  proxy: {
    type: 'rest',
    url: 'geofences',
    reader: {
      type: 'json'
    }
  }
});
