Ext.define('App.model.Geofence', {
  extend: 'Ext.data.Model',

  fields: [{
  	name: 'area', type: 'integer'
  }, {
    name: 'lat', type: 'string'
  }, {
    name: 'lng', type: 'string'
  }, {
  	name: 'group_id', type: 'string'
  }]
});
