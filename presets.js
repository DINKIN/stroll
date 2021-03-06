let presetCategories = [
  "default",
  "neopuc",
  "special"
]

let presetInfo = {
  default: {
    name: "Default"
  },
  neopuc: {
    name: "Neopuc's Chars"
  },
  special: {
    name: "Extra Special"
  }
}

let presets = [
  {
    "version": 3,
    "name": "Fen",
    "scale": 15,
    "priority": 1,
    "brutality": "2",
    "oralVore": true,
    "analVore": true,
    "analVoreToStomach": true,
    "hasTail": true,
    "tailType": "twisted",
    "baseTailLength": 2,
    "baseTailDiameter": 0.4
  },
  {
    "version": 3,
    "name": "Special Fen",
    "category": "special",
    "bio": "He's VERY fluffy",
    "scale": 15,
    "priority": 1,
    "brutality": "2",
    "oralVore": true,
    "analVore": true,
    "analVoreToStomach": true,
    "hasTail": true,
    "tailType": "twisted",
    "baseTailLength": 2,
    "baseTailDiameter": 0.4
  },
  {
    "version": 3,
    "name": "Arokha",
    "scale": 10,
    "baseHeight": 1.67,
    "baseMass": 50,
    "baseAssArea": 0.25,
    "species": "kitsune",
    "victimsMicros": true,
    "oralVore": true,
    "oralDigestTime": 5,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "analDigestTime": 5,
    "analVoreToStomach": true,
    "footSockEnabled": true,
    "footShoeEnabled": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailCount": 2,
    "tailMaw": true,
    "tailStretchiness": 1,
    "tailDigestTime": 5,
    "tailVoreToStomach": true,
    "dickStretchiness": 1,
    "hasSheath": true,
    "femaleParts": true,
    "baseVaginaLength": 0.12,
    "vaginaStretchiness": 2,
    "femcumScaleWithSize": true,
    "hasBreasts": true,
    "lactationEnabled": true,
    "breastStretchiness": 1,
    "baseAssStenchArea": 2,
    "baseScatStenchArea": 1.5,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "gasScaleWithSize": true,
    "soulVoreEnabled": true,
    "soulDigestTime": 5,
    "pissEnabled": true,
    "scatEnabled": true,
    "scatScaleWithSize": true,
    "gooDigestion": true
  },
  {
    "version": 3,
    "name": "Aronai",
    "scale": 10,
    "baseHeight": 1.8,
    "baseMass": 86,
    "baseAssArea": 0.25,
    "sameSizeStomp": true,
    "species": "synthfox",
    "brutality": "0",
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "footSockEnabled": true,
    "footShoeEnabled": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "floofy",
    "tailStretchiness": 1,
    "tailVoreToStomach": true,
    "dickStretchiness": 1,
    "hasSheath": true,
    "femaleParts": true,
    "baseVaginaLength": 0.12,
    "vaginaStretchiness": 2,
    "femcumScaleWithSize": true,
    "breastStretchiness": 1,
    "baseAssStenchArea": 2,
    "baseScatStenchArea": 1.5,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "gasScaleWithSize": true,
    "soulVoreEnabled": true,
    "soulDigestTime": 10,
    "soulVoreType": "release",
    "pissEnabled": true,
    "scatEnabled": true,
    "scatScaleWithSize": true,
    "gooDigestion": true
  },
  {
    "version": 3,
    "name": "Dissy",
    "scale": 450,
    "baseHeight": 3,
    "baseMass": 55,
    "baseAssArea": 5,
    "species": "stallion",
    "footType": "hoof",
    "brutality": "3",
    "victimsHuman": true,
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "oralDigestTime": 0,
    "vomitEnabled": true,
    "analVore": true,
    "baseAnalVoreDiameter": 1,
    "analDigestTime": 0,
    "analVoreToStomach": true,
    "footSockEnabled": true,
    "footShoe": "sandal",
    "arousalEnabled": true,
    "arousalFactor": 2,
    "hasTail": true,
    "tailType": "floofy",
    "baseTailDiameter": 2,
    "tailMaw": true,
    "tailStretchiness": 5,
    "tailVoreToStomach": true,
    "maleParts": true,
    "baseDickLength": 4,
    "baseDickDiameter": 2,
    "dickType": "horse",
    "baseBallDiameter": 7,
    "cumStorageScale": 9,
    "dickStretchiness": 1,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1,
    "stenchEnabled": true,
    "basePawStenchArea": 4,
    "baseAssStenchArea": 4,
    "basePissStenchArea": 4,
    "baseScatStenchArea": 4,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "baseGasDigestFactor": 4,
    "soulVoreType": "release",
    "pissEnabled": true,
    "scatEnabled": true,
    "baseScatDigestFactor": 3,
    "scatStorageScale": 5,
    "gooDigestion": true,
    "pawDigestTime": 0,
    "oralDigestAuto": false,
    "analDigestAuto": false,
    "pawDigestAuto": false
  },
  {
    "version": 3,
    "name": "Elijah",
    "baseHeight": 1.77,
    "baseMass": 63,
    "baseAssArea": 0.15,
    "sameSizeStomp": true,
    "species": "Blue Jay",
    "footType": "avian",
    "jawType": "beak",
    "brutality": "3",
    "victimsHuman": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.08,
    "footWear": true,
    "footShoeEnabled": true,
    "footShoe": "sandal",
    "arousalEnabled": true,
    "edgeFactor": 3,
    "hasTail": true,
    "tailType": "Feathered",
    "baseTailLength": 0.8,
    "baseTailDiameter": 0.2,
    "tailStretchiness": 1,
    "tailVoreToStomach": true,
    "maleParts": true,
    "baseDickLength": 0.18,
    "dickType": "Avian",
    "dickStretchiness": 1,
    "cockDigestTime": 20,
    "cumScaleWithSize": true,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "breastStretchiness": 1,
    "baseAssStenchArea": 2,
    "baseScatStenchArea": 1.5,
    "belchEnabled": true,
    "soulVoreType": "release",
    "gooDigestion": true,
    "cropEnabled": true,
    "cropTransferTime": 30,
    "droolBaseVolume": 0.0001
  },
  {
    "version": 3,
    "name": "Famis",
    "scale": 155,
    "baseHeight": 1.52,
    "baseAssArea": 0.25,
    "sameSizeStomp": true,
    "difficulty": "1",
    "victimsHuman": true,
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "oralDigestTime": 30,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "analDigestTime": 30,
    "analVoreToStomach": true,
    "footWear": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "slinky",
    "tailMaw": true,
    "tailStretchiness": 50,
    "tailVoreToStomach": true,
    "maleParts": true,
    "dickStretchiness": 15,
    "cockDigestTime": 45,
    "cumScaleWithSize": true,
    "hasSheath": true,
    "maleMuskEnabled": true,
    "baseMaleMuskArea": 5,
    "vaginaStretchiness": 1,
    "breastStretchiness": 1,
    "stenchEnabled": true,
    "basePawStenchArea": 4,
    "baseAssStenchArea": 0,
    "basePissStenchArea": 0,
    "baseScatStenchArea": 0,
    "soulVoreEnabled": true,
    "soulDigestTime": 60,
    "gooEnabled": true,
    "gooDigestion": true,
    "gooDigestTime": 20,
    "pawVoreEnabled": true,
    "pawDigestTime": 45,
    "cropTransferTime": 15,
    "droolEnabled": true,
    "droolBaseVolume": 0.0001
  },
  {
    "version": 3,
    "name": "Goathias",
    "scale": 3,
    "species": "Goat",
    "footType": "hoof",
    "difficulty": "1",
    "brutality": "3",
    "victimsHuman": true,
    "victimsMilitary": true,
    "oralVore": true,
    "vomitEnabled": true,
    "analVore": true,
    "arousalEnabled": true,
    "maleParts": true,
    "cockVoreEnabled": true,
    "cumScaleWithSize": true,
    "maleMuskEnabled": true,
    "hasBreasts": true,
    "lactationEnabled": true,
    "breastVore": true,
    "milkScaleWithSize": true,
    "stenchEnabled": true,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "gasScaleWithSize": true,
    "pissEnabled": true,
    "bladderVore": true,
    "pissScaleWithSize": true,
    "scatEnabled": true,
    "scatScaleWithSize": true,
    "breathEnabled": true,
    "breathFoul": true,
    "droolEnabled": true,
    "magicEnabled": true
  },
  {
    "version": 3,
    "name": "Jaredin",
    "scale": 2,
    "baseHeight": 3.7,
    "baseMass": 907,
    "baseAssArea": 0.4,
    "species": "cybernetic armoured dragon",
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "footShoe": "trainer",
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "thick armour plated",
    "baseTailLength": 1.5,
    "baseTailDiameter": 0.5,
    "tailStretchiness": 1,
    "hasPouch": true,
    "maleParts": true,
    "baseDickLength": 1,
    "baseDickDiameter": 0.3,
    "dickType": "draconic",
    "baseBallDiameter": 0.08,
    "dickStretchiness": 1,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1,
    "baseAssStenchArea": 1,
    "belchEnabled": true,
    "soulVoreEnabled": true
  },
  {
    "version": 3,
    "name": "Kanosint",
    "baseHeight": 1.48,
    "baseMass": 54,
    "baseAssArea": 0.5,
    "species": "rakshasa",
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.15,
    "analVoreToStomach": true,
    "footWear": true,
    "footSockEnabled": true,
    "arousalEnabled": true,
    "arousalFactor": 0.8,
    "hasTail": true,
    "tailType": "serpentine",
    "baseTailLength": 1.5,
    "baseTailDiameter": 0.4,
    "tailStretchiness": 1,
    "maleParts": true,
    "baseDickLength": 0.2,
    "dickType": "feline",
    "baseBallDiameter": 0.04,
    "dickStretchiness": 0.8,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastStretchiness": 1,
    "stenchEnabled": true,
    "basePawStenchArea": 0.7,
    "baseAssStenchArea": 0.5,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "baseGasDigestFactor": 1.2,
    "gasScaleWithSize": true,
    "soulVoreEnabled": true,
    "pissEnabled": true,
    "bladderVore": true,
    "baseUrethraDiameter": 0.04,
    "urethraStretchiness": 0.8,
    "scatEnabled": true,
    "gooEnabled": true
  },
  {
    "version": 3,
    "name": "Kassy",
    "baseHeight": 1.7,
    "baseMass": 90,
    "baseAssArea": 0.25,
    "sameSizeStomp": true,
    "species": "Ram",
    "footType": "foot",
    "brutality": "3",
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "oralDigestTime": 25,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "analDigestTime": 20,
    "footWear": true,
    "footShoeEnabled": true,
    "footShoe": "sandal",
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "Wooly",
    "baseTailLength": 0.1,
    "tailStretchiness": 1,
    "tailVoreToStomach": true,
    "maleParts": true,
    "dickType": "Human",
    "dickStretchiness": 1,
    "cumScaleWithSize": true,
    "maleMuskEnabled": true,
    "baseMaleMuskArea": 0.1,
    "vaginaStretchiness": 1,
    "breastStretchiness": 1,
    "baseAssStenchArea": 2,
    "baseScatStenchArea": 1.5,
    "gasEnabled": true,
    "belchEnabled": true,
    "gasScaleWithSize": true,
    "soulVoreType": "release",
    "gooDigestion": true,
    "cropTransferTime": 15,
    "droolEnabled": true,
    "droolBaseVolume": 0.00001
  },
  {
    "version": 3,
    "name": "Mech",
    "baseHeight": 3.7,
    "baseMass": 500,
    "basePawLength": 0.8,
    "basePawWidth": 0.5,
    "baseHandLength": 0.4,
    "baseHandWidth": 0.2,
    "baseAssArea": 1,
    "species": "Dragon",
    "brutality": "2",
    "victimsHuman": true,
    "victimsMilitary": true,
    "victimsMacros": true,
    "oralVore": true,
    "oralDigestTime": 5,
    "analVore": true,
    "baseAnalVoreDiameter": 0.4,
    "analVoreToStomach": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "meaty",
    "baseTailLength": 2.5,
    "baseTailDiameter": 0.6,
    "maleParts": true,
    "baseDickLength": 0.9,
    "baseDickDiameter": 0.2,
    "dickType": "hefty",
    "baseBallDiameter": 0.19,
    "baseCumVolume": 2,
    "cockVoreEnabled": true,
    "cockDigestTime": 5,
    "baseScatDigestFactor": 0.3,
    "scatStorageScale": 1.5,
    "scatScaleWithSize": true,
    "magicEnabled": true
  },
  {
    "version": 3,
    "name": "Mekuto",
    "baseHeight": 1.778,
    "baseMass": 66,
    "baseAssArea": 0.25,
    "species": "wahsune",
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "analVoreToStomach": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailCount": 5,
    "tailType": "ravenous",
    "baseTailLength": 1.9,
    "baseTailDiameter": 0.15,
    "tailMaw": true,
    "maleParts": true,
    "baseDickLength": 0.15,
    "baseDickDiameter": 0.05,
    "baseBallDiameter": 0.03,
    "dickStretchiness": 3,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1
  },
  {
    "version": 3,
    "name": "Noma",
    "baseHeight": 8,
    "baseMass": 4800,
    "baseAssArea": 2,
    "sameSizeStomp": true,
    "species": "Lynxcoon",
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "baseAnalVoreDiameter": 0.1,
    "footWear": true,
    "footSockEnabled": true,
    "footShoeEnabled": true,
    "footShoe": "boot",
    "hasTail": true,
    "tailType": "fluffy coon ",
    "baseTailLength": 8,
    "baseTailDiameter": 2,
    "tailMaw": true,
    "tailStretchiness": 2,
    "tailVoreToStomach": true,
    "maleParts": true,
    "baseDickLength": 2,
    "baseDickDiameter": 0.5,
    "dickType": "feline",
    "baseBallDiameter": 2,
    "cumStorageScale": 2,
    "dickStretchiness": 1,
    "baseCumDigestFactor": 2,
    "cumScaleWithSize": true,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1,
    "baseAssStenchArea": 1,
    "baseScatStenchArea": 1.5,
    "gasEnabled": true,
    "belchEnabled": true,
    "gasStorageScale": 2,
    "gasScaleWithSize": true,
    "soulVoreEnabled": true,
    "gooEnabled": true,
    "gooDigestion": true,
    "pawVoreEnabled": true
  },
  {"version":3,"name":"Ona","scale":100,"baseHeight":3,"baseMass":125,"basePawLength":0.45,"basePawWidth":0.25,"baseHandLength":0.3,"baseHandWidth":0.2,"baseAssArea":0.5,"sameSizeStomp":true,"species":"Raven","footType":"avian","jawType":"beak","automaticGrowthEnabled":true,"biomes":true,"changingBiomes":true,"brutality":"3","victimsMilitary":true,"victimsMacros":true,"oralVore":true,"analVore":true,"footWear":true,"footShoeEnabled":true,"footShoe":"heel","arousalEnabled":true,"hasTail":true,"tailType":"Feathery","baseTailDiameter":0.5,"tailStretchiness":1,"baseCumVolume":0.1,"dickStretchiness":1,"hasSheath":true,"femaleParts":true,"baseVaginaLength":0.3,"baseVaginaWidth":0.15,"baseWombVolume":0.1,"femcumStorageScale":10,"unbirthEnabled":true,"vaginaStretchiness":2,"femcumScaleWithSize":true,"femaleMuskEnabled":true,"hasBreasts":true,"lactationEnabled":true,"breastVore":true,"breastStretchiness":1,"milkScaleWithSize":true,"baseAssStenchArea":1,"gasEnabled":true,"belchEnabled":true,"fartEnabled":true,"gasScaleWithSize":true,"soulVoreEnabled":true,"soulVoreType":"release","pissEnabled":true,"scatEnabled":true,"scatScaleWithSize":true,"cropEnabled":true,"breathEnabled":true,"breathSmoke":true,"droolBaseVolume":0.01,"magicEnabled":true,"hasWings":true,"baseWingWidth":2,"baseWingLength":4},
  {
    "version": 3,
    "name": "Rain Fallen",
    "scale": 54.22,
    "baseAssArea": 0.4,
    "sameSizeStomp": true,
    "species": "Wolf Demon",
    "brutality": "3",
    "victimsMilitary": true,
    "victimsMacros": true,
    "victimsMicros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "footSockEnabled": true,
    "footShoeEnabled": true,
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "Wolf",
    "baseTailLength": 1.8,
    "tailMaw": true,
    "tailStretchiness": 1,
    "maleParts": true,
    "baseDickLength": 0.4,
    "baseDickDiameter": 0.09,
    "baseBallDiameter": 0.12,
    "dickStretchiness": 1,
    "cumScaleWithSize": true,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastStretchiness": 1,
    "stenchEnabled": true,
    "baseAssStenchArea": 1,
    "gasEnabled": true,
    "belchEnabled": true,
    "fartEnabled": true,
    "gasScaleWithSize": true,
    "soulVoreEnabled": true
  },
  {
    "version": 3,
    "name": "Ralerin",
    "baseHeight": 2.2,
    "baseMass": 140,
    "baseAssArea": 0.4,
    "species": "pangolin",
    "victimsMilitary": true,
    "victimsMacros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "footWear": true,
    "footShoeEnabled": true,
    "footShoe": "sandal",
    "arousalEnabled": true,
    "hasTail": true,
    "tailType": "Scaled",
    "baseTailLength": 1.66,
    "baseTailDiameter": 0.33,
    "tailStretchiness": 1,
    "maleParts": true,
    "baseDickLength": 0.4,
    "baseDickDiameter": 0.12,
    "dickType": "pangolin",
    "baseBallDiameter": 0.09,
    "dickStretchiness": 1.1,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1,
    "baseAssStenchArea": 1,
    "belchEnabled": true,
    "soulVoreEnabled": true,
    "soulVoreType": "release",
    "bladderVore": true
  },
  {
    "version": 3,
    "name": "Vulpes",
    "baseHeight": 2,
    "baseMass": 73,
    "species": "fox",
    "brutality": "2",
    "victimsMacros": true,
    "oralVore": true,
    "analVore": true,
    "baseAnalVoreDiameter": 0.1,
    "analVoreToStomach": true,
    "arousalEnabled": true,
    "hasTail": true,
    "baseTailLength": 1.3,
    "tailStretchiness": 1,
    "maleParts": true,
    "baseDickLength": 0.25,
    "baseDickDiameter": 0.1,
    "dickType": "sheathed",
    "baseBallDiameter": 0.04,
    "dickStretchiness": 2,
    "hasSheath": true,
    "vaginaStretchiness": 1,
    "lactationEnabled": true,
    "breastVore": true,
    "breastStretchiness": 1,
    "soulVoreEnabled": true
  },
  {
    "version": 3,
    "name": "Cinnamon",
    "baseHeight": 1.25,
    "baseMass": 100,
    "baseAssArea": 1,
    "species": "Dragon",
    "automaticGrowth": true,
    "automaticGrowthEnabled": true,
    "basePreyGrowthFactor": 1,
    "growthScaleWithSize": true,
    "biomes": true,
    "changingBiomes": true,
    "defaultBiome": "Downtown",
    "ruralEnabled": false,
    "brutality": "3",
    "oralVore": true,
    "arousalEnabled": true,
    "maleParts": true,
    "baseDickLength": 1.25,
    "baseDickDiameter": 0.3,
    "dickType": "equine",
    "baseBallDiameter": 0.3,
    "baseCumVolume": 1892.71,
    "cockGrowthFactor": 1,
    "ballGrowthFactor": 1,
    "cockVoreEnabled": true,
    "dickStretchiness": 25,
    "cumScaleWithSize": true,
    "maleMuskEnabled": true,
    "baseMaleMuskArea": 1,
    "droolEnabled": true
  },
  {
    "version": 3,
    "name": "Rai",
    "scale": 1.65,
    "baseMass": 33,
    "basePawLength": 0.19,
    "basePawWidth": 0.19,
    "baseHandLength": 0.2,
    "baseHandWidth": 0.2,
    "baseAssArea": 1,
    "species": "Wolf",
    "victimsHuman": true,
    "victimsMilitary": true,
    "victimsMicros": true,
    "oralVore": true,
    "analVoreToStomach": true,
    "hasTail": true,
    "tailType": "Fluffy",
    "hasBreasts": true,
    "baseBreastDiameter": 0.12,
    "soulVoreEnabled": true,
    "soulVoreType": "oblivion",
    "breathEnabled": true,
    "breathElectric": true,
    "droolEnabled": true,
    "magicEnabled": true
  },
  {"version":3,"name":"Elbial","category": "neopuc", "priority": 4, "scale":200,"bio":"Delights in tormenting mortals, devilishly mischievous, very arrogant and cocky.","species":"hybrid demon","automaticGrowthEnabled":true,"brutality":"2","victimsMacros":true,"oralVore":true,"oralDigestTime":5,"oralDigestManual":true,"analVore":true,"analDigestTime":10,"analVoreToStomach":true,"arousalEnabled":true,"hasTail":true,"maleParts":true,"baseDickDiameter":0.06,"dickType":"demonic","baseBallDiameter":0.06,"cockVoreEnabled":true,"cockDigestTime":5,"cockDigestManual":true,"hasSheath":true,"sheathAbsorptionEnabled":true,"femaleParts":true,"unbirthEnabled":true,"unbirthDigestTime":5,"unbirthDigestManual":true,"sexualMagicEnabled":true,"hasBreasts":true,"lactationEnabled":true,"breastVore":true,"soulVoreEnabled":true,"magicEnabled":true},
  {"version":3,"name":"Mira","category": "neopuc", "priority": 4, "scale":5000,"bio":"Mira is a touch on the arrogant side and can be fairly greedy. She believes anything and anyone smaller than herself belongs to her. Considering she is a size shifter that can reach mind boggling proportions that means just about ever ything is smaller than herself and she lays claim to a significant portion of her universe.","species":"dragon","brutality":"2","victimsMilitary":true,"victimsMacros":true,"oralVore":true,"arousalEnabled":true,"hasTail":true,"tailType":"draconic","baseTailLength":2,"femaleParts":true,"hasBreasts":true,"hasWings":true,"wingDesc":"draconic"},
  {"version":3,"name":"Carmine","category": "neopuc", "priority": 3, "scale":28500,"bio":"Always smiling, but the smile hides a cruel personality. Never truly as happy as when he is tormenting those smaller than himself.","species":"otter","brutality":"3","victimsMilitary":true,"victimsMacros":true,"oralVore":true,"analVore":true,"footWear":true,"footShoeEnabled":true,"footShoe":"boot","arousalEnabled":true,"hasTail":true,"tailType":"rudder","baseTailLength":2.2,"maleParts":true,"cockVoreEnabled":true,"hasSheath":true,"sheathAbsorptionEnabled":true},
  {"version":3,"name":"Jennifer","category": "neopuc", "priority": 3, "scale":24.5,"bio":"Assertive in all things. She goes out and takes the things she likes, especially when they are people. Only feels the need to have a small select group of friends. Can be fairly uncaring towards the fate of little folk even though she does think they are cute.","species":"rat ifrit","footType":"foot","arousalEnabled":true,"hasTail":true,"tailType":"skinny","baseTailLength":2,"femaleParts":true,"unbirthEnabled":true,"hasBreasts":true,"magicEnabled":true},
  {"version":3,"name":"Porter","category": "neopuc", "priority": 2, "scale":1.58,"bio":"Devilishly charismatic, but secretly holds most people in contempt. Wildly in love Holly. Dominant Personality.","species":"Bernese mountain dog","brutality":"2","victimsMicros":true,"oralVore":true,"oralDigestManual":true,"arousalEnabled":true,"hasTail":true,"maleParts":true,"baseDickLength":0.35,"cockVoreEnabled":true,"cockDigestManual":true,"hasSheath":true,"sheathAbsorptionEnabled":true,"sexualMagicEnabled":true,"magicEnabled":true},
  {"version":3,"name":"Rat jeice","baseHeight":2,"baseMass":200,"basePawLength":0.5,"basePawWidth":0.27,"baseHandLength":0.19,"baseHandWidth":0.29,"baseAssArea":0.5,"species":"Rat","biomes":true,"changingBiomes":true,"brutality":"0","victimsHuman":true,"victimsMacros":true,"oralVore":true,"oralDigestAuto":false,"oralDigestTime":0,"oralDigestManual":true,"analVore":true,"baseAnalVoreDiameter":0.23,"analDigestAuto":false,"analDigestTime":0,"analDigestManual":true,"hasTail":true,"tailType":"sinewy hungry","baseTailLength":1.5,"baseTailDiameter":0.1,"tailMaw":true,"tailStretchiness":2,"tailDigestAuto":false,"tailDigestManual":true,"maleParts":true,"baseDickLength":0.4,"baseDickDiameter":0.2,"dickType":"meaty","baseBallDiameter":0.1,"baseCumVolume":0.004,"baseCumProduction":0.004,"cumStorageScale":10,"cockVoreEnabled":true,"dickStretchiness":4,"baseCumDigestFactor":0,"cockDigestAuto":false,"cockDigestTime":0,"cockDigestManual":true,"sheathAbsorptionEnabled":true,"hasForeskin":true,"gasEnabled":true,"belchEnabled":true,"fartEnabled":true,"gasStorageScale":7,"baseGasDigestFactor":7,"gasScaleWithSize":true,"gooEnabled":true,"gooDigestion":true,"gooGrowthFactor":0.3,"gooDigestAuto":false,"gooDigestTime":0,"gooDigestManual":true}
]