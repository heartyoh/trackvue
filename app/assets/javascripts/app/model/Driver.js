Ext.define('App.model.Driver', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'id', type: 'string'
  }, {
    name: 'lastname', type: 'string'
  }, {
    name: 'firstname', type: 'string'
  }, {
    name: 'email', type: 'string'
  }, {
    name: 'group_id', type: 'string'
  }, {
    name: 'vehicle_name', type: 'string'
  }, {
    name: 'car_model', type: 'string'
  }, {
    name: 'speed_slow', type: 'float'
  }, {
    name: 'speed_normal', type: 'float'
  }, {
    name: 'speed_fast', type: 'float'
  }, {
    name: 'address', type: 'string'
  }, {
    name: 'driver_img_url', type: 'string'
  }, {
    name: 'vehicle_img_url', type: 'string'
  }, {
    name: 'speed', type: 'integer'
  }, {
    name: 'lat', type: 'float'
  }, {
    name: 'lng', type: 'float'
  }, {
    name: 'status', type: 'string'
  }, {
    name: 'address', type: 'string'
  }, {
    name: 'updated_at', type: 'date'
  }]
});
