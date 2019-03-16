'use strict';

/*jshint browser: true*/

var rules = {};
var defaults = {};

function plural(quantity, singular, plural) {
  return quantity > 1 ? plural : singular;
}

function getDefault(name) {
  let tokens = name.split("-");
  for (let i=0; i<tokens.length; i++) {
    tokens[i] = tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
  }

  let funcName = "default" + tokens.join("");

  return window[funcName];
}

function getDefaultVictim(name) {
  let tokens = name.split("-");
  for (let i=0; i<tokens.length; i++) {
    tokens[i] = tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
  }

  let funcName = "default" + tokens.join("");

  return window[funcName];
}

var action_keys = ["eat","chew","vomit","stomp","stomp-wedge","flex-toes","kick","anal-vore","ass-crush","ass-grind","tail-slap","tail-vore","tails-vore","cleavage-stuff","cleavage-crush","cleavage-drop","cleavage-absorb","breast-crush","breast-vore","breast-milk","unbirth","sheath-stuff","sheath-clench","sheath-crush","sheath-absorb","foreskin-stuff","foreskin-clench","foreskin-crush","foreskin-absorb","cock-vore","cockslap","ball-smother","male-spurt","male-orgasm","female-spurt","female-orgasm","grind","pouch-stuff","pouch-rub","pouch-eat","pouch-absorb","soul-vore","soul-absorb-paw","paw-stench","ass-stench","piss-stench","scat-stench","male-orgasm-musk","female-orgasm-musk","male-spurt-musk","female-spurt-musk","belch","fart","stomach","tail","tail-to-stomach","womb","balls","bowels","bowels-to-stomach","breasts","bladder","soul-digest","wings","wings-to-stomach","wear-shoe","remove-shoe","wear-sock","remove-sock","stuff-shoe","dump-shoe","stuff-sock","dump-sock","piss","bladder-vore","scat","sheath-toy","foreskin-toy","slit-toy","breast-toy","melt","solidify","flood","stomp-goo","goo-digest","ass-goo","goo-stomach-pull","goo-stomach-push","goo-bowels-pull","goo-bowels-push","goo-womb-pull","goo-womb-push","goo-balls-pull","goo-balls-push","goo-breasts-pull","goo-breasts-push","goo-tail-pull","goo-tail-push","goo-paws-pull","goo-paws-push","paw-vore","paw-vore-toes","paws","crop-swallow","crop-transfer","breath-fire","breath-ice","breath-electric","breath-smoke","breath-radiation","breath-foul","drool","magic-shrink","magic-hypnotize","wings-flap","wings-vore"];

var victim_keys = ["victim-cum-flood", "victim-femcum-flood", "victim-stomped", "victim-flex-toes", "victim-eaten", "victim-ass-crush", "victim-ass-ground", "victim-humped", "victim-vomit", "victim-chew", "victim-drool", "victim-anal-vore", "victim-tail-slap", "victim-tail-vore", "victim-cock-slap", "victim-cock-vore", "victim-ball-smother", "victim-sheath-crush", "victim-sheath-absorb", "victim-foreskin-crush", "victim-foreskin-absorb", "victim-cum-flood", "victim-male-spurt-musk", "victim-male-orgasm-musk", "victim-unbirth", "victim-femcum-flood", "victim-female-spurt-musk", "victim-female-orgasm-musk", "victim-breast-crush", "victim-cleavage-crush", "victim-cleavage-absorb", "victim-cleavage-drop", "victim-milk-flood", "victim-breast-vore", "victim-pouch-absorb", "victim-soul-digest", "victim-soul-paw", "victim-paw-stench", "victim-ass-stench", "victim-gas-belch", "victim-gas-fart", "victim-piss", "victim-bladder-vore", "victim-piss-stench", "victim-scat", "victim-scat-stench", "victim-goo", "victim-paw-vore", "victim-breath-fire", "victim-breath-ice", "victim-breath-electric", "victim-breath-smoke", "victim-breath-radiation", "victim-breath-foul", "victim-wings-flap", "victim-wings-vore"]

for (let i=0; i<action_keys.length; i++) {
  rules[action_keys[i]] = [];
}

function isNonFatal(macro) {
  return macro.brutality == 0;
}

function isFatal(macro) {
  return macro.brutality >= 1;
}

function isGory(macro) {
  return macro.brutality >= 2;
}

function isSadistic(macro) {
  return macro.brutality >= 3;
}

function hasNothing(container, thing, amount) {
  for (var key in container.contents) {
    if (container.contents.hasOwnProperty(key))
      return false;
  }

  return true;
}

function hasLessThan(container, thing, amount) {
  if (container.contents.hasOwnProperty(thing))
    if (container.contents[thing].count < amount && container.contents[thing].count > 0)
      return true;
  return false;
}

function hasAtleast(container, thing, amount) { //this function does not trigger in situations where you have a single object(..., 1 [thing], ...) nested inside of a larger group. If you have a case where that can feasibly happen it is reccomended to put a parent ofject of the one you want as an and condition. 
  if (container.contents.hasOwnProperty(thing))
    if (container.contents[thing].count >= amount)
      return true;
  return false;
}

function hasExactly(container, thing, amount) {
  if (!container.contents.hasOwnProperty(thing) && amount == 0)
    return true;
  if (container.contents.hasOwnProperty(thing) && container.contents[thing].count == amount)
    return true;
  return false;
}

function hasOnly(container, things) {
  if (!hasNothingElse(container, things))
    return false;

  for (var i=0; i<things.length; i++) {
    if (!container.contents.hasOwnProperty(things[i]))
      return false;
  }

  return true;
}

function hasNothingElse(container, things) {
  for (var key in container.contents) {
    if (container.contents.hasOwnProperty(key))
      if (!things.includes(key))
        return false;
  }

  return true;
}

function nothingLarger(container, thing) {
  for (var key in container.contents)
    if (container.contents.hasOwnProperty(key))
      if (areas[key] > areas[thing])
        return false;

  return true;
}

function describe(action, container, macro, verbose=true, flat=false, extra1=0) {
  var options = [];

  for (var i = 0; i < rules[action].length; i++) {
    if(rules[action][i].test(container, macro, extra1)) {
      options.push(rules[action][i].desc);
    }
  }

  if (flat) {
    container = flatten(container);
  }

  if (options.length > 0 && Math.random() > (1 / (2 + rules[action].length))) {
    let choice = Math.floor(Math.random() * options.length);
    return options[choice](container, macro, verbose, flat, extra1);
  }
  else {
    return getDefault(action)(container, macro, verbose, flat, extra1);
  }
}

function describeVictim(action, macro) {
  return getDefaultVictim(action)(macro);
}

function pickString(...array){
    var strings = array;
    var pick = strings[~~(Math.random() * strings.length)];
    return pick;
}
// DEFAULTS

function defaultEat(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You reach down for a delicious treat and grab - oh, nothing.";
  else
    return "You scoop up " + container.describe(verbose) + " and swallow " + (container.count > 1 ? "them" : "it") + " whole.";
}

function defaultChew(container, macro, verbose, flat) {
  let pronoun = (container.count > 1 ? "them" : "it");
  if (container.count == 0)
    return "You reach down for a delicious treat and grab - oh, nothing.";
  else if (isSadistic(macro))
    return "Your greedy fingers gather up " + container.describe(verbose) + ", stuffing " + pronoun + " into your " + macro.jawDesc(true) + ". A slow, lazy bite " + macro.biteDesc(true) + " " + pronoun + ", rending flesh, snapping bone, and crushing everything between your savage " + macro.jawDesc(true) + ". You tip back your head and swallow...consigning the gory remains to your roiling gut.";
  else if (isNonFatal(macro))
    return defaultEat(container, macro, verbose, flat);
  else {
    return "You scoop up " + container.describe(verbose) + " and " + macro.biteDesc() + " " + pronoun + " with your " + macro.jawDesc(true) + ", then swallow them down.";
  }
}

function defaultVomit(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You retch, but nothing happens.";
  } else if (isSadistic(macro)) {
    return "You gag and lean over, vomiting up " + container.describeSimple(flat) + ". A thick, hissing slurry of molten meat and acid drenches your still-writhing prey, searing flesh and ensuring their wretched, rancid deaths.";
  } else if (isGory(macro)) {
    return "You retch and vomit up " + container.describeSimple(flat) + ", spewing them out amidst a thick slurry of chyme and leaving them to melt.";
  } else if (isFatal(macro)) {
    return "You vomit up " + container.describeSimple(flat) + ", leaving them to stew in your stomach juices.";
  } else {
    return "You hack up " + container.describeSimple(flat) + ".";
  }
}

function defaultStomp(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.footDesc() + " thumps the ground.";
  else if (isSadistic(macro))
    return "Your " + macro.footDesc(false) + " comes down on " + container.describe(verbose) + ", crushing your prey into gore and rubble with ease as your " + macro.toeDesc(true) + " shear bone and snap metal.";
  else if (isFatal(macro))
    return "You crush " + container.describe(verbose) + " under" + macro.footDesc(false,false,true) + ".";
  else
    return "You step on " + container.describe(verbose) + ".";
}

function defaultStompWedge(container, macro, verbose, flat) {
  if (container.count == 1) {
    let line = container.describe(verbose);
    line = line.charAt(0).toUpperCase() + line.slice(1);
    return line + " is wedged in your " + macro.toeDesc(true);
  } else {
    let line = container.describe(verbose);
    line = line.charAt(0).toUpperCase() + line.slice(1);
    return line + " are wedged in your " + macro.toeDesc(true);
  }
}

function defaultFlexToes(container, macro, verbose, flat) {
  if (container.count == 0) {
    if (macro.footShoeWorn) {
      return "You flex your " + macro.toeNoShoeDesc(true) + " inside your " + macro.footDesc(true) + ".";
    } else {
      return "You flex your " + macro.toeDesc(true) + ".";
    }
  } else {
    if (macro.footShoeWorn || macro.footSockWorn) {
      if (macro.brutality == 0) {
        return "You clench your " + macro.toeNoShoeDesc(true) + ", grinding them against the " + container.describeSimple(flat) + " trapped between your " + macro.footDesc(true) + " and your " + macro.toeOnlyDesc(true) + ".";
      } else {
        return "You clench your " + macro.toeNoShoeDesc(true) + ", crushing " + container.describeSimple(flat) + " between your " + macro.footDesc(true) + " and your " + macro.toeOnlyDesc(true) + ".";
      }
    } else {
      if (macro.brutality == 0) {
        return "You flex your " + macro.toeNoShoeDesc(true) + ", causing " + container.describeSimple(flat) + " to tumble out and fall to the ground.";
      } else {
        return "You flex and squeeze your " + macro.toeNoShoeDesc(true) + ", crushing " + container.describeSimple(flat) + " between them.";
      }
    }
  }
}

function defaultKick(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You swing your mighty " + macro.footDesc() + "..and hit nothing.";
  else
    return "You punt " + container.describe(verbose) + ", destroying " + (container.count > 1 ? "them" : "it") + ".";
}

function defaultAnalVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You're pretty sure you just sat on a rock.";
  else
    return "You sit yourself down on " + container.describe(false) + ". " + (container.count > 1 ? "They slide" : "It slides") + " inside with ease.";
}

function defaultAssCrush(container, macro, verbose, flat) {
  let count = get_living_prey(container.sum());
  if (container.count == 0)
    return "You take a seat. It's good to have a break!";
  else if (isSadistic(macro))
    return "You lower your heavy ass to the ground, biting your lip as you feel " + container.describe(verbose) + " collapse beneath your massive cheeks. " + (count > 1 ? count + " lives are" : "A life is") + " snuffed out as you settle down, grinding your ass into the remains before slowly rising back up.";
  else if (isFatal(macro))
    return "Your heavy ass obliterates " + container.describe(verbose) + ". ";
  else
    return "You sit on " + container.describe(verbose);
}

function defaultAssGrind(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You rub your ass on a wall.";
  } else {
    return "You grind your ass against " + container.describe(verbose) + ", flattening " + (container.count == 1 ? "it" : "them") + " under your weight.";
  }

}

function defaultTailSlap(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + (macro.tailCount > 1 ? "tails swing" : "tail swings") + " to and fro";
  else if (isFatal(macro))
    return "Your " + macro.describeTail + (macro.tailCount > 1 ? " tails swing" : " tail swings") + " into " + container.describe(verbose) + ", smashing everything in " +
    (macro.tailCount > 1 ? "their" : "its") + " path.";
  else
    return "Your " + macro.describeTail + (macro.tailCount > 1 ? " tails slap" : " tail slaps") + " against " + container.describe(verbose) + ", bowling them over.";
}

function defaultTailVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your drooling tail swings to and fro";
  else if (isFatal(macro))
    return "Your tail lunges, maw agape, at " + container.describe(verbose) +
     ". It scarfs down everything in seconds, gulping forcefully to drag your prey into your sloppy confines.";
  else
    return "Your tail lunges, maw agape, at " + container.describe(verbose) +
     ". It scarfs down everything in a second, gulping forcefully and pulling your prey inside.";
}

function defaultTailsVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your drooling tails swing to and fro";
  else if (isFatal(macro))
    return "Your $COUNT tails lunge, maws agape, at " + container.describe(verbose) +
     ". They scarf down everything in seconds, gulping forcefully to drag your prey into your sloppy confines.";
  else
    return "Your $COUNT tails lunge, maws agape, at " + container.describe(verbose) +
     ". They scarf down your prey, gulping forcefully and pulling them deep inside.";
}

