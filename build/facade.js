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
var pkg = require("neuron-pkg");
var ENV = require("../util/env");
var getCtg = require("../util/ctg");

module.exports = function(cb,options){
	Q.allSettled([
	    getVersion(),
	    getCtg()
	]).then(function (results) {
		var versions = results[0].value;
		var cortexJson = results[1].value;
		cb(function(title){
			var obj = pkg(title);
			obj.version = obj.version || cortexJson.version;

			return [
			    '<script>',
			      'facade({',
			        'entry:"' + pkg.format(obj)+ '"',
			      '});',
			    '</script>'
			  ].join('');
		})
	});;
}