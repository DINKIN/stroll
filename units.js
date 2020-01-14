'use strict';

function round(number, precision = 3) {
  return Math.round(number * Math.pow(10, precision)) / Math.pow(10, precision);
}

function numberRough(value, suffix = "") {
  if (value == 1) {
    return "a single";
  } else if (value < 5) {
    return "a few";
  } else if (value < 12) {
    return "a handful " + suffix;
  } else if (value == 12) {
    return "a dozen";
  } else {
    var scale = Math.floor(Math.log10(value));
    switch (scale) {
      case 1: return "dozens " + suffix;
      case 2: return "hundreds " + suffix;
      default:
        let prefix = "";

        if (scale % 3 == 1)
          prefix = "tens of ";
        else if (scale % 3 == 2)
          prefix = "hundreds of ";

        let order = Math.floor(scale / 3);

        switch (order) {
          case 1: return prefix + "thousands " + suffix;
          case 2: return prefix + "millions " + suffix;
          case 3: return prefix + "billions " + suffix;
          case 4: return prefix + "trillions " + suffix;
          case 5: return prefix + "quadrillions " + suffix;
          case 6: return prefix + "quintillions " + suffix;
          default: return "uncountably many";
        }
    }
  }
}

function fixedIfDecimal(num, fixed) {
  if (fixed === undefined)
    return num.toString();
  else;
  return num.toFixed(fixed);
}

function number(value, type = "full", fixed) {
  var val = parseFloat(value);
  switch (type) {
    case "full":
      if (Math.log(value) / Math.log(10) < 10) {
        return fixedIfDecimal(val, fixed);
      }

    case "scientific": return val.toExponential(3, fixed).toString();
    case "words": return number_words_repeated(val, fixed);
    case "prefix": return number_prefix(val, fixed);
  }
}

function number_words(value) {
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0) {
    return fixedIfDecimal(value, fixed);
  }
  switch (scale) {
    case 0: return value.toString();
    case 1: return Math.round(value / 1e3).toString() + " thousand";
    case 2: return Math.round(value / 1e6).toString() + " million";
    case 3: return Math.round(value / 1e9).toString() + " billion";
    case 4: return Math.round(value / 1e12).toString() + " trillion";
    case 5: return Math.round(value / 1e15).toString() + " quadrillion";
    case 6: return Math.round(value / 1e18).toString() + " quintillion";
    case 7: return Math.round(value / 1e21).toString() + " sextillion";
    case 8: return Math.round(value / 1e24).toString() + " septillion";
    case 9: return Math.round(value / 1e27).toString() + " octillion";
    case 10: return Math.round(value / 1e30).toString() + " nonillion";
    case 11: return Math.round(value / 1e33).toString() + " decillion";
    case 12: return Math.round(value / 1e36).toString() + " undecillion";
    case 13: return Math.round(value / 1e39).toString() + " duodecillion";
    case 14: return Math.round(value / 1e42).toString() + " tredecillion";
    case 15: return Math.round(value / 1e45).toString() + " quattuordecillion";
    case 16: return Math.round(value / 1e48).toString() + " quindecillion";
    case 17: return Math.round(value / 1e51).toString() + " sexdecillion";
    case 18: return Math.round(value / 1e54).toString() + " septendecillion";
    case 19: return Math.round(value / 1e57).toString() + " octodecillion";
    case 20: return Math.round(value / 1e60).toString() + " novemdecillion";
    default: return Math.round(value / 1e63).toString() + " vigintillion";
  }
}

function number_words_repeated(value, fixed) {
  if (value == Infinity)
    return "a lot of";
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0)
    return fixedIfDecimal(value, fixed);
  switch (scale) {
    case 0: return fixedIfDecimal(value, fixed);
    case 1: return Math.round(value / 1e3).toString() + " thousand";
    case 2: return Math.round(value / 1e6).toString() + " million";
    case 3: return Math.round(value / 1e9).toString() + " billion";
    case 4: return Math.round(value / 1e12).toString() + " trillion";
    case 5: return Math.round(value / 1e15).toString() + " quadrillion";
    case 6: return Math.round(value / 1e18).toString() + " quintillion";
    case 7: return Math.round(value / 1e21).toString() + " sextillion";
    case 8: return Math.round(value / 1e24).toString() + " septillion";
    case 9: return Math.round(value / 1e27).toString() + " octillion";
    case 10: return Math.round(value / 1e30).toString() + " nonillion";
    case 11: return Math.round(value / 1e33).toString() + " decillion";
    default: return number_words_repeated(value / 1e33) + " decillion";
  }
}

