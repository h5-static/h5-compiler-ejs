var moment = require('moment');

module.exports = function(cb){
	cb(moment().format('YYYY-MM-DD HH:mm:ss'));
}