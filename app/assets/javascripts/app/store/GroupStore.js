Ext.define('App.store.GroupStore', {
  extend: 'Ext.data.Store',

  model: 'App.model.Group',

  autoLoad: true,

  proxy: {
    type: 'ajax',
    url: '/groups.json',
    reader: {
      type: 'json'
    }
  }
});
