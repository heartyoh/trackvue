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
    },
	'#btn_reset': {
		click: 'onClickReset'
	},
	'#btn_save': {
		click: 'onClickSave'
	},
	'#geofence_group': {
		change: 'onChangeGeofence'
	},
	'#edit_chk': {
		change: 'onChangeEdit'
	}
  },
  
  onClickReset: function() {
	Ext.Msg.alert('Infomation', "reset");
  },
  
  onClickSave: function() {
	  var lat = "";
	  var lng = "";
	  var radio_group = this.getView().down('#geofence_group').getChecked()[0];
	  var group_id = this.getViewModel().get('current_group.id');
	  var self = this;
	  
	  if(!this.pathArr) {
		  Ext.Msg.alert('Warning', "warning");
		  return;
	  }
		  
	  
	  for(var i = 0; i < this.pathArr.length; i++) {
		  if(i != 0) lat += "|";
		  if(i != 0) lng += "|";
		  
		  lat += this.pathArr[i].lat();
		  lng += this.pathArr[i].lng();
	  }
	  
	  
	  var params = {
		  "geofence[area]" : radio_group.inputValue,
		  "geofence[lat]" : lat,
		  "geofence[lng]" : lng,
		  "geofence[group_id]" : group_id
	  }
	  
	  Ext.Ajax.request({
		  url : "geofences.json",
		  method : 'POST',
		  params : params,
		  success : function(response) {
			  Ext.Msg.alert('Infomation', "Save Complete");
			  self.getViewModel().get('stores.geofence').reload();
		  },
		  scope : this
	  });
  },

  onMapReady: function(geofence_id) {
    var gmap = this.getView().down('#gmap').gmap;
	var group_id = this.getViewModel().get('current_group.id');
	var self = this;
	var area_id;
	
	if(group_id)
	{
		var store = this.getViewModel().get('stores.geofence');
		
		store.findBy(function(record,id) {
        	if(record.get('area')== geofence_id && record.get('group_id')== group_id) {
				area_id = id
            	return true;
        	}
    	});
		
		var record = store.findRecord('id', area_id);
		
		this.setDrawingManager(null);
		this.setDrawingManager(this.createDrawingManager(gmap));
		
		this.setPolygon(null);
		if(record)
			this.setPolygon(this.createPolygon(gmap, record));
	}
  },
  
  setPolygon : function(polygon) {
  	if (this.polygon)
  		this.polygon.setMap(null);

  	this.polygon = polygon;
	if(this.polygon && !this.getView().down('#edit_chk').checked) {

		this.polygon.setOptions({
		    draggable: false,
		    editable: false
		});
	}
  },
  
  createPolygon : function(gmap, record) {

	var self = this;
	
	var lat = record.get('lat');
	var lng = record.get('lng');
	
	var latArr = lat.split("|");
	var lngArr = lng.split("|");
	
	var coordinates = [];
	
	for(var i = 0; i < latArr.length; i++) {
		var point = new google.maps.LatLng(latArr[i], lngArr[i]);
		
		coordinates.push(point);
	}
	
	var polygon = new google.maps.Polygon({
		paths: coordinates,
	    strokeColor: "#FF0000",
	    strokeOpacity: 0.8,
	    strokeWeight: 2,
	    fillColor: "#FF0000",
	    fillOpacity: 0.35,
	    editable: true,
	    draggable: true
	});

    polygon.setMap(gmap);

    var bounds = new google.maps.LatLngBounds();
	
	coordinates.forEach(function(point) {
		bounds.extend(point)	
	});

    gmap.fitBounds(bounds);

    var paths = polygon.getPaths();

    paths.forEach(function(path) {
      google.maps.event.addListener(path, 'set_at', function() {
	self.setLatLng(path);
      })
      google.maps.event.addListener(path, 'insert_at', function() {
	self.setLatLng(path);
      })
      google.maps.event.addListener(path, 'remove_at', function() {
	self.setLatLng(path);
      })
    });

	return polygon;
  },
  
  setDrawingManager : function(drawingManager) {
	if (this.drawingManager)
		this.drawingManager.setMap(null);

	this.drawingManager = drawingManager;
  },
  
  createDrawingManager : function(gmap) {
	  
	  var self = this;
	/* Drawing */
	var drawingManager = new google.maps.drawing.DrawingManager({
		// drawingMode: google.maps.drawing.OverlayType.POLYGON,
		drawingControl: true,
		drawingControlOptions: {
			position: google.maps.ControlPosition.TOP_CENTER,
			drawingModes: [
		  	  google.maps.drawing.OverlayType.POLYGON
			]
		},
			markerOptions: {
				draggable: true
			},
			polygonOptions: {
				draggable: true,
				editable: true,
				strokeColor: "#FF0000",
				fillColor: "#FF0000"
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
		if (event.type == google.maps.drawing.OverlayType.CIRCLE) {
			var radius = event.overlay.getRadius();
		} else if (event.type == google.maps.drawing.OverlayType.POLYGON) {
			var polygon = event.overlay;
			var paths = polygon.getPaths();

			paths.forEach(function(path) {
				google.maps.event.addListener(path, 'set_at', function() {
					self.setLatLng(path);
				})
				google.maps.event.addListener(path, 'insert_at', function() {
		    		self.setLatLng(path);
		  	  	})
			  	google.maps.event.addListener(path, 'remove_at', function() {
		    		self.setLatLng(path);
		  	  	})
			});
			
			self.setPolygon(polygon);
			self.setLatLng(paths.getArray()[0]);
		}
	});
	
	return drawingManager;
  },
  
  setLatLng: function(path) {
	  this.pathArr = [];
	  var self = this;
	  path.getArray().forEach(function(latLng) {
		  self.pathArr.push(latLng);
	  });
  },

  onAfterRender: function() {
  },

  onChangeGroup: function(combo, newValue, oldValue, eOpts) {
    HF.setting.set('current_group', newValue);
    var store = this.getViewModel().get('stores.groups');
    var record = store.findRecord('name', newValue);
    this.getViewModel().set('current_group', record ? record.data : {});
	
	var radio_group = this.getView().down('#geofence_group').getChecked()[0];
	
	this.onMapReady(radio_group.inputValue);
  },
  
  onChangeGeofence: function(radio, newValue, oldValue, eOpts) {
  	var group_id = this.getViewModel().get('current_group.id');
	
	if(group_id) {
		this.onMapReady(newValue.geofence);
	} else {
		Ext.Msg.alert('Infomation', "select the group first");
	}
  },
  
  onChangeEdit: function(check, newValue, oldValue, eOpts) {
    var group_id = this.getViewModel().get('current_group.id');
	var gmap = this.getView().down('#gmap').gmap;
	
  	if(group_id) {
		if(this.polygon && this.getView().down('#edit_chk').checked) {
			this.setDrawingManager(this.createDrawingManager(gmap));
			this.polygon.setOptions({
			    draggable: true,
			    editable: true
			});
		} else if(this.polygon && !this.getView().down('#edit_chk').checked){
			this.setDrawingManager(null);
			this.polygon.setOptions({
			    draggable: false,
			    editable: false
			});
		} else if (!this.polygon && this.getView().down('#edit_chk').checked) {
			this.setDrawingManager(this.createDrawingManager(gmap));
		} else if (!this.polygon && !this.getView().down('#edit_chk').checked) {
			this.setDrawingManager(null);
		}
  	}
  }

});
