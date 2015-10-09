/*
  使用方法
  先初始化，扩展方法
  然后render数据
*/


var Ejs = require("ejs");
var Tool = require("./util/tool");
var path = require("path");
//  build方法目录
var BUILD_DIR = "build";
/*
  共用标签包括
*/
var COMMON_HANDLER = ["css","facade","jscombo","framework"]


function Compiler(options){
    // 方法继承操作
    this.hanlder = Tool._extend(this._builder(),options);
}

/*
  共用方法构建
*/
Compiler.prototype._builder = function(){
  var _handler = {};
  COMMON_HANDLER.forEach(function(item){
    _handler[item] = require(path.joun(BUILD_DIR,item))();
  })
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