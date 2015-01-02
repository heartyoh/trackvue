Ext.require('App.store.GroupStore');

Ext.define('App.view.setting.SettingModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.setting',

  data: {
    stores: {
      groups: Ext.create('App.store.GroupStore'),
      gps_options: Ext.create('Ext.data.Store', {
        fields:['value'],
        data:[
          { value: '30 Seconds' },
          { value: '1 Minute' },
          { value: '1 Min 30 Seconds' },
          { value: '2 Minutes' }
        ],
        proxy: {
          type: 'memory'
        }
      }),
      gps_jpg_options: Ext.create('Ext.data.Store', {
        fields:['value'],
        data:[
          { value: '2 Minutes' },
          { value: '4 Minutes' },
          { value: '6 Minutes' },
          { value: '8 Minutes' },
          { value: '10 Minutes' }
        ],
        proxy: {
          type: 'memory'
        }
      }),
	  geofence: Ext.create('App.store.GeofenceStore')
    },
    current: {
      group: 'Arion'
    },
    register: {
      driver_image: '/assets/ph_user.png',
      vehicle_image: '/assets/ph_car.png'
    }
  }
});
