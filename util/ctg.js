var cortex_json = require('read-cortex-json');
var Q = require("q");
var overWrite = require("./overwrite");
var ENV  = require("./env");
var semver = require("semver");
var cwd_path = process.env.WORKSPACE || process.cwd();

function getCtg(){
   	var deferred = Q.defer();
	cortex_json.read(cwd_path,function(a,json){
	 	if(ENV != "dev" && ENV != "product"){
            var s = semver.parse(json.version);
            s.prerelease.length = 0;
            s.prerelease.push(ENV);
            json.version = s.format();
        }
		overWrite(getCtg,json);
		deferred.resolve(json);
	})
	return deferred.promise;
}

module.exports = getCtg;