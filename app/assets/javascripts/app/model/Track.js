Ext.define('App.model.Track', {
  extend: 'Ext.data.Model',

  fields: [{
    name: 'id', type: 'string'
  }, {
    name: 'driver_id', type: 'string'
  }, {
    name: 'trip_id', type: 'string'
  }, {
    name: 'start_time', type: 'date'
  }, {
    name: 'end_time', type: 'date'
  }, {
    name: 'elapsed', type: 'integer'
  }, {
    name: 'speed_max', type: 'integer'
  }, {
    name: 'speed_avg', type: 'integer'
  }, {
    name: 'from_lat', type: 'float'
  }, {
    name: 'from_lng', type: 'float'
  }, {
    name: 'to_lat', type: 'float'
  }, {
    name: 'to_lng', type: 'float'
  }, {
    name: 'distance', type: 'float'
  }, {
    name: 'status', type: 'string'
  }, {
    name: 'count_off', type: 'integer'
  }, {
    name: 'count_idle', type: 'integer'
  }, {
    name: 'count_slow', type: 'integer'
  }, {
    name: 'count_normal', type: 'integer'
  }, {
    name: 'count_fast', type: 'integer'
  }, {
    name: 'count_speeding', type: 'integer'
  }, {
    name: 'from_address', type: 'string'
  }, {
    name: 'to_address', type: 'string'
  }, {
    name: 'speed', type: 'integer'
  }, {
    name: 'front_img_url', type: 'string'
  }, {
    name: 'rear_img_url', type: 'string'
  }, {
    name: 'video_url', type: 'string'
  }, {
    name: 'front_video_url', type: 'string'
  }, {
    name: 'rear_video_url', type: 'string'
  }],

  proxy: {
    type: 'rest',
    url: 'tracks',
    reader: {
      type: 'json'
    }
  }
});
