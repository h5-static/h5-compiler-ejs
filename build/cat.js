var Q = require("q");
var catTemplate = require("../template/cat.html.js");

module.exports = function(cb){
	cb(catTemplate);
}