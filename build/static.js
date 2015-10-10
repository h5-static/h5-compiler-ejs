/*
	本地
*/

var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var pkg = require("neuron-pkg");
/*
	static 解析
	
	解析为一个静态地址
*/
module.exports = function(cb){
	getHost().then(function(host){
		getVersion().then(function(version){
			cb(function(title){
				var obj = pkg(title);			
				debugger;
			})
		})
	})
}