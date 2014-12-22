Ext.define('Frx.mixin.lifecycle.FormLifeCycle', {

	FormEventHandler : function(handler) {
		return Ext.apply({
			click_list : this.onClickList,
			click_save :  this.onFormClickSave,
			click_delete : this.onFormClickDelete,
			click_print : this.onFormClickPrint,
			after_load_item : this.onAfterLoadItem,
			after_save_item : this.onAfterSaveItem,
			after_delete_item : this.onAfterDeleteItem
		}, handler);
	},

	/**
	 * callback on list button click
	 *
	 * @view
	 */
	onClickList : function(view) {
		var cv = HF.current.view();
		var item_view = cv ? cv.self.getName() : undefined;
		if(item_view) {
			HF.show(item_view.substr(0, item_view.length - 4));
		}
	},

	/**
	 * callback on save button click
	 *
	 * @view
	 */
	onFormClickSave : function(view) {
		this.saveItem(view);
	},
	
	/**
	 * callback on delete button click
	 *
	 * @view
	 */
	onFormClickDelete : function(view) {
		this.deleteItem(view);
	},

	/**
	 * callback on form print button click
	 *
	 * @view
	 */
	onFormClickPrint : function(view) {
		HF.print(view);
	},

	/**
	 * get Item Data modified on the view
	 * 
	 * @view
	 */
	getItemRecord : function(view) {
		if(view instanceof Ext.form.Panel) {
			var form = view.getForm();

			var values = form.getValues();
			var entity = form.getRecord();
			if(entity) {
				entity.data = Ext.merge(entity.data,values);
			} else {
				// TODO values 를 이용해서 새로운 레코드를 만드는 로직을 구현해야 한다.
				// entity = values;
			}
		
			return entity;
		}
	},
	
	/**
	 * save item data modified on the view
	 * 
	 * @view
	 */
	saveItem : function(view) {
		HF.msg.confirm({
			msg : T('text.Sure to Save'),
			fn : function(btn) {
				if(btn == 'yes') {
					var record = this.getItemRecord(view);
					var errors = record.validate();
				
					if(errors.isValid()) {
						var recId = record.get("id");
						if(recId == '' || recId == '0' || recId == 0) {
							record.data.id = null;
						}
						
						record.save({
							success : function(record, operation) {
								// 저장을 성공하면, 그 결과로 변경된 데이타를 다시 넘겨주기로 약정한다.
								var savedRecord = operation.resultSet.records[0];
								view.fireEvent('after_save_item', view, savedRecord);
							}
						});
					} else {
						var error = errors.first;
						if(error) {
							HF.msg.notice(error.field + ' ' + T('text.' + error.message));
						}
					}
				}
			},
			scope: this
		});
	},
	
	/**
	 * delete item data loaded on the view
	 * 
	 * @view
	 */
	deleteItem : function(view) {
		var record = this.getItemRecord(view);
		
		if(!record || !record.getId()) {
			HF.msg.notice(T('text.Empty form data'));
			return;
		}
		
		HF.msg.confirm({
			msg : T('text.Sure to Delete'),
			fn : function(btn) {
				if(btn == 'yes') {
					record.destroy({
						success: function(record, operation) {
							view.fireEvent('after_delete_item', view, record, operation);
						}
					});
				}
			},
			scope: this
		});
	},
	
	/**
	 * callback on after loadItem for each Sub View.
	 * 
	 * @view
	 * @record - data of model
	 */
	onAfterLoadItem : function(view, record, operation) {
		if(view instanceof Ext.form.Panel) {
			// 만약 새로 생성하는 경우가 아니면, 이름을 바꾸지 못하도록 한다.
			if(record.data.id) {
				var fname = view.down('textfield[name=name]');
				if(fname)
					fname.setReadOnly(true);
			}
		
			view.loadRecord(record);
		}
	},
	
	/**
	 * callback on after save item
	 * 
	 * @view
	 * @record
	 */
	onAfterSaveItem : function(view, record) {
		if(view instanceof Ext.form.Panel) {
			view.loadRecord(record);
		}
	},
	
	/**
	 * callback on after delete item
	 * 기본 동작은 리스트 화면으로 간다
	 *
	 * @view
	 */
	onAfterDeleteItem : function(view) {
		var cv = HF.current.view();
		var item_view = cv ? cv.self.getName() : undefined;
		if(item_view) {
			HF.show(item_view.substr(0, item_view.length - 4));
		}
	}
});