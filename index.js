/*
  使用方法
  先初始化，扩展方法
  然后render数据
*/


var EJS = require("ejs");
// 标签闭合跟其他地方区分
EJS.delimiter = '$';
var Tool = require("./util/tool");
var path = require("path");
var async = require("async");
//  build方法目录
var BUILD_DIR = "build";
var die = require("./util/cwd").die;
/*
  共用标签包括
*/
var COMMON_HANDLER = ["css","facade","jscombo","framework","static"]

// 默认的静态标签什么的
var STATIC_COMMON_HANDLER = {

}

function Compiler(fileContent,options,callback){
    // 静态方法和外部开放方法继承操作
    this._hanlder = Tool._extend(STATIC_COMMON_HANDLER,options);

    // 共用方法继承
    async.each(COMMON_HANDLER,function(item,cb){
      self._loadHandler.call(self,item,cb);
    }, function(err){
      if(err){
        die("模板共用方法加载出错："+err);
      }else{
        self.options = options = Tool.mix(options || {},self.result);
        try{
          callback&&callback(new Buffer(EJS.render(fileContent,self._hanlder)))
        }catch(e){
          die("模板解析出错："+e);
        }
      }
    });
}


HCompile.prototype._loadHandler = function(item,cb){
  var self = this;
  var _hanlder = self._hanlder;
  require(path.join(BUILD_DIR,item.toLowerCase()))(function(handler){
    _hanlder[item] = handler;
    cb();
  });
}


/*
    render 外部暴漏方法
    页面渲染
*/
Compiler.prototype.render = function(template){
    //页面编译 
    return new Ejs(this.handler)(template);
}


module.exports = Compiler;