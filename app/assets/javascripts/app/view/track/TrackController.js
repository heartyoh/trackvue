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
	this.onRefreshTermChange(60);

    model.get('stores.drivers').load({
      scope: this,
      callback: function(records) {
		  this.onMapReady();
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
	  //     google.maps.event.addListener(marker, 'mouseover', function() {
	  //       // console.log('polygon dragged');
	  // console.log(marker);
	  //     });
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
  
  setInformationWindowDirver: function(gmap, vehicle, firstname, lastname, location, marker) {
    if(!this.infowindow)
      this.infowindow = new google.maps.InfoWindow();
	
	var content = '<b>Vehicle :</b> ' + vehicle + '<br><hr><br> Drivers : ' + lastname + 
	' ' + firstname + '<br>' +
	'Location : ' + location + '<br>';
	
    this.infowindow.setContent(content);
    this.infowindow.open(gmap, marker);
  },
  
  setInformationWindowCompany: function(gmap, company, address, marker) {
    if(!this.infowindow)
      this.infowindow = new google.maps.InfoWindow();

	var content = '<b>Company :</b> ' + company + '<br>' + '<b>Location :</b> ' + address + '<br>';
	
    this.infowindow.setContent(content);
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
      this.setInformationWindowDirver(gmap, record.get('vehicle_name'), record.get('firstname'), record.get('lastname'), record.get('address'), marker);
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
        self.setInformationWindowDirver(gmap, record.get('vehicle_name'), record.get('firstname'), record.get('lastname'), record.get('home'), marker);
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
    var tracks = this.getViewModel().get('stores.tracks');

    tracks.getProxy().extraParams = {
      driver_id: record.get('driver_id'),
      start_time: Ext.Date.format(record.get('start_time'), 'c')
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

          self.getViewModel().set('trip.events',
            '<span class="speed-off">' + record.get('count_off') + '</span>' +
            '<span class="speed-idle">' + record.get('count_idle') + '</span>' +
            '<span class="speed-slow">' + record.get('count_slow') + '</span>' +
            '<span class="speed-normal">' + record.get('count_normal') + '</span>' +
            '<span class="speed-fast">' + record.get('count_fast') + '</span>' +
            '<span class="speed-speeding">' + record.get('count_speeding') + '</span>'
          );
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

    // Alert리스트를 가져온다.
    var alerts = Ext.create('App.store.AlertStore');

    alerts.getProxy().extraParams = {
      driver_id: record.get('driver_id'),
      trip_start_time: Ext.Date.format(record.get('start_time'), 'c')
    };
    alerts.load({

      callback: function(records) {
        var alerts = [];
        for(i = 0;i < records.length;i++) {
          alerts.push(records[i].data);
        }

        self.showAlerts(alerts, false);
      }
    });
  },

  showAlerts: function(alerts, fit) {
    var gmap = this.getView().down('#gmap').gmap;

    if(fit) {
      gmap.setZoom(11);
    }

    for(i = 0;i < alerts.length;i++) {
      var alert = alerts[i];

      HF.reverse_geocode(this, alert.lat, alert.lng, function(self, results, status) {
        var address = '--';
        if (results && results[0]) {
          address = results[0].formatted_address
        }

        var icon = 'assets/alert_';
        var severity = alert.severity; //H, M, L
        var type = alert.alert_type; //G,

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

        var latlng = new google.maps.LatLng(alert.lat, alert.lng);
        var marker = new google.maps.Marker({
          position: latlng,
          map: gmap,
          icon: icon,
          info: alert
        });
        self.addMarker(marker);

        if(fit) {
          var content = 'Address : ' + address;
          var content = "<div>Address : " + address + "</div>"
          + "<div>Time : " + alert.alert_time + "</div>";
          if(alert.front_img_url) {
            content += '<img src="' + alert.front_img_url + '" width=256 height=172></img>';
          }
          if(alert.rear_img_url) {
            content += '<img src="' + alert.rear_img_url + '" width=256 height=172></img>';
          }

          self.setInformationWindow(gmap, content, marker);
          gmap.setCenter(latlng);
        } else {
          google.maps.event.addListener(marker, 'click', function(e) {

            var alert = this.info;

            var content = 'Address : ' + address;
            var content = "<div>Address : " + address + "</div>"
            + "<div>Time : " + alert.alert_time + "</div>";
            if(alert.front_img_url) {
              content += '<img src="' + alert.front_img_url + '" width=256 height=172></img>';
            }
            if(alert.rear_img_url) {
              content += '<img src="' + alert.rear_img_url + '" width=256 height=172></img>';
            }

            self.setInformationWindow(gmap, content, this);
          });
        }
      });
    }
  },

  onAlertSelect: function(grid, record, item, index, e, eOpts) {
    this.clearAll();

    this.showAlerts([record.data], true);
  },
  
  onRefreshTermChange : function(value) {
	var interval = value * 1000;
	if(this.refreshTask) {
		this.refreshTask.cancel();
	}
	
	this.refreshTask = new Ext.util.DelayedTask(function() {
		this.onMapReady();
		this.refreshTask.delay(interval);
	}, this);
	
	this.refreshTask.delay(interval);
  },

  onMapReady: function() {
	  
	this.clearAll();
	var gmap = this.getView().down('#gmap').gmap;
	var self = this;
	var count = 0;
    /*
      그룹에 해당하는 위치를 중심으로 초기에 지도의 위치를 잡는다.
    */
    var lat = this.getViewModel().get('location.lat');
    var lng = this.getViewModel().get('location.lng');
	var address = this.getViewModel().get('location.address');
	var company = this.getViewModel().get('location.description');

    var location = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: location,
      map: gmap,
      icon: '/assets/home_location.png'
    });
	
	this.addMarker(marker);
	
    google.maps.event.addListener(marker, 'mouseover', function() {
      self.setInformationWindowCompany(gmap, company, address, marker);
    });
	
	var driver_store = this.getViewModel().get('stores.drivers');
	
	var bounds = null;
	
	driver_store.each(function(record) {
		
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
	        self.addMarker(marker);
			
			if(!bounds)
				bounds = new google.maps.LatLngBounds(latlng, latlng);
			else if (latlng)
				bounds.extend(latlng);
			
			
	        google.maps.event.addListener(marker, 'mouseover', function() {
	          self.setInformationWindowDirver(gmap, record.get('vehicle_name'), record.get('firstname'), record.get('lastname'), record.get('address'), marker);
	        });
			
			count++;
			
		    if(count == driver_store.count())
		    {
			  gmap.fitBounds(bounds);
		    }
		} else {
	        HF.geocode(this, record.get('home'), function(scope, results, status) {

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
			  gmap.setCenter(latlng);
			  // gmap.setZoom(10);
  			  if(!bounds)
  				bounds = new google.maps.LatLngBounds(latlng, latlng);
  			  else if (latlng)
  				bounds.extend(latlng);
			  
			  
		      google.maps.event.addListener(marker, 'mouseover', function() {
		        self.setInformationWindowDirver(gmap, record.get('vehicle_name'), record.get('firstname'), record.get('lastname'), record.get('home'), marker);
		      });
			  
			  count++;
			  
			  if(count == driver_store.count())
			  {
				gmap.fitBounds(bounds);
			  }
	        });
		}
	});
  }

});