function number_prefix(value, fixed) {
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0)
    return fixedIfDecimal(value, fixed);
  switch (scale) {
    case 0: return fixedIfDecimal(value, fixed);
    case 1: return Math.round(value / 1e3).toString() + "K";
    case 2: return Math.round(value / 1e6).toString() + "M";
    case 3: return Math.round(value / 1e9).toString() + "G";
    case 4: return Math.round(value / 1e12).toString() + "T";
    case 5: return Math.round(value / 1e15).toString() + "P";
    case 6: return Math.round(value / 1e18).toString() + "E";
    case 7: return Math.round(value / 1e21).toString() + "Z";
    default: return Math.round(value / 1e24).toString() + "Y";
  }
}

function mass(kg, type = "metric", singular = false) {
  switch (type) {
    case "metric": return metricMass(kg, singular);
    case "SI": return metricSymMass(kg, singular);
    case "customary": return customaryMass(kg, singular);
    case "US": return customarySymMass(kg, singular);
    case "approx": return approxMass(kg, singular);
  }
}

function length(m, type = "metric", singular = false) {
  switch (type) {
    case "metric": return metricLength(m, singular);
    case "SI": return metricSymLength(m, singular);
    case "customary": return customaryLength(m, singular);
    case "US": return customarySymLength(m, singular);
    case "approx": return approxLength(m, singular);
  }
}

function area(m2, type = "metric", singular = false) {
  switch (type) {
    case "metric": return metricArea(m2, singular);
    case "SI": return metricSymArea(m2, singular);
    case "customary": return customaryArea(m2, singular);
    case "US": return customarySymArea(m2, singular);
    case "approx": return approxArea(m2, singular);
  }
}

function volume(m3, type = "metric", singular = false) {
  switch (type) {
    case "metric": return metricVolume(m3, singular);
    case "SI": return metricSymVolume(m3, singular);
    case "customary": return customaryVolume(m3, singular);
    case "US": return customarySymVolume(m3, singular);
    case "approx": return approxVolume(m3, singular);
  }
}

function metricMass(kg, singular = false) {
  if (kg < 1 / 1000) {
    let mass = round(kg * 1e6, 0);
    return mass + (singular || mass == 1 ? " milligram" : " milligrams");
  } else if (kg < 1) {
    let mass = round(kg * 1000, 0);
    return mass + (singular || mass == 1 ? " gram" : " grams");
  } else if (kg < 5000) {
    let mass = round(kg, 0);
    return mass + (singular || mass == 1 ? " kilogram" : " kilograms");
  } else if (kg < 5000000) {
    let mass = round(kg / 1000, 1);
    return mass + (singular || mass == 1 ? " metric ton" : " metric tons");
  } else if (kg < 5000000000) {
    let mass = round(kg / 1000000, 1);
    return mass + (singular || mass == 1 ? " kiloton" : " kilotons");
  } else if (kg < 5000000000000) {
    let mass = round(kg / 1000000000, 1);
    return mass + (singular || mass == 1 ? " megaton" : " megatons");
  } else {
    let mass = round(kg / 1000000000000, 1);
    return mass + (singular || mass == 1 ? " gigaton" : " gigatons");
  }
}