function defaultCleavageStuff(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You can't fit anything into your cleavage right now.";
  else
    return "You snatch up " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your cleavage.";
}

function defaultCleavageCrush(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grasp your breasts and forcefully squeeze them together.";
  else if (isSadistic(macro))
    return "You grasp your breasts and slowly bring them together, steadily crushing the life from " + container.describeSimple(flat) + " trapped in between - savoring every last <i>pop</i> and <i>crunch</i> as you exterminate your prey.";
  else if (isGory(macro))
    return "You grasp your breasts and forcefully shove them together, crushing the life from " + container.describeSimple(flat) + ".";
  else if (isFatal(macro))
    return "You grasp your breasts and forcefully shove them together, crushing " + container.describeSimple(flat) + ".";
  else
    return "You grasp your breasts and squish them together, smooshing " + container.describeSimple(flat) + ".";
}

function defaultCleavageDrop(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You pull your breasts apart and give them a shake.";
  if (isFatal(macro))
    return "You pull your breasts apart far enough for the " + container.describeSimple(flat) + " trapped within to fall out, tumbling to the ground and smashing to bits.";
  else
    return "You pull your breasts apart far enough for the " + container.describeSimple(flat) + " trapped within to fall out.";
}

function defaultCleavageAbsorb(container, macro, verbose, flat) {
  if (container.count == 0)
    return defaultCleavageCrush(container, macro, verbose, flat);
  else
    return "Your squeeze your breasts together, swiftly absorbing " + container.describeSimple(flat) + " into your chest.";
}

function defaultBreastCrush(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your thump your breasts against the ground.";
  else if (isFatal(macro))
    return "Your heavy breasts obliterate " + container.describe(verbose) + ". ";
  else
    return "You smoosh " + container.describe(verbose) + " with your breasts.";
}

function defaultBreastVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "It'd be pretty hot to stick someone in your breasts. Shame you can't right now.";
  else
    return "Your nipples envelop " + container.describe(verbose) + ", pulling them into your breasts. ";
}


function defaultBreastMilk(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that splatters on the ground.";
  else if (isFatal(macro))
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that floods " + container.describe(verbose) + " in an unstoppable wave of white.";
  else
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that floods " + container.describe(verbose) + ".";
}

function defaultUnbirth(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your slit...but they won't fit.";
  else
    return "You gasp as you slide " + container.describe(verbose) + " up your slit. ";
}

function defaultSheathStuff(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab a " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your sheath-slit...but they won't fit.";
  else
    return "You pluck " + container.describe(verbose) + " from the ground and slip them into your musky sheath.";
}

function defaultForeskinStuff(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab a " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your foreskin...but they won't fit.";
  else
    return "You pluck " + container.describe(verbose) + " from the ground and slip them into your musky foreskin.";
}


function defaultBreastToy(container, macro, verbose, flat) {
  if (container.count > 0) {
    return "You smush your breasts together, squeezing " + container.describeSimple(flat) + " between the heavy mounds.";
  } else {
    return "You smush your breasts together.";
  }
}

function defaultSlitToy(container, macro, verbose, flat) {
  if (container.count > 0) {
    return "You slip your fingers into your snatch, teasing yourself and pushing the " + container.describeSimple(flat) + " within a little deeper.";
  } else {
    return "Your slp your fingers into your snatch and tease yourself.";
  }
}

function defaultSheathToy(container, macro, verbose, flat) {
  if (container.count > 0) {
    if (macro.orgasm) {
      return "You stroke your spurting cock, then reach down to give your sheath a firm <i>squeeze</i>. Anything within has been ground away to nothingness by the force of your orgasm.";
    } else if (macro.arousal < 25) {
      return "You grip your soft sheath and give it a squeeze, feeling " + container.describeSimple(flat) + " within rub against your " + macro.describeDick + ".";
    } else if (macro.arousal < 75) {
      return "You grip your swelling sheath and squeeze, feeling " + container.describeSimple(flat) + " within grind against your " + macro.describeDick + ".";
    } else if (macro.arousal < 150) {
      return "You run your fingers down your " + macro.describeDick + " and grip your sheath, squeezing it to feel " + container.describeSimple(flat) + " being smothered against the musky walls by your throbbing cock.";
    } else {
      return "Trembling with your impending orgasm, your fingers play over your sheath, feeling " + container.describeSimple(flat) + " within rub against your " + macro.describeDick + ".";
    }
  } else {
    if (macro.orgasm) {
      return "You stroke your spurting cock, then reach down to give your sheath a firm <i>squeeze</i>. Anything within has been ground away to nothingness by the force of your orgasm.";
    } else if (macro.arousal < 25) {
      return "You grip your soft sheath and give it a squeeze.";
    } else if (macro.arousal < 75) {
      return "You grip your swelling sheath and squeeze.";
    } else if (macro.arousal < 150) {
      return "You run your fingers down your " + macro.describeDick + " and grip your sheath, squeezing it gently.";
    } else {
      return "Trembling with your impending orgasm, your fingers play over your sheath.";
    }
  }
}

function defaultSheathClench(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your sheath.";
  else if (isGory(macro))
    return "You squeeze your packed sheath, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your throbbing shaft.";
  else if (isFatal(macro))
    return "Your fingers run over your packed sheath, squeezing on the " + macro.describeDick + " within and smashing " + container.describeSimple(flat);
  else
    return "Your squeeze your sheath, pushing " + container.describeSimple(flat) + " out of your sheath.";
}

function defaultSheathCrush(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your orgasm causes your " + macro.describeDick + " to swell and surge.";
  else if (isGory(macro))
    return "Your powerful orgasm causes your throbbing " + macro.describeDick + " to swell and crush the life from everything in your sheath, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your spurting shaft.";
  else if (isFatal(macro))
    return "Your orgasm causes your " + macro.describeDick + " to throb and swell, smashing " + container.describeSimple(flat) + " trapped in your musky sheath.";
  else
    return "Your orgasm causes your " + macro.describeDick + " to swell, squeezing " + container.describeSimple(flat) + " out from your sheath.";
}

function defaultSheathAbsorb(container, macro, verbose, flat) {
  if (container.count > 0)
    return "You grip your sheath and give it a firm <i>squeeze</i>, abruptly absorbing " + container.describeSimple(flat) + " into your musky body.";
  else
    return defaultSheathToy(container, macro, verbose, flat);
}

function defaultForeskinToy(container, macro, verbose, flat) {
  if (container.count > 0) {
    if (macro.orgasm) {
      return "You stroke your spurting cock. Anything within your foreskin has been ground away to nothingness by the force of your orgasm.";
    } else if (macro.arousal < 25) {
      return "You slip your fingers into your sheath and give your shaft a squeeze, feeling " + container.describeSimple(flat) + " within rub against your " + macro.describeDick + " cock.";
    } else if (macro.arousal < 75) {
      return "You grip your swelling cock and squeeze, feeling " + container.describeSimple(flat) + " between your " + macro.describeDick + " and your foreskin.";
    } else if (macro.arousal < 150) {
      return "You run your fingers down your " + macro.describeDick + ", squeezing it to feel " + container.describeSimple(flat) + " being smothered against your throbbing cock.";
    } else {
      return "Trembling with your impending orgasm, your fingers play over your taut foreskin, feeling " + container.describeSimple(flat) + " within rub against your " + macro.describeDick + " cock.";
    }
  } else {
    if (macro.orgasm) {
      return "You stroke your spurting cock. Anything within your foreskin has been ground away to nothingness by the force of your orgasm.";
    } else if (macro.arousal < 25) {
      return "You grip your soft foreskin and give it a squeeze.";
    } else if (macro.arousal < 75) {
      return "You grip your swelling cock and squeeze.";
    } else if (macro.arousal < 150) {
      return "You run your fingers over your " + macro.describeDick + " and grip your taut foreskin, squeezing it gently.";
    } else {
      return "Trembling with your impending orgasm, your fingers play over your shaft.";
    }
  }
}

function defaultForeskinClench(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your foreskin.";
  else if (isGory(macro))
    return "You squeeze your foreskin, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your throbbing shaft.";
  else if (isFatal(macro))
    return "Your fingers run over your packed foreskin, squeezing on the " + macro.describeDick + " within and smashing " + container.describeSimple(flat);
  else
    return "Your squeeze your foreskin, pushing " + container.describeSimple(flat) + " out of your foreskin.";
}

function defaultForeskinCrush(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your orgasm causes your " + macro.describeDick + " to swell and surge.";
  else if (isGory(macro))
    return "Your powerful orgasm causes your throbbing " + macro.describeDick + " to swell and crush the life from everything in your foreskin, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your spurting shaft.";
  else if (isFatal(macro))
    return "Your orgasm causes your " + macro.describeDick + " to throb and swell, smashing " + container.describeSimple(flat) + " trapped in your musky foreskin.";
  else
    return "Your orgasm causes your " + macro.describeDick + " to swell, squeezing " + container.describeSimple(flat) + " out from your foreskin.";
}

function defaultForeskinAbsorb(container, macro, verbose, flat) {
  if (container.count > 0)
    return "You grip your cock and give it a firm <i>squeeze</i>, abruptly absorbing " + container.describeSimple(flat) + " into your musky foreskin.";
  else
    return defaultForeskinToy(container, macro, verbose, flat);
}

function defaultCockVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your cock...but they won't fit.";
  else
    return "You stuff " + container.describe(verbose) + " into your throbbing shaft, forcing them down to your heavy balls.";
}

function defaultCockslap(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " swings through the air. Lewd!";
  else if (isFatal(macro))
    return "Your swaying " + macro.describeDick + " crushes " + container.describe(verbose) + ". ";
  else
    return "You smack " + container.describe(verbose) + " with your " + macro.describeDick + ".";
}

function defaultBallSmother(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You rest your heavy balls on the ground.";
  else if (isFatal(macro))
    return "Your weighty balls spread over " + container.describe(verbose) + ", drowning them in musk.";
  else
    return "Your weighty balls spread over " + container.describe(verbose) + ".";
}

function defaultMaleSpurt(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " spews $VOLUME of bitter precum.";
  else if (isFatal(macro))
    return "Your " + macro.describeDick + " spurts out bitter precum, drowning " + container.describe(verbose) + " in $VOLUME of slick musky fluid.";
  else
    return "Your " + macro.describeDick + " spurts precum, splooging " + container.describe(verbose) + " in $VOLUME of slick musky fluid.";
}

function defaultMaleOrgasm(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " spurts, gushing out a $VOLUME glob of cum.";
  else if (isFatal(macro))
    return "You're cumming! Your " + macro.describeDick + " erupts, obliterating " + container.describe(verbose) + " in a $VOLUME-torrent of cum.";
  else
    return "You're cumming! Your " + macro.describeDick + " spews a thick rope of seed, splooging " + container.describe(verbose) + " in a $VOLUME-torrent of cum.";
}

function defaultFemaleSpurt(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your moist slit splatters $VOLUME of slick juices.";
  else if (isSadistic(macro))
    return "Your dripping slit splatters $VOLUME of your intoxicating juices, dissolving " + container.describe(verbose) + ".";
  else if (isFatal(macro))
    return "Your moist slit splatters $VOLUME of slick juices, drowning " + container.describe(verbose) + " in your building lust.";
  else
    return "Your moist slit splatters $VOLUME of slick juices, splooging " + container.describe(verbose) + ".";
}

function defaultFemaleOrgasm(container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your moist slit gushes $VOLUME of slick femcum.";
  else if (isSadistic(macro))
    return "Your quivering slit sprays $VOLUME of your intoxicating femcum, dissolving " + container.describe(verbose) + " in an unstoppable torrent of deadly lust.";
  else if (isFatal(macro))
    return "Your moist slit sprays $VOLUME of slick femcum, obliterating " + container.describe(verbose) + " in a torrent of nectar.";
  else
    return "Your moist slit sprays $VOLUME of slick femcum, splooging " + container.describe(verbose) + " as you swoon with orgasmic lust.";
}

function defaultGrind(container, macro, verbose, flat) {
  var mid = isFatal(macro) ? ", smashing them apart" : ", using them as a toy";
  var end = macro.arousalEnabled ? " to fuel your lust." : ".";
  var desc = container.count > 0 ? container.describe(verbose) + mid + end : "the ground.";
  if (macro.maleParts && macro.femaleParts) {
    return "You grind your " + macro.describeDick + " cock and " + macro.describeVagina + " slit against " + desc;
  } else if (macro.maleParts && !macro.femaleParts) {
    return "You grind your " + macro.describeDick + " shaft against " + desc;
  } else if (!macro.maleParts && macro.femaleParts) {
    return "You grind your " + macro.describeVagina + " slit against " + desc;
  } else {
    return "You grind your hips against " + desc;
  }
}

function defaultPouchStuff(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and stuff them against your pouch...but they won't fit!";
  else
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your pouch.";
}

function defaultPouchRub(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You rub your empty pouch.";
  else
    return "You rub your bulging pouch, feeling at " + container.describeSimple(flat) + " trapped within.";
}

function defaultPouchEat(container, macro, verbose, flat) {
  if (container.count == 0)
    return "There's nothing in your pouch!";
  else
    return "You snatch " + container.describe(verbose) + " from your pouch and shove " + (container.count > 1 ? "them" : "it") + " down your gullet!";
}

function defaultPouchAbsorb(container, macro, verbose, flat) {
  if (container.count == 0)
    return "There's nothing in your pouch!";
  else
    return "Your pouch flattens as it absorbs " + container.describeSimple(flat);
}

