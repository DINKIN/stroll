'use strict';

var things =
{
  "Container": {
    "Container": Container,
    mass: 0,
    area: 0,
    clusters: 0,
    cluster_chances: 0,
    contents: [],
    descriptor: ["", ""]
  },

  //Creatures
  "Person": {
    "Person": Person,
    mass: 80,
    area: .33,
    clusters: 5,
    cluster_chances: .8,
    contents: [],
    descriptor: ["a person", "people"]
  },
  "Human": {
    "Human": Human,
    mass: 80,
    area: .33,
    clusters: 5,
    cluster_chances: .8,
    contents: [],
    descriptor: ["a person", "people"]
  },
  "Cow": {
    "Cow": Cow,
    mass: 300,
    area: 2,
    clusters: 15,
    cluster_chances: .5,
    contents: [],
    descriptor: ["a cow", "cattle"]
  },
  "Micro": {
    "Micro": Micro,
    mass: .01,
    area: .05,
    clusters: 50,
    cluster_chances: 1,
    contents: [],
    descriptor: ["a micro", "micros"]
  },
  "Macro": {
    "Macro": Macro,
    mass: 8e4,
    area: 100,
    clusters: 0,
    cluster_chances: 0,
    contents: [],
    descriptor: ["a smaller macro", "smaller macros"]
  },
  //Vehicles
  "Empty Car": {
    "Empty Car": EmptyCar,
    mass: 1000,
    area: 4,
    clusters: 2,
    cluster_chances: .3,
    contents: [],
    descriptor: ["a parked car", "parked cars"]
  },
  "Car": {
    "Car": Car,
    mass: 1000,
    area: 4,
    clusters: 4,
    cluster_chances: .5,
    contents: [["Person", 1, 4]],
    descriptor: ["a car", "cars"]
  },
  "Bus": {
    "Bus": Bus,
    mass: 5000,
    area: 12,
    clusters: 1,
    cluster_chances: .25,
    contents: [["Person", 2, 30]],
    descriptor: ["a bus", "busses"]
  },
  "Tram": {
    "Tram": Tram,
    mass: 1e4,
    area: 20,
    clusters: 1,
    cluster_chances: .2,
    contents: [["Person", 10, 50]],
    descriptor: ["a tram", "trams"]
  },
  "Train": {
    "Train": Train,
    mass: 5e4,
    area: 40,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Person", 1, 4, "engine"], ["Train Car", 2, 10]],
    descriptor: ["a train", "trains"]
  },
  "Train Car": {
    "Train Car": TrainCar,
    mass: 7500,
    area: 20,
    clusters: 1,
    cluster_chances: .05,
    contents: [["Person", 10, 40]],
    descriptor: ["a train car", "train cars"]
  },
  "Helicopter": {
    "Helicopter": Helicopter,
    mass: 1500,
    area: 12,
    clusters: 0,
    cluster_chances: 0,
    contents: [["Person", 4, 16]],
    descriptor: ["a helicopter", "helicopters"]
  },
  "Empty Helicopter": {
    "Empty Helicopter": EmptyHelicopter,
    mass: 1500,
    area: 12,
    clusters: 3,
    cluster_chances: 0.05,
    contents: [],
    descriptor: ["a parked helicopter", "parked helicopters"]
  },
  "Plane": {
    "Plane": Plane,
    mass: 6500,
    area: 50,
    clusters: 1,
    cluster_chances: .05,
    contents: [],
    descriptor: ["a small plane", "small planes"]
  },
  "Empty Plane": {
    "Empty Plane": EmptyPlane,
    mass: 6500,
    area: 50,
    clusters: 1,
    cluster_chances: .05,
    contents: [["Person", 2, 9]],
    descriptor: ["a parked plane", "parked aircraft"]
  },
  "Airliner": {
    "Airliner": Airliner,
    mass: 6500,
    area: 1250,
    clusters: 1,
    cluster_chances: .05,
    contents: [["Person", 5, 300]],
    descriptor: ["an airliner", "airliners"]
  },
  "Empty Airliner": {
    "Empty Airliner": EmptyAirliner,
    mass: 6500,
    area: 1250,
    clusters: 1,
    cluster_chances: .05,
    contents: [],
    descriptor: ["a parked airliner", "parked airliners"]
  },
  //Buildings
  "House": {
    "House": House,
    mass: 1e4,
    area: 150,
    clusters: 5,
    cluster_chances: .5,
    contents: [["Person", 0, 8], ["Empty Car", 0, 2]],
    descriptor: ["house", "houses"]
  },
  "Business": {
    "Business": Business,
    mass: 5e4,
    area: 400,
    clusters: 5,
    cluster_chances: .25,
    contents: [["Person", 0, 30], ["Car", 0, 5], ["Empty Car", 0, 20]],
    descriptor: ["a local business", "buildings"]
  },
  "Barn": {
    "Barn": Barn,
    mass: 5e3,
    area: 300,
    clusters: 1,
    cluster_chances: .1,
    contents: [["Person", 0, 2], ["Cow", 30, 70]],
    descriptor: ["a barn", "barns"]
  },
  "Small Hangar": {
    "Small Hangar": SmallHangar,
    mass: 5e5,
    area: 2500,
    clusters: 1,
    cluster_chances: .1,
    contents: [["Person", 0, 3], ["Plane", 0, 1], ["Empty Plane", 2, 6]],
    descriptor: ["a small hangar", "small hangars"]
  },
  "Helicopter Hangar": {
    "Helicopter Hangar": HelicopterHangar,
    mass: 5e5,
    area: 2000,
    clusters: 1,
    cluster_chances: .1,
    contents: [["Person", 0, 3], ["Helicopter", 0, 1], ["Helicopter", 2, 6]],
    descriptor: ["a helicopter hangar", "helicopter hangar"]
  },
  "Large Hangar": {
    "Large Hangar": LargeHangar,
    mass: 5e6,
    area: 8000,
    clusters: 1,
    cluster_chances: .1,
    contents: [["Person", 0, 5], ["Airliner", 0, 1], ["Empty Airliner", 1, 2]],
    descriptor: ["an aircraft hangar", "hangars"]
  },
  "Small Skyscraper": {
    "Small Skyscraper": SmallSkyscraper,
    mass: 1e7,
    area: 1000,
    clusters: 2,
    cluster_chances: .25,
    contents: [["Person", 150, 750], ["Empty Car", 10, 50]],
    descriptor: ["a small skyscraper", "small skyscrapers"]
  },
  "Large Skyscraper": {
    "Large Skyscraper": LargeSkyscraper,
    mass: 8e7,
    area: 2000,
    clusters: 1,
    cluster_chances: .25,
    contents: [["Person", 500, 1500], ["Empty Car", 20, 100]],
    descriptor: ["a large skyscraper", "large skyscrapers"]
  },
  "Parking Garage": {
    "Parking Garage": ParkingGarage,
    mass: 1e7,
    area: 750,
    clusters: 1,
    cluster_chances: .1,
    contents: [["Person", 10, 200], ["Empty Car", 100, 300], ["Car", 5, 30]],
    descriptor: ["a parking garage", "parking garages"]
  },
  //Places
  "Ranch": {
    "Ranch": Ranch,
    mass: 2e7,
    area: 4e4,
    clusters: 0,
    cluster_chances: 0,
    contents: [["Person", 10, 50], ["House", 1, 3], ["Barn", 1, 2]],
    descriptor: ["a ranch", "ranchs"]
  },
  "Airstrip": {
    "Airstrip": Airstrip,
    mass: 2e7,
    area: 9e5,
    clusters: 0,
    cluster_chances: 0,
    contents: [["Person", 10, 50], ["Small Hangar", 1, 3], ["Plane", 0, 2], ["Helicopter", 0, 1], ["Helicopter Hangar", 0, 1], ["Car", 0, 5], ["Empty Car", 0, 20]],
    descriptor: ["an airstrip", "airstrips"]
  },
  "Airport": {
    "Airport": Airport,
    mass: 1.5e8,
    area: 6e6,
    clusters: 0,
    cluster_chances: 0,
    contents: [["Person", 1500, 4000], ["Small Hangar", 4, 12], ["Plane", 2, 5], ["Helicopter", 1, 3], ["Helicopter Hangar", 2, 6], ["Airliner", 1, 3], ["Large Hangar", 2, 6], ["Car", 20, 75], ["Empty Car", 400, 1000]],
    descriptor: ["an airport", "airports"]
  },
  "Town": {
    "Town": Town,
    mass: 1,
    area: 1e7,
    clusters: 5,
    cluster_chances: .1,
    contents: [["Person", 10000, 100000], ["House", 5000, 50000], ["Empty Car", 200, 800], ["Car", 500, 80000], ["Bus", 5, 25], ["Train", 5, 25], ["Business", 500, 5000]],
    descriptor: ["a town", "towns"]
  },
  "City": {
    "City": City,
    mass: 1,
    area: 1e9,
    clusters: 0,
    cluster_chances: .2,
    contents: [["Person", 100000, 1500000], ["House", 20000, 200000], ["Empty Car", 10000, 100000], ["Car", 7500, 125000], ["Bus", 200, 400], ["Train", 10, 50], ["Tram", 25, 100], ["Small Skyscraper", 50, 300], ["Large Skyscraper", 10, 75], ["Parking Garage", 5, 10], ["Business", 2000, 10000]],
    descriptor: ["a city", "cities"]
  },
  "Continent": {
    "Continent": Continent,
    mass: 1e21,
    area: 1.5e13,
    clusters: 5,
    cluster_chances: .5,
    contents: [["Person", 1000000, 15000000], ["House", 2500, 10000], ["Car", 25000, 375000], ["Train", 50, 500], ["Town", 500, 1000], ["City", 50, 250], ["Business", 250, 1000]],
    descriptor: ["a continent", "continents"]
  },
  //Celestial Bodies
  "Planet": {
    "Planet": Planet,
    mass: 5.972e24,
    area: 2.5e14,
    clusters: 0,
    cluster_chances: 1,
    contents: [["Continent", 4, 9]],
    descriptor: ["a planet", "planets"]
  },
  "Star": {
    "Star": Star,
    mass: 1e40,
    area: 3e18,
    clusters: 1,
    cluster_chances: 1,
    contents: [],
    descriptor: ["a star", "stars"]
  },
  "Solar System": {
    "Solar System": SolarSystem,
    mass: 1,
    area: 3e21,
    clusters: 1,
    cluster_chances: 1,
    contents: [["Star", 1, 1], ["Planet", 5, 15]],
    descriptor: ["a solar system", "solar systems"]
  },
  "Galaxy": {
    "Galaxy": Galaxy,
    mass: 1,
    area: 2e45,
    clusters: 1,
    cluster_chances: 1,
    contents: [["Star", 1e9, 500e9], ["Solar System", 1e8, 500e8]],
    descriptor: ["a galaxy", "galaxies"]
  },
  "Cluster": {
    "Cluster": Cluster,
    mass: 1,
    area: 2e49,
    clusters: 1,
    cluster_chances: 1,
    contents: [["Galaxy", 200, 5000]],
    descriptor: ["a cluster", "clusters"]
  },
  "Universe": {
    "Universe": Universe,
    mass: 1,
    area: 7e53,
    clusters: 1,
    cluster_chances: 1,
    contents: [["Cluster", 1.5e9, 2.5e9]],
    descriptor: ["a universe", "universes"]
  },
  "Multiverse": {
    "Multiverse": Multiverse,
    mass: 1,
    area: 5e56,
    clusters: 1,
    cluster_chances: 1,
    contents: [["Universe", 100, 1000]],
    descriptor: ["a multiverse", "multiverses"]
  },
  //Military
  "Soldier": {
    "Soldier": Soldier,
    mass: 80,
    area: 1,
    clusters: 2,
    cluster_chances: .2,
    contents: [],
    descriptor: ["a soldier", "soldiers"]
  },
  "Tank": {
    "Tank": Tank,
    mass: 5000,
    area: 20,
    clusters: 2,
    cluster_chances: .25,
    contents: [["Soldier", 3, 5]],
    descriptor: ["a tank", "tanks"]
  },
  "Artillery": {
    "Artillery": Artillery,
    mass: 7000,
    area: 25,
    clusters: 3,
    cluster_chances: .5,
    contents: [["Soldier", 4, 6]],
    descriptor: ["an artillery tank", "artillery tanks"]
  },
  "Military Helicopter": {
    "Military Helicopter": MilitaryHelicopter,
    mass: 1500,
    area: 12,
    clusters: 0,
    cluster_chances: 0,
    contents: [["Soldier", 4, 16]],
    descriptor: ["a helicopter", "helicopters"]
  },
  "Squad": {
    "Squad": Squad,
    mass: 1,
    area: 30,
    clusters: 20,
    cluster_chances: .05,
    contents: [["Soldier", 6, 9]],
    descriptor: ["a squad", "squads"]
  },
  "Platoon": {
    "Platoon": Platoon,
    mass: 100,
    area: 150,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Soldier", 16, 44]],
    descriptor: ["a military platoon", "platoons"]
  },
  "Company": {
    "Company": Company,
    mass: 500,
    area: 600,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Soldier", 60, 200]],
    descriptor: ["a company of soldiers", "companies"]
  },
  "Battalion": {
    "Battalion": Battalion,
    mass: 1000,
    area: 3500,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Soldier", 300, 1000]],
    descriptor: ["a battalion", "battalions"]
  },
  "Brigade": {
    "Brigade": Brigade,
    mass: 1500,
    area: 2e4,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Soldier", 1500, 3200]],
    descriptor: ["a brigade", "brigades"]
  },
  "Division": {
    "Division": Division,
    mass: 2000,
    area: 8e4,
    clusters: 3,
    cluster_chances: .1,
    contents: [["Soldier", 10000, 16000]],
    descriptor: ["a division", "divisions"]
  },
  "Tank Division": {
    "Tank Division": TankDivision,
    mass: 3000,
    area: 1e5,
    clusters: 1,
    cluster_chances: .15,
    contents: [["Soldier", 8000, 1200], ["Tank", 250, 500]],
    descriptor: ["a tank division", "tank divisions"]
  },
  "Army": {
    "Army": Army,
    mass: 5000,
    area: 1e6,
    clusters: 2,
    cluster_chances: .1,
    contents: [["Soldier", 40000, 75000]],
    descriptor: ["an army", "armies"]
  },
};
//Alterante Army Structuring, may be used later
//"Squad": [["Soldier",6,9]],
// "Platoon": [["Squad",3,4]],
//"Company": [["Platoon",3,5],["Squad",0,2]],
//"Battalion": [["Company",4,6]],
//"Brigade": [["Battalion",2,5],["Company",0,3]],
//"Division": [["Brigade",2,4]],
//"Tank Division": [["Brigade",2,4],["Tank",250,500]],
//"Army": [["Division",3,8],["Tank Division",1,5]],