function metricSymMass(kg, singular = false) {
  if (kg < 1 / 1000) {
    let mass = round(kg * 1e6, 0);
    return mass + " mg";
  } else if (kg < 1) {
    let mass = round(kg * 1000, 0);
    return mass + " g";
  } else if (kg < 5000) {
    let mass = round(kg, 0);
    return mass + " kg";
  } else if (kg < 5000000) {
    let mass = round(kg / 1000, 1);
    return mass + " t";
  } else if (kg < 5000000000) {
    let mass = round(kg / 1000000, 1);
    return mass + " kt";
  } else if (kg < 5000000000000) {
    let mass = round(kg / 1000000000, 1);
    return mass + " mt";
  } else {
    let mass = round(kg / 1000000000000, 1);
    return mass + " gt";
  }
}

function customaryMass(kg, singular = false) {
  let lbs = kg * 2.2;

  if (lbs < 1) {
    let mass = round(lbs * 16, 0);
    return mass + (singular || mass == 1 ? " ounce" : " ounces");
  } else if (lbs < 2000) {
    let mass = round(lbs, 0);
    return mass + (singular || mass == 1 ? " pound" : " pounds");
  } else {
    let mass = round(lbs / 2000, 1);
    return mass + (singular || mass == 1 ? " ton" : " tons");
  }
}

function customarySymMass(kg, singular = false) {
  let lbs = kg * 2.2;

  if (lbs < 1) {
    let mass = round(lbs * 16, 0);
    return mass + " oz";
  } else if (lbs < 2000) {
    let mass = round(lbs, 0);
    return mass + (singular || mass == 1 ? " lb" : " lbs");
  } else {
    let mass = round(lbs / 2000, 1);
    return mass + (singular || mass == 1 ? " ton" : " tons");
  }
}

function approxMass(kg, singular = false) {
  if (kg < 4500) {
    let mass = round(kg / 1000, 2);
    return mass + (singular || mass == 1 ? "car" : " cars");
  } else if (kg < 54431) {
    let mass = round(kg / 6000, 2);
    return mass + (singular || mass == 1 ? " elephant" : " elephants");
    //this unit almost never gets used and is mostly redundant, perhaps remove it if units are cleaned up
  } else if (kg < 10000000) {
    let mass = round(kg / 54431.1, 2);
    return mass + (singular || mass == 1 ? " tank" : " tanks");
  } else if (kg < 5.2e10) {
    let mass = round(kg / 9.7e7, 2);
    return mass + (singular || mass == 1 ? " aircraft carrier" : " aircraft carriers");
  } else if (kg < 1.5e13) {
    let mass = round(kg / 5.2e10, 2);
    return mass + (singular || mass == 1 ? " Great Wall of China" : " Great Wall Of Chinas");
  } else if (kg < 5e21) {
    let mass = round(kg / 1.5e15, 2);
    return mass + (singular || mass == 1 ? " New York City" : " New York Cities");
    //this figure includes a lot of underlying bedrock, just the city itself is 1.13587210581190e11 but I needed a good figure to fit in this spot
  } else if (kg < 6e23) {
    let mass = round(kg / 4.6e20, 2);
    return mass + (singular || mass == 1 ? " Australia" : " Australias");
    //this is a napkin math number based on the land area of Australia, 25km of height, and rough density of rock
  } else if (kg < 2e27) {
    let mass = round(kg / 6e24, 2);
    return mass + (singular || mass == 1 ? " Earth" : " Earths");
  } else if (kg < 1.4e39) {
    let mass = round(kg / 2e30, 2);
    return mass + (singular || mass == 1 ? " Sun" : " Suns");
  } else {
    let mass = round(kg / 1.4e42, 2);
    return mass + (singular || mass == 1 ? " Milky Way" : " Milky Ways");
  }
}

function metricLength(m, singular = false) {
  if (m < 1 / 100) {
    let length = round(m * 1000, 2);
    return length + (singular || length == 1 ? " millimeter" : " millimeters");
  } else if (m < 1) {
    let length = round(m * 100, 0);
    return length + (singular || length == 1 ? " centimeter" : " centimeters");
  } else if (m < 500) {
    let length = round(m, 2);
    return length + (singular || length == 1 ? " meter" : " meters");
  } else if (m < 1e12) {
    let length = round(m / 1000, 1);
    return length + (singular || length == 1 ? " kilometer" : " kilometers");
  } else if (m < 1e15) {
    let length = round(m / 1e6, 1);
    return length + (singular || length == 1 ? " megameter" : " megameters");
  } else if (m < 1e18) {
    let length = round(m / 1e9, 1);
    return length + (singular || length == 1 ? " gigameter" : " gigameters");
  } else {
    let length = round(m / 1e12, 1);
    return length + (singular || length == 1 ? " terameter" : " terameters");
  }
}

