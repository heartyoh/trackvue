Ext.define('App.view.setting.RegisterDriverController', {
	extend: 'Ext.app.ViewController',

	requires: [
	],

	alias: 'controller.register_driver',

	control: {
		'#': {
			afterrender: 'onAfterRender'
		},
		'#gmap': {
			mapready: 'onMapReady'
		},
		' #txt_address': {
			keydown: 'onDownAddress'
		},
		'#btn_reset': {
			click: 'onClickReset'
		},
		'#btn_save': {
			click: 'onClickSave'
		}
	},
	
	onDownAddress : function(f, e) {
		if(e.keyCode == 13) {
			this.onMapReady();
		}
	},
	
	onClickReset: function() {
		Ext.Msg.alert('Infomation', "Reset Complete");
	},
	
	onClickSave: function() {
		Ext.Msg.alert('Infomation', "Save Complete");
	},

	onMapReady: function() {
		this.gmap = this.getView().down('#gmap').gmap;
		var self = this;
		var address = this.getView().down('#txt_address').getValue();

		this.geocoder = new google.maps.Geocoder();
	
		if(!address)
		{
			address = "Central Park";
			self.getView().down('#txt_address').setValue(address);
		}
		// 주소로 위치 검색
    	this.geocoder.geocode({'address': address}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {	    		
				var center = results[0].geometry.location;
				
				self.gmap.setCenter(center);
				
				self.setMarker(null, address);
				self.setMarker(self.createMarker(center), address);

			} else {
				Ext.Msg.alert('address notfound');
			}
    	});
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
			})
			this.infowindow.open(this.gmap, this.marker);
		}
		
	},

	onAfterRender: function() {
	}

});