// replace all instances of from with to
function contents_substitute(from, to) {
  for (let key in contents) {
    if (contents.hasOwnProperty(key)) {
      let type = contents[key];
      for (let i = 0; i < type.length; i++) {
        if (type[i][0] == from) {
          type[i][0] = to;
        }
      }
    }
  }
}

// remove all instances of thing
function contents_remove(thing) {
  for (let key in contents) {
    if (contents.hasOwnProperty(key)) {
      let type = contents[key];
      for (let i = 0; i < type.length; i++) {
        if (type[i][0] == thing) {
          type.splice(i, 1);
          --i;
        }
      }
    }
  }
}

// adds thing to parent
function contents_insert(parent, thing, min, max, label) {
  let owner = things[parent].contents;
  if (label == undefined)
    owner.push([thing, min, max]);
  else
    owner.push([thing, min, max, label]);
}

function initContents(name, count) { //builds the contents for each destrucable(thing) when called
  let result = {};
  let type = things[name].contents;

  for (let i = 0; i < type.length; i++) {
    let amount = distribution(type[i][1], type[i][2], count); //arrays of contents look like ["thing name",min,max,"optional name"] so those values have to pulled out
    if (amount > 0) {
      // if a custom label is supplied, use it!
      if (type[i].length == 4) //if has optional name
        result[type[i][3]] = new things[type[i][0]][type[i][0]](amount); //creates a "thing name" under the key of "optional name"
      else
        result[type[i][0]] = new things[type[i][0]][type[i][0]](amount);
    }
  }

  return result;
}