function defaultSoulVore(container, macro, verbose, flat) {
  if (container.count == 0)
    return "No souls here.";
  else
    return "You open your " + macro.jawDesc(true) + " and inhale, ripping the souls from " + container.describe(verbose) + " and dragging them down deep inside.";
}

function defaultSoulAbsorbPaw(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (container.count == 0)
    return "Your " + macro.footDesc() + " thumps against the ground";
  else if (sum == 0)
    return "Your " + macro.footDesc() + " slams down on " + container.describe(verbose) + "...but there aren't any souls within!";
  else
    return "Your " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing them to pieces and absorbing " + sum + (sum == 1 ? " soul" : " souls") + " into your pads.";
}

function defaultPawStench(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Horrific miasma flows from your " + macro.footDesc(true)+ ", the corrsoive fumes reducing " + (sum > 1 ? sum + " people" : "a person") + " to charred flesh as they wash over " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your " + macro.footDesc(true) + " , choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky " + macro.footDesc(true) + " overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultAssStench(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Rancid fumes from your ass sear the flesh of " + (sum > 1 ? sum + " people" : "a person") + " as they wash over " + container.describeSimple(flat) + ", corroding everything in their path.";
  if (isFatal(macro))
    return "Vile miasma from your bitter ass snuffs out " + (sum > 1 ? sum + " people" : "a person") + ", suffocating them in your stench.";
  else
    return "Your stinky butt sickens " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultPissStench(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive fumes waft from your piss, the toxic cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your piss, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky piss overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultScatStench(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "A rancid miasma spews from your shit - a thick, choking avalanche of toxic vapors that reduce " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " to nothing but bones as it melts " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your scat, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky scat overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultMaleSpurtMusk(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your precum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your precum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky precum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultFemaleSpurtMusk(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your precum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your precum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky precum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultMaleOrgasmMusk(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your cum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your cum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky cum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultFemaleOrgasmMusk(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your cum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum,"of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your cum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky cum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

function defaultBelch(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (container.count == 0)
    return "An ominous groan precedes a crass belch.";
  if (isSadistic(macro))
    return "A disgusting torrent of gas erupts from your rancid stomach, the vile green gale stopping hearts and burning flesh as it annihilates " + container.describe(verbose) + ".";
  if (isFatal(macro))
    return "A rancid belch flows from your " + macro.jawDesc(verbose) + ", corroding " + container.describe(verbose) + " with your vile fumes.";
  else
    return "You let out a loud burp, blowing over " + container.describe(verbose) + "!";
}

function defaultFart(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (container.count == 0)
    return "An ominous groan precedes a loud, pungent fart.";
  if (isSadistic(macro))
    return "Your intestines snarl and lurch, expelling a powerful jet of utterly rancid stench from your bitter ass. The plume gushes over " + container.describe(verbose) + ", ending " + (sum > 1 ? sum + " lives" : "a life") + " and annihilating everything in its path.";
  if (isFatal(macro))
    return "An ominous groan precedes a loud, pungent fart, corroding " + container.describe(verbose) + " with truly vile vapors.";
  else
    return "You let out a crass fart, blowing over " + container.describe(verbose) + "!";
}

function defaultStomach(container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your churning guts crushes your prey into a gory paste, annihilating " + container.describeSimple(flat) + " and reducing everything to rancid chyme.";
  else if (isGory(macro))
    return "Your caustic stomach grinds " + container.describeSimple(flat) + " to a gory pulp.";
  else if (isFatal(macro))
    return "Your stomach gurgles as it digests " + container.describeSimple(flat) + ".";
  else
    return "Your stomach groans and abosrbs " + container.describeSimple(flat) + ".";
}

function defaultTail(container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your " + macro.tailDesc + " " + (macro.tailCount > 1 ? "clench" : "clenches") + ", crushing " + container.describeSimple(flat) + " into unrecognizable paste.";
  else if (isGory(macro))
    return "Your fatal " + (macro.tailCount > 1 ? "tails crush " : "tail crushes ") + container.describeSimple(flat) + " to a gory pulp.";
  else if (isFatal(macro))
    return "Your " + (macro.tailCount > 1 ? "tails gurgles as they digest " : "tail gurgles as it digests ") + container.describeSimple(flat) + ".";
  else
    return "Your " + (macro.tailCount > 1 ? "tails groan and absorb " : "tail groans and absorbs ") + container.describeSimple(flat) + ".";
}

function defaultTailToStomach(container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your " + (macro.tailCount > 1 ? "tails clench" : "tail clenches") + ", squeezing " + container.describeSimple(flat) + " into your gurgling stomach.";
  else
    return "Your " + (macro.tailCount > 1 ? "tails squeeze" : "tail squeezes") + " " + container.describeSimple(flat) + " into your belly.";
}

function defaultBowels(container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your rancid bowels clench and churn, crushing " + container.describeSimple(flat) + " into a paste of gore and rubble - and then swiftly absorbing everything.";
  if (isFatal(macro))
    return "Your bowels churn as they melt down " + container.describeSimple(flat) + " and absorb them into your body";
  else
    return "Your bowels churn as they absorb " + container.describeSimple(flat);
}

function defaultBowelsToStomach(container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your bowels clench, forcing " + container.describeSimple(flat) + " into your roiling, caustic stomach.";
  else
    return "Your bowels clench, squeezing " + container.describeSimple(flat) + " into your belly.";
}

function defaultWomb(container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your womb squeezes and dissolves " + container.describeSimple(flat) + ", turning them into $VOLUME of slick femcum.";
  else
    return "Your womb squeezes as it absorbs " + container.describeSimple(flat);
}

function defaultBalls(container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your balls slosh as they digest " + container.describeSimple(flat) + " into $VOLUME of cum";
  else
    return "Your balls slosh as they absorb " + container.describeSimple(flat);
}

function defaultBreasts(container, macro, verbose, flat) {
  if (isFatal(macro) && macro.lactationEnabled)
    return "Your breasts grrgle as they digest " + container.describeSimple(flat) + " into $VOLUME of milk";
  else
    return "Your breasts slosh as they absorb " + container.describeSimple(flat);
}

function defaultBladder(container, macro, verbose, flat) {
  if (isSadistic(macro)) {
    let fatalities = get_living_prey(container.sum());
    let line = "Your bladder swells as " + container.describeSimple(flat) + " are dissolved in your acrid piss, digesting them down to $VOLUME of fresh urine";
    if (fatalities > 0) {
      line += " " + (fatalities > 1 ? fatalities + " lives are" : "a life is") + " snuffed out by the horrific yellow tide, corroded and annihilated amongst the unbearable stench of urine.";
    }
    return line;
  } else if (isFatal(macro))
    return "Your bladder swells as it dissolves " + container.describeSimple(flat) + " into $VOLUME of acrid piss";
  else
    return "Your bladder squeezes as it absorbs " + container.describeSimple(flat);
}

function defaultSoulDigest(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  switch(macro.soulVoreType) {
    case "release":
      return (sum > 1 ? sum + " souls escape" : "A soul escapes") + " your depths.";
    case "body":
      return "Your body claims " + (sum > 1 ? sum + " souls" : "a soul") + ", imprisoning " + (sum > 1 ? "them" : "it") + " in your body for good.";
    case "oblivion":
      return "Energy washes through your depths as you annihilate " + (sum > 1 ? sum + " souls" : "a soul") + ", crushing " + (sum > 1 ? "them" : "it") + " into nothingness.";
  }
}

function defaultWings(container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your " + macro.wingDesc + " wings slacken as the " + container.describeSimple(flat) + " within melts into a slurry of meat and wreckage.";
  if (isFatal(macro))
    return "Your " + macro.wingDesc + " wings squeeze tightly as they absorb " + container.describeSimple(flat) + " into your body";
  else
    return "Your " + macro.wingDesc + " wings squeeze as they absorb " + container.describeSimple(flat);
}

function defaultWingsToStomach(container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your " + macro.wingDesc + " wings clench, forcing " + container.describeSimple(flat) + " deeper and into your stomach.";
  else
    return "Your " + macro.wingDesc + " wings squeeze " + container.describeSimple(flat) + " into your belly.";
}

function defaultWearShoe(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You slip on your " + macro.shoeDesc(true,false) + ".";
  } else {
    return "You slip on your " + macro.shoeDesc(true,false) + ", " + macro.toeDesc(true) + " wriggling against " + container.describeSimple(flat) + " trapped within!";
  }
}

function defaultRemoveShoe(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You pull off your " + macro.shoeDesc(true,false) + ".";
  } else {
    return "You pull off your " + macro.shoeDesc(true,false) + ", " + macro.toeDesc(true) + " rubbing against " + container.describeSimple(flat) + " on the way out.";
  }
}

function defaultWearSock(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You slip on your " + macro.sockDesc(true,false) + ".";
  } else {
    return "You slip on your " + macro.sockDesc(true,false) + ", " + macro.toeDesc(true) + " grinding against " + container.describeSimple(flat) + " trapped in the cotton tube!";
  }
}

function defaultRemoveSock(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You pull off your " + macro.sockDesc(true,false) + ". Cool air washes over your " + macro.toeOnlyDesc(true);
  } else {
    return "You pull off your " + macro.sockDesc(true,false) + ", leaving " + container.describeSimple(flat) + " trapped at the bottom.";
  }
}

function defaultStuffShoe(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.shoeDesc(true) + ".";
  } else {
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your " + macro.shoeDesc(true) + "!";
  }
}

function defaultStuffSock(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.sockDesc(true) + ".";
  } else {
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your " + macro.sockDesc(true) + "!";
  }
}

function defaultDumpShoe(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your " + macro.shoeDesc(true) + " are empty, silly.";
  } else {
    return "You shake out your " + macro.shoeDesc(true) + ", dumping " + container.describeSimple(flat) + " onto the ground.";
  }
}

function defaultDumpSock(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.sockDesc(true) + ".";
  } else {
    return "You turn your " + macro.shoeDesc(true) + " inside-out, dumping " + container.describeSimple(flat) + " onto the ground.";
  }
}

function defaultPiss(container, macro, verbose, flat) {
  if (macro.maleParts) {
    if (container.count == 0) {
      return "You sigh with relief as $VOLUME of piss erupts from your " + macro.describeDick + ".";
    } else if (isSadistic(macro)) {
      return "You sigh with relief as $VOLUME of hot, rancid piss erupts from your " + macro.describeDick + ", inundating " + container.describe(verbose) + " in a disgusting tide of yellow death."
    } else {
      return "You sigh with relief as $VOLUME of piss erupts from your " + macro.describeDick + ", spraying down " + container.describe(verbose) + " in a shower of golden, musky fluid.";
    }
  } else if (macro.femaleParts) {
    if (container.count == 0) {
      return "You sigh with relief as $VOLUME of piss erupts from your " + macro.describeVagina + " slit.";
    } else if (isSadistic(macro)) {
      return "You sigh with relief as $VOLUME of hot, rancid piss erupts from your " + macro.describeVagina + " slit, inundating " + container.describe(verbose) + " in a disgusting tide of yellow death."
    } else {
      return "You sigh with relief as $VOLUME of piss erupts from your " + macro.describeVagina + " slit, spraying down " + container.describe(verbose) + " in a shower of golden, musky fluid.";
    }
  } else {
    if (container.count == 0) {
      return "You sigh with relief as $VOLUME of piss erupts from between your legs.";
    } else if (isSadistic(macro)) {
      return "You sigh with relief as $VOLUME of hot, rancid piss erupts from between your legs, inundating " + container.describe(verbose) + " in a disgusting tide of yellow death."
    } else {
      return "You sigh with relief as $VOLUME of piss erupts from between your legs, spraying down " + container.describe(verbose) + " in a shower of golden, musky fluid.";
    }
  }
}

function defaultBladderVore(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to shove into your bladder!";
  }
  else {
    if (macro.maleParts) {
      return "You snatch up " + container.describe(verbose) + " and stuff them into your " + macro.describeDick + ", grinding them to its base and forcing them into your musky bladder.";
    } else if (macro.femaleParts) {
      return "You snatch " + container.describe(verbose) + " in your iron grip, grinding them against your " + macro.describeVagina + " slit before stuffing them into your urethra, sealing them away in your musky bladder.";
    } else {
      return "You grab " + container.describe(verbose) + " and grind them between your legs, slipping them into your urethra and imprisoning them in your bladder.";
    }
  }
}

function defaultScat(container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (macro.scatStorage.amount == 0) {
    return "Your bowels are empty.";
  } else if (container.count == 0) {
    return "You squat down and let out a $MASS log of shit.";
  } else if (isSadistic(macro)) {
    let line = "You squat down, letting out a grunt as your rancid bowels force out a $MASS, $LENGTH-long heap of shit. The fatally-pungent scat buries " + container.describe(verbose) + ", ending " + numberRough(sum,"of") + (sum > 1 ? " lives" : " life") + " and entombing them in your shit.";
    if (macro.scatStorage.victims.count > 0) {
      line += " Embedded in the vomit-inducing heap are the mangled, crushed remains of " + listSum(macro.scatStorage.victims.sum()) + ", " + numberRough(get_living_prey(macro.scatStorage.victims.sum()), "of") + " living creatures converted to noxious scat by your disgusting depths.";
    }
    return line;
  } else if (macro.brutality > 0 && macro.scatStorage.victims.count > 0) {
    return "You squat down, grunting as your lower guts squeeze out a $MASS, $LENGTH-long log of scat that smothers " + container.describe(verbose) + ". Embedded in the thick, chunky waste are the remains of " + listSum(macro.scatStorage.victims.sum()) + ", now little more than bones and wreckage in your shit.";
  } else {
    return "You squat down, grunting as your lower guts squeeze out a $MASS, $LENGTH-long log of scat that smothers " + container.describe(verbose);
  }
}

