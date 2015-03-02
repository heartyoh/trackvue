/**
 * This class is the main view for the application. It is specified in app.js as the
 * "autoCreateViewport" property. That setting automatically applies the "viewport"
 * plugin to promote that instance of this class to the body element.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('App.view.main.Main', {
  extend: 'Ext.container.Container',
  requires: [
    'App.view.main.MainController',
    'App.view.main.MainModel'
  ],

  xtype: 'app-main',

  controller: 'main',
  viewModel: {
    type: 'main'
  },

  layout: {
    type: 'border'
  },

  items: [{
    region: 'north',
    xtype: 'container',
    padding: 10,
    height: 68,
    padding: 0,
    layout: {
      type: 'hbox',
      align: 'stretch'
    },
    items: [{
      xtype: 'image',
      width: 160,
        bind: {
          src: '{brand_image}'
        }
    }, {
      xtype: 'container',
      layout: {
        type: 'vbox',
        align: 'stretch'
      },
      flex: 1,
      items: [{
        xtype: 'toolbar',
        flex: 1,
        border: 0,
        items: ['->', {
          xtype: 'component',
          bind: {
              html: '{login.email}'
          }
        }, {
        //  text: 'DEMO_ARION'
        // }, {
          text: 'LOG OUT',
          handler: 'onClickLogout'
        }]
      }, {
        xtype: 'toolbar',
        border: 0,
        flex: 1,
        defaults: {
          border: 0,
          style: 'background-color:white;background-image:none;'
        },
        items: [{
          xtype: 'button',
          text: 'Home',
          target: 'App.view.track.Track',
          handler: 'onClickMenu'
        }, {
          xtype: 'button',
          text: 'Report',
          menu: [
            {text: 'Trip Summary Report', target: 'App.view.report.TripSummary', handler: 'onClickMenu'},
            {text: 'Alert Report', target: 'App.view.report.AlertSummary', handler: 'onClickMenu'}
          ]
        }, {
          xtype: 'button',
          text: 'Settings',
          menu: [
            {text: 'Site Preferences', target: 'App.view.setting.SitePreference', handler: 'onClickMenu'},
            {text: 'Group Information', target: 'App.view.setting.GroupInfo', handler: 'onClickMenu'},
            {text: 'Group Device Setting', target: 'App.view.setting.GroupDevice', handler: 'onClickMenu'},
            {text: 'Register Driver', target: 'App.view.setting.RegisterDriver', handler: 'onClickMenu'},
			// {text: 'Generator', target: 'App.view.setting.SettingGenerator', handler: 'onClickMenu'}
          ]
        }, {
          xtype: 'button',
          text: 'Help',
          target: 'App.view.help.Help',
          handler: 'onClickMenu'
        }, '->', {
          xtype: 'label',
          bind: {
            text: 'Location: {location}'
          }
        }]
      }]
    }]
  }, {
    xtype: 'container',
    id: 'content',
    region: 'center',
    layout: 'card'
  }]
});
