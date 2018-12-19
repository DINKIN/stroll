// bumps save versions

migrations = [
  // 0 -> 1
  // notes: only adds version number
  function(save) {
    save["version"] = 1;
  }
  //
]

function migrate(save, target=null) {
  if (target == null) {
    target = migrations.length;
  }

  let version = save.version;

  if (version == undefined) {
    version = 0;
  }

  if (version < target) {
    for (let x = version; x < target; x++) {
      migrations[x](save);
    }
  } else {
    return false;
  }

  return true;
}
