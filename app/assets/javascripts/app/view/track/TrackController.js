Ext.define('App.view.track.TrackController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.window.MessageBox'
  ],

  alias: 'controller.track',

  control: {
    '#': {
      afterrender: 'onAfterRender'
    },
    '#drivers': {
      itemclick: 'onDriverSelect'
    },
    '#trips': {
      itemclick: 'onTripSelect'
    },
    '#alerts': {
      itemclick: 'onAlertSelect'
    },
    '#driver_alerts': {
      itemclick: 'onAlertSelect'
    }
  },

  onAfterRender: function() {
    var model = this.getViewModel();

    model.get('stores.drivers').load({
      scope: this,
      callback: function(records) {
        // for(var i = 0;i < records.length;i++) {
        //   var record = records[i];
        //   HF.reverse_geocode(record, record.get('lat'), record.get('lng'), function(record, results, status) {
        //     console.log(arguments)
        //     if (results && results[0]) {
        //       record.set('address', results[0].formatted_address);
        //     } else {
        //       record.set('address', '--')
        //     }
        //   });
        // }
      }
    });

    model.get('stores.alerts').load({
      scope: this,
      callback: function(records) {
        // for(var i = 0;i < records.length;i++) {
        //   var record = records[i];
        //   HF.reverse_geocode(record, record.get('lat'), record.get('lng'), function(record, results, status) {
        //     console.log(arguments)
        //     if (results && results[0]) {
        //       record.set('address', results[0].formatted_address);
        //     } else {
        //       record.set('address', '--')
        //     }
        //   });
        // }
      }
    });
  },

  addMarker: function(marker) {
    if(marker instanceof Array) {
      for(var i = 0;i < marker.length;i++) {
        this.addMarker(marker[i]);
      }
    } else {
      if(!this.markers) {
        this.markers = [];
      }
      this.markers.push(marker);
    }
  },

  clearMarkers: function() {
    if(!this.markers)
      return;
    for(var i = 0;i < this.markers.length;i++) {
      this.markers[i].setMap(null);
    }
    this.markers = [];
  },

  addLine: function(line) {
    if(line instanceof Array) {
      for(var i = 0;i < line.length;i++) {
        this.addMarker(line[i]);
      }
    } else {
      if(!this.lines) {
        this.lines = [];
      }
      this.lines.push(line);
    }
  },

  clearLines: function() {
    if(!this.lines)
      return;
    for(var i = 0;i < this.lines.length;i++) {
      this.lines[i].setMap(null);
    }
    this.lines = [];
  },

  clearAll: function() {
    this.clearMarkers();
    this.clearLines();
  },

  setInformationWindow: function(gmap, infowindow_content, marker) {
    if(!this.infowindow)
      this.infowindow = new google.maps.InfoWindow();

    this.infowindow.setContent(infowindow_content);
    this.infowindow.open(gmap, marker);
  },

  onDriverSelect: function(grid, record, item, index, e, eOpts) {
    this.getViewModel().set('vehicle', record.data);

    var trips = this.getViewModel().get('stores.trips');
    trips.getProxy().extraParams = {
      driver_id: record.get('id')
    };

    trips.load({
      scope: this,
      callback: function(records) {
      }
    });

    var alert_history = this.getViewModel().get('stores.alert_history');
    alert_history.getProxy().extraParams = {
      driver_id: record.get('id')
    };

    alert_history.load({
      scope: this,
      callback: function(records) {
      }
    });

    var gmap = this.getView().down('#gmap').gmap;

    gmap.setZoom(11);

    this.clearAll();

    var latlng;

    if(record.get('lat') && record.get('lng')) {
      var latlng = new google.maps.LatLng(record.get('lat'), record.get('lng'));

      var icon;
      var status = record.get('status');
      if(status == 'E' || status == 'F')
        icon = '/assets/van_off.png';
      else {
        var prefix = '/assets/van_';
        var speed = record.get('speed');

        if(speed == 0)
          icon = prefix + 'idle.png';
        else if(speed <= 32)
          icon = prefix + 'slow.png';
        else if(speed <= 97)
          icon = prefix + 'normal.png';
        else if(speed <= 121)
          icon = prefix + 'fast.png';
        else
          icon = prefix + 'speed.png';
      }

      var marker = new google.maps.Marker({
        position: latlng,
        map: gmap,
        icon: icon
      });
      this.addMarker(marker);
      this.setInformationWindow(gmap, record.get('address'), marker);
      gmap.setCenter(latlng);
    } else {
      /* 현재 주소에 값이 없는 경우 */
      HF.geocode(this, record.get('home'), function(self, results, status) {

        var latlng = results && results[0].geometry.location;

        var icon;
        var status = record.get('status');
        if(status == 'E' || status == 'F')
          icon = '/assets/van_off.png';
        else {
          var prefix = '/assets/van_';
          var speed = record.get('speed');

          if(speed == 0)
            icon = prefix + 'idle.png';
          else if(speed <= 32)
            icon = prefix + 'slow.png';
          else if(speed <= 97)
            icon = prefix + 'normal.png';
          else if(speed <= 121)
            icon = prefix + 'fast.png';
          else
            icon = prefix + 'speed.png';
        }

        var marker = new google.maps.Marker({
          position: latlng,
          map: gmap,
          icon: icon
        });
        self.addMarker(marker);
        self.setInformationWindow(gmap, record.get('home'), marker);
        gmap.setCenter(latlng);
      });
    }
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


    var gmap = this.getView().down('#gmap').gmap;
    this.clearAll();

    // Track리스트를 가져온다.
    // TODO Trip ID를 파라미터로 보낸다.
    var tracks = this.getViewModel().get('stores.tracks');
    tracks.getProxy().extraParams = {
      driver_id: record.get('driver_id'),
      start_time: record.get('start_time')
    };
    tracks.load({

      callback: function(records) {
        var path = [];

        var bounds = new google.maps.LatLngBounds();

        for(var i = 0;i < records.length;i++) {
          var record = records[i];
          var latlng = new google.maps.LatLng(record.get('to_lat'), record.get('to_lng'))
          path.push(latlng);

          bounds.extend(latlng);

          var icon;
          var status = record.get('status');

          if(status == 'S')
            icon = 'tripstart';
          else if(status == 'E')
            icon = 'tripend';
          else {
            var prefix = 'tripmarker_';
            if(record.get('front_img_url') || record.get('rear_img_url'))
              prefix += 'i_';

            if(status == 'F')
              icon = prefix + 'off';
            else {
              var speed = record.get('speed');
              if(speed == 0)
                icon = prefix + 'idle';
              else if(speed <= 32)
                icon = prefix + 'slow';
              else if(speed <= 97)
                icon = prefix + 'normal';
              else if(speed <= 121)
                icon = prefix + 'fast';
              else
                icon = prefix + 'speed';
            }
          }

          var marker = new google.maps.Marker({
            position: latlng,
            map: gmap,
            zIndex: i,
            icon: '/assets/' + icon + '.png',
            info: record.data
          });
          self.addMarker(marker);

          google.maps.event.addListener(marker, 'click', function(e) {
            var track = this.info;
            var content = "<div>Start : " + track.start_time + "</div>"
            + "<div>End : " + track.end_time + "</div>";
            if(track.front_img_url) {
              content += '<img src="' + track.front_img_url + '" width=256 height=172></img>';
            }
            if(track.rear_img_url) {
              content += '<img src="' + track.rear_img_url + '" width=256 height=172></img>';
            }
            self.setInformationWindow(gmap, content, this);
          });
        }

        gmap.fitBounds(bounds);

        var line = new google.maps.Polyline({
          path: path,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        line.setMap(gmap);

        self.addLine(line);
      }
    });

  },

  onAlertSelect: function(grid, record, item, index, e, eOpts) {

    var gmap = this.getView().down('#gmap').gmap;

    gmap.setZoom(11);
    this.clearAll();

    HF.reverse_geocode(this, record.get('lat'), record.get('lng'), function(self, results, status) {
      var address = '--';
      if (results && results[0]) {
        address = results[0].formatted_address
      }

      var icon = 'assets/alert_';
      var severity = record.get('severity'); //H, M, L
      var type = record.get('alert_type'); //G,

      switch(type) {
        case 'G': // G Sensor
          icon += 'safety_';
          break;
        case 'E':
        case 'B':
          icon += 'efficiency_';
          break;
        case 'F': // Geofence
          icon += 'geofence_';
          break;
        default:
          icon += 'safety_';
      }

      switch(severity) {
        case 'S':
          icon += 'red.png';
          break;
        case 'N':
          icon += 'blue.png';
          break;
        case 'T':
          icon += 'green.png';
          break;
        default:
          icon += 'blue.png';
      }

      var latlng = new google.maps.LatLng(record.get('lat'), record.get('lng'));
      var marker = new google.maps.Marker({
        position: latlng,
        map: gmap,
        icon: icon
      });
      self.addMarker(marker);
      var content = 'Address : ' + address;
      var content = "<div>Address : " + address + "</div>"
      + "<div>Time : " + record.get('alert_time') + "</div>";
      if(record.get('front_img_url')) {
        content += '<img src="' + record.get('front_img_url') + '" width=256 height=172></img>';
      }
      if(record.get('rear_img_url')) {
        content += '<img src="' + record.get('rear_img_url') + '" width=256 height=172></img>';
      }

      self.setInformationWindow(gmap, content, marker);
      gmap.setCenter(latlng);
    });
  },

  onMapReady: function(mappanel, gmap) {
    /*
      그룹에 해당하는 위치를 중심으로 초기에 지도의 위치를 잡는다.
    */
    var lat = this.getViewModel().get('location.lat');
    var lng = this.getViewModel().get('location.lng');

    var location = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: location,
      map: gmap,
      icon: '/assets/home_location.png'
    });

    this.addMarker(marker);

    gmap.setCenter(location);
  }

});
