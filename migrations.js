// bumps save versions

migrations = [
  (save) => {
    // does nothing
  }
];

function migrate(save, target=null) {
  if (target == null) {
    target = migrations.length;
  }

  let version = save.version;

  if (version == undefined) {
    alert("This save is from before versioning was added. It can't be automatically updated, and it might lose some settings. Double check that everything's there! Any subsequent saves will work correctly.");
    save["version"] = migrations.length;
    return false;
  }

  if (version == 0 ) {
    alert("This save is from before v1.0. It can't be automatically migrated, so it may lose some settings. Double check the resulting character. Subsequent saves will function correctly.");
    save["version"] = migrations.length;
    return false;
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
