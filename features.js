options = [
  {
    "name": "Basics",
    "optional": false,
    "entries": [
      {
        "name": "Name",
        "id": "name",
        "type": "text"
      },
      {
        "name": "Species",
        "id": "species",
        "type": "text"
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
        "id": "baseWeight",
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
        "type": "checkbox",
        "id": "victims",
        "choices":
        [
          {
            "name": "Human prey",
            "value": "Human"
          },
          {
            "name": "Military",
            "value": "Military"
          },
          {
            "name": "Other macros",
            "value": "Macros"
          },
          {
            "name": "Micros",
            "value": "Micros"
          },
        ]
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
        "id": "analVore",
        "type": "checkbox",
        "choices":
        [
          {
            "name": "Anal vore goes to stomach",
            "value": "ToStomach"
          }
        ]
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
  }
];
