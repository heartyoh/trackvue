/**
 * The main application class. An instance of this class is created by app.js when it calls
 * Ext.application(). This is the ideal place to handle application launch and initialization
 * details.
 */
Ext.define('App.Application', {
  extend: 'Ext.app.Application',

  name: 'App',

  stores: [
  ],

  appFolder: 'assets/app',

  autoCreateViewport: 'App.view.main.Main',

  controllers : ['App.controller.ApplicationController'],

  launch: function () {
    if(!location.hash && Ext.util.Cookies.get('_anchor'))
      location.hash = Ext.util.Cookies.get('_anchor')

    Ext.util.Cookies.clear('_anchor', '/');

    if(!Ext.util.History.getToken()) {
      HF.show('App.view.track.Track');
    } else {
      HF.history.force();
    }
  }
});
