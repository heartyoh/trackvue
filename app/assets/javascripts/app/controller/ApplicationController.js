Ext.define('App.controller.ApplicationController', {
    extend: 'Ext.app.Controller',

    requires : [ ],

    stores : [ ],
    models : [ ],
    views : [ ],

    refs : [{
        selector : '#content',
        ref : 'content'
    }],

    init : function() {
        this.control({
            '#content' : {
                afterrender : this.onContentAfterRender
            }
        });
    },

    onContentAfterRender: function() {
        console.log('Content Rendered!!!');
    }
});
