Ext.define('Frx.mixin.lifecycle.PopupLifeCycle', {

	PopupEventHandler : function(handler) {
		return Ext.apply({
			paramschange : this.onPopupParamsChange,
			click_close : this.onClickClose
		}, handler);
	},

	/**
	 * callback on parameter change of the popup
	 * 아이템을 렌더링하는 모든 뷰가 새로 생성된 후에 아이템의 키 정보를 params에 담아 호출된다.
	 * 주로 id 정보를 포함한다.
	 * Entry Point of the cycle of a item
	 *
	 * @view
	 * @params
	 */
	onPopupParamsChange : function(popup, params) {
	},
	
	/**
	 * callback on save button click
	 *
	 * @view
	 */
	onClickClose : function(popup) {
		popup.close();
	}
});