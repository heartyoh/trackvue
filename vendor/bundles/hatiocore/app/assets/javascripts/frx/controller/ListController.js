Ext.define('Frx.controller.ListController', {
	extend : 'Ext.app.Controller',
	
	mixins : ['Frx.mixin.lifecycle.ListLifeCycle'],
	
	EntryPoint : function() {
		var base = {
			paramschange : this.onParamsChange,
			click_add :  this.onListClickAdd,
			click_new :  this.onListClickNew,
			click_save :  this.onListClickSave,
			click_delete : this.onListClickDelete,
			after_update_list : this.onAfterUpdateList,
			click_import : this.onListClickImport,
			click_export : this.onListClickExport,
			click_print : this.onListClickPrint,
			edit : this.onCellEdit			
		};

		if(arguments.length > 0) {
			Ext.each(arguments, function(arg) {
				Ext.apply(base, arg);
			});
		}

		return base;
	},
	EntryPointWith : this.EntryPoint,

	/**
	 * callback on parameter change of the grid
	 * 리스트를 렌더링하는 그리드 뷰가 새로 생성된 후에 아이템의 키 정보를 params에 담아 호출된다.
	 * 주로 검색 정보를 포함한다.
	 * Entry Point of the cycle of a list
	 *
	 * @grid
	 * @params
	 */
	onParamsChange : function(grid, params) {
		params = this.beforeParamsChange(grid, params);
		if(this.validateParams(grid, params)) {
			var searchForm = grid.down('searchform');
			if(searchForm)
				searchForm.getForm().setValues(params);
				
			this.loadList(grid, params);
		}
	},
	
	/**
	 * onParamsChange전에 처리, 기본으로 들어가야 할 파라미터 등을 세팅한다.
	 */
	beforeParamsChange : function(view, params) {
		return params;
	},
	
	/**
	 * onParamsChange전에 처리, 파라미터 validation 체크 
	 */
	validateParams : function(view, params) {
		return true;
	},	
	
	/**
	 * 그리드 멀티플 업데이트 후 callback
	 * 
	 * @grid grid
	 * @updateType update : u, delete : d
	 * @response grid update후 서버에서 보내준 response
	 */
	onAfterUpdateList : function(grid, updateType, response) {
		grid.store.reload();
	},

	/**
	 * 그리드 로드 후 callback
	 * 
	 * @grid grid
	 * @records
	 * @operation
	 */
	onAfterLoadList : function(grid, records, operation) {
	},

	/**
	 * 그리드의 Goto Item 컬럼 핸들러
	 * 
	 * @view grid view
	 * @td
	 * @rowIndex
	 * @colIndex
	 * @event
	 * @record
	 * @tr
	 * @grid
	 */
	onGotoItem : function(grid, td, rowIndex, colIndex, event, record, tr) {
		HF.show(Ext.getClassName(grid.up()) + 'Item', {id : record.get('id')})
	},

	/*************************************
	 *			Grid Handling 			 *
	 *************************************/
	
	/**
	 * grid reload by params
	 *
	 * @grid
	 * @params
	 * @return
	 */
	loadList : function(grid, params) {
		var store = grid.store;
		if(store.isLoading())
			return;

		store.proxy.extraParams = this.buildGridParams(grid, params);
		store.on('load', function(records, operation, success) {
			if(success) {
				grid.fireEvent('after_load_list', grid, records, operation);
			}
		});

		store.load();
	},

	/**
	 * grid의 조회를 위한 search, select, sort 파라미터 정보를 생성한다.
	 *
	 * @grid
	 * @params
	 * @return
	 */
	buildGridParams : function(grid, params) {
		params = params || {};
		var searchParams = this.buildSearchParams(grid, params);
		var selectParams = this.buildSelectParams(grid, params);
		var sortParams = this.buildSortParams(grid, params);		
		searchParams['_s'] = "[" + selectParams.join(",") + "]";
		Ext.Array.each(sortParams, function(sortColumn) { searchParams['_o[' + sortColumn.name + ']'] = sortColumn.direction; });
		return searchParams;
	},

	/**
	 * grid의 조회를 위한 search 파라미터 정보를 생성한다.
	 *
	 * @grid
	 * @params
	 * @return
	 */
	buildSearchParams : function(grid, params) {
		var searchParams = {};
		Ext.Object.each(this.getDefaultFilters(), function(key, value) {
			params[key] = value;
		});		
		Ext.Object.each(params, function(key, value) {
			searchParams['_q[' + key + ']'] = value;
		});
		return searchParams;
	},

	/**
	 * grid의 조회를 위한 select 파라미터 정보를 생성한다.
	 *
	 * @grid
	 * @params
	 * @return
	 */
	buildSelectParams : function(grid, params) {
		var selectParams = [];
		// 그리드의 헤더 정보를 얻어와 select fields 파라미터를 만든다. select field 파라미터는 결정 필요
		Ext.Array.each(grid.columns, function(column) {
			if(column.dataIndex && column.dataIndex != '_cud_flag_') {
				selectParams.push(column.dataIndex);
			}
		});
		return selectParams;
	},

	/**
	 * grid의 조회를 위한 sort 파라미터 정보를 생성한다.
	 *
	 * @grid
	 * @params
	 * @return
	 */
	buildSortParams : function(grid, params) {
		var sortParams = [];
		Ext.Array.each(grid.columns, function(column) {
			if(column.sortOption) {
				var sortName = (column.xtype == 'entitycolumn') ? column.dataIndex + "_id" : column.dataIndex;
				sortParams.push({name : sortName, seq : column.sortOption.sortSeq, direction : column.sortOption.sortDirection});
			}
		});
		return Ext.Array.sort(sortParams, function(colA, colB) { 
			return (colA.seq > colB.seq) ? 1 : ((colA.v < colB.seq) ? -1 : 0);  
		});
	},

	/**
	 * default filter를 리턴 
	 */
	getDefaultFilters : function() {
		return null;
	}
	
});