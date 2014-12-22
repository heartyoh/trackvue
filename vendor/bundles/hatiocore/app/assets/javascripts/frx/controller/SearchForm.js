Ext.define('Frx.controller.SearchForm', {
	extend : 'Ext.app.Controller',

	init : function() {
		this.control({
			'searchform' : {
				click_search : this.onSearchClick,
				click_reset : this.onResetClick
			}
		});
	},
	
	/**
	 * search form을 reset
	 */
	onResetClick : function(form) {
		form.getForm().reset();
	},
	
	/**
	 * search 버튼을 클릭했을 경우 검색 수행 
	 *
	 * @return
	 */
	onSearchClick : function(form) {
		var params = form.getValues();
		HF.current.view().setParams(params);
	}
});