/*
	获取环境
*/
var ENV  = process.env.ENV ? process.env.ENV : "dev";

process.env.NODE_LION_ENV = ENV == "beta" ? "qa" : ENV;

module.exports = ENV;