Ext.define('App.view.setting.GroupDevice', {
  extend: 'Ext.panel.Panel',
  requires: [
    'App.view.setting.GroupDeviceController',
    'App.view.setting.SettingModel',
    'Ext.ux.GMapPanel'
  ],

  xtype: 'setting-group-device',

  controller: 'group_device',
  viewModel: {
    type: 'setting'
  },

  title: 'DEVICE SETTING',

  layout: {
    type: 'hbox',
    align: 'stretch'
  },

  items: [{
    xtype: 'form',
    border: 0,
    padding: 8,
    width: 360,
    items: [{
      xtype: 'fieldset',
      title: 'Group',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        labelWidth: 120,
        labelAlign: 'right'
      },
      items: [{
        xtype: 'combo',
        fieldLabel: 'Group',
        displayField: 'name',
        valueField: 'name',
        queryMode: 'local',
        bind: {
          selection: '{current.group_selection}',
          store: '{stores.groups}'
        }
      }]
    }, {
      xtype: 'fieldset',
      title: 'Data Cycle',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        labelWidth: 120,
        labelAlign: 'right'
      },
      items: [{
        xtype: 'combo',
        fieldLabel: 'GPS',
        displayField: 'value',
        valueField: 'value',
        queryMode: 'local',
        bind: {
          store: '{stores.gps_options}'
        }
      }, {
        xtype: 'combo',
        fieldLabel: 'GPS JPG',
        displayField: 'value',
        valueField: 'value',
        queryMode: 'local',
        bind: {
          store: '{stores.gps_jpg_options}'
        }
      }]
    }, {
      xtype: 'fieldset',
      title: 'Event Alarm',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        labelWidth: 120,
        labelAlign: 'right'
      },
      items: [{
        xtype: 'radiogroup',
        fieldLabel: 'Emergency Button',
        layout: 'hbox',
        defaults: {
          flex: 1,
          padding: '0 4'
        },
        items: [{
          xtype: 'radio',
          boxLabel: 'Inactive',
          name: 'e_button'
        }, {
          xtype: 'radio',
          boxLabel: 'Active',
          name: 'e_button',
          checked: true
        }]
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'External Emergency Button',
        layout: 'hbox',
        defaults: {
          flex: 1,
          padding: '0 4'
        },
        items: [{
          xtype: 'radio',
          boxLabel: 'Inactive',
          name: 'ee_button'
        }, {
          xtype: 'radio',
          boxLabel: 'Active',
          name: 'ee_button',
          checked: true
        }]
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'G sensor ',
        layout: 'hbox',
        defaults: {
          flex: 1,
          padding: '0 4'
        },
        items: [{
          xtype: 'radio',
          boxLabel: 'Inactive',
          name: 'g_sensor'
        }, {
          xtype: 'radio',
          boxLabel: 'Active',
          name: 'g_sensor',
          checked: true
        }]
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'Over Speed ',
        layout: 'hbox',
        defaults: {
          flex: 1,
          padding: '0 4'
        },
        items: [{
          xtype: 'radio',
          boxLabel: 'Inactive',
          name: 'overspeed'
        }, {
          xtype: 'radio',
          boxLabel: 'Active',
          name: 'overspeed',
          checked: true
        }]
      }, {
        xtype: 'radiogroup',
        fieldLabel: 'Geofence',
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        defaults: {
          xtype: 'container',
          layout: {
            type: 'hbox',
            align: 'stretch'
          },
          flex: 1
        },
        items: [{
          defaults: {
            flex: 1,
            padding: '0 4'
          },
          items: [{
            xtype: 'radio',
            boxLabel: 'Inactive',
            name: 'geofence'
          }, {
            xtype: 'radio',
            boxLabel: 'Area1',
            name: 'geofence',
            checked: true
          }]
        }, {
          defaults: {
            flex: 1,
            padding: '0 4'
          },
          items: [{
            xtype: 'radio',
            boxLabel: 'Area2',
            name: 'geofence'
          }, {
            xtype: 'radio',
            boxLabel: 'Area3',
            name: 'geofence'
          }]
        }]
      }]
    }],
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',
      items: ['->', {
        xtype: 'button',
        text: 'SAVE'
      }, {
        xtype: 'button',
        text: 'RESET'
      }]
    }]
  }, {
    xtype: 'gmappanel',
    flex: 1,
    itemId: 'gmap',
    gmapType: 'map',
    zoomLevel: 14,
    center: {
      lat: 40.782686,
      lng: -73.96524,
      // geoCodeAddr: "221B Baker Street",
      marker: {
        title: 'Central Park'
      }
    },
    mapOptions : {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  }]
});
