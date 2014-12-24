Ext.define('App.Framework', {

  alternateClassName: ['HF'],

  singleton: true,

  mixins: {
    ext: 'App.mixin.Ext',
    history: 'App.mixin.History',
    nav: 'App.mixin.Nav',
    localstore: 'App.mixin.LocalStore',
    util: 'App.mixin.Util'
  }
});
