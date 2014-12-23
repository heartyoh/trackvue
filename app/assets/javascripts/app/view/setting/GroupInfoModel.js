Ext.require('App.store.GroupStore');

Ext.define('App.view.setting.GroupInfoModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.group_info',

  data: {
    current_group: HF.setting.get('current_group'),
    stores: {
      groups: Ext.create('App.store.GroupStore')
    }
  }
});
