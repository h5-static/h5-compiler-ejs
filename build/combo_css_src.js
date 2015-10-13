/*
	combo_js 解析
	
	<$- combo_js() $>

	当本地开发环境时候输出为空

*/

var node_path = require("path");
var getHost = require("../util/host");
var Uri = require("../util/uri");
var Q = require("q");
var get_jscombo = require("../combo/js");
var ENV = require("../util/env");
var getCtg = require("../util/ctg");
var getVersion = require("../util/version");
var getNgraph = require("../util/ngraph");
var get_csscombo = require("../combo/css");
var TOOL = require("../util/tool");


module.exports = function(cb,options){

	//生成css 路径
	function _createCssSrc(cssArr){
		return TOOL.makeArray(cssArr).join("\n");
	}

	Q.allSettled([
    	getHost(),
	    getVersion()
	]).then(function (results) {
		var path = options.path;
		var hosts = results[0].value;
		var versions = results[1].value;
		
		var host = Uri.get_host(hosts);
		if(!host)
			host = Uri.get_resolve_host(options.path,options.cwd);
		
		// 开发环境
		if(ENV == "dev"){
			cb(function(title){
				var cssArr = title.split(",");
				return _createCssSrc(cssArr.map(function(css){
					return host+node_path.join(Uri.get_mod_prefix() ,Uri.get_mod_path(css,versions)); 
				}))				
			})
		}else{
			cb(function(title){
				var css_result = get_csscombo(title.split(","),hosts,versions);
				return _createCssSrc(css_result);
			})
		}
	});;

}