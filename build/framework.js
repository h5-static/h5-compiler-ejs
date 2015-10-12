/*
	neuron 框架
	
	<$- framework$>

*/

var node_path = require("path");
var Uri = require("../util/uri");
var getVersion = require("../util/version");
var Q = require("q");
var cwd = process.cwd();

module.exports = function(cb,options){
	Q.allSettled([
	    getVersion()
	]).then(function (results) {
		
		var versions = results[0].value;
		

		cb(1);
	});;
}