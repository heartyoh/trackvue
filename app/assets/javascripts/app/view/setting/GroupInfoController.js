Ext.define('App.view.setting.GroupInfoController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.group_info',

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

    /* Insert Polygon into the map */
    var p1 = new google.maps.LatLng(25.774252, -80.190262);
    var p2 = new google.maps.LatLng(18.466465, -66.118292);
    var p3 = new google.maps.LatLng(32.321384, -64.75737);

    var triangleCoords = [p1, p2, p3];

    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      editable: true,
      draggable: true
    });

    bermudaTriangle.setMap(gmap);

    var bounds = new google.maps.LatLngBounds();
    bounds.extend(p1);
    bounds.extend(p2);
    bounds.extend(p3);

    gmap.fitBounds(bounds);

    var paths = bermudaTriangle.getPaths();

    google.maps.event.addListener(bermudaTriangle, 'drag', function() {
      console.log('polygon dragged');
    });

    paths.forEach(function(path) {
      console.log('paths event ............') //occurred once only
      google.maps.event.addListener(path, 'set_at', function() {
        console.log('polygon set at');
      })
      google.maps.event.addListener(path, 'insert_at', function() {
        console.log('polygon insert at');
      })
      google.maps.event.addListener(path, 'remove_at', function() {
        console.log('polygon remove at');
      })
    });
    /* Drawing */
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


    google.maps.event.addListener(drawingManager, 'overlaycomplete', function(event) {
      console.log('overlaycomplete')
      if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
        var radius = event.overlay.getRadius();
      } else if (event.type == google.maps.drawing.OverlayType.POLYGON) {
        console.log('polygoncomplete')
        var polygon = event.overlay;
        var paths = polygon.getPaths();

        google.maps.event.addListener(polygon, 'drag', function() {
          console.log('polygon dragged');
        });

        paths.forEach(function(path) {
          console.log('paths event ............') //occurred once only
          google.maps.event.addListener(path, 'set_at', function() {
            console.log('polygon set at');
          })
          google.maps.event.addListener(path, 'insert_at', function() {
            console.log('polygon insert at');
          })
          google.maps.event.addListener(path, 'remove_at', function() {
            console.log('polygon remove at');
          })
        });
        // path.removeAt(xxx)
      }
    });
    // //loadGeoJson  runs asnchronously, listen to the addfeature-event
    // google.maps.event.addListener(gmap.data,'addfeature',function(e){

    //   console.log('feature Added')

    //   //check for a polygon
    //   if(e.feature.getGeometry().getType()==='Polygon'){

    //     //initialize the bounds
    //     var bounds = new google.maps.LatLngBounds();

    //     //iterate over the paths
    //     e.feature.getGeometry().getArray().forEach(function(path){

    //       //iterate over the points in the path
    //       path.getArray().forEach(function(latLng){
    //         //extend the bounds
    //         bounds.extend(latLng);
    //       });

    //     });

    //     //now use the bounds
    //     e.feature.setProperty('bounds',bounds);
    //   }
    // });
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
