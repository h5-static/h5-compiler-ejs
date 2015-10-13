var Q = require("q");
var getCtg = require("../util/ctg");
module.exports = function(cb){
	getCtg().then(function(cortexJson){
		cb(cortexJson.version);
	})
}