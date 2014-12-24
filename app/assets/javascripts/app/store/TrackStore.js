Ext.define('App.store.TrackStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Track',

  autoLoad: false,

  proxy: {
    type: 'rest',
    url: 'tracks',
    reader: {
      type: 'json'
    }
  }
});
