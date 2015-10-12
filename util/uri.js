/*
	资源标记符一些路径处理
*/

var node_path = require("path");
var pkg = require("neuron-pkg");
var semver = require("semver");
var getVersion = require("./version");
var ENV = require("./env");
var CWD = process.cwd();
var LOCAL_MOD = "/neurons";
var MOD  = "/mod";
module.exports = {
	/*
		判断是否为绝对地址
	*/
	is_absolute : function(title){
	  return /^[\.(\/[^\/])]/.test(title);
	},
	/*
		获取资源相对路径
	*/
	get_resolve_path : function(title,versions){
		var obj = pkg(title);
		var name = obj.name;
		var range = obj.range || "*";
		var version = obj.version;
		var path = obj.path;
		 if(path == ''){
		    path = name + '.js';
		  }
		  if(path.indexOf('/') == 0){
		    path = path.slice(1);
		  }

		var _version = semver.maxSatisfying(versions[name],range);

		return node_path.join(ENV == "dev" ? LOCAL_MOD : MOD,name,_version,path);
	},
	get_host:function(hosts,hash){
		var host;
		if(!hosts)
			return "";

		if(hash){
		    host = hosts[path.length % hosts.length];
		}else{
		    host = hosts[0];
		}
		if (hash) {
		    var frag = host.split(".");
		    frag[0] = frag[0].replace(/\d/, "{n}");
		    host = frag.join(".");
		}
		return host;
	},
	get_resolve_host:function(path,cwd){
		cwd = cwd || CWD;
		return node_path.dirname(node_path.relative(path,cwd));
	}
}