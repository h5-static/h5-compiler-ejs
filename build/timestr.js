var moment = require('moment');

module.exports = function(cb){
	var now = new Date();
	cb(moment().format('YYYY-MM-DD HH:mm:ss'));
}