var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");

/*
	static 解析
	
	解析为一个静态地址
*/
module.exports = function(cb){
	getHost().then(function(host){
		getVersion().then(function(version){
			
		})
	})
}