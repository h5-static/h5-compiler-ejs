/*
	资源标记符一些路径处理
*/

var node_path = require("path");
var pkg = require("neuron-pkg");
var semver = require("semver");
var getVersion = require("./version");
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

		var _version = semver.maxSatisfying(versions[name]);

		return node_path.join(name,_version,path);
	}
}