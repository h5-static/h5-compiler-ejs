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
var Tag = require("../middleware/tag");
var pkg = require("neuron-pkg");
var getCtg = require("../util/ctg");
module.exports = function(cb,options){
	Q.allSettled([
    	getHost(),
	    getVersion(),
	    getCtg()
	]).then(function (results) {
		var path = options.path;
		var hosts = results[0].value;
		var versions = results[1].value;
		var cortexJson = results[2].value;
		//创建css 标签
		function _createCssTag(cssArr){
			return TOOL.makeArray(cssArr).map(function(item){
				return Tag.css(item,{appname:cortexJson.name,version:cortexJson.version,cat_open:options.cat_open});
			}).join("\n");
		}

		var host = Uri.get_host(hosts);
		if(!host)
			host = Uri.get_resolve_host(options.path,options.cwd);

		// 开发环境
		if(ENV == "dev"){
			cb(function(title){
				var cssArr = title.split(",");
				 return _createCssTag(cssArr.map(function(css){
					return host+node_path.join(Uri.get_mod_prefix() ,Uri.get_mod_path(css,versions)); 
				}))				
			})
		}else{
			cb(function(title){
				var css_result = get_csscombo(title.split(","),hosts,versions);
				return _createCssTag(css_result);
			})
		}
	});;

}