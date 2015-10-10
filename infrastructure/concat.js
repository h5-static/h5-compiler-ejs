var semver = require("semver");
var pkg = require("pkg");

_mod_file_path = function(title) {
  var versions = this.versions;
  var obj = pkg(title);
  var name = obj.name;
  var range = obj.range || '*';
  var path = obj.path;
  if(!versions[name]){
    throw new Error("Module \"" + name + "\" not found, please install first.");
  }

  var version = semver.maxSatisfying(versions[name], range);
  if(!version){
    throw new Error("Valid version not found for module " + name + "@" + range);
  }

  if(path == ''){
    path = name + '.js';
  }
  if(path.indexOf('/') == 0){
    path = path.slice(1);
  }
  var base = this.hosts ? this.mod_root : this._resolve_path(this.relative_cwd);

  return node_path.join(base , name, version, path).replace(/\\/g,'/');
};