function defaultMelt(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your body turns gooey.";
  } else {
    return "Your body turns gooey, sucking " + container.describeSimple(flat) + " into your molten self.";
  }

}

function defaultSolidify(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your body turns solid.";
  } else if (macro.gooDigest > 0) {
    return "Your body turns solid, pushing out " + container.describeSimple(flat) + ".";
  } else {
    return "Your body turns solid, swiftly absorbing " + container.describeSimple(flat) + ".";
  }
}

function defaultFlood(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey body melts and floods outward..but doesn't catch anything.";
  } else {
    return "Your gooey body melts and floods outward, burying " + container.describe(verbose) + " in your thick, slimy self. You slowly reform, grinning as you feel " + numberRough(get_living_prey(container.sum()), "of") + " prey sloshing about within.";
  }
}

function defaultStompGoo(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey paw hits the ground.";
  } else {
    return "Your gooey paws falls over " + container.describe(verbose) + ", smothering them in goo and pulling them into your body.";
  }
}

function defaultAssGoo(container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey ass sits down on the ground.";
  } else {
    return "You sit your gooey ass down on " + container.describe(verbose) + ", pulling them right into your body.";
  }
}

function defaultGooDigest(container, macro, verbose, flat) {
  return "Your goopy depths dissolve " + container.describeSimple(flat) + ".";
}

function defaultGooStomachPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your stomach, drawing them into the viscous goo.";
}

function defaultGooStomachPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your gurgling stomach.";
}

function defaultGooBowelsPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your bowels, drawing them into the viscous goo.";
}

function defaultGooBowelsPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your clenching bowels.";
}

function defaultGooWombPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your womb, drawing them into the viscous goo.";
}

function defaultGooWombPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your slick womb.";
}

function defaultGooBallsPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your balls, drawing them into the viscous goo.";
}

function defaultGooBallsPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your musky balls.";
}

function defaultGooBreastsPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your breasts, drawing them into the viscous goo.";
}

function defaultGooBreastsPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your breasts.";
}

function defaultGooTailPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your " + macro.tailDesc + ", drawing them into the viscous goo.";
}

function defaultGooTailPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your " + macro.tailDesc;
}

function defaultGooPawsPull(container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your " + macro.footOnlyDesc(true) + ", drawing them into the viscous goo.";
}

function defaultGooPawsPush(container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your " + macro.footOnlyDesc(true) + ".";
}

function defaultPawVore(container, macro, verbose, flat) {
  return "Your " + macro.footOnlyDesc(true) + " smother over " + container.describeSimple(flat) + ", absorbing them into your soles!";
}

function defaultPawVoreToes(container, macro, verbose, flat) {
  return "The " + container.describeSimple(flat) + " trapped between your toes " + (container.count > 1 ? "are" : "is") + " sucked inside.";
}

function defaultPaws(container, macro, verbose, flat) {
  return "Your " + macro.footOnlyDesc(true) + " fully absorb " + container.describeSimple(flat) + ".";
}

function defaultCropSwallow(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You reach down for a delicious treat and grab - oh, nothing.";
  else
    return "You scoop up " + container.describe(verbose) + " and swallow " + (container.count > 1 ? "them" : "it") + " whole, pulling your prey into your crop.";
}

function defaultCropTransfer(container, macro, verbose, flat) {
  if (container.count == 0)
    return "You have nothing in your crop";
  else
    return "Your throat squeezes, forcing " + container.describe(verbose) + " out of your crop and in to your stomach.";
}

function nonFatalBreath(container, macro, verbose, flat, type, verb) {
  if (macro.breathStyle == "line") {
    return "You exhale a narrow gout of " + type + ", " + verb + " " + container.describe(verbose) + ".";
  } else if (macro.breathStyle == "cone") {
    return "You exhale a broad cone of " + type + ", " + verb + " " + container.describe(verbose) + ".";
  }
}

function defaultBreathFire(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "fire", "blasting");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "A withering spear of fire gouts from your maw, spearing through " + container.describe(verbose) + " and incinerating it in a torrid display of power.";
      } else if (macro.breathStyle == "cone") {
        return "You exhale a broad cone of powerful fire, burning " + container.describe(verbose) + " to a crisp in an inescapable tide of flames.";
    }
  }

  return "FIRE" + container.describe(verbose);
}
function defaultBreathIce(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "cold", "freezing");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "You heave a lance of frigid cold from your gullet, freezing " + container.describe(verbose) + " to the core.";
      } else if (macro.breathStyle == "cone") {
        return "A blizzard erupts from your maw, flash-freezing " + container.describe(verbose) + ". " + (container.count > 1 ? "They" : "It") + " shatters a heartbeat later, reduced to dust by your power.";
    }
  }

  return "ICE" + container.describe(verbose);
}

function defaultBreathElectric(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "electricity", "shocking");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "A blinding lance of lightning blasts from your spread " + macro.jawDesc(true) + ", cooking " + container.describe(verbose) + " from the inside out.";
      } else if (macro.breathStyle == "cone") {
        return "You exhale a brilliant, forking spray of lightning. The flickering bolts arc through " + container.describe(verbose) + ", cooking everything to a crisp.";
    }
  }

  return "ELECTRIC" + container.describe(verbose);
}

function defaultBreathSmoke(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "smoke", "smothering");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "You part your " + macro.jawDesc(true) + " a touch and blow, casting a thin gout of smoke that envelops " + container.describe(verbose) + ". Your prey is snuffed out like a candle.";
      } else if (macro.breathStyle == "cone") {
        return "You open wide and exhale. A rolling storm of smoke pours forth, smothering " + container.describe(verbose) + " in a pyroclastic flow.";
    }
  }

  return "SMOKE" + container.describe(verbose);
}

function defaultBreathRadiation(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "radiation", "frying");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "Your depths pour out a narrow beam of crackling green energy, striking " + container.describe(verbose) + " and frying it to a crisp, turning your prey to dust in the wind.";
      } else if (macro.breathStyle == "cone") {
        return "You part your " +  macro.jawDesc(true) + ", roaring as a massive tide of radiation spews forth. It rolls over " + container.describe(verbose) + ", evaporating " + (container.count > 1 ? "them" : "it") + " in seconds.";
    }
  }

  return "RADIATION" + container.describe(verbose);
}

function defaultBreathFoul(container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "foul air", "withering");
  }

  if (isFatal(macro)) {
      if (macro.breathStyle == "line") {
        return "You blow a narrow stream of breath, withering " + container.describe(verbose) + " in a focused torrent of foul, humid fumes.";
      } else if (macro.breathStyle == "cone") {
        return "You yawn wide and sigh, snuffing out " + container.describe(verbose) + " under a tide of hot, humid breath.";
    }
  }

  return "FOUL" + container.describe(verbose);
}

function defaultDrool(container, macro, verbose, flat) {
  if (container.count == 0)
    return "$VOLUME of hot drool oozes from your " + macro.jawDesc(true) + ".";
  else if (isFatal(macro))
    return "A rain of slobber falls from your maw, inundating " + container.describe(verbose) + " in $VOLUME of slimy drool.";
  else
    return "$VOLUME of your drool rains down from your " + macro.jawDesc(true) + ", washing over " + container.describe(verbose) + ".";
}

function defaultMagicShrink(container, macro, verbose, flat) {
  return "You envelop " + container.describeSimple(flat) + " in swirling tendrils of magic, shrinking " + (container.count == 1 ? "it" : "them") + " down!";
}

function defaultWingsFlap(container, macro, verbose, flat) {
  if (container.counter == 0) {
    return "You flap your " + macro.wingDesc + " wings.";
  } else {
    return "You flap your " + macro.wingDesc + " wings, blowing away " + container.describe(verbose) + ".";
  }
}

function defaultWingsVore(container, macro, verbose, flat) {
  if (container.counter == 0) {
    return "You flap your " + macro.wingDesc + " wings aggressively.";
  } else {
    return "You spread your " + macro.wingDesc + " wings wide, wrapping them around " + container.describe(verbose) + " and ensnaring them";
  }

}

function defaultVictimCumFlood(macro) {
  if (isSadistic(macro)) {
    return "drowned in viscous cum";
  } else if (isGory(macro)) {
    return "drowned in cum";
  } else if (isFatal(macro)) {
    return "smothered in cum";
  } else if (isNonFatal(macro)) {
    return "washed away by cum";
  }
}

function defaultVictimFemcumFlood(macro) {
  if (isSadistic(macro)) {
    return "drowned in slick femcum";
  } else if (isGory(macro)) {
    return "drowned in femcum";
  } else if (isFatal(macro)) {
    return "smothered in femcum";
  } else if (isNonFatal(macro)) {
    return "washed away by femcum";
  }
}

function defaultVictimStomped(macro) {
  if (isSadistic(macro)) {
    return "crushed into pulp beneath your " + macro.footDesc(true);
  } else if (isGory(macro)) {
    return "crushed beneath your " + macro.footDesc(true);
  } else if (isFatal(macro)) {
    return "stomped on";
  } else if (isNonFatal(macro)) {
    return "stepped on";
  }
}

function defaultVictimFlexToes(macro) {
  if (isSadistic(macro)) {
    return "ground to a thick paste between your " + macro.toeDesc(true);
  } else if (isGory(macro)) {
    return "crushed to death between your " + macro.toeDesc(true);
  } else if (isFatal(macro)) {
    return "crushed between your " + macro.toeDesc(true);
  } else if (isNonFatal(macro)) {
    return "squeezed in your " + macro.toeDesc(true);
  }
}

function defaultVictimEaten(macro) {
  if (isSadistic(macro)) {
    return "devoured and digested down to molten chyme";
  } else if (isGory(macro)) {
    return "consumed and digested alive";
  } else if (isFatal(macro)) {
    return "devoured alive";
  } else if (isNonFatal(macro)) {
    return "swallowed";
  }
}

function defaultVictimAssCrush(macro) {
  if (isSadistic(macro)) {
    return "snuffed out under your ass";
  } else if (isGory(macro)) {
    return "crushed by your ass";
  } else if (isFatal(macro)) {
    return "flattened under your ass";
  } else if (isNonFatal(macro)) {
    return "sat on";
  }
}

function defaultVictimAssGround(macro) {
  if (isSadistic(macro)) {
    return "ground out of existence beneath your heavy ass";
  } else if (isGory(macro)) {
    return "crushed by your grinding ass";
  } else if (isFatal(macro)) {
    return "flattened by your grinding ass";
  } else if (isNonFatal(macro)) {
    return "ground under your ass";
  }
}

function defaultVictimHumped(macro) {
  if (isSadistic(macro)) {
    return "smashed to gory paste by your thrusting hips";
  } else if (isGory(macro)) {
    return "crushed to death by your hips";
  } else if (isFatal(macro)) {
    return "ground on by your sultry hips";
  } else if (isNonFatal(macro)) {
    return "humped";
  }
}

function defaultVictimVomit(macro) {
  if (isSadistic(macro)) {
    return "spewed from your caustic depths and left to die";
  } else if (isGory(macro)) {
    return "vomited out in a puddle of acid and chyme";
  } else if (isFatal(macro)) {
    return "puked up from your churning guts";
  } else if (isNonFatal(macro)) {
    return "horked out";
  }
}

function defaultVictimChew(macro) {
  if (isSadistic(macro)) {
    return "chewed to a bloody pulp by your scything " + macro.jawDesc(true);
  } else if (isGory(macro)) {
    return "crushed to pulp by your " + macro.jawDesc(true);
  } else if (isFatal(macro)) {
    return "chewed up in your " + macro.jawDesc(true);
  } else if (isNonFatal(macro)) {
    return "gnawed on by your " + macro.jawDesc(true);
  }
}

function defaultVictimDrool(macro) {
  if (isSadistic(macro)) {
    return "inundated in your drool and drowned";
  } else if (isGory(macro)) {
    return "swept away by a tide of drool";
  } else if (isFatal(macro)) {
    return "flooded in your drool";
  } else if (isNonFatal(macro)) {
    return "soaked by your drool";
  }
}

function defaultVictimAnalVore(macro) {
  if (isSadistic(macro)) {
    return "crammed into your bowels and obliterated";
  } else if (isGory(macro)) {
    return "shoved into your greedy ass";
  } else if (isFatal(macro)) {
    return "slipped into your bowels";
  } else if (isNonFatal(macro)) {
    return "used as toys in your ass";
  }
}

function defaultVictimTailSlap(macro) {
  if (isSadistic(macro)) {
    return "cut down like wheat by your swooping, scything " + macro.tailDesc;
  } else if (isGory(macro)) {
    return "smashed to bloody pieces by your " + macro.tailDesc;
  } else if (isFatal(macro)) {
    return "leveled by your " + macro.tailDesc;
  } else if (isNonFatal(macro)) {
    return "thwapped with your " + macro.tailDesc;
  }
}

function defaultVictimTailVore(macro) {
  if (isSadistic(macro)) {
    return "snapped up and devoured by your ravenous " + macro.tailNoDesc;
  } else if (isGory(macro)) {
    return "swallowed down by your powerful" + macro.tailNoDesc;
  } else if (isFatal(macro)) {
    return "devoured by your " + macro.tailNoDesc;
  } else if (isNonFatal(macro)) {
    return "gulped down by your " + macro.tailNoDesc;
  }
}

