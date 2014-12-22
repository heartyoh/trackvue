Ext.define('App.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.main',

  go: function(view) {
    content = Ext.getCmp('content');

    var itemId = view.replace(/\./g, '_');

    var current = content.getComponent(itemId);
    if(!current) {
      current = content.add(Ext.create(view, {
        itemId: itemId
      }));
    }
    content.getLayout().setActiveItem(current);
  },

  onClickMenu: function (menu) {
    var view = menu.target;
    // this.go(view);
    HF.show(view);
  },

  onClickLogout: function() {
    console.log('here');
    location.href = '/logout'
  }
});
