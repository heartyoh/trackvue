Ext.define('App.view.setting.SettingController', {
  extend: 'Ext.app.ViewController',

  requires: [
    'Ext.window.MessageBox'
  ],

  alias: 'controller.setting',

  control: {
    '#': {// matches the view itself
    },
    '#drivers': {
      itemclick: 'onDriverSelect'
    }
  },

  onDriverSelect: function(grid, record, item, index, e, eOpts) {
    this.getViewModel().set('vehicle', record.data);
  }

});
