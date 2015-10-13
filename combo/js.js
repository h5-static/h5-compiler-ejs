/*
	js combo 服务
*/

var node_path = require("path");
var Uri = require("../util/uri");
var cwd = process.cwd();
var IS_COMBO = true;

module.exports = function(title,hosts,cortexJson,shrinkwrap,versions){

	var host = Uri.get_host(hosts);
		if(!host)
			host = Uri.get_resolve_host(options.path,options.cwd);

	// 遍历依赖结果
	var result = [];
	
	function _walk(obj,name,result){
		if(obj.dependencies){
			for(key in obj.dependencies){
				_walk(obj.dependencies[key],key,result);
			}
		}
		if(name && result.indexOf(name) == -1){
			result.push(name);
		}

		return result;
	}

	// 搜集依赖文件
	_walk(shrinkwrap,"",result);

	// 过滤lib库
	var jsFilterArray = cortexJson.combo ? (cortexJson.combo.filter || []) : [];
	/*
		强制过滤asset
	*/
	jsFilterArray.push("assert");

	if(jsFilterArray.length)
		result = result.filter(function(item){
			return jsFilterArray.indexOf(item) != -1 ? false : true; 
	});

	/*业务主函数 合并*/
	title&&result.push(title);

	var combo_path = [];

	result.forEach(function(item){
		combo_path.push(node_path.join(Uri.get_mod_prefix(),Uri.get_mod_path(item,versions)).replace(/\//g,"~"));
	});

	return host+node_path.join(Uri.get_mod_prefix(IS_COMBO),combo_path.join(","));

}