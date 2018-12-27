options = [
  {
    "name": "Basics",
    "optional": false,
    "entries": [
      {
        "name": "Name",
        "id": "name",
        "type": "text",
        "default": "Fen"
      },
      {
        "name": "Scale",
        "id": "scale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Height",
        "id": "baseHeight",
        "type": "float",
        "default": "2.26",
        "unit": "length"
      },
      {
        "name": "Weight",
        "id": "baseMass",
        "type": "float",
        "default": "135",
        "unit": "mass"
      },
      {
        "name": "Paw area",
        "id": "basePawArea",
        "type": "float",
        "default": "0.1",
        "unit": "area"
      },
      {
        "name": "Hand area",
        "id": "baseHandArea",
        "type": "float",
        "default": "0.1",
        "unit": "area"
      },
      {
        "name": "Ass area",
        "id": "baseAssArea",
        "type": "float",
        "default": "0.2",
        "unit": "area"
      },
      {
        "name": "Same-size stomping",
        "id": "sameSizeStomp",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Body Details",
    "optional": false,
    "entries":
    [
      {
        "name": "Species",
        "id": "species",
        "type": "text",
        "default": "crux"
      },
      {
        "name": "Foot type",
        "id": "footType",
        "type": "select",
        "choices":
        [
          {
            "name": "Paws",
            "value": "paw"
          },
          {
            "name": "Hooves",
            "value": "hoof"
          },
          {
            "name": "Feet",
            "value": "foot",
          },
          {
            "name": "Avian",
            "value": "avian"
          }
        ]
      },
      {
        "name": "Mouth type",
        "id": "jawType",
        "type": "select",
        "choices":
        [
          {
            "name": "Jaws",
            "value": "jaw"
          },
          {
            "name": "Beak",
            "value": "beak"
          }
        ]
      }
    ]
  },
  {
    "name": "Difficulty",
    "optional": false,
    "entries":
    [
      {
        "type": "radio",
        "id": "difficulty",
        "default": "0",
        "choices":
        [
          {
            "name": "Sandbox",
            "value": "0"
          },
          {
            "name": "Stompvival",
            "value": "1"
          }
        ]
      }
    ]
  },
  {
    "name": "Brutality",
    "optional": false,
    "entries":
    [
      {
        "type": "radio",
        "id": "brutality",
        "default": "1",
        "choices":
        [
          {
            "name": "Non-fatal",
            "value": "0"
          },
          {
            "name": "Fatal",
            "value": "1"
          },
          {
            "name": "Gory",
            "value": "2"
          },
          {
            "name": "Sadistic",
            "value": "3"
          },
        ]
      }
    ]
  },
  {
    "name": "Victims",
    "optional": false,
    "entries":
    [
      {
        "name": "Human prey",
        "id": "victimsHuman",
        "type": "checkbox"
      },
      {
        "name": "Military",
        "id": "victimsMilitary",
        "type": "checkbox"
      },
      {
        "name": "Macros",
        "id": "victimsMacros",
        "type": "checkbox"
      },
      {
        "name": "Micros",
        "id": "victimsMicros",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Oral Vore",
    "id": "oralVore",
    "optional": true,
    "entries":
    [
      {
        "name": "Digestion time",
        "id": "oralDigestTime",
        "type": "float",
        "default": "15"
      },
      {
        "name": "Same-size vore",
        "id": "sameSizeVore",
        "type": "checkbox"
      },
      {
        "name": "Vomiting",
        "id": "vomitEnabled",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Anal Vore",
    "id": "analVore",
    "optional": true,
    "entries":
    [
      {
        "name": "Anus diameter",
        "id": "baseAnalVoreDiameter",
        "type": "float",
        "default": "0.2",
        "unit": "length"
      },
      {
        "name": "Digestion time",
        "id": "analDigestTime",
        "type": "float",
        "default": "15"
      },
      {
        "name": "Anal vore goes to stomach",
        "id": "analVoreToStomach",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Footwear",
    "id": "footWear",
    "optional": true,
    "entries":
    [
      {
        "name": "Socks",
        "id": "footSockEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Sock type",
            "id": "footSock",
            "type": "select",
            "choices":
            [
              {
                "name": "Socks",
                "value": "sock"
              }
            ]
          }
        ]
      },
      {
        "name": "Shoes",
        "id": "footShoeEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Shoe type",
            "id": "footShoe",
            "type": "select",
            "choices":
            [
              {
                "name": "Shoes",
                "value": "shoe"
              },
              {
                "name": "Boots",
                "value": "boot"
              },
              {
                "name": "Trainers",
                "value": "trainer"
              },
              {
                "name": "Sandals",
                "value": "sandal"
              },
            ]
          }
        ]
      }
    ]
  },
  {
    "name": "Arousal",
    "id": "arousalEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Arousal multiplier",
        "id": "arousalFactor",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Edge multiplier",
        "id": "edgeFactor",
        "type": "float",
        "default": "1"
      }
    ]
  },
  {
    "name": "Tail",
    "id": "hasTail",
    "optional": true,
    "entries":
    [
      {
        "name": "Number of tails",
        "id": "tailCount",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Tail description",
        "id": "tailType",
        "type": "text",
        "default": "fluffy"
      },
      {
        "name": "Tail length",
        "id": "baseTailLength",
        "type": "float",
        "default": "1",
        "unit": "length"
      },
      {
        "name": "Tail diameter",
        "id": "baseTailDiameter",
        "type": "float",
        "default": "0.3",
        "unit": "length"
      },
      {
        "name": "Tail Vore",
        "id": "tailMaw",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Tail stretchiness",
            "id": "tailStretchiness",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Digestion time",
            "id": "tailDigestTime",
            "type": "float",
            "default": "15"
          },
          {
            "name": "Tail vore goes to stomach",
            "id": "tailVoreToStomach",
            "type": "checkbox"
          }
        ]
      }
    ]
  },
  {
    "name": "Pouch",
    "id": "hasPouch",
    "optional": true,
    "entries":
    [
      {
        "name": "Absorption",
        "id": "pouchAbsorption",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Male Genitals",
    "id": "maleParts",
    "optional": true,
    "entries":
    [
      {
        "name": "Cock length",
        "id": "baseDickLength",
        "type": "float",
        "default": "0.3",
        "unit": "length"
      },
      {
        "name": "Cock diameter",
        "id": "baseDickDiameter",
        "type": "float",
        "default": "0.08",
        "unit": "length"
      },
      {
        "name": "Cock stretchiness",
        "id": "dickStretchiness",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Cock description",
        "id": "dickType",
        "type": "text",
        "default": "canine"
      },
      {
        "name": "Ball diameter",
        "id": "baseBallDiameter",
        "type": "float",
        "default": "0.05",
        "unit": "length"
      },
      {
        "name": "Orgasm size",
        "id": "baseCumRatio",
        "type": "float",
        "default": "1",
      },
      {
        "name": "Passive cum production",
        "id": "cumScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Cum storage factor",
        "id": "cumStorageScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Cock Vore",
        "id": "cockVoreEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Cum digestion factor",
            "id": "baseCumDigestFactor",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Digestion time",
            "id": "cockDigestTime",
            "type": "float",
            "default": "15"
          }
        ]
      },
      {
        "name": "Sheath",
        "id": "hasSheath",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Absorption",
            "id": "sheathAbsorptionEnabled",
            "type": "checkbox"
          }
        ]
      },
      {
        "name": "Musk",
        "id": "maleMuskEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Musk factor",
            "id": "baseMaleMuskArea",
            "type": "float",
            "default": "0.5"
          }
        ]
      }
    ]
  },
  {
    "name": "Female Genitals",
    "id": "femaleParts",
    "optional": true,
    "entries":
    [
      {
        "name": "Slit length",
        "id": "baseVaginaLength",
        "type": "float",
        "default": "0.1",
        "unit": "length"
      },
      {
        "name": "Slit width",
        "id": "baseVaginaWidth",
        "type": "float",
        "default": "0.05",
        "unit": "length"
      },
      {
        "name": "Slit stretchiness",
        "id": "vaginaStretchiness",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Orgasm size",
        "id": "baseFemcumRatio",
        "type": "float",
        "default": "1",
      },
      {
        "name": "Passive femcum production",
        "id": "femcumScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Femcum storage factor",
        "id": "femcumStorageScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Unbirth",
        "id": "unbirthEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Femcum digestion factor",
            "id": "baseFemcumDigestFactor",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Digestion time",
            "id": "unbirthDigestTime",
            "type": "float",
            "default": "15"
          }
        ]
      },
      {
        "name": "Musk",
        "id": "femaleMuskEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Musk factor",
            "id": "baseFemaleMuskArea",
            "type": "float",
            "default": "0.5"
          }
        ]
      }
    ]
  },
  {
    "name": "Breasts",
    "id": "hasBreasts",
    "optional": true,
    "entries":
    [
      {
        "name": "Breast diameter",
        "id": "baseBreastDiameter",
        "type": "float",
        "default": "0.1",
        "unit": "length"
      },
      {
        "name": "Lactation",
        "id": "lactationEnabled",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Lactation scale",
            "id": "lactationFactor",
            "type": "float",
            "default": "0.25"
          },
          {
            "name": "Passive milk production",
            "id": "lactationScale",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Milk storage scale",
            "id": "milkStorageScale",
            "type": "float",
            "default": "1"
          }
        ]
      },
      {
        "name": "Breast Vore",
        "id": "breastVore",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Breast stretchiness",
            "id": "breastStretchiness",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Milk digestion scale",
            "id": "baseMilkDigestFactor",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Digestion time",
            "id": "breastDigestTime",
            "type": "float",
            "default": "15"
          }
        ]
      }
    ]
  },
  {
    "name": "Stench",
    "id": "stenchEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Paw stench scale",
        "id": "basePawStenchArea",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Ass stench scale",
        "id": "basePawStenchArea",
        "type": "float",
        "default": "1.5"
      },
      {
        "name": "Piss stench scale",
        "id": "basePawStenchArea",
        "type": "float",
        "default": "0.75"
      },
      {
        "name": "Scat stench scale",
        "id": "basePawStenchArea",
        "type": "float",
        "default": "3"
      },
    ]
  },
  {
    "name": "Gas",
    "id": "gasEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Belching",
        "id": "belchEnabled",
        "type": "checkbox"
      },
      {
        "name": "Farting",
        "id": "fartEnabled",
        "type": "checkbox"
      },
      {
        "name": "Passive gas production",
        "id": "gasScale",
        "type": "float",
        "default": "3"
      },
      {
        "name": "Gas storage scale",
        "id": "gasStorageScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Gas digestion factor",
        "id": "baseGasDigestFactor",
        "type": "float",
        "default": "1"
      }
    ]
  },
  {
    "name": "Soul Vore",
    "id": "soulVoreEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Digestion time",
        "id": "soulDigestTime",
        "type": "float",
        "default": "15"
      },
      {
        "type": "radio",
        "id": "soulVoreType",
        "default": "0",
        "choices":
        [
          {
            "name": "Released",
            "value": "release"
          },
          {
            "name": "Trapped",
            "value": "body"
          },
          {
            "name": "Digested",
            "value": "oblivion"
          }
        ]
      }
    ]
  },
  {
    "name": "Piss",
    "id": "pissEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Passive piss production",
        "id": "pissScale",
        "type": "float",
        "default": "0.3"
      },
      {
        "name": "Piss storage scale",
        "id": "pissStorageScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Bladder Vore",
        "id": "bladderVore",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Urethra diameter",
            "id": "baseUrethraDiameter",
            "type": "float",
            "default": "0.03",
            "unit": "length"
          },
          {
            "name": "Urethra stretchiness",
            "id": "urethraStretchiness",
            "type": "float",
            "default": "5"
          },
          {
            "name": "Piss digestion scale",
            "id": "basePissDigestFactor",
            "type": "float",
            "default": "1"
          },
          {
            "name": "Digestion time",
            "id": "bladderDigestTime",
            "type": "float",
            "default": "15"
          },
          {
            "name": "Scale piss with size",
            "id": "pissScaleWithSize",
            "type": "checkbox"
          }
        ]
      }
    ]
  },
  {
    "name": "Scat",
    "id": "scatEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Scat digestion scale",
        "id": "baseScatDigestFactor",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Passive scat production",
        "id": "scatScale",
        "type": "float",
        "default": "0.2"
      },
      {
        "name": "Scat storage scale",
        "id": "scatStorageScale",
        "type": "float",
        "default": "1"
      },
      {
        "name": "Scale scat with size",
        "id": "scatScaleWithSize",
        "type": "checkbox"
      }
    ]
  },
  {
    "name": "Goo",
    "id": "gooEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Digestion",
        "id": "gooDigestion",
        "type": "subcategory",
        "entries":
        [
          {
            "name": "Digestion time",
            "id": "gooDigestTime",
            "type": "float",
            "default": "15"
          }
        ]
      }
    ]
  },
  {
    "name": "Paw Vore",
    "id": "pawVoreEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Digestion time",
        "id": "pawDigestTime",
        "type": "float",
        "default": "15"
      }
    ]
  },
  {
    "name": "Crop",
    "id": "cropEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Transfer time",
        "id": "cropTransferTime",
        "type": "float",
        "default": "10"
      }
    ]
  },
  {
    "name": "Breath",
    "id": "breathEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Fire",
        "id": "breathFire",
        "type": "checkbox"
      },
      {
        "name": "Ice",
        "id": "breathIce",
        "type": "checkbox"
      },
      {
        "name": "Electric",
        "id": "breathElectric",
        "type": "checkbox"
      },
      {
        "name": "Smoke",
        "id": "breathSmoke",
        "type": "checkbox"
      },
      {
        "name": "Radiation",
        "id": "breathRadiation",
        "type": "checkbox"
      },
      {
        "name": "Foul",
        "id": "breathFoul",
        "type": "checkbox"
      },
    ]
  },
  {
    "name": "Drool",
    "id": "droolEnabled",
    "optional": true,
    "entries":
    [
      {
        "name": "Drool volume",
        "id": "droolBaseVolume",
        "type": "float",
        "default": "0.0001",
        "unit": "volume"
      }
    ]
  },
  {
    "name": "Magic",
    "id": "magicEnabled",
    "optional": true,
    "entries":
    [

    ]
  }
];
