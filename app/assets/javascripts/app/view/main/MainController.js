Ext.define('App.view.main.MainController', {
  extend: 'Ext.app.ViewController',

  requires: [
  ],

  alias: 'controller.main',

  control: {
    '#': {
      afterrender: 'onAfterRender'
    }
  },

  onAfterRender: function() {
    this.getViewModel().set('login', login);
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
