/*
	资源标记符一些路径处理
*/

var node_path = require("path");
var pkg = require("neuron-pkg");
var semver = require("semver");
var getVersion = require("./version");
var ENV = require("./env");
var CWD = process.cwd();
var LOCAL_MOD_PREFIX = "/";
var MOD_PREFIX  = "/mod";
var COMBO_PREFIX = "/concat";
var die = require("./cwd").die;
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
	get_mod_path : function(title,versions){
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

		if(!versions[name])
			die("没有找到该模块:"+name);

		var _version = semver.maxSatisfying(versions[name],range);

		return node_path.join(name,_version,path);
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

		return host.replace(/\//g,"\/");
	},
	get_resolve_host:function(path,cwd){
		cwd = cwd || CWD;
		return "../../"+node_path.dirname(node_path.relative(path,cwd));
	},
	get_mod_prefix:function(isCombo){
		return isCombo ?COMBO_PREFIX  : ENV == "dev" ? LOCAL_MOD_PREFIX : MOD_PREFIX;
	}
}