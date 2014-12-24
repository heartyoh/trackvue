Ext.define('App.mixin.Ext', function() {

  //Ext.form.field.Base의 labelSeparator의 기본값을 ':' -> '' 변경했다
  Ext.override(Ext.form.field.Base, {
    labelSeparator : '',
    msgTarget : 'side'
  });

  //Ext.form.field.Base의 labelSeparator의 기본값을 ':' -> '' 변경했다
  Ext.override(Ext.form.FieldContainer, {
    labelSeparator : '',
    msgTarget : 'side'
  });

  return {};
}());
