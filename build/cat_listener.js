var Q = require("q");
var getCtg = require("../util/ctg");

module.exports = function(cb){
	
	Q.allSettled([
    	getCtg()
	]).then(function (results) {
		var cortexJson = results[0].value;
		cb(" onerror='typeof __CAT !=="+'"undefined"&&__CAT.call(this,{n:'+cortexJson.name+",v:"+cortexJson.version+"})' ")
	});
}