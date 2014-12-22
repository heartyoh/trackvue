Ext.define('Frx.controller.ItemController', {
	extend : 'Ext.app.Controller',

	EntryPoint : function() {
		var base = {
			paramschange : this.onParamsChange
		};

		if(arguments.length > 0) {
			Ext.each(arguments, function(arg) {
				Ext.apply(base, arg);
			});
		}

		return base;
	},
	
	EntryPointWith : function() {
		return this.EntryPoint.apply(this, arguments);
	},

	/**
	 * callback on parameter change of the view
	 * 아이템을 렌더링하는 모든 뷰가 새로 생성된 후에 아이템의 키 정보를 params에 담아 호출된다.
	 * 주로 id 정보를 포함한다.
	 * Entry Point of the cycle of a item
	 *
	 * @view
	 * @params
	 */
	onParamsChange : function(view, params) {
		this.loadItem(view, params);
	},
	
	/**
	 * get Model Class of the view
	 * 
	 * @view
	 */
	getModelClass : function(view) {
		return Ext.ClassManager.get(this.models[0])
	},
	
	/**
	 * save item data modified on the view
	 * TODO ItemController 의 loadItem 구현이 form 기준으로 되어있는 점을 개선하라.
	 *
	 * @view
	 * @params
	 */
	loadItem : function(view, params) {
		var modelClass = this.getModelClass(view);
		
		modelClass.load(params.id, {
			scope : this,
			success : function(record, operation) {
				// TODO name 이 없는 경우에 처리방법을 구현해야 함.
				view.itemname = record.get('name');
				App.getApplication().fireEvent('titlechange', view);

				if(view instanceof Ext.tab.Panel) {
					view.items.each(function(child) {
						child.fireEvent('after_load_item', child, record, operation);
					});
				} else if(view instanceof Frx.common.Popup) {
					var formView = view.down('form');
					if(!formView) {
						formView = view;
					}
					formView.fireEvent('after_load_item', formView, record, operation);
				} else {
					view.fireEvent('after_load_item', view, record, operation);
				}
			}
		});
	}

});