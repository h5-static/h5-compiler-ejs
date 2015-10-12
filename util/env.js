/*
	获取环境
*/



/*
	模拟beta环境
*/
var ENV  = "dev";
process.env.NODE_LION_ENV = ENV == "beta" ? "qa" : ENV;
module.exports = ENV;//process.env.ENV ? process.env.ENV : "dev";