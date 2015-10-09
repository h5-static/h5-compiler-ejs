/*
	配合q，异步请求时候，多次获取异步值，值缓存
	方法重写
*/
var Q = require("q")

module.exports = function(fn,val){
	fn = function(){
		var deferred = Q.defer();
        deferred.resolve(val);
        return deferred.promise;
	}
}