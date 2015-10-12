/*
	facede 解析
	
	<$ facade(title) $>

	解析js入口文件

*/

var node_path = require("path");
var getHost = require("../util/host");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var Q = require("q");
var cwd = process.cwd();

module.exports = function(cb,options){

	Q.allSettled([
    	getHost(),
	    getVersion()
	]).then(function (results) {
		var path = options.path;
		var hosts = results[0].value;


	});;
}