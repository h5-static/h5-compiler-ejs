/*
	combo_js 解析
	
	<$- combo_js() $>

	当本地开发环境时候输出为空

*/

var node_path = require("path");
var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var Q = require("q");
var cwd = process.cwd();
var pkg = require("neuron-pkg");
var ENV = require("../util/env");
var getCtg = require("../util/ctg");
var getNgraph = require("../util/ngraph");


module.exports = function(cb,options){
	Q.allSettled([
	    getHost(),
	    getCtg(),
	    getNgraph(),
	    getVersion()
	]).then(function (results) {
		// 本地就直接放过
		if(ENV == "dev")
			cb("");


		var hosts = results[0].value;
		var cortexJson = results[1].value;
		var shrinkwrap = results[2].value.shrinkwrap;
		var versions = results[3].value;

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

		cb(function(title){
			/*业务主函数 合并*/
			title&&result.push(title);

			var path = [];

			result.forEach(function(item){
				Uri.get_mod_path(title,versions);
			})

	});;
}