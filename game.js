"use strict";

/*jshint browser: true*/
/*jshint devel: true*/

let version = "v1.1.2";

let errored = false;

window.onerror = function (msg, source, lineno, colno, error) { //opens a popup if the game encounters an error
  if (!errored) {
    errored = true;

    alert("An error occurred! Please press F12 to open the dev tools, then click the 'Console' tab and send any errors shown there to chemicalcrux\n\nScreenshotting the text and line number of the error would be great.\n\nAlso include the browser information that gets logged below it.\n\nThe error might also show up here: " + msg + " at " + lineno + "," + colno);

    console.log(navigator.userAgent);
  }
};
//generates initial conditions and sets up variables
let started = false;

const fillPeriod = 1000 / 60;

const strollingEnum = {
  Standing: 0,
  Strolling: 1,
  Jogging: 2,
  Running: 3
};

let strolling = strollingEnum.Standing;

let unit = "metric";

let numbers = "words";

let verbose = true;
let flat = false;

let text_verbosity = "verbose";

let autoVerbose = true;

const textFadeChoices = {
  stays: {
    name: "Text Stays",
    animation: "none",
    next: "dims"
  },
  dims: {
    name: "Text Dims",
    animation: "log-dim 15s linear",
    next: "fades"
  },
  fades: {
    name: "Text Fades",
    animation: "log-fade 20s linear",
    next: "stays"
  }
};

let textFade = textFadeChoices["stays"];


let newline = "&nbsp;";

let victims = {};