function get_living_prey(sum) {
  let total = 0;
  for (let key in sum) {
    if (sum.hasOwnProperty(key)) {
      if (key == "Micro" || key == "Macro" || key == "Person" || key == "Cow" || key == 'Soldier')
        total += sum[key];
    }
  }

  return total;
}

// general logic: each step fills in a fraction of the remaining space

function fill_area(area, weights, variance = 0.15) {
  area = area + Math.random() * variance * 2 * area - variance * area;
  var result = [];
  var candidates = [];
  for (var key in weights) {
    if (weights.hasOwnProperty(key)) {
      candidates.push({ "name": key, "area": things[key].area, "weight": weights[key] });
    }
  }

  candidates = candidates.sort(function (x, y) {
    return x.area - y.area;
  });

  while (candidates.length > 0) {
    var candidate = candidates.pop();

    if (candidate.area > area)
      continue;

    var max = Math.floor(area / candidate.area);
    var limit = Math.min(max, 1000);

    var count = 0;
    var loopvar = 0;

    // for small amounts, actually do the randomness

    // the first few ones get a much better shot

    // if we have nothing at all, it's even better!

    while (loopvar < limit) {

      if (loopvar == 0 && result.length == 0) {
        ++count;
      }
      else if (loopvar <= things[candidate.name].clusters) {
        if (Math.random() < candidate.weight ? 1 : Math.random() < things[candidate.name].cluster_chances) {
          ++count;
        }
      }
      else {
        count += Math.random() < candidate.weight ? 1 : 0;
      }
      ++loopvar;
    }

    // if we're doing more than the limit, then we just add on the rest, with some variance

    if (limit < max) {
      const base = (max - limit) * candidate.weight;
      count += Math.round(base - base / 10 + base * Math.random() / 5);
    }

    area -= count * candidate.area;

    if (count > 0)
      result.push(new things[candidate.name][candidate.name](count));
  }

  return new Container(result);
}

