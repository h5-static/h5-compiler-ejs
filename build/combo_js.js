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
var Tool = require("../util/tool");
var pkg = require("neuron-pkg");
var Tag = require("../util/tag");


module.exports = function(cb,options){
	// 本地就直接放过
	if(ENV == "dev"){
		cb(function(title){
			return "";
		});
		return ;
	}
	Q.allSettled([
	    getHost(),
	    getCtg(),
	    getNgraph(),
	    getVersion()
	]).then(function (results) {
		var hosts = results[0].value;
		var cortexJson = results[1].value;
		var shrinkwrap = results[2].value.shrinkwrap;
		var versions = results[3].value;
		var deps = [];
		var result = [];
		var loaded = [];
		var host = Uri.get_host(hosts);


		function _url_build(title){
			return Tag.script(host+node_path.join(Uri.get_mod_prefix() ,Uri.get_mod_path(title,versions)))
		}


		// 搜集依赖文件
		Tool.walkDep(shrinkwrap,"",deps);

		cb(function(title,noCombo){
			// 装载loaded
			deps.forEach(function(item){
				versions[item]&&loaded.push(item+"@"+versions[item]);
			})
			if(title){
				var obj = pkg(title);
				obj.version = cortexJson.version;
				loaded.push(obj.name+"@"+obj.version+obj.path);
			}
			// 配置loadad
			result.push('<script>neuron.config('+JSON.stringify({loaded:loaded})+')</script>)');
			// 加载配置
			// 是否需要combo
			if(!noCombo){
				result.push(Tag.script(get_jscombo(title,hosts,cortexJson,shrinkwrap,versions)));
				// 加载过滤单个
				var jsFilterArray = cortexJson.combo ? (cortexJson.combo.filter || []) : [];
				jsFilterArray.forEach(function(item){
					result.push(_url_build(item));
				})
			}else{
				// 加载单个，不合并
				deps.forEach(function(item){
					result.push(_url_build(item));
				});
				title&&result.push(_url_build(title));
			}
			
			return result.join("\n");
		});

	});;
}