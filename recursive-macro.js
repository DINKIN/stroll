'use strict';

var things =
{
  "Container": Container,

//Creatures
  "Person": Person,
  "Human": Human,
  "Cow": Cow,
  "Micro": Micro,
  "Macro": Macro,
//Vehicles
  "Empty Car": EmptyCar,
  "Car": Car,
  "Bus": Bus,
  "Tram": Tram,
  "Train": Train,
  "Train Car": TrainCar,
//Buildings
  "House": House,
  "Business": Business,
  "Barn": Barn,
  "Small Skyscraper": SmallSkyscraper,
  "Large Skyscraper": LargeSkyscraper,
  "Parking Garage": ParkingGarage,
//Places
  "Town": Town,
  "City": City,
  "Continent": Continent,
  "Planet": Planet,
  "Star": Star,
  "Solar System": SolarSystem,
  "Galaxy": Galaxy,
  "Cluster": Cluster,
  "Universe": Universe,
  "Multiverse": Multiverse,
//Military
  "Soldier": Soldier,
  "Tank": Tank,
  "Artillery": Artillery,
  "Helicopter": Helicopter,
  "Squad": Squad,
  "Platoon": Platoon,
  "Company": Company,
  "Battalion": Battalion,
  "Brigade": Brigade,
  "Division": Division,
  "Tank Division": TankDivision,
  "Army": Army,
};

var areas =
{
  "Container": 0,
//Creatures
  "Person": 0.33,
  "Human": 0.33,
  "Cow": 2,
  "Micro": 0.05,
  "Macro": 100,
//Vehicles
  "Car": 4,
  "Bus": 12,
  "Tram": 20,
  "Train": 40,
  "Train Car": 20,
//Buildings
  "House": 150,
  "Business": 400,
  "Barn": 300,
  "Small Skyscraper": 1000,
  "Large Skyscraper": 2000,
  "Parking Garage": 750,
//Places
  "Town": 1e7,
  "City": 1e9,
  "Continent": 1.5e13,
  "Planet": 2.5e14,
  "Star": 3e18,
  "Solar System": 3e21,
  "Galaxy": 2e45,
  "Cluster": 2e49,
  "Universe": 7e53,
  "Multiverse": 5e56,
//Military
  "Soldier": 1,
  "Tank": 10,
  "Artillery": 12,
  "Helicopter": 8,
  "Squad": 20,
  "Platoon": 100,
  "Company": 500,
  "Battalion": 3000,
  "Brigade": 20000,
  "Division": 80000,
  "Tank Division": 100000,
  "Army": 750000,
};

var masses =
{
  "Container": 0,
//Creatures
  "Person": 80,
  "Human": 80,
  "Cow": 300,
  "Micro": 0.01,
  "Macro": 80000,
//Vehicles
  "Car": 1000,
  "Bus": 5000,
  "Tram": 10000,
  "Train": 50000,
  "Train Car": 7500,
//Buildings
  "House": 10000,
  "Business": 50000,
  "Barn": 5000,
  "Small Skyscraper": 10000000,
  "Large Skyscraper": 80000000,
  "Parking Garage": 10000000,
//Places
  "Town": 1,
  "City": 1,
  "Continent": 1e21,
  "Planet": 5.972e24,
  "Star": 1e40,
  "Solar System": 1,
  "Galaxy": 1,
  "Cluster": 1,
  "Universe": 1,
  "Multiverse": 1,
//Military
  "Soldier": 80,
  "Tank": 5000,
  "Artillery": 7000,
  "Helicopter": 1500,
  "Squad": 1,
  "Platoon": 100,
  "Company": 500,
  "Battalion": 1000,
  "Brigade": 1500,
  "Division": 2000,
  "Tank Division": 3000,
  "Army": 5000,
};

var clusters =
{
  "Container": 0,
//Creatures
  "Person": 5,
  "Human": 5,
  "Cow": 15,
  "Micro": 50,
  "Macro": 0,
//Vehicles
  "Car": 3,
  "Bus": 1,
  "Tram": 1,
  "Train": 2,
  "Train Car": 1,
//Buildings
  "House": 5,
  "Business": 5,
  "Barn": 1,
  "Small Skyscraper": 2,
  "Large Skyscraper": 1,
  "Parking Garage": 1,
//Places
  "Town": 5,
  "City": 1,
  "Continent": 5,
  "Planet": 9,
  "Star": 1,
  "Solar System": 1,
  "Galaxy": 1,
  "Cluster": 1,
  "Universe": 1,
  "Multiverse": 1,
//Military
  "Soldier": 0,
  "Tank": 0,
  "Artillery": 0,
  "Helicopter": 0,
  "Squad": 20,
  "Platoon": 2,
  "Company": 2,
  "Battalion": 2,
  "Brigade": 2,
  "Division": 3,
  "Tank Division": 1,
  "Army": 2,
};

