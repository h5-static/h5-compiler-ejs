var getHost = require("../util/host");

/*
	static 解析
	
	解析为一个静态地址
*/
module.exports = function(cb){
	getHost().then(function(host){
		cb(function(title){
			 var url_path = this._static_path(title);
  			return this._resolve_path(url_path);
		})
	})
}