Ext.define('App.view.setting.GroupDeviceController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.group_device',

  control: {
    '#': {
      afterrender: 'onAfterRender'
    },
    '#gmap': {
      mapready: 'onMapReady'
    },
    '#combo_group': {
      change: 'onChangeGroup'
    }
  },

  onMapReady: function() {
    var gmap = this.getView().down('#gmap').gmap;

    var drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.MARKER,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: [
          google.maps.drawing.OverlayType.MARKER,
          google.maps.drawing.OverlayType.CIRCLE,
          google.maps.drawing.OverlayType.POLYGON,
          google.maps.drawing.OverlayType.POLYLINE,
          google.maps.drawing.OverlayType.RECTANGLE
        ]
      },
      markerOptions: {
        draggable: true
      },
      polygonOptions: {
        draggable: true,
        editable: true
      },
      circleOptions: {
        fillColor: '#ffff00',
        fillOpacity: 1,
        strokeWeight: 5,
        clickable: false,
        editable: true,
        zIndex: 1
      }
    });
    drawingManager.setMap(gmap);
  },

  onAfterRender: function() {
  },

  onChangeGroup: function(combo, newValue, oldValue, eOpts) {
    HF.setting.set('current_group', newValue);
    var store = this.getViewModel().get('stores.groups');
    var record = store.findRecord('name', newValue);
    this.getViewModel().set('current_group', record ? record.data : {});
  }

});
