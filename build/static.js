/*
	本地
*/
var node_path = require("path");
var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var Q = require("q");
var cwd = process.cwd();
/*
	static 解析
	
	<$ static(title) $>

	解析为一个静态地址


*/
module.exports = function(cb,options){
	Q.allSettled([
    	getHost(),
	    getVersion()
	]).then(function (results) {
		var path = options.path;
		var hosts = results[0].value;
		var versions = results[1].value;
		cb(function(title){

			var host = Uri.get_host(hosts);

			if(!host)
				host = Uri.get_resolve_host(options.path,options.cwd);
			
		  	return node_path.join( host , Uri.get_mod_prefix() ,Uri.get_mod_path(title,versions)); 
		})
	});;
}