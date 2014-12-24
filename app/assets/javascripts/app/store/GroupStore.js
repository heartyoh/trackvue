Ext.define('App.store.GroupStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Group',

  autoLoad: true,

  proxy: {
    type: 'rest',
    url: 'groups',
    reader: {
      type: 'json'
    }
  }
});
