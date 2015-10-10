/*
	资源标记符一些路径处理
*/

var node_path = require("path");

var EXT = {
	js: '.js',
	css: '.css'
};

module.exports = {
	/*
		判断是否为绝对地址
	*/
	is_absolute : function(title){
	  return /^[\.(\/[^\/])]/.test(title);
	}
}