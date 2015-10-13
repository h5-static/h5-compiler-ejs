/*
	js combo 服务
*/

var node_path = require("path");
var Uri = require("../util/uri");
var cwd = process.cwd();
var IS_COMBO = true;
var TOOL = require("../util/tool");

module.exports = function(titles,hosts,versions){

	var host = Uri.get_host(hosts);
	if(!host)
		host = Uri.get_resolve_host(options.path,options.cwd);

	
	titles = TOOL.makeArray(titles);

	if(!host)
		host = Uri.get_resolve_host(options.path,options.cwd);

	// combo存储
	var combo_path = [];

	titles.forEach(function(item){
		combo_path.push(node_path.join(Uri.get_mod_prefix(),Uri.get_mod_path(item,versions)).replace(/\//g,"~"));
	})

	return host+node_path.join(Uri.get_mod_prefix(IS_COMBO),combo_path.join(","));

}