function defaultVictimCockSlap(macro) {
  if (isSadistic(macro)) {
    return "obliterated beneath your massive, swinging shaft.";
  } else if (isGory(macro)) {
    return "crushed by your cock";
  } else if (isFatal(macro)) {
    return "flattened under your dick";
  } else if (isNonFatal(macro)) {
    return "smacked with your dick";
  }
}

function defaultVictimCockVore(macro) {
  if (isSadistic(macro)) {
    return "plunged into the depths of your shaft";
  } else if (isGory(macro)) {
    return "devoured by your ravenous cock";
  } else if (isFatal(macro)) {
    return "sucked down your shaft";
  } else if (isNonFatal(macro)) {
    return "slipped into your cock";
  }
}

function defaultVictimBallSmother(macro) {
  if (isSadistic(macro)) {
    return "reduced to broken gore under your massive balls";
  } else if (isGory(macro)) {
    return "snuffed out by your crushing balls";
  } else if (isFatal(macro)) {
    return "crushed under your balls";
  } else if (isNonFatal(macro)) {
    return "trapped under your balls";
  }
}

function defaultVictimSheathCrush(macro) {
  if (isSadistic(macro)) {
    return "crushed and smeared between your shaft and sheath";
  } else if (isGory(macro)) {
    return "ground into paste within your sheath";
  } else if (isFatal(macro)) {
    return "crushed between your sheath and shaft";
  } else if (isNonFatal(macro)) {
    return "squeezed out from your sheath";
  }
}

function defaultVictimSheathAbsorb(macro) {
  if (isSadistic(macro)) {
    return "dissolved and absorbed into your tight sheath";
  } else if (isGory(macro)) {
    return "absorbed by the flesh of your sheath";
  } else if (isFatal(macro)) {
    return "absorbed into your sheath";
  } else if (isNonFatal(macro)) {
    return "taken into your sheath";
  }
}

function defaultVictimForeskinCrush(macro) {
  if (isSadistic(macro)) {
    return "crushed and smeared between your shaft and foreskin";
  } else if (isGory(macro)) {
    return "ground into paste within your foreskin";
  } else if (isFatal(macro)) {
    return "crushed between your foreskin and shaft";
  } else if (isNonFatal(macro)) {
    return "squeezed out from your foreskin";
  }
}

function defaultVictimForeskinAbsorb(macro) {
  if (isSadistic(macro)) {
    return "dissolved and absorbed into your tight foreskin";
  } else if (isGory(macro)) {
    return "absorbed by the flesh of your foreskin";
  } else if (isFatal(macro)) {
    return "absorbed into your foreskin";
  } else if (isNonFatal(macro)) {
    return "taken into your foreskin";
  }
}

function defaultVictimCumFlood(macro) {
  if (isSadistic(macro)) {
    return "drowned in a caustic flood of cum";
  } else if (isGory(macro)) {
    return "drowned in your cum";
  } else if (isFatal(macro)) {
    return "washed away by your cum";
  } else if (isNonFatal(macro)) {
    return "flooded with your cum";
  }
}

function defaultVictimMaleSpurtMusk(macro) {
  if (isSadistic(macro)) {
    return "dissolved in a tide of slick, musky precum";
  } else if (isGory(macro)) {
    return "drowned in your slick precum";
  } else if (isFatal(macro)) {
    return "washed away by precum";
  } else if (isNonFatal(macro)) {
    return "flooded with your precum";
  }
}

function defaultVictimMaleOrgasmMusk(macro) {
  if (isSadistic(macro)) {
    return "corroded by your caustic, overwhelming masculine musk";
  } else if (isGory(macro)) {
    return "snuffed out by your masculine musk";
  } else if (isFatal(macro)) {
    return "overwhelmed by masculine musk";
  } else if (isNonFatal(macro)) {
    return "dazed by masculine musk";
  }
}

function defaultVictimUnbirth(macro) {
  if (isSadistic(macro)) {
    return "crushed by your overwhelming womb";
  } else if (isGory(macro)) {
    return "crammed into your womb";
  } else if (isFatal(macro)) {
    return "stuffed into your nethers";
  } else if (isNonFatal(macro)) {
    return "slipped into your slit";
  }
}

function defaultVictimFemcumFlood(macro) {
  if (isSadistic(macro)) {
    return "drowned and dissolved in slippery femcum";
  } else if (isGory(macro)) {
    return "drowned in your femcum";
  } else if (isFatal(macro)) {
    return "washed away by femcum";
  } else if (isNonFatal(macro)) {
    return "flooded with femcum";
  }
}

function defaultVictimFemaleSpurtMusk(macro) {
  if (isSadistic(macro)) {
    return "suffocated by a spurt of corrosive feminine precum";
  } else if (isGory(macro)) {
    return "snuffed out by a splatter of feminine fluid";
  } else if (isFatal(macro)) {
    return "flooded by your spurting precum";
  } else if (isNonFatal(macro)) {
    return "soaked with your feminine precum";
  }
}

function defaultVictimFemaleOrgasmMusk(macro) {
  if (isSadistic(macro)) {
    return "corroded by your caustic, overwhelming feminine musk";
  } else if (isGory(macro)) {
    return "snuffed out by your feminine musk";
  } else if (isFatal(macro)) {
    return "overwhelmed by feminine musk";
  } else if (isNonFatal(macro)) {
    return "dazed by feminine musk";
  }
}

function defaultVictimBreastCrush(macro) {
  if (isSadistic(macro)) {
    return "reduced to broken gore beneath your breasts";
  } else if (isGory(macro)) {
    return "crushed to death by your bosom";
  } else if (isFatal(macro)) {
    return "flattened under your heavy breasts";
  } else if (isNonFatal(macro)) {
    return "smooshed by your breasts";
  }
}

function defaultVictimCleavageCrush(macro) {
  if (isSadistic(macro)) {
    return "cracked open like gore-filled nuts between your breasts";
  } else if (isGory(macro)) {
    return "crushed to paste between your breasts";
  } else if (isFatal(macro)) {
    return "smashed between your breasts";
  } else if (isNonFatal(macro)) {
    return "squeezed between your breasts";
  }
}

function defaultVictimCleavageAbsorb(macro) {
  if (isSadistic(macro)) {
    return "agonizingly absorbed into your greedy bosom";
  } else if (isGory(macro)) {
    return "absorbed into your greedy breasts";
  } else if (isFatal(macro)) {
    return "absorbed by your breasts";
  } else if (isNonFatal(macro)) {
    return "pulled into your breasts";
  }
}

function defaultVictimCleavageDrop(macro) {
  if (isSadistic(macro)) {
    return "dropped from your cleavage and dashed to bloody bits";
  } else if (isGory(macro)) {
    return "dropped from your cleavage to their deaths";
  } else if (isFatal(macro)) {
    return "dropped from your cleavage and smashed";
  } else if (isNonFatal(macro)) {
    return "dropped from your cleavage";
  }
}

function defaultVictimMilkFlood(macro) {
  if (isSadistic(macro)) {
    return "drenched in and dissolved by your milk";
  } else if (isGory(macro)) {
    return "drowned in your milk";
  } else if (isFatal(macro)) {
    return "washed away by your milk";
  } else if (isNonFatal(macro)) {
    return "flooded in your milk";
  }
}

function defaultVictimBreastVore(macro) {
  if (isSadistic(macro)) {
    return "fed into your breasts to be churned and obliterated";
  } else if (isGory(macro)) {
    return "shoved into your greedy bosom and lost for good";
  } else if (isFatal(macro)) {
    return "stuffed into your breasts to be absorbed";
  } else if (isNonFatal(macro)) {
    return "slipped into your nipples";
  }
}

function defaultVictimPouchAbsorb(macro) {
  if (isSadistic(macro)) {
    return "crushed, torn, and absorbed by your perilous pouch";
  } else if (isGory(macro)) {
    return "smothered and soaked into the walls of your pouch";
  } else if (isFatal(macro)) {
    return "claimed by your pouch";
  } else if (isNonFatal(macro)) {
    return "absorbed into your pouch";
  }
}

function defaultVictimSoulDigest(macro) {
  switch(macro.soulVoreType) {
    case "release":
      return "souls freed from your depths";
    case "body":
      return "souls imprisoned in your body for good";
    case "oblivion":
      return "souls annihilated for eternity";
  }
}

function defaultVictimSoulPaw(macro) {
  switch(macro.soulVoreType) {
    case "release":
      return "souls briefly trapped in your paws";
    case "body":
      return "souls claimed forever by your paws";
    case "oblivion":
      return "souls annihilated in your paws";
  }
}

function defaultVictimPawStench(macro) {
  if (isSadistic(macro)) {
    return "corroded and melted alive by the stench of your " + macro.footDesc(true);
  } else if (isGory(macro)) {
    return "suffocated by the powerful stench of your " + macro.footDesc(true);
  } else if (isFatal(macro)) {
    return "snuffed out by the scent of your " + macro.footDesc(true);
  } else if (isNonFatal(macro)) {
    return "sickened by the smell of your " + macro.footDesc(true);
  }
}

function defaultVictimAssStench(macro) {
  if (isSadistic(macro)) {
    return "reduced to bubbling flesh by the caustic scent of your ass";
  } else if (isGory(macro)) {
    return "suffocated by the rank odor of your ass";
  } else if (isFatal(macro)) {
    return "snuffed out by the scent of your ass";
  } else if (isNonFatal(macro)) {
    return "sickened by the smell of your butt";
  }
}

function defaultVictimGasBelch(macro) {
  if (isSadistic(macro)) {
    return "dissolved by your rich, acidic belches";
  } else if (isGory(macro)) {
    return "corroded by your acrid belches";
  } else if (isFatal(macro)) {
    return "slain by your foul, deafening belches";
  } else if (isNonFatal(macro)) {
    return "knocked out by your belches";
  }
}

function defaultVictimGasFart(macro) {
  if (isSadistic(macro)) {
    return "burned alive and melted down by your farts";
  } else if (isGory(macro)) {
    return "dissolved by your caustic farts";
  } else if (isFatal(macro)) {
    return "inundated in the miasma of your farts";
  } else if (isNonFatal(macro)) {
    return "knocked out by your farts";
  }
}

function defaultVictimPiss(macro) {
  if (isSadistic(macro)) {
    return "drowned and dissolved in acrid piss";
  } else if (isGory(macro)) {
    return "drowned in your acrid piss";
  } else if (isFatal(macro)) {
    return "inundated in hot piss";
  } else if (isNonFatal(macro)) {
    return "flooded with your piss";
  }
}

function defaultVictimBladderVore(macro) {
  if (isSadistic(macro)) {
    return "dissolved in a golden-yellow sea of searing piss";
  } else if (isGory(macro)) {
    return "digested in your bladder and pissed out";
  } else if (isFatal(macro)) {
    return "dissolved in your bladder";
  } else if (isNonFatal(macro)) {
    return "absorbed into your bladder";
  }
}

function defaultVictimPissStench(macro) {
  if (isSadistic(macro)) {
    return "rent asunder by the miasma wafting from your piss";
  } else if (isGory(macro)) {
    return "corroded and consumed by the stench of your piss";
  } else if (isFatal(macro)) {
    return "snuffed out by the stench of your piss";
  } else if (isNonFatal(macro)) {
    return "sickeded by your smelly piss";
  }
}

function defaultVictimScat(macro) {
  if (isSadistic(macro)) {
    return "buried alive and dissolved by your acrid shit";
  } else if (isGory(macro)) {
    return "crushed beneath your scat";
  } else if (isFatal(macro)) {
    return "flattened by your scat";
  } else if (isNonFatal(macro)) {
    return "trapped under your scat";
  }
}

function defaultVictimScatStench(macro) {
  if (isSadistic(macro)) {
    return "melted into slag by the wretched miasma of your scat";
  } else if (isGory(macro)) {
    return "killed by the overwhelming smell of your scat";
  } else if (isFatal(macro)) {
    return "snuffed out by your scat's stench";
  } else if (isNonFatal(macro)) {
    return "sickened by your scat";
  }
}

function defaultVictimGoo(macro) {
  if (isSadistic(macro)) {
    return "shredded and soaked up by your goo";
  } else if (isGory(macro)) {
    return "digested and dissolved into your goo";
  } else if (isFatal(macro)) {
    return "dissolved in your goo";
  } else if (isNonFatal(macro)) {
    return "turned into more of your goo";
  }
}

function defaultVictimPawVore(macro) {
  if (isSadistic(macro)) {
    return "broken down and absorbed directly into your " + macro.footOnlyDesc(true);
  } else if (isGory(macro)) {
    return "crushed under and sucked into your " + macro.footOnlyDesc(true);
  } else if (isFatal(macro)) {
    return "absorbed by your greedy " + macro.footOnlyDesc(true);
  } else if (isNonFatal(macro)) {
    return "absorbed into your " + macro.footOnlyDesc(true);
  }
}

function defaultVictimBreathFire(macro) {
  if (isSadistic(macro)) {
    return "cooked alive and reduced to ash by your flaming breath";
  } else if (isGory(macro)) {
    return "burned alive by your fiery breath";
  } else if (isFatal(macro)) {
    return "burned by your scorching breath";
  } else if (isNonFatal(macro)) {
    return "singed by your breath";
  }
}