function metricSymLength(m, singular = false) {
  if (m < 1 / 100) {
    let length = round(m * 1000, 2);
    return length + " mm";
  } else if (m < 1) {
    let length = round(m * 100, 0);
    return length + " cm";
  } else if (m < 500) {
    let length = round(m, 2);
    return length + " m";
  } else {
    let length = round(m / 1000, 1);
    return length + " km";
  }
}

function customaryLength(m, singular = false) {
  let ft = m * 3.28084;

  if (ft < 1) {
    let length = round(ft * 12, 0);
    return length + (singular || length == 1 ? " inch" : " inches");
  } else if (ft < 5280) {
    let end = customaryLength((ft - Math.floor(ft)) / 3.28084, singular);
    let length = Math.floor(ft);
    return length + (singular || length == 1 ? " foot" : " feet") + " " + end;
  } else {
    let length = round(ft / 5280, 1);
    return length + (singular || length == 1 ? " mile" : " miles");
  }
}

function customarySymLength(m, singular = false) {
  let ft = m * 3.28084;

  if (ft < 1) {
    let length = round(ft * 12, 0);
    return length + "\"";
  } else if (ft < 5280) {
    let end = customarySymLength((ft - Math.floor(ft)) / 3.28084, singular);
    let length = Math.floor(ft);
    return length + "'" + " " + end;
  } else {
    let length = round(ft / 5280, 1);
    return length + " mi";
  }
}

function approxLength(m, singular = false) {
  if (m < 25) {
    let length = round(m / 1.9, 1);
    return length + (singular || length == 1 ? " person" : " people");
  } else if (m < 350) {
    let length = round(m / 49, 1);
    return length + (singular || length == 1 ? " football field" : " football fields");
  } else if (m < 20000) {
    let length = round(m / 449, 1);
    return length + (singular || length == 1 ? " Empire State Building" : " Empire State Buildings");
  } else if (m < 2000000) {
    let length = round(m / 80467.2, 1);
    return length + (singular || length == 1 ? " Panama Canal" : " Panama Canals");
  } else if (m < 3474574 * 2) {
    let length = round(m / 3474574, 1);
    return length + (singular || length == 1 ? " Moon" : " moons");
  } else if (m < 12.742e6 * 130) {
    let length = round(m / 12.742e6, 2);
    return length + (singular || length == 1 ? " Earth" : " earths");
  } else if (m < 149.6e12) {
    let length = round(m / 149.6e9, 3);
    return length + (singular || length == 1 ? " AU" : " AUs");
  } else if (m < 9.4607e22) {
    let length = round(m / 9.4607e15, 3);
    return length + (singular || length == 1 ? " light year" : " light years");
  } else if (m < 3e19) {
    let length = round(m / 3.0856776e16, 3);
    return length + (singular || length == 1 ? " parsec" : " parsecs");
  } else if (m < 3e22) {
    let length = round(m / 3.0856776e19, 3);
    return length + (singular || length == 1 ? " kiloparsec" : " kiloparsecs");
  } else if (m < 3e25) {
    let length = round(m / 3.0856776e22, 3);
    return length + (singular || length == 1 ? " megaparsec" : " megaparsecs");
  } else if (m < 3e28) {
    let length = round(m / 3.0856776e25, 3);
    return length + (singular || length == 1 ? " gigaparsec" : " gigaparsecss");
  } else {
    let length = round(m / 3.0856776e28, 3);
    return length + (singular || length == 1 ? " teraparsec" : " teraparsecs");
  }
}

