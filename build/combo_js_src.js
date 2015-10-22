/*
	combo_js 解析
	
	<$- combo_js() $>

	当本地开发环境时候输出为空

*/

var node_path = require("path");
var getHost = require("../util/host");
var Uri = require("../util/uri");
var Q = require("q");
var get_jscombo = require("../combo/js");
var ENV = require("../util/env");
var getCtg = require("../util/ctg");
var getVersion = require("../util/version");
var getNgraph = require("../util/ngraph");


module.exports = function(cb,options){
	
	// 本地就直接放过
	if(ENV == "dev"){
		cb(function () {
			return "";
		});
		return ;
	}

	Q.allSettled([
	    getHost(),
	    getCtg(),
	    getNgraph(),
	    getVersion()
	]).then(function (results) {
		var hosts = results[0].value;
		var cortexJson = results[1].value;
		var shrinkwrap = results[2].value.shrinkwrap;
		var versions = results[3].value;

		cb(function(title){
			return 	get_jscombo(title,hosts,cortexJson,shrinkwrap,versions);
		});

	});;
}