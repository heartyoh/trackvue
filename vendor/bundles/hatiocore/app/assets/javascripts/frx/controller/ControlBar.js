Ext.define('Frx.controller.ControlBar', {
	extend : 'Ext.app.Controller',

	views : ['Frx.common.ControlBar'],

	init : function() {
		this.control({
			'controlbar button' : {
				click : this.onButtonClicked
			}
		});
	},
	
	onButtonClicked : function(button) {		
		var owner = button.up('controlbar').getOwner();

		if(button.itemId) {
			owner.fireEvent('click_' + button.itemId, owner);
		}
	}
});