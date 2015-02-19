Ext.define('App.view.track.Track', {
  extend: 'Ext.container.Container',
  requires: [
    'App.view.track.TrackController',
    'App.view.track.TrackModel',
    'Ext.ux.GMapPanel'
  ],

  xtype: 'app-track',

  controller: 'track',
  viewModel: {
    type: 'track'
  },

  layout: {
    type: 'border'
  },

  items: [{
    xtype: 'panel',
    itemId: 'infopanel',
    title: 'Information',
    header: false,
    region: 'west',
    width: 410,
    collapsible: true,
    split: true,
    layout: 'border',
    items: [{
      xtype: 'tabpanel',
      itemId: 'tabmaster',
      region: 'center',
      items: [{
        xtype: 'grid',
        itemId: 'drivers',
        title: 'DRIVER VEHICLES',
        bind: {
          store: '{stores.drivers}'
        },
        columns: [
          { text: '#', dataIndex: 'id', width: 30 },
          { text: 'DRIVER',  dataIndex: 'lastname', width: 100 },
          { text: 'VEHICLE', dataIndex: 'vehicle_name', width: 100 },
          { text: 'STS', dataIndex: 'status', width: 50 },
          { text: 'SPD', dataIndex: 'speed', width: 50 },
          // { text: 'HEADING', dataIndex: 'heading', width: 60 },
          { text: 'LOCATION', dataIndex: 'address', width: 180,
            renderer: function(value, x, record) {
              return value || '(home)';
            }
          }
        ]
      }, {
        xtype: 'grid',
        itemId: 'alerts',
        title: 'DRIVER ALERTS',
        bind: {
          store: '{stores.alerts}'
        },
        columns: [
          { text: 'VEHICLE / DRIVER',  width: 200, sortable: false,
            renderer: function(value, x, record) {
              var drivers = this.up('app-track').getViewModel().get('stores.drivers');
              var driver = drivers.findRecord('id', record.get('driver_id'));
              return driver.get('lastname') + ' ' + driver.get('firstname') + ' / ' + driver.get('vehicle_name');
            }
          },
          // { text: 'DRIVER', dataIndex: 'driver_id', width: 80 },
          { xtype: 'datecolumn', text: 'DATE/TIME', dataIndex: 'alert_time', format: 'Y-m-d H:i:s', width: 150 },
          { text: 'TYPE', dataIndex: 'alert_type', sortable: false, align: 'center', width: 50, renderer: HF.renderer.alert_type },
          { text: 'DESCRIPTION', dataIndex: 'description', sortable: false, flex: 1, renderer: HF.renderer.alert_description }
        ],
        dockedItems: [{
          xtype: 'pagingtoolbar',
          dock: 'bottom',
          displayInfo: true,
          displayMsg: '{0} - {1} of {2}',
          bind: {
            store: '{stores.alerts}'
          }
        }]
      }]
    }, {
      xtype: 'tabpanel',
      itemId: 'tabdetail',
      title: 'Speed : <span class="speed-off">Off</span>' +
        '<span class="speed-idle">Idle</span>' +
        '<span class="speed-slow">Slow</span>' +
        '<span class="speed-normal">Normal</span>' +
        '<span class="speed-fast">Fast</span>' +
        '<span class="speed-speeding">Speeding</span>',
      region: 'south',
      collapsible: true,
      height: 300,
      items: [{
        xtype: 'panel',
        title: 'LOCATION',
        layout: {
          type: 'vbox',
          align: 'center'
        },
        padding: 10,
        defaults: {
          xtype: 'displayfield',
          labelStyle: 'font-weight:bold;',
          labelAlign: 'right',
          labelAlign: 'right',
          editable: false,
          padding: 4,
          width: 400
        },
        items: [{
          fieldLabel: 'LOCATION',
          bind: {
            value: '{location.description}'
          }
        }, {
          fieldLabel: 'Address',
          bind: {
            value: '{location.address}'
          }
        }, {
          fieldLabel: 'Vehicles',
          bind: {
            value: '{location.vehicle_count}'
          }
        // }, {
        //   fieldLabel: 'Trips',
        //   bind: {
        //     value: '{location.total_trips}'
        //   }
        }]
      }, {
        xtype: 'container',
        title: 'DRIVER',
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        items: [{
          xtype: 'panel',
          border: 0,
          layout: {
            type: 'vbox',
            align: 'center'
          },
          padding: 8,
          defaults: {
            xtype: 'displayfield',
            labelStyle: 'font-weight:bold;',
            labelAlign: 'right',
            padding: 0,
            width: 380
          },
          items: [{
            fieldLabel: 'Driver',
            bind: {
              value: '{vehicle.firstname} {vehicle.lastname}'
            }
          }, {
            fieldLabel: 'Vehicle',
            bind: {
              value: '{vehicle.vehicle_name} {vehicle.car_model}'
            }
          }, {
            fieldLabel: 'Speed',
            bind: {
              value: '{vehicle.speed}'
            }
          }, {
          //   fieldLabel: 'Heading',
          //   bind: {
          //     value: '{vehicle.heading}'
          //   }
          // }, {
            fieldLabel: 'Date/Time',
            bind: {
              value: '{vehicle_last_time}'
            }
          }, {
            fieldLabel: 'Location',
            bind: {
              value: '{vehicle.address}'
            }
          }]
        }, {
          xtype: 'container',
          flex: 1,
          layout: {
            type: 'vbox',
            align: 'stretch'
          },
          defaults: {
            xtype: 'image',
            flex: 1,
            border: 4,
            margin: 8,
            style: {
                borderColor: 'lightgray',
                borderStyle: 'solid'
            }
          },
          items: [{
            bind: {
              // src: '{vehicle.driver_img_url}'
              src: 'assets/ph_user.png'
            }
          }, {
            bind: {
              // src: '{vehicle.vehicle_img_url}'
              src: 'assets/ph_car.png'
            }
          }]
        }]
      }, {
        xtype: 'grid',
        title: 'ALERTS',
        itemId: 'driver_alerts',
        bind: {
          store: '{stores.alert_history}'
        },
        columns: [
          { xtype: 'datecolumn', text: 'DATE/TIME', dataIndex: 'alert_time', format: 'Y-m-d H:i:s', width: 160 },
          { text: 'TYPE', dataIndex: 'alert_type', align: 'center', width: 50, sortable: false, renderer: HF.renderer.alert_type },
          { text: 'DESCRIPTION', dataIndex: 'description', flex: 1, sortable: false, renderer: HF.renderer.alert_description }
        ],
        dockedItems: [{
          xtype: 'pagingtoolbar',
          dock: 'bottom',
          displayInfo: true,
          displayMsg: '{0} - {1} of {2}',
          bind: {
            store: '{stores.alert_history}'
          }
        }]
      }, {
        xtype: 'grid',
        title: 'TRIPS',
        itemId: 'trips',
        bind: {
          store: '{stores.trips}'
        },
        columns: [
          { text: '#', dataIndex: 'id', width: 50, hidden: true },
          { xtype: 'datecolumn', text: 'START TIME',  dataIndex: 'start_time', format: 'Y-m-d H:i:s', width: 160 },
          { text: 'MAX', dataIndex: 'speed_max', width: 60, sortable: false },
          { text: 'AVG', dataIndex: 'speed_avg', width: 60, sortable: false },
          { text: 'DIST.', dataIndex: 'distance', width: 60, sortable: false },
          { text: 'DURATION', dataIndex: 'calculated_elapsed', width: 80, sortable: false }
        ],
        dockedItems: [{
          xtype: 'pagingtoolbar',
          dock: 'bottom',
          displayInfo: true,
          displayMsg: '{0} - {1} of {2}',
          bind: {
            store: '{stores.trips}'
          }
        }]
      }, {
        xtype: 'panel',
        title: 'TRIP INFO.',
        tbar: [{
          xtype: 'displayfield',
          fieldLabel: 'Started at',
          labelStyle: 'font-weight:bold;',
          labelWidth: 60,
          bind: {
            value: '{trip.start_time}'
          }
        // }, '->', {
        //   icon: '/assets/sort_up.png'
        // }, {
        //   icon: '/assets/sort_down.png'
        }],
        // layout: 'anchor',
        autoScroll: true,
        margin: '0 8 4 8',
        defaults: {
          xtype: 'displayfield',
          labelStyle: 'font-weight:bold;',
          labelAlign: 'right',
          labelWidth: 140,
          editable: false,
          padding: 0
        },
        items: [{
          fieldLabel: 'Till',
          labelWidth: 68,
          bind: {
            value: '{trip.end_time}'
          }
        }, {
          fieldLabel: 'Duration / Distance',
          bind: {
            value: '{trip.calculated_elapsed} / {trip.distance} Km'
          }
        }, {
          fieldLabel: 'Speed / Status',
          bind: {
            value: '{trip.speed_max} Km/h (Avg: {trip.speed_avg}) / {trip.status}'
          }
        }, {
          fieldLabel: 'Speeds',
          bind: {
            value: '{trip.events}'
          }
        }, {
          fieldLabel: 'From',
          bind: {
            value: '{trip.from_address}'
          }
        }, {
          fieldLabel: 'To',
          bind: {
            value: '{trip.to_address}'
          }
        }]
      }]
    }]
  }, {
    region: 'center',
    xtype: 'gmappanel',
    itemId: 'gmap',
    gmapType: 'map',
    // zoomLevel: 14,
    center: {
      lat: 40.782686,
      lng: -73.96524,
      // geoCodeAddr: "221B Baker Street",
      marker: {
        title: 'Central Park'
      }
    },
    mapOptions: {
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }/*,
    listeners: {
      mapready: 'onMapReady'
    }*/
  }]
});
