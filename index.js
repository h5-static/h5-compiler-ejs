/*
  主函数
*/
var EJS = require("ejs");
// 标签闭合跟其他地方区分
EJS.delimiter = '$';
var Tool = require("./util/tool");
var path = require("path");
var fs = require("fs");
var async = require("async");
//  build方法目录
var BUILD_DIR = "./build/";
var die = require("./util/cwd").die;
/*
  共用标签包括
*/
var COMMON_HANDLER = ["static","facade","framework","combo_js","combo_js_src","combo_css","timestr","env","version"];

// 默认的静态标签什么的
var STATIC_COMMON_HANDLER = {
    
}
// 默认参数
var DEFAULT_OPTIONS = {
  
}

function Compiler(fileContent,handler,options,callback){
    // 静态方法和外部开放方法继承操作
    var self = this;
    
    self._hanlder = Tool.extend(STATIC_COMMON_HANDLER,handler);
    
    self.options = Tool.extend(DEFAULT_OPTIONS,options);

    // 共用方法继承
    async.each(COMMON_HANDLER,function(item,cb){
      self._loadHandler.call(self,item,cb);
    }, function(err){
      if(err){
        die("模板共用方法加载出错："+err);
      }else{
        try{
          callback&&callback(new Buffer(EJS.render(fileContent,self._hanlder)))
        }catch(e){
            callback&&callback(new Buffer(fileContent));
            die(e);
        }

      }
    });
}


Compiler.prototype._loadHandler = function(item,cb){
  var self = this;
  var _hanlder = self._hanlder;
  require(BUILD_DIR+item.toLowerCase())(function(handler){
    _hanlder[item] = handler;
    cb();
  },self.options);
}


// var content = fs.readFileSync("./template.html","utf8");

// new Compiler(
//   content,
//   {},
//   {
//     path:"/Users/yangyuanxiang/yyy/h5-static/h5-compiler-ejs/html/test.html"
//   },
//   function(cont){
//     fs.writeFileSync("./html/test.html", cont)
//   }
// )

module.exports = Compiler;