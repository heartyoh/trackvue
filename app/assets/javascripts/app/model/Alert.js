Ext.define('App.model.Alert', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'id', type: 'string'
  }, {
    name: 'driver_id', type: 'string'
  }, {
    name: 'alert_time', type: 'date'
  }, {
    name: 'alert_type', type: 'string'
  }, {
    name: 'severity', type: 'string'
  }, {
    name: 'value', type: 'string'
  }, {
    name: 'lat', type: 'float'
  }, {
    name: 'lng', type: 'float'
  }, {
    name: 'front_img_url', type: 'string'
  }, {
    name: 'rear_img_url', type: 'string'
  }],

  proxy: {
    type: 'rest',
    url: 'alerts',
    reader: {
      type: 'json'
    }
  }
});