function defaultVictimBreathIce(macro) {
  if (isSadistic(macro)) {
    return "flash-frozen by your breath and shattered into gory dust";
  } else if (isGory(macro)) {
    return "fatally frozen by your icy breath";
  } else if (isFatal(macro)) {
    return "turned to ice sculptures by your breath";
  } else if (isNonFatal(macro)) {
    return "frozen by your breath";
  }
}

function defaultVictimBreathElectric(macro) {
  if (isSadistic(macro)) {
    return "blasted into bloody sludge by your shocking breath";
  } else if (isGory(macro)) {
    return "electrocuted by your electric breath";
  } else if (isFatal(macro)) {
    return "fried by your shocking breath";
  } else if (isNonFatal(macro)) {
    return "zapped by your electric breath";
  }
}

function defaultVictimBreathSmoke(macro) {
  if (isSadistic(macro)) {
    return "cooked alive and cauterized by your smoky breath";
  } else if (isGory(macro)) {
    return "suffocated by your hot, smoky breath";
  } else if (isFatal(macro)) {
    return "snuffed out by smoky breath";
  } else if (isNonFatal(macro)) {
    return "singed by your smoky breath";
  }
}

function defaultVictimBreathRadiation(macro) {
  if (isSadistic(macro)) {
    return "reduced to bubbling, glowing sludge by your radioactive breath";
  } else if (isGory(macro)) {
    return "cooked alive by your radioactive breath";
  } else if (isFatal(macro)) {
    return "nuked by your radioactive breath";
  } else if (isNonFatal(macro)) {
    return "mutated by your radioactive breath";
  }
}

function defaultVictimBreathFoul(macro) {
  if (isSadistic(macro)) {
    return "suffocated and slain by thick, miasmic breath";
  } else if (isGory(macro)) {
    return "snuffed out by your foul breath";
  } else if (isFatal(macro)) {
    return "slain by your foul breath";
  } else if (isNonFatal(macro)) {
    return "sickened by your smelly breath";
  }
}

function defaultVictimWingsFlap(macro) {
  if (isSadistic(macro)) {
    return "ripped asunder by gusts from your mighty wings";
  } else if (isGory(macro)) {
    return "thrown and dashed to bits by your sweeping wings";
  } else if (isFatal(macro)) {
    return "thrown away by your swooping wings";
  } else if (isNonFatal(macro)) {
    return "blown away by your wings";
  }
}

function defaultVictimWingsVore(macro) {
  if (isSadistic(macro)) {
    return "shrink-wrapped in your wings and dissolved";
  } else if (isGory(macro)) {
    return "wrapped up in your airless wings and digested";
  } else if (isFatal(macro)) {
    return "snared in your wings and digested";
  } else if (isNonFatal(macro)) {
    return "trapped in your wings";
  }
}
// EATING

rules["eat"].push({
  "test": function(container, macro) {
    return hasNothing(container);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You scoop up...nothing. Oh well.";
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasLessThan(container, "Person", 6) &&
     macro.height >= 10;
  },
  "desc": function(container, macro, verbose, flat) {
    return "You pluck up " + container.describe() + " and stuff them into your mouth, swallowing lightly to drag them down to your bubbling guts.";
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     macro.height < 10;
  },
  "desc": function(container, macro, verbose, flat) {
    return "You grasp " + container.describe() + " and greedily wolf them down, swallowing forcefully to cram them into your bulging stomach. A crass belch escapes your lips as they curl up in your slimy gut.";
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Car", 1);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You crush " + container.describe(verbose) + " with your tight throat, washing it down with its former passengers."
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Macro", 1) &&
     nothingLarger(container, "Macro");
  },
  "desc": function(container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + " and decide it will make a suitable meal. You grab them and stuff them into your " + macro.jawDesc(true) + ". As you slurp\
       them down, you feel them " + pickString("catch in your throat for a brief moment before being swallowed.", "grab at your tounge for purchase before going down your throat.","briefly struggle, then go limp.","pound on the inside of your throat.");
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Small Skyscraper", 1) &&
     nothingLarger(container, "Small Skyscraper") &&
     macro.height < 500;
  },
  "desc": function(container, macro, verbose, flat) {
    return "You drop onto your hands and knees, " + macro.jawDesc(true) + " opening wide to envelop the skyscraper. It glides into your throat as your snout touches the ground,\
    and you suckle on it for a long moment before twisting your head to snap it loose. The entire building, along with " + describe_all(container.contents["Small Skyscraper"].contents, verbose) + "\
    within, plunge into your roiling guts. You wash it down with some delicious treats you slurped up along with it - " + describe_all(container.contents, verbose, ["Small Skyscraper"]) + ".";
  }
});

rules["eat"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Small Skyscraper", 2) &&
     nothingLarger(container, "Small Skyscraper") &&
     macro.height < 750;
  },
  "desc": function(container, macro, verbose, flat) {
    return "You drop onto your hands and knees, " + macro.jawDesc(true) + "  opening wide to envelop the skyscraper. It glides into your throat as your snout touches the ground,\
    and you suckle on it for a long moment before twisting your head to snap it loose. Without missing a beat, you rise back up, sloppy tongue slathering over the side \
    of the remaining tower, sucking on its tip and roughly shoving it into your maw. It breaks from its foundation, vanishing past your lips as you use two fingers to shove it \
    down your sultry throat. Your gut bubbles as " + describe_all(container.contents["Small Skyscraper"].contents, verbose) + " are crunched and crushed within, along with the \
    " + describe_all(container.contents, verbose, ["Small Skyscraper"]) + " that were unfortunate enough to be caught up by your slimy tongue.";
  }
});

// CHEWING

rules["chew"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isGory(macro) &&
     macro.height < 5;
  }, "desc": function(container, macro, verbose, flat) {
    return "You tackle a " + container.describe(verbose) + " and dig into your meal, powerful " + macro.jawDesc(true) + "  ripping them to shreds in seconds. You wolf down great mouthfuls \
    of meat, consuming them in a terrifying frenzy that ends with naught but bones lying on the ground.";
  }
});

rules["chew"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isGory(macro) &&
     macro.height >= 5;
  }, "desc": function(container, macro, verbose, flat) {
    return "You snatch up a " + container.describe(verbose) + ", then stuff their lower body into the guillotine that is your ravenous maw - slicing off their legs with \
    a single disgusting <i>crunch</i>, then finishing them off with another ravenous bite that obliterates their torso. Their bleeding head falls from your lips, only to be \
    caught between two fingers and popped back in to be crunched between molars and swallowed.";
  }
});

rules["chew"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Car", 1);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You lean down and open your "  + macro.jawDesc(true) + " wide, catching " + container.describe(verbose) + ". Holding onto the car with only your " + macro.teethDesc(true) + ", you tilt your head back, opening wider \
    to let the vehicle fall further your mouth, Once the car settles, you start slowly closing your jaw, feeling glass shatter, metal grind, and tires burst as those trapped inside try to escape. Every time your chew you feel your \
    " + macro.teethDesc(true) + " " + macro.biteDesc(false) + " the vehicle into a smaller and smaller lump. After you are satisfied, you tilt your head back and swallow the debries in a single fluid gulp.";
  }
});

// STOMPING

rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + macro.footDesc() + " thumps " + container.describe(verbose) + ", shoving your victim to the ground and cracking them open like an egg.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your shadow falls over " + container.describe(verbose) + ", and your " + macro.footDesc() + " follows, crushing their soft body and reducing them to a heap of broken gore.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasNothingElse(container, ["Person","Cow","Car"]) &&
      isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + macro.footDesc() + " smooshes over " + container.describe(verbose) + ". They stick to your " + macro.toeDesc(true) + ", carried along for the ride as you take another few steps before finally\
    falling off.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Bus"]) &&
     hasExactly(container, "Bus", 1) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});


rules["stomp"].push({
  "test": function(container, macro) {
    return hasOnly(container, ["Person","Car", "Bus"]) &&
     hasExactly(container, "Bus", 1) &&
     hasLessThan(container, "Car", 10);
  }, "desc": function(container, macro, verbose, flat) {
    return "You punt a " + container.contents["Bus"].describe(verbose) + ", sending it tumbling down the road into a " + describe_all(container.contents, verbose, flat, ["Bus"]);
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Parking Garage", 1) &&
     nothingLarger(container, "Parking Garage");
  }, "desc": function(container, macro, verbose, flat) {
    return (pickString("You bring your " + macro.footDesc() + " down on ", "You kick your " + macro.footDesc() + " through ")) + container.describe(verbose) +", collapsing the structure and setting off car alarms. As the alarms blare, you reposition your " + macro.footDesc() + 
        " over the structure, and slam it down; silencing the alarms, and completely demolishing the building.";
  }
});

//paw area between 5 and 50

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 50 &&
     macro.pawArea > 5 &&
    isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 50 &&
     macro.pawArea > 5 &&
    isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it. \
     Your " + macro.footDesc() + "print is filled with rubble and those unluckly enough to be in your path.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 50 &&
     macro.pawArea > 5 &&
    isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it. \
     Your " + macro.footDesc() + "print is filled with rubble and the mangled corpses of those unluckly enough to be in your path.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 50 &&
     macro.pawArea > 5 &&
    isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You slowly bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with your prey, you feel those beneath you struggle to overcome \
    the weight bearing down on them, before being completely crushed. You shift a little more of your weight on your outstretched " + macro.footDesc() + " and see blood spray from between your " + macro.toeDesc(true) + ". Lifting your " + macro.footDesc() + " off the \
    ground to examine your " + macro.footDesc() + "print, you see that it is filled with blood, debris, and the mangled corpses of those unluckly enough to be in your path.";
  }
});

//Stomping Macro

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Macro", 1) &&
     nothingLarger(container, "Macro") &&
     isNonFatal(macro);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power"," and decide it will will be suitable prey."," and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame, which sends it into the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its back, and slam the \
    smaller macro back into the dirt.";
  }
});


rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Macro", 1) &&
     nothingLarger(container, "Macro") &&
     isFatal(macro);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power"," and decide it will will be suitable prey."," and decide to show it what being a macro really means.") + "\
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame, which sends it into the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its back, and slam the \
    smaller macro into the dirt where it perishes.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Macro", 1) &&
     nothingLarger(container, "Macro") &&
     isGory(macro);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power"," and decide it will will be suitable prey."," and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame; cracking bones and dashing it against the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its \
    back, and slam the smaller macro into the dirt. Shifting your weight forward, you feel it struggle beneath your " + macro.toeDesc(true) + " and watch as blood soaks into the ground.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Macro", 1) &&
     nothingLarger(container, "Macro") &&
     isSadistic(macro);
  },
  "desc": function(container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power"," and decide it will will be suitable prey."," and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame; cracking bones and dashing it against the side of a nearby building. As it attempts to drag itself away, you place your massive " + macro.footDesc() + " \
    on its back, and slam the smaller macro into the dirt. Shifting your weight forward, you feel it struggle beneath your " + macro.toeDesc(true) + " and watch as blood soaks into the ground. You hold your stance as you feel it's struggles weaken and fade away. Just as it seems it \
    can struggle no more, you place your entire weight  of " + mass(macro.mass, unit) + " on it, and pop it's " + mass(80000, unit, true) + " body like a grape.";
  }
});

//paw area over 1000

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1000 &&
     macro.pawArea > 50 &&
     isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink into the ground. After you lift \
     your " + macro.soleDesc() + ", you notice it has left a deep, clear indent in the ground.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1000 &&
     macro.pawArea > 50 &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink into the ground. After you lift \
     your " + macro.soleDesc() + ", a deep indent full of rubble is revealed.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1000 &&
     macro.pawArea > 50 &&
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink through buildings and into the \
     ground. After you lift your " + macro.soleDesc() + ", a deep indent full of rubble and mangled corpses is revealed.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1000 &&
     macro.pawArea > 50 &&
     isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink through buildings and into the \
     ground. After you lift your " + macro.soleDesc() + ", a deep indent full of blood-smeared rubble is revealed. Bone fragments and rebar stick out of the mess, tangled into a mold of your " + macro.footDesc() + ".";
  }
});

//paw area less than 1e7

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1e7 &&
     macro.pawArea > 1000 
     isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " crater in the ground.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1e7 &&
     macro.pawArea > 1000 
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, you drive your " + macro.toeDesc() + " deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " \
    rubble-lined crater in the ground.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1e7 &&
     macro.pawArea > 1000 
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, you drive your " + macro.toeDesc() + " deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " \
    rubble-lined crater in the ground. At the center of the crater, a pond of blood and liquified prey is filling, fed by the crater and your dripping " + macro.soleDesc() + ".";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return macro.pawArea <= 1e7 &&
     macro.pawArea > 1000 
     isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, your " + macro.toeDesc(true) + " knock over and pulverize buildings, driving them deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " \
    by "+ length(macro.pawWidth, unit, true) + " rubble-lined crater in the ground. At the center of the crater, a pond of blood and liquified prey is filling, fed by the crater and your dripping " + macro.soleDesc() + ".";
  }
});

//paw area less than 1e11

