Ext.require('App.store.DriverStore');
Ext.require('App.store.TripStore');
Ext.require('App.store.AlertStore');
Ext.require('App.store.TrackStore');

Ext.define('App.view.track.TrackModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.track',

  formulas: {
    trip_start_time: function (get) {
      return Ext.Date.format(get('trip.start_time'), 'Y-m-d H:i:s');
    },
    trip_end_time: function (get) {
      return Ext.Date.format(get('trip.end_time'), 'Y-m-d H:i:s');
    },
    vehicle_last_time: function(get) {
      return Ext.Date.format(get('vehicle.updated_at'), 'Y-m-d H:i:s');
    }
  },

  data: {
    location: {
      description: 'Arion Technology',
      address: 'Hogye 2(i)-dong, Dongan-gu, Anyang-si, Gyeonggi-do, South Korea',
      lat: 37.52,
      lng: 127.031,
      vehicle_count: 6,
      total_trips: 194
    },

    vehicle: {
      driver_img_url: '/assets/ph_user.png',
      vehicle_img_url: '/assets/ph_car.png'
    },

    // trip: {
    //   id: '14',
    //   start_time: 'Sat 29/11/2014 11:52 AM',
    //   end_time: 'Sat 29/11/2014 11:54 AM',
    //   distance: '1.0 km',
    //   duration: '02:09 m:s',
    //   speed_max: '0 km/h',
    //   speed_avg: 28,
    //   status: 'Trip has ended',
    //   events: '9 2070000',
    //   from: '898-6 Pyeongchon-dong, Dongan-gu, Anyang, Gyeonggi-do, South Korea',
    //   to: '133 Pyeongchon-dong, Dongan-gu, Anyang, Gyeonggi-do, South Korea'
    // },

    stores: {
      drivers: Ext.create('App.store.DriverStore'),
      trips: Ext.create('App.store.TripStore'),
      tracks: Ext.create('App.store.TrackStore'),
      alerts: Ext.create('App.store.AlertStore'), // 최근 기간 검색
      alert_history: Ext.create('App.store.AlertStore') // 전체 기간 검
    }
  }
});
