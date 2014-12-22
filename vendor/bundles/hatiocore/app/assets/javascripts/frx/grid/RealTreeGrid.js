Ext.define('Frx.grid.RealTreeGrid', {
	extend : 'Ext.flash.Component',
	
	xtype : 'realtreegrid',
	
	url : "swfs/realgrid/TreeGridWeb.swf",
	
	initComponent : function() {
		var tagid = this.getRealGridId();
		
		this.flashVars = {
			id : tagid
		};
		
	    this.flashParams = {
	        quality : "high",
	        wmode : "opaque",
	        allowscriptaccess : "sameDomain",
	        allowfullscreen : true
	    };

	    this.flashAttributes = {
	        id : tagid,
	        name : tagid,
	        align : "middle"
	    };

		HF.realgrid.register(tagid, this.onGridLoad, this);

		this.callParent();
		
		this.on({
			destroy : function() {
				HF.realgrid.unregister(tagid);
			}
		})
	},
	
	getRealGridId : function() {
		return this.getId();
	},
	
	getRealGrid : function(force) {
		if(!this.__realgrid && force) {
			this.__realgrid = new RealGrids.TreeView(this.getRealGridId());
		}
		return this.__realgrid;
	},
	
	onGridLoad : function(id) {
		var grid = this.getRealGrid(true);
	    var dataProvider = new RealGrids.TreeDataProvider();

		grid.setDataProvider(dataProvider);
		
		dataProvider.setFields(this.fields);
		grid.setColumns(this.columns);

		if(this.icons) {
			grid.addImageList(this.icons);
			grid.setTreeOptions({
				iconImages: this.icons.name,
				iconWidth: 20
			});
		}
		if(this.gridOptions) {
			grid.setOptions(this.gridOptions);
		}
		if(this.gridStyle) {
			grid.setStyles(this.gridStyle);
		}
		
		if(this.groupBy) {
			grid.groupBy(this.groupBy);
		}
		
		if(this.dataProvider) {
			dataProvider.loadData(this.dataProvider);
		} else if(this.rows) {
			dataProvider.setDataRows(this.rows, "tree", true, "", "icon");
		}
	}
});
