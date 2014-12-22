Ext.define('Frx.mixin.lifecycle.ListLifeCycle', {
	
	ListEventHandler : function(handler) {
		return Ext.apply({
			click_list : this.onListClickList,
			click_add :  this.onListClickAdd,
			click_new :  this.onListClickNew,
			click_save :  this.onListClickSave,
			click_delete : this.onListClickDelete,
			click_import : this.onListClickImport,
			click_export : this.onListClickExport,
			click_print : this.onListClickPrint,
			edit : this.onCellEdit,
			after_update_list : this.onAfterUpdateList,
			after_import_list : this.onAfterImportList
		}, handler);
	},
	
	/**
	 * callback on list button click
	 *
	 * @view
	 */
	onListClickList : function(view) {
		var cv = HF.current.view();
		var item_view = cv ? cv.self.getName() : undefined;
		if(item_view) {
			HF.show(item_view.substr(0, item_view.length - 4));
		}
	},

	/**
	 * 추가, 삭제, 변경을 한 grid의 데이터를 저장 
	 *
	 * @grid
	 */
	onListClickSave : function(grid) {
		this.saveGridData(grid);
	},
	
	/**
	 * 리스트 중에서 선택된 데이타를 삭제
	 *
	 * @view
	 */
	onListClickDelete : function(grid) {
		this.deleteGridData(grid);
	},

	/**
	 * 리스트에 새로운 행을 추가
	 *
	 * @grid
	 */
	onListClickAdd : function(grid) {
		this.addGridRecord(grid, this.newRecord(grid));
	},
	
	/**
	 * Import
	 */
	onListClickImport : function(grid) {
		HF.popup('Frx.field.ImportPopup', null, {
			owner : grid, 
			url : this.getImportListUrl()
		});
	},
	
	/**
	 * export : 클라이언트에서는 검색 조건으로 요청만 하고 서버에서 데이터를 생성해서 엑셀로 내려줌 
	 */
	onListClickExport : function(grid) {
		var paramStr = Ext.Object.toQueryString(grid.getStore().proxy.extraParams);
		window.location.href = this.getExportListUrl() + '?' + paramStr;
	},

	/**
	 * print : 
	 */
	onListClickPrint : function(grid) {
		HF.print(grid);
	},
	
	/**
	 * after editing grid cell
	 */
	onCellEdit : function(editor, e, eOpts) {
		var saveBtn = HF.current.view().down(' #save');
		var errors = e.record.validate();
		
		if(errors.isValid()) {
			if(saveBtn) {
				saveBtn.enable();
			}
		} else {
			if(saveBtn) {
				saveBtn.disable();
			}
			
			var error = errors.getByField(e.column.dataIndex);
			if(error && error.length > 0) {
				HF.msg.notice(e.column.text + ' ' + T('text.' + error[0].message));
			}
		}
	},

	/**
	 * 그리드 멀티플 업데이트 후 callback
	 * 서브 아이템을 렌더링하는 리스트인 경우에 해당하며, 응답 메시지에 다시 전체 리스트를 보내주는 것으로 약정한다.
	 * 예외 경우에는 오버라이드 한다.
	 * 
	 * @grid grid
	 * @updateType update : u, delete : d
	 * @response grid update후 서버에서 보내준 response
	 */
	onAfterUpdateList : function(grid, updateType, response) {
        var res = Ext.JSON.decode(response.responseText);
		grid.store.loadRawData(res.items);

		var successMsg = (updateType == 'd') ? T('text.Success to Delete') : T('text.Success to Update');
		HF.msg.notice(successMsg);
	},

	/**
	 * 그리드 Import 후 callback
	 * 그리드를 리프레쉬하는 동작을 기본으로 한다.
	 * 예외 경우에는 오버라이드 한다. 이 이벤트는 ImportPopup 뷰에 의해서 트리거된다.
	 * 
	 * @grid grid
	 * @action Import Submit Action
	 */
	onAfterImportList : function(grid, action) {
		grid.getStore().load();
	},

	/*************************************
	 *			Grid Handling 			 *
	 *************************************/

	/**
	 * 모델 생성 ...
	 *
	 * @grid
	 */
	newRecord : function(grid) {
		return Ext.create(grid.getStore().model);
	},
	
	/**
	 * 그리드에서 선택된 데이터를 삭제 
	 *
	 * @grid 삭제할 그리드 데이터 
	 * @url 삭제 URL
	 */
	deleteGridData : function(grid) {
		var selections = grid.getSelectionModel().getSelection();
		if(selections.length > 0) {
			HF.msg.confirm({
				msg : T('text.Sure to Delete'),
				fn : function(confirmBtn) {
					if(confirmBtn == 'yes') {
						var records = [];
						Ext.Array.each(selections, function(selection) {
							// 이전에 삭제된 데이터가 같이 올라오는데 이 데이터에는 store가 null로 설정되어 있으므로 이 데이터는 제외 
							if(selection.data.id && selection.store) {
								selection.set('_cud_flag_', 'd');
								records.push(selection.data);
							}
						});
						if(records.length == 0) {
							HF.msg.notice(T('text.Nothing selected'));
						} else {
							this.updateList(grid, records);
						}
					}
				},
				scope : this
			});
		} else {
			HF.msg.notice(T('text.Nothing selected'));
		}
	},
	
	/**
	 * grid에 row 추가 
	 *
	 * @grid
	 * @record
	 */
	addGridRecord : function(grid, record) {
		grid.store.insert(0, record);
		grid.plugins[0].startEditByPosition({row: 0, column: 0});
		grid.fireEvent('after_add_record', grid, record);
	},
	
	/**
	 * 추가, 삭제, 변경을 한 grid의 데이터를 저장 
	 *
	 * @grid
	 */
	saveGridData : function(grid, url) {
		HF.msg.confirm({
			msg : T('text.Sure to Save'),
			fn : function(confirmBtn) {
				if(confirmBtn == 'yes') {
					var store = grid.store;
					var models = [];
					this.getStoreRecords(store, 'c', models);
					this.getStoreRecords(store, 'u', models);
					this.getStoreRecords(store, 'd', models);
					if(models.length == 0) {
						HF.msg.notice(T('text.Nothing changed'));
					} else {
						this.updateList(grid, models);
					}
				}
			},
			scope : this
		});
	},
	
	/**
	 * store에서 cudType에 따른 데이터를 찾아 recordList에 추가 
	 *
	 * @store
	 * @cudType : c || u || d
	 * @recordList cudType에 따라 찾은 데이터를 담을 list
	 */
	getStoreRecords : function(store, cudType, recordList) {
		var records = null;
		if(cudType == 'c') {
			records = store.getNewRecords();
		} else if(cudType == 'u') {
			records = store.getUpdatedRecords();
		} else if(cudType == 'd') {
			records = store.getRemovedRecords();
		}
		
		var self = this;
		Ext.each(records, function(record) {
			record.set('_cud_flag_', cudType);
			var data = self.validateMultipleUpdateData(Ext.clone(record.getData()));
			recordList.push(data);
		});
	},
	
	/**
	 * 서버로 전달되서는 안 되는 값을 제거하거나 값을 선처리한다.
	 * 
	 * @data
	 */
	validateMultipleUpdateData : function(data) {
		var referenceList = [];
		Ext.Object.each(data, function(key, value) {
			if(key.match("_id$") == "_id") {
				referenceList.push(key);
			}
		});
		
		// ..._id 로 되어 있는 필드를 모두 찾아서 위쪽 _id 필드에 값을 복사해주고 _id를 없앤 이름이 key인 필드를 모두 지운다.
		Ext.Array.each(referenceList, function(key) {
			var keyToDel = key.substr(0, key.length - 3);
			var value = data[keyToDel];
			// Object에 있는 값을 관련된 상위 id로 복사해 줌 
			if(Ext.isObject(value)) {
				if(data[key] != undefined && value.id) {
					data[key] = value.id;
				}
			}
			// Object 삭제 TODO 추후 entitycolumn component가 완성되면 위 Ext.isObject 괄호 안으로 들어가야 함 ...
			delete data[keyToDel];
		});
		
		Ext.Array.each(['creator', 'updater', 'creator_id', 'created_at', 'updater_id', 'updated_at'], function(key) {
			delete data[key];
		});
		return data;
	},
	
	/**
	 * created, updated, deleted records를 한꺼번에 생성, 수정, 삭제한다.  
	 *
	 * @grid
	 * @records
	 */
	updateList : function(grid, records) {
		var updateType = records[0]._cud_flag_;
	    Ext.Ajax.request({
		    url : this.getUpdateListUrl(grid),
		    method : 'POST',
		    params : { multiple_data : Ext.JSON.encode(records) },
		    success : function(response) {
				grid.fireEvent('after_update_list', grid, updateType, response);
			},
			scope : this
		});
	},
	
	/**
	 * multiple update url을 리턴 
	 */
	getUpdateListUrl : function(grid) {
		var names = Ext.getClassName(this).split('.');
		var underscored = HF.underscored(names[names.length - 1]);
		
		return Ext.util.Inflector.pluralize(underscored) + '/update_multiple.json';
	},
	
	/**
	 * export list url을 리턴 
	 */
	getExportListUrl : function(grid) {
		
		var names = Ext.getClassName(this).split('.');
		var underscored = HF.underscored(names[names.length - 1]);
		
		return Ext.util.Inflector.pluralize(underscored) + '/export.xlsx';
	},
	
	/**
	 * import list url을 리턴 
	 */
	getImportListUrl : function(grid) {
		
		var names = Ext.getClassName(this).split('.');
		var underscored = HF.underscored(names[names.length - 1]);
		
		return Ext.util.Inflector.pluralize(underscored) + '/import.json';
	}
});