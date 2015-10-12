/*
	neuron 框架
	
	<$- framework$>

*/


var node_path = require("path");
var Uri = require("../util/uri");
var getNgraph = require("../util/ngraph");
var getHost = require("../util/host");
var NEURON= require("../util/neuron");
var Q = require("q");
var cwd = process.cwd();

module.exports = function(cb,options){
	Q.allSettled([
	    getNgraph(),
      getHost()
	]).then(function (results) {
  		var ngraph = results[0].value;
      var hosts = results[1].value;
      var host = Uri.get_host(hosts);
      var neuron_config = {};
      var result = [];
      if(!host)
          host = Uri.get_resolve_host(options.path,options.cwd);
      // 加载neuron
      result.push(
        '<script src="' +
          host+node_path.join(Uri.get_mod_prefix(),NEURON.name,NEURON.version,NEURON.path) +
        '"></script>'
      );

      // 加载配置项
      neuron_config.graph = ngraph.graph;

      neuron_config.path = host+Uri.get_mod_prefix();
	   

      result.push('' + [
        '<script>',
        'neuron.config(' + JSON.stringify(neuron_config) + ');',
        '</script>'
      ].join(''));

      cb(result.join(""));

  });;
}
