Ext.define('Frx.field.ImportPopup', {
	extend : 'Ext.window.Window',
	
	modal : true,
	
	width : 350,
	
	height : 150,
	
	title : 'Import',
	
	url : '',
	
	owner : null,
	
	items : [{
		xtype : 'form',
		cls : 'paddingAll10',
		items : [ {
			xtype : 'filefield',
			name : 'file',
			itemId : 'file',
			fieldLabel : 'Import(XLS)',
			msgTarget : 'side',
			buttonText : 'file...'
		} ]
	}],
	
	buttons : [{
		text : 'Import',
		itemId : 'import'
	}, {
		text : 'Close',
		itemId : 'close'
	}],

	initComponent : function() {

		this.callParent(arguments);
		var self = this;
		
		this.down('[itemId=close]').on('click', function(button) {
			self.close();
		});
		
		this.down('[itemId=import]').on('click', function(button) {
			var form = self.down('form').getForm();
			var fileInputValue = self.child(' #file').getValue();
			if(!fileInputValue) {
				HF.msg.notice(T('text.Nothing selected'));
				return;
			}
			
			if (form.isValid()) {
				form.submit({
					url : self.url,
					success : function(form, action) {
						self.owner.fireEvent('after_update_list', self.owner, action);
						self.close();
						HF.success(T('text.Success to Import'));
					},
					failure : function(form, action) {
						var returnMsg = Ext.JSON.decode(action.response.responseText);
						if(returnMsg) {
							if(returnMsg.errors) {
								HF.msg.failure(returnMsg.errors[0]);
							} else {
								HF.msg.failure(T('text.Fail to Import'));
							}
						} else {
							HF.msg.failure(T('text.Fail to Import'));
						}
					}
				});
			}
		});
	}
});