var cluster_chances =
{
  "Container": 0,
//Creatures
  "Person": 0.8,
  "Human": 0.8,
  "Cow": 0.5,
  "Micro": 1,
  "Macro": 0,
//Vehicles
  "Car": 0.5,
  "Bus": 0.25,
  "Tram": 0.2,
  "Train": 0.1,
  "Train Car": 0.05,
//Buildings
  "House": 0.5,
  "Business": .05,
  "Barn": 0.1,
  "Small Skyscraper": 0.25,
  "Large Skyscraper": 0.25,
  "Parking Garage": 0.1,
//Places
  "Town": 0.1,
  "City": 0.2,
  "Continent": 0.5,
  "Planet": 1,
  "Star": 1,
  "Solar System": 1,
  "Galaxy": 1,
  "Cluster": 1,
  "Universe": 1,
  "Multiverse": 1,
//Military
  "Soldier": 0,
  "Tank": 0,
  "Artillery": 0,
  "Helicopter": 0,
  "Squad": .05,
  "Platoon": .05,
  "Company": .1,
  "Battalion": .1,
  "Brigade": .1,
  "Division": .1,
  "Tank Division": 0.15,
  "Army": .1,
};

var contents =
{
  "Container": [],
//Creatures
  "Person": [],
  "Human": [],
  "Cow": [],
  "Micro": [[]],
  "Macro": [[]],
//Vehicles
  "Car": [["Person",1,4]],
  "Bus": [["Person",2,30]],
  "Tram": [["Person",10,50]],
  "Train": [["Person",1,4,"engine"],["Train Car",2,10]],
  "Train Car": [["Person",10,40]],
//Buildings
  "House": [["Person",0,8],["Empty Car",0,2]],
  "Business": [["Person",0,30],["Car",0,20]],
  "Barn": [["Person",0,2],["Cow",30,70]],
  "Small Skyscraper": [["Person",150,750],["Empty Car",10,50]],
  "Large Skyscraper": [["Person",500,1500],["Empty Car",20,100]],
  "Parking Garage": [["Person",10,200],["Empty Car",100,300],["Car",5,30]],
//Places
  "Town": [["Person",10000,100000],["House",5000,50000],["Empty Car",200,800],["Car",500,80000],["Bus",5,25],["Train",5,25],["Business",500,5000]],
  "City": [["Person",100000,1500000],["House",20000,200000],["Empty Car",10000,100000],["Car",7500,125000],["Bus",200,400],["Train",10,50],["Tram",25,100],["Small Skyscraper",50,300],["Large Skyscraper",10,75],["Parking Garage",5,10],["Business",2000,10000]],
  "Continent": [["Person",1000000,15000000],["House",2500,10000],["Car",25000,375000],["Train",50,500],["Town",500,1000],["City",50,250],["Business",250,1000]],
  "Planet": [["Continent",4,9]],
  "Star": [],
  "Solar System": [["Star",1,1],["Planet",5,15]],
  "Galaxy": [["Star",1e9,500e9],["Solar System",1e8,500e8]],
  "Cluster": [["Galaxy",200,5000]],
  "Universe": [["Cluster",1.5e9,2.5e9]],
  "Multiverse": [["Universe",100,1000]],
//Military
  "Soldier": [],
  "Tank": [["Soldier",3,5]],
  "Artillery": [["Soldier",4,6]],
  "Helicopter": [["Soldier",4,16]],
  //Alterante Army Structuring, may be used later
  //"Squad": [["Soldier",6,9]],
  // "Platoon": [["Squad",3,4]],
  //"Company": [["Platoon",3,5],["Squad",0,2]],
  //"Battalion": [["Company",4,6]],
  //"Brigade": [["Battalion",2,5],["Company",0,3]],
  //"Division": [["Brigade",2,4]],
  //"Tank Division": [["Brigade",2,4],["Tank",250,500]],
  //"Army": [["Division",3,8],["Tank Division",1,5]],
  "Squad": [["Soldier",6,9]],
  "Platoon": [["Soldier",16,44]],
  "Company": [["Soldier",60,200]],
  "Battalion": [["Soldier",300,1000]],
  "Brigade": [["Soldier",1500,3200]],
  "Division": [["Soldier",10000,16000]],
  "Tank Division": [["Soldier",8000,1200],["Tank",250,500]],
  "Army": [["Soldier",40000,75000]],
};

