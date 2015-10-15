/*
	命令行相关
*/

var gutil = require('gulp-util');

module.exports = {
	die: function(err) {
	    gutil.beep();
	    console.error("Error", err.stack || err);
	    process.exit(1);
	}
}