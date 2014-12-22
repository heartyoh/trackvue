Ext.define('App.view.track.TrackModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.track',

  data: {
    location: {
      description: 'Arion Technology',
      address: 'Hogye 2(i)-dong, Dongan-gu, Anyang-si, Gyeonggi-do, South Korea',
      vehicle_count: 6,
      total_trips: 194
    },

    vehicle: {
      vehicle: 'Olando1',
      driver: '1_Demo_arion_Demo1',
      speed: 0,
      driver_img_url: '/assets/ph_user.png',
      vehicle_img_url: '/assets/ph_car.png',
      heading: '--',
      datetime: 'Fri 01/01/2014 12:02 AM',
      location: '21 Baekhyeon-ro 101(baegil)beon-g, Bundang-gu, Seongnam-si, Gyeonggi-do, South Korea'
    },

    trip: {
      id: '14',
      start_time: 'Sat 29/11/2014 11:52 AM',
      end_time: 'Sat 29/11/2014 11:54 AM',
      distance: '1.0 km',
      duration: '02:09 m:s',
      speed_max: '0 km/h',
      speed_avg: 28,
      status: 'Trip has ended',
      events: '9 2070000',
      from: '898-6 Pyeongchon-dong, Dongan-gu, Anyang, Gyeonggi-do, South Korea',
      to: '133 Pyeongchon-dong, Dongan-gu, Anyang, Gyeonggi-do, South Korea'
    },

    stores: {
      drivers: Ext.create('App.store.DriverStore'),

      alerts: Ext.create('Ext.data.Store', {
        fields:['vehicle', 'driver', 'datetime', 'type', 'severity', 'description'],
        data:[
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' }
        ],
        proxy: {
          type: 'memory'
        }
      }),

      alert_history: Ext.create('Ext.data.Store', {
        fields:['vehicle', 'driver', 'datetime', 'type', 'severity', 'description'],
        data:[
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' },
          { vehicle: 'Lisa',  driver: 'V001', datetiem: '23/12/2014 02:43 PM', type: 0, severity: 'S', description: 'Targeted Geofence Exit' }
        ],
        proxy: {
          type: 'memory'
        }
      }),

      trips: Ext.create('Ext.data.Store', {
        fields:['datetime', 'speed_max', 'speed_avg', 'distance', 'time'],
        data:[
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' },
          { datetime: '23/12/2014 02:43 PM', speed_max: 121, speed_avg: 62, distance: 24.2, time: '00:11:28' }
        ],
        proxy: {
          type: 'memory'
        }
      })
    }
  }
});
