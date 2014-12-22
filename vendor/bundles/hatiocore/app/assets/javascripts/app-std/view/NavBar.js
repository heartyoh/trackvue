Ext.define('App.view.NavBar', {
	extend : 'Ext.panel.Panel',
	
	xtype : 'navbar',
	
	id : 'navbar',
	
	cls : 'navbar',
	
	autoScroll : true,

	dockedItems : [{
		xtype : 'toolbar',
		items : {
			xtype : 'label',
			text : '',
			id : 'submenu_title',
			textAlign : 'left'
		},
		dock : 'top'
	}],
	
	items : [{
		xtype : 'dataview',
		store : 'SubMenu',
		itemSelector : 'a',
		overItemCls : 'menu-item-hover',
		tpl : [
			'<tpl for=".">',
				'<tpl switch="menu_type">',
					'<tpl case="SEPARATOR">',
			            '<a class="menu-item-separator">{[T("menu." + values.name)]}</a>',
					'<tpl default>',
						'<tpl if="this.current(values)">',
				            '<a class="menu-item menu-item-active">{[T("menu." + values.name)]}</a>',
				        '<tpl else>',
				            '<a class="menu-item">{[T("menu." + values.name)]}</a>',
				        '</tpl>',
				'</tpl>',
			'</tpl>',
			{
				current : function(values) {
					var view = HF.current.view();
					if(!view) {
						return false;
					}
					if(view.itemId === values.template) {
						return true;
					}
					// TODO 메뉴에 등록되지 않은 화면인 경우 대표 리소스 화면의 메뉴를 찾는 방법이 궁색하다. (Item으로 끝나는 경우 Item을 떼고 다시 찾아본다. 여기서는 중복될 수도 있어서 특히 위험하다.)
					if(Ext.String.endsWith(view.itemId, 'Item') && view.itemId.slice(0, -4) === values.template)
						return true;
						
					return false;
				}
			}
		]
	}]
});