rules["stomp"].push({
  "test": function(container, macro) {
      return macro.pawArea <= 1e11 &&
       macro.pawArea > 1e7 &&
       !hasAtleast(container, "Planet", 1) && //this is to prevent these interactions from running on planets that have been shrunk
       isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on "+ container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of \
    your " + macro.toeDesc(true) + "preserved in newly formed hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone; forming the wall of the " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " wide \
    dust-filled crater you created.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
      return macro.pawArea <= 1e11 &&
       macro.pawArea > 1e7 &&
       !hasAtleast(container, "Planet", 1) &&
       isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on "+ container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + "\
     preserved in newly formed hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " wide debris-filled crater you created.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
      return macro.pawArea <= 1e11 &&
       macro.pawArea > 1e7 &&
       !hasAtleast(container, "Planet", 1) &&
       isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on "+ container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + "\
     preserved in debris strewn hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " wide gore-filled crater you created. \
     The basin of the crater lined with with a smooth steel, glass, and bone aggregate. Steam rises from the mix as it cools and hardens";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
      return macro.pawArea <= 1e11 &&
       macro.pawArea > 1e7 &&
       !hasAtleast(container, "Planet", 1) && 
       isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on "+ container.describe(verbose) + ". As you lower your leg, you feel it catch the tops of the taller skycrapers first, collapsing them with no effort. As they fall, you \
     crush more and more buildings until you feel your " + macro.footDesc() + " smash into the ground. You settle into the landscape and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + "preserved in debris strewn \
     hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " wide gore-filled crater you created. The basin of the crater \
     lined with with a smooth steel, glass, and bone aggregate. Steam rises from the mix as it cools and hardens";
  }
});

//paw area less than 2e14

rules["stomp"].push({
  "test": function(container, macro) {
    return (macro.pawArea < 2e14 ||
     hasAtleast(container, "Continent", 1)) &&
     macro.pawArea > 1e11 &&
     !hasAtleast(container, "Planet", 1) && 
     isNonFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
      return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on "+ container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. Your " + macro.footDesc() + "\
     continues sinking into the bedrock until only your enoumous calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " image \
     of your "+ macro.footDesc() + " surrounded by irregular mountains that barely peek over the rim of the outer " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that \
     the bottom of the smaller crater is filled with deep ravines.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return (macro.pawArea < 2e14 ||
     hasAtleast(container, "Continent", 1)) &&
     macro.pawArea > 1e11 &&
     !hasAtleast(container, "Planet", 1) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on "+ container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. Your " + macro.footDesc() + "\
     continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " image \
     of your "+ macro.footDesc() + " surrounded by irregular mountains of of broken concrete and steel that barely peek over the rim of the outer " + length((Math.pow(macro.pawArea/Math.PI, .5)* 3), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its \
     molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. With time, a supervolcano will form here.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return (macro.pawArea < 2e14 ||
     hasAtleast(container, "Continent", 1)) &&
     macro.pawArea > 1e11 &&
     !hasAtleast(container, "Planet", 1) &&
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on "+ container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. The shrapnel riding behind the \
     shocwave rips thorugh the area, painting it in red. Your " + macro.footDesc() + " continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a \
     " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " image of your "+ macro.footDesc() + " surrounded by irregular mountains composed of broken concrete and steel that barely peek over the rim of the outer \
     " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. The lava \
     seeping upwards begins melting the steel, glass, concrete, and bone fragments that surround it.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return (macro.pawArea < 2e14 ||
     hasAtleast(container, "Continent", 1)) &&
     macro.pawArea > 1e11 &&
     !hasAtleast(container, "Planet", 1) &&
     isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on "+ container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. The shrapnel riding behind the \
     shockave rips thorugh the area, painting it in red. Your " + macro.footDesc() + "continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a \
     " + length(macro.pawLength, unit, true) + " by "+ length(macro.pawWidth, unit, true) + " image of your "+ macro.footDesc() + " surrounded by irregular mountains of of broken concrete and steel that barely peek over the rim of the outer \
     " + length((Math.pow(macro.pawArea/Math.PI, .5)* 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. The lava \
     seeping upwards begins melting the steel, glass, concrete, and bone fragments that surround it. The simple act of slamming your " + macro.footDesc() + " down has created a " + (1e7 <= (Math.pow(macro.pawArea/Math.PI, .5)* 4) ? "planet-wide":length((Math.pow(macro.pawArea/Math.PI, .5)* 4), unit, true) + " wide") + " \
     wasteland.";
  }
});

// stomping a planet

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around "+ container.describe(verbose) + " and begin to squeeze it between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe \
    begins to bulge outward at the middle, and firmly press against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface, fighting with and evaporating the oceans. As the last of the water drys up, the atmosphere thins and \
    spreads over your form, cooling the lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly crumbling pancake. The \
    remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]) &&
     isGory(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around "+ container.describe(verbose) + ". As your " + macro.soleDesc(true) + " spread across the surface of the planet, the civilization beneath breaks apart and lubricates the land.\
    You shift your " + macro.footDesc() + " for better grip and begin to squeeze the planet between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe begins to bulge outward at the middle, \
    and press up against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface. The surface warms beneath you, as the dwindling oceans fill with cooling stone. As the last of the water drys up, the atmosphere thins \
    and spreads over your form, cooling the remaining lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly \
    crumbling pancake. The remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]) &&
     isSadistic(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around "+ container.describe(verbose) + ". As your " + macro.soleDesc(true) + " spread across the surface of the planet, the civilization beneath breaks apart and lubricates the land.\
    You shift your " + macro.footDesc() + " for better grip and begin to squeeze the planet between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe begins to bulge outward at the middle, \
    and press up against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface. The planet burns and dies below you, as the dwindling oceans fill with cooling stone. As the last of the water drys up, the atmosphere thins \
    and spreads over your form, cooling the remaining lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly \
    crumbling pancake. The remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function(container, macro) {
      return (hasAtleast(container, "Star", 1) ||
     hasAtleast(container, "Solar System", 1)) &&
     isFatal(macro);
  }, "desc": function(container, macro, verbose, flat) {
    return "You place your two " + length(macro.pawLength, unit, true) + " long " + macro.footDesc(true) + " around " + container.describe(verbose) + " and begin to squeeze " + (container.count > 1 ? "them" : "it") + " between your " + length(macro.pawWidth, unit, true) + " wide \
    " + macro.toeDesc(true) + ". The crushing gravity your " + macro.footDesc(true) + " generate is enough to vaporize your prey before your " + macro.toeDesc(true) + " even touch each other. As they come together, the energy crushes the remaining dust with enough pressure to form \
    new elements. Eventually nothing remains but the bottom of your " + macro.footDesc(true) + ".";
  }
});

// ANAL VORE

rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Person", 1) &&
     hasOnly(container, ["Person"]);
  }, "desc": function(container, macro, verbose, flat) {
    let adjective = ["musky","winding","churning"][Math.floor(Math.random()*3)];
    return "Your weighty rump slams against the ground. A shock of pleasure runs up your spine as a " + container.describe(verbose) + " slides up your ass," +
    (macro.maleParts ? " grinding against your prostate" : "") + ". A powerful clench drags them deeper into your bowels, sealing them away in your " + adjective + " depths.";
  }
});

rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Car", 1) &&
     hasOnly(container, ["Car"]);
  }, "desc": function(container, macro, verbose, flat) {
    return "You ram " + container.describe(verbose) + " up your ass, biting your lip as it" + (macro.maleParts ? " rubs along your prostate" : " slides into velvety depths") + ".\
    You moan and clench hard, yanking it in with a wet <i>shlrrp</i> and abruplty silencing its blaring horn.";
  }
});

rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Bus", 1) &&
     hasOnly(container, ["Bus"]);
  }, "desc": function(container, macro, verbose, flat) {
    return "A speeding bus slams on its brakes as you abruptly sit - but it's too late to stop. A gasp flies from your lips as it penetrates your greedy ass, sinking halfway in and coming to a halt. \
    You grunt and squeeze, causing its frame to creak and groan. Two fingers to the back are enough to get it moving again, and it slowly works inside. You shiver and moan, taking it in all the way. \
    Your ass claims " + container.describe(verbose) + ".";
  }
});

rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Business", 1) &&
     hasOnly(container, ["Business"]);
  }, "desc": function(container, macro, verbose, flat) {
    return "You set your weighty rump down on " + container.describe() + " and feel it penerate your hole. Once your weight has settled you clench your sphincter, seperating the building from its foundations with a <i>crCraCHH</i> \
    pulling it off the groud and inside of your ass. You feel the immense pressure of your anal cavity slowly crushing the building, bringing newfound pleasure with every shift and tremour within the structure.";
  }
});


rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Train", 1) &&
     hasOnly(container, ["Train"]);
  }, "desc": function(container, macro, verbose, flat) {
    var cars = container.contents["Train"].contents["Train Car"].count;
    return "Your massive fingers wrap around a train, yanking it from the rails with a tremendous screech of metal-on-metal. You squat down low, eyes rolling back in anticipation as you thrust the locomotive towards your massive ass - and then it hits home. A moan of pleasure shakes the earth, your ravenous pucker spread around the engine and sucking it in with a <i>squelch</i>. Powerful muscles squeeze and grab...and " + container.describe(verbose) + " swiftly vanishes into your bowels, every one of the " + cars + " cars a fresh shock of pleasure as they glide into your musky depths.";
  }
});

rules["anal-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]);
  }, "desc": function(container, macro, verbose, flat) {
    return "Your enormous hands guide a planet towards your cheeks - pressing it firmly into your pucker with a dull, muffled <i>shlph</i>...and " + container.describe(verbose) + " sinks into your bowels, sealed away from the universe...";
  }
});

//Cock Vore

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 1000 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
    return "You snatch " + container.describe(verbose) + " from the ground and shove them inside your " + macro.describeDick + ". With a <i>sluurp</i> you pull them deep into your shaft. You watch as the bulge in your manhood \
    gets pulled closer to your body by powerful clenches, until it vanishes into your " + pickString("throbbing","churning","eager","awaiting","heavy") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 50000 &&
     macro.dickMass > 1000 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
    return "You pluck " + container.describe(verbose) + " from the ground and shove them against the head of your " + length(macro.dickDiameter, unit, true) + " wide " + macro.describeDick + ". They struggle to escape your grasp, while your cockslit \
    opens and devours them with a <i>sluuurP</i>. You watch as the squirming bulge in your manhood travels down your shaft until it vanishes into your " + pickString("throbbing","churning","eager","awaiting","heavy") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 5000000 &&
     macro.dickMass > 50000 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
    return "Your gigantic fingers reach down and grab " + container.describe(verbose) + ". Holding them in your iron grip, you raise them to your awaitng " + macro.describeDick + ". As they struggle to escape, your cockslit opens wide and envelops your prey. Once it has swallowed everything, it clamps down and pulls those unfortunate enough to be in your shaft deep inside,\
    packing down its meal with muffled <i>snAps</i> and <i>CRRUnCHes</i>. Enventually your prey reaches the base of your cock, and everything left gets shoved into your " + pickString("throbbing","churning","eager","awaiting","heavy") + " balls with a final mighty clench.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 1e9 &&
     macro.dickMass > 5000000 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
    return "You lay the " + length(macro.dickDiameter, unit, true) + " wide tip of your cock on the ground and thrust forward, filling your cock with " + container.describe(verbose) + ". The tip of your member bulges with its cargo. As you slowly clench to drag your prey into your bulging dick, the sensation of them rubbing against the inside of your cock causes you to release a glob of precum that lubricates your stretched passage. \
    After several more powerful clenches, you feel the bulge pass the halfway mark of your " + macro.describeDick + ". The speed of the bulge picks up, as the entirery of your captive prey has been thoughly lubricated. You feel them slide through your utethra, and shudder with anticipation as they approach your \
      " + pickString("throbbing","churning","eager","awaiting","heavy","mammoth") + " balls. Finally your meal reaches your body, and drops into your cum factories.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 1e14 &&
     macro.dickMass > 1e9 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
    return "You lay the " + length(macro.dickDiameter, unit, true) + " wide tip of your cock on the ground and grind it along the earth, ripping up the terrain and giving all in your path nowhere to go; except into your " + macro.describeDick + ". The colossal tip of your member bulges with " + container.describe(verbose) + ". As you slowly clench your mighty rod, you feel your prey shift and slide along the inside of your cum channel. \
    After a few more moments of pure pleasure, you feel the bulge pass the halfway mark of your tool. The speed of the bulge picks up, as the entirery of your captive prey has been compacted and lubricated by their journey. With every pull, a shudder of ecstasy goes up your spine, until those inside your cock finally reach their ultimate destination, \
    your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return macro.dickMass <= 1e19 &&
     macro.dickMass > 1e14 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
      return "You lay your " + length(macro.dickDiameter, unit, true) + " across member on the terrain and begin using your mammoth dick muscles to create a mighty wind, pulling in the surrounding landscape, ripping up the terrain and pulling it within your " + macro.describeDick + ". The colossal slit at the tip of your staff opens wide as buildings, trees, and everything else gets sucked inside\
    . You feel the prey sliding down your cock rub against your utethra as they pass through. You can even see some of the larger buildings as small, quick moving bulges within your manhood. After several minutes of sucking, your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls are filled by " + container.describe(verbose) + ". As you shift you cock off the ground, you \
    the satisfying weight of your prey bounce and jiggle within your sack.";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return (macro.dickMass <= 1e23 ||
     nothingLarger(container, "Continent")) &&
     macro.dickMass > 1e19 &&
     container.count > 0;

  }, "desc": function(container, macro, verbose, flat) {
      return "You lay your " + length(macro.dickDiameter, unit, true) + " across member on the planet and begin using your enourmous dick muscles to create a gigantic vacuum, pulling in the surrounding landscape, ripping up  huge chunks of the terrain and pulling them inside your " + macro.describeDick + ". The ginormous gaping slit at the tip of your colossal dick opens wide as cities, rivers, lakes, and mountains vanish into your depths. \
    A steady stream of steady unbroken friction rubs against the inside of your mammoth tool, almost causing you to black out from pleasure. As your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls fill, you start slowing down your enormous contractions, until you have " + container.describe(verbose) + " captive within your stretched sack.";
  }
});


