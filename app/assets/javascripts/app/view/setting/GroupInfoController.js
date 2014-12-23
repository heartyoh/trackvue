Ext.define('App.view.setting.GroupInfoController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.group_info',

  control: {
    '#': {
      // afterrender: 'onAfterRender'
    },
    '#combo_group': {
      change: 'onChangeGroup'
    }
  },

  onChangeGroup: function(combo, newValue, oldValue, eOpts) {
    HF.setting.set('current_group', newValue);
    var store = this.getViewModel().get('stores.groups');
    var record = store.findRecord('name', newValue);
    this.getViewModel().set('current_group', record ? record.data : {});
  }

});
