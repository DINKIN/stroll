'use strict';

function round(number,precision=3) {
  return Math.round(number*Math.pow(10,precision)) / Math.pow(10,precision);
}

function number(value, type="full", precision=3) {
  var val = parseFloat(value);
  switch(type) {
    case "full": return val.toString();
    case "scientific": return val.toExponential(precision).toString();
    case "words": return number_words_repeated(val);
    case "prefix": return number_prefix(val);
  }
}

function number_words(value) {
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0) {
    return value.toString();
  }
  switch(scale) {
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

function number_words_repeated(value) {
  if (value == Infinity)
    return "a lot of";
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0)
    return value.toString();
  switch(scale) {
    case 0: return value.toString();
    case 1: return Math.round(value / 1e3).toString() + " thousand";
    case 2: return Math.round(value / 1e6).toString() + " million";
    case 3: return Math.round(value / 1e9).toString() + " billion";
    case 4: return Math.round(value / 1e12).toString() + " trillion";
    case 5: return Math.round(value / 1e15).toString() + " quadrillion";
    case 6: return Math.round(value / 1e18).toString() + " quintillion";
    default: return number_words_repeated(value / 1e18) + " quintillion";
  }
}

function number_prefix(value) {
  var scale = Math.floor(Math.log(value) / Math.log(1000));
  if (scale < 0)
    return value.toString();
  switch(scale) {
    case 0: return value.toString();
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

function mass(kg, type="metric", singular=false) {
  switch(type) {
    case "metric": return metricMass(kg, singular); break;
    case "customary": return customaryMass(kg, singular); break;
    case "approx": return approxMass(kg, singular); break;
  }
}

function length(m, type="metric", singular=false) {
  switch(type) {
    case "metric": return metricLength(m, singular); break;
    case "customary": return customaryLength(m, singular); break;
    case "approx": return approxLength(m, singular); break;
  }
}

function volume(m3, type="metric", singular=false) {
  switch(type) {
    case "metric": return metricVolume(m3, singular); break;
    case "customary": return customaryVolume(m3, singular); break;
    case "approx": return approxVolume(m3, singular); break;
  }
}

function metricMass(kg, singular=false) {
  if (kg < 1/1000) {
    var mass = round(kg * 1e6,0);
    return mass + (singular || mass == 1 ? " milligram" : " milligrams");
  } else if (kg < 1) {
    var mass = round(kg * 1000,0);
    return mass + (singular || mass == 1 ? " gram" : " grams");
  } else if (kg < 5000) {
    var mass = round(kg,0);
    return mass + (singular || mass == 1 ? " kilogram" : " kilograms");
  } else if (kg < 5000000) {
    var mass = round(kg / 1000,1);
    return mass + (singular || mass == 1 ? " metric ton" : " metric tons");
  } else if (kg < 5000000000) {
    var mass = round(kg / 1000000,1);
    return mass + (singular || mass == 1 ? " kiloton" : " kilotons");
  } else if (kg < 5000000000000) {
    var mass = round(kg / 1000000000,1);
    return mass + (singular || mass == 1 ? " megaton" : " megatons");
  } else {
    var mass = round(kg / 1000000000000,1);
    return mass + (singular || mass == 1 ? " gigaton" : " gigatons");
  }
}

function customaryMass(kg, singular=false) {
  var lbs = kg * 2.2;

  if (lbs < 1) {
    var mass = round(lbs * 16,0);
    return mass + (singular || mass == 1 ? " ounce" : " ounces");
  } else if (lbs < 2000) {
    var mass = round(lbs,0);
    return mass + (singular || mass == 1 ? " pound" : " pounds");
  } else {
    var mass = round(lbs / 2000,1);
    return mass + (singular || mass == 1 ? "ton" : " tons");
  }
}

function approxMass(kg, singular=false) {
  if (kg < 10000) {
    var mass = round(kg/1000,2);
    return (singular || mass == 1 ? "a car" : mass + " cars");
  } else if (kg < 100000) {
    var mass = round(kg/6000,2);
    return (singular || mass == 1 ? "an elephant" : mass + " elephants");
  } else if (kg < 1000000000) {
    var mass = round(kg/54431.1,2);
    return (singular || mass == 1 ? "a tank" : mass + " tanks");
  } else if (kg < 1e21) {
    var mass = round(kg/1.01605e8,2);
    return (singular || mass == 1 ? "an aircraft carrier" : mass + " aircraft carriers");
  } else {
    var mass = round(kg/5.972e24,4);
    return (singular || mass == 1 ? "the Earth" : mass + " Earths");
  }
}

function metricLength(m, singular=false) {
  if (m < 1/100) {
    var length = round(m * 1000,2);
    return length + (singular || length == 1 ? " millimeter" : " millimeters");
  } else if (m < 1) {
    var length = round(m * 100,0);
    return length + (singular || length == 1 ? " centimeter" : " centimeters");
  } else if (m < 500) {
    var length = round(m,2);
    return length + (singular || length == 1 ? " meter" : " meters");
  } else {
    var length = round(m / 1000,1);
    return length + (singular || length == 1 ? " kilometer" : " kilometers");
  }
}

function customaryLength(m, singular=false) {
  var ft = m * 3.28084;

  if (ft < 1) {
    var length = round(ft * 12,0);
    return length + (singular || length == 1 ? " inch" : " inches");
  } else if (ft < 5280) {
    var end = customaryLength((ft - Math.floor(ft))/3.28084, singular);
    var length = Math.floor(ft);
    return length + (singular || length == 1 ? " foot" : " feet") + " " + end;
  } else {
    var length = round(ft/5280,1);
    return length + (singular || length == 1 ? " mile" : " miles");
  }
}

function approxLength(m, singular=false) {
  if (m < 1000) {
    var length = round(m/49,1);
    return length + (singular || length == 1 ? " football field" : " football fields");
  } else if (m < 5000000) {
    var length = round(m/449,1);
    return length + (singular || length == 1 ? " Empire State Building" : " Empire State Buildings");
  } else if (m < 3474574*2) {
    var length = round(m/3474574,1);
    return length + (singular || length == 1 ? " moon" : " moons");
  } else if (m < 12.742e6*100) {
    var length = round(m/12.742e6,1);
    return length + (singular || length == 1 ? " earth" : " earths");
  } else if (m < 149.6e12) {
    var length = round(m/149.6e9,1);
    return length + (singular || length == 1 ? " AU" : " AUs");
  } else {
    var length = round(m/9.4607e15,4);
    return length + (singular || length == 1 ? " light year" : " light years");
  }
}

function metricVolume(m3, singular=false) {
  if (m3 < 1/1000) {
    var volume = round(m3*1e6, 0);
    return volume + (singular || volume == 1 ? " milliliter" : " milliliters");
  } else if (m3 < 1) {
    var volume = round(m3*1000, 1);
    return volume + (singular || volume == 1 ? " liter" : " liters");
  } else if (m3 < 1000000) {
    var volume = round(m3, 0);
    return volume + (singular || volume == 1 ? " cubic meter" : " cubic meters");
  } else if (m3 < 1e12){
    var volume = round(m3/1e9, 6);
    return volume + (singular || volume == 1 ? " cubic kilometer" : " cubic kilometers");
  } else {
    var volume = round(m3/1e9, 0);
    return volume + (singular || volume == 1 ? " cubic kilometer" : " cubic kilometers");
  }
}

function customaryVolume(m3, singular=false) {
  var gallons = m3 * 264.172;
  if (gallons < 1/16) {
    var volume = round(gallons*128,0);
    return volume + (singular || volume == 1 ? " fluid ounce" : " fluid ounces");
  } else if (gallons < 1/4) {
    var volume = round(gallons*16,1);
    return volume + (singular || volume == 1 ? " cup" : " cups");
  } else if (gallons < 1/2) {
    var volume = round(gallons*8,1);
    return volume + (singular || volume == 1 ? " pint" : " pints");
  } else if (gallons < 1) {
    var volume = round(gallons*4,1);
    return volume + (singular || volume == 1 ? " quart" : " quarts");
  } else if (gallons < 100) {
    var volume = round(gallons,1);
    return volume + (singular || volume == 1 ? " gallon" : " gallons");
  } else {
    var volume = round(gallons,0);
    return volume + (singular || volume == 1 ? " gallon" : " gallons");
  }
}

function approxVolume(m3, singular=false) {
  if (m3 < 1/10000) {
    var volume = round(m3*1e6,0);
    return (singular || volume == 1 ? "a shot" : volume + " shots");
  } else if (m3 < 1) {
    var volume = round(m3*2000,0);
    return (singular || volume == 1 ? "a glass" : volume + " glasses");
  } else if (m3 < 10) {
    var volume = round(m3*2.64,1);
    return(singular || volume == 1 ? "a bathtub" : volume + " bathtubs");
  } else if (m3 < 1e9) {
    var volume = round(m3/1000,2);
    return (singular || volume == 1 ? "an Olympic swimming pool" : volume + " Olympic swimming pools");
  } else if (m3 < 1e15) {
    var volume = round(m3/1.8919e10,3);
    return (singular || volume == 1 ? "a Great Salt Lake" : volume + " Great Salt Lakes");
  } else {
    var volume = round(m3/3.547e17, 3);
    return (singular || volume == 1 ? "an ocean" : volume + " oceans");
  }
}