function metricArea(m2, singular = false) {
  if (m2 < 1 / 10) {
    let area = round(m2 * 10000, 2);
    return area + (singular || area == 1 ? " square centimeter" : " square centimeters");
  } else if (m2 < 100000) {
    let area = round(m2, 2);
    return area + (singular || area == 1 ? " square meter" : " square meters");
  } else {
    let area = round(m2 / 1e6, 2);
    return area + (singular || area == 1 ? " kilometer" : " square kilometers");
  }
}

function metricSymArea(m2, singular = false) {
  if (m2 < 1 / 10) {
    let area = round(m2 * 10000, 2);
    return area + " cm" + "2".sup();
  } else if (m2 < 100000) {
    let area = round(m2, 2);
    return area + " m" + "2".sup();
  } else {
    let area = round(m2 / 1e6, 2);
    return area + " km" + "2".sup();
  }
}

function customaryArea(m2, singular = false) {
  let ft2 = m2 * 3.28084 * 3.28084;

  if (ft2 < 1) {
    let area = round(ft2 * 144, 0);
    return area + (singular || area == 1 ? " square inch" : " square inches");
  } else if (ft2 < 5280 * 5280 / 10) {
    let area = round(ft2, 1);
    return area + (singular || area == 1 ? " square foot" : " square feet");
  } else {
    let area = round(ft2 / 5280 / 5280, 1);
    return area + (singular || area == 1 ? " square mile" : " square miles");
  }
}

function customarySymArea(m2, singular = false) {
  if (m2 < 1 / 10) {
    let area = round(m2 * 10000, 2);
    return area + " in" + "2".sup();
  } else if (m2 < 100000) {
    let area = round(m2, 2);
    return area + " ft" + "2".sup();
  } else {
    let area = round(m2 / 1e6, 2);
    return area + " mi" + "2".sup();
  }
}

function approxArea(m2, singular = false) {
  if (m2 < 20000) {
    let area = round(m2 / 5341.85, 1);
    return area + (singular || area == 1 ? " football field" : " football fields");
  } else if (m2 < 9.36e+15) {
    let area = round(m2 / 10117.1, 1);
    return area + (singular || area == 1 ? " block" : " blocks");
  } else if (m2 < 3.7920361e+13) {
    let area = round(m2 / 9.36e+8, 1);
    return area + (singular || area == 1 ? " city" : " cities");
  } else if (m2 < 9.4800902e+18) {
    let area = round(m2 / 9.4800902e+12, 1);
    return area + (singular || area == 1 ? " moon" : " moons");
  } else if (m2 < 2.8118957330513e+42) {
    let area = round(m2 / 6.4900004e+28, 1);
    return area + (singular || area == 1 ? " solar system" : " solar systems");
  } else {
    let area = round(m2 / 2.8118957330513e+42, 1);
    return area + (singular || area == 1 ? " milky way" : " milky ways");
  }
}

function metricVolume(m3, singular = false) {
  if (m3 < 1 / 1000) {
    let volume = round(m3 * 1e6, 0);
    return volume + (singular || volume == 1 ? " milliliter" : " milliliters");
  } else if (m3 < 1) {
    let volume = round(m3 * 1000, 1);
    return volume + (singular || volume == 1 ? " liter" : " liters");
  } else if (m3 < 1000000) {
    let volume = round(m3, 0);
    return volume + (singular || volume == 1 ? " cubic meter" : " cubic meters");
  } else if (m3 < 1e12) {
    let volume = round(m3 / 1e9, 3);
    return volume + (singular || volume == 1 ? " cubic kilometer" : " cubic kilometers");
  } else {
    let volume = round(m3 / 1e9, 0);
    return volume + (singular || volume == 1 ? " cubic kilometer" : " cubic kilometers");
  }
}

function metricSymVolume(m3, singular = false) {
  if (m3 < 1 / 1000) {
    let volume = round(m3 * 1e6, 0);
    return volume + " mL";
  } else if (m3 < 1) {
    let volume = round(m3 * 1000, 1);
    return volume + " L";
  } else if (m3 < 1000000) {
    let volume = round(m3, 0);
    return volume + " m" + "³";
  } else if (m3 < 1e12) {
    let volume = round(m3 / 1e9, 3);
    return volume + " km" + "³";
  } else {
    let volume = round(m3 / 1e9, 0);
    return volume + " km" + "³";
  }
}