// maybe make this something that approximates a
// normal distribution; doing this 15,000,000 times is bad...

// solution: only a few are random lul

// improvement: take up to 100 samples, then use that to scale the final result

function distribution(min, max, samples) {
  var result = 0;
  var limit = Math.min(100, samples);

  if (limit < samples) {
    let dist = 0;
    for (let i = 0; i < limit; i++) {
      dist += Math.random();
    }
    dist /= 100;

    return Math.floor(dist * samples * (max - min + 1) + samples * min);
  } else {
    for (let i = 0; i < limit; i++) {
      result += Math.floor(Math.random() * (max - min + 1) + min);
    }
  }

  return result;
}

function defaultMultiply(thing) {
  return function (amount) {
    thing.count *= amount;
    for (var key in thing.contents) {
      if (thing.contents.hasOwnProperty(key)) {
        thing.contents[key].multiply(amount);
      }
    }
  };

}

function defaultArea(thing) {
  return things[thing.name].area;
}

function defaultMass(thing) {
  return things[thing.name].mass;
}

function defaultDescribeOne(thing) {
  return function (verbose) { //verbose doesn't matter for this case, becasue it handles things with no extra text to use when being verbose
    return things[thing.name].descriptor[0];
  }
}

function defaultMerge(thing) { //this merges all objects into one containers
  return function (container) {
    var newCount = this.count + container.count;
    var newThing = new things[thing.name][thing.name](newCount);
    newThing.contents = {};

    for (var key in this.contents) {
      if (this.contents.hasOwnProperty(key)) {
        newThing.contents[key] = this.contents[key];
      }
    }

    for (key in container.contents) {
      if (container.contents.hasOwnProperty(key)) {
        if (this.contents.hasOwnProperty(key)) {
          newThing.contents[key] = this.contents[key].merge(container.contents[key]);
        } else {
          newThing.contents[key] = container.contents[key];
        }
      }
    }

    return newThing;
  };
}

