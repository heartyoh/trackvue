Ext.define('App.Framework', {

  alternateClassName: ['HF'],

  singleton: true,

  mixins: {
    history: 'App.mixin.History',
    nav: 'App.mixin.Nav',
    localstore: 'App.mixin.LocalStore'
  }
});
