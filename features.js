options = [
  {
    "name": "Basics",
    "id": "basics",
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
    "id": "difficulty",
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
  }
];
