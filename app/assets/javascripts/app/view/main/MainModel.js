/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('App.view.main.MainModel', {
    extend: 'Ext.app.ViewModel',

    alias: 'viewmodel.main',

    data: {
        name: 'App',
        location: 'Arion',
        brand_image: 'assets/logo.png',
        user: {
            id: 'orlando1'
        }
    }
});