function customaryVolume(m3, singular = false) {
  let gallons = m3 * 264.172;
  if (gallons < 1 / 16) {
    let volume = round(gallons * 128, 0);
    return volume + (singular || volume == 1 ? " fluid ounce" : " fluid ounces");
  } else if (gallons < 1 / 4) {
    let volume = round(gallons * 16, 1);
    return volume + (singular || volume == 1 ? " cup" : " cups");
  } else if (gallons < 1 / 2) {
    let volume = round(gallons * 8, 1);
    return volume + (singular || volume == 1 ? " pint" : " pints");
  } else if (gallons < 1) {
    let volume = round(gallons * 4, 1);
    return volume + (singular || volume == 1 ? " quart" : " quarts");
  } else if (gallons < 100) {
    let volume = round(gallons, 1);
    return volume + (singular || volume == 1 ? " gallon" : " gallons");
  } else {
    let volume = round(gallons, 0);
    return volume + (singular || volume == 1 ? " gallon" : " gallons");
  }
}

function customarySymVolume(m3, singular = false) {
  let gallons = m3 * 264.172;
  if (gallons < 1 / 16) {
    let volume = round(gallons * 128, 0);
    return volume + " fl oz";
  } else if (gallons < 1 / 4) {
    let volume = round(gallons * 16, 1);
    return volume + (singular || volume == 1 ? " cp" : " cps");
  } else if (gallons < 1 / 2) {
    let volume = round(gallons * 8, 1);
    return volume + " pt";
  } else if (gallons < 1) {
    let volume = round(gallons * 4, 1);
    return volume + " qt";
  } else if (gallons < 100) {
    let volume = round(gallons, 1);
    return volume + " g";
  } else {
    let volume = round(gallons, 0);
    return volume + " g";
  }
}

function approxVolume(m3, singular = false) {
  if (m3 < 2 / 10000) {
    let volume = round(m3 * 4e5, 0);
    return volume + (singular || volume == 1 ? " shot" : " shots");
  } else if (m3 < .1) {
    let volume = round(m3 * 2254, 1);
    return volume + (singular || volume == 1 ? " glass" : " glasses");
  } else if (m3 < 100) {
    let volume = round(m3 * 2.64, 1);
    return volume + (singular || volume == 1 ? " bathtub" : " bathtubs");
  } else if (m3 < 1e5) {
    let volume = round(m3 / 1000, 2);
    return volume + (singular || volume == 1 ? " Olympic swimming pool" : " Olympic swimming pools");
  } else if (m3 < 1e9) {
    let volume = round(m3 / 3.2e5, 2);
    return volume + (singular || volume == 1 ? " oil tanker" : " oil tankers");
  } else if (m3 < 1e15) {
    let volume = round(m3 / 1.8919e10, 3);
    return volume + (singular || volume == 1 ? " Great Salt Lake" : " Great Salt Lakes");
  } else if (m3 < 1e20) {
    let volume = round(m3 / 3.547e17, 3);
    return volume + (singular || volume == 1 ? " ocean" : " oceans");
  } else if (m3 < 1e25) {
    let volume = round(m3 / 1e21, 3);
    return volume + (singular || volume == 1 ? " Earth" : " Earths");
  } else {
    let volume = round(m3 / 1.4e27, 3);
    return volume + (singular || volume == 1 ? " Sun" : " Suns");
  }
}


function makeSphere(input = 0, diameter = false) {
  if (diameter = true) {
    input = input / 2;
  }
  return (4 / 3) * Math.PI * (Math.pow(input, 3));
}

function breakSphere(input = 0, diameter = false) {
  let output = math.pow((3 * input) / (4 * Math.PI), 1 / 3)
  if (diameter = true) {
    output = output * 2;
  }
  return output;
}