rules["cock-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]) &&
    macro.dickGirth <= 2.5e14;

  }, "desc": function(container, macro, verbose, flat) {
      return "You shove your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead against the planet as your greedy slit stretches wide. The globe shudders and begins to slowly enters your stretched hole. As you get closer and closer to covering an entire hemisphere with \
      your " + macro.describeDick + ", you feel the pressure rise. Shoving the planet inside your cock takes more and more effort, until with a final shove, you feel your tip of your dick pass the center of the sphere, and hold it snug. You stop to squeeze your shaft, and feel how far it has been stretched outward.\
      You begin flexing your cock to bring the world fully inside your enourmous prick, and after a few  more gulps, light ceases to fall on Earth. You help your cock along with its planetary feast by grabbing it and slowly pulling down the shaft, lodging the planet deeper, and deeper, and deeper within you.\
      After what seems like a lifetime of pleasure, the world finally reaches the base of your thick cock, and squeezes down into your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls. You reach down and touch your sack, feeling it digest " + container.describe(verbose) + ".";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
    return hasExactly(container, "Planet", 1) &&
     hasOnly(container, ["Planet"]) &&
     macro.dickGirth > 2.5e14;

  }, "desc": function(container, macro, verbose, flat) {
      return "You shove your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead against the planet as your greedy slit stretches wide to envelop it. You feel it slowly enter your gaping hole and after a few massive clences of your " + macro.describeDick + ", light ceases to fall on Earth. \
      You run your fingers down you shaft, feeling the bulge, and massaging it along. The slurping of your cock pulls it toward your abdomen until it eventually runs out of length, and is squeezed down into your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls. You reach down and touch your sack, feeling it digest " + container.describe(verbose) + ".";
  }
});

rules["cock-vore"].push({
  "test": function(container, macro) {
     return hasAtleast(container, "Star", 1) ||
     hasAtleast(container, "Solar System", 1)

  }, "desc": function(container, macro, verbose, flat) {
      return "You open your cumslit wide and let gravity fill your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead with " + container.describe(verbose) + ". The tip of your cock closes and begins clenching to pull your prey deeper. \
      You run your fingers down your " + macro.describeDick + ", feeling it work its meal deeper within your shaft, and massaging it ensure everything inside continues towards your " + pickString("throbbing","churning","eager","awaiting","heavy", "mammoth") + " balls. \
      As your cock finishes its work, you feel the passage to your balls stretch wide, fill, and them empty as your balls fill, and begin the process of digestion.";
  }
});

//Ball Smother
  //Balls weigh 1,000kg or less
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1000 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your giant balls impact the ground with a <i>thud</i>, pinning " + container.describe(verbose) + " between your weighty orbs.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1000 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i>, crushing " + container.describe(verbose) + ".";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1000 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i> trapping " + container.describe(verbose) + " and grinding them into the pavement. They briefly struggle to escape before succumbing to the weight bearing down on them.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1000 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i> trapping " + container.describe(verbose) + " and grinding them into the pavement. They briefly struggle to escape before being crushed into a gory mess that leaves a slick of blood on your swinging sack.";
  }
});

//Balls weigh  50,000kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 50000 &&
     macro.ballMass > 1000 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls impact the ground with a <i>thump</i>. They spread over " + container.describe(verbose) + " and settle into the ground.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 50000 &&
     macro.ballMass > 1000 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " destroying everything in their path and leaving a gouge in the ground.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 50000 &&
     macro.ballMass > 1000 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " with the force of a wrecking ball. The momentum of the swing destroying everything in their path and leaving a trail of destruction.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 50000 &&
     macro.ballMass > 1000 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " with the force of a wrecking ball. The momentum of your mighty sack destroying everything in its path and leaving a trail of destruction. Your balls swing back through the remains of your prey, the massive weight converting everything remaining into unidentifiable detritus.";
  }
});

//Balls weigh  5,000,000kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 5000000 &&
     macro.ballMass > 50000 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before coming to rest. You feel your sack shift as it settles into the landscape";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 5000000 &&
     macro.ballMass > 50000 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you heave your weighty orbs off the ground, only rubble remains.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 5000000 &&
     macro.ballMass > 50000 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. After you heave your weighty orbs off the ground all that remains of your victims is gore streaked rubble and twisted steel.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 5000000 &&
     macro.ballMass > 50000 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. After you heave your weighty orbs off the ground you see that those that were trapped beneath your cum factories are nothing but crumpled bodies lying amist the rubble.";
  }
});

//Balls Weigh 1e9 kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e9 &&
     macro.ballMass > 5000000 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before coming to rest on " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it spreads over the terrain and forms two noticable indents.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e9 &&
     macro.ballMass > 5000000 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before crushing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots in the terrain; testimony of your immense power.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e9 &&
     macro.ballMass > 5000000 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before pulverizing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots filled with rubble and gore in the terrain; testimony of your immense power.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e9 &&
     macro.ballMass > 5000000 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before pulverizing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack move and shudder as it's immense bulk flattens everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots filled with rubble and gore in the terrain; a fitting grave for those lesser than you.";
  }
});

//Balls Weigh 1e12 kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e12 &&
     macro.ballMass > 1e9 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky before coming to rest on " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack push the ground aside to form two massive craters.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e12 &&
     macro.ballMass > 1e9 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
      resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you you heave your sack off the ground, two massive craters have formed at the impact site.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e12 &&
     macro.ballMass > 1e9 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you heave your sack off the ground, two massive craters have formed at the impact site. A pool of blood and musk is rapidly forming at the bottom of each crater, with peices of debris floating in them.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e12 &&
     macro.ballMass > 1e9 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you heave your sack off the ground, two massive craters have formed at the impact site. A pool of blood and musk is rapidly forming at the bottom of each crater, with bones and peices of debris floating in them.";
  }
});

//Balls Weigh 1e15 kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e15 &&
     macro.ballMass > 1e12 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over " + container.describe(verbose) + " before settling into the terrain with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your gigantic orbs shovel out a spot for themselves with their mass alone.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e15 &&
     macro.ballMass > 1e12 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, true) + " destroying all in its path. As the initial impact subsides you feel your \
enormous balls shift away from each other as they furrow into the landscape.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e15 &&
     macro.ballMass > 1e12 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, false) + " tossing people into the air and drestroying all in its path. As the \
initial impact subsides you feel your enormous balls shift away from each other as they furrow into the landscape and over the people that attempted to flee.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e15 &&
     macro.ballMass > 1e12 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, false) + " tossing people into the air and drestroying all in its path. As the \
initial impact subsides you feel your enormous balls shift away from each other as they furrow into the landscape and over the people that attempted to flee. The ground is stained red with blood and gore.";
  }
});

//Balls Weigh 1e20 kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e20 &&
     macro.ballMass > 1e15 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall before they come to rest on" + container.describe(verbose) + " . Each titanic testicle weighing " + mass(macro.ballMass, unit, false) + " . The craters left by each orb will scar the planet until its destruction.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e20 &&
     macro.ballMass > 1e15 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing shrapnel in every direction. The craters left by your gonads will scar the planet until its destruction.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e20 &&
     macro.ballMass > 1e15 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing shrapnel in every direction. The craters left by your gonads quickly fill with various fluids, leaving two lakes forever on the planet.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e20 &&
     macro.ballMass > 1e15 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing rubble, bodies, and shrapnel in every direction. The craters left by your gonads quickly fill with various fluids, leaving two lakes forever on the planet.";
  }
});

//Balls Weigh 1e24 kg or less

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e24 &&
     macro.ballMass > 1e20 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "The Gravatational pull of your " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall before they come to rest on" + container.describe(verbose) + " . Each monstrous testicle weighing " + mass(macro.ballMass, unit, false) + " . The impact of your manhood creating mountains and shaking earth";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e24 &&
     macro.ballMass > 1e20 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e24 &&
     macro.ballMass > 1e20 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Those that survived the blast are deafened as windows shatter around them and buildings shake on the verge of collapse. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area.";
  }
});

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass <= 1e24 &&
     macro.ballMass > 1e20 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Those that survived the blast are deafened as windows shatter around them and buildings shake on the verge of collapse. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area. \
      You smell the tang of copper in the air, and know that the next rainfall with be red with the blood of those you have slaughtered.";
  }
});



//Balls Weigh more than 1e24 kg

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass > 1e24 &&
     container.count > 0 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, smushing them firmly against your " + length(macro.ballDiameter, unit, true) + " wide balls. ";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass > 1e24 &&
     container.count > 0 &&
     isFatal(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, crushing " + (container.count == 1 ? "it" : "them") + " firmly against your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs tearing " + (container.count == 1 ? "it" : "them") + " asunder, spreading the debris across \
your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});
rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass > 1e24 &&
     container.count > 0 &&
     isGory(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, obliterating " + (container.count == 1 ? "it" : "them") + " with \
    your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs tearing " + (container.count == 1 ? "it" : "them") + " asunder. The many fragments of the collision \
    expand outward before being pulled back against your groin. The debris spread across your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});

rules["ball-smother"].push({
  "test": function(container, macro) {
     return macro.ballMass > 1e24 &&
     container.count > 0 &&
     isSadistic(macro);

  }, "desc": function(container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, decimating " + (container.count == 1 ? "it" : "them") + " with \
    your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs ripping and tearing " + (container.count == 1 ? "it" : "them") + " asunder. The many fragments of the collision \
    expand outward before being pulled back against your groin. The debris spread across your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});

//male orgasm

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall and drowning them in a $VOLUME-torrent of cum.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall; pinning them in place and suffocating them in a $VOLUME-torrent of cum.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return hasOnly(container, ["Person"]) &&
     hasExactly(container, "Person", 1) &&
     isSadistic(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall; pinning  them in place with a $VOLUME-torrent of cum. As they gasp for breath, your cum fills their lungs and stomach. \
Their form falls lifeless on the ground once your cumshot has ended.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 50 &&
     spurtVolume > 5 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 50 &&
     spurtVolume > 5 &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", shoving your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your cumshot.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 50 &&
     spurtVolume > 5 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", shoving your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your \
      cumshot. The rubble and hardening cum covering the wall holds your victims in place against the structure.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 50 &&
     spurtVolume > 5 &&
     isSadistic(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", crushing your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your \
      cumshot. The rubble and red-dyed cum covering the wall holds your victims in place against the structure.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 500 &&
     spurtVolume > 50 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 500 &&
     spurtVolume > 50 &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", crushing and downing them at the same time.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 500 &&
     spurtVolume > 50 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", compacting and mangling everything in its path. As your cumshot ends, \
      a thick stream of pink frothing fluids pours into nearby sewer drains, filling and clogging them.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 500 &&
     spurtVolume > 50 &&
     isSadistic(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUME of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", compacting and mangling everything in its path. The sheer pressure propelling \
      your cum severs limbs and crumples steel. As your cumshot ends, a thick stream of pink frothing fluids pours into nearby sewer drains, filling and clogging them.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 5000 &&
     spurtVolume > 500 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.ballDiameter + " balls bounce and your " + macro.describeDick + "begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 5000 &&
     spurtVolume > 500 &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      Limbs and rubble float away on the jizz, vanishing into the storm drains and down the street.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 5000 &&
     spurtVolume > 500 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      The torrent of jizz seeps away; leaving behind rubble and corpses.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 5000 &&
     spurtVolume > 500 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      The torrent of jizz and blood seeps away; leaving behind rubble and corpses.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e6 &&
     spurtVolume > 5000 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e6 &&
     spurtVolume > 5000 &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e6 &&
     spurtVolume > 5000 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz. The debris filled river of cum rages down the street, revealing more twisted steel and corpses with every building it brushes past.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e6 &&
     spurtVolume > 5000 &&
     isSadistic(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz. The debris filled river of cum and gore rages down the street, revealing more twisted steel and corpses with every building it brushes past.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e9 &&
     spurtVolume > 1e6 &&
     isNonFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum covers " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e9 &&
     spurtVolume > 1e6 &&
     isFatal(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + ".";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e9 &&
     spurtVolume > 1e6 &&
     isGory(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + " as \
      it flies through air. Those caught in its path are smashed to pieces and dragged away the intense currents. The sheer volume of fluid overwelmes the sewers; you see cum spew from manholes and strom drains for several blocks.";
  }
});

rules["male-orgasm"].push({
  "test": function(container, macro, spurtVolume) {
     return spurtVolume <= 1e9 &&
     spurtVolume > 1e6 &&
     isSadistic(macro);

  }, "desc": function(container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + " as \
      it flies through air. Those caught in its path are smashed to pieces and dragged away the intense currents. The sheer volume of fluid overwelmes the sewers; you see cum, gore, glass, and steel spew from manholes and strom drains for several blocks.";
  }
});

//--------TODO LIST-----

//cum for skyscraper cum for single macro

//precum

//musk 

//boobs 

//waste

//reduce military presence

//more interactions for donning/doffing shoes

//smaller approx units

//home planet rules

//moon, dead planet, dwarf planet, asteroid, gas giant

//stomping interactions based on different footwear

//commerical vehicles

//more objects on city/town continent scale(maybe countries)

//make unit prefrencerance a saved value