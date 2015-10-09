var getHost = require("../util/host");
var Uri = require("../util/uri");

/*
	static 解析
	
	解析为一个静态地址
*/
module.exports = function(cb){
	getHost().then(function(host){
		cb(function(title){
			 var url_path = Uri.static_path(title);
		})
	})
}