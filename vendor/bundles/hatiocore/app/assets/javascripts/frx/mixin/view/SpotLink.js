Ext.define('Frx.mixin.view.SpotLink', function(){
	function getParams() {
		return this._params;
	}

	function setParams(params, silent) {
		this._params = params;
		
		this.fireEvent('paramschange', this, params);

		if(!silent)
			HF.history.add(this, params);
	}
	
	return {
		getParams : getParams,
		setParams : setParams
	};
}());
