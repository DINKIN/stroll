var baseHeight = 3.65;
var baseMass = 1360;
var scale = 1;

var strolling = false;

var maxStomachDigest = 10;
var maxBowelsDigest = 10;

var metric = true;

victims = {};

function toggle_auto()
{
  strolling = !strolling;
  document.getElementById("strolling-indicator").innerHTML = strolling ? "Strolling" : "Standing";
  if (strolling)
    update(["You start walking."]);
  else
    update(["You stop walking."]);
}

function toggle_units()
{
  metric = !metric;

  document.getElementById("button-units").innerHTML = metric ? "Metric" : "Customary";

  update();
}

function initVictims()
{
  return {
    "Person": 0,
    "Car": 0,
    "Bus": 0,
    "Tram": 0,
    "Motorcycle": 0,
    "House": 0,
    "Small Skyscraper": 0,
    "Train": 0,
    "Train Car": 0,
    "Parking Garage": 0,
    "Overpass": 0,
  };
};

// lists out total people
function summarize(sum, fatal = true)
{
  return "(" + sum["Person"] + " " + (fatal ? (sum["Person"] > 1 ? "kills" : "kill") : (sum["Person"] > 1 ? "people" : "person")) + ")";
}

var stomach = []
var bowels = []

function getOnePrey(area)
{
  var potential = ["Person", "Car", "Bus", "Tram", "House", "Train", "Parking Garage", "Small Skyscraper"];

  var potAreas = []

  potential.forEach(function (x) {
    potAreas.push([x,areas[x]]);
  });

  potAreas = potAreas.sort(function (x,y) {
    return x[1] < y[1];
  });

  for (var i=0; i<potAreas.length; i++) {
    x = potAreas[i];
    if (x[1] < area) {
      return new things[x[0]](1);
    }
  };

  return new Person(1);
}
function getPrey(region, area)
{
  switch(region)
  {
    case "suburb": return suburbPrey(area);
  }
}

function suburbPrey(area)
{
  return fill_area2(area, {"Person": 0.5, "House": 0.5, "Car": 0.2, "Tram": 0.1, "Bus": 0.1, "Small Skyscraper": 0.05, "Parking Garage": 0.02, "Train": 0.05});
}

function updateVictims(type,prey)
{
  var sums = prey.sum();

  for (var key in sums) {
    if (sums.hasOwnProperty(key)) {
      victims[type][key] += sums[key];
    }
  }
}

function scaleAddMass(scale, baseMass, mass)
{
  var startMass = Math.pow(scale, 3) * baseMass;
  var newMass = startMass + mass;
  return Math.pow(newMass / baseMass, 1/3) ;
}

function feed()
{
  var prey = getPrey("suburb", 0.5*scale*scale);

  var line = prey.eat() + " " + summarize(prey.sum(), false);

  var preyMass = prey.sum_property("mass");

  scale = scaleAddMass(scale, baseMass, preyMass);

  stomach.push(prey);

  if (stomach.length == 1)
    setTimeout(function() { doDigest("stomach"); }, 15000);

  updateVictims("stomach",prey);
  update([line]);
}

function stomp()
{
  var prey = getPrey("suburb", 1.5*scale*scale);
  var line = prey.stomp() + " " + summarize(prey.sum(), true);

  var preyMass = prey.sum_property("mass");

  scale = scaleAddMass(scale, baseMass, preyMass);

  updateVictims("stomped",prey);
  update([line]);
}

function anal_vore()
{
  var prey = getOnePrey(0.25*scale*scale);
  var crushed = getPrey("suburb",3*scale*scale);
  var line1 = prey.anal_vore(baseHeight*scale) + " " + summarize(prey.sum(), false);
  var line2 = crushed.buttcrush() + " " + summarize(crushed.sum(), true)

  var preyMass = prey.sum_property("mass");
  var crushedMass = prey.sum_property("mass");

  scale = scaleAddMass(scale, baseMass, preyMass);
  scale = scaleAddMass(scale, baseMass, crushedMass);

  bowels.push(prey);

  if (bowels.length == 1)
    setTimeout(function() { doDigest("bowels"); }, 15000);

  updateVictims("bowels",prey);
  updateVictims("stomped",crushed);
  update([line1,line2]);
}

