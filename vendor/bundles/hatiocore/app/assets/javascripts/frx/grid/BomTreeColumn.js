/**
 * Provides indentation and folder structure markup for a Tree taking into account
 * depth and position within the tree hierarchy.
 * 
 * @private
 */
Ext.define('Frx.grid.BomTreeColumn', {
    extend: 'Ext.tree.Column',
    alias: 'widget.bomTreeColumn',

    tdCls: Ext.baseCSSPrefix + 'grid-cell-treecolumn',
    
    treePrefix: Ext.baseCSSPrefix + 'tree-',
    elbowPrefix: Ext.baseCSSPrefix + 'tree-elbow-',
    expanderCls: Ext.baseCSSPrefix + 'tree-expander',
    imgText: '<img src="{1}" class="{0}" />',
    checkboxText: '<input type="button" role="checkbox" class="{0}" {1} />',

    initComponent: function() {
        var me = this;
        me.callParent();
    },
    
     processEvent : function(type, view, cell, recordIndex, cellIndex, e, record, row){
     	var me = this;
     	if(type=='click'){
     		var target = e.getTarget();
			if(target.name && target.name == "addButton"){
				me.up().up().fireEvent('treeNodeAdd', record);
				return;
			}
			if(target.name && target.name == "removeButton"){
				me.up().up().fireEvent('treeNodeRemove', record);
				return;
			}
			if(target.name && target.name == "updateButton"){
				me.up().up().fireEvent('treeNodeUpdate', record);
				return;
			}
     	}
        return me.callParent(arguments);
    },
    
    treeRenderer: function(value, metaData, record, rowIdx, colIdx, store, view){
        var me = this,
            buf = [],
            format = Ext.String.format,
            depth = record.getDepth(),
            treePrefix  = me.treePrefix,
            elbowPrefix = me.elbowPrefix,
            expanderCls = me.expanderCls,
            imgText     = me.imgText,
            checkboxText= me.checkboxText,
            formattedValue = me.origRenderer.apply(me.origScope, arguments),
            blank = Ext.BLANK_IMAGE_URL,
            href = record.get('href'),
            target = record.get('hrefTarget'),
            cls = record.get('cls');
            leaf = record.get('leaf')

        while (record) {
            if (!record.isRoot() || (record.isRoot() && view.rootVisible)) {
                if (record.getDepth() === depth) {
//                    buf.unshift(format(imgText,
//                        treePrefix + 'icon ' + 
//                        treePrefix + 'icon' + (record.get('icon') ? '-inline ' : (record.isLeaf() ? '-leaf ' : '-parent ')) +
//                        (record.get('iconCls') || ''),
//                        record.get('icon') || blank
//                    ));
                    if (record.get('checked') !== null) {
                        buf.unshift(format(
                            checkboxText,
                            (treePrefix + 'checkbox') + (record.get('checked') ? ' ' + treePrefix + 'checkbox-checked' : ''),
                            record.get('checked') ? 'aria-checked="true"' : ''
                        ));
                        if (record.get('checked')) {
                            metaData.tdCls += (' ' + treePrefix + 'checked');
                        }
                    }
                    if (record.isLast()) {
                        if (record.isExpandable()) {
                            buf.unshift(format(imgText, (elbowPrefix + 'end-plus ' + expanderCls), blank));
                        } else {
                            buf.unshift(format(imgText, (elbowPrefix + 'end'), blank));
                        }
                            
                    } else {
                        if (record.isExpandable()) {
                            buf.unshift(format(imgText, (elbowPrefix + 'plus ' + expanderCls), blank));
                        } else {
                            buf.unshift(format(imgText, (treePrefix + 'elbow'), blank));
                        }
                    }
                } else {
                    if (record.isLast() || record.getDepth() === 0) {
                        buf.unshift(format(imgText, (elbowPrefix + 'empty'), blank));
                    } else if (record.getDepth() !== 0) {
                        buf.unshift(format(imgText, (elbowPrefix + 'line'), blank));
                    }                      
                }
            }
            
            record = record.parentNode;
        }
        if (href) {
            buf.push('<a href="', href, '" target="', target, '">', formattedValue, '</a>');
        } else {
            buf.push(formattedValue);
           
            if (leaf) {
        		//buf.push('&nbsp;&nbsp;<img name="updateButton" src="theme/image/iconDetail.png" />');
            }else{
            	buf.push('&nbsp;&nbsp;&nbsp;<img name="addButton" src="assets/std/addImg.png" style="margin-top:3px"/>&nbsp;&nbsp;&nbsp;');
            	//buf.push('<img name="removeButton" src="theme/image/removeImg.png" style="margin-top:3px"/>');
            }
	            
        }
        if (cls) {
            metaData.tdCls += ' ' + cls;
        }
        
        return buf.join('');
    },

    defaultRenderer: Ext.identityFn
});