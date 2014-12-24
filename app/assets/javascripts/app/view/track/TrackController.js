Ext.define('App.view.track.TrackController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.window.MessageBox'
  ],

  alias: 'controller.track',

  control: {
    '#': {// matches the view itself
    },
    '#drivers': {
      itemclick: 'onDriverSelect'
    },
    '#trips': {
      itemclick: 'onTripSelect'
    }
  },

  onDriverSelect: function(grid, record, item, index, e, eOpts) {
    this.getViewModel().set('vehicle', record.data);
  },

  onTripSelect: function(grid, record, item, index, e, eOpts) {
    var id = record.get('id');
    var self = this;
    App.model.Trip.load(id, {
      success: function(trip) {
        self.getViewModel().set('trip', trip);
      }
    })
    var tabdetail = this.getView().down('#tabdetail');
    tabdetail.setActiveTab(4);
  },

  onMapReady: function(mappanel, gmap) {
    // initialize directions service and renderer
    // dirSvc = new google.maps.DirectionsService();
    // dirDsp = new google.maps.DirectionsRenderer();

    // attach directions renderer to map API
    // dirDsp.setMap(gmap);

    // attach directions renderer to text panel
    // dirDsp.setPanel($('#directions_results')[0]);

    var lat = this.getViewModel().get('location.lat');
    var lng = this.getViewModel().get('location.lng');

    var location = new google.maps.LatLng(lat, lng);

    gmap.setCenter(location);

    // Add 5 markers to the map at random locations.
    var southWest = new google.maps.LatLng(-31.203405, 125.244141);
    var northEast = new google.maps.LatLng(-25.363882, 131.044922);
    var bounds = new google.maps.LatLngBounds(southWest,northEast);
    gmap.fitBounds(bounds);
    var lngSpan = northEast.lng() - southWest.lng();
    var latSpan = northEast.lat() - southWest.lat();

    for (var i = 0; i < 5; i++) {
      var location = new google.maps.LatLng(southWest.lat() + latSpan * Math.random(),
          southWest.lng() + lngSpan * Math.random());
      var marker = new google.maps.Marker({
          position: location,
          map: gmap
      });
      var j = i + 1;
      marker.setTitle(j.toString());
      this.attachSecretMessage(gmap, marker, i);
    }

  },

  // The five markers show a secret message when clicked
  // but that message is not within the marker's instance data.
  attachSecretMessage: function(map, marker, number) {
    var message = ["This","is","the","secret","message"];
    var infowindow = new google.maps.InfoWindow(
        { content: message[number],
          size: new google.maps.Size(50,50)
        });
    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });
  }

});
