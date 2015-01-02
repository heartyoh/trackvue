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
		},
		'#btn_reset': {
			click: 'onClickReset'
		},
		'#btn_save': {
			click: 'onClickSave'
		},
		' #txt_address': {
			keydown: 'onDownAddress'
		},
	},
	
	onDownAddress : function(f, e) {
		if(e.keyCode == 13) {
			this.onMapReady();
		}
	},
	
	onClickReset: function() {
		this.getView().down('form').reset();
		this.setMarker(null);
	},
	
	onClickSave: function() {
		var store = this.getViewModel().get('stores.groups');
		var record_name = this.getViewModel().get('current_group.name');
		
		if(!record_name) {
			Ext.Msg.alert('Infomation', "Nothing is selected");
			return;
		}
		var record = store.findRecord('name', record_name);

    	Ext.Ajax.request({
		    url : "groups/" + record.get('id') + "/update_group_address.json",
		    method : 'POST',
			params : record.data,
		    success : function(response) {
				Ext.Msg.alert('Infomation', "Save Complete");
				// store.reload();
			},
			scope : this
		});
	},

	onMapReady: function() {
		this.gmap = this.getView().down('#gmap').gmap;
		var self = this;
		
		var current_address = this.getView().down('#txt_address').getValue();
		var address = self.getViewModel().get('current_group.address');
		
		if(!current_address)
			current_address = address;

		this.geocoder = new google.maps.Geocoder();
	
		if(current_address)
		{
			// 주소로 위치 검색
	    	this.geocoder.geocode({'address': current_address}, function(results, status) {
				if (status == google.maps.GeocoderStatus.OK) {	    		
					var center = results[0].geometry.location;
					
					self.gmap.setCenter(center);
					
					self.setMarker(null, current_address);
					self.setMarker(self.createMarker(center), current_address);
					
					self.getViewModel().set('current_group.address', current_address);

				} else {
					Ext.Msg.alert('address notfound');
				}
	    	});
		} else {
	    	// this.setDrawingManager(null);
			// this.setDrawingManager(this.createDrawingManager());
		}
	},
  
	createMarker : function(center) {
		var self = this;
		var marker = new google.maps.Marker({
			position : center,
			map : self.gmap,
			draggable : true
		});

		if(this.marker && this.marker.dragend_listener) {
			google.maps.event.removeListener(this.marker.dragend_listener);
		}

		marker.dragend_listener = google.maps.event.addListener(marker, 'dragend', function() {
			self.moveMarker(marker);
		});
		
		return marker;
	},
  
	moveMarker : function(marker) {
		
		var self = this;
		this.geocoder = new google.maps.Geocoder();
		var position = marker.getPosition();

		// 위치로 주소 검색
		this.geocoder.geocode({'latLng': position}, function(results, status) {
			
			if (status == google.maps.GeocoderStatus.OK) {
				self.gmap.setCenter(position);
				
				self.setMarker(null, results[0].formatted_address);
				self.setMarker(self.createMarker(position), results[0].formatted_address);
				
				self.getViewModel().set('current_group.address', results[0].formatted_address);
				self.getView().down('#txt_address').setValue(results[0].formatted_address);
			} else {
				self.map.setCenter(position);
				Ext.Msg.alert("Failed to search!", "Couldn't find address by position [" + position.lat() + ", " + position.lng() + "]!");
			}
		});
	},
	
	setMarker : function(marker, address) {
		if (this.marker){
			this.marker.setMap(null);
			this.infowindow.close();
		}

		this.marker = marker;
		
		if(this.marker) {
			this.infowindow = new google.maps.InfoWindow( 
			{
				content: address, 
				size: new google.maps.Size(100,100) 
			});
			this.infowindow.open(this.gmap, this.marker);
		}
	},
	
	createDrawingManager : function() {
    	var drawingManager = new google.maps.drawing.DrawingManager({
      	  // drawingMode: google.maps.drawing.OverlayType.MARKER,
      	  drawingControl: true,
      	  drawingControlOptions: {
        	  position: google.maps.ControlPosition.TOP_CENTER,
        	  drawingModes: [
          		// google.maps.drawing.OverlayType.MARKER
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
		drawingManager.setMap(this.gmap);
		return drawingManager;
	},
	
	setDrawingManager : function(drawingManager) {
		if (this.drawingManager)
			this.drawingManager.setMap(null);
	
		this.drawingManager = drawingManager;
	},

	onAfterRender: function() {
	},

	onChangeGroup: function(combo, newValue, oldValue, eOpts) {
		HF.setting.set('current_group', newValue);
		var store = this.getViewModel().get('stores.groups');
		var record = store.findRecord('name', newValue);
		this.getViewModel().set('current_group', record ? record.data : {});
		this.onMapReady();
	}

});
