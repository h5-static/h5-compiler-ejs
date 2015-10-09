var die = require("./cwd").die;
var Q = require("q");
var fs = require("fs");
var CORTEXT_JSON = "cortex.json";
var OverWriteFn = require("./overwrite");
var cwd_path = process.env.WORKSPACE || process.cwd();
var ngraph = require("neuron-graph");

function stripBOM(content) {
  // Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
  // because the buffer-to-string conversion in `fs.readFileSync()`
  // translates it to FEFF, the UTF-16 BOM.
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

function tryCatch(cb,content){
	try{
		cb()
	}catch(e){
		die(content);
	}
}


function getShrinkWrap(){
    var shrinkWrap;
    var cortexJson;
    var deferred = Q.defer();


    tryCatch(function(){
      cortexJson = JSON.parse(stripBOM(fs.readFileSync(path.join(cwd_path,CORTEXT_JSON),"utf8")));;
    },"cortex.json文件解析失败");

    ngraph(cortexJson,{
        cwd: cwd_path,
        built_root: path.join(cwd_path, process.env.CORTEX_DEST || 'neurons'),
        dependencyKeys: ['dependencies']
    }, function(err, graph, _shrinkwrap){
        OverWriteFn(getShrinkWrap,_shrinkwrap);
        deferred.resolve(shrinkWrap = _shrinkwrap);
    });
    
    return deferred.promise;
}

module.exports = getShrinkWrap;
