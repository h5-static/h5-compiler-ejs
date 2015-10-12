/*
  获得版本号序列
*/

var Q = require("q");
var OverWriteFn = require("./overwrite");
var getNgraph = require("./ngraph");

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


  getNgraph().then(function(ngraph){
      var  shrinkwrap = ngraph.shrinkwrap;
      
      OverWriteFn(getVersion,versions_cache);
      digdeps(shrinkwrap.name, shrinkwrap);
      deferred.resolve(versions_cache);
  })

  return deferred.promise;
}

module.exports =  getVersion;