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
    region: 'west',
    width: 500,
    // split: true,
    layout: 'border',
    items: [{
      xtype: 'tabpanel',
      region: 'center',
      items: [{
        xtype: 'grid',
        itemId: 'drivers',
        title: 'DRIVER VEHICLES',
        bind: {
          store: '{stores.drivers}'
        },
        columns: [
          { text: 'DRIVER',  dataIndex: 'lastname', width: 80 },
          { text: 'VEHICLE', dataIndex: 'vehicle_name', width: 80 },
          { text: 'STS', dataIndex: 'status', width: 40 },
          { text: 'SPD', dataIndex: 'speed', width: 40 },
          { text: 'HEADING', dataIndex: 'heading', width: 120 },
          { text: 'LOCATION', dataIndex: 'location', width: 120 }
        ]
      }, {
        xtype: 'grid',
        title: 'DRIVER ALERTS',
        bind: {
          store: '{stores.alerts}'
        },
        columns: [
          { text: 'VEHICLE',  dataIndex: 'vehicle', width: 80 },
          { text: 'DRIVER', dataIndex: 'driver', width: 80 },
          { text: 'DATE/TIME', dataIndex: 'datetime', width: 120 },
          { text: 'TYP', dataIndex: 'type', width: 40 },
          { text: 'SEV', dataIndex: 'severity', width: 40 },
          { text: 'DESCRIPTION', dataIndex: 'description', flex: 1 }
        ]

      }]
    // }, {
    //     xtype: 'component',
    //     region:'south',
    //     height: 20,
    //     cls: 'speed-regend',
    //     html: 'Speed : <span class="speed-off">Off</span>' +
    //         '<span class="speed-idle">Idle</span>' +
    //         '<span class="speed-slow">Slow</span>' +
    //         '<span class="speed-normal">Normal</span>' +
    //         '<span class="speed-fast">Fast</span>' +
    //         '<span class="speed-speeding">Speeding</span>'
    }, {
      xtype: 'tabpanel',
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
          xtype: 'textfield',
          fieldStyle: 'border:none 0px black',
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
          xtype: 'textarea',
          fieldLabel: 'Address',
          bind: {
            value: '{location.address}'
          }
        }, {
          fieldLabel: 'Vehicles',
          bind: {
            value: '{location.vehicle_count}'
          }
        }, {
          fieldLabel: 'Trips',
          bind: {
            value: '{location.total_trips}'
          }
        }]
      }, {
        xtype: 'container',
        title: 'VEHICLE DETAILS',
        layout: {
          type: 'hbox',
          align: 'stretch'
        },
        items: [{
          xtype: 'panel',
          layout: {
            type: 'vbox',
            align: 'center'
          },
          padding: 8,
          defaults: {
            xtype: 'textfield',
            fieldStyle: 'border:none 0px black',
            labelAlign: 'right',
            editable: false,
            padding: 0,
            width: 380
          },
          items: [{
            fieldLabel: 'VEHICLE',
            bind: {
              value: '{vehicle.vehicle_name}'
            }
          }, {
            fieldLabel: 'Driver',
            bind: {
              value: '{vehicle.lastname}'
            }
          }, {
            fieldLabel: 'Speed',
            bind: {
              value: '{vehicle.speed}'
            }
          }, {
            fieldLabel: 'Heading',
            bind: {
              value: '{vehicle.heading}'
            }
          }, {
            fieldLabel: 'Date/Time',
            bind: {
              value: '{vehicle.datetime}'
            }
          }, {
            xtype: 'textarea',
            fieldLabel: 'Location',
            bind: {
              value: '{vehicle.location}'
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
              src: '{vehicle.driver_img_url}'
            }
          }, {
            bind: {
              src: '{vehicle.vehicle_img_url}'
            }
          }]
        }]
      }, {
        xtype: 'grid',
        title: 'ALERTS',
        bind: {
          store: '{stores.alert_history}'
        },
        columns: [
          { text: 'VEHICLE',  dataIndex: 'vehicle', width: 80 },
          { text: 'DRIVER', dataIndex: 'driver', width: 80 },
          { text: 'DATE/TIME', dataIndex: 'datetime', width: 120 },
          { text: 'TYP', dataIndex: 'type', width: 40 },
          { text: 'SEV', dataIndex: 'severity', width: 40 },
          { text: 'DESCRIPTION', dataIndex: 'description', flex: 1 }
        ]
      }, {
        xtype: 'grid',
        title: 'TRIPS',
        bind: {
          store: '{stores.trips}'
        },
        columns: [
          { text: 'DATE/TIME',  dataIndex: 'datetime', width: 150 },
          { text: 'MAX', dataIndex: 'speed_max', width: 80 },
          { text: 'AVG', dataIndex: 'speed_avg', width: 80 },
          { text: 'DISTANCE', dataIndex: 'distance', width: 80 },
          { text: 'TIME', dataIndex: 'time', width: 80 }
        ]
      }, {
        xtype: 'panel',
        title: 'TRIP DETAILS',
        tbar: [{
          xtype: 'label',
          bind: {
            text: 'TRIP ID: {trip.id}'
          }
        }, '->', {
          text: 'up'
        }, {
          text: 'down'
        }],
        layout: {
          type: 'vbox',
          align: 'stretch'
        },
        margin: '0 8 4 8',
        defaults: {
          xtype: 'textfield',
          fieldStyle: 'border:none 0px black',
          labelAlign: 'right',
          labelWidth: 140,
          editable: false,
          padding: 0
        },
        items: [{
          fieldLabel: 'Start / End Time',
          bind: {
            value: '{trip.start_time} / {trip.end_time}'
          }
        }, {
          fieldLabel: 'Distance / Duration',
          bind: {
            value: '{trip.distance} / {trip.duration}'
          }
        }, {
          fieldLabel: 'Speed / Status',
          bind: {
            value: '{trip.speed_max} (Avg: {trip.speed_avg}) / {trip.status}'
          }
        }, {
          fieldLabel: 'Events',
          bind: {
            value: '{trip.events}'
          }
        }, {
          fieldLabel: 'From',
          bind: {
            value: '{trip.from}'
          }
        }, {
          fieldLabel: 'To',
          bind: {
            value: '{trip.to}'
          }
        }]
      }]
    }]
  }, {
    region: 'center',
    xtype: 'gmappanel',
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