// replace all instances of from with to
function contents_substitute(from,to) {
  for (let key in contents) {
    if (contents.hasOwnProperty(key)) {
      let type = contents[key];
      for (let i=0; i<type.length; i++) {
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
      for (let i=0; i<type.length; i++) {
        if (type[i][0] == thing) {
          type.splice(i,1);
          --i;
        }
      }
    }
  }
}

// adds thing to parent
function contents_insert(parent,thing,min,max,label) {
  let owner = contents[parent];
  if (label == undefined)
    owner.push([thing,min,max]);
  else
    owner.push([thing,min,max,label]);
}

function initContents(name,count) {
  let result = {};
  let type = contents[name];

  for (let i=0; i<type.length; i++) {
    let amount = distribution(type[i][1],type[i][2],count);
    if (amount > 0) {
      // if a custom label is supplied, use it!
      if (type[i].length == 4)
        result[type[i][3]] = new things[type[i][0]](amount);
      else
        result[type[i][0]] = new things[type[i][0]](amount);
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

function fill_area(area, weights, variance=0.15)
{
  area = area + Math.random() * variance * 2 * area - variance * area;
  var result = [];
  var candidates = [];
  for (var key in weights) {
    if (weights.hasOwnProperty(key)) {
      candidates.push({"name": key, "area": areas[key], "weight": weights[key]});
    }
  }

  candidates = candidates.sort(function (x,y) {
    return x.area - y.area;
  });

  while(candidates.length > 0) {
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
      else if (loopvar <= clusters[candidate.name]) {
        if (Math.random() < candidate.weight ? 1 : Math.random() < cluster_chances[candidate.name]) {
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
      const base = (max-limit) * candidate.weight;
      count += Math.round(base - base / 10 + base * Math.random() / 5);
    }

    area -= count * candidate.area;

    if (count > 0)
      result.push(new things[candidate.name](count));
  }

  return new Container(result);
}
// describes everything in the container

function describe_all(contents,verbose=true,except=[]) {
    var things = [];
    for (var key in contents) {
      if (contents.hasOwnProperty(key) && !except.includes(key)) {
        things.push(contents[key].describe(verbose));
      }
    }
    return merge_things(things);
}

function random_desc(list, odds=1) {
  if (Math.random() < odds)
    return list[Math.floor(Math.random() * list.length)];
  else
    return "";
}

// combine strings into a list with proper grammar

function merge_things(list,semicolons=false) {
  if (list.length == 0) {
    return "";
  } else if (list.length == 1) {
    return list[0];
  } else if (list.length == 2) {
    return list[0] + " and " + list[1];
  } else {
    var result = "";

    list.slice(0,list.length-1).forEach(function(term) {
      result += term + ", ";
    });

    result += "and " + list[list.length-1];

    return result;
  }
}

// combine the adjectives for something into a single string

function merge_desc(list) {
  var result = "";

  list.forEach(function(term) {
    if (term != "")
      result += term + " ";
  });

  // knock off the last space
  if (result.length > 0) {
    result = result.substring(0, result.length - 1);
  }

  return result;
}

// maybe make this something that approximates a
// normal distribution; doing this 15,000,000 times is bad...

// solution: only a few are random lul

// improvement: take up to 100 samples, then use that to scale the final result

function distribution(min, max, samples) {
  var result = 0;
  var limit = Math.min(100,samples);

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
  return function(amount) {
    thing.count *= amount;
    for (var key in thing.contents) {
      if (thing.contents.hasOwnProperty(key)) {
        thing.contents[key].multiply(amount);
      }
    }
  };

}

function defaultArea(thing) {
  return areas[thing.name];
}

function defaultMass(thing) {
  return masses[thing.name];
}

function defaultMerge(thing) {
  return function(container) {
    var newCount = this.count + container.count;

    var newThing = new things[thing.name](newCount);
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
      result.push(new things[key](sum[key]).describe(false));
    }
  }

  return merge_things(result);
}

// turn a nested object into a container with everything on one level

function flatten(thing) {
  let dict = defaultSum(thing)();

  let list = [];

  Object.entries(dict).forEach(function([key, val]) {
    let obj = new things[key](val);

    obj.contents = [];

    list.push(obj);
  });

  list.sort(function(x,y) {
    if (y.area != x.area){
      return y.area - x.area;
    } else {
      return x.name.localeCompare(y.name);
    }
  });

  return new Container(list);
}

function defaultSum(thing) {
  return function() {
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
  return function(prop) {
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

function defaultAddContent(thing) {
  return function(name, min, max, count) {
    if (min == max) {
      let object = new things[name](min*count);
      thing.contents[object.name] = object;
    } else {
      let object = new things[name](distribution(min, max, count));
      thing.contents[object.name] = object;
    }
  };
}

function defaultDescribeSimple(thing) {
  return function(flat) {
    if (flat) {
      return flatten(thing).describe(false)
    } else {
      return thing.describe(false);
    }
  }
}
function DefaultEntity() {
  this.sum = defaultSum;
  this.area = defaultArea;
  this.mass = defaultMass;
  this.sum_property = defaultSumProperty;
  this.merge = defaultMerge;
  this.multiply = defaultMultiply;
  this.describeSimple = defaultDescribeSimple;

  return this;
}

// god I love reinventing the wheel

function copy_defaults(self,proto) {
  for (var key in proto) {
    if (proto.hasOwnProperty(key)) {
      self[key] = proto[key](self);
    }
  }
}

function Container(contents = []) {
  this.name = "Container";

  copy_defaults(this,new DefaultEntity());

  if (Number.isInteger(contents))
    this.count = contents;
  else
    this.count = 0;

  this.contents = {};

  for (var i=0; i < contents.length; i++) {
    this.contents[contents[i].name] = contents[i];
  }

  for (var key in this.contents) {
    if (this.contents.hasOwnProperty(key)) {
      this.count += this.contents[key].count;
    }
  }

  this.describe = function(verbose = true) {
    return describe_all(this.contents,verbose);
  };

  return this;
}

function Person(count = 1) {
  this.name = "Person";

  copy_defaults(this,new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function (verbose=true) {
    var body = random_desc(["skinny","fat","tall","short","stocky","spindly","muscular","fit","multi-colored"], (verbose ? 0.6 : 0));
    var sex = random_desc(["male", "female"], (verbose ? 0.75 : 0));
    var species = "";
    species = random_desc(["wolf","cat","dog","squirrel","horse","hyena","fox","jackal","crux","sergal","coyote","rabbit","lizard","avian"]);
    return "a " + merge_desc([body,sex,species]);
  };

  this.describe = function(verbose=true) {
    if (verbose) {
      if (count <= 3) {
        var list = [];
        for (var i = 0; i < count; i++) {
          list.push(this.describeOne(this.count <= 2));
        }
        return merge_things(list);
      } else {
        return this.count + " people";
      }
    } else {
      return (this.count > 1 ? this.count + " people" : "a person");
    }
  };

  return this;
}

function Human(count = 1) {
  this.name = "Person";

  copy_defaults(this,new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function (verbose=true) {
    var body = random_desc(["skinny","fat","tall","short","stocky","spindly","muscular","fit","tanned"], (verbose ? 0.6 : 0));
    var sex = random_desc(["man", "woman"], 1);
    return "a " + merge_desc([body,sex]);
  };

  this.describe = function(verbose=true) {
    if (verbose) {
      if (count <= 3) {
        var list = [];
        for (var i = 0; i < count; i++) {
          list.push(this.describeOne(this.count <= 2));
        }
        return merge_things(list);
      } else {
        return this.count + " people";
      }
    } else {
      return (this.count > 1 ? this.count + " people" : "a person");
    }
  };

  return this;
}

function Cow(count = 1) {
  this.name = "Cow";

  copy_defaults(this,new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function (verbose=true) {
    var body = random_desc(["skinny","fat","tall","short","stocky","spindly"], (verbose ? 0.6 : 0));
    var sex = random_desc(["male", "female"], (verbose ? 1 : 0));
    return "a " + merge_desc([body,sex,"cow"]);
  };

  this.describe = function(verbose=true) {
    if (verbose) {
      if (count <= 3) {
        var list = [];
        for (var i = 0; i < count; i++) {
          list.push(this.describeOne(this.count <= 2));
        }
        return merge_things(list);
      } else {
        return this.count + " cattle";
      }
    } else {
      return (this.count > 1 ? this.count + " cattle" : "a cow");
    }
  };

  return this;
}

function EmptyCar(count = 1) {
  this.name = "Car";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var color = random_desc(["black","black","gray","gray","blue","red","tan","white","white"]);
    var adjective = random_desc(["rusty","brand-new","luxury","beat-up","dented","restored","classic"],0.3);
    var type = random_desc(["SUV","coupe","sedan","truck","van","convertible"]);
    return "a parked " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne());
        }
        return merge_things(list);
      } else {
        return this.count + " parked cars";
      }
    } else {
      return (this.count > 1 ? this.count + " parked cars" : "a parked car");
    }

  };
}

function Car(count = 1) {
  this.name = "Car";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var color = random_desc(["black","black","gray","gray","blue","red","tan","white","white"], (verbose ? 1 : 0));
    var adjective = random_desc(["rusty","brand-new","luxury","beat-up","dented","restored","classic"], (verbose ? 0.3 : 0));
    var type = random_desc(["SUV","coupe","sedan","truck","van","convertible"]);
    return "a " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " cars with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " cars" : "a car");
    }

  };
}

function Bus(count = 1) {
  this.name = "Bus";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var adjective = random_desc(["rusty","brand-new","aging","modern"], (verbose ? 0.3 : 0));
    var color = random_desc(["black","tan","gray"], (verbose ? 1 : 0));
    var type = random_desc(["bus","double-decker bus","articulating bus","open-top bus","sleeper bus","intercity bus"]);
    return "a " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " buses with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " buses" : "a bus");
    }

  };
}

function Tram(count = 1) {
  this.name = "Tram";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var adjective = random_desc(["rusty","weathered","well-maintained",], (verbose ? 0.3 : 0));
    var color = random_desc(["blue","brown","gray"], (verbose ? 1 : 0));
    var type = random_desc(["tram"]);
    return "a " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count == 1) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(verbose));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " trams with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " trams" : "a tram");
    }
  };

  this.anal_vore = function() {
    return "You slide " + this.describe() + " up your tight ass";
  };
}

