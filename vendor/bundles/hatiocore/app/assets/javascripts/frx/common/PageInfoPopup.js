Ext.define('Frx.common.PageInfoPopup', {
	extend : 'Ext.window.Window',

	xtype : 'qrlink',

	title : 'Page Information',

	layout : {
		type : 'vbox',
		align : 'stretch'
	},

	width : 500,
	height : 360,

	items : [ {
		xtype : 'container',
        flex: 1,
		layout : {
			type : 'vbox',
			align : 'center'
		},
		items : [ {
			xtype : 'image',
			itemId : 'qrcode',
			flex : 1
		} ]
	}, {
		xtype : 'textfield',
		itemId : 'link',
		fieldLabel : 'Link',
		labelAlign : 'top',
		disabled : true
	} ],

	dockedItems : [ {
		xtype: 'controlbar',
		items: ['->', 'print']
	} ],

    buildImageUrl : function(model) {
        // src = document.location.protocol + '://' + document.location.host;
        // if(document.location.port != 80)
        //   src += ':' + document.location.port
        src = 'http://barcode.hatiolab.com:81/?';
        src += 'text=' + window.escape(model.text);
        src += '&bcid=' + (model.symbol || 'code128');
        src += '&wscale=' + (model.scale_w || 2);
        src += '&hscale=' + (model.scale_h || 2);
        src += '&rotate=' + (model.rotation || 'N');

        if(model.alttext)
            src += '&alttext=' + window.escape(model.alttext);
        else if(model.includetext)
            src += '&alttext=' + window.escape(model.text);

        if(model.barcolor && model.barcolor != '#000000')
            src += '&barcolor=' + window.escape(model.barcolor);
        if(model.backgroundcolor && model.backgroundcolor != '#FFFFFF')
            src += '&backgroundcolor=' + window.escape(model.backgroundcolor);

        return src;
    },

	initComponent : function() {
		this.callParent();

		this.on({
			'afterrender' : function() {
				var link = this.down('textfield#link');
				link.setValue(location.href);

				var imageUrl = this.buildImageUrl({
					symbol : 'qrcode',
					text : location.href,
					alttext : location.href,
					scale_h : 3,
					scale_w : 3,
					rotation : 'N'
				});

				var qrbox = this.down('box#qrcode');

				qrbox.setSrc(imageUrl);
			},
			'click_print' : function() {
				HF.print(this.body.dom.getElementsByTagName('canvas')[0]);
			}
		}, this);
	}
});
