/*
	本地
*/

var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var Q = require("q");

/*
	static 解析
	
	解析为一个静态地址
*/
module.exports = function(cb){

	Q.allSettled([
    	getHost(),
	    getVersion()
	]).then(function (results) {
		var hosts = results[0].value;
		var versions = results[1].value;
		cb(function(title){
		  	return  Uri.get_resolve_path(title,versions);
		})
	});;
}