function Train(count = 1) {
  this.name = "Train";
  copy_defaults(this,new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var adjective = random_desc(["rusty","brand-new","steam","freshly-painted"], (verbose ? 0.3 : 0));
    var color = random_desc(["black","tan","gray"], (verbose ? 1 : 0));
    var type = random_desc(["train","passenger train","freight train"]);
    return "a " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count == 1) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(verbose));
        }
        return merge_things(list) + " with " + this.contents["engine"].describe(false) + " in the engine and " + this.contents["Train Car"].describe()  + " attached";
      } else {
        return this.count + " trains with " + this.contents["engine"].describe(false) + " in the engine and " + this.contents["Train Car"].describe()  + " attached";
      }
    } else {
      return (this.count > 1 ? this.count + " trains" : "a train");
    }

  };

  this.anal_vore = function() {
    var cars = (this.contents["Train Car"].count == 1 ? this.contents["Train Car"].describe() + " follows it inside" : this.contents["Train Car"].describe() + " are pulled slowly inside");
    return "You snatch up " + this.describeOne() + " and stuff it into your pucker, moaning as " + cars;
  };
}

function TrainCar(count = 1) {
  this.name = "Train Car";
  copy_defaults(this,new DefaultEntity());

  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var adjective = random_desc(["rusty","brand-new","vintage","graffitied","well-maintained"], (verbose ? 0.3 : 0));
    var color = random_desc(["black","tan","gray","yellow","steel","wooden"], (verbose ? 1 : 0));
    var type = random_desc(["train car","passenger train car","freight train car"]);
    return "a " + merge_desc([adjective,color,type]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count > 1 ? this.count + " train cars" : "a train car") + " with " + describe_all(this.contents) + " inside";
    } else {
      return (this.count > 1 ? this.count + " train cars" : "a train car");
    }
  };
}

function House(count = 1) {
  this.name = "House";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var size = random_desc(["little","two-story","large","well-built","run-down","cheap",], (verbose ? 0.5 : 0));
    var color = random_desc(["blue","white","gray","tan","green","wooden","brick"], (verbose ? 0.5 : 0));
    var name = random_desc(["house","home","house","house","house","trailer"], 1);
    return "a " + merge_desc([size,color,name]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " homes with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " houses" : "a house");
    }
  };
}
//might split this into a general business and resutrant categories
function Business(count = 1) {
  this.name = "Business";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var size = random_desc(["little","two-story","large","well-built","run-down","cheap","aging","corner"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue","white","gray","tan","green","brick","concrete"], (verbose ? 0.5 : 0));
    var name = random_desc(["mall","resturant","bank","clinic","shop","post office","tire shop","chain resturant","grocery store","barber shop","pizza resturant","hardware store","movie theather","gas station"], 1);
    return "a " + merge_desc([size,color,name]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose);
      } else {
        return this.count + " local business containing " + describe_all(this.contents,verbose);
      }
    } else {
      return (this.count > 1 ? this.count + " buildings" : "a local business");
    }
  };
}

function Barn(count = 1) {
  this.name = "Barn";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var size = random_desc(["little","big","large","weathered","rotted","new"], (verbose ? 0.5 : 0));
    var color = random_desc(["blue","white","gray","tan","green","red"], (verbose ? 0.5 : 0));
    var name = random_desc(["barn","barn","barn","barn","barn","farmhouse"], 1);
    return "a " + merge_desc([size,color,name]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " barns with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " barns" : "a barn");
    }
  };
}

function SmallSkyscraper(count = 1) {
  this.name = "Small Skyscraper";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var color = random_desc(["blue","white","gray","tan","green"], (verbose ? 0.5 : 0));
    var name = random_desc(["skyscraper","office tower","office building","high rise"], 1);
    return "a " + merge_desc([color,name]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " small skyscrapers with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " small skyscrapers" : "a small skyscraper");
    }

  };
}

function LargeSkyscraper(count = 1) {
  this.name = "Large Skyscraper";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    var color = random_desc(["blue","white","gray","tan","green","glass"], (verbose ? 0.5 : 0));
    var name = random_desc(["skyscraper","office tower","office building"], 1);
    return "a " + merge_desc(["towering",color,name]);
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      if (this.count <= 3) {
        var list = [];
        for (var i = 0; i < this.count; i++) {
          list.push(this.describeOne(this.count < 2));
        }
        return merge_things(list) + " with " + describe_all(this.contents,verbose) + " inside";
      } else {
        return this.count + " large skyscrapers with " + describe_all(this.contents,verbose) + " inside";
      }
    } else {
      return (this.count > 1 ? this.count + " large skyscrapers" : "a large skyscraper");
    }
  };
}

function ParkingGarage(count = 1) {
  this.name = "Parking Garage";
  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describeOne = function(verbose=true) {
    return "a parking garage";
  };

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a parking garage" : this.count + " parking garages") + " with " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a parking garage" : this.count + " parking garages");
    }
  };
}
function Town(count = 1) {
  this.name = "Town";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a town" : this.count + " towns") + " with " + describe_all(this.contents, verbose) + " in " + (this.count == 1 ? "it" : "them");
    } else {
      return (this.count == 1 ? "a town" : this.count + " towns");
    }
  };
}

function City(count = 1) {
  this.name = "City";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a city" : this.count + " cities") + " with " + describe_all(this.contents, verbose) + " in " + (this.count == 1 ? "it" : "them");
    } else {
      return (this.count == 1 ? "a city" : this.count + " cities");
    }
  };
}

function Continent(count = 1) {
  this.name = "Continent";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a continent" : this.count + " continents") + " with " + describe_all(this.contents, verbose) + " on " + (this.count == 1 ? "it" : "them");
    } else {
      return (this.count == 1 ? "a continent" : this.count + " continents");
    }
  };
}

function Planet(count = 1) {
  this.name = "Planet";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a planet" : this.count + " planets") + " with " + describe_all(this.contents, verbose) + " on " + (this.count == 1 ? "it" : "them");
    } else {
      return (this.count == 1 ? "a planet" : this.count + " planets");
    }
  };
}

function Star(count = 1) {
  this.name = "Star";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    return (this.count == 1 ? "a star" : this.count + " stars");
  };
}

function SolarSystem(count = 1) {
  this.name = "Solar System";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a solar system" : this.count + " solar systems") + " made up of " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a solar system" : this.count + " solar systems");
    }
  };
}

function Galaxy(count = 1) {
  this.name = "Galaxy";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a galaxy" : this.count + " galaxies") + " made up of " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a galaxy" : this.count + " galaxies");
    }
  };
}

function Cluster(count = 1) {
  this.name = "Cluster";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a cluster" : this.count + " clusters") + " made up of " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a cluster" : this.count + " clusters");
    }
  };
}

function Universe(count = 1) {
  this.name = "Universe";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a universe" : this.count + " universes") + " made up of " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a universe" : this.count + " universes");
    }
  };
}

function Multiverse(count = 1) {
  this.name = "Multiverse";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a multiverse" : this.count + " multiverses") + " made up of " + describe_all(this.contents, verbose);
    } else {
      return (this.count == 1 ? "a multiverse" : this.count + " multiverses");
    }
  };
}

function Soldier(count = 1) {
  this.name = "Soldier";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
      return (this.count == 1 ? "a soldier" : this.count + " soldiers");
  };
}

function Tank(count = 1) {
  this.name = "Tank";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a tank" : this.count + " tanks") + " with " + describe_all(this.contents, verbose) + " trapped inside";
    } else {
      return (this.count == 1 ? "a tank" : this.count + " tanks");
    }
  };
}

function Artillery(count = 1) {
  this.name = "Artillery";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "an artillery unit" : this.count + " artillery units") + " with " + describe_all(this.contents, verbose) + " trapped inside";
    } else {
      return (this.count == 1 ? "an artillery unit" : this.count + " artillery units");
    }
  };
}

function Helicopter(count = 1) {
  this.name = "Helicopter";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    if (verbose) {
      return (this.count == 1 ? "a helicopter" : this.count + " helicopters") + " with " + describe_all(this.contents, verbose) + " riding inside";
    } else {
      return (this.count == 1 ? "a helicopter" : this.count + " helicopters");
    }
  };
}

function Micro(count = 1) {
  this.name = "Micro";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    return (this.count == 1 ? "a micro" : this.count + " micros");
  };
}

function Macro(count = 1) {
  this.name = "Macro";

  copy_defaults(this,new DefaultEntity());
  this.count = count;
  this.contents = initContents(this.name,this.count);

  this.describe = function(verbose = true) {
    return (this.count == 1 ? "a smaller macro" : this.count + " smaller macros");
  };
}

function Squad(count = 1) {
    this.name = "Squad";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a squad";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a squad" : this.count + " squads") + " made up of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a squad" : this.count + " squads");
      }
    };
  }

function Platoon(count = 1) {
    this.name = "Platoon";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a military platoon";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a platoon" : this.count + " platoons") + " consisting of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a platoon" : this.count + " platoons");
      }
    };
  }

function Company(count = 1) {
    this.name = "Company";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a company of soldiers";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a company" : this.count + " companies") + " of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a company" : this.count + " companies");
      }
    };
  }

function Battalion(count = 1) {
    this.name = "Battalion";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a battalion";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a battalion" : this.count + " battalions") + " containing " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a battalion" : this.count + " battalions");
      }
    };
  }

function Brigade(count = 1) {
    this.name = "Brigade";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a brigade";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a brigade" : this.count + " brigades") + " made up of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a brigade" : this.count + " brigades");
      }
    };
  }

function Division(count = 1) {
    this.name = "Division";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a division";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a division" : this.count + " divisions") + " of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a division" : this.count + " divisions");
      }
    };
  }

function TankDivision(count = 1) {
    this.name = "Tank Division";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "a tank division";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "a tank division" : this.count + " tank divisions") + " of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "a tank division" : this.count + " tank divisions");
      }
    };
  }

function Army(count = 1) {
    this.name = "Army";
    copy_defaults(this,new DefaultEntity());
    this.count = count;
    this.contents = initContents(this.name,this.count);

    this.describeOne = function(verbose=true) {
        return "an army";
    };

    this.describe = function(verbose = true) {
      if (verbose) {
        return (this.count == 1 ? "an army" : this.count + " armies") + " made up of " + describe_all(this.contents, verbose);
      } else {
        return (this.count == 1 ? "an army" : this.count + " armies");
      }
    };
  }
