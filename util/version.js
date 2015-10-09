/*
  获得版本号
*/

var Q = require("q");
var OverWriteFn = require("./overwrite");
var getShrinkWrap = require("./shrinkwrap");

function getVersion (){

  var deferred = Q.defer();

  var versions_cache = {};
  
  function digdeps(k, node){
      if(!versions_cache[k]){
        versions_cache[k] = [node.version];
      }else{
        if(versions_cache[k].indexOf(node.version) == -1){
          versions_cache[k].push(node.version);
        }
      }

      var deps = node.dependencies;
      if(deps){
        for(var name in deps){
          digdeps(name, deps[name]);
        }
      }
  }


  getShrinkWrap().then(function(shrinkwrap){
      OverWriteFn(getVersion,versions_cache);
      digdeps(shrinkwrap.name, shrinkwrap);
      deferred.resolve(versions_cache);
  })

  return deferred.promise;
}

module.exports =  getVersion;