function listSum(sum) {
  let result = [];
  for (let key in sum) {
    if (sum.hasOwnProperty(key)) {
      result.push(new things[key][key](sum[key]).describe(false));
    }
  }

  return merge_things(result);
}

// turn a nested object into a container with everything on one level

function flatten(thing) {
  let dict = defaultSum(thing)();

  let list = [];

  Object.entries(dict).forEach(function ([key, val]) {
    let obj = new things[key][key](val);

    obj.contents = [];

    list.push(obj);
  });

  list.sort(function (x, y) {
    if (y.area != x.area) {
      return y.area - x.area;
    } else {
      return x.name.localeCompare(y.name);
    }
  });

  return new Container(list);
}

function defaultSum(thing) {
  return function () {
    var counts = {};

    if (thing.name != "Container")
      counts[thing.name] = thing.count;

    for (var key in thing.contents) {
      if (thing.contents.hasOwnProperty(key)) {
        var subcount = thing.contents[key].sum();
        for (var subkey in subcount) {
          if (!counts.hasOwnProperty(subkey)) {
            counts[subkey] = 0;
          }
          counts[subkey] += subcount[subkey];
        }
      }
    }

    return counts;
  };
}

function defaultSumProperty(thing) {
  return function (prop) {
    var total = 0;

    total += thing[prop] * thing.count;

    for (var key in thing.contents) {
      if (thing.contents.hasOwnProperty(key)) {
        total += thing.contents[key].sum_property(prop);
      }
    }

    return total;
  };
}

function defaultModProperty(thing) {
  return function(prop, func) {
    thing[prop] = func(thing[prop]);

    for (var key in thing.contents) {
      if (thing.contents.hasOwnProperty(key)) {
        thing.contents[key].mod_property(prop, func);
      }
    }
  };
}

function defaultAddContent(thing) {
  return function (name, min, max, count) {
    if (min == max) {
      let object = new things[name](min * count);
      thing.contents[object.name] = object;
    } else {
      let object = new things[name](distribution(min, max, count));
      thing.contents[object.name] = object;
    }
  };
}

function DefaultEntity() {
  this.sum = defaultSum;
  this.area = defaultArea;
  this.mass = defaultMass;
  this.sum_property = defaultSumProperty;
  this.mod_property = defaultModProperty;
  this.merge = defaultMerge;
  this.multiply = defaultMultiply;
  this.describeSimple = defaultDescribeSimple;
  this.describeOne = defaultDescribeOne;
  return this;
}

// god I love reinventing the wheel

function copy_defaults(self, proto) { //loads the values defined in things into the fuction that calls it
  for (var key in proto) { //proto will always be a new DefaultEntity, self is the parent function
    if (proto.hasOwnProperty(key)) {
      self[key] = proto[key](self);
    }
  }
}

// combine strings into a list with proper grammar

function merge_things(list, semicolons = false) {
  if (list.length == 0) {
    return "";
  } else if (list.length == 1) {
    return list[0];
  } else if (list.length == 2) {
    return list[0] + " and " + list[1];
  } else {
    var result = "";

    list.slice(0, list.length - 1).forEach(function (term) {
      result += term + ", ";
    });

    result += "and " + list[list.length - 1];

    return result;
  }
}

// combine the adjectives for something into a single string

function merge_desc(list) {
  var result = "";

  list.forEach(function (term) {
    if (term != "")
      result += term + " ";
  });

  // knock off the last space
  if (result.length > 0) {
    result = result.substring(0, result.length - 1);
  }

  let article = "a "
  //a/an overwriting terms
  let forcedTerms = ["honor", "heir"]; //words that need to start with an but don't start with a,e,i,o,u
  let force = false;
  for (let i of forcedTerms) {
    if (i === result.substring(0, i.length)) { force = true; }
  }

  let exceptionTerms = ["uniform", "unique"]; //words that need to start with a and start with a,e,i,o,u
  let exception = false;
  for (let i of exceptionTerms) {
    if (i === result.substring(0, i.length)) { exception = true; }
  }

  //check if the string should start with an
  if ((force == true) || (exception == false && ((result.charAt(0) == "a") || (result.charAt(0) == "e") || (result.charAt(0) == "i") || (result.charAt(0) == "o") || (result.charAt(0) == "u")))) {
    article = "an ";
  }
  result = article + result;
  return result;
}

// describes everything in the container

function describe_all(contents, verbose = true, except = []) {
  var things = [];
  for (var key in contents) {
    if (contents.hasOwnProperty(key) && !except.includes(key)) {
      things.push(contents[key].describe(verbose));
    }
  }
  return merge_things(things);
}

function random_desc(list, odds = 1) { //strings together an array into a series of words
  if (Math.random() < odds)
    return list[Math.floor(Math.random() * list.length)];
  else
    return "";
}

function defaultDescribeSimple(thing) {
  return function (flat) {
    if (flat) {
      return flatten(thing).describe(false)
    } else {
      return thing.describe(false);
    }
  }
}

function defaultDescribe(verbose = true, parent, descAs) {
  let descriptorEnd = " inside";
  let descriptorConjunction = " with ";
  let groupLessThan3 = false;
  switch (descAs) {
    case "vehicle":
      descriptorEnd = pickString(" inside", " inside", " inside", " inside", " riding inside", " trapped inside", " sitting inside");
      break;
    case "community":
      groupLessThan3 = true;
      descriptorEnd = " in " + (parent.count == 1 ? "it" : "them");
      break;
    case "celestial":
      groupLessThan3 = true;
      descriptorConjunction = pickString(" made up of ", " consisting of ", " containing ");
      descriptorEnd = "";
      break;
    case "military":
      groupLessThan3 = true;
      descriptorConjunction = pickString(" of ", " of ", " made up of ", " comprised of ", " containing ");
      descriptorEnd = "";
      break;
    case "generic vehicle":
      groupLessThan3 = true;
      descriptorEnd = pickString(" inside", " inside", " inside", " inside", " riding inside", " trapped inside", " sitting inside");
      break;

  } if (verbose) {
    if (parent.count = 1) { //singular parent (specifying single to catch cases where groupLessThan3 = true, otherwise it would output "1 towns" instead of "a town"
      if (things[parent.name].contents.length > 0) {
        return (things[parent.name].descriptor[0] + descriptorConjunction + describe_all(parent.contents, false) + descriptorEnd);
      } else {
        return parent.describeOne(verbose);
      }
    }
    else if (parent.count <= 3 && groupLessThan3 == false) { // less than 3 parents and an ojbect that has varety when described
      var list = [];
      for (var i = 0; i < parent.count; i++) {
        list.push(parent.describeOne(parent.count <= 2));
      }
      if (things[parent.name].contents.length > 0) {
        return (merge_things(list) + descriptorConjunction + describe_all(parent.contents, false) + descriptorEnd);
      } else {
        return merge_things(list);
      }
    } else {//if there are more than 3 of the object
      if (things[parent.name].contents.length > 0) {
        return (parent.count + " " + things[parent.name].descriptor[1] + descriptorConjunction + describe_all(parent.contents, false) + descriptorEnd);
      } else {
        return (parent.count + " " + things[parent.name].descriptor[1]);
      }
    }
  } else {//not verbose
    return (parent.count > 1 ? (parent.count + " " + things[parent.name].descriptor[1]) : things[parent.name].descriptor[0]);
  }
}


function Container(contents = []) {
  this.name = "Container";

  copy_defaults(this, new DefaultEntity());

  if (Number.isInteger(contents))
    this.count = contents;
  else
    this.count = 0;

  this.contents = {};

  for (var i = 0; i < contents.length; i++) {
    this.contents[contents[i].name] = contents[i];
  }

  for (var key in this.contents) {
    if (this.contents.hasOwnProperty(key)) {
      this.count += this.contents[key].count;
    }
  }

  this.describe = function (verbose = true) {
    return describe_all(this.contents, verbose);
  };

  return this;
}

function Person(count = 1) {
  this.name = "Person";

  copy_defaults(this, new DefaultEntity());

  this.mass = ((Math.random() - .5) * 20) + this.mass;
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var body = random_desc(["skinny", "fat", "tall", "short", "stocky", "spindly", "muscular", "fit", "multi-colored"], (verbose ? 0.6 : 0));
    var sex = random_desc(["male", "female"], (verbose ? 0.75 : 0));
    var species = "";
    species = random_desc(["wolf", "cat", "dog", "squirrel", "horse", "hyena", "fox", "jackal", "crux", "sergal", "coyote", "rabbit", "lizard", "avian"]);
    return merge_desc([body, sex, species]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }

  return this;
}

function Human(count = 1) {
  this.name = "Person";

  copy_defaults(this, new DefaultEntity());

  this.mass = ((Math.random() - .5) * 20) + this.mass;
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var body = random_desc(["skinny", "fat", "tall", "short", "stocky", "spindly", "muscular", "fit", "tanned"], (verbose ? 0.6 : 0));
    var sex = random_desc(["man", "woman"], 1);
    return merge_desc([body, sex]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }

  return this;
}

function Cow(count = 1) {
  this.name = "Cow";

  copy_defaults(this, new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var body = random_desc(["skinny", "fat", "tall", "short", "stocky", "spindly", "brown"], (verbose ? 0.6 : 0));
    var sex = random_desc(["bull", "steer", "cow", "cow", "cow", "heifer"], (verbose ? 1 : 0));
    return merge_desc([body, sex]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }

  return this;
}

function EmptyCar(count = 1) {
  this.name = "Empty Car";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["black", "black", "gray", "gray", "blue", "red", "tan", "white", "white"]);
    var adjective = random_desc(["rusty", "brand-new", "luxury", "beat-up", "dented", "restored", "classic"], 0.3);
    var type = random_desc(["SUV", "coupe", "sedan", "truck", "van", "convertible"]);
    return merge_desc(["parked", adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Car(count = 1) {
  this.name = "Car";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["black", "black", "gray", "gray", "blue", "red", "tan", "white", "white"], (verbose ? 1 : 0));
    var adjective = random_desc(["rusty", "brand-new", "luxury", "beat-up", "dented", "restored", "classic"], (verbose ? 0.3 : 0));
    var type = random_desc(["SUV", "coupe", "sedan", "truck", "van", "convertible"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Bus(count = 1) {
  this.name = "Bus";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["rusty", "brand-new", "aging", "modern"], (verbose ? 0.3 : 0));
    var color = random_desc(["black", "tan", "gray"], (verbose ? 1 : 0));
    var type = random_desc(["bus", "double-decker bus", "articulating bus", "open-top bus", "sleeper bus", "intercity bus"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Tram(count = 1) {
  this.name = "Tram";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["rusty", "weathered", "well-maintained",], (verbose ? 0.3 : 0));
    var color = random_desc(["blue", "brown", "gray"], (verbose ? 1 : 0));
    var type = random_desc(["tram"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }

  this.anal_vore = function () {
    return "You slide " + this.describe() + " up your tight ass";
  };
}

function EmptyHelicopter(count = 1) {
  this.name = "Empty Helicopter";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["blue", "white", "white", "red", "black", "gold", "yellow"], (verbose ? 0.6 : 0));
    var type = random_desc(["bubble coptor", "helicopter", "helicopter", "news chopper", "police helicopter", "chopper"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Helicopter(count = 1) {
  this.name = "Helicopter";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["blue", "white", "white", "red", "black", "gold", "yellow"], (verbose ? 0.6 : 0));
    var type = random_desc(["bubble coptor", "helicopter", "helicopter", "news chopper", "police helicopter", "chopper"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function EmptyPlane(count = 1) {
  this.name = "Empty Plane";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["brand-new", "aging", "modern"], (verbose ? 0.2 : 0));
    var color = random_desc(["blue", "white", "white", "blue and white", "red and white", "black", "gold"], (verbose ? 0.9 : 0));
    var type = random_desc(["luxury jet", "business jet", "single-engine plane", "light aircraft"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Plane(count = 1) {
  this.name = "Plane";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["brand-new", "aging", "modern"], (verbose ? 0.2 : 0));
    var color = random_desc(["blue", "white", "white", "blue and white", "red and white", "black", "gold"], (verbose ? 0.9 : 0));
    var type = random_desc(["luxury jet", "business jet", "single-engine plane", "light aircraft"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function EmptyAirliner(count = 1) {
  this.name = "Empty Airliner";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["brand-new", "aging", "modern"], (verbose ? 0.2 : 0));
    var color = random_desc(["blue", "white", "white", "blue and white"], (verbose ? 0.9 : 0));
    var type = random_desc(["airliner", "twin-engine jet", "trijet", "four engine jet", "double-decker airliner", "widebody airliner", "passenger jet", "airliner"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Airliner(count = 1) {
  this.name = "Airliner";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["brand-new", "aging", "modern"], (verbose ? 0.2 : 0));
    var color = random_desc(["blue", "white", "white", "blue and white"], (verbose ? 0.9 : 0));
    var type = random_desc(["airliner", "twin-engine jet", "trijet", "four engine jet", "double-decker airliner", "widebody airliner", "passenger jet", "airliner"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function Train(count = 1) {
  this.name = "Train";
  copy_defaults(this, new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["rusty", "brand-new", "steam", "freshly-painted"], (verbose ? 0.3 : 0));
    var color = random_desc(["black", "tan", "gray"], (verbose ? 1 : 0));
    var type = random_desc(["train", "passenger train", "freight train"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    if (verbose) {
      if (this.count == 1) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(verbose));
        }
        return merge_things(list) + " with " + this.contents["engine"].describe(false) + " in the engine and " + this.contents["Train Car"].describe() + " attached";
      } else {
        return this.count + " trains with " + this.contents["engine"].describe(false) + " in the engine and " + this.contents["Train Car"].describe() + " attached";
      }
    } else {
      return (this.count > 1 ? this.count + " trains" : "a train");
    }

  };

  this.anal_vore = function () {
    var cars = (this.contents["Train Car"].count == 1 ? this.contents["Train Car"].describe() + " follows it inside" : this.contents["Train Car"].describe() + " are pulled slowly inside");
    return "You snatch up " + this.describeOne() + " and stuff it into your pucker, moaning as " + cars;
  };
}

function TrainCar(count = 1) {
  this.name = "Train Car";
  copy_defaults(this, new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var adjective = random_desc(["rusty", "brand-new", "vintage", "graffitied", "well-maintained"], (verbose ? 0.3 : 0));
    var color = random_desc(["black", "tan", "gray", "yellow", "steel", "wooden"], (verbose ? 1 : 0));
    var type = random_desc(["train car", "passenger train car", "freight train car"]);
    return merge_desc([adjective, color, type]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "vehicle");
  }
}

function House(count = 1) {
  this.name = "House";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["little", "two-story", "large", "well-built", "run-down", "cheap",], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green", "wooden", "brick"], (verbose ? 0.5 : 0));
    var name = random_desc(["house", "home", "duplex", "house", "house", "trailer"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}
//might split this into a general business and resutrant categories
function Business(count = 1) {
  this.name = "Business";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["little", "two-story", "large", "well-built", "run-down", "cheap", "aging", "corner"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green", "brick", "concrete"], (verbose ? 0.5 : 0));
    var name = random_desc(["mall", "resturant", "bank", "clinic", "shop", "post office", "tire shop", "chain resturant", "grocery store", "barber shop", "pizza resturant", "hardware store", "movie theather", "gas station"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function Barn(count = 1) {
  this.name = "Barn";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["little", "big", "large", "weathered", "rotted", "new"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green", "red"], (verbose ? 0.5 : 0));
    var name = random_desc(["barn", "barn", "barn", "barn", "barn", "farmhouse"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function SmallHangar(count = 1) {
  this.name = "Small Hangar";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["weathered", "aging", "new"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green"], (verbose ? 0.5 : 0));
    var name = random_desc(["hangar", "hangar", "hangar", "aircraft hangar"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function HelicopterHangar(count = 1) {
  this.name = "Helicopter Hangar";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["weathered", "aging", "new"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green"], (verbose ? 0.5 : 0));
    var name = random_desc(["hangar", "hangar", "hangar", "helicopter hangar"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function LargeHangar(count = 1) {
  this.name = "Large Hangar";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["weathered", "aging", "new"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue", "white", "gray", "tan", "green"], (verbose ? 0.5 : 0));
    var name = random_desc(["hangar", "hangar", "hangar", "large hangar", "spacious hangar"], 1);
    return merge_desc([size, color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function SmallSkyscraper(count = 1) {
  this.name = "Small Skyscraper";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["blue", "white", "gray", "tan", "green"], (verbose ? 0.5 : 0));
    var name = random_desc(["skyscraper", "office tower", "office building", "high rise"], 1);
    return merge_desc([color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function LargeSkyscraper(count = 1) {
  this.name = "Large Skyscraper";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var color = random_desc(["blue", "white", "gray", "tan", "green", "glass"], (verbose ? 0.5 : 0));
    var name = random_desc(["skyscraper", "office tower", "office building"], 1);
    return merge_desc(["towering", color, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function ParkingGarage(count = 1) {
  this.name = "Parking Garage";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function Ranch(count = 1) {
  this.name = "Ranch";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describeOne = function (verbose = true) {
    var size = random_desc(["little", "large", "prosperous", "run-down"], (verbose ? 0.5 : 0));
    var name = random_desc(["ranch", "farm", "ranch", "dairy farm", "cattle farm", "ranch", "farm"], 1);
    return merge_desc([size, name]);
  };

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function Airstrip(count = 1) {
  this.name = "Airstrip";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function Airport(count = 1) {
  this.name = "Airport";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function Town(count = 1) {
  this.name = "Town";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function City(count = 1) {
  this.name = "City";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function Continent(count = 1) {
  this.name = "Continent";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function Planet(count = 1) {
  this.name = "Planet";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "community");
  }
}

function Star(count = 1) {
  this.name = "Star";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return (this.count == 1 ? "a star" : this.count + " stars");
  };
}

function SolarSystem(count = 1) {
  this.name = "Solar System";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "celestial");
  }
}

function Galaxy(count = 1) {
  this.name = "Galaxy";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "celestial");
  }
}

function Cluster(count = 1) {
  this.name = "Cluster";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "celestial");
  }
}

function Universe(count = 1) {
  this.name = "Universe";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "celestial");
  }
}

function Multiverse(count = 1) {
  this.name = "Multiverse";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "celestial");
  }
}

function Soldier(count = 1) {
  this.name = "Soldier";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Tank(count = 1) {
  this.name = "Tank";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "generic vehicle");
  }
}

function Artillery(count = 1) {
  this.name = "Artillery";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "generic vehicle");
  }
}

function MilitaryHelicopter(count = 1) {
  this.name = "Military Helicopter";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "generic vehicle");
  }
}

function Micro(count = 1) {
  this.name = "Micro";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function Macro(count = 1) {
  this.name = "Macro";

  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this);
  }
}

function Squad(count = 1) {
  this.name = "Squad";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Platoon(count = 1) {
  this.name = "Platoon";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Company(count = 1) {
  this.name = "Company";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Battalion(count = 1) {
  this.name = "Battalion";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Brigade(count = 1) {
  this.name = "Brigade";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Division(count = 1) {
  this.name = "Division";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function TankDivision(count = 1) {
  this.name = "Tank Division";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}

function Army(count = 1) {
  this.name = "Army";
  copy_defaults(this, new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name, this.count);

  this.describe = function (verbose = true) {
    return defaultDescribe(verbose, this, "military");
  }
}



  //todo
  //farms
  //factories
  //racetracks
  //more building types
  //cranes and other construction equipment
  //nebula
  //biome magic also set it so that you can't roll your existing biome
  //chemical factory
  //grand army
  //armada
