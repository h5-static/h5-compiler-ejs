var gulp = require('gulp');
var tpl = require('gulp-tpl2mod');
var node_path = require("path");
gulp.task('tpl2mod',function(){
  gulp.src(node_path.join(__dirname, './template/**/*.html'))
      .pipe(tpl({
        prefix: 'module.exports=',
        suffix:";"
      }))
      .pipe(gulp.dest("./template"));
});

gulp.task('default', ["tpl2mod"]);