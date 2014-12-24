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

  return {
    geocode: geocode,
    reverse_geocode: reverse_geocode
  };

}());
