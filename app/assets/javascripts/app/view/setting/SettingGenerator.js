Ext.define('App.view.setting.SettingGenerator', {
  extend: 'Ext.panel.Panel',
  requires: [
    'App.view.setting.SettingGeneratorController',
    'App.view.setting.SettingModel'
  ],

  xtype: 'setting-generator',

  controller: 'setting_generator',
  viewModel: {
    type: 'setting'
  },

  title: 'SETTING Generator',

  layout: {
    type: 'vbox',
    align: 'stretch'
  },

  items: [{
    xtype: 'form',
    border: 0,
    padding: 8,
    width: 360,
    items: [{
      xtype: 'fieldset',
      title: 'Parameter',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      defaults: {
        labelWidth: 120,
        labelAlign: 'right'
      },
      items: [{
		  xtype: 'textfield',
		  fieldLabel: 'URL',
		  itemId: 'url',
		  emptyText: 'ex) 127.0.0.1:3000'
      }, {
		  xtype: 'textfield',
		  fieldLabel: 'Driver ID',
		  itemId: 'driver_id',
		  emptyText: 'ex) Driver ID'
      }, {
			xtype: 'datefield',
		    itemId: 'start_date',
			fieldLabel: 'Start Date'
      }]
    }],
    dockedItems: [{
      xtype: 'toolbar',
      dock: 'bottom',
      items: ['->', {
        xtype: 'button',
		itemId: 'btn_save',
        text: 'SAVE'
      }, {
        xtype: 'button',
		itemId: 'btn_reset',
        text: 'RESET'
      }]
    }]
  }]
});
