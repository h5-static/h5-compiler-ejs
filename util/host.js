/*
    从lion中获取host
*/

var ENV = require("./env");
var RESOURCE_SERVER_URL = "neocortex-4j.static.resourceServer";
var die = require("./cwd").die;
var Q = require("q");
var OverWriteFn = require("./overwrite");

/*
	模拟beta环境
*/
ENV =  "beta";
process.env.NODE_LION_ENV = ENV == "beta" ? "qa" : ENV;


function _resourceServerSanitizer(v) {
    if (v.indexOf("[") == 0) {
        return JSON.parse(v);
    }
    return [v.split(",")];
}

/**
 * 验证器
 */
function _validator(v, done) {
    if (!v) {
        return done(FAIL_TO_GET_LION_CONFIG);
    }
    return done(null);
}


function getHost(){
	var deferred = Q.defer();
	var resourceHost;


	// 本地就不用再去拿
	if(ENV == "dev"){
		resourceHost = "";
		OverWriteFn(getHost,resourceHost);
		deferred.resolve("");
	}else{
		var lion = require("@dp/lion")();

		lion.get(RESOURCE_SERVER_URL,function(err, value){
			if (err) {
                console.error(Errors.FAIL_TO_GET_LION_CONFIG);
                die(err);
            }
            value = resourceHost = _resourceServerSanitizer(value);
            _validator(value, function(err) {
                if (err) {
                    die(err);
                }
                OverWriteFn(getHost,resourceHost);
                deferred.resolve(value);
            });
		})
	}

	return deferred.promise;
}

module.exports = getHost;