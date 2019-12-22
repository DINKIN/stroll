// bumps save versions

migrations = [
  // 0 -> 1
  
  // does nothing
  save => {
  },

  // 1 -> 2

  // automatic digestion is now a subcategory, so anyone with
  // a digest time of 0 should have that unset
  save => {
    if (save.oralDigestTime == 0)
      save.oralDigestAuto = false;
    if (save.analDigestTime == 0)
      save.analDigestAuto = false;
    if (save.tailDigestTime == 0)
      save.tailDigestAuto = false;
    if (save.cockDigestTime == 0)
      save.cockDigestAuto = false;
    if (save.unbirthDigestTime == 0)
      save.unbirthDigestAuto = false;
    if (save.breastDigestTime == 0)
      save.breastDigestAuto = false;
    if (save.soulDigestTime == 0)
      save.soulDigestAuto = false;
    if (save.bladderDigestTime == 0)
      save.bladderDigestAuto = false;
    if (save.gooDigestTime == 0)
      save.gooDigestAuto = false;
    if (save.pawDigestTime == 0)
      save.pawDigestAuto = false;
    if (save.cropTransferTime == 0)
      save.cropTransferAuto = false;
    if (save.wingDigestTime == 0)
      save.wingDigestAuto = false;
  },

  // 2 -> 3

  // passive production is now written as percentage points;
  // old values won't make sense anymore, so we'll just
  // erase them
  save => {
    if (save.baseCumProduction)
      delete save.baseCumProduction;
    if (save.baseFemcumProduction)
      delete save.baseFemcumProduction;
    if (save.baseLactationProduction)
      delete save.baseLactationProduction;
    if (save.baseGasProduction)
      delete save.baseGasProduction;
    if (save.basePissProduction)
      delete save.basePissProduction;
    if (save.baseScatProduction)
      delete save.baseScatProduction;
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
    save.version = target;
  } else {
    return false;
  }

  return true;
}