function update(lines = [])
{
  var log = document.getElementById("log");

  lines.forEach(function (x) {
    var line = document.createElement('div');
    line.innerHTML = x;
    log.appendChild(line);
  });

  log.scrollTop = log.scrollHeight;

  var height = baseHeight * scale;
  var mass = baseMass * Math.pow(scale, 3);

  document.getElementById("height").innerHTML = "Height: " + (metric ? metricLength(height) : customaryLength(height));
  document.getElementById("mass").innerHTML = "Mass: " + (metric ? metricMass(mass) : customaryMass(mass));

  for (var type in victims) {
    if (victims.hasOwnProperty(type)) {
      for (var key in victims[type]){
        if (victims[type].hasOwnProperty(key)) {
          if (document.getElementById("stats-" + type + "-" + key) == null) {
            if (victims[type][key] == 0)
              continue;
            child = document.createElement('div');
            child.id = "stats-" + type + "-" + key;
            child.classList.add("stat-line");
            document.getElementById("stats-" + type).appendChild(child);
          }
          document.getElementById("stats-" + type + "-" + key).innerHTML = key + ": " + victims[type][key];
        }
      }
    }
  }
}

function pick_move()
{
  if (!strolling) {
    setTimeout(pick_move, 1500 * Math.sqrt(scale));
    return;
  }
  var choice = Math.random();

  if (choice < 0.2) {
    anal_vore();
  } else if (choice < 0.6) {
    stomp();
  } else {
    feed();
  }
  setTimeout(pick_move, 1500 * Math.sqrt(scale));
}

function grow()
{
  scale *= 1.2;
  update();
}

// pop the list and digest that object

function doDigest(containerName)
{
  var digestType = containerName == "stomach" ? stomach : bowels;
  var count = 0

  if (containerName == "stomach") {
    count = stomach.length;
    count = Math.min(count,maxStomachDigest);
  } else if (containerName == "bowels") {
    count = bowels.length;
    count = Math.min(count,maxBowelsDigest);
  }

  var container = new Container();

  while (count > 0) {
    --count;
    var toDigest = digestType.shift();
    if (toDigest.name != "Container")
      toDigest = new Container([toDigest]);
    container = container.merge(toDigest);
  }

  var digested = container.sum();

  for (var key in victims[containerName]) {
    if (victims[containerName].hasOwnProperty(key) && digested.hasOwnProperty(key) ) {
      victims["digested"][key] += digested[key];
      victims[containerName][key] -= digested[key];
    }
  }

  if (containerName == "stomach")
    update(["Your stomach gurgles as it digests " + container.describe(false) + " " + summarize(container.sum())]);
  else if (containerName == "bowels")
    update(["Your bowels churn as they absorb " + container.describe(false) + " " + summarize(container.sum())]);

  if (digestType.length > 0) {
    setTimeout(function() {
      doDigest(containerName);
    }, 15000);
  }
}

window.addEventListener('load', function(event) {
  victims["stomped"] = initVictims();
  victims["digested"] = initVictims();
  victims["stomach"] = initVictims();
  victims["bowels"] = initVictims();

  document.getElementById("button-grow").addEventListener("click",grow);
  document.getElementById("button-feed").addEventListener("click",feed);
  document.getElementById("button-stomp").addEventListener("click",stomp);
  document.getElementById("button-anal_vore").addEventListener("click",anal_vore);
  document.getElementById("button-stroll").addEventListener("click",toggle_auto);
  document.getElementById("button-units").addEventListener("click",toggle_units);
  setTimeout(pick_move, 2000);

  update();
});
