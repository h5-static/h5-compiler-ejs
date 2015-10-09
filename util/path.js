var node_path = require("path");

var EXT = {
	js: '.js',
	css: '.css'
};


module.exports = {
	_static_path : function(title){
	  var ext = node_path.extname(title);
	  var dir = node_path.dirname(title);
	  var base = node_path.basename(title, ext);

	  var ext_name = ext.replace(/^\./, '');
	  var changed_ext = EXT[ext_name] || ext;
	  var url_path;
	  if(this._is_absolute(title)){
	    url_path = title;
	  }else{
	    url_path = dir + '/' + base + changed_ext;
	  }
	  return url_path;
	},
	_is_absolute : function(title){
	  	return title.indexOf("/") == 0;
	},
	_resolve_path : function(path, hash_host){
	  var absolute_path = this._to_absolute_path(path);
	  if(this.root && this.hosts){
	    path = "//" + this._get_host(absolute_path, hash_host) + absolute_path;
	  }
	  return this._to_url_path(path);
	}
}