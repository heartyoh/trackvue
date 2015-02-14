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

  statics: {
    tplAlertInfoWindow: new Ext.XTemplate(
      '<div>Occurred at <strong>{alert_time}</strong></div>',
      '<div class="detail-address">Address : {address}</div>',
      '<tpl if="this.hasResource(video_url)">',
        '<div class="pip-container">',
          '<video src="{front_video_url}" controls xmediagroup="pip" class="backward-layer"></video>',
          '<video src="{rear_video_url}" xmediagroup="pip" class="forward-layer"></video>',
          '<audio src="{audio_url}" xmediagroup="pip" hidden></audio>',
        '</div>',
      '<tpl elseif="this.hasResource(front_img_url)">',
        '<div class="pip-container">',
          '<img src="{front_img_url}" class="backward-layer"></img>',
          '<img src="{rear_img_url}" class="forward-layer"></img>',
        '</div>',
      '</tpl>',
      {
        hasResource: function(url) {
          return !!url;
        }
      }
    ),

    tplTrackInfoWindow: new Ext.XTemplate(
      '<div>Recorded at <strong>{end_time}</strong></div>',
      '<div>Trip Started at {start_time}</div>',
      '<tpl if="this.hasResource(video_url)">',
        '<div class="pip-container">',
          '<video src="{front_video_url}" controls xmediagroup="pip" class="backward-layer"></video>',
          '<video src="{rear_video_url}" xmediagroup="pip" class="forward-layer"></video>',
          '<audio src="{audio_url}" xmediagroup="pip" hidden></audio>',
        '</div>',
      '<tpl elseif="this.hasResource(front_img_url)">',
        '<div class="pip-container">',
          '<img src="{front_img_url}" class="backward-layer"></img>',
          '<img src="{rear_img_url}" class="forward-layer"></img>',
        '</div>',
      '</tpl>',
      {
        hasResource: function(url) {
          return !!url;
        }
      }
    ),

    tplCompanyInfoWindow: new Ext.XTemplate(
      '<b>{company}</b><br>',
      '<hr><br>',
      '<b class="detail-address">Location : </b>{address}'
    ),

    tplDriverInfoWindow: new Ext.XTemplate(
      '<div class="photos">',
        // '<img src="{vehicle_img_url}"/>',
        // '<img src="{driver_img_url}" hidden/>',
        '<img src="assets/ph_car.png"/>',
        '<img src="assets/ph_user.png" hidden/>',
        '<div>',
          '<button onclick="$(\'.photos img\').toggle();">toggle photo</button>',
        '</div>',
      '</div>',
      '<div style="overflow: auto;">',
        '<strong>Vehicle : #{id}</strong>',
        '<span>Model : {car_model}</span>',
        '<span>Name : {vehicle_name}</span>',
        '<span>Drivers : {lastname} {firstname}</span>',
        '<span>Location : {[values.address || "(home)"]}</span>',
      '</div>',
      {
        hasResource: function(url) {
          return !!url;
        }
      }
    )
  },

  onAfterRender: function() {
    var model = this.getViewModel();
    this.onRefreshTermChange(60);
    this.cluster = [];

    var infopanel = this.getView().down('#infopanel');
    var tabmaster = this.getView().down('#tabmaster');
    tabmaster.tabBar.insert(2, [{
      xtype: 'component',
      flex: 1
    }, {
      xtype: 'button',
      iconCls: 'x-tool-img x-tool-collapse-left',
      width: 34,
      handler: function() {
        infopanel.collapse();
      }
    }]);

    model.get('stores.drivers').load({
      scope: this,
      callback: function(records) {
      this.onMapReady(true);
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
    var self = this;
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

  setInformationWindowDirver: function(gmap, driver, marker) {
    if(!this.infowindow)
      this.infowindow = new google.maps.InfoWindow();

    var content = App.view.track.TrackController.tplDriverInfoWindow.apply(driver);

    this.infowindow.setContent(content);
    this.infowindow.open(gmap, marker);
  },

  setInformationWindowCompany: function(gmap, company, marker) {
    if(!this.infowindow)
      this.infowindow = new google.maps.InfoWindow();

    var content = App.view.track.TrackController.tplCompanyInfoWindow.apply(company);

    this.infowindow.setContent(content);
    this.infowindow.open(gmap, marker);
  },

  onDriverSelect: function(grid, record, item, index, e, eOpts) {

    this.onRefreshTaskCancel();
    this.onRefreshDriver(60, grid, record, item, index, e, eOpts);

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
      this.setInformationWindowDirver(gmap, record.getData(), marker);
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
        self.setInformationWindowDirver(gmap, record.getData(), marker);
        gmap.setCenter(latlng);
      });
    }
  },

  onTripSelect: function(grid, record, item, index, e, eOpts) {
  this.onRefreshTaskCancel();
  this.onRefreshTrip(60, grid, record, item, index, e, eOpts);

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
        var oms = new OverlappingMarkerSpiderfier(gmap, {markersWontMove: true, markersWontHide: true});

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
          // TODO Check --
          self.addMarker(marker);
          // --
          oms.addMarker(marker);
          oms.addListener('click', function(marker) {
            // iw.setContent(marker.desc);
            //     iw.open(map, marker);
            });
          oms.addListener('spiderfy', function(markers) {
            // for(var i = 0; i < markers.length; i ++) {
              //  // markers[i].setIcon(iconWithColor(spiderfiedColor));
            //  markers[i].setShadow(null);
              // }
            // iw.close();
          });
          oms.addListener('unspiderfy', function(markers) {
            // for(var i = 0; i < markers.length; i ++) {
            //  // markers[i].setIcon(iconWithColor(usualColor));
            //  markers[i].setShadow(shadow);
            // }
          });

          google.maps.event.addListener(marker, 'click', function(e) {

            var track = this.info;

            var content = App.view.track.TrackController.tplTrackInfoWindow.apply(track);

            self.setInformationWindow(gmap, content, this);
          });

          // TODO 아래 부분은 TRIP의 것이다. 트랙에서 할 일이 아니다.
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
    var self = this;

    if(fit) {
      gmap.setZoom(11);
    }

    for(i = 0;i < alerts.length;i++) {
      // var alert_to_pass = alerts[i];
      var alert = alerts[i];

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
        zIndex: 1000 - i,
        icon: icon,
        info: alert
      });
      this.addMarker(marker);

      if(fit) {
        HF.reverse_geocode(marker, alert.lat, alert.lng, function(marker, results, status) {

          var alert = marker.info;

          var address = '--';
          if (results && results[0]) {
            address = results[0].formatted_address
          }

          alert.address = address;
          var content = App.view.track.TrackController.tplAlertInfoWindow.apply(alert);

          self.setInformationWindow(gmap, content, marker);
          gmap.setCenter(latlng);
        });
      } else {
        google.maps.event.addListener(marker, 'click', function(e) {

          var alert = this.info;

          HF.reverse_geocode(this, alert.lat, alert.lng, function(marker, results, status) {

            var address = '--';
            if (results && results[0]) {
              address = results[0].formatted_address
            }

            alert.address = address;
            var content = App.view.track.TrackController.tplAlertInfoWindow.apply(alert);

            self.setInformationWindow(gmap, content, marker);
          });
        });
      }
    }
  },

  onAlertSelect: function(grid, record, item, index, e, eOpts) {
  this.onRefreshTaskCancel();

    this.clearAll();

  this.onRefreshAlert(60, grid, record, item, index, e, eOpts);

    this.showAlerts([record.data], true);
  },

  onRefreshTermChange : function(value) {
    // TODO Check --
  // var interval = value * 1000;
  // if(this.refreshTask) {
  //  this.refreshTask.cancel();
  // }

  // this.refreshTask = new Ext.util.DelayedTask(function() {
  //  this.onMapReady(false);
  //  this.refreshTask.delay(interval);
  // }, this);

  // this.refreshTask.delay(interval);
  },

  onRefreshAlert : function(value, grid, record, item, index, e, eOpts) {
    // TODO Check --
  // var interval = value * 1000;
  // if(this.refreshTask) {
  //  this.refreshTask.cancel();
  // }

  // this.refreshTask = new Ext.util.DelayedTask(function() {
  //  this.onAlertSelect(grid, record, item, index, e, eOpts);
  //  this.refreshTask.delay(interval);
  // }, this);

  // this.refreshTask.delay(interval);
  },

  onRefreshDriver : function(value, grid, record, item, index, e, eOpts) {
    // TODO Check --
  // var interval = value * 1000;
  // if(this.refreshTask) {
  //  this.refreshTask.cancel();
  // }

  // this.refreshTask = new Ext.util.DelayedTask(function() {
  //  this.onDriverSelect(grid, record, item, index, e, eOpts);
  //  this.refreshTask.delay(interval);
  // }, this);

  // this.refreshTask.delay(interval);
  },

  onRefreshTrip : function(value, grid, record, item, index, e, eOpts) {
    // TODO Check --
  // var interval = value * 1000;
  // if(this.refreshTask) {
  //  this.refreshTask.cancel();
  // }

  // this.refreshTask = new Ext.util.DelayedTask(function() {
  //  this.onTripSelect(grid, record, item, index, e, eOpts);
  //  this.refreshTask.delay(interval);
  // }, this);

  // this.refreshTask.delay(interval);
  },

  onRefreshTaskCancel : function() {
    // TODO Check --
  // if(this.refreshTask) {
  //  this.refreshTask.cancel();
  //  this.refreshTask = null;
  // }
  },

  onMapReady: function(fit) {

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

    var oms = new OverlappingMarkerSpiderfier(gmap, {markersWontMove: true, markersWontHide: true});

    var location = new google.maps.LatLng(lat, lng);

    var marker = new google.maps.Marker({
      position: location,
      map: gmap,
      icon: '/assets/home_location.png'
    });

    oms.addMarker(marker);

    google.maps.event.addListener(marker, 'click', function() {
      self.setInformationWindowCompany(gmap, {
        company: company,
        address: address
      }, marker);
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

      // TODO Check --
      self.addMarker(marker);
      // --

      oms.addMarker(marker);

      if(!bounds)
        bounds = new google.maps.LatLngBounds(latlng, latlng);
      else if (latlng)
        bounds.extend(latlng);

      oms.addListener('click', function(marker) {
        // iw.setContent(marker.desc);
        //     iw.open(map, marker);
      });
      oms.addListener('spiderfy', function(markers) {
        // for(var i = 0; i < markers.length; i ++) {
        //  // markers[i].setIcon(iconWithColor(spiderfiedColor));
        //  markers[i].setShadow(null);
        // }
        // iw.close();
      });
      oms.addListener('unspiderfy', function(markers) {
        // for(var i = 0; i < markers.length; i ++) {
        //  // markers[i].setIcon(iconWithColor(usualColor));
        //  markers[i].setShadow(shadow);
        // }
      });

      google.maps.event.addListener(marker, 'click', function() {
        self.setInformationWindowDirver(gmap, record.getData(), marker);
      });

      count++;

      if(count == driver_store.count())
      {
        if(fit)
          gmap.fitBounds(bounds);
        }
      } else {
        HF.geocode(this, record.get('home'), function(scope, results, status) {

        var usualColor = 'eebb22';
        var spiderfiedColor = 'ffee22';

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

        // TODO Check --
        self.addMarker(marker);
        // --

        oms.addMarker(marker);
        // gmap.setCenter(latlng);

        // gmap.setZoom(10);
        if(!bounds)
        bounds = new google.maps.LatLngBounds(latlng, latlng);
        else if (latlng)
        bounds.extend(latlng);

        oms.addListener('click', function(marker) {
          // iw.setContent(marker.desc);
          //     iw.open(map, marker);
        });
        oms.addListener('spiderfy', function(markers) {
          // for(var i = 0; i < markers.length; i ++) {
          //  // markers[i].setIcon(iconWithColor(spiderfiedColor));
          //  markers[i].setShadow(null);
          // }
          // iw.close();
        });
        oms.addListener('unspiderfy', function(markers) {
          // for(var i = 0; i < markers.length; i ++) {
          //  // markers[i].setIcon(iconWithColor(usualColor));
          //  markers[i].setShadow(shadow);
          // }
        });

        google.maps.event.addListener(marker, 'click', function() {
          self.setInformationWindowDirver(gmap, record.getData(), marker);
        });

        count++;

        if(count == driver_store.count())
        {
          if(fit)
            gmap.fitBounds(bounds);
          }
        });
      }
    });
  }

});
