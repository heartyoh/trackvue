Ext.define('Frx.grid.RealGrid', {
	extend : 'Ext.flash.Component',
	
	xtype : 'realgrid',
	
	url : "swfs/realgrid/RealGridWeb.swf",
	
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
		});
	},
	
	getRealGridId : function() {
		return this.getId();
	},
	
	getRealGrid : function(force) {
		if(!this.__realgrid && force) {
			this.__realgrid = new RealGrids.GridView(this.getRealGridId());

			var self = this;
			
			this.__realgrid.onSelectionAdded = function (grid, selection) {
				self.fireEvent('addedselection', self, selection, grid);
		    };
		    this.__realgrid.onSelectionChanged = function (grid) {
				self.fireEvent('changeselection', self, grid);
		    }
		}
		return this.__realgrid;
	},
	
	onGridLoad : function(id) {
		var grid = this.getRealGrid(true);
	    var dataProvider = new RealGrids.LocalDataProvider();

		grid.setDataProvider(dataProvider);
		dataProvider.setFields(this.fields);
		grid.setColumns(this.columns);
		grid.setOptions(this.gridOptions);
		grid.setStyles(this.gridStyle);
		
		if(this.groupBy) {
			grid.groupBy(this.groupBy);
		}
		
		if(this.dataProvider) {
			dataProvider.loadData(this.dataProvider);
		} else if(this.rows) {
			dataProvider.setRows(this.rows);
		}
	}
});
