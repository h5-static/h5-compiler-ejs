var fs = require("fs");
var Compiler = require("./index");

var content = fs.readFileSync("./template.html","utf8");

new Compiler(
  content,
  {},
  {
    path:"/Users/yangyuanxiang/yyy/h5-static/h5-compiler-ejs/html/test.html"
  },
  function(cont){
    fs.writeFileSync("./html/test.html", cont)
  }
)