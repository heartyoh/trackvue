//= require_self
//= require_tree ./mixin
//= require_tree ./store
//= require_tree ./common
//= require_tree ./field
//= require_tree ./grid
//= require_tree ./report
//= require_tree ./controller
//= require_tree ./chart
initLocalization({
	scope : this,
	language : login.locale,
	paths : LOCALE_RESOURCE ? [] : ['terminologies/locale_resource.json?locale=' + login.locale]
});

if(LOCALE_RESOURCE)
	T(LOCALE_RESOURCE);
