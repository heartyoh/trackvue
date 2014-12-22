Ext.define('App.model.Driver', {
  extend: 'Ext.data.Model',

  fields: [{
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
  }]
});
