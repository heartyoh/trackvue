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
		var group = this.getView().down('#group_combo').reset();
		var last_name = this.getView().down('#last_name').reset();
		var first_name = this.getView().down('#first_name').reset();
		var email = this.getView().down('#email').reset();
		var vehicle_id = this.getView().down('#vehicle_id').reset();
		var car_model = this.getView().down('#car_model').reset();
		var speed_slow = this.getView().down('#speed_slow').reset();
		var speed_normal = this.getView().down('#speed_normal').reset();
		var speed_fast = this.getView().down('#speed_fast').reset();
		var address = this.getView().down('#txt_address').reset();
		this.setMarker(null);
	},
	
	onClickSave: function() {
		var selection = this.getViewModel().get('current.group_selection');
		
		var group_id = selection.get('id');
		var last_name = this.getView().down('#last_name').getValue();
		var first_name = this.getView().down('#first_name').getValue();
		var email = this.getView().down('#email').getValue();
		var vehicle_id = this.getView().down('#vehicle_id').getValue();
		var car_model = this.getView().down('#car_model').getValue();
		var speed_slow = this.getView().down('#speed_slow').getValue();
		var speed_normal = this.getView().down('#speed_normal').getValue();
		var speed_fast = this.getView().down('#speed_fast').getValue();
		var address = this.getView().down('#txt_address').getValue();
		
		
		var params = {
			"driver[group_id]" : group_id,
			"driver[lastname]" : last_name,
			"driver[firstname]" : first_name,
			"driver[email]" : email,
			"driver[home]" : address,
			"driver[vehicle_name]" : vehicle_id,
			"driver[car_model]" : car_model,
			"driver[speed_slow]" : speed_slow,
			"driver[speed_normal]" : speed_normal,
			"driver[speed_fast]" : speed_fast
		}
		
		var self = this;
		
    	Ext.Ajax.request({
		    url : "drivers.json",
		    method : 'POST',
			params : params,
		    success : function(response) {
				Ext.Msg.alert('Infomation', "Save Complete");
				self.onClickReset();
			},
			scope : this
		});
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
