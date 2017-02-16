var CAT_FUNCTION_NAME = "__CAT"

function _listener(option){
	option = option || {};
	return option.cat_open ? "onerror='typeof "+CAT_FUNCTION_NAME+' !=="undefined" &&'+CAT_FUNCTION_NAME+".call(this,"+JSON.stringify({n:option.appname,v:option.version})+")'"
		: "";
}

module.exports  = {
	script:function(src,option){
		return '<script crossorigin="true" '+_listener(option)+' src="'+src+'"></script>'
	},
	css:function(src,option){
		return '<link rel="stylesheet" '+_listener(option)+' href="'+src+'" type="text/css"/>'
	}
}