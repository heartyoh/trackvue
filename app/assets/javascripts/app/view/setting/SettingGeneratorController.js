Ext.define('App.view.setting.SettingGeneratorController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.setting_generator',

  control: {
    '#': {
      afterrender: 'onAfterRender'
    },
	'#btn_reset': {
		click: 'onClickReset'
	},
	'#btn_save': {
		click: 'onClickSave'
	}
  },
  
  onClickReset: function() {
	Ext.Msg.alert('Infomation', "reset");
  },
  
  onClickSave: function() {
	  var lat = "";
	  var lng = "";
	  var driver_id = this.getView().down('#driver_id').getValue();
	  var start_date = this.getView().down('#start_date').getValue();
	  var url = this.getView().down('#url').getValue();
	  var self = this;
	  
	  console.log(driver_id);
	  console.log(start_date);
	  
	  
	  var params = {
		  "generators[driver_id]" : driver_id,
		  "generators[start_date]" : start_date,
		  "generators[url]" : url
	  }
	  
	  Ext.Ajax.request({
		  url : "generators/export_data.json",
		  method : 'POST',
		  params : params,
		  success : function(response) {
			  Ext.Msg.alert('Infomation', "Save Complete");
			  self.getViewModel().get('stores.geofence').reload();
		  },
		  scope : this
	  });
  },

  onAfterRender: function() {
  }

});
