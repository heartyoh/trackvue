Ext.define('App.view.report.ReportModel', {
  extend: 'Ext.app.ViewModel',

  alias: 'viewmodel.report',

  data: {
    stores: {
        groups: Ext.create('Ext.data.Store', {
            fields: ['name'],
            data : [
                { name: 'Arion' },
                { name: 'Joutec' }
            ]
        })
    },
    current: {
        group: 'Arion'
    }
  }
});