let macro = //macro controls every customizable part of the players body
{
  "shrunkPrey": null,
  "fastDigestFactor": 1,
  "fastDigestTimer": null,
  "pauseDigest": false,
  "walkSpeed": 1,

  "growthPoints": 0,

  "orgasm": false,
  "afterglow": false,

  "arousal": 0,
  "edge": 0,

  "maleSpurt": 0,
  "femaleSpurt": 0,

  "scale": 1,
  "pawScale": 1,
  "assScale": 1,
  "dickScale": 1,
  "ballScale": 1,
  "vaginaScale": 1,
  "wombScale": 1,
  "breastScale": 1,
  "tailScale": 1,
  "wingScale": 1,
  "muskScale": 1,
  "stenchScale": 1,

  "tailDensity": 1000,
  "dickDensity": 1000,
  "ballDensity": 1000,
  "breastDensity": 1000,
  "assDensity": 1000,  //this is only used for automatic growth function 
  "wombDensity": 1000, //this is only used for automatic growth function 
  "pawDensity": 1000, //this is only used for automatic growth function 

  "breathStyle": "cone",

  "scaling": function (value, scale, factor) { return value * Math.pow(scale, factor); },
  get height() { return this.scaling(this.baseHeight, this.scale, 1); },
  get mass() { return this.scaling(this.baseMass, this.scale, 3); },
  get pawLength() { return this.scaling(this.basePawLength * this.pawScale, this.scale, 1); },
  get pawWidth() { return this.scaling(this.basePawWidth * this.pawScale, this.scale, 1); },
  get pawArea() { return this.pawLength * this.pawWidth; },
  get analVoreArea() { return this.scaling(Math.pow(this.baseAnalVoreDiameter * this.assScale, 2), this.scale, 2); },
  get assArea() { return this.scaling(this.baseAssArea * this.assScale, this.scale, 2); },
  get handLength() { return this.scaling(this.baseHandLength, this.scale, 1); },
  get handWidth() { return this.scaling(this.baseHandWidth, this.scale, 1); },
  get handArea() { return this.handLength * this.handWidth },

  get wingLength() { return this.scaling(this.baseWingLength, this.scale * this.wingScale, 1); },
  get wingWidth() { return this.scaling(this.baseWingWidth, this.scale * this.wingScale, 1); },
  get wingArea() { return this.wingLength * this.wingWidth; },

  "footOnlyDesc": function (plural = false, capital = false) {
    let result = "";

    switch (this.footType) {
      case "paw":
        result = plural ? "paws" : "paw";
        break;
      case "hoof":
        result = plural ? "hooves" : "hoof";
        break;
      case "foot":
        result = plural ? "feet" : "foot";
        break;
      case "avian":
        result = plural ? "avian feet" : "avian foot";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "footDesc": function (plural = false, capital = false, possessive = false) {
    let result = "";
    if (!this.footWear) {
      return this.footOnlyDesc(plural, capital);
    }
    if (!this.footSockWorn && !this.footShoeWorn) {
      return this.footOnlyDesc(plural, capital);
    } else if (this.footShoeWorn) {
      switch (this.footShoe) {
        case "shoe":
          result = plural ? "shoes" : "shoe";
          break;
        case "boot":
          result = plural ? "boots" : "boot";
          break;
        case "trainer":
          result = plural ? "trainers" : "trainer";
          break;
        case "sandal":
          result = plural ? "sandals" : "sandal";
          break;
        case "heel":
          return plural ? "high heels" : "high heel";
          break;
        case "croc":
          return plural ? "crocs" : "croc";
          break;
      }
    } else if (this.footSockWorn) {
      switch (this.footSock) {
        case "sock":
          result = "socked " + this.footOnlyDesc(plural, false);
          break;
        case "stocking":
          result = "stocking-wrapped " + this.footOnlyDesc(plural, false);
          break;
      }
    }

    if (possessive) {
      result = " your " + result;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "toeNoShoeDesc": function (plural = false, capital = false) {
    let result = "";

    if (!this.footSockWorn) {
      return this.toeOnlyDesc(plural, capital);
    } else if (this.footSockWorn) {
      switch (this.footSock) {
        case "sock":
          result = "socked " + this.toeOnlyDesc(plural, false);
      }
    }

    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "toeOnlyDesc": function (plural = false, capital = false) {
    let result = "";

    switch (this.footType) {
      case "paw":
        result = plural ? "toes" : "toe";
        break;
      case "hoof":
        result = plural ? "hooves" : "hoof";
        break;
      case "foot":
        result = plural ? "toes" : "toe";
        break;
      case "avian":
        result = plural ? "talons" : "talon";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "toeDesc": function (plural = false, capital = false, possessive = false) {
    let result = "";
    if (!this.footWear) {
      return this.toeOnlyDesc(plural, capital);
    }
    if (!this.footSockWorn && !this.footShoeWorn) {
      return this.toeOnlyDesc(plural, capital);
    } else if (this.footShoeWorn) {
      switch (this.footShoe) {
        case "shoe":
          result = plural ? "treads" : "tread";
          break;
        case "boot":
          result = plural ? "treads" : "tread";
          break;
        case "trainer":
          result = plural ? "treads" : "tread";
          break;
        case "sandal":
          result = plural ? "treads" : "tread";
          break;
        case "heel":
          return plural ? "treads" : "tread";
          break;
        case "croc":
          return plural ? "treads" : "tread";
          break;
      }
    } else if (this.footSockWorn) {
      switch (this.footSock) {
        case "sock":
          result = "socked " + this.toeOnlyDesc(plural, false);
          break;
        case "stocking":
          result = "stocking-wrapped " + this.footOnlyDesc(plural, false);
          break;
      }
    }

    if (possessive) {
      result = "your " + result;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "soleNoShoeDesc": function (plural = false, capital = false) {
    let result = "";

    if (!this.footSockWorn) {
      return this.soleOnlyDesc(plural, capital);
    } else if (this.footSockWorn) {
      switch (this.footSock) {
        case "sock":
          result = "socked " + this.soleOnlyDesc(plural, false);
      }
    }

    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "soleOnlyDesc": function (plural = false, capital = false) {
    let result = "";

    switch (this.footType) {
      case "paw":
        result = plural ? "pads" : "pads";
        break;
      case "hoof":
        result = plural ? pickString("frogs", "soles") : pickString("frog", "sole");
        break;
      case "foot":
        result = plural ? "soles" : "sole";
        break;
      case "avian":
        result = plural ? "pads" : "pads";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "soleDesc": function (plural = false, capital = false, possessive = false) {
    let result = "";
    if (!this.footWear) {
      return this.soleOnlyDesc(plural, capital);
    }
    if (!this.footSockWorn && !this.footShoeWorn) {
      return this.soleOnlyDesc(plural, capital);
    } else if (this.footShoeWorn) {
      switch (this.footShoe) {
        case "shoe":
          result = plural ? "heels" : "heel";
          break;
        case "boot":
          result = plural ? "heels" : "heel";
          break;
        case "trainer":
          result = plural ? "heels" : "heel";
          break;
        case "sandal":
          result = plural ? "heels" : "heel";
          break;
        case "heel":
          return plural ? "soles" : "sole";
          break;
        case "croc":
          return plural ? "heels" : "heel";
          break;
      }
    } else if (this.footSockWorn) {
      switch (this.footSock) {
        case "sock":
          result = "socked " + this.soleOnlyDesc(plural, false);
          break;
        case "stocking":
          result = "stocking-wrapped " + this.soleOnlyDesc(plural, false);
          break;
      }
    }

    if (possessive) {
      result = "your " + result;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "shoeDesc": function (plural, capital) {
    let result = "";
    switch (this.footShoe) {
      case "shoe":
        result = plural ? "shoes" : "shoe";
        break;
      case "boot":
        result = plural ? "boots" : "boot";
        break;
      case "trainer":
        result = plural ? "trainers" : "trainer";
        break;
      case "sandal":
        result = plural ? "sandals" : "sandal";
        break;
      case "heel":
        return plural ? "high heels" : "high heel";
        break;
      case "croc":
        return plural ? "crocs" : "croc";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "sockDesc": function (plural, capital) {
    let result = "";
    switch (this.footSock) {
      case "sock":
        result = plural ? "socks" : "sock";
        break;
      case "stocking":
        result = plural ? "stockings" : "stocking";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "jawDesc": function (plural = false, capital = false) {
    let result = "";
    switch (this.jawType) {
      case "jaw":
        result = plural ? "jaws" : "jaw";
        break;
      case "beak":
        result = "beak";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  "biteDesc": function (plural = false, capital = false) {
    let result = "";

    switch (this.jawType) {
      case "jaw":
        result = plural ? "crushes" : "crush";
        break;
      case "beak":
        result = plural ? "slices" : "slice";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },
  "teethDesc": function (plural = false, capital = false) {
    let result = "";

    switch (this.jawType) {
      case "jaw":
        result = plural ? "fangs" : "fang";
        break;
      case "beak":
        result = "beak";
        break;
    }
    return capital ? result.charAt(0).toUpperCase() + result.slice(1) : result;
  },

  get preyGrowthFactor() {
    if (macro.growthScaleWithSize) {
      return this.basePreyGrowthFactor * Math.pow(this.scale, 1);
      //this breaks once you get to the size of a planet
    } else {
      return this.basePreyGrowthFactor;
    }
  },
  get tailLength() {
    return this.scaling(this.baseTailLength * this.tailScale, this.scale, 1);
  },
  get tailDiameter() {
    return this.scaling(this.baseTailDiameter * this.tailScale, this.scale, 1);
  },
  get tailStretchDiameter() {
    return this.scaling(this.tailStretchiness * this.baseTailDiameter * this.tailScale, this.scale, 1);
  },
  get tailGirth() {
    return Math.pow(this.tailDiameter / 2, 2) * Math.PI;
  },
  get tailStretchGirth() {
    return Math.pow(this.tailStretchDiameter / 2, 2) * Math.PI;
  },
  get tailArea() {
    return this.tailLength * this.tailDiameter;
  },
  get tailVolume() {
    return this.tailGirth * this.tailLength;
  },
  get tailMass() {
    return this.tailVolume * this.tailDensity;
  },
  get tailDesc() {
    return this.tailType + " " + (this.tailCount > 1 ? "tails" : "tail");
  },
  get tailNoDesc() {
    return (this.tailCount > 1 ? "tails" : "tail");
  },
  get arousalDickFactor() {
    //this scales the size of the dick based on arousal, and is not directly related to arousalFactor(multiplier on arousal you gain from actions)
    let factor = 1;
    if (!this.arousalEnabled || this.arousal < 25) {
      factor = 0.5;
    } else if (this.arousal < 75) {
      factor = 0.5 + (this.arousal - 25) / 100;
    }
    return factor;
  },
  get dickLength() {
    return this.scaling(this.baseDickLength * this.dickScale * this.arousalDickFactor, this.scale, 1);
  },
  get dickDiameter() {
    return this.scaling(this.baseDickDiameter * this.dickScale * this.arousalDickFactor, this.scale, 1);
  },
  get dickGirth() {
    return Math.pow((this.dickDiameter / 2), 2) * Math.PI;
  },
  get dickStretchGirth() {
    return this.dickGirth * this.dickStretchiness * this.dickStretchiness;
  },
  get dickArea() {
    return this.dickLength * this.dickDiameter * Math.PI / 2;
  },
  get dickVolume() {
    return this.dickLength * Math.pow(this.dickDiameter / 2, 2) * Math.PI;
  },
  get dickMass() {
    return this.dickVolume * this.dickDensity;
  },


  get ballDiameter() { return this.scaling(this.baseBallDiameter * this.ballScale, this.scale, 1); },
  get ballArea() { return 2 * Math.PI * Math.pow(this.ballDiameter / 2, 2); },
  get ballVolume() {
    let radius = this.ballDiameter / 2;
    return 4 / 3 * Math.PI * Math.pow(radius, 3);
  },
  get ballMass() {
    let volume = this.ballVolume;
    return volume * this.ballDensity;
  },

  get cumVolume() {
    let vol = this.scaling(this.baseCumVolume / 1000, this.scale, 3);
    return this.scaling(vol, this.dickScale, 2);
  },

  get vaginaLength() { return this.scaling(this.baseVaginaLength * this.vaginaScale, this.scale, 1); },
  get vaginaWidth() { return this.scaling(this.baseVaginaWidth * this.vaginaScale, this.scale, 1); },
  get vaginaArea() { return this.vaginaLength * this.vaginaWidth; },
  get vaginaStretchArea() { return this.vaginaStretchiness * this.vaginaStretchiness * this.vaginaLength * this.vaginaWidth; },
  // this isn't how biology works but I'll leave it in

  get vaginaVolume() { return this.vaginaArea * this.vaginaWidth; },

  get wombVolume() { return this.scaling(this.baseWombVolume, this.wombScale * this.scale, 3); },

  get femcumVolume() {
    let vol = this.scaling(this.baseFemcumVolume / 1000, this.scale, 3);
    return this.scaling(vol, this.vaginaScale, 2);
  },

  get lactationVolume() {
    return this.milkStorage.limit * this.lactationFactor;
  },


  get breastDiameter() { return this.scaling(this.baseBreastDiameter * this.breastScale, this.scale, 1); },
  get breastStretchDiameter() { return this.scaling(this.breastStretchiness * this.baseBreastDiameter * this.breastScale, this.scale, 1); },
  get breastArea() {
    return 2 * Math.PI * Math.pow(this.breastDiameter / 2, 2);
  },
  get breastStretchArea() {
    return 2 * Math.PI * Math.pow(this.breastStretchDiameter / 2, 2);
  },
  get breastVolume() {
    let radius = this.breastDiameter / 2;
    return 4 / 3 * Math.PI * Math.pow(radius, 3);
  },
  get breastMass() {
    let volume = this.breastVolume;
    return volume * this.breastDensity;
  },

  get droolVolume() {
    return this.scaling(this.droolBaseVolume / 1000, this.scale, 3);
  },

  "digest": function (owner, organ, time = 15, auto = true) {

    // we now have an explicit no-auto-digest flag, but
    // some saves will wind up a time of 0 anyway, so I'll
    // just leave this here to keep that from breaking things
    if (auto && time != 0) {
      setTimeout(function () { owner.digest(owner, organ, time); }, time * 1000 / organ.stages / macro.fastDigestFactor);
    }

    if (macro.pauseDigest) {
      return;
    }

    let count = Math.min(organ.contents.length, organ.maxDigest);

    let container = organ.contents.pop();
    organ.contents.unshift(new Container());

    if (container.count == 0)
      return;

    do_digestion(owner, organ, container);

  },

  get scatDigestFactor() {
    if (this.scatScaleWithSize) {
      return this.baseScatDigestFactor * this.scale;
    } else {
      return this.baseScatDigestFactor;
    }
  },

  "stomach": {
    "name": "stomach",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.oralDigestTime, owner.oralDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container) {
      return describe("stomach", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {
      if (owner.gasEnabled)
        owner.gasStorage.amount += container.sum_property("mass") * owner.gasDigestFactor / 1e4;
      if (owner.scatEnabled) {
        owner.scatStorage.amount += container.sum_property("mass") * owner.scatDigestFactor / 1e3;
        owner.scatStorage.victims = owner.scatStorage.victims.merge(container);
      }
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your belly is flat, growling and gurgling for want of prey.";
      } else {
        if (macro.brutality > 0) {
          return "Your belly churns and bubbles as it works to melt " + prey.describeSimple(verbose || flat) + " down to chyme.";
        } else {
          return "Your belly sloshes with the weight of " + prey.describeSimple(verbose || flat) + " trapped within.";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  "tail": {
    "name": "tail",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.tailDigestTime, owner.tailDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeMove": function (container) {
      return describe("tail-to-stomach", container, this.owner, verbose, flat);
    },
    "describeDigestion": function (container) {
      return describe("tail", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {
      if (owner.gasEnabled)
        owner.gasStorage.amount += container.sum_property("mass") * owner.gasDigestFactor / 1e3;
      if (owner.scatEnabled) {
        owner.scatStorage.amount += container.sum_property("mass") * owner.scatDigestFactor / 1e3;
        owner.scatStorage.victims = owner.scatStorage.victims.merge(container);
      }
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your " + this.owner.tailDesc + " " + (this.owner.tailCount > 1 ? "are" : "is") + " empty.";
      } else {
        if (this.owner.tailVoreToStomach) {
          return "Your " + this.owner.tailDesc + " " + (this.owner.tailCount > 1 ? "clench and squeeze around " : "clenches and squeezes around ") + prey.describeSimple(verbose || flat) + ", working them deeper and deeper inside.";
        }
        else if (macro.brutality > 0) {
          return "Your " + this.owner.tailDesc + " " + (this.owner.tailCount > 1 ? "groans" : "groan") + " ominously as " + (this.owner.tailCount > 1 ? "they gurgle" : "it gurgles") + " around " + prey.describeSimple(verbose || flat) + ", slowly absorbing them into your musky depths.";
        } else {
          return "Your " + this.owner.tailDesc + " " + (this.owner.tailCount > 1 ? "bulge" : "bulges") + " with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  "bowels": {
    "name": "bowels",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.analDigestTime, owner.analDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeMove": function (container) {
      return describe("bowels-to-stomach", container, this.owner, verbose, flat);
    },
    "describeDigestion": function (container) {
      return describe("bowels", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {
      if (owner.gasEnabled)
        owner.gasStorage.amount += container.sum_property("mass") * owner.gasDigestFactor / 1e3;
      if (owner.scatEnabled) {
        owner.scatStorage.amount += container.sum_property("mass") * owner.scatDigestFactor / 1e3;
        owner.scatStorage.victims = owner.scatStorage.victims.merge(container);
      }
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your bowels are empty.";
      } else {
        if (macro.brutality > 0) {
          return "Your bowels groan ominously as they clench around " + prey.describeSimple(verbose || flat) + ", slowly absorbing them into your musky depths.";
        } else {
          return "Your bowels bulge with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  get femcumDigestFactor() {
    if (this.femcumScaleWithSize) {
      return this.baseFemcumDigestFactor * this.scale;
    } else {
      return this.baseFemcumDigestFactor;
    }
  },

  "womb": {
    "name": "womb",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.unbirthDigestTime, owner.unbirthDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container, vol) {
      return describe("womb", container, this.owner, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
    },
    "fill": function (owner, container) {
      let amount = container.sum_property("mass") * owner.femcumDigestFactor / 1e3;
      owner.femcumStorage.amount += amount;
      return amount;
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your lower belly is flat.";
      } else {
        if (macro.brutality > 0) {
          return "Your womb tingles as its rhythmically grinds down on " + prey.describeSimple(verbose || flat) + ", turning them soft and wet as they start to dissolve into femcum.";
        } else {
          return "Your womb clenches around " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  get cumDigestFactor() {
    if (this.cumScaleWithSize) {
      return this.baseCumDigestFactor * this.scale;
    } else {
      return this.baseCumDigestFactor;
    }
  },

  "balls": {
    "name": "balls",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.cockDigestTime, owner.cockDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container, vol) {
      return describe("balls", container, this.owner, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
    },
    "fill": function (owner, container) {
      let amount = container.sum_property("mass") * owner.cumDigestFactor / 1e3;
      owner.cumStorage.amount += amount;
      return amount;
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your balls are smooth.";
      } else {
        if (macro.brutality > 0) {
          return "Your balls slosh and bulge as they work to convert " + prey.describeSimple(verbose || flat) + " into hot cum.";
        } else {
          return "Your balls slosh about, loaded down with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  get milkDigestFactor() {
    if (this.milkScaleWithSize) {
      return this.baseMilkDigestFactor * this.scale;
    } else {
      return this.baseMilkDigestFactor;
    }
  },

  "breasts": {
    "name": "breasts",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.breastDigestTime, owner.breastDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container, vol) {
      return describe("breasts", container, this.owner, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
    },
    "fill": function (owner, container) {
      if (macro.lactationEnabled) {
        let amount = container.sum_property("mass") * owner.milkDigestFactor / 1e3;
        owner.milkStorage.amount += amount;
        return amount;
      }
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your breasts are smooth.";
      } else {
        if (macro.brutality > 0) {
          return "Your breasts slosh from side to side, " + prey.describeSimple(verbose || flat) + " slowly digesting into creamy milk.";
        } else {
          return "Your breasts bulge with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },
  get pissDigestFactor() {
    if (this.pissScaleWithSize) {
      return this.basePissDigestFactor * this.scale;
    } else {
      return this.basePissDigestFactor;
    }
  },

  "bladder": {
    "name": "bladder",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.bladderDigestTime, owner.bladderDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container, vol) {
      return describe("bladder", container, this.owner, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
    },
    "fill": function (owner, container) {
      let amount = container.sum_property("mass") * owner.pissDigestFactor / 1e3;
      owner.pissStorage.amount += amount;
      return amount;
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your bladder has nobody in it.";
      } else {
        if (macro.brutality > 0) {
          return "Your bladder bulges, " + prey.describeSimple(verbose || flat) + " dissolving in your acrid piss.";
        } else {
          return "Your bladder bulges with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  "souls": {
    "name": "souls",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.soulDigestTime, owner.soulDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      if (get_living_prey(prey.sum()) > 0)
        this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container) {
      return describe("soul-digest", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {
      add_victim_people("soul-digest", container);
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      let souls = get_living_prey(prey.sum());

      if (souls == 0) {
        return "Your depths hold no souls.";
      } else {
        if (macro.brutality > 0) {
          return "Your depths bubble and boil with energy, slowly digesting " + (souls > 1 ? souls + " souls." : "a lonely soul");
        } else {
          return "You feel " + (souls > 1 ? souls + " souls " : "a soul ") + "trapped in your depths.";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  "goo": {
    "name": "goo",
    "setup": function (owner) {
      this.owner = owner;

      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());

      if (owner.gooDigestion) {
        owner.digest(owner, this, owner.gooDigestTime, owner.gooDigestAuto);
      }

    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container) {
      add_victim_people("goo", container);
      return describe("goo-digest", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {

    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "You contain no prey.";
      } else {
        if (macro.gooDigestion) {
          return "Your gooey body contains " + prey.describeSimple(verbose || flat) + ", gradually absorbing them into your bulk.";
        } else {
          return "Your gooey body contains " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  get breathArea() { return this.scaling(this.baseBreathArea, this.scale, 2); },

  "pawsVore": {
    "name": "paws",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.pawDigestTime, owner.pawDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container) {
      return describe("paws", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {

    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your " + this.owner.footOnlyDesc(true) + " don't contain any prey.";
      } else {
        return "Your " + this.owner.footOnlyDesc(true) + " have enveloped " + prey.describeSimple(verbose || flat);
      }
    },
    "contents": [],
    "stages": 3
  },

  "crop": {
    "name": "crop",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.cropTransferTime, owner.cropTransferAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeDigestion": function (container) {
      return describe("crop-transfer", container, this.owner, verbose, flat);
    },
    "describeMove": function (container) {
      return describe("crop-transfer", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {

    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your crop don't contain any prey.";
      } else {
        return "Your crop bulges with " + prey.describeSimple(verbose || flat) + ".";
      }
    },
    "contents": [],
    "stages": 3
  },

  "wings": {
    "name": "wings",
    "setup": function (owner) {
      this.owner = owner;
      for (let i = 0; i < this.stages; i++)
        this.contents.push(new Container());
      owner.digest(owner, this, owner.wingDigestTime, owner.wingDigestAuto);
    },
    "feed": function (prey) {
      this.feedFunc(prey, this, this.owner);
    },
    "feedFunc": function (prey, self, owner) {
      this.contents[0] = this.contents[0].merge(prey);
    },
    "describeMove": function (container) {
      return describe("wings-to-stomach", container, this.owner, verbose, flat);
    },
    "describeDigestion": function (container) {
      return describe("wings", container, this.owner, verbose, flat);
    },
    "fill": function (owner, container) {
      // no-op
    },
    get description() {
      let prey = new Container();
      this.contents.forEach(function (x) {
        prey = prey.merge(x);
      });

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (prey.count == 0) {
        return "Your don't have anyone trapped in your " + macro.wingDesc + " wings.";
      } else {
        if (macro.brutality > 0) {
          return "Your " + macro.wingDesc + " wings bulge as they squeeze in on " + prey.describeSimple(verbose || flat) + ", slowly breaking them down.";
        } else {
          return "Your " + macro.wingDesc + " wings bulge with " + prey.describeSimple(verbose || flat) + ".";
        }
      }
    },
    "contents": [],
    "stages": 3
  },

  // holding spots

  "pouch": {
    "name": "pouch",
    "container": new Container(),
    get description() {
      let prey = this.container;

      if (verbose || flat) {
        prey = flatten(prey);
      }

      if (this.container.count == 0)
        return "Your pouch is empty";
      else
        return "Your pouch contains " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "sheath": {
    "name": "sheath",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "Your sheath is empty";
      else
        return "Your sheath contains " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "foreskin": {
    "name": "foreskin",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "Your foreskin is wrapped tightly around your shaft.";
      else
        return "Your foreskin bulges with " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "cleavage": {
    "name": "cleavage",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "Your breasts don't have anyone stuck between them";
      else
        return "Your cleavage contains " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "shoeTrapped": new Container(),
  "sockTrapped": new Container(),

  "shoe": {
    "name": "shoe",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "Your " + macro.shoeDesc(true) + " are empty.";
      else
        return "Your " + macro.shoeDesc(true) + " contain " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "sock": {
    "name": "sock",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "Your " + macro.sockDesc(true) + " are empty.";
      else
        return "Your " + macro.sockDesc(true) + " contain " + this.container.describeSimple(verbose || flat);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "paws": {
    "name": "paws",
    "container": new Container(),
    get description() {
      if (this.container.count == 0)
        return "You don't have anyone stuck between your " + this.owner.toeDesc(true);
      else
        return "You have " + this.container.describeSimple(verbose || flat) + " wedged between your " + this.owner.toeDesc(true);
    },
    "add": function (victims) {
      this.container = this.container.merge(victims);
    }
  },

  "init": function () {
    this.stomach.setup(this);
    this.bowels.setup(this);
    this.tail.setup(this);
    this.womb.setup(this);
    this.balls.setup(this);
    this.breasts.setup(this);
    this.bladder.setup(this);
    this.souls.setup(this);
    this.goo.setup(this);
    this.pawsVore.setup(this);
    this.crop.setup(this);
    this.wings.setup(this);
    this.cumStorage.owner = this;
    this.femcumStorage.owner = this;
    this.milkStorage.owner = this;
    this.gasStorage.owner = this;
    this.pissStorage.owner = this;
    this.scatStorage.owner = this;

    this.paws.owner = this;

    if (this.analVoreToStomach) {
      this.bowels.moves = this.stomach;
    }

    if (this.tailVoreToStomach) {
      this.tail.moves = this.stomach;
    }

    if (this.wingVoreToStomach) {
      this.wings.moves = this.stomach;
    }

    this.crop.moves = this.stomach;

    if (this.maleParts)
      this.fillCum(this);
    if (this.femaleParts)
      this.fillFemcum(this);
    if (this.lactationEnabled && this.hasBreasts)
      this.fillBreasts(this);

    this.quenchExcess(this);

    if (this.gasEnabled)
      this.fillGas(this);
    if (this.pissEnabled)
      this.fillPiss(this);
    if (this.scatEnabled)
      this.fillScat(this);
  },

  "fillCum": function (self) {
    self.cumStorage.amount += self.cumStorage.limit * self.baseCumProduction * fillPeriod / 1000;
    if (self.cumStorage.amount > self.cumStorage.limit)
      self.arouse(1 * (self.cumStorage.amount / self.cumStorage.limit - 1));
    setTimeout(function () { self.fillCum(self); }, fillPeriod);
  },

  "fillFemcum": function (self) {
    self.femcumStorage.amount += self.femcumStorage.limit * self.baseFemcumProduction * fillPeriod / 1000;
    if (self.femcumStorage.amount > self.femcumStorage.limit)
      self.arouse(1 * (self.femcumStorage.amount / self.femcumStorage.limit - 1));
    setTimeout(function () { self.fillFemcum(self); }, fillPeriod);
  },

  "fillBreasts": function (self) {
    self.milkStorage.amount += self.milkStorage.limit * self.baseLactationProduction * fillPeriod / 1000;

    if (self.milkStorage.amount > self.milkStorage.limit) {
      breast_milk(self.milkStorage.amount - self.milkStorage.limit / 2);
    }

    if (self.milkStorage.amount > self.milkStorage.limit) {
      self.milkStorage.amount = self.milkStorage.limit;
    }
    setTimeout(function () { self.fillBreasts(self); }, fillPeriod);
  },

  "fillGas": function (self) {
    self.gasStorage.amount += self.gasStorage.limit * self.baseGasProduction * fillPeriod / 1000;

    let ratio = self.gasStorage.amount / self.gasStorage.limit;

    if (ratio > 1 && Math.random() * 100 < ratio || ratio > 2) {
      let amount = self.gasStorage.amount - self.gasStorage.limit * 3 / 4;
      if (self.belchEnabled && self.fartEnabled) {
        if (Math.random() < 0.5)
          belch(amount, false);
        else
          fart(amount, false);
      } else if (self.belchEnabled) {
        belch(amount, false);
      } else if (self.fartEnabled) {
        fart(amount, false);
      }

    }
    setTimeout(function () { self.fillGas(self); }, fillPeriod);
  },

  get urethraDiameter() {
    return this.scaling(this.baseUrethraDiameter, this.scale, 1);
  },
  get urethraStretchDiameter() {
    return this.urethraDiameter * this.urethraStretchiness;
  },
  get urethraStretchArea() {
    return (this.urethraStretchDiameter * this.urethraStretchDiameter / 4) * Math.PI;
  },

  "fillPiss": function (self) {
    self.pissStorage.amount += self.pissStorage.limit * self.basePissProduction * fillPeriod / 1000;

    if (self.pissStorage.amount > self.pissStorage.limit * 2)
      piss(self.pissStorage.amount, false);
    setTimeout(function () { self.fillPiss(self); }, fillPeriod);
  },

  "fillScat": function (self) {
    self.scatStorage.amount += self.scatStorage.limit * self.baseScatProduction * fillPeriod / 1000;

    if (self.scatStorage.amount > self.scatStorage.limit * 2)
      scat(self.scatStorage.amount, false);
    setTimeout(function () { self.fillScat(self); }, fillPeriod);
  },

  "cumStorage": {
    "amount": 0,
    get limit() {
      return this.owner.ballVolume * this.owner.cumStorageScale * 2;
    }
  },

  "femcumStorage": {
    "amount": 0,
    get limit() {
      return this.owner.wombVolume * this.owner.femcumStorageScale;
    }
  },

  "milkStorage": {
    "amount": 0,
    get limit() {
      return this.owner.breastVolume * 2 * this.owner.milkStorageScale;
    }
  },

  "gasStorage": {
    "amount": 0,
    get limit() {
      return Math.pow(this.owner.scale, 3) / 1000 * this.owner.gasStorageScale;
    }
  },

  "pissStorage": {
    "amount": 0,
    get limit() {
      return Math.pow(this.owner.scale, 3) / 5000 * this.owner.pissStorageScale;
    }
  },

  "scatStorage": {
    "amount": 0,
    "victims": new Container(),
    get limit() {
      return Math.pow(this.owner.scale, 3) / 1000 * this.owner.scatStorageScale;
    }
  },

  get pawStenchArea() {
    return this.pawArea * this.basePawStenchArea * this.stenchScale;
  },

  get assStenchArea() {
    return this.assArea * this.baseAssStenchArea * this.stenchScale;
  },

  get gasDigestFactor() {
    if (this.gasScaleWithSize) {
      return this.baseGasDigestFactor * this.scale;
    } else {
      return this.baseGasDigestFactor;
    }
  },

  "arouse": function (amount) {
    if (!this.arousalEnabled)
      return;

    if (this.afterglow)
      return;

    if (this.orgasm)
      amount /= 5;

    this.arousal += amount * this.arousalFactor;

    if (this.arousal >= 200) {
      this.arousal = 200;

      if (!this.orgasm) {
        this.orgasm = true;
        update(["You shudder as ecstasy races up your spine", newline], false);
        if (this.maleParts) {
          this.maleOrgasm(this);
          if (this.sheath.container.count > 0)
            sheath_crush();
          if (this.foreskin.container.count > 0)
            foreskin_crush();
        }
        if (this.femaleParts) {
          this.femaleOrgasm(this);
        }
        if (!this.maleParts && !this.femaleParts) {
          this.nullOrgasm(this);
        }
      }
    }
  },

  "quench": function (amount) {
    if (!this.arousalEnabled)
      return;

    this.arousal -= amount;

    if (this.arousal <= 100) {
      if (this.orgasm) {
        this.orgasm = false;
        this.afterglow = true;
      }
    }

    if (this.arousal < 0) {
      this.arousal = 0;
      this.afterglow = false;
    }
  },

  "quenchExcess": function (self) {
    if (self.arousalEnabled) {
      if (self.arousal > 100 && !self.orgasm) {
        self.arousal = Math.max(100, self.arousal - 1);
        self.edge += Math.sqrt((self.arousal - 100)) / 500 * macro.edgeFactor;
        self.edge = Math.min(1, self.edge);

        if (self.maleParts)
          self.maleSpurt += ((self.arousal - 100) / 100 + Math.random()) / 25 * (self.edge);
        if (self.femaleParts)
          self.femaleSpurt += ((self.arousal - 100) / 100 + Math.random()) / 25 * (self.edge);

        if (self.maleSpurt > 1) {
          male_spurt(macro.cumVolume * (0.1 + Math.random() / 10), false);
          self.maleSpurt = 0;
        }
        if (self.femaleSpurt > 1) {
          female_spurt(macro.femcumVolume * (0.1 + Math.random() / 10), false);
          self.femaleSpurt = 0;
        }
      } else if (self.orgasm) {
        self.quench(1);
      } else if (self.afterglow) {
        self.quench(0.5);
        self.edge = Math.max(0, self.edge - 0.01);
      }
    }
    setTimeout(function () { self.quenchExcess(self); }, 200);
  },

  "maleOrgasm": function (self, times = 0) {
    if (!this.arousalEnabled)
      return;

    if (self.orgasm) {
      let spurt = Math.min(this.cumVolume, this.cumStorage.amount);

      if (spurt == this.cumVolume) {
        let excess = this.cumStorage.amount - this.cumVolume;
        spurt += excess * 3 / 4;
      }
      this.cumStorage.amount -= spurt;
      male_orgasm(spurt, false);
      setTimeout(function () { self.maleOrgasm(self); }, 5000);
    }
  },

  "femaleOrgasm": function (self) {
    if (!this.arousalEnabled)
      return;

    if (this.orgasm) {
      let spurt = Math.min(this.femcumVolume, this.femcumStorage.amount);

      if (spurt == this.femcumVolume) {
        let excess = this.femcumStorage.amount - this.femcumVolume;
        spurt += excess * 3 / 4;
      }

      this.femcumStorage.amount -= spurt;
      female_orgasm(spurt, false);
      setTimeout(function () { self.femaleOrgasm(self); }, 5000);
    }
  },

  "nullOrgasm": function (self) {
    if (!this.arousalEnabled)
      return;

    if (this.orgasm) {
      setTimeout(function () { self.nullOrgasm(self); }, 2000);
    }
  },

  get totalMass() {
    let base = Math.pow(this.scale, 3) * this.baseMass;

    if (this.hasTail) {
      base += this.tailMass * this.tailCount;
    }

    if (this.maleParts) {
      base += this.dickMass;
      base += this.ballMass * 2;
    }

    if (this.hasBreasts) {
      base += this.breastMass * 2;
    }

    return base;
  },

  get description() {
    let result = [];

    let line = "You are " + (macro.name == "" ? "" : macro.name + ", ") + "a " + length(macro.height, unit, true) + " tall " + macro.species + ". You weigh " + mass(macro.mass, unit) + ".";

    result.push(line);

    result.push(macro.stomach.description);

    if (this.analVore) {
      result.push(macro.bowels.description);
    }

    if (this.hasTail) {
      line = "Your " + macro.describeTail + (macro.tailCount > 1 ? " tails sway as you walk. " : " tail sways as you walk. ");
      if (this.tailMaw) {
        line += (macro.tailCount > 1 ? "Their maws are drooling" : "Its maw is drooling");
      }
      result.push(line);

      if (this.tailMaw) {
        result.push(this.tail.description);
      }
    }
    if (this.arousalEnabled) {
      if (this.afterglow) {
        result.push("You're basking in the afterglow of a powerful orgasm.");
      }
      else if (this.orgasm) {
        result.push("You're cumming!");
      } else if (this.arousal < 25) {
        result.push("You're not at all aroused.");
      } else if (this.arousal < 75) {
        result.push("You're feeling a little aroused.");
      } else if (this.arousal < 150) {
        result.push("You're feeling aroused.");
      } else if (this.arousal < 200) {
        result.push("You're on the edge of an orgasm!");
      }
    }
    if (this.maleParts) {
      if (this.hasSheath && this.arousal < 75) {

        line = "Your " + this.describeDick + " cock is hidden away in your bulging sheath, with two " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls hanging beneath.";
      } else {
        line = "Your " + this.describeDick + " cock hangs from your hips, with two " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls hanging beneath.";

      }
      result.push(line);
      result.push(macro.balls.description);
    }

    if (this.femaleParts) {
      line = "Your " + this.describeVagina + " slit peeks out from between your legs.";
      result.push(line);
      result.push(macro.womb.description);
    }

    if (this.hasBreasts) {
      line = "You have two " + length(this.breastDiameter, unit, true) + " wide breasts that weigh " + mass(macro.breastMass, unit) + " apiece.";

      if (this.lactationEnabled) {
        line += " They slosh with " + volume(this.milkStorage.amount, unit, false) + " of creamy milk.";
      }
      if (this.cleavage.container.count > 0)
        line += " Between them are " + this.cleavage.container.describeSimple(verbose || flat) + ".";

      result.push(line);
      if (this.breastVore) {
        result.push(this.breasts.description);
      }
    }

    if (this.soulVoreEnabled) {
      result.push(this.souls.description);
    }

    if (this.wingVoreEnabled) {
      result.push(this.wings.description);
    }

    if (this.hasPouch) {
      result.push(this.pouch.description);
    }

    line = "Your two " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " " + this.footDesc(true) + " shake the earth.";

    if (this.footShoeWorn && this.shoe.container.count > 0) {
      line += " Within " + (this.shoe.container.count > 1 ? "are" : "is") + " " + this.shoe.container.describeSimple(verbose || flat);
      if (this.footSockWorn && this.sock.container.count > 0) {
        line += " and " + this.sock.container.describeSimple(verbose || flat) + " in your socks.";
      }
    } else if (this.footSockWorn && this.sock.container.count > 0) {
      line += " Within " + (this.sock.container.count > 1 ? "are" : "is") + " " + this.sock.container.describeSimple(verbose || flat);
    }

    if (this.paws.container.count > 0) {
      line += " You have " + this.paws.container.describeSimple(verbose || flat) + " wedged between your " + macro.toeDesc(true);
    }

    result.push(line);

    if (this.gooMolten) {
      result.push(this.goo.description);
    }

    if (this.pawVoreEnabled) {
      result.push(this.pawsVore.description);
    }

    return result;
  },

  get describeTail() {
    return (this.tailCount > 1 ? this.tailCount + " " : "") + length(this.tailLength, unit, true) + " long " + this.tailType;
  },

  get describeDick() {
    let state = "";
    if (!this.arousalEnabled) {
      state = "limp";
    } else if (this.orgasm) {
      state = "spurting";
    } else {
      if (this.arousal < 25) {
        state = "limp";
      } else if (this.arousal < 75) {
        state = "swelling";
      } else if (this.arousal < 100) {
        state = "erect";
      } else if (this.arousal < 150) {
        state = "erect, throbbing";
      } else if (this.arousal < 200) {
        state = "erect, throbbing, pre-soaked";
      }
    }

    return length(this.dickLength, unit, true) + " long " + state + " " + this.dickType + " " + pickString("cock", "shaft", "rod", "member", "dick");
  },

  get describeVagina() {
    let state = "";
    if (!this.arousalEnabled) {
      state = "";
    } else if (this.orgasm) {
      state = " gushing, quivering";
    } else {
      if (this.arousal < 25) {
        state = "";
      } else if (this.arousal < 75) {
        state = " moist";
      } else if (this.arousal < 100) {
        state = " glistening";
      } else if (this.arousal < 150) {
        state = " dripping";
      } else if (this.arousal < 200) {
        state = " dripping, quivering";
      }
    }

    return length(this.vaginaLength, unit, true) + " long" + state;
  },
};

//
//------END OF MACRO FUCTION-----------------------------------------------------------------------------------------------
//

const biomeEnum = {
  City: {
    enabled: "cityEnabled",
    biomeSize: [1000, 5000], //[min,max] Note: this is the distance you will walk until getting to the end of the biome
    biomeWeights: {         //Weights determine if and how often you run into something while inside of a biome
      "House": 0.1,
      "Car": 0.07,
      "Bus": 0.02,
      "Business": 0.075,
      "Parking Garage": 0.003,
      "Small Skyscraper": 0.05,
      "City": 0.00005
    }
  },
  Downtown: {
    enabled: "downtownEnabled",
    biomeSize: [1000, 5000], //[min,max] Note: this is the distance you will walk until getting to the end of the biome
    biomeWeights: {         //Weights determine if and how often you run into something while inside of a biome
      "Car": 0.1,
      "Bus": 0.05,
      "Tram": 0.03,
      "Business": 0.075,
      "Parking Garage": 0.003,
      "Small Skyscraper": 0.06,
      "City": 0.00005
    }
  },
  Rural: {
    enabled: "ruralEnabled",
    biomeSize: [4000, 8000], //[min,max] Note: this is the distance you will walk until getting to the end of the biome
    biomeWeights: {         //Weights determine if and how often you run into something while inside of a biome
      "Cow": 0.005,
      "House": 0.1,
      "Barn": 0.08,
      "Car": 0.1,
      "Train": 0.002,
      "Business": 0.075,
      "Ranch": 0.01,
      "Airstrip": 0.002,
      "Airport": 0.002,
      "Town": 0.00001
    }
  },
  Suburb: {
    enabled: "suburbEnabled",
    biomeSize: [2000, 7000], //[min,max] Note: this is the distance you will walk until getting to the end of the biome
    biomeWeights: {         //Weights determine if and how often you run into something while inside of a biome
      "House": 0.1,
      "Car": 0.07,
      "Bus": 0.01,
      "Town": 0.00001
    }
  }
};

let biome = biomeEnum.City; //starting biome(this will be overwritten by player selection as soon as game starts)
let biomeSize = 3000; // size of starting biome(this will be overwritten by player selection as soon as game starts)
let position = 0; //declares variable and starts player at 0 as they have not taken a step yet


function updateBiome(forceNew = false, specifyBiome)//handles stepping between biomes
{
  if (macro.height > 1e12 || macro.changingBiomes == false) { //stops function from running once it stops being relevant
    return
  }
  let strideSize = macro.height * .4; //adjust step size based on height
  position += strideSize; //adds distance from step into total disance traveled through biome

  if (position > biomeSize || forceNew == true) { //if player steps out of biome, generates a new one
    position = 0;
    let oldBiome = biome;
    let biomeTemp = biome; //defines biomeTemp for latrer use, what it is set to does not matter
    if (specifyBiome == undefined) {
      biomeTemp = pickString(biomeEnum.City, biomeEnum.Suburb, biomeEnum.Rural, biomeEnum.Downtown); //if a biome is not force into this function, it picks a random biome
    } else { //otherwise it sets the new biome to the selected one
      biomeTemp = specifyBiome;
    }
    if (macro[(biomeTemp.enabled)] == false) { //checks that the biome selected is actually enabled and if it is not, reruns the function
      updateBiome(true); //side effect of this order is that if the user selects an invalid biome 
      return;
    }
    biome = biomeTemp //if biome passes all checks to allow creation, sets it as biome player is in
    generateBiome(); //assigns a size to new biome

    if (oldBiome !== biome) {//only alerts player if the biome type actually changed
      look(true);
    }
  }
}

function generateBiome() { //creates the biome in accordance with its specific settings(only controls size now but needs to be a seperate function due to way game starts)
  let offset = biome.biomeSize[0] //Math.random generates a random value from 0-1. biome.biomeSize denotes min and max size for each type of biome
  let multiplier = (biome.biomeSize[1] - offset) //if Math.random generated 0, we need the min value, so min value becomes offset. if it is 1, we need 
  biomeSize = ((Math.random() * multiplier) + offset); // max value so we multiply 1 by the (maxvalue - minvalue)+minvalue to cap out at max value. 
}

function look(onlyBiome = false) //onlyBiome means don't include player description when looking at surroundings
{

  let playerDesc = macro.description;
  let areaDesc = "";

  if (macro.height > 1e12)
    areaDesc = "You're pretty much everywhere at once.";
  else if (macro.height > 1e6)
    areaDesc = "You're " + (strolling ? "strolling" : "standing") + "...on pretty much everything at once.";
  else
    switch (biome) {
      case biomeEnum.Rural: areaDesc = "You're " + (strolling ? "strolling" : "standing") + " amongst rural farmhouses and expansive ranches. Cattle are milling about at your feet."; break;
      case biomeEnum.Suburb: areaDesc = "You're " + (strolling ? "striding" : "standing") + " through the winding roads of a suburb."; break;
      case biomeEnum.City:
        if (macro.height < 6) {
          areaDesc = "You are " + (strolling ? "strolling" : "standing") + " in the street of a city. Several " + (macro.victimsHuman ? "humans" : "people") + " have noticed your intimidating presence and are beginning to run."; break;
        } else if (macro.height < 24) {
          areaDesc = "Your broad frame fills the street of the city you are terrorizing. Your presence has caused a pileup of vehicles trying to escape."; break;
        } else if (macro.height < 100) {
          areaDesc = "You are too large for the city streets you are " + (strolling ? "strolling through." : "standing in.") + " Your hulking frame scrapes against building after building, leaving a clear indicator of your path. Gridlock is starting to set in, with people honking and trying to drive away on the sidewalks."; break;
        } else if (macro.height < 500) {
          areaDesc = "You are " + (strolling ? "strolling through" : "looming over") + " a bustling city. Your mammoth frame is on par with the few nearby skyscrapers. You forge your own path, leaving a swath of demolished buildings. Panic has fully gripped the city; the streets are filled with vehicles, all immobile."; break;
        } else if (macro.height < 2500) {
          areaDesc = "You are " + (strolling ? "strolling over" : "looming over") + " a city in the midst of chaos. Your colossal bulk blots out the sky, and makes the couple of remaining skyscrapers look small in comparison. You can clearly see the imprints of your " + macro.footDesc(true) + ". Traffic is gridlocked as far as you can see."; break;
        } else {
          areaDesc = "You're terrorizing the streets of a city. Heavy traffic, worsened by your rampage, is everywhere."; break;
        }
      case biomeEnum.Downtown:
        if (macro.height < 6) {
          areaDesc = "You are " + (strolling ? "strolling" : "standing") + " in packed downtown streets. Several " + (macro.victimsHuman ? "humans" : "people") + " have noticed your intimidating presence and are beginning to run."; break;
        } else if (macro.height < 24) {
          areaDesc = "Your broad frame fills the street of the city center. Your presence has caused a pileup of vehicles trying to escape."; break;
        } else if (macro.height < 100) {
          areaDesc = "You are too large for the city streets you are " + (strolling ? "strolling through." : "standing in.") + " Your hulking frame scrapes against building after building, leaving a clear indicator of your path. Gridlock is starting to set in, with people honking and trying to drive away on the sidewalks."; break;
        } else if (macro.height < 500) {
          areaDesc = "You are " + (strolling ? "strolling through" : "looming over") + " a bustling city. Your mammoth frame is on par with the glittering skyscrapers that surround you. You forge your own path, leaving a swath of demolished buildings. Panic has fully gripped the city; the streets are filled with vehicles, all immobile."; break;
        } else if (macro.height < 2500) {
          areaDesc = "You are " + (strolling ? "strolling over" : "looming over") + " a city in the midst of chaos. Your colossal bulk blots out the sky, and makes the remaining skyscrapers look small in comparison. You can clearly see the imprints of your " + macro.footDesc(true) + ". Traffic is gridlocked as far as you can see, and farther."; break;
        } else {
          areaDesc = "You're lurking amongst the skyscrapers of downtown. The streets are packed, and the buildings are practically begging you to knock them over."; break;
        }
    }


  if (onlyBiome == true) {
    update([areaDesc, newline]);
  } else {
    let desc = playerDesc.concat([newline, areaDesc, newline]);
    update(desc);
  }
}

function toggle_auto(e) {
  switch (strolling) { //Changes how fast player is moving, if player is running, sets player back to standing
    case strollingEnum.Standing:
      strolling = strollingEnum.Strolling;
      e.target.innerText = "Status: Strolling";
      update(["You start walking.", newline]);
      break;
    case strollingEnum.Strolling:
      strolling = strollingEnum.Jogging;
      e.target.innerText = "Status: Jogging";
      update(["You start jogging.", newline]);
      break;
    case strollingEnum.Jogging:
      strolling = strollingEnum.Running;
      e.target.innerText = "Status: Running";
      update(["You start running.", newline]);
      break;
    case strollingEnum.Running:
      strolling = strollingEnum.Standing;
      e.target.innerText = "Status: Standing";
      update(["You stop running..", newline]);
      break;
  }
  //  strolling = !strolling;
  //  e.target.innerText = "Status: " + (strolling ? "Strolling" : "Standing");
  //if (strolling)
  //  update(["You start walking.",newline]);
  //else
  //  update(["You stop walking.",newline]);
  //this is the old code where strolling is defined as true and false(strolling is now referencing an Enum) should probably be ripped out if this ever makes it onto the main Repo
}

function toggle_units(e) {
  switch (unit) {
    case "metric": unit = "SI"; break;
    case "SI": unit = "customary"; break;
    case "customary": unit = "US"; break;
    case "US": unit = "approx"; break;
    case "approx": unit = "metric"; break;
  }

  e.target.innerText = "Units:\n" + unit.charAt(0).toUpperCase() + unit.slice(1);

  update();
}

function toggle_units_options(e) {
  switch (unit) {
    case "metric": unit = "SI"; break;
    case "SI": unit = "customary"; break;
    case "customary": unit = "US"; break;
    case "US": unit = "metric"; break;
  }

  e.target.innerText = "Units:\n" + unit.charAt(0).toUpperCase() + unit.slice(1);

  updateAllPreviews();
}

function toggle_numbers(e) {
  switch (numbers) {
    case "full": numbers = "prefix"; break;
    case "prefix": numbers = "words"; break;
    case "words": numbers = "scientific"; break;
    case "scientific": numbers = "full"; break;
  }

  e.target.innerText = "Numbers: " + numbers.charAt(0).toUpperCase() + numbers.slice(1);

  update();
}

function toggle_verbose(e) {
  switch (text_verbosity) {
    case "verbose":
      text_verbosity = "concise";
      e.target.innerText = "Concise Text";
      verbose = false;
      flat = true;
      break;
    case "concise":
      text_verbosity = "simple";
      e.target.innerText = "Simple Text";
      verbose = false;
      flat = false;
      break;
    case "simple":
      text_verbosity = "verbose";
      e.target.innerText = "Verbose Text";
      verbose = true;
      flat = false;
      break;
  }
}

function toggle_arousal(e) {
  macro.arousalEnabled = !macro.arousalEnabled;

  e.target.innerText = (macro.arousalEnabled ? "Arousal On" : "Arousal Off");
  if (macro.arousalEnabled) {
    document.getElementById("arousal").style.display = "block";
    document.getElementById("edge").style.display = "block";
    document.querySelector("#arousalMeter").style.display = 'inline-block';
    document.querySelector("#orgasmMeter").style.display = 'inline-block';
    document.querySelector("#edgeMeter").style.display = 'inline-block';
  } else {
    document.getElementById("arousal").style.display = "none";
    document.getElementById("edge").style.display = "none";
    document.querySelector("#arousalMeter").style.display = 'none';
    document.querySelector("#orgasmMeter").style.display = 'none';
    document.querySelector("#edgeMeter").style.display = 'none';
  }

  macro.orgasm = false;
  macro.afterglow = false;

  enable_victim("cum-flood", "Flooded by cum");
  enable_victim("femcum-flood", "Flooded by femcum");

}

// lists out total people
function summarize(sum, fatal = true) {
  let word;
  let count = get_living_prey(sum);
  if (fatal && macro.brutality > 0)
    word = count != 1 ? "kills" : "kill";
  else if (!fatal && macro.brutality > 0)
    word = "prey";
  else
    word = count != 1 ? "victims" : "victim";

  return "<b>(" + count + " " + word + ")</b>";
}

function getOnePrey(biome, area, sameSize = true) {
  if (macro.shrunkPrey != null) {
    return getPrey(biome, area, sameSize);
  }
  let weights = getWeights(biome, area);

  let potential = [];

  for (let key in weights) {
    if (weights.hasOwnProperty(key)) {
      potential.push(key);
    }
  }

  let potAreas = [];

  potential.forEach(function (x) {
    potAreas.push([x, things[x].area]);
  });

  potAreas = potAreas.sort(function (x, y) {
    return y[1] - x[1];
  });

  for (let i = 0; i < potAreas.length; i++) {
    let x = potAreas[i];
    if (x[1] < area) {
      return new Container([new things[x[0]][x[0]](1)]);
    }
  }

  if (sameSize)
    return new Container([new things["Person"]["Person"](1)]);
  else
    return new Container();
}
//set weights(how often a thing is encountered)
function getWeights(region, area) {
  let weights = {};

  if (area > things["Planet"].area) {
    weights = {
      "Planet": 1.47e-3,
      "Star": 1.7713746e-3,
      "Solar System": 4e-4,
      "Galaxy": 0.1,
      "Cluster": 0.5,
      "Universe": 1,
      "Multiverse": 1
    };
  }
  else if (area > things["Town"].area) {
    weights = {
      "Town": 0.001,
      "City": 0.0005,
      "Continent": 0.5,
    };
  }
  else {
    try {
      weights = region.biomeWeights
    }
    catch (err) {
      weights = {
        "House": 0.1,
        "Car": 0.07,
        "Bus": 0.02,
        "Business": 0.075,
        "Parking Garage": 0.003,
        "Small Skyscraper": 0.05,
        "Town": 0.00001,
        "City": 0.00005,
        "Continent": 0.0005,
        "Planet": 0.0001
      };
    }

    if (!macro.victimsNoPeople) {
      if (macro.victimsHuman) {
        weights["Human"] = 0.017;
      } else {
        weights["Person"] = 0.017;
      }
    }

    if (macro.victimsMilitary) {
      if (macro.height < 500) {
        weights["Soldier"] = 0.08;
        weights["Tank"] = 0.07;
        weights["Artillery"] = 0.06;
        weights["Military Helicopter"] = 0.05,
          weights["Squad"] = .04;
        weights["Platoon"] = .2,
          weights["Company"] = .3,
          weights["Battalion"] = .4,
          weights["Brigade"] = .5;
      } else if (macro.height < 5000) {
        weights["Tank"] = 0.0002;
        weights["Artillery"] = 0.001;
        weights["Squad"] = .0001;
        weights["Platoon"] = .0005,
          weights["Company"] = .001,
          weights["Battalion"] = .002,
          weights["Brigade"] = .003;
        weights["Division"] = .002,
          weights["Tank Division"] = .001,
          weights["Army"] = .001;
      } else {
        weights["Division"] = .02,
          weights["Tank Division"] = .01,
          weights["Army"] = .01;
      }
    }
    if (macro.victimsMicros) {
      weights["Micro"] = 0.001;
    }

    if (macro.victimsMacros) {
      weights["Macro"] = 0.0001;
    }
  }

  return weights;
}

function getPrey(region, area, sameSize = false) {
  if (macro.shrunkPrey != null) {
    let prey = macro.shrunkPrey;
    macro.shrunkPrey = null;
    return prey;
  }
  let weights = getWeights(region, area);

  var prey = fill_area(area, weights);

  if (prey.count == 0 && sameSize)
    return getOnePrey(biome, area, true);
  return prey;
}

function digest_all(organ, active = false) {
  let prey = new Container();

  for (let i = 0; i < organ.stages; i++) {
    prey = prey.merge(organ.contents[i]);
    organ.contents[i] = new Container();
  }

  if (prey.count == 0) {
    return;
  }

  do_digestion(organ.owner, organ, prey, active);
}

function do_digestion(owner, organ, container, active = false) {
  if (organ.moves != undefined) {
    organ.moves.feed(container);
    let sound = getSound("insert", container.sum_property("mass"));
    let line = organ.describeMove(container);
    let summary = summarize(container.sum(), false);
    update([line, summary, newline], active);
    return;
  }
  grow_automatic(container.sum_property("mass"), organ.name);
  let digested = container.sum();
  for (let key in victims[organ.name]) {
    if (victims[organ.name].hasOwnProperty(key) && digested.hasOwnProperty(key)) {
      victims["digested"][key] += digested[key];
      victims[organ.name][key] -= digested[key];
    }
  }

  let sound = getSound("digest", container.sum_property("mass"));

  let vol = organ.fill(owner, container);
  let line = organ.describeDigestion(container, vol);
  let lethal = macro.brutality != 0 && (!macro.soulVoreEnabled || organ.name === "souls");
  let summary = summarize(container.sum(), lethal);

  if (macro.soulVoreEnabled && organ.name != "souls") {
    owner.souls.feed(container);
    let soulCount = container.sum()["Person"];
    let soulLine = "";
    if (soulCount > 0)
      soulLine = "Their " + (soulCount == 1 ? "soul is" : "souls are") + " trapped in your depths!";
    else
      soulLine = "No souls, though...";
    update([sound, line, summary, soulLine, newline], active);
  } else {
    update([sound, line, summary, newline], active);
  }
}


function digest_stomach() {
  digest_all(macro.stomach, true);
}

function digest_tail() {
  digest_all(macro.tail, true);
}

function digest_anal() {
  digest_all(macro.bowels, true);
}

function digest_cock() {
  digest_all(macro.balls, true);
}

function digest_breast() {
  digest_all(macro.breasts, true);
}

function digest_unbirth() {
  digest_all(macro.womb, true);
}

function digest_soul() {
  digest_all(macro.souls, true);
}

function digest_bladder() {
  digest_all(macro.bladder, true);
}

function digest_goo() {
  digest_all(macro.goo, true);
}

function digest_paws() {
  digest_all(macro.pawsVore, true);
}

function digest_wings() {
  digest_all(macro.wings, true);
}

function crop_swallow() {
  digest_all(macro.crop, true);
}

function feed() {
  let area = macro.handArea;
  let prey = getPrey(biome, area, macro.sameSizeOralVore);

  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("swallow", preyMass);

  let line = "";

  if (macro.cropEnabled) {
    macro.crop.feed(prey);
    line = describe("crop-swallow", prey, macro, verbose, flat);
  } else {
    macro.stomach.feed(prey);
    line = describe("eat", prey, macro, verbose, flat);
  }

  add_victim_people("eaten", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);

  if (macro.droolEnabled) {
    drool();
  }
}

function chew() {
  let area = macro.handArea;
  let prey = getPrey(biome, area, macro.sameSizeOralVore);

  let line = describe("chew", prey, macro, verbose, flat);

  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("chew", preyMass);

  add_victim_people("chew", prey);

  macro.stomach.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(10);

  if (macro.droolEnabled) {
    drool();
  }
}

function drool() {
  let vol = macro.droolVolume * (Math.random() / 5 + 0.9);
  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);

  if (prey.count == 0) {
    return;
  }
  let line = describe("drool", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("drip", preyMass);

  add_victim_people("drool", prey);

  update([sound, line, linesummary, newline]);
}

function hand_crush(active = true) {
  let area = macro.handArea;
  let prey = getOnePrey(biome, area, macro.sameSizeStomp);
  let line = describe("hand-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("stomped", prey);

  update([sound, line, linesummary, newline], active);

  macro.arouse(5);
}

function foot_crush(active = true) {
  let area = macro.pawArea;
  let prey = getOnePrey(biome, area, macro.sameSizeStomp);
  let line = describe("foot-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("stomped", prey);

  update([sound, line, linesummary, newline], active);

  updateBiome(false);

  macro.arouse(5);
}

function stomp(active = true) {
  if (macro.gooMolten && !macro.footShoeWorn && !macro.footSockWorn) {
    stomp_goo();
    return;
  }

  let area = macro.pawArea;
  let prey = getPrey(biome, area, macro.sameSizeStomp);
  let line = describe("stomp", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("stomped", prey);

  update([sound, line, linesummary, newline], active);

  updateBiome(false);

  macro.arouse(5);

  stomp_wedge(active);

  if (macro.stenchEnabled && macro.basePawStenchArea > 0) {
    paw_stench(active);
  }
}

function stomp_wedge(active = true) {
  if (macro.footType == "hoof")
    return;

  let area = 0;

  if (!macro.footWear || (!macro.footSockWorn && !macro.footShoeWorn))
    area = macro.pawArea / 10;
  else if (macro.footShoeWorn)
    area = macro.pawArea / 25;
  else
    area = macro.pawArea / 50;

  let prey = getPrey(biome, area, false);

  if (prey.count == 0)
    return;

  let line = describe("stomp-wedge", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  macro.paws.add(prey);

  add_victim_people("stomped", prey);

  update([sound, line, linesummary, newline], active);
}

function stomp_goo() {
  let area = macro.pawArea;
  let prey = getPrey(biome, area, macro.sameSizeStomp);
  let line = describe("stomp-goo", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("goo", preyMass);

  macro.goo.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);

  if (macro.stenchEnabled) {
    paw_stench();
  }
}

function flex_toes() {

  let prey = new Container();

  if (!macro.footWear || (!macro.footSockWorn && !macro.footShoeWorn)) {
    prey = macro.paws.container;
    macro.paws.container = new Container();
  }
  else if (macro.footSockWorn && macro.footShoeWorn) {
    prey = macro.shoe.container.merge(macro.sock.container);
    if (macro.brutality > 0) {
      macro.shoe.container = new Container();
      macro.sock.container = new Container();
    }
  } else if (macro.footSockWorn) {
    prey = macro.sock.container;
    if (macro.brutality > 0) {
      macro.sock.container = new Container();
    }
  } else if (macro.footShoeWorn) {
    prey = macro.shoe.container;
    if (macro.brutality > 0) {
      macro.shoe.container = new Container();
    }
  }

  let line = describe("flex-toes", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("flex-toes", prey);

  update([sound, line, linesummary, newline]);
}

function paw_stench() {

  let area = macro.pawStenchArea;
  let prey = getPrey(biome, area);
  let line = describe("paw-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("paw-stench", prey);

  update([line, linesummary, newline]);

  macro.arouse(5);
}

function grind(active = true) {
  let area = macro.assArea / 2;

  if (macro.maleParts)
    area += macro.dickArea;
  if (macro.femaleParts)
    area += macro.vaginaArea;

  let prey = getPrey(biome, area);

  let line = describe("grind", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("humped", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(20);

  if (macro.maleMuskEnabled) {
    male_musk(area * macro.baseMaleMuskArea * macro.muskScale / 2, active);
  }

  if (macro.femaleMuskEnabled) {
    female_musk(area * macro.baseFemaleMuskArea * macro.muskScale, active);
  }
}

function ass_grind(active = true) {
  let area = macro.assArea / 2;

  let prey = getPrey(biome, area);

  let line = describe("ass-grind", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("ass-ground", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(15);

  if (macro.maleMuskEnabled) {
    male_musk(area * macro.baseMaleMuskArea * macro.muskScale / 2, active);
  }

  if (macro.femaleMuskEnabled) {
    female_musk(area * macro.baseFemaleMuskArea * macro.muskScale, active);
  }
}

function anal_vore() {
  let area = macro.analVoreArea;
  let prey = getOnePrey(biome, area, macro.sameSizeAnalVore);

  let line = describe("anal-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.bowels.feed(prey);

  add_victim_people("anal-vore", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(20);
}

function sit() {
  if (macro.gooMolten) {
    sit_goo();
    return;
  }

  let area = macro.assArea;
  let crushed = getPrey(biome, area, macro.sameSizeStomp);

  let line = describe("ass-crush", crushed, macro, verbose, flat);
  let linesummary = summarize(crushed.sum(), true);

  let people = get_living_prey(crushed.sum());

  let crushedMass = crushed.sum_property("mass");

  let sound = getSound("crush", crushedMass);

  update([sound, line, linesummary, newline]);

  add_victim_people("ass-crush", crushed);

  macro.arouse(5);

  if (macro.stenchEnabled && macro.baseAssStenchArea > 0) {
    ass_stench();
  }
}

function sit_goo() {
  let area = macro.assArea;
  let prey = getPrey(biome, area, macro.sameSizeStomp);

  let line = describe("ass-goo", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let crushedMass = prey.sum_property("mass");

  let sound = getSound("goo", crushedMass);

  macro.goo.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(15);

  if (macro.stenchEnabled && macro.baseAssStenchArea > 0) {
    ass_stench();
  }
}

function ass_stench() {

  let area = macro.assStenchArea;
  let prey = getPrey(biome, area);
  let line = describe("ass-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (prey.sum()["Person"] == undefined)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("ass-stench", prey);

  update([line, linesummary, newline]);

  macro.arouse(5);
}

function cleavage_stuff() {
  let area = macro.handArea;
  let prey = getPrey(biome, area);
  let line = describe("cleavage-stuff", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  macro.cleavage.add(prey);

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  update([sound, line, linesummary, newline]);

  macro.arouse(10);
}

function cleavage_crush() {
  let prey = macro.cleavage.container;
  macro.cleavage.container = new Container();
  let line = describe("cleavage-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("cleavage-crush", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse((preyMass > 0 ? 20 : 10));
}

function cleavage_drop() {
  let prey = macro.cleavage.container;
  macro.cleavage.container = new Container();
  let line = describe("cleavage-drop", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("drop", preyMass);

  add_victim_people("cleavage-drop", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse((preyMass > 0 ? 15 : 5));
}

function cleavage_absorb() {
  let prey = macro.cleavage.container;
  macro.cleavage.container = new Container();
  let line = describe("cleavage-absorb", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  add_victim_people("cleavage-absorb", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse((preyMass > 0 ? 15 : 5));

  if (preyMass > 0) {
    grow_automatic(preyMass, "breasts");
  }
}

function breast_toy() {
  let prey = macro.cleavage.container;
  let line = describe("breast-toy", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  update([sound, line, linesummary, newline]);
  macro.arouse(15);
}

function breast_crush() {
  let area = macro.breastArea;
  let prey = getPrey(biome, area, macro.sameSizeStomp);
  let line = describe("breast-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("breast-crush", prey);

  update([sound, line, linesummary, newline]);

  if (macro.lactationEnabled && macro.milkStorage.amount / macro.milkStorage.limit > 0.5) {
    let amount = Math.min(macro.lactationVolume, (macro.milkStorage.amount / macro.milkStorage.limit - 0.5) * macro.milkStorage.limit);
    breast_milk(amount);
  }

  macro.arouse(10);
}

function breast_vore() {
  // todo nipple areas?
  let area = macro.breastStretchArea / 4;
  let prey = getPrey(biome, area, macro.sameSizeBreastVore);
  let line = describe("breast-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  add_victim_people("breast-vore", prey);
  macro.breasts.feed(prey);

  update([sound, line, linesummary, newline]);

  if (macro.lactationEnabled && macro.milkStorage.amount / macro.milkStorage.limit > 0.5) {
    let amount = Math.min(macro.lactationVolume, (macro.milkStorage.amount / macro.milkStorage.limit - 0.5) * macro.milkStorage.limit);
    breast_milk(amount);
  }

  macro.arouse(10);
}

function breast_milk(vol, active = true) {
  if (vol == undefined) {
    vol = Math.min(macro.lactationVolume, macro.milkStorage.amount);
  }

  macro.milkStorage.amount -= vol;

  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("breast-milk", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("liquid", preyMass);

  add_victim_people("milk-flood", prey);
  update([sound, line, linesummary, newline], active);

  macro.arouse(20);
}

function unbirth() {
  let area = macro.vaginaStretchArea;
  let prey = getPrey(biome, area, macro.sameSizeUnbirth);
  let line = describe("unbirth", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.womb.feed(prey);
  add_victim_people("unbirth", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(20);
}

function slit_toy() {
  let prey = macro.womb.contents[0].merge(macro.womb.contents[1]);
  let line = describe("slit-toy", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  update([sound, line, linesummary, newline]);
  macro.arouse(15);
}

function sheath_stuff() {
  let area = Math.min(macro.handArea, macro.dickArea);
  let prey = getPrey(biome, area);
  let line = describe("sheath-stuff", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.sheath.add(prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(15);
}

function sheath_toy() {
  let prey = macro.sheath.container;
  let line = describe("sheath-toy", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  update([sound, line, linesummary, newline]);
  macro.arouse(15);
}

function sheath_clench() {
  let prey = macro.sheath.container;
  macro.sheath.container = new Container();
  let line = describe("sheath-clench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("sheath-crush", prey);
  update([sound, line, linesummary, newline]);
  macro.arouse(45);
}

function sheath_crush() {
  let prey = macro.sheath.container;
  macro.sheath.container = new Container();
  let line = describe("sheath-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("sheath-crush", prey);
  update([sound, line, linesummary, newline]);
  macro.arouse(45);
}

function sheath_absorb() {
  let prey = macro.sheath.container;
  macro.sheath.container = new Container();
  let line = describe("sheath-absorb", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  add_victim_people("sheath-absorb", prey);
  update([sound, line, linesummary, newline]);

  if (preyMass > 0) {
    grow_automatic(preyMass, "cock");
  }

  macro.arouse(45);
}

function foreskin_stuff() {
  let area = Math.min(macro.handArea, macro.dickArea);
  let prey = getPrey(biome, area);
  let line = describe("foreskin-stuff", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.foreskin.add(prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(15);
}

function foreskin_toy() {
  let prey = macro.foreskin.container;
  let line = describe("foreskin-toy", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  update([sound, line, linesummary, newline]);
  macro.arouse(15);
}

function foreskin_clench() {
  let prey = macro.foreskin.container;
  macro.foreskin.container = new Container();
  let line = describe("foreskin-clench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("foreskin-crush", prey);
  update([sound, line, linesummary, newline]);
  macro.arouse(45);
}

function foreskin_crush() {
  let prey = macro.foreskin.container;
  macro.foreskin.container = new Container();
  let line = describe("foreskin-crush", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("foreskin-crush", prey);
  update([sound, line, linesummary, newline]);
  macro.arouse(45);
}

function foreskin_absorb() {
  let prey = macro.foreskin.container;
  macro.foreskin.container = new Container();
  let line = describe("foreskin-absorb", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  add_victim_people("foreskin-absorb", prey);
  update([sound, line, linesummary, newline]);

  if (preyMass > 0) {
    grow_automatic(preyMass, "cock");
  }

  macro.arouse(45);
}

function cockslap(active = true) {
  let area = macro.dickArea;
  let prey = getPrey(biome, area);
  let line = describe("cockslap", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("cock-slap", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(15);

  if (macro.maleMuskEnabled) {
    male_musk(area * macro.baseMaleMuskArea * macro.muskScale / 2, active);
  }
}

function cock_vore(active = true) {
  let area = macro.dickStretchGirth;
  let prey = getPrey(biome, area, macro.sameSizeCockVore);
  let line = describe("cock-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.balls.feed(prey);

  add_victim_people("cock-vore", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(20);

  if (macro.maleMuskEnabled) {
    male_musk(area * macro.baseMaleMuskArea * macro.muskScale / 2, active);
  }
}

function ball_smother(active = true) {
  let area = macro.ballArea * 2;
  let prey = getPrey(biome, area);
  let line = describe("ball-smother", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("ball-smother", prey);
  update([sound, line, linesummary, newline]);

  macro.arouse(10);

  if (macro.maleMuskEnabled) {
    male_musk(area * macro.baseMaleMuskArea * macro.muskScale, active);
  }
}

function male_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("male-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("male-musk", prey);

  update([line, linesummary, newline], active);
}

function male_spurt(vol, active = true) {
  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("male-spurt", prey, macro, verbose, flat, vol).replace("$VOLUME", volume(vol, unit, true));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("drip", preyMass);

  add_victim_people("cum-flood", prey);

  update([sound, line, linesummary, newline], active);

  if (macro.maleMuskEnabled) {
    male_spurt_musk(area * macro.baseMaleMuskArea * macro.muskScale, active);
  }
}

function male_spurt_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("male-spurt-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("male-spurt-musk", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function male_orgasm(vol, active = true) {
  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("male-orgasm", prey, macro, verbose, flat, vol).replace("$VOLUME", volume(vol, unit, true));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("liquid", preyMass);

  add_victim_people("cum-flood", prey);

  update([sound, line, linesummary, newline], active);

  if (macro.maleMuskEnabled) {
    male_orgasm_musk(area * macro.baseMaleMuskArea * macro.muskScale, active);
  }
}

function male_orgasm_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("male-orgasm-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("male-orgasm-musk", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function female_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("female-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("female-musk", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function female_spurt(vol, active = true) {
  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("female-spurt", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("drip", preyMass);

  add_victim_people("femcum-flood", prey);

  update([sound, line, linesummary, newline], active);

  if (macro.femaleMuskEnabled) {
    female_spurt_musk(area * macro.baseFemaleMuskArea * macro.muskScale, active);
  }
}

function female_spurt_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("female-spurt-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("female-spurt-musk", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function female_orgasm(vol, active = true) {
  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("female-orgasm", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("liquid", preyMass);

  add_victim_people("femcum-flood", prey);

  update([sound, line, linesummary, newline], active);

  if (macro.femaleMuskEnabled) {
    female_orgasm_musk(area * macro.baseFemaleMuskArea * macro.muskScale, active);
  }
}

function female_orgasm_musk(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("female-orgasm-musk", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("female-orgasm-musk", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function tail_slap() {
  let area = macro.tailArea * macro.tailCount;
  let prey = getPrey(biome, area);
  let line = describe("tail-slap", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("tail-slap", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);
}

function tail_vore_only() {
  tail_vore(1);
}

function tail_vore_one() {
  tail_vore(1);
}

function tail_vore_some() {
  tail_vore(Math.floor(Math.random() * macro.tailCount) + 1);
}

function tail_vore_all() {
  tail_vore(macro.tailCount);
}

function tail_vore(count) {
  let lines = [];
  let totalPrey = new Container();

  if (count <= 3) {
    for (let i = 0; i < count; i++) {
      let area = macro.tailStretchGirth;
      let prey = getPrey(biome, area, macro.sameSizeTailVore);
      totalPrey = totalPrey.merge(prey);
      let line = describe("tail-vore", prey, macro, verbose, flat);
      lines.push(line);
    }
  } else {
    let area = macro.tailStretchGirth;

    let i = 0;
    for (i = 0; i < 10 && i < count; i++) {
      let prey = getPrey(biome, area, macro.sameSizeTailVore);
      for (var key in prey.contents) {
        if (prey.contents.hasOwnProperty(key)) {
          prey.contents[key].multiply(Math.ceil((count - i) / 10));
        }
      }
      totalPrey = totalPrey.merge(prey);
    }

    let line = describe("tails-vore", totalPrey, macro, verbose, flat).replace("$COUNT", macro.tailCount);
    lines.push(line);
  }

  let linesummary = summarize(totalPrey.sum(), false);

  lines.push(linesummary);

  lines.push(newline);

  let people = get_living_prey(totalPrey.sum());

  let preyMass = totalPrey.sum_property("mass");

  let sound = getSound("swallow", preyMass);

  macro.tail.feed(totalPrey);
  add_victim_people("tail-vore", totalPrey);

  update([sound].concat(lines));

  macro.arouse(5);
}

function pouch_stuff() {
  let area = macro.handArea;
  let prey = getPrey(biome, area);
  let line = describe("pouch-stuff", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.pouch.add(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);
}

function pouch_rub() {
  let prey = macro.pouch.container;

  let line = describe("pouch-rub", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);
  update([line, linesummary, newline]);
}

function pouch_eat() {
  let prey = macro.pouch.container;
  macro.pouch.container = new Container();

  let line = describe("pouch-eat", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("swallow", preyMass);

  macro.stomach.feed(prey);
  add_victim_people("eaten", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);
}

function pouch_absorb() {
  let prey = macro.pouch.container;
  macro.pouch.container = new Container();

  let line = describe("pouch-absorb", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.stomach.feed(prey);
  add_victim_people("pouch-absorb", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(25);
}

function soul_vore() {
  let area = macro.height * macro.height;
  let prey = getPrey(biome, area);

  let line = describe("soul-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("swallow", preyMass);

  macro.souls.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(15);
}

function soul_absorb_paw() {
  let prey = getPrey(biome, macro.pawArea, macro.sameSizeStomp);

  let line = describe("soul-absorb-paw", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("crush", preyMass);

  add_victim_people("soul-paw", prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(25);
}

function belch(vol, active = true) {
  if (vol == undefined) {
    vol = Math.min(macro.gasStorage.amount, macro.gasStorage.limit / 3);
  }

  macro.gasStorage.amount -= vol;

  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("belch", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("belch", preyMass);

  add_victim_people("gas-belch", prey);

  update([sound, line, linesummary, newline], active);
}

function fart(vol, active = true) {
  if (vol == undefined) {
    vol = Math.min(macro.gasStorage.amount, macro.gasStorage.limit / 2);
  }

  macro.gasStorage.amount -= vol;

  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("fart", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("fart", preyMass);

  add_victim_people("gas-fart", prey);

  update([sound, line, linesummary, newline], active);
}

function wear_shoes() {
  macro.shoe.container = macro.shoe.container.merge(macro.paws.container);

  let line = describe("wear-shoe", macro.shoe.container.merge(macro.paws.container, flat), macro, verbose);
  macro.paws.container = new Container();
  let summary = summarize(macro.shoe.container.sum(), false);

  macro.footShoeWorn = true;

  footwearUpdate();

  macro.paws.container = macro.shoeTrapped;
  macro.shoeTrapped = new Container();

  update([line, summary, newline]);
}

function remove_shoes() {
  macro.footShoeWorn = false;

  macro.shoeTrapped = macro.paws.container;
  macro.paws.container = new Container();

  let line = describe("remove-shoe", macro.shoe.container, macro, verbose, flat);
  let summary = summarize(macro.shoe.container.sum(), false);

  footwearUpdate();

  update([line, summary, newline]);

  if (macro.stenchEnabled) {
    remove_shoes_stench();
  }
}

function remove_shoes_stench() {
  let area = macro.pawStenchArea * 2;
  let prey = getPrey(biome, area);
  let line = describe("paw-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("paw-stench", prey);

  update([line, linesummary, newline]);

  macro.arouse(5);
}

function wear_socks() {
  macro.sock.container = macro.sock.container.merge(macro.paws.container);

  let line = describe("wear-sock", macro.sock.container, macro, verbose, flat);
  macro.paws.container = new Container();
  let summary = summarize(macro.sock.container.sum(), false);

  macro.footSockWorn = true;

  macro.paws.container = macro.sockTrapped;
  macro.sockTrapped = new Container();

  footwearUpdate();

  update([line, summary, newline]);
}

function remove_socks() {
  macro.footSockWorn = false;

  macro.sockTrapped = macro.paws.container;
  macro.paws.container = new Container();

  let line = describe("remove-sock", macro.sock.container, macro, verbose, flat);
  let summary = summarize(macro.sock.container.sum(), false);

  footwearUpdate();

  update([line, summary, newline]);

  if (macro.stenchEnabled) {
    remove_socks_stench();
  }
}

function remove_socks_stench() {
  let area = macro.pawStenchArea * 2;
  let prey = getPrey(biome, area);
  let line = describe("paw-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("paw-stench", prey);

  update([line, linesummary, newline]);

  macro.arouse(5);
}

function stuff_shoes() {
  let prey = getPrey(biome, macro.pawArea / 5, false);

  macro.shoe.add(prey);

  let line = describe("stuff-shoe", prey, macro, verbose, flat);
  let summary = summarize(prey.sum(), false);

  update([line, summary, newline]);
}

function stuff_socks() {
  let prey = getPrey(biome, macro.pawArea / 5, false);

  macro.sock.add(prey);

  let line = describe("stuff-sock", prey, macro, verbose, flat);
  let summary = summarize(prey.sum(), false);

  update([line, summary, newline]);
}

function dump_shoes() {
  let prey = macro.shoe.container;

  macro.shoe.container = new Container();

  let line = describe("dump-shoe", prey, macro, verbose, flat);
  let summary = summarize(prey.sum(), false);

  update([line, summary, newline]);
}

function dump_socks() {
  let prey = macro.sock.container;

  macro.sock.container = new Container();

  let line = describe("dump-sock", prey, macro, verbose, flat);
  let summary = summarize(prey.sum(), false);

  update([line, summary, newline]);
}

function footwearUpdate() {
  disable_button("wear_shoes");
  disable_button("remove_shoes");
  disable_button("wear_socks");
  disable_button("remove_socks");
  disable_button("stuff_shoes");
  disable_button("dump_shoes");
  disable_button("stuff_socks");
  disable_button("dump_socks");

  if (macro.footShoeEnabled) {
    if (macro.footShoeWorn) {
      enable_button("remove_shoes");
    } else {
      enable_button("stuff_shoes");
      enable_button("dump_shoes");
      enable_button("wear_shoes");
    }
  }

  if (macro.footSockEnabled) {
    if (!macro.footShoeEnabled || !macro.footShoeWorn) {
      if (macro.footSockWorn) {
        enable_button("remove_socks");
      } else {
        enable_button("wear_socks");
      }
    }

    if (!macro.footSockWorn) {
      enable_button("stuff_socks");
      enable_button("dump_socks");
    }
  }
}

function piss(vol, active = true) {
  if (vol == undefined) {
    vol = macro.pissStorage.amount;
  }

  macro.pissStorage.amount -= vol;

  let area = Math.pow(vol, 2 / 3);

  let prey = getPrey(biome, area);
  let line = describe("piss", prey, macro, verbose, flat).replace("$VOLUME", volume(vol, unit, false));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("liquid", preyMass);

  add_victim_people("piss", prey);
  update([sound, line, linesummary, newline], active);

  macro.arouse(20);

  if (macro.stenchEnabled && macro.basePissStenchArea > 0) {
    piss_stench(area * macro.basePissStenchArea * macro.stenchScale, active);
  }
}

function piss_stench(area, active = true) {
  let prey = getPrey(biome, area);
  let line = describe("piss-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("piss-stench", prey);

  update([line, linesummary, newline], active);

  macro.arouse(5);
}

function bladder_vore() {
  let prey = getPrey(biome, macro.urethraStretchArea, macro.sameSizeBladderVore);
  let line = describe("bladder-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  add_victim_people("bladder-vore", prey);

  macro.bladder.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(20);
}

function scat(vol, active = true) {
  if (vol == undefined) {
    vol = macro.scatStorage.amount;
  }

  let area = Math.pow(vol, 2 / 3) / 2;
  let scatLength = Math.pow(vol, 1 / 3) * 4;

  let prey = getPrey(biome, area);
  let line = describe("scat", prey, macro, verbose, flat).replace("$MASS", mass(vol * 1000, unit, true)).replace("$LENGTH", length(scatLength, unit, true));
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("scat", preyMass);

  macro.scatStorage.victims = new Container();
  add_victim_people("scat", prey);
  update([sound, line, linesummary, newline], active);

  macro.scatStorage.amount -= vol;

  macro.arouse(50);

  if (macro.stenchEnabled && macro.baseScatStenchArea > 0) {
    scat_stench(area * macro.baseScatStenchArea * macro.stenchScale, active);
  }
}

function scat_stench(area) {
  let prey = getPrey(biome, area);
  let line = describe("scat-stench", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  if (get_living_prey(prey.sum()) == 0)
    return;

  let preyMass = prey.sum_property("mass");

  add_victim_people("scat-stench", prey);

  update([line, linesummary, newline]);

  macro.arouse(5);
}

function setButton(button, state) {
  if (state) {
    enable_button(button);
  } else {
    disable_button(button);
  }
}

function gooButtons(molten) {
  setButton("melt", !molten);
  setButton("solidify", molten);
  setButton("flood", molten);

  if (macro.oralVore) {
    setButton("goo_stomach_pull", molten);
    setButton("goo_stomach_push", molten);
  }

  if (macro.analVore) {
    setButton("goo_bowels_pull", molten);
    setButton("goo_bowels_push", molten);
  }

  if (macro.femaleParts) {
    setButton("goo_womb_pull", molten);
    setButton("goo_womb_push", molten);
  }

  if (macro.maleParts) {
    setButton("goo_balls_pull", molten);
    setButton("goo_balls_push", molten);
  }

  if (macro.hasBreasts) {
    setButton("goo_breasts_pull", molten);
    setButton("goo_breasts_push", molten);
  }

  if (macro.pawVoreEnabled) {
    setButton("goo_paws_pull", molten);
    setButton("goo_paws_push", molten);
  }

  if (macro.hasTail) {
    setButton("goo_tail_pull", molten);
    setButton("goo_tail_push", molten);
  }

  if (macro.gooDigestManual) {
    setButton("digest_goo", molten);
  }
}

function melt() {
  macro.gooMolten = true;

  gooButtons(macro.gooMolten);

  let prey = new Container();

  prey = prey.merge(macro.paws.container);
  macro.paws.container = new Container();

  if (macro.footSockWorn) {
    prey = prey.merge(macro.sock.container);
    macro.sock.container = new Container();
  } else if (macro.footShoeWorn) {
    prey = prey.merge(macro.shoe.container);
    macro.shoe.container = new Container();
  }

  let line = describe("melt", prey, macro, verbose, flat);

  macro.goo.feed(prey);

  update([line, newline]);
}

function flood() {
  let area = Math.pow(macro.totalMass / 1000, 2 / 3);
  let prey = getPrey(biome, area, macro.sameSizeStomp);
  let line = describe("flood", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("goo", preyMass);

  macro.goo.feed(prey);

  update([sound, line, linesummary, newline]);

  macro.arouse(5);
}

function solidify() {
  macro.gooMolten = false;

  gooButtons(macro.gooMolten);

  let prey = new Container();

  for (let i = 0; i < macro.goo.contents.length; i++) {
    prey = prey.merge(macro.goo.contents[i]);
    macro.goo.contents[i] = new Container();
  }

  let line = describe("solidify", prey, macro, verbose, flat);

  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  if (macro.gooDigestion) {
    update([sound, line, linesummary, newline]);
    add_victim_people("goo", prey);
  } else {
    update([sound, line, newline]);
  }
}

function vomit() {
  let prey = new Container();

  for (let i = 0; i < macro.stomach.contents.length; i++) {
    prey = prey.merge(macro.stomach.contents[i]);
    macro.stomach.contents[i] = new Container();
  }

  let line = describe("vomit", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);
  let preyMass = prey.sum_property("mass");
  let sound = getSound("vomit", preyMass);

  update([sound, line, linesummary, newline]);
  add_victim_people("vomit", prey);
}

function move_prey(from, to) {
  let prey = new Container();

  for (let i = 0; i < from.contents.length; i++) {
    prey = prey.merge(from.contents[i]);
    from.contents[i] = new Container();
  }

  to.feed(prey);

  return prey;
}

function goo_move_prey(from, to, name) {
  let prey = move_prey(from, to);
  let line = describe(name, prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), false);
  let preyMass = prey.sum_property("mass");
  let sound = getSound("goo", preyMass);

  update([sound, line, linesummary, newline]);
}

function goo_stomach_pull() {
  return goo_move_prey(macro.stomach, macro.goo, "goo-stomach-pull");
}

function goo_stomach_push() {
  return goo_move_prey(macro.goo, macro.stomach, "goo-stomach-push");
}

function goo_bowels_pull() {
  return goo_move_prey(macro.bowels, macro.goo, "goo-bowels-pull");
}

function goo_bowels_push() {
  return goo_move_prey(macro.goo, macro.bowels, "goo-bowels-push");
}

function goo_womb_pull() {
  return goo_move_prey(macro.womb, macro.goo, "goo-womb-pull");
}

function goo_womb_push() {
  return goo_move_prey(macro.goo, macro.womb, "goo-womb-push");
}

function goo_balls_pull() {
  return goo_move_prey(macro.balls, macro.goo, "goo-balls-pull");
}

function goo_balls_push() {
  return goo_move_prey(macro.goo, macro.balls, "goo-balls-push");
}

function goo_breasts_pull() {
  return goo_move_prey(macro.breasts, macro.goo, "goo-breasts-pull");
}

function goo_breasts_push() {
  return goo_move_prey(macro.goo, macro.breasts, "goo-breasts-push");
}

function goo_tail_pull() {
  return goo_move_prey(macro.tail, macro.goo, "goo-tail-pull");
}

function goo_tail_push() {
  return goo_move_prey(macro.goo, macro.tail, "goo-tail-push");
}

function goo_paws_pull() {
  return goo_move_prey(macro.pawsVore, macro.goo, "goo-paws-pull");
}

function goo_paws_push() {
  return goo_move_prey(macro.goo, macro.pawsVore, "goo-paws-push");
}

function paw_vore() {
  let prey = new Container();

  let lines = [];

  if ((!macro.footShoeEnabled || !macro.footShoeWorn) && (!macro.footSockEnabled || !macro.footSockWorn)) {
    let area = macro.pawArea;
    prey = prey.merge(getPrey(biome, area, macro.sameSizePawVore));

    lines.push(describe("paw-vore", prey, macro, verbose, flat));
  }

  if (macro.paws.container.count > 0) {
    prey = prey.merge(macro.paws.container);
    lines.push(describe("paw-vore-toes", macro.paws.container, macro, verbose, flat));
    macro.paws.container = new Container();
  }

  if (macro.shoe.container.count > 0 && macro.footShoeWorn && (!macro.footSockEnabled || !macro.footSockWorn)) {
    prey = prey.merge(macro.shoe.container);
    lines.push(describe("paw-vore-toes", macro.shoe.container, macro, verbose, flat));
    macro.shoe.container = new Container();
  }

  if (macro.sock.container.count > 0 && macro.footSockWorn) {
    prey = prey.merge(macro.sock.container);
    lines.push(describe("paw-vore-toes", macro.sock.container, macro, verbose, flat));
    macro.sock.container = new Container();
  }

  if (lines.length == 0) {
    if (macro.footSockWorn) {
      update(["Your " + macro.footOnlyDesc(true) + " have no prey to absorb in your socks.", newline]);
    } else if (macro.footShoeWorn) {
      update(["Your " + macro.footOnlyDesc(true) + " have no prey to absorb in your " + macro.footDesc(true) + ".", newline]);
    }
    else { update(["Nothing happens...", newline]); }
    return;
  }

  let linesummary = summarize(prey.sum(), false);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.pawsVore.feed(prey);

  add_victim_people("paw-vore", prey);

  update([sound].concat(lines).concat([linesummary, newline]));

  macro.arouse(5);
}

function breath(type, style) {
  let area = macro.breathArea;
  let prey = new Container();

  if (style == "line") {
    area *= (Math.log10(macro.scale) + 1) * 10;
    prey = getOnePrey(biome, area, true);
  } else if (style == "cone") {
    prey = getPrey(biome, area, true);
  }

  let line = describe("breath-" + type, prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);
  let preyMass = prey.sum_property("mass");
  let sound = getSound("breath", preyMass);

  update([sound, line, linesummary, newline]);

  add_victim_people("breath-" + type, prey);

  macro.arouse(5);
}

function breath_fire() {
  breath("fire", macro.breathStyle);
}

function breath_ice() {
  breath("ice", macro.breathStyle);
}

function breath_electric() {
  breath("electric", macro.breathStyle);
}

function breath_smoke() {
  breath("smoke", macro.breathStyle);
}

function breath_radiation() {
  breath("radiation", macro.breathStyle);
}

function breath_foul() {
  breath("foul", macro.breathStyle);
}

function breath_line() {
  macro.breathStyle = "line";

  update(["You prepare to exhale a focused line of breath!", newline]);
}

function breath_cone() {
  macro.breathStyle = "cone";

  update(["You prepare to exhale a broad cone of breath!", newline]);
}

function magic_shrink() {
  let prey = new Container();

  prey = getPrey(biome, macro.height * macro.height * 100, true);

  macro.shrunkPrey = prey;
  macro.shrunkPrey.mod_property("mass", x => x/1e2)

  let line = describe("magic-shrink", prey, macro, false, flat);
  let linesummary = summarize(prey.sum(), false);
  let preyMass = prey.sum_property("mass");
  let sound = getSound("magic", preyMass);

  update([sound, line, linesummary, newline]);

  return;
}

function magic_fast_digestion() {
  let line = "You infuse your depths with power, speeding your digestion.";

  if (macro.fastDigestTimer) {
    clearTimeout(macro.fastDigestTimer);
  }

  macro.fastDigestFactor = 3;
  macro.fastDigestTimer = setTimeout(function () { macro.fastDigestFactor = 1; macro.fastDigestTimer = null; update(["The digestion magic wears off...", newline]); }, 30000);
  update([line, newline]);
}

function magic_pause_digestion() {
  let line;

  if (macro.pauseDigest) {
    line = "You end the spell, and your body resumes its work.";
  } else {
    line = "Your magic halts your digestive processes.";
  }

  macro.pauseDigest = !macro.pauseDigest;

  update([line, newline]);
}

function magic_arousal() {
  let line = "Ooo";

  if (macro.maleParts && macro.femaleParts) {

  }

  update([line, newline]);

  macro_arousal_execute(100, 100);
}

function macro_arousal_execute(remaining, max) {
  if (remaining > 0) {
    macro.arouse(2 * remaining / max);
    setTimeout(() => macro_arousal_execute(remaining - 1, max), 25);
  }
}

function magic_fill_sexual() {
  let line = "Full up!";

  update([line, newline]);

  macro_fill_sexual_execute(100, 100);
}

function macro_fill_sexual_execute(remaining, max) {
  if (macro.maleParts) {
    macro.cumStorage.amount += macro.cumStorage.limit * 0.02 * remaining / max;
  }
  if (macro.femaleParts) {
    macro.femcumStorage.amount += macro.femcumStorage.limit * 0.02 * remaining / max;
  }

  if (remaining > 0) {
    setTimeout(() => macro_fill_sexual_execute(remaining - 1, max), 25);
  }
}

function wings_flap() {
  let area = macro.wingArea * 2;
  let prey = getPrey(biome, area, false);
  let line = describe("wings-flap", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("breath", preyMass);

  add_victim_people("wings-flap", prey);

  update([sound, line, linesummary, newline]);
}

function wings_vore() {
  let area = macro.wingArea * 2;
  let prey = getPrey(biome, area, false);
  let line = describe("wings-vore", prey, macro, verbose, flat);
  let linesummary = summarize(prey.sum(), true);

  let people = get_living_prey(prey.sum());

  let preyMass = prey.sum_property("mass");

  let sound = getSound("insert", preyMass);

  macro.wings.feed(prey);

  add_victim_people("wings-vore", prey);

  update([sound, line, linesummary, newline]);
}

function cooldown_start(name) {
  let button = document.querySelector("#" + "button-action-" + name);

  if (button.dataset.free) {
    return;
  }

  let parent = button.parentElement;

  let category = parent.id.replace("actions-", "");

  Array.from(parent.children).forEach(function (x) {
    x.disabled = true;
    x.classList.add("action-button-disabled");
  });

  cooldown(category, 100, 100);
}

function cooldown(category, time, timestart) {
  if (time <= 0) {
    cooldown_end(category);
  } else {
    let button = document.getElementById("action-part-" + category);

    let amount = Math.round((timestart - time) / timestart * 100);

    let unselect = dark ? "#111" : "#ddd";
    let select = dark ? "#444" : "#555";

    button.style.setProperty("background", "linear-gradient(to right, " + select + " 0%, " + select + " " + amount + "%, " + unselect + " " + amount + "%, " + unselect + " 100%");
    setTimeout(function () { cooldown(category, time - 1, timestart); }, 20);
  }

}

function cooldown_end(category) {

  let button = document.getElementById("action-part-" + category);

  button.style.setProperty("background", null);

  let parent = document.querySelector("#actions-" + category);

  Array.from(parent.children).forEach(function (x) {
    x.disabled = false;
    x.classList.remove("action-button-disabled");
  });
}

function transformNumbers(line, fixed = undefined) {
  return line.toString().replace(/[0-9]+(\.[0-9]+)?(e\+[0-9]+)?/g, function (text) { return number(text, numbers, fixed); });
}

function update(lines = [], active = true) {
  let log = active ? document.getElementById("log") : document.getElementById("react-log");

  let oldHeight = log.scrollHeight;

  lines.forEach(function (x) {
    let line = document.createElement('div');
    line.innerHTML = transformNumbers(x);
    log.appendChild(line);
  });

  if (lines.length > 0) {
    log.scrollTop = log.scrollHeight;

    let deltaHeight = log.scrollHeight - oldHeight;

    if (deltaHeight / window.innerHeight >= 0.2 && verbose && autoVerbose) {
      update(["Switching to concise text!", newline], false);
      autoVerbose = false;
      let button = document.querySelector("#button-option-toggle_verbose");

      toggle_verbose({ "target": button });
    }
  }

  document.getElementById("height").innerHTML = "Height: " + transformNumbers(length(macro.height, unit));
  document.getElementById("mass").innerHTML = "Mass: " + transformNumbers(mass(macro.totalMass, unit));

  if (macro.difficulty > 0) {
    document.getElementById("growth-points").innerHTML = "Growth points: " + macro.growthPoints;
  }
  applyPercentage("arousal", 150 - macro.arousal * 1.5);
  applyPercentage("orgasm", 150 - (macro.arousal - 100) * 1.5);
  applyPercentage("edge", 150 - macro.edge * 150);
  stylePercentage("cum", macro.cumStorage);
  stylePercentage("femcum", macro.femcumStorage);
  stylePercentage("milk", macro.milkStorage);
  stylePercentage("gas", macro.gasStorage);
  stylePercentage("piss", macro.pissStorage);
  stylePercentage("scat", macro.scatStorage);
}

function applyPercentage(name, meterPos) {
  meterPos = meterPos < 0 ? 0 : meterPos;
  document.querySelector("#" + name + "Meter .fill").style.setProperty("transform", "translate(0px, " + Math.round(meterPos) + "px)");

  let meter = document.querySelector("#" + name + "Meter");
  if (meterPos == 0) {
    meter.classList.add("shaking");
  } else {
    meter.classList.remove("shaking");
  }
}

function stylePercentage(name, storage) {
  document.getElementById(name).innerHTML = name + ": " + transformNumbers(volume(storage.amount, unit, false), 2);
  let meterPos = 150 - storage.amount / storage.limit * 150;
  applyPercentage(name, meterPos);
}

function pick_move() {
  let moving = false;
  let walkSpeed = macro.walkSpeed;
  let stepTime = 0;
  switch (strolling) {
    case strollingEnum.Standing:
      moving = false;
      break;
    case strollingEnum.Strolling:
      stepTime = (1 * (1 / walkSpeed) * 2000 * (1 + Math.log10(macro.scale)))
      moving = true;
      break;
    case strollingEnum.Jogging:
      stepTime = (1 / 2 * (1 / walkSpeed) * 2000 * (1 + Math.log10(macro.scale)))
      moving = true;
      break;
    case strollingEnum.Running:
      stepTime = (1 / 3 * (1 / walkSpeed) * 2000 * (1 + Math.log10(macro.scale)))
      moving = true;
      break;
  };
  setTimeout(pick_move, stepTime);
  if (!moving) {
    return;
  }

  stomp(false);
}
//Growth
//Automatic Growth

function grow_automatic(preyMass, part) {
  if (macro.automaticGrowthEnabled == true) {
    let preyMassBody = (preyMass * macro.preyGrowthFactor);

    if (part === "tail" && macro.tailGrowthFactor > 0) {
      preyMassBody = ((1 - macro.tailGrowthFactor) * macro.preyGrowthFactor * preyMass); //if growth factor is greater than 1, this function will behave oddly
      grow_tail((macro.tailGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "cock" && macro.cockGrowthFactor > 0) {
      preyMassBody = ((1 - macro.cockGrowthFactor) * macro.preyGrowthFactor * preyMass); //if growth factor is greater than 1, this function will behave oddly
      grow_dick((macro.cockGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "balls" && macro.ballGrowthFactor > 0) {
      preyMassBody = (1 - macro.ballGrowthFactor) * macro.preyGrowthFactor * preyMass; //if growth factor is greater than 1, this function will behave oddly
      grow_balls((macro.ballGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "bowels" && macro.assGrowthFactor > 0) {
      preyMassBody = (1 - macro.assGrowthFactor) * macro.preyGrowthFactor * preyMass; //if growth factor is greater than 1, this function will behave oddly
      grow_ass((macro.assGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "breasts" && macro.breastGrowthFactor > 0) {
      let preyMassBody = (1 - macro.breastGrowthFactor) * macro.preyGrowthFactor * preyMass; //if growth factor is greater than 1, this function will behave oddly
      grow_breasts((macro.breastGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "womb") {
      if (macro.wombGrowthFactor > 0) {
        preyMassBody = ((1 - macro.wombGrowthFactor) * macro.preyGrowthFactor * preyMass); //if growth factor is greater than 1, this function will behave oddly
        grow_womb((macro.wombGrowthFactor * macro.preyGrowthFactor * preyMass), false);

      } if (macro.vaginaGrowthFactor > 0) {
        preyMassBody = ((1 - macro.vaginaGrowthFactor) * macro.preyGrowthFactor * preyMassBody); //if growth factor is greater than 1, this function will behave oddly 
        grow_vagina((macro.vaginaGrowthFactor * macro.preyGrowthFactor * preyMass), false);
      }
    } else if (part === "paws" && macro.pawGrowthFactor > 0) {
      preyMassBody = ((1 - macro.pawGrowthFactor) * macro.preyGrowthFactor * preyMassBody); // if growth factor is greater than 1, this function will behave oddly 
      grow_paws((macro.pawGrowthFactor * macro.preyGrowthFactor * preyMass), false);

    } else if (part === "souls" && macro.soulGrowthFactor > 0) {
      preyMassBody = 0; //keeps body growth from running
      grow((preyMass * macro.soulGrowthFactor), false);

    } else if (part === "goo" && macro.gooGrowthFactor > 0) {
      preyMassBody = 0; //keeps body growth from running
      grow((preyMass * macro.gooGrowthFactor), false);

      //Body, runs after organ specific growth so organ specific growth factor kicks in. Doesn't run after goo or soul related growth
    } if (preyMassBody > 0) {
      grow(preyMassBody, false);
    }
  }
}

//Manual Growth
function grow_part_pick(id) {
  document.querySelector(".growth-part-active").classList.remove("growth-part-active");
  document.querySelector("#" + id).classList.add("growth-part-active");
}

function grow_pick(times) {
  const select = document.querySelector("#growth-part-select");
  const chosenPart = select.value;
  if (macro.difficulty > 0 && macro.growthPoints < (times - 1) * 10) {
    update(["You need " + times * 10 + " growth points to grow that much.", newline]);
  } else {
    if (macro.difficulty > 0) {
      macro.growthPoints -= (times - 1) * 10;
    }

    times /= 10;

    switch (chosenPart) {
      case "body": grow(times); break;
      case "paws": grow_paws(times); break;
      case "tail": grow_tail(times); break;
      case "ass": grow_ass(times); break;
      case "dick": grow_dick(times); break;
      case "balls": grow_balls(times); break;
      case "slit": grow_vagina(times); break;
      case "womb": grow_womb(times); break;
      case "breasts": grow_breasts(times); break;
      case "wings": grow_wings(times); break;
      case "musk": grow_musk(times); break;
      case "stench": grow_stench(times); break;
    }
  }
}

function grow(factor = 1, simpleCalc = true) {

  let oldHeight = macro.height;
  let oldMass = macro.mass;

  if (simpleCalc == true) {
    macro.scale *= factor;
  } else {
    macro.scale = Math.pow(((macro.mass + factor) / macro.baseMass), 1 / 3);
  }

  let heightDelta = macro.height - oldHeight;
  let massDelta = macro.mass - oldMass;

  update([pickString("Power surges through you", "Your body surges upward", "Your muscles fight for space", "Energy flows into you", "You feel your body expand", "Your surroundings appear to shink", "Your muscles tense", "You almost lose your balance", "A warm sensation fills you", "You feel \
  a buzz of power") + " as you grow " + length(heightDelta, unit) + " taller and gain " + mass(massDelta, unit) + " of mass.", newline]);
}

function grow_paws(factor, simpleCalc = true) {

  let oldArea = macro.pawArea;

  if (simpleCalc == true) {
    macro.pawScale *= factor;
  } else {
    let volumeChangerPart = (((Math.pow(macro.pawWidth, 2) * macro.pawLength * macro.pawDensity) + factor) / (3 * macro.pawDensity));
    //mass = volume*density. Since we know what we want our mass to be, we can figure out how much volume the final paw should have
    let scaleChangerPart = ((3 * volumeChangerPart) / (Math.pow(macro.basePawWidth, 2) * macro.basePawLength));
    macro.pawScale = (Math.pow(scaleChangerPart, 1 / 3) / macro.scale);
    // volume = 1/3 basewidth^2 * baselength *scale^3 *pawscale^3
  }

  let areaDelta = macro.pawArea - oldArea;

  update([(pickString("Power surges through you", "Energy flows into you", "You feel your " + macro.footDesc(true) + " expand", "Your muscles tense", "A warm sensation fills you", "You feel a buzz of power")) + " as your \
  " + macro.footOnlyDesc(true) + pickString(" grow,", " push the ground apart,", " sink deeper into the soil,") + " gaining " + area(areaDelta, unit, false) + " of area.", newline]);
}

function grow_tail(factor, simpleCalc = true) {

  let oldLength = macro.tailLength;
  let oldMass = macro.tailMass;

  if (simpleCalc == true) {
    macro.tailScale *= factor;
  } else {
    let volumeChangerPart = (macro.tailMass + (factor / macro.tailCount)) / macro.tailDensity;
    let scaleChangerPart = (volumeChangerPart / ((Math.pow(macro.baseTailDiameter / 2, 2)) * Math.PI * macro.baseTailLength * (Math.pow(macro.scale, 3))));
    macro.tailScale = Math.pow(scaleChangerPart, 1 / 3);
    // (tailVolume/((macro.baseTailDiameter/2)^2 * Math.PI * macro.baseTailLength * macro.scale^3)) = macro.tailScale^3
  }

  let lengthDelta = macro.tailLength - oldLength;
  let massDelta = macro.tailMass - oldMass;

  update([pickString("Power surges through you", "Energy flows into you", "You feel your tail twitch", "Your muscles tense", "Your balance shifts", "A warm sensation fills you", "You feel a buzz of power") + " as your " + macro.tailType + " tail grows " + length(lengthDelta, unit, false) + " longer and gains " + mass(massDelta, unit, false) + " of mass.", newline]);
}

function grow_dick(factor, simpleCalc = true) {

  let oldLength = macro.dickLength;
  let oldMass = macro.dickMass;

  if (simpleCalc == true) {
    macro.dickScale *= factor;
  } else {
    let volumeChangerPart = ((macro.dickMass + factor) / macro.dickDensity);
    let scaleChangerPart = (volumeChangerPart / (Math.pow(macro.baseDickDiameter / 2, 2) * Math.PI * Math.pow(macro.scale, 3) * macro.baseDickLength * Math.pow(macro.arousalDickFactor, 3)));
    macro.dickScale = Math.pow(scaleChangerPart, 1 / 3);
    // dickScale^3 = volume/ pi * baseDickRadius^2 * macro.scale^3 * baseDickLength * arousalDickFactor^3
  }

  let lengthDelta = macro.dickLength - oldLength;
  let massDelta = macro.dickMass - oldMass;

  update([pickString("Power surges through you", "Energy flows into you", "You feel your cock throb", "Your muscles tense", "You feel your loins buzz with energy", "A warm sensation fills you", "You feel a buzz of power") + " as your " + macro.dickType + " cock grows " + length(lengthDelta, unit, false) + " longer and gains " + mass(massDelta, unit, false) + " of mass.", newline]);
}

function grow_balls(factor, simpleCalc = true) {

  let oldDiameter = macro.ballDiameter;
  let oldMass = macro.ballMass;

  if (simpleCalc == true) {
    macro.ballScale *= factor;
  } else {
    let volumeChangerPart = (macro.ballMass + factor) / macro.ballDensity;
    let scaleChangerPart = Math.pow((6 * volumeChangerPart / Math.PI), 1 / 3)
    macro.ballScale = scaleChangerPart / (macro.baseBallDiameter * macro.scale);
    // (6 * volume / pi)^1/3 = base ball diam * scale *ballScale
  }

  let diameterDelta = macro.ballDiameter - oldDiameter;
  let massDelta = macro.ballMass - oldMass;

  update([pickString("Power surges through you", "Energy flows into you", "You feel an unfamiliar weight in your sack", "You sack pushes your thighs further apart", "Your muscles tense", "You feel your loins buzz with energy", "You feel a buzz of power", "A warm sensation fills you") + " as your balls swell by " + length(diameterDelta, unit, false) + ", gaining " + mass(massDelta, unit, false) + " of mass apiece.", newline]);
}

function grow_breasts(factor, simpleCalc = true) {

  let oldDiameter = macro.breastDiameter;
  let oldMass = macro.breastMass;

  if (simpleCalc == true) {
    macro.breastScale *= factor;
  } else {
    let volumeChangerPart = (factor + macro.breastMass) / macro.breastDensity;
    let scaleChangerPart = Math.pow((6 * volumeChangerPart / Math.PI), 1 / 3)
    macro.breastScale = scaleChangerPart / (macro.baseBreastDiameter * macro.scale);
    // (6 * volume / pi)^1/3 = base ball diam * scale * ballScale
  }

  let diameterDelta = macro.breastDiameter - oldDiameter;
  let massDelta = macro.breastMass - oldMass;

  update([pickString("Power surges through you", "Energy flows into you", "You feel an unfamilliar weight on your chest", "Your balance shifts", "Your muscles tense", "You feel a buzz of power", "A warm sensation fills you") + " as your breasts swell by " + length(diameterDelta, unit, false) + ", gaining " + mass(massDelta, unit, false) + " of mass apiece.", newline]);
}

function grow_vagina(factor, simpleCalc = true) {

  let oldLength = macro.vaginaLength;

  if (simpleCalc == true) {
    macro.vaginaScale *= factor;
  } else {
    let volumeChangerPart = ((macro.vaginaVolume * macro.wombDensity) + factor) / macro.wombDensity;
    let scaleChangerPart = (volumeChangerPart / (Math.pow(macro.baseVaginaWidth, 2) * macro.baseVaginaLength));
    macro.vaginaScale = (Math.pow(scaleChangerPart, 1 / 3) / macro.scale);
    //vaginaVolume = baseVaginaWidth^2 * baseVaginaLength * (vaginaScale * macro.scale)^3
  }

  let lengthDelta = macro.vaginaLength - oldLength;

  update([pickString("Power surges through you", "Energy flows into you", "You feel your loins buzz with energy", "Your muscles tense", "You feel a buzz of power", "A warm sensation fills you") + " as your moist slit expands by " + length(lengthDelta, unit, false) + ".", newline]);
}

function grow_womb(factor, simpleCalc = true) {

  let oldVolume = macro.wombVolume;

  if (simpleCalc == true) {
    macro.wombScale *= factor;
  } else {
    let volumeChangerPart = ((macro.wombVolume * macro.wombDensity) + factor) / macro.wombDensity;
    let scaleChangerPart = (volumeChangerPart / macro.baseWombVolume);
    macro.wombScale = (Math.pow(scaleChangerPart, 1 / 3) / macro.scale);
    //wombVolume = baseWombVolume * (wombScale * macro.scale)^3
  }

  let volumeDelta = macro.wombVolume - oldVolume;

  update([pickString("Power surges through you", "Energy flows into you", "You feel your loins buzz with energy", "You feel your muscles tense", "You feel a buzz of power", "A warm sensation fills you") + " as your womb grows larger, gaining " + volume(volumeDelta, unit, false) + " of capacity.", newline]);
}

function grow_ass(factor, simpleCalc = true) {

  let oldDiameter = Math.pow(macro.assArea, 1 / 2);

  if (simpleCalc == true) {
    macro.assScale *= factor;
  } else {
    macro.assScale = (macro.assScale + (factor / macro.mass)); //this is a hack, but the commented out block below doesn't work

    //This Code is broken and I dont know why:
    //let radiusPart = Math.pow((macro.assArea/(4 * Math.PI)), 1/2);
    //let volumeChangerPart = (preyMassPart + (((4 * Math.PI)/3) * Math.pow(radiusPart, 3) * macro.assDensity) / macro.assDensity);
    //volume=(mass1+mass2)/density. Mass2 is calcualted from volume*density   this is modeling the ass as a sphere(2 hemispheres)
    //let scaleChangerPart = ((Math.pow(((3/(4 * Math.PI)) * volumeChangerPart), 2/3) * 4 * Math.PI) / (macro.baseAssArea * Math.pow(macro.scale, 2)));
    //macro.assScale = scaleChangerPart;
    //V=4/3((baseassArea*scale^2*AssScale)/4pi)^3/2
  }

  let diameterDelta = Math.pow(macro.assArea, 1 / 2) - oldDiameter;

  update([pickString("Power surges through you", "Energy flows into you", "You feel your rear fill with power", "You feel your rear plump out", "You feel your rear expand", "Your muscles tense", "Your balance shifts", "You feel a buzz of power", "A warm sensation fills you") + " as your ass swells by " + length(diameterDelta, unit, false) + ".", newline]);
}

function grow_wings(factor, simpleCalc = true) {

  let oldLength = macro.wingLength;

  if (simpleCalc == true) {
    macro.wingScale *= factor;
  } else {
    macro.wingScale = (macro.wingScale + (factor / macro.mass))
  }

  let lengthDelta = macro.wingLength - oldLength;

  update([pickString("Power surges through you", "Energy flows into you", "Your back muscles fight for space", "Your muscles tense", "A crackeling fills the air", "Your balance shifts", "You feel a buzz of power", "A warm sensation fills you") + " as your " + macro.wingDesc + " wings grow, gaining " + length(2 * lengthDelta, unit, false) + " of wingspan.", newline]);
}

function grow_musk(factor, simpleCalc = true) {

  let oldScale = macro.muskScale;

  if (simpleCalc == true) {
    macro.muskScale *= factor;
  } else {
    macro.muskScale = (macro.muskScale + (factor / Math.pow(macro.mass, 1 / 3)))
  }

  let scaleDelta = macro.muskScale - oldScale;

  update([pickString("Power surges through you", "Energy flows into you", "A crackeling fills the air", "Your balance shifts", "You feel a buzz of power", "A warm sensation fills you") + " as your musk thickens, growing more potent.", newline]);
}

function grow_stench(factor, simpleCalc = true) {

  let oldScale = macro.muskScale;

  if (simpleCalc == true) {
    macro.stenchScale *= factor;
  } else {
    macro.stenchScale = (macro.stenchScale + (factor / Math.pow(macro.mass, 1 / 3)))
  }

  let scaleDelta = macro.stenchScale - oldScale;

  update([pickString("Power surges through you", "Energy flows into you", "A crackeling fills the air", "Your balance shifts", "You feel a buzz of power", "A warm sensation fills you") + " as your stench thickens, growing more potent.", newline]);
}

function resetSettings() {
  document.forms.namedItem("custom-species-form").reset();
  reset_visible_groups();
  updateAllPreviews();
}

function loadPreset() {
  resetSettings();

  let select = document.getElementById("character-presets");

  loadSettings(presets[select.selectedIndex]);
}

function grabFormData(form, warnings, panels, buttons, stats, parts) {

  // verify that this input box is in something we enabled


  let parent = form.parentElement;


  while (true) {
    if (parent.id == "custom-species") {
      break;
    }

    if (parent.classList.contains("reveal-if-active")) {
      let sib = parent.previousSibling.previousSibling;

      if (!sib.checked) {
        return;
      }
    }

    parent = parent.parentElement;

  }

  if (form.hasAttribute("data-warning")) {
    warnings.push(form.getAttribute("data-warning"));
  }

  if (form.hasAttribute("data-buttons")) {
    let text = form.getAttribute("data-buttons");

    text.split(",").forEach(function (token) {
      buttons.push(token);
    })
  }

  if (form.hasAttribute("data-panels")) {
    let text = form.getAttribute("data-panels");

    text.split(",").forEach(function (token) {
      panels.push(token);
    })
  }

  if (form.hasAttribute("data-stats")) {
    let text = form.getAttribute("data-stats");

    text.split(",").forEach(function (token) {
      stats.push(token);
    })
  }

  if (form.hasAttribute("data-parts")) {
    let text = form.getAttribute("data-parts");

    text.split(",").forEach(function (token) {
      parts.push(token);
    })
  }
}

// if diff is true, only record settings that are
// different from the defaults!

function generateSettings(diff = false) {
  let form = document.forms.namedItem("custom-species-form");
  let settings = {};

  let warnings = [];
  let panels = [];
  let buttons = [];
  let stats = [];
  let parts = [];

  for (let i = 0; i < form.length; i++) {
    let value = form[i].value == "" ? form[i].placeholder : form[i].value;
    if (form[i].type == "text")
      settings[form[i].name] = value;
    else if (form[i].type == "number") {
      if (form[i].dataset.unit == "percentage") {
        settings[form[i].name] = parseFloat(value) / 100;
      } else if (form[i].dataset.unit == "volume") {
        settings[form[i].name] = parseFloat(value) / 1000;
      } else {
        settings[form[i].name] = parseFloat(value);
      }
    }
    else if (form[i].type == "checkbox") {
      settings[form[i].name] = form[i].checked;

      if (form[i].checked) {
        grabFormData(form[i], warnings, panels, buttons, stats, parts);
      }


    } else if (form[i].type == "radio") {
      let name = form[i].name;
      if (form[i].checked) {
        settings[name] = form[i].value;
        grabFormData(form[i], warnings, panels, buttons, stats, parts);
      }

    } else if (form[i].type == "select-one") {
      settings[form[i].name] = form[i][form[i].selectedIndex].value;
      grabFormData(form[i][form[i].selectedIndex], warnings, panels, buttons, stats, parts);
    }

  }

  if (diff) {
    options.forEach(panel => {
      recurseDeletePanel(settings, panel);
    })
  }

  return {
    "settings": settings,
    "warnings": warnings,
    "panels": panels,
    "buttons": buttons,
    "stats": stats,
    "parts": parts
  };
}

function recurseDeletePanel(settings, panel) {
  if (panel.id && panel.optional && !settings[panel.id]) {
    delete settings[panel.id];
  }
  panel.entries.forEach(option => {
    if (option.type == "subcategory") {
      if (settings[option.id] == option.default || (!settings[option.id] && option.default === undefined)) {
        delete settings[option.id];
      }
      recurseDeletePanel(settings, option);
    } else if (settings[option.id] == undefined) {
      delete settings[option.id];
    } else if (option.type == "checkbox" && !settings[option.id] && option.default === undefined) {
      delete settings[option.id];
    } else {
      if (option.unit == "percentage") {
        if (settings[option.id] * 100 == option.default)
          delete settings[option.id];
      }

      else if (option.unit == "volume") {
        if (settings[option.id] * 1000 == option.default)
          delete settings[option.id];
      }

      else if (settings[option.id] == option.default && option.id != "name") {
        delete settings[option.id];
      }
    }
  })

}
function clearExport() {
  document.getElementById("export-area").value = "";
}

function exportSettings() {
  let settings = generateSettings(true)["settings"];

  document.getElementById("export-area").value = JSON.stringify(settings);
}

function importSettings() {
  try {
    let text = document.getElementById("export-area").value;

    if (text == "") {
      return;
    }

    let settings = JSON.parse(text);

    resetSettings();

    loadSettings(settings);
  } catch (err) {
    alert("Bad character data!");
  }
}

function updateCustomCharacters() {
  let select = document.querySelector("#custom-characters");
  select.innerHTML = "";

  let saves = JSON.parse(storage.getItem("custom-characters"));

  let names = Object.entries(saves).map(function ([name, contents]) {
    return name;
  });

  names.sort(function (x, y) { return x.localeCompare(y); });

  if (Object.keys(saves).length == 0) {
    let none = document.createElement("option");
    none.innerText = "No characters to load";

    select.appendChild(none);

    return;
  } else {
    names.forEach(function (name) {
      let entry = document.createElement("option");
      entry.value = name;
      entry.innerText = name;

      select.appendChild(entry);
    });
  }
}

function saveSettings() {
  let storage = window.localStorage;

  let settings = generateSettings()["settings"];

  let saves = JSON.parse(storage.getItem("custom-characters"));

  saves[settings.name] = settings;

  storage.setItem('custom-characters', JSON.stringify(saves));

  updateCustomCharacters();
}

function deleteSettings() {
  let select = document.querySelector("#custom-characters");
  let name = select.options[select.selectedIndex].value;

  let settings = JSON.parse(storage.getItem('custom-characters'));

  if (settings[name] != undefined && confirm("Really delete " + name + "?")) {
    let settings = JSON.parse(storage.getItem('custom-characters'));
    delete settings[name];
    localStorage.setItem("custom-characters", JSON.stringify(settings));
    updateCustomCharacters();
  }
}

function loadAutosave() {
  if (window.localStorage.getItem('autosave') == null)
    return;

  loadSettings(JSON.parse(window.localStorage.getItem('autosave')));
}

function loadSettings(settings = null) {

  if (settings == null) {

    let storage = window.localStorage;

    let select = document.querySelector("#custom-characters");

    let name = select.options[select.selectedIndex].value;

    settings = JSON.parse(storage.getItem('custom-characters'))[name];

    if (settings == undefined) {
      return;
    }
  }

  migrate(settings);

  reset_visible_groups();

  let form = document.forms.namedItem("custom-species-form");

  for (let i = 0; i < form.length; i++) {
    if (settings[form[i].name] != undefined) {
      if (form[i].type == "text")
        form[i].value = settings[form[i].name];
      else if (form[i].type == "number") {
        if (form[i].dataset.unit == "percentage") {
          form[i].value = settings[form[i].name] * 100;
        } else if (form[i].dataset.unit == "volume") {
          form[i].value = settings[form[i].name] * 1000;
        } else {
          form[i].value = settings[form[i].name];
        }
      }

      else if (form[i].type == "checkbox") {
        form[i].checked = settings[form[i].name];

        options.forEach(option => {
          if (option.group && option.group != "main" && option.id == form[i].name && settings[form[i].name]) {
            document.querySelector("#group-toggle-" + option.group).checked = true;
          }
        })
      } else if (form[i].type == "radio") {
        let name = form[i].name;
        form[i].checked = (settings[name] == form[i].value);
      } else if (form[i].type == "select-one") {
        for (let j = 0; j < form[i].length; j++) {
          if (form[i][j].value == settings[form[i].name]) {
            form[i].selectedIndex = j;
            break;
          }
        }
      }
    }
  }
  updateAllPreviews();
  update_visible_groups();
}

function add_victim_people(category, prey) {
  victims[category]["people"] += get_living_prey(prey.sum());

  macro.growthPoints += get_living_prey(prey.sum()) * 100 / (1 + Math.log10(macro.scale));
}

function enable_victim(category) {
  victims[category] = {};
  victims[category]["people"] = 0;
}

function enable_button(name) {
  document.getElementById("button-action-" + name).style.display = "inline";
}

function disable_button(name) {
  document.getElementById("button-action-" + name).style.display = "none";
}

function enable_panel(name) {
  document.getElementById("action-part-" + name).style.display = "inline";
}

function enable_stat(name) {
  document.getElementById(name).style.display = 'block';
  document.querySelector("#" + name + "Meter").style.display = 'inline-block';
}

function enable_growth_part(name) {
  document.querySelector("#option-growth-" + name).style.display = 'block';
}

function disable_button(name) {
  document.getElementById("button-action-" + name).style.display = "none";
}

function disable_panel(name) {
  document.getElementById("action-part-" + name).style.display = "none";
}

function startGame(e) {
  if (started)
    return;

  started = true;

  window.localStorage.setItem('autosave', JSON.stringify(generateSettings()["settings"]));

  let info = generateSettings();

  let settings = info["settings"];

  let warns = info["warnings"];

  info["panels"].forEach(function (panel) {
    enable_panel(panel);
  });

  info["buttons"].forEach(function (button) {
    enable_button(button);
  });

  info["stats"].forEach(function (stat) {
    enable_stat(stat);
  });

  info["parts"].forEach(function (part) {
    enable_growth_part(part);
  });

  for (var key in settings) {
    if (settings.hasOwnProperty(key)) {
      macro[key] = settings[key];
    }
  }

  registerActions();
  registerOptions();

  if (!macro.hasTail) {
    macro.tailCount = 0;
  }

  victim_keys.forEach(function (key) {
    enable_victim(key.replace("victim-", ""));
  });

  enable_growth_part("paws");

  document.getElementById("log-area").style.display = 'inline';
  document.getElementById("character-build-area").style.display = 'none';
  document.getElementById("action-panel").style.display = 'flex';

  enable_panel("options");

  enable_panel("body");

  enable_panel("paws");

  enable_button("stomp");
  enable_button("hand_crush");
  enable_button("foot_crush");
  enable_button("sit");
  enable_button("grind");
  enable_button("ass_grind");

  if (macro.footType != "hoof")
    enable_button("flex_toes");


  enable_growth_part("body");
  enable_growth_part("ass");

  if (macro.arousalEnabled) {
    document.querySelector("#arousalMeter").style.display = 'inline-block';
    document.querySelector("#orgasmMeter").style.display = 'inline-block';
    document.querySelector("#edgeMeter").style.display = 'inline-block';
  }

  if (macro.oralVore) {

    if (macro.brutality > 0) {
      enable_button("chew");
    }
  }

  if (macro.tailCount > 0) {
    enable_panel("tails");

    if (macro.tailMaw) {
      if (macro.tailCount > 1) {
        enable_button("tail_vore_one");
        if (macro.tailCount > 2) {
          enable_button("tail_vore_some");
        }
        enable_button("tail_vore_all");
      } else {
        enable_button("tail_vore_only");
      }
    }
  }

  if (macro.hasPouch) {
    if (macro.oralVore) {
      enable_button("pouch_eat");
    }
  }

  if (macro.footWear) {
    macro.footShoeWorn = macro.footShoeEnabled;
    macro.footSockWorn = macro.footSockEnabled;

    footwearUpdate();
  }

  if (macro.gooEnabled) {
    macro.gooMolten = false;
  }

  document.getElementById("button-option-toggle_arousal").innerHTML = (macro.arousalEnabled ? "Arousal On" : "Arousal Off");
  if (!macro.arousalEnabled) {
    document.getElementById("arousal").style.display = "none";
    document.getElementById("edge").style.display = "none";
  }

  document.getElementById("button-option-toggle_units").innerText = "Units:\n" + unit.charAt(0).toUpperCase() + unit.slice(1); //sets units button to display selected unit on start

  if (macro.victimsHuman) {
    // eh this is ok
    things["Person"]["Person"] = Human;
  }

  if (macro.victimsMacros) {
    contents_insert("Town", "Macro", 2, 5);
    contents_insert("City", "Macro", 5, 20);
    contents_insert("Continent", "Macro", 100, 300);
  }

  macro.init();

  switch (macro.defaultBiome) { //sets starting biome as defined by player
    case "City":
      biome = biomeEnum.City;
      break;
    case "Downtown":
      biome = biomeEnum.Downtown;
      break;
    case "Suburb":
      biome = biomeEnum.Suburb;
      break;
    case "Rural":
      biome = biomeEnum.Rural;
      break;
  }

  generateBiome();

  update(warns);

  if (warns.length > 0) {
    update([newline]);
  }

  document.getElementById("actions-body").style.display = 'flex';
  document.getElementById("stat-container").style.display = 'flex';

  repeatUpdate();

  window.scroll(0, 0);
}

function repeatUpdate() {
  update();
  setTimeout(repeatUpdate, fillPeriod);
}

function actionTab(e) {
  let name = e.target.id;

  let target = "actions-" + name.replace(/action-part-/, "");

  document.querySelectorAll(".action-part-button.active").forEach(function (element) {
    element.classList.remove("active");
  });
  document.querySelectorAll(".action-tab").forEach(function (element) {
    element.style.display = "none";
  });

  e.target.classList.add("active");
  document.getElementById(target).style.display = "flex";
}

function showStats() {
  let lines = [];

  let total = 0;
  for (var key in victims) {
    if (victims.hasOwnProperty(key)) {
      if (victims[key]["people"] > 0) {
        lines.push([
          victims[key]["people"] + " " + describeVictim("victim-" + key, macro),
          victims[key]["people"]
        ]);
        total += victims[key]["people"];
      }
    }
  }

  // sort in descending order of kills/victims
  lines = lines.sort(function (x, y) {
    if (x[1] == y[1]) {
      return 0;
    } else {
      return x[1] > y[1] ? -1 : 1;
    }
  });

  lines = lines.map(function (x) {
    return x[0];
  });

  if (macro.brutality > 0) {
    lines.splice(0, 0, "Kills:");
  } else {
    lines.splice(0, 0, "Victims:");
  }

  lines.push("Total: " + total);
  lines.push(newline);
  update(lines);
}

function registerActions() {
  let buttons = document.querySelectorAll("[id^='button-action']");

  buttons.forEach(function (button) {
    let name = button.id;
    name = name.replace(/button-action-/, "");
    if (macro.difficulty > 0) {
      button.addEventListener("click", function () { cooldown_start(name); window[name](); });
    } else {
      button.addEventListener("click", function () { window[name](); });
    }

  });
}

function registerOptions() {
  let buttons = document.querySelectorAll("[id^='button-option']");

  buttons.forEach(function (button) {
    let name = button.id;
    name = name.replace(/button-option-/, "");
    button.addEventListener("click", function (e) { window[name](e); });

  });
}

function updateAllPreviews() {
  document.querySelectorAll(".preview").forEach(function (prev) {
    let name = prev.id.replace("Preview", "");
    updatePreview(name);
  });
}

function updatePreview(name) {
  let scale = document.getElementById("scale").value;
  if (scale == "")
    scale = document.getElementById("scale").placeholder;

  let element = document.getElementById(name);

  if (element == undefined)
    return;

  let value = element.value;
  let unitType = document.getElementById(name).dataset.unit;

  if (value == "")
    value = document.getElementById(name).placeholder;

  let result = "";

  if (unitType == undefined)
    return;

  if (unitType == "length")
    result = length(value * scale, unit);
  else if (unitType == "area")
    result = area(value * scale * scale, unit);
  else if (unitType == "volume")
    result = volume(value * scale * scale * scale / 1000, unit);
  else if (unitType == "mass")
    result = mass(value * scale * scale * scale, unit);
  else if (unitType == "percentage")
    result = value + "%";
  document.getElementById(name + "Preview").innerHTML = result;
}

function toggleTextFade() {
  textFade = textFadeChoices[textFade.next];

  const button = document.querySelector("#button-option-toggleTextFade");
  button.innerText = textFade.name;

  document.querySelectorAll(".log").forEach(log => log.style.setProperty("--fade-animation", textFade.animation));

}

function debugLog() {
  console.log("Your character settings:");
  console.log(JSON.stringify(generateSettings()["settings"]));
  console.log("Current macro state:");
  console.log(JSON.stringify(macro, function (key, value) {
    if (key == 'owner') { return "owner"; }
    else { return value; }
  }));
  alert("Debug info has been logged to console. Press F12, click \"Console\", and copy all the text");
}

window.addEventListener('load', function (event) {

  (function () {
    let storage = window.localStorage;

    if (storage.getItem("dark-mode") != null) {
      setDarkMode(storage.getItem("dark-mode") === "true");
    }
  }());

  if (storage.getItem("custom-characters") == undefined) {
    storage.setItem("custom-characters", JSON.stringify({}));
  }

  // this migrates the old single custom character slot over
  if (storage.getItem("settings") != undefined) {
    let character = JSON.parse(storage.getItem("settings"));

    let saves = JSON.parse(storage.getItem("custom-characters"));

    saves[character.name] = character;

    localStorage.setItem("custom-characters", JSON.stringify(saves));
    localStorage.removeItem("settings")
  }

  updateCustomCharacters();

  document.querySelectorAll(".version").forEach(function (x) {
    x.innerText = "Version: " + version;
  });

  construct_options();
  construct_panels();

  document.querySelector("#save-version").setAttribute("placeholder", migrations.length);

  document.querySelectorAll("input[type='number']").forEach(function (x) {
    x.addEventListener("input", function () { updatePreview(x.id); });
  });

  updateAllPreviews();

  document.querySelector("#scale").addEventListener("input", updateAllPreviews);

  presets.sort(function (x, y) {
    let xp = x.priority === undefined ? 0 : x.priority;
    let yp = y.priority === undefined ? 0 : y.priority;

    if (xp != yp) {
      return yp - xp;
    } else {
      return x.name.localeCompare(y.name);
    }

  });

  let category_list = document.getElementById("character-preset-categories");

  presetCategories.forEach(name => {
    let opt = document.createElement("option");
    opt.innerHTML = name;
    opt.value = name;
    category_list.appendChild(opt);
  });

  category_list.addEventListener("change", updatePresets);

  let list = document.getElementById("character-presets");

  for (let i = 0; i < presets.length; i++) {
    let opt = document.createElement("option");
    opt.innerHTML = presets[i]["name"];
    opt.dataset.category = presets[i].category || "default";
    opt.value = i;
    list.appendChild(opt);
  }

  updatePresets();
  register_buttons();
  update_visible_groups();

  setTimeout(pick_move, 2000);
});

function updatePresets(e) {
  const list = document.getElementById("character-presets");
  const category_list = document.getElementById("character-preset-categories");

  Array.from(list.options).forEach(x => {
    if (x.dataset.category == category_list.value) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  });

  if (list.selectedOptions[0].style.display == "none") {
    for (let i = 0; i < list.options.length; i++) {
      if (list.options[i].style.display != "none") {
        list.selectedIndex = i;
        break;
      }
    }
  }
};

function reset_visible_groups() {
  groups.forEach(group => {
    document.querySelector("#group-toggle-" + group).checked = false;
  });
  update_visible_groups();
}
function update_visible_groups() {

  groups.forEach(group => {
    const state = document.querySelector("#group-toggle-" + group).checked;
    document.querySelectorAll(".sheet-group-" + group).forEach(category => {
      if (state)
        category.style.display = "";
      else
        category.style.display = "none";
    });
  });
}

function register_buttons() {

  document.querySelectorAll(".action-part-button").forEach(function (element) {
    element.addEventListener("click", actionTab);
  });

  document.getElementById("button-look").addEventListener("click", look);
  document.getElementById("button-stats").addEventListener("click", showStats);

  document.getElementById("button-dark-mode-options").addEventListener("click", toggleDarkMode);
  document.querySelectorAll(".growth-part").forEach(function (button) {
    button.addEventListener("select", function () { grow_part_pick(button.id); });
  });

  document.getElementById("button-growth-1.1").addEventListener("click", function () { grow_pick(11); });
  document.getElementById("button-growth-1.5").addEventListener("click", function () { grow_pick(15); });
  document.getElementById("button-growth-2").addEventListener("click", function () { grow_pick(20); });
  document.getElementById("button-growth-5").addEventListener("click", function () { grow_pick(50); });
  document.getElementById("button-growth-20").addEventListener("click", function () { grow_pick(200); });
  document.getElementById("button-growth-100").addEventListener("click", function () { grow_pick(1000); });

  document.getElementById("button-load-preset").addEventListener("click", loadPreset);

  document.getElementById("button-export-clear").addEventListener("click", clearExport);
  document.getElementById("button-export-preset").addEventListener("click", exportSettings);
  document.getElementById("button-import-preset").addEventListener("click", importSettings);

  document.getElementById("button-reset-custom").addEventListener("click", resetSettings);
  document.getElementById("button-load-autosave").addEventListener("click", loadAutosave);

  document.getElementById("button-units-options").addEventListener("click", toggle_units_options)

  // note to self - the anonymous function is so that
  // loadSettings doesn't receive the mouseEvent!

  document.getElementById("button-load-custom").addEventListener("click", function () { loadSettings(); });
  document.getElementById("button-save-custom").addEventListener("click", function () { saveSettings(); });
  document.getElementById("button-delete-custom").addEventListener("click", function () { deleteSettings(); });
  document.getElementById("button-start").addEventListener("click", startGame);
}
function render_text_option(li, option) {
  let input = document.createElement("input");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("id", option.id);
  input.setAttribute("name", option.id);
  input.setAttribute("type", "text");

  if (option.default) {
    input.setAttribute("placeholder", option.default);
  }

  let label = document.createElement("label");
  label.setAttribute("for", option.id);
  label.innerText = option.name;

  li.appendChild(label);
  li.appendChild(input);
}

function render_number_option(li, option, type) {
  let input = document.createElement("input");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("id", option.id);
  input.setAttribute("name", option.id);
  input.setAttribute("type", "number");

  if (type == "int") {
    input.setAttribute("step", "1");
    input.setAttribute("pattern", "\\d*");
  } else if (type == "float") {
    input.setAttribute("step", "any");
  }


  if (option.default) {
    input.setAttribute("placeholder", option.default);
  }


  let label = document.createElement("label");
  label.setAttribute("for", option.id);
  label.innerText = option.name;

  if (option.tooltip != undefined) {
    label.classList.add("has-tooltip");
    label.setAttribute("title", option.tooltip);
  }

  li.appendChild(label);
  li.appendChild(input);

  if (option.unit) {
    input.setAttribute("data-unit", option.unit);

    let unit = document.createElement("div");

    unit.classList.add("preview");
    unit.id = option.id + "Preview";
    li.appendChild(unit);
  }
}

function render_float_option(li, option) {
  render_number_option(li, option, "float");
}

function render_int_option(li, option) {
  render_number_option(li, option, "int");
}

//sets up style for "radio" in features.js
function render_radio_option(options_div, option) {
  option.choices.forEach(function (choice) {
    let li = document.createElement("li");

    let input = document.createElement("input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("id", option.id + "-" + choice.value);
    input.setAttribute("name", option.id);
    input.setAttribute("value", choice.value);
    input.setAttribute("type", "radio");

    if (option.default == choice.value) {
      input.setAttribute("checked", true);
    }

    let label = document.createElement("label");
    label.setAttribute("for", option.id + "-" + choice.value);
    label.innerText = choice.name;

    label.classList.add("solo")

    if (choice.tooltip) {
      label.classList.add("has-tooltip")
      label.title = choice.tooltip;
    }

    attach_form_data(input, choice);

    li.appendChild(input);
    li.appendChild(label);
    options_div.appendChild(li);

  });
}

//sets up style for "checkbox" in features.js
function render_checkbox_option(li, option) {

  let input = document.createElement("input");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("id", option.id);
  input.setAttribute("name", option.id);
  input.setAttribute("type", "checkbox");

  if (option.default) {
    input.setAttribute("checked", true);
  }

  let label = document.createElement("label");
  label.setAttribute("for", option.id);
  label.innerText = option.name;

  label.classList.add("solo");

  attach_form_data(input, option);

  if (option.tooltip != undefined) {
    label.classList.add("has-tooltip");
    label.setAttribute("title", option.tooltip);
  }

  li.appendChild(input);
  li.appendChild(label);
}

function render_select_option(li, option) {
  let label = document.createElement("label");
  label.setAttribute("for", option.id);
  label.innerText = option.name;

  let select = document.createElement("select");
  select.setAttribute("id", option.id);
  select.setAttribute("name", option.id);

  option.choices.forEach(function (choice) {
    let sub_option = document.createElement("option");
    sub_option.innerText = choice.name;
    sub_option.setAttribute("value", choice.value);

    if (option.default == choice.value) {
      sub_option.defaultSelected = true;
    }
    select.appendChild(sub_option);
  });

  if (option.tooltip != undefined) {
    label.classList.add("has-tooltip");
    label.setAttribute("title", option.tooltip);
  }

  li.appendChild(label);
  li.appendChild(select);
}

function render_subcategory_option(li, option) {
  let sub_div = document.createElement("div");
  sub_div.classList.add("custom-category-sub");

  let sub_ul = document.createElement("ul");
  sub_ul.classList.add("flex-outer-sub");

  let sub_input = document.createElement("input");
  sub_input.classList.add("custom-header-checkbox");
  sub_input.id = option.id;
  sub_input.setAttribute("name", option.id);
  sub_input.setAttribute("type", "checkbox");

  if (option.default === true) {
    sub_input.setAttribute("checked", true);
  }

  let sub_label = document.createElement("label");
  sub_label.classList.add("custom-header");
  sub_label.setAttribute("for", option.id);
  sub_label.innerText = option.name;

  sub_label.classList.add("solo");

  let sub_div_inner = document.createElement("div");

  sub_div_inner.classList.add("reveal-if-active");

  sub_ul.appendChild(sub_input);
  sub_ul.appendChild(sub_label);
  sub_ul.appendChild(sub_div_inner);

  option.entries.forEach(function (option) {
    let li = document.createElement("li");

    render_option(sub_div_inner, li, option);

    sub_div_inner.appendChild(li);
  });

  attach_form_data(sub_input, option);

  sub_div.appendChild(sub_ul);

  li.appendChild(sub_div);
}

function render_label(li, option) {
  let div = document.createElement("div");
  div.classList.add("custom-label");

  div.textContent = option.name;

  if (option.tooltip != undefined) {
    div.classList.add("has-tooltip");
    div.setAttribute("title", option.tooltip);
  }

  li.appendChild(div);
}

function render_option(root_div, li, option) {
  if (option.type == "text") {
    render_text_option(li, option);
  }

  if (option.type == "float") {
    render_float_option(li, option);
  }

  if (option.type == "int") {
    render_int_option(li, option);
  }

  if (option.type == "radio") {
    render_radio_option(root_div, option);
    // we added n li elements; we need to skip the default one
    return;
  }

  if (option.type == "checkbox") {
    render_checkbox_option(li, option);
  }

  if (option.type == "select") {
    render_select_option(li, option);
  }

  if (option.type == "subcategory") {
    render_subcategory_option(li, option);
  }

  if (option.type == "label") {
    render_label(li, option);
  }

  root_div.appendChild(li);
}

function render_category(root, category) {
  let name = category.name;
  let cat_id = category.id;

  let cat_div = document.createElement("div");
  cat_div.classList.add("custom-category");

  let header;

  if (category.optional) {
    header = document.createElement("label");
    let input = document.createElement("input");
    input.classList.add("custom-header-checkbox");
    input.setAttribute("type", "checkbox");
    input.id = category.id;
    input.name = category.id;

    cat_div.appendChild(input);

    header.classList.add("custom-header");
    header.setAttribute("for", category.id);

    attach_form_data(input, category);

  } else {
    header = document.createElement("div");
    header.classList.add("custom-header-static");
  }

  if (category.group) {
    cat_div.classList.add("sheet-group-" + category.group);
  }

  header.innerText = name;

  let options_div = document.createElement("div")

  if (category.optional) {
    options_div.classList.add("reveal-if-active");
  }

  category.entries.forEach(function (option) {
    let li = document.createElement("li");

    render_option(options_div, li, option);
  });

  cat_div.appendChild(header);
  cat_div.appendChild(options_div);
  root.appendChild(cat_div);
}

function construct_options() {
  let group_holder = document.getElementById("group-button-holder");

  groups.forEach(group => {
    const label = document.createElement("label");

    const input = document.createElement("input");
    input.setAttribute("autocomplete", "off");
    input.setAttribute("id", "group-toggle-" + group);
    input.setAttribute("name", "group-toggle-" + group);
    input.setAttribute("type", "checkbox");

    label.setAttribute("for", "group-toggle-" + group);
    label.innerText = groupInfo[group].name;
    label.classList.add("group-toggle");

    input.addEventListener("input", update_visible_groups);

    label.classList.add("solo");
    group_holder.appendChild(input);
    group_holder.appendChild(label);
    group_holder.appendChild(document.createElement("br"));

  })

  let root = document.getElementById("character-flex-outer");

  options.forEach(function (category) {
    render_category(root, category);
  });

  groups.forEach(group => {
    let div = document.createElement("div");
    div.classList.add("group-banner");

    div.classList.add("sheet-group-" + group);

    div.innerText = groupInfo[group].name;

    root.appendChild(div);
  });
}

function attach_form_data(element, data) {
  if (data.warning != undefined) {
    element.setAttribute("data-warning", data.warning);
  }

  if (data.panels != undefined) {
    element.setAttribute("data-panels", data.panels.join(","));
  }

  if (data.buttons != undefined) {
    element.setAttribute("data-buttons", data.buttons.join(","));
  }

  if (data.stats != undefined) {
    element.setAttribute("data-stats", data.stats.join(","));
  }

  if (data.parts != undefined) {
    element.setAttribute("data-parts", data.parts.join(","));
  }
}

function construct_panels() {
  let root = document.getElementById("action-panel");

  let panelList = document.createElement("div");
  panelList.classList.add("action-part-container");

  root.appendChild(panelList);

  Object.entries(panels).forEach(function ([name, contents]) {
    let buttons = document.createElement("div");
    buttons.classList.add("action-tab");
    buttons.id = "actions-" + name;

    let panel_button = document.createElement("button");
    panel_button.classList.add("action-part-button");
    panel_button.id = "action-part-" + name;
    panel_button.innerText = contents.name;

    panelList.appendChild(panel_button);

    contents.buttons.forEach(function (action) {
      let button = document.createElement("button");
      button.classList.add("action-button");
      if (contents.type == "options") {
        button.id = "button-option-" + action.target;
      } else {
        button.id = "button-action-" + action.target;
      }

      button.innerText = action.name;

      if (action.default) {
        button.style.display = "inline";
      }

      buttons.appendChild(button);
    });

    root.appendChild(buttons);
  });

}
