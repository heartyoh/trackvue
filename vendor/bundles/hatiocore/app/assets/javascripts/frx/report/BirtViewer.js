Ext.define('Frx.report.BirtViewer', {
	extend : 'Ext.Component',
	
	xtype : 'birtviewer',
	
	autoEl: {
		tag: 'iframe'
	},
	
	border : 0,
	
	/* viewType : [preview, frameset, run] */
	viewType : 'frameset',
	
	initComponent : function() {
		this.callParent();
		
		this.on({
			afterrender : this.onAfterRender
		});
	},
	
	buildSource : function() {
		if(this.report) {
			var base = (this.protocol ? this.protocol : 'http') + '://' + 
				this.host + (this.port ? ':' + this.port : '') + '/' + 
				(this.contextPath ? this.contextPath + '/' : '') +
				this.viewerType + '?__report=' +
				this.report;
		
			if(this.params) {
				base += '&' + Ext.Object.toQueryString(this.params);
			}
		
			return base;
		} else {
			return '';
		}
	},
	
	onAfterRender : function(view) {
		view.refresh();
	},
	
	refresh : function() {
		this.getEl().dom.src = this.buildSource();
	}
	
	/* TODO 동일 src를 리로드 한다면 - 확인해보자. */
	// view.getEl().dom.contentWindow.location.reload();
});
