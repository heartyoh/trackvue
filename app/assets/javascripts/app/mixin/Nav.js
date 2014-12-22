Ext.define('App.mixin.Nav', function() {

  function show(view, params, config) {
    var content = Ext.getCmp('content');

    var current = null;

    if (Ext.isString(view)) {
      var itemId = view.replace(/\./g, '_');

      var current = content.getComponent(itemId);
      if(!current) {
        Ext.syncRequire(view);
        current = content.add(Ext.create(view, Ext.merge({
          itemId: itemId
        }), config));
      }
      content.getLayout().setActiveItem(current);
    } else {
      current = view;
    }

    if (current.setParams) {
      current.setParams(params || current.getParams());
    } else {
      HF.history.add(view, params);
    }

    content.fireEvent('showcontent', content, screen);
  }

  return {
    show: show
  };

}());
