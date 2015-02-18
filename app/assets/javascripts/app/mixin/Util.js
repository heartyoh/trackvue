Ext.define('App.mixin.Util', function() {

  var geocoder = new google.maps.Geocoder();

  function show() {
  }

  function geocode(scope, addr, callback) {
    geocoder.geocode({'address': addr}, function(results, status) {
      callback(scope, results, status);
    });
  }

  function reverse_geocode(scope, lat, lng, callback) {
    var latlng = new google.maps.LatLng(lat, lng);

    geocoder.geocode({'latLng': latlng}, function(results, status) {
      callback(scope, results, status);
    });
  }

  function renderer_alert_type(value, s, record) {
    var severity = record.get('severity'); //Severe, Normal, Trivial
    var type = record.get('alert_type'); //G sensor, External Button, Button, Geofence(F)
    var icon;
    switch(type) {
      case 'G': // G Sensor
        icon = 'safety_';
        break;
      case 'E': // External Button
      case 'B': // Button
        icon = 'efficiency_';
        break;
      case 'F': // Geofence
        icon = 'geofence_';
        break;
      default:
        icon = 'safety_';
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

    return '<img src="assets/alert/alert_' + icon + '" height="16" width="16" />';
  }

  function renderer_alert_description(value, s, record) {
    var severity = record.get('severity'); //Severe, Normal, Trivial
    var type = record.get('alert_type'); //G sensor, External Button, Button, Geofence(F)
    var description = '';

    switch(severity) {
      case 'S':
        description += 'Severe ';
        break;
      case 'N':
        description += 'Normal ';
        break;
      case 'T':
        description += 'Trivial ';
        break;
      default:
        description += 'Informational ';
    }

    switch(type) {
      case 'G': // G Sensor
        description += 'G Sensor ';
        break;
      case 'E': // External Button
      case 'B': // Button
        description += 'Efficiency ';
        break;
      case 'F': // Geofence
        description += 'Geofence ';
        break;
      default:
        description += 'Safety ';
    }

    return description + 'Alert';
  }

  return {
    geocode: geocode,
    reverse_geocode: reverse_geocode,
    renderer: {
      alert_type: renderer_alert_type,
      alert_description: renderer_alert_description
    }
  };

}());
