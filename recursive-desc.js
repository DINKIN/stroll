'use strict';

/*jshint browser: true*/

var rules = {};
var defaults = {};

const synonyms = {
  heavy: ["heavy", "weighty"],
  huge: ["huge", "massive", "gigantic", "large"],
  cosmic: ["cosmic", "utterly colossal", "star-spanning"],
  gulp: ["gulp", "gluk", "glrk", "glp"],
  swallow: ["swallow", "gulp"],
  looming: ["looming", "imposing", "awe-inspiring", "menacing"],
  putrid: ["putrid", "foul", "wretched", "choking", "rancid", "utterly foul", "miasma-shrouded", "eye-wateringly foul"],
  moan: ["moan", "gasp", "growl"]
}

function plural(quantity, singular, plural) {
  return quantity > 1 ? plural : singular;
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDefault(name) {
  return defaults[name];
}

function getDefaultVictim(name) {
  return defaults[name];
}

var action_keys = ["eat", "chew", "vomit", "hand-crush", "foot-crush", "stomp", "stomp-wedge", "flex-toes", "kick", "anal-vore", "ass-crush", "ass-grind", "tail-slap", "tail-vore", "tails-vore", "cleavage-stuff", "cleavage-crush", "cleavage-drop", "cleavage-absorb", "breast-crush", "breast-vore", "breast-milk", "unbirth", "sheath-stuff", "sheath-clench", "sheath-crush", "sheath-absorb", "foreskin-stuff", "foreskin-clench", "foreskin-crush", "foreskin-absorb", "cock-vore", "cockslap", "ball-smother", "male-spurt", "male-orgasm", "female-spurt", "female-orgasm", "grind", "pouch-stuff", "pouch-rub", "pouch-eat", "pouch-absorb", "soul-vore", "soul-absorb-paw", "paw-stench", "ass-stench", "piss-stench", "scat-stench", "male-musk", "female-musk", "male-orgasm-musk", "female-orgasm-musk", "male-spurt-musk", "female-spurt-musk", "belch", "fart", "stomach", "tail", "tail-to-stomach", "womb", "balls", "bowels", "bowels-to-stomach", "breasts", "bladder", "soul-digest", "wings", "wings-to-stomach", "wear-shoe", "remove-shoe", "wear-sock", "remove-sock", "stuff-shoe", "dump-shoe", "stuff-sock", "dump-sock", "piss", "bladder-vore", "scat", "sheath-toy", "foreskin-toy", "slit-toy", "breast-toy", "melt", "solidify", "flood", "stomp-goo", "goo-digest", "ass-goo", "goo-stomach-pull", "goo-stomach-push", "goo-bowels-pull", "goo-bowels-push", "goo-womb-pull", "goo-womb-push", "goo-balls-pull", "goo-balls-push", "goo-breasts-pull", "goo-breasts-push", "goo-tail-pull", "goo-tail-push", "goo-paws-pull", "goo-paws-push", "paw-vore", "paw-vore-toes", "paws", "crop-swallow", "crop-transfer", "breath-fire", "breath-ice", "breath-electric", "breath-smoke", "breath-radiation", "breath-foul", "drool", "magic-shrink", "magic-hypnotize", "wings-flap", "wings-vore"];

var victim_keys = ["victim-cum-flood", "victim-femcum-flood", "victim-crushed-hand", "victim-crushed-foot", "victim-stomped", "victim-flex-toes", "victim-eaten", "victim-ass-crush", "victim-ass-ground", "victim-humped", "victim-vomit", "victim-chew", "victim-drool", "victim-anal-vore", "victim-tail-slap", "victim-tail-vore", "victim-cock-slap", "victim-cock-vore", "victim-ball-smother", "victim-sheath-crush", "victim-sheath-absorb", "victim-foreskin-crush", "victim-foreskin-absorb", "victim-cum-flood", "victim-male-musk", "victim-male-spurt-musk", "victim-male-orgasm-musk", "victim-unbirth", "victim-femcum-flood", "victim-female-musk", "victim-female-spurt-musk", "victim-female-orgasm-musk", "victim-breast-crush", "victim-cleavage-crush", "victim-cleavage-absorb", "victim-cleavage-drop", "victim-milk-flood", "victim-breast-vore", "victim-pouch-absorb", "victim-soul-digest", "victim-soul-paw", "victim-paw-stench", "victim-ass-stench", "victim-gas-belch", "victim-gas-fart", "victim-piss", "victim-bladder-vore", "victim-piss-stench", "victim-scat", "victim-scat-stench", "victim-goo", "victim-paw-vore", "victim-breath-fire", "victim-breath-ice", "victim-breath-electric", "victim-breath-smoke", "victim-breath-radiation", "victim-breath-foul", "victim-wings-flap", "victim-wings-vore"]

for (let i = 0; i < action_keys.length; i++) {
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

  for (var i = 0; i < things.length; i++) {
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
      if (things[key].area > things[thing].area)
        return false;

  return true;
}

function describe(action, container, macro, verbose = true, flat = false, extra1 = 0) {
  var options = [];

  for (var i = 0; i < rules[action].length; i++) {
    if (rules[action][i].test(container, macro, extra1)) {
      options.push(rules[action][i].desc);
    }
  }

  if (flat) {
    container = flatten(container);
  }

  if (options.length > 0 && Math.random() > (1 / (2 + options.length))) {
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

function pickString(...array) {
  var strings = array;
  var pick = strings[~~(Math.random() * strings.length)];
  return pick;
}

function pickStringChance(chance, ...array) {
  if (Math.random() < chance) {
    return pickString(...array);
  } else {
    return ""
  }
}

// DEFAULTS

{
defaults["eat"] = function (container, macro, verbose, flat) {
  console.log(verbose);
  if (container.count == 0)
    return "You reach down for a delicious treat and grab - oh, nothing.";
  else
    return pickString([
      "You",
      pickString("snatch up", "grab", "pluck up", "seize", "catch"),
      container.describe(verbose) + ",",
      "then",
      pickString("swallow", "devour", "consume"),
      (container.count > 1 ? "them" : "it"),
      "whole."
    ], [
      "Your maw envelops",
      container.describe(verbose),
      "in a tight embrace of flesh.",
      (container.count > 1 ? "They sink" : "Your victim sinks"),
      "down deep with a little <i>gulp</i>."
    ]).join(" ");
}

defaults["chew"] = function (container, macro, verbose, flat) {
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

defaults["vomit"] = function (container, macro, verbose, flat) {
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

defaults["hand-crush"] = function (container, macro, verbose, flat) {
  if (isFatal(macro)) {
    return [
      "You grab",
      container.describe(false),
      "and, with a sharp squeeze, crush",
      (container.count > 1 ? "them" : "it") + "."
    ].join(" ");
  } else {
    return [
      "You grab",
      container.describe(false),
      "and, after giving",
      (container.count > 1 ? "them" : "it"),
      "a playful squeeze, set",
      (container.count > 1 ? "them" : "it"),
      "back down."
    ].join(" ");
  }
}

defaults["foot-crush"] = function (container, macro, verbose, flat) {
  if (isFatal(macro)) {
    return [
      "Your",
      macro.footDesc(false),
      "snatches up",
      container.describe(false) + ";",
      "you crush it",
      (container.count > 1 ? "them" : "it"),
      "in your",
      macro.toeDesc(true),
      "with ease."
    ].join(" ");
  } else {
    return [
      "Your",
      macro.footDesc(false),
      "snatches up",
      container.describe(false) + ".",
      "You give",
      (container.count > 1 ? "them" : "it"),
      "a friendly squeeze before dropping",
      (container.count > 1 ? "them" : "it"),
      "from your",
      macro.toeDesc(true) + "."
    ].join(" ");
  }

}

defaults["stomp"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.footDesc() + " thumps the ground.";
  else if (isSadistic(macro))
    return "Your " + macro.footDesc(false) + " comes down on " + container.describe(verbose) + ", crushing your prey into gore and rubble with ease as your " + macro.toeDesc(true) + " shear bone and snap metal.";
  else if (isFatal(macro))
    return pickString([
      "You",
      pickString("crush", "smash", "flatten"),
      container.describe(verbose),
      pickString("under", "beneath", "with"),
      "your",
      (macro.stenchEnabled ? pickString(...synonyms.putrid) + "," : ""),
      pickStringChance(0.4, ...synonyms.looming),
      macro.footDesc(false, false, true) + "."
    ], [
      capitalize(container.describe(verbose)),
      (container.count > 1 ? "are" : "is"),
      pickString("crushed", "flattened"),
      pickString("under", "beneath"),
      "your",
      (macro.stenchEnabled ? pickString(...synonyms.putrid) : pickString("heavy", "weighty", "powerful")),
      macro.footDesc(false, false, true) + "."
    ], [
      "A swift stroke of your",
      macro.footDesc(false, false, true),
      pickString("crushes", "smashes", "flattens"),
      container.describe(verbose)
    ]).filter(Boolean).join(" ");
  else
    return "You step on " + container.describe(verbose) + ".";
}

defaults["stomp-wedge"] = function (container, macro, verbose, flat) {
  return [
    capitalize(container.describe(verbose)),
    (container.count > 1 ? "are" : "is"),
    pickString("wedged", "trapped", "left stuck", "jammed"),
    pickString("in", "between", "within"),
    "your",
    (macro.stenchEnabled ? pickString(...synonyms.putrid) : ""),
    macro.toeDesc(true)
  ].filter(Boolean).join(" ")
}

defaults["flex-toes"] = function (container, macro, verbose, flat) {
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

defaults["kick"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You swing your mighty " + macro.footDesc() + "..and hit nothing.";
  else
    return "You punt " + container.describe(verbose) + ", destroying " + (container.count > 1 ? "them" : "it") + ".";
}

defaults["anal-vore"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You're pretty sure you just sat on a rock.";
  else
    return pickString([
      "You sit yourself down on",
      container.describe(false) + ". ",
      (container.count > 1 ? "They slide" : "It slides"),
      "inside with ease."
    ], [
      "You grab",
      container.describe(false) + ",",
      "shoving",
      (container.count > 1 ? "your victims" : "your victim"),
      "right up your rear with a muffled <i>shlrkh</i>."
    ]
    ).join(" ");

}

defaults["ass-crush"] = function (container, macro, verbose, flat) {
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

defaults["ass-grind"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You rub your ass on a wall.";
  } else {
    return "You grind your ass against " + container.describe(verbose) + ", flattening " + (container.count == 1 ? "it" : "them") + " under your weight.";
  }

}

defaults["tail-slap"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + (macro.tailCount > 1 ? "tails swing" : "tail swings") + " to and fro";
  else if (isFatal(macro))
    return "Your " + macro.describeTail + (macro.tailCount > 1 ? " tails swing" : " tail swings") + " into " + container.describe(verbose) + ", smashing everything in " +
      (macro.tailCount > 1 ? "their" : "its") + " path.";
  else
    return "Your " + macro.describeTail + (macro.tailCount > 1 ? " tails slap" : " tail slaps") + " against " + container.describe(verbose) + ", bowling them over.";
}

defaults["tail-vore"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your drooling tail lashes about, but can't seem to chow down on anyone...";
  else if (isFatal(macro))
    return "Your tail lunges, maw agape, at " + container.describe(verbose) +
      ". It scarfs down everything in seconds, gulping forcefully to drag your prey into your sloppy confines.";
  else
    return "Your tail lunges, maw agape, at " + container.describe(verbose) +
      ". It scarfs down everything in a second, gulping forcefully and pulling your prey inside.";
}

defaults["tails-vore"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your drooling tails swing to and fro";
  else if (isFatal(macro))
    return "Your $COUNT tails lunge, maws agape, at " + container.describe(verbose) +
      ". They scarf down everything in seconds, gulping forcefully to drag your prey into your sloppy confines.";
  else
    return "Your $COUNT tails lunge, maws agape, at " + container.describe(verbose) +
      ". They scarf down your prey, gulping forcefully and pulling them deep inside.";
}

defaults["cleavage-stuff"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You can't fit anything into your cleavage right now.";
  else
    return "You snatch up " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your cleavage.";
}

defaults["cleavage-crush"] = function (container, macro, verbose, flat) {
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

defaults["cleavage-drop"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You pull your breasts apart and give them a shake.";
  if (isFatal(macro))
    return "You pull your breasts apart far enough for the " + container.describeSimple(flat) + " trapped within to fall out, tumbling to the ground and smashing to bits.";
  else
    return "You pull your breasts apart far enough for the " + container.describeSimple(flat) + " trapped within to fall out.";
}

defaults["cleavage-absorb"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return defaultCleavageCrush(container, macro, verbose, flat);
  else
    return "Your squeeze your breasts together, swiftly absorbing " + container.describeSimple(flat) + " into your chest.";
}

defaults["breast-crush"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your let your breasts thump against the ground.";
  else if (isFatal(macro))
    return [
      "You let your breasts drop,",
      pickString("crushing", "smashing", "burying", "smothering"),
      container.describe(verbose),
      "beneath those",
      length(macro.breastDiameter, unit, true) + "-wide",
      pickString("knockers", "tits", "boobs") + ".",
      pickStringChance(0.5, (macro.lactationEnabled ? "A spray of milk spurts from your nipples." : ""))
    ].filter(Boolean).join(" ");
  else
    return "You smoosh " + container.describe(verbose) + " beneath your breasts.";
}

defaults["breast-vore"] = function (container, macro, verbose, flat) {
  let prey = new Container();
  macro.breasts.contents.forEach(function (x) {
    prey = prey.merge(x);
  });

  if (container.count == 0)
    return "It'd be pretty hot to stick someone in your breasts. Shame you can't right now.";
  else
    return pickString([
      "Your breasts squish against",
      container.describe(verbose),
      "as",
      (container.count > 1 ? "they're" : "it's"),
      "forced right into your nipples! They stretch and",
      pickString("envelop", "consume", "suck in"),
      "your prey,",
      pickStringChance(0.5, "swiftly", "easily"),
      "burying them in those warm,",
      (macro.lactationEnabled ? "milky" : "heavy"),
      "mounds."
    ], [
      capitalize(container.describe(verbose)),
      (container.count > 1 ? "are" : "is"),
      pickStringChance(0.35, "abruptly", "swiftly"),
      pickString("stuffed", "slipped"),
      "into your breasts",
      (container.count > 1 ? "their" : "its"),
      "form lost within your bosom.",
      (prey.count > 0 ? (prey.count > 1 ? "The " + prey.describe(false) : capitalize(prey.describe(true))) + " within " + (prey.count > 1 ? "slosh" : "sloshes") + " about as " + (prey.count > 1 ? "they're" : "it's") + " joined by fresh prey." : "")
    ]).filter(Boolean).join(" ")
}

defaults["breast-milk"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that splatters on the ground.";
  else if (isFatal(macro))
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that floods " + container.describe(verbose) + " in an unstoppable wave of white.";
  else
    return "You squeeze your breasts, coaxing out $VOLUME of warm, creamy milk that floods " + container.describe(verbose) + ".";
}

defaults["unbirth"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your slit...but they won't fit.";
  else {
    return pickString([
      "You",
      pickString(...synonyms.moan),
      "as",
      container.describe(verbose),
      (container.count > 1 ? "spread" : "spreads"),
      "open your",
      pickString("sex", macro.describeVagina + " slit") + ",",
      pickString("swallowed", "sucked", "drawn"),
      pickString("within", "inside", "down deep"),
      "by",
      pickString("tender", "sensuous", "lustful"),
      pickString("folds", "muscle") + "."
    ], [
      capitalize(container.describe(verbose)),
      "fall prey to your",
      pickString("sex", macro.describeVagina + " slit"),
      "with a messy",
      pickString("<i>SQUELCH</i>,", "<i>SQUISH</i>,"),
      "vanishing into your womb and sending a",
      pickString("jolt", "surge", "shock"),
      "of ecstasy up your spine."
    ]).filter(Boolean).join(" ");
  }

}

defaults["sheath-stuff"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab a " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your sheath-slit...but they won't fit.";
  else
    return "You pluck " + container.describe(verbose) + " from the ground and slip them into your musky sheath.";
}

defaults["foreskin-stuff"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab a " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your foreskin...but they won't fit.";
  else
    return "You pluck " + container.describe(verbose) + " from the ground and slip them into your musky foreskin.";
}

defaults["breast-toy"] = function (container, macro, verbose, flat) {
  if (container.count > 0) {
    return "You smush your breasts together, squeezing " + container.describeSimple(flat) + " between the heavy mounds.";
  } else {
    return "You smush your breasts together.";
  }
}

defaults["slit-toy"] = function (container, macro, verbose, flat) {
  if (container.count > 0) {
    return "You slip your fingers into your snatch, teasing yourself and pushing the " + container.describeSimple(flat) + " within a little deeper.";
  } else {
    return "Your slp your fingers into your snatch and tease yourself.";
  }
}

defaults["sheath-toy"] = function (container, macro, verbose, flat) {
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

defaults["sheath-clench"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your sheath.";
  else if (isGory(macro))
    return "You squeeze your packed sheath, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your throbbing shaft.";
  else if (isFatal(macro))
    return "Your fingers run over your packed sheath, squeezing on the " + macro.describeDick + " within and smashing " + container.describeSimple(flat);
  else
    return "Your squeeze your sheath, pushing " + container.describeSimple(flat) + " out of your sheath.";
}

defaults["sheath-crush"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your orgasm causes your " + macro.describeDick + " to swell and surge.";
  else if (isGory(macro))
    return "Your powerful orgasm causes your throbbing " + macro.describeDick + " to swell and crush the life from everything in your sheath, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your spurting shaft.";
  else if (isFatal(macro))
    return "Your orgasm causes your " + macro.describeDick + " to throb and swell, smashing " + container.describeSimple(flat) + " trapped in your musky sheath.";
  else
    return "Your orgasm causes your " + macro.describeDick + " to swell, squeezing " + container.describeSimple(flat) + " out from your sheath.";
}

defaults["sheath-absorb"] = function (container, macro, verbose, flat) {
  if (container.count > 0)
    return "You grip your sheath and give it a firm <i>squeeze</i>, abruptly absorbing " + container.describeSimple(flat) + " into your musky body.";
  else
    return defaultSheathToy(container, macro, verbose, flat);
}

defaults["foreskin-toy"] = function (container, macro, verbose, flat) {
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

defaults["foreskin-clench"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You squeeze your foreskin.";
  else if (isGory(macro))
    return "You squeeze your foreskin, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your throbbing shaft.";
  else if (isFatal(macro))
    return "Your fingers run over your packed foreskin, squeezing on the " + macro.describeDick + " within and smashing " + container.describeSimple(flat);
  else
    return "Your squeeze your foreskin, pushing " + container.describeSimple(flat) + " out of your foreskin.";
}

defaults["foreskin-crush"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your orgasm causes your " + macro.describeDick + " to swell and surge.";
  else if (isGory(macro))
    return "Your powerful orgasm causes your throbbing " + macro.describeDick + " to swell and crush the life from everything in your foreskin, reducing " + container.describeSimple(flat) + " to a gory paste that slickens your spurting shaft.";
  else if (isFatal(macro))
    return "Your orgasm causes your " + macro.describeDick + " to throb and swell, smashing " + container.describeSimple(flat) + " trapped in your musky foreskin.";
  else
    return "Your orgasm causes your " + macro.describeDick + " to swell, squeezing " + container.describeSimple(flat) + " out from your foreskin.";
}

defaults["foreskin-absorb"] = function (container, macro, verbose, flat) {
  if (container.count > 0)
    return "You grip your cock and give it a firm <i>squeeze</i>, abruptly absorbing " + container.describeSimple(flat) + " into your musky foreskin.";
  else
    return defaultForeskinToy(container, macro, verbose, flat);
}

defaults["cock-vore"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and grind them against your cock...but they won't fit.";
  else
    return "You stuff " + container.describe(verbose) + " into your throbbing shaft, forcing them down to your heavy balls.";
}

defaults["cockslap"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " swings through the air. Lewd!";
  else if (isFatal(macro))
    return "Your swaying " + macro.describeDick + " crushes " + container.describe(verbose) + ". ";
  else
    return "You smack " + container.describe(verbose) + " with your " + macro.describeDick + ".";
}

defaults["ball-smother"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You rest your heavy balls on the ground.";
  else if (isFatal(macro))
    return "Your weighty balls spread over " + container.describe(verbose) + ", drowning them in musk.";
  else
    return "Your weighty balls spread over " + container.describe(verbose) + ".";
}

defaults["male-spurt"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " spews $VOLUMEs of bitter precum.";
  else if (isFatal(macro))
    return "Your " + macro.describeDick + " spurts out bitter precum, drowning " + container.describe(verbose) + " in $VOLUMEs of slick musky fluid.";
  else
    return "Your " + macro.describeDick + " spurts precum, splooging " + container.describe(verbose) + " in $VOLUMEs of slick musky fluid.";
}

defaults["male-orgasm"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your " + macro.describeDick + " spurts, gushing out a $VOLUME glob of cum.";
  else if (isFatal(macro))
    return "You're cumming! Your " + macro.describeDick + " erupts, obliterating " + container.describe(verbose) + " in a $VOLUME-torrent of cum.";
  else
    return "You're cumming! Your " + macro.describeDick + " spews a thick rope of seed, splooging " + container.describe(verbose) + " in a $VOLUME-torrent of cum.";
}

defaults["female-spurt"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your moist slit splatters $VOLUME of slick juices.";
  else if (isSadistic(macro))
    return "Your dripping slit splatters $VOLUME of your intoxicating juices, dissolving " + container.describe(verbose) + ".";
  else if (isFatal(macro))
    return "Your moist slit splatters $VOLUME of slick juices, drowning " + container.describe(verbose) + " in your building lust.";
  else
    return "Your moist slit splatters $VOLUME of slick juices, splooging " + container.describe(verbose) + ".";
}

defaults["female-orgasm"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "Your moist slit gushes $VOLUME of slick femcum.";
  else if (isSadistic(macro))
    return "Your quivering slit sprays $VOLUME of your intoxicating femcum, dissolving " + container.describe(verbose) + " in an unstoppable torrent of deadly lust.";
  else if (isFatal(macro))
    return "Your moist slit sprays $VOLUME of slick femcum, obliterating " + container.describe(verbose) + " in a torrent of nectar.";
  else
    return "Your moist slit sprays $VOLUME of slick femcum, splooging " + container.describe(verbose) + " as you swoon with orgasmic lust.";
}

defaults["grind"] = function (container, macro, verbose, flat) {
  var mid = isFatal(macro) ? ", smashing them apart" : ", using them as a toy";
  var end = macro.arousalEnabled ? " to fuel your lust." : ".";
  var desc = container.count > 0 ? container.describe(verbose) + mid + end : "the ground.";
  if (macro.maleParts && macro.femaleParts) {
    return "You grind your " + macro.describeDick + "  and " + macro.describeVagina + " slit against " + desc;
  } else if (macro.maleParts && !macro.femaleParts) {
    return "You grind your " + macro.describeDick + "  against " + desc;
  } else if (!macro.maleParts && macro.femaleParts) {
    return "You grind your " + macro.describeVagina + " slit against " + desc;
  } else {
    return "You grind your hips against " + desc;
  }
}

defaults["pouch-stuff"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You grab " + (macro.victimsHuman ? new Human(1).describe(verbose) : new Person(1).describe(verbose)) + " and stuff them against your pouch...but they won't fit!";
  else
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your pouch.";
}

defaults["pouch-rub"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You rub your empty pouch.";
  else
    return "You rub your bulging pouch, feeling at " + container.describeSimple(flat) + " trapped within.";
}

defaults["pouch-eat"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "There's nothing in your pouch!";
  else
    return "You snatch " + container.describe(verbose) + " from your pouch and shove " + (container.count > 1 ? "them" : "it") + " down your gullet!";
}

defaults["pouch-absorb"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "There's nothing in your pouch!";
  else
    return "Your pouch flattens as it absorbs " + container.describeSimple(flat);
}

defaults["soul-vore"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "No souls here.";
  else
    return "You open your " + macro.jawDesc(true) + " and inhale, ripping the souls from " + container.describe(verbose) + " and dragging them down deep inside.";
}

defaults["soul-absorb-paw"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (container.count == 0)
    return "Your " + macro.footDesc() + " thumps against the ground";
  else if (sum == 0)
    return "Your " + macro.footDesc() + " slams down on " + container.describe(verbose) + "...but there aren't any souls within!";
  else
    return "Your " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing them to pieces and absorbing " + sum + (sum == 1 ? " soul" : " souls") + " into your pads.";
}

defaults["paw-stench"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Horrific miasma flows from your " + macro.footDesc(true) + ", the corrosive fumes reducing " + (sum > 1 ? sum + " people" : "a person") + " to charred flesh as they wash over " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your " + macro.footDesc(true) + " , choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky " + macro.footDesc(true) + " overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["ass-stench"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Rancid fumes from your ass sear the flesh of " + (sum > 1 ? sum + " people" : "a person") + " as they wash over " + container.describeSimple(flat) + ", corroding everything in their path.";
  if (isFatal(macro))
    return "Vile miasma from your bitter ass snuffs out " + (sum > 1 ? sum + " people" : "a person") + ", suffocating them in your stench.";
  else
    return "Your stinky butt sickens " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["piss-stench"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive fumes waft from your piss, the toxic cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your piss, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky piss overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["scat-stench"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "A rancid miasma spews from your shit - a thick, choking avalanche of toxic vapors that reduce " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " to nothing but bones as it melts " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Vile fumes waft from your scat, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your stinky scat overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["male-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your shaft, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your shaft, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your masculine musk overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["female-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your slit, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your slit, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your feminine musk overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["male-spurt-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your precum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your precum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky precum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["female-spurt-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your precum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your precum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky precum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["male-orgasm-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your cum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your cum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky cum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["female-orgasm-musk"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (isSadistic(macro))
    return "Waves of corrosive musk waft from your cum, the bitter cloud liquefying the flesh of  " + (sum > 1 ? numberRough(sum, "of") + " people" : "a person") + " as it dissolves " + container.describeSimple(flat) + ".";
  if (isFatal(macro))
    return "Powerful musk wafts from your cum, choking the life from " + (sum > 1 ? sum + " people." : "a person.");
  else
    return "Your musky cum overwhelms " + (sum > 1 ? sum + " people" : "a person") + " with your scent!";
}

defaults["belch"] = function (container, macro, verbose, flat) {
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

defaults["fart"] = function (container, macro, verbose, flat) {
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

defaults["stomach"] = function (container, macro, verbose, flat) {
  if (isSadistic(macro))
    return [
      "Your",
      pickString("churning gut", "graveyard of a stomach", "fatal belly"),
      pickString("crushes", "grinds", "mulches"),
      "your prey into a gory paste,",
      pickStringChance(0.5, "utterly", "completely"),
      "annihilating",
      container.describeSimple(flat),
      "and",
      pickStringChance(0.5, "swiftly"),
      "reducing everything within to",
      pickString("rancid", "putrid", "horrifying"),
      pickString("sludge.", "slop.")
    ].filter(Boolean).join(" ");
  else if (isGory(macro))
    return [
      "Your caustic stomach",
      pickString("crushes", "grinds"),
      container.describeSimple(flat),
      "to a gory pulp."
    ].filter(Boolean).join(" ");
  else if (isFatal(macro))
    return [
      "Your stomach",
      pickString("gurgles", "snarls", "sloshes"),
      "as it digests",
      container.describeSimple(flat) + "."
    ].filter(Boolean).join(" ");
  else
    return [
      "Your stomach",
      pickString("squeezes", "groans", "shifts"),
      "and absorbs",
      container.describeSimple(flat) + "."
    ].filter(Boolean).join(" ");
}

defaults["tail"] = function (container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your " + macro.tailDesc + " " + (macro.tailCount > 1 ? "clench" : "clenches") + ", crushing " + container.describeSimple(flat) + " into unrecognizable paste.";
  else if (isGory(macro))
    return "Your fatal " + (macro.tailCount > 1 ? "tails crush " : "tail crushes ") + container.describeSimple(flat) + " to a gory pulp.";
  else if (isFatal(macro))
    return "Your " + (macro.tailCount > 1 ? "tails gurgles as they digest " : "tail gurgles as it digests ") + container.describeSimple(flat) + ".";
  else
    return "Your " + (macro.tailCount > 1 ? "tails groan and absorb " : "tail groans and absorbs ") + container.describeSimple(flat) + ".";
}

defaults["tail-to-stomach"] = function (container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your " + (macro.tailCount > 1 ? "tails clench" : "tail clenches") + ", squeezing " + container.describeSimple(flat) + " into your gurgling stomach.";
  else
    return "Your " + (macro.tailCount > 1 ? "tails squeeze" : "tail squeezes") + " " + container.describeSimple(flat) + " into your belly.";
}

defaults["bowels"] = function (container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your rancid bowels clench and churn, crushing " + container.describeSimple(flat) + " into a paste of gore and rubble - and then swiftly absorbing everything.";
  if (isFatal(macro))
    return "Your bowels churn as they melt down " + container.describeSimple(flat) + " and absorb them into your body";
  else
    return "Your bowels churn as they absorb " + container.describeSimple(flat);
}

defaults["bowels-to-stomach"] = function (container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your bowels clench, forcing " + container.describeSimple(flat) + " into your roiling, caustic stomach.";
  else
    return "Your bowels clench, squeezing " + container.describeSimple(flat) + " into your belly.";
}

defaults["womb"] = function (container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your womb squeezes and dissolves " + container.describeSimple(flat) + ", turning them into $VOLUME of slick femcum.";
  else
    return "Your womb squeezes as it absorbs " + container.describeSimple(flat);
}

defaults["balls"] = function (container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your balls slosh as they digest " + container.describeSimple(flat) + " into $VOLUME of cum";
  else
    return "Your balls slosh as they absorb " + container.describeSimple(flat);
}

defaults["breasts"] = function (container, macro, verbose, flat) {
  if (isFatal(macro) && macro.lactationEnabled)
    return "Your breasts grrgle as they digest " + container.describeSimple(flat) + " into $VOLUME of milk";
  else
    return "Your breasts slosh as they absorb " + container.describeSimple(flat);
}

defaults["bladder"] = function (container, macro, verbose, flat) {
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

defaults["soul-digest"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  switch (macro.soulVoreType) {
    case "release":
      return (sum > 1 ? sum + " souls escape" : "A soul escapes") + " your depths.";
    case "body":
      return "Your body claims " + (sum > 1 ? sum + " souls" : "a soul") + ", imprisoning " + (sum > 1 ? "them" : "it") + " in your body for good.";
    case "oblivion":
      return "Energy washes through your depths as you annihilate " + (sum > 1 ? sum + " souls" : "a soul") + ", crushing " + (sum > 1 ? "them" : "it") + " into nothingness.";
  }
}

defaults["wings"] = function (container, macro, verbose, flat) {
  if (isSadistic(macro))
    return "Your " + macro.wingDesc + " wings slacken as the " + container.describeSimple(flat) + " within melts into a slurry of meat and wreckage.";
  if (isFatal(macro))
    return "Your " + macro.wingDesc + " wings squeeze tightly as they absorb " + container.describeSimple(flat) + " into your body";
  else
    return "Your " + macro.wingDesc + " wings squeeze as they absorb " + container.describeSimple(flat);
}

defaults["wings-to-stomach"] = function (container, macro, verbose, flat) {
  if (isFatal(macro))
    return "Your " + macro.wingDesc + " wings clench, forcing " + container.describeSimple(flat) + " deeper and into your stomach.";
  else
    return "Your " + macro.wingDesc + " wings squeeze " + container.describeSimple(flat) + " into your belly.";
}

defaults["wear-shoe"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You slip on your " + macro.shoeDesc(true, false) + ".";
  } else {
    return "You slip on your " + macro.shoeDesc(true, false) + ", " + macro.toeDesc(true) + " wriggling against " + container.describeSimple(flat) + " trapped within!";
  }
}

defaults["remove-shoe"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You pull off your " + macro.shoeDesc(true, false) + ".";
  } else {
    return "You pull off your " + macro.shoeDesc(true, false) + ", " + macro.toeDesc(true) + " rubbing against " + container.describeSimple(flat) + " on the way out.";
  }
}

defaults["wear-sock"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You slip on your " + macro.sockDesc(true, false) + ".";
  } else {
    return "You slip on your " + macro.sockDesc(true, false) + ", " + macro.toeDesc(true) + " grinding against " + container.describeSimple(flat) + " trapped in the cotton tube!";
  }
}

defaults["remove-sock"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You pull off your " + macro.sockDesc(true, false) + ". Cool air washes over your " + macro.toeOnlyDesc(true);
  } else {
    return "You pull off your " + macro.sockDesc(true, false) + ", leaving " + container.describeSimple(flat) + " trapped at the bottom.";
  }
}

defaults["stuff-shoe"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.shoeDesc(true) + ".";
  } else {
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your " + macro.shoeDesc(true) + "!";
  }
}

defaults["stuff-sock"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.sockDesc(true) + ".";
  } else {
    return "You grab " + container.describe(verbose) + " and stuff " + (container.count > 1 ? "them" : "it") + " into your " + macro.sockDesc(true) + "!";
  }
}

defaults["dump-shoe"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your " + macro.shoeDesc(true) + " are empty, silly.";
  } else {
    return "You shake out your " + macro.shoeDesc(true) + ", dumping " + container.describeSimple(flat) + " onto the ground.";
  }
}

defaults["dump-sock"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "You don't have anything to stuff into your " + macro.sockDesc(true) + ".";
  } else {
    return "You turn your " + macro.shoeDesc(true) + " inside-out, dumping " + container.describeSimple(flat) + " onto the ground.";
  }
}

defaults["piss"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return [
      "You sigh with relief as",
      "$VOLUME",
      "of piss erupts from",
      macro.maleParts ? "your " + macro.describeDick + "." : "between your legs."
    ].filter(Boolean).join(" ")
  }
  else if (isSadistic(macro)) {
    return [
      "You sigh with relief as",
      "$VOLUME",
      "of hot,",
      pickString("rancid", "steaming", "fuming"),
      "piss erupts from",
      macro.maleParts ? "your " + macro.describeDick + "," : "between your legs,",
      "inundating",
      container.describe(verbose),
      "and melting",
      (container.count > 1 ? "them" : "it"),
      "them down to a boiling",
      pickString("slurry of molten prey", "stew", "heap of charred slag"),
      pickString("in mere seconds", "with terrifying speed", "like " + (container.count > 1 ? "they were" : "it was") + " tissue paper")
    ].filter(Boolean).join(" ")
  }
  else {
    return [
      "You sigh with relief as",
      "$VOLUME",
      "of piss erupts from",
      macro.maleParts ? "your " + macro.describeDick + "," : "between your legs,",
      "spraying down",
      container.describe(verbose),
      "in a shower of golden, musky fluid."
    ].filter(Boolean).join(" ")
  }
}

defaults["bladder-vore"] = function (container, macro, verbose, flat) {
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

defaults["scat"] = function (container, macro, verbose, flat) {
  let sum = get_living_prey(container.sum());
  if (macro.scatStorage.amount == 0) {
    return "Your bowels are empty.";
  } else if (container.count == 0) {
    return "You squat down and let out a $MASS log of shit.";
  } else if (isSadistic(macro)) {
    let line = "You squat down, letting out a grunt as your rancid bowels force out a $MASS, $LENGTH-long heap of shit. The fatally-pungent scat buries " + container.describe(verbose) + ", ending " + numberRough(sum, "of") + (sum > 1 ? " lives" : " life") + " and entombing them in your shit.";
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

defaults["melt"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your body turns gooey.";
  } else {
    return "Your body turns gooey, sucking " + container.describeSimple(flat) + " into your molten self.";
  }

}

defaults["solidify"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your body turns solid.";
  } else if (macro.gooDigest > 0) {
    return "Your body turns solid, pushing out " + container.describeSimple(flat) + ".";
  } else {
    return "Your body turns solid, swiftly absorbing " + container.describeSimple(flat) + ".";
  }
}

defaults["flood"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey body melts and floods outward..but doesn't catch anything.";
  } else {
    return "Your gooey body melts and floods outward, burying " + container.describe(verbose) + " in your thick, slimy self. You slowly reform, grinning as you feel " + numberRough(get_living_prey(container.sum()), "of") + " prey sloshing about within.";
  }
}

defaults["stomp-goo"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey paw hits the ground.";
  } else {
    return "Your gooey paws falls over " + container.describe(verbose) + ", smothering them in goo and pulling them into your body.";
  }
}

defaults["ass-goo"] = function (container, macro, verbose, flat) {
  if (container.count == 0) {
    return "Your gooey ass sits down on the ground.";
  } else {
    return "You sit your gooey ass down on " + container.describe(verbose) + ", pulling them right into your body.";
  }
}

defaults["goo-digest"] = function (container, macro, verbose, flat) {
  return "Your goopy depths dissolve " + container.describeSimple(flat) + ".";
}

defaults["goo-stomach-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your stomach, drawing them into the viscous goo.";
}

defaults["goo-stomach-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your gurgling stomach.";
}

defaults["goo-bowels-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your bowels, drawing them into the viscous goo.";
}

defaults["goo-bowels-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your clenching bowels.";
}

defaults["goo-womb-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your womb, drawing them into the viscous goo.";
}

defaults["goo-womb-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your slick womb.";
}

defaults["goo-balls-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your balls, drawing them into the viscous goo.";
}

defaults["goo-balls-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your musky balls.";
}

defaults["goo-breasts-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your breasts, drawing them into the viscous goo.";
}

defaults["goo-breasts-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your breasts.";
}

defaults["goo-tail-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your " + macro.tailDesc + ", drawing them into the viscous goo.";
}

defaults["goo-tail-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your " + macro.tailDesc;
}

defaults["goo-paws-pull"] = function (container, macro, verbose, flat) {
  return "Your molten depths squeeze in around the " + container.describeSimple(flat) + " imprisoned in your " + macro.footOnlyDesc(true) + ", drawing them into the viscous goo.";
}

defaults["goo-paws-push"] = function (container, macro, verobse) {
  return "Your churning goo herds " + container.describeSimple(flat) + " into your " + macro.footOnlyDesc(true) + ".";
}

defaults["paw-vore"] = function (container, macro, verbose, flat) {
  return "Your " + macro.footOnlyDesc(true) + " smother over " + container.describeSimple(flat) + ", absorbing them into your soles!";
}

defaults["paw-vore-toes"] = function (container, macro, verbose, flat) {
  return "The " + container.describeSimple(flat) + " trapped between your toes " + (container.count > 1 ? "are" : "is") + " sucked inside.";
}

defaults["paws"] = function (container, macro, verbose, flat) {
  return "Your " + macro.footOnlyDesc(true) + " fully absorb " + container.describeSimple(flat) + ".";
}

defaults["crop-swallow"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "You reach down for a delicious treat and grab - oh, nothing.";
  else
    return "You scoop up " + container.describe(verbose) + " and swallow " + (container.count > 1 ? "them" : "it") + " whole, pulling your prey into your crop.";
}

defaults["crop-transfer"] = function (container, macro, verbose, flat) {
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

defaults["breath-fire"] = function (container, macro, verbose, flat) {
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
defaults["breath-ice"] = function (container, macro, verbose, flat) {
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

defaults["breath-electric"] = function (container, macro, verbose, flat) {
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

defaults["breath-smoke"] = function (container, macro, verbose, flat) {
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

defaults["breath-radiation"] = function (container, macro, verbose, flat) {
  if (isNonFatal(macro)) {
    return nonFatalBreath(container, macro, verbose, flat, "radiation", "frying");
  }

  if (isFatal(macro)) {
    if (macro.breathStyle == "line") {
      return "Your depths pour out a narrow beam of crackling green energy, striking " + container.describe(verbose) + " and frying it to a crisp, turning your prey to dust in the wind.";
    } else if (macro.breathStyle == "cone") {
      return "You part your " + macro.jawDesc(true) + ", roaring as a massive tide of radiation spews forth. It rolls over " + container.describe(verbose) + ", evaporating " + (container.count > 1 ? "them" : "it") + " in seconds.";
    }
  }

  return "RADIATION" + container.describe(verbose);
}

defaults["breath-foul"] = function (container, macro, verbose, flat) {
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

defaults["drool"] = function (container, macro, verbose, flat) {
  if (container.count == 0)
    return "$VOLUME of hot drool oozes from your " + macro.jawDesc(true) + ".";
  else if (isFatal(macro))
    return "A rain of slobber falls from your maw, inundating " + container.describe(verbose) + " in $VOLUME of slimy drool.";
  else
    return "$VOLUME of your drool rains down from your " + macro.jawDesc(true) + ", washing over " + container.describe(verbose) + ".";
}

defaults["magic-shrink"] = function (container, macro, verbose, flat) {
  return "You envelop " + container.describeSimple(flat) + " in swirling tendrils of magic, shrinking " + (container.count == 1 ? "it" : "them") + " down!";
}

defaults["wings-flap"] = function (container, macro, verbose, flat) {
  if (container.counter == 0) {
    return "You flap your " + macro.wingDesc + " wings.";
  } else {
    return "You flap your " + macro.wingDesc + " wings, blowing away " + container.describe(verbose) + ".";
  }
}

defaults["wings-vore"] = function (container, macro, verbose, flat) {
  if (container.counter == 0) {
    return "You flap your " + macro.wingDesc + " wings aggressively.";
  } else {
    return "You spread your " + macro.wingDesc + " wings wide, wrapping them around " + container.describe(verbose) + " and ensnaring them";
  }

}

defaults["victim-cum-flood"] = function (macro) {
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

defaults["victim-femcum-flood"] = function (macro) {
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

defaults["victim-stomped"] = function (macro) {
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

defaults["victim-flex-toes"] = function (macro) {
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

defaults["victim-eaten"] = function (macro) {
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

defaults["victim-ass-crush"] = function (macro) {
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

defaults["victim-ass-ground"] = function (macro) {
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

defaults["victim-humped"] = function (macro) {
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

defaults["victim-vomit"] = function (macro) {
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

defaults["victim-chew"] = function (macro) {
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

defaults["victim-drool"] = function (macro) {
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

defaults["victim-anal-vore"] = function (macro) {
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

defaults["victim-tail-slap"] = function (macro) {
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

defaults["victim-tail-vore"] = function (macro) {
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

defaults["victim-cock-slap"] = function (macro) {
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

defaults["victim-cock-vore"] = function (macro) {
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

defaults["victim-ball-smother"] = function (macro) {
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

defaults["victim-sheath-crush"] = function (macro) {
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

defaults["victim-sheath-absorb"] = function (macro) {
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

defaults["victim-foreskin-crush"] = function (macro) {
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

defaults["victim-foreskin-absorb"] = function (macro) {
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

defaults["victim-male-musk"] = function (macro) {
  if (isSadistic(macro)) {
    return "reduced to slurry by corrosive masculine musk";
  } else if (isGory(macro)) {
    return "suffocated by masculine musk";
  } else if (isFatal(macro)) {
    return "snuffed out by masculine musk";
  } else if (isNonFatal(macro)) {
    return "dazed by masculine musk";
  }
}

defaults["victim-male-spurt-musk"] = function (macro) {
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

defaults["victim-male-orgasm-musk"] = function (macro) {
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

defaults["victim-unbirth"] = function (macro) {
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

defaults["victim-female-musk"] = function (macro) {
  if (isSadistic(macro)) {
    return "dissolved to slurry by feminine musk";
  } else if (isGory(macro)) {
    return "suffocated by feminine musk";
  } else if (isFatal(macro)) {
    return "snuffed out by feminine musk";
  } else if (isNonFatal(macro)) {
    return "dazed by feminine musk";
  }
}

defaults["victim-female-spurt-musk"] = function (macro) {
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

defaults["victim-female-orgasm-musk"] = function (macro) {
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

defaults["victim-breast-crush"] = function (macro) {
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

defaults["victim-cleavage-crush"] = function (macro) {
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

defaults["victim-cleavage-absorb"] = function (macro) {
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

defaults["victim-cleavage-drop"] = function (macro) {
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

defaults["victim-milk-flood"] = function (macro) {
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

defaults["victim-breast-vore"] = function (macro) {
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

defaults["victim-pouch-absorb"] = function (macro) {
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

defaults["victim-soul-digest"] = function (macro) {
  switch (macro.soulVoreType) {
    case "release":
      return "souls freed from your depths";
    case "body":
      return "souls imprisoned in your body for good";
    case "oblivion":
      return "souls annihilated for eternity";
  }
}

defaults["victim-soul-paw"] = function (macro) {
  switch (macro.soulVoreType) {
    case "release":
      return "souls briefly trapped in your paws";
    case "body":
      return "souls claimed forever by your paws";
    case "oblivion":
      return "souls annihilated in your paws";
  }
}

defaults["victim-paw-stench"] = function (macro) {
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

defaults["victim-ass-stench"] = function (macro) {
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

defaults["victim-gas-belch"] = function (macro) {
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

defaults["victim-gas-fart"] = function (macro) {
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

defaults["victim-piss"] = function (macro) {
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

defaults["victim-bladder-vore"] = function (macro) {
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

defaults["victim-piss-stench"] = function (macro) {
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

defaults["victim-scat"] = function (macro) {
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

defaults["victim-scat-stench"] = function (macro) {
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

defaults["victim-goo"] = function (macro) {
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

defaults["victim-paw-vore"] = function (macro) {
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

defaults["victim-breath-fire"] = function (macro) {
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

defaults["victim-breath-ice"] = function (macro) {
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

defaults["victim-breath-electric"] = function (macro) {
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

defaults["victim-breath-smoke"] = function (macro) {
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

defaults["victim-breath-radiation"] = function (macro) {
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

defaults["victim-breath-foul"] = function (macro) {
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

defaults["victim-wings-flap"] = function (macro) {
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

defaults["victim-wings-vore"] = function (macro) {
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
}

// eat

{
rules["eat"].push({
  "test": function (container, macro) {
    return hasNothing(container);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You scoop up...nothing. Oh well.";
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasLessThan(container, "Person", 6) &&
      macro.height >= 10;
  },
  "desc": function (container, macro, verbose, flat) {
    return "You pluck up " + container.describe() + " and stuff them into your mouth, swallowing lightly to drag them down to your bubbling guts.";
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      macro.height < 10;
  },
  "desc": function (container, macro, verbose, flat) {
    return "You grasp " + container.describe() + " and greedily wolf them down, swallowing forcefully to cram them into your bulging stomach. A crass belch escapes your lips as they curl up in your slimy gut.";
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Car", 1);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You crush " + container.describe(verbose) + " with your tight throat, washing it down with its former passengers."
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Macro", 1) &&
      nothingLarger(container, "Macro");
  },
  "desc": function (container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + " and decide it will make a suitable meal. You grab them and stuff them into your " + macro.jawDesc(true) + ". As you slurp\
       them down, you feel them " + pickString("catch in your throat for a brief moment before being swallowed.", "grab at your tounge for purchase before going down your throat.", "briefly struggle, then go limp.", "pound on the inside of your throat.");
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Small Skyscraper", 1) &&
      nothingLarger(container, "Small Skyscraper") &&
      macro.height < 500;
  },
  "desc": function (container, macro, verbose, flat) {
    return "You drop onto your hands and knees, " + macro.jawDesc(true) + " opening wide to envelop the skyscraper. It glides into your throat as your snout touches the ground,\
    and you suckle on it for a long moment before twisting your head to snap it loose. The entire building, along with " + describe_all(container.contents["Small Skyscraper"].contents, verbose) + "\
    within, plunge into your roiling guts. You wash it down with some delicious treats you slurped up along with it - " + describe_all(container.contents, verbose, ["Small Skyscraper"]) + ".";
  }
});

rules["eat"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Small Skyscraper", 2) &&
      nothingLarger(container, "Small Skyscraper") &&
      macro.height < 750;
  },
  "desc": function (container, macro, verbose, flat) {
    return "You drop onto your hands and knees, " + macro.jawDesc(true) + "  opening wide to envelop the skyscraper. It glides into your throat as your snout touches the ground,\
    and you suckle on it for a long moment before twisting your head to snap it loose. Without missing a beat, you rise back up, sloppy tongue slathering over the side \
    of the remaining tower, sucking on its tip and roughly shoving it into your maw. It breaks from its foundation, vanishing past your lips as you use two fingers to shove it \
    down your sultry throat. Your gut bubbles as " + describe_all(container.contents["Small Skyscraper"].contents, verbose) + " are crunched and crushed within, along with the \
    " + describe_all(container.contents, verbose, ["Small Skyscraper"]) + " that were unfortunate enough to be caught up by your slimy tongue.";
  }
});

rules["eat"].push({
  test: (container, macro) => {
    return hasExactly(container, "Planet", 1) && nothingLarger(container, "Planet");
  },
  desc: (container, macro, verbose, flat) => {
    return [
      "Your colossal",
      macro.jawDesc(true),
      "yawn wide as you drift towards the planet, blotting out the sun in the shadow of your terrifying maw. Your tongue curls along the underside of your snack's crust, slathering it in drool and gently tugging it towards you. Cracks and quakes rock the fragile crust; your body's overwhelming gravity alone is enough to stretch and warp the planet. Before long, it is entombed within your",
      macro.jawDesc(true),
      "and, a heartbeat later, a massive GLURKH drags it into your gullet."
    ].join(" ")
  }
})

rules["eat"].push({
  test: (container, macro) => hasAtleast(container, "Planet", 3) && hasLessThan(container, "Planet", 15) && nothingLarger(container, "Planet"),
  desc: (container, macro, verbose, flat) => [
    "You scoop up a plethora of planets, popping them into your",
    macro.jawDesc(true),
    "like the finger-food they've become, tugging each one into your gullet - and on an irreversible one-way journey to your gut - with little gluks and gulps, sealing away all",
    container.contents["Planet"].count,
    "of them within your cosmic body."
  ].join(" ")
});
}

// chew

{
rules["chew"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isGory(macro) &&
      macro.height < 5;
  }, "desc": function (container, macro, verbose, flat) {
    return "You tackle " + container.describe(verbose) + " and dig into your meal, powerful " + macro.jawDesc(true) + "  ripping them to shreds in seconds. You wolf down great mouthfuls \
    of meat, consuming them in a terrifying frenzy that ends with naught but bones lying on the ground.";
  }
});

rules["chew"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isGory(macro) &&
      macro.height >= 5;
  }, "desc": function (container, macro, verbose, flat) {
    return "You snatch up " + container.describe(verbose) + ", then stuff their lower body into the guillotine that is your ravenous maw - slicing off their legs with \
    a single disgusting <i>crunch</i>, then finishing them off with another ravenous bite that obliterates their torso. Their bleeding head falls from your lips, only to be \
    caught between two fingers and popped back in to be crunched between molars and swallowed.";
  }
});

rules["chew"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Car", 1);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You lean down and open your " + macro.jawDesc(true) + " wide, catching " + container.describe(verbose) + ". Holding onto the car with only your " + macro.teethDesc(true) + ", you tilt your head back, opening wider \
    to let the vehicle fall further your mouth, Once the car settles, you start slowly closing your jaw, feeling glass shatter, metal grind, and tires burst as those trapped inside try to escape. Every time your chew you feel your \
    " + macro.teethDesc(true) + " " + macro.biteDesc(false) + " the vehicle into a smaller and smaller lump. After you are satisfied, you tilt your head back and swallow the debries in a single fluid gulp.";
  }
});

rules["chew"].push({
  test: (container, macro) => hasExactly(container, "Planet", 1) && nothingLarger(container, "Planet") && isFatal(macro),
  desc: (container, macro, verbose, flat) => [
    "A shadow falls over your next meal - your ",
    macro.jawDesc(true),
    "closing around the rocky sphere like bolt cutters around a chain-link...and then, with a sharp clench, they split the planet in twain. The heat of the planet's core spills out, the homeworld of billions rent asunder by your almighty",
    macro.jawDesc(true) + ".",
    "A few more chews and crunches reduce it to chunky, glowing rubble...and with a flick of your head, the planet's remains are lost to your hunger."
  ].join(" ")
});
}

// stomp

{
rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + macro.footDesc() + " thumps " + container.describe(verbose) + ", shoving your victim to the ground and cracking them open like an egg.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your shadow falls over " + container.describe(verbose) + ", and your " + macro.footDesc() + " follows, crushing their soft body and reducing them to a heap of broken gore.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasNothingElse(container, ["Person", "Cow", "Car"]) &&
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + macro.footDesc() + " smooshes over " + container.describe(verbose) + ". They stick to your " + macro.toeDesc(true) + ", carried along for the ride as you take another few steps before finally\
    falling off.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Bus"]) &&
      hasExactly(container, "Bus", 1) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your heavy " + macro.footDesc() + " slams down on " + container.describe(verbose) + ", smashing the poor thing like an insect.";
  }
});


rules["stomp"].push({
  "test": function (container, macro) {
    return hasOnly(container, ["Person", "Car", "Bus"]) &&
      hasExactly(container, "Bus", 1) &&
      hasLessThan(container, "Car", 10);
  }, "desc": function (container, macro, verbose, flat) {
    return "You punt a " + container.contents["Bus"].describe(verbose) + ", sending it tumbling down the road into a " + describe_all(container.contents, verbose, flat, ["Bus"]);
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Parking Garage", 1) &&
      nothingLarger(container, "Parking Garage");
  }, "desc": function (container, macro, verbose, flat) {
    return (pickString("You bring your " + macro.footDesc() + " down on ", "You kick your " + macro.footDesc() + " through ")) + container.describe(verbose) + ", collapsing the structure and setting off car alarms. As the alarms blare, you reposition your " + macro.footDesc() +
      " over the structure, and slam it down; silencing the alarms, and completely demolishing the building.";
  }
});

//paw area between 5 and 50

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 50 &&
      macro.pawArea > 5 &&
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 50 &&
      macro.pawArea > 5 &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it. \
     Your " + macro.footDesc() + "print is filled with rubble and those unluckly enough to be in your path.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 50 &&
      macro.pawArea > 5 &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with the ground, you feel a shock travel up your powerful leg, and see the ground deform beneath it. \
     Your " + macro.footDesc() + "print is filled with rubble and the mangled corpses of those unluckly enough to be in your path.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 50 &&
      macro.pawArea > 5 &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You slowly bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " makes contact with your prey, you feel those beneath you struggle to overcome \
    the weight bearing down on them, before being completely crushed. You shift a little more of your weight on your outstretched " + macro.footDesc() + " and see blood spray from between your " + macro.toeDesc(true) + ". Lifting your " + macro.footDesc() + " off the \
    ground to examine your " + macro.footDesc() + "print, you see that it is filled with blood, debris, and the mangled corpses of those unluckly enough to be in your path.";
  }
});

//Stomping Macro

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Macro", 1) &&
      nothingLarger(container, "Macro") &&
      isNonFatal(macro);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power", " and decide it will will be suitable prey.", " and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame, which sends it into the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its back, and slam the \
    smaller macro back into the dirt.";
  }
});


rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Macro", 1) &&
      nothingLarger(container, "Macro") &&
      isFatal(macro);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power", " and decide it will will be suitable prey.", " and decide to show it what being a macro really means.") + "\
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame, which sends it into the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its back, and slam the \
    smaller macro into the dirt where it perishes.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Macro", 1) &&
      nothingLarger(container, "Macro") &&
      isGory(macro);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power", " and decide it will will be suitable prey.", " and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame; cracking bones and dashing it against the side of a nearby building. As it attempts to pick itself up, you place your massive " + macro.footDesc() + " on its \
    back, and slam the smaller macro into the dirt. Shifting your weight forward, you feel it struggle beneath your " + macro.toeDesc(true) + " and watch as blood soaks into the ground.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Macro", 1) &&
      nothingLarger(container, "Macro") &&
      isSadistic(macro);
  },
  "desc": function (container, macro, verbose, flat) {
    return "You spot a smaller macro " + pickString("staring up at you in awe", "terrorizing the area", "running from you", "that is unaware of your presence") + pickString(" and decide to show it real power", " and decide it will will be suitable prey.", " and decide to show it what being a macro really means.") + " \
    You slam your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " into it's comparatively tiny frame; cracking bones and dashing it against the side of a nearby building. As it attempts to drag itself away, you place your massive " + macro.footDesc() + " \
    on its back, and slam the smaller macro into the dirt. Shifting your weight forward, you feel it struggle beneath your " + macro.toeDesc(true) + " and watch as blood soaks into the ground. You hold your stance as you feel it's struggles weaken and fade away. Just as it seems it \
    can struggle no more, you place your entire weight  of " + mass(macro.mass, unit) + " on it, and pop it's " + mass(80000, unit, true) + " body like a grape.";
  }
});

//paw area over 1000

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1000 &&
      macro.pawArea > 50 &&
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink into the ground. After you lift \
     your " + macro.soleDesc() + ", you notice it has left a deep, clear indent in the ground.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1000 &&
      macro.pawArea > 50 &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink into the ground. After you lift \
     your " + macro.soleDesc() + ", a deep indent full of rubble is revealed.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1000 &&
      macro.pawArea > 50 &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink through buildings and into the \
     ground. After you lift your " + macro.soleDesc() + ", a deep indent full of rubble and mangled corpses is revealed.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1000 &&
      macro.pawArea > 50 &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You bring your " + length(macro.pawWidth, unit, true) + " wide " + macro.footDesc() + " " + macro.footDesc() + " down on " + container.describe(verbose) + ". As your " + macro.footDesc() + " impacts its target, you feel its weight sink through buildings and into the \
     ground. After you lift your " + macro.soleDesc() + ", a deep indent full of blood-smeared rubble is revealed. Bone fragments and rebar stick out of the mess, tangled into a mold of your " + macro.footDesc() + ".";
  }
});

//paw area less than 1e7

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e7 &&
      macro.pawArea > 1000 &&
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " crater in the ground.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e7 &&
      macro.pawArea > 1000 &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, you drive your " + macro.toeDesc() + " deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " \
    rubble-lined crater in the ground.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e7 &&
      macro.pawArea > 1000 &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, you drive your " + macro.toeDesc() + " deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " \
    rubble-lined crater in the ground. At the center of the crater, a pond of blood and liquified prey is filling, fed by the crater and your dripping " + macro.soleDesc() + ".";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e7 &&
      macro.pawArea > 1000 &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You lift your your colossal " + macro.footDesc() + " up and over " + container.describe(verbose) + ". With a sudden swiftness, you <i>SLAM</i> it down. Your " + macro.footDesc() + " shakes the ground and releases an audible <i>BOOOOM</i>.\
    With a back and forth twist, your " + macro.toeDesc(true) + " knock over and pulverize buildings, driving them deep into the soil. Once you have lifted your " + macro.footDesc() + ", you notice it has left a " + length(macro.pawLength, unit, true) + " \
    by "+ length(macro.pawWidth, unit, true) + " rubble-lined crater in the ground. At the center of the crater, a pond of blood and liquified prey is filling, fed by the crater and your dripping " + macro.soleDesc() + ".";
  }
});

//paw area less than 1e11

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e11 &&
      macro.pawArea > 1e7 &&
      !hasAtleast(container, "Planet", 1) && //this is to prevent these interactions from running on planets that have been shrunk
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on " + container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of \
    your " + macro.toeDesc(true) + " preserved in newly formed hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone; forming the wall of the " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " wide \
    dust-filled crater you created.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e11 &&
      macro.pawArea > 1e7 &&
      !hasAtleast(container, "Planet", 1) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on " + container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + " preserved \
    in newly formed hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " wide debris-filled crater you created.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e11 &&
      macro.pawArea > 1e7 &&
      !hasAtleast(container, "Planet", 1) &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on " + container.describe(verbose) + ". You feel it make contact, and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + " preserved \
    in debris-strewn hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " wide gore-filled crater you created. \
     The basin of the crater lined with with a smooth steel, glass, and bone aggregate. Steam rises from the mix as it cools and hardens";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return macro.pawArea <= 1e11 &&
      macro.pawArea > 1e7 &&
      !hasAtleast(container, "Planet", 1) &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " casts a shadow over the landscape. You lazily bring it down on " + container.describe(verbose) + ". As you lower your leg, you feel it catch the tops of the taller skyscrapers first, collapsing them with no effort. As they fall, you \
     crush more and more buildings until you feel your " + macro.footDesc() + " smash into the ground. You settle into the landscape and cloud of dust spreads around the area. As the dust settles, you can see the clear outline of your " + macro.toeDesc(true) + " preserved in debris-strewn \
     hills and valleys. Surrounding your " + macro.footDesc() + "print is a jagged mound of cracked stone and twisted steel; forming the wall of the " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " wide gore-filled crater you created. The basin of the crater \
     lined with with a smooth steel, glass, and bone aggregate. Steam rises from the mix as it cools and hardens";
  }
});

//paw area less than 2e14

rules["stomp"].push({
  "test": function (container, macro) {
    return (macro.pawArea < 2e14 ||
      hasAtleast(container, "Continent", 1)) &&
      macro.pawArea > 1e11 &&
      !hasAtleast(container, "Planet", 1) &&
      isNonFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on " + container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. Your " + macro.footDesc() + "\
     continues sinking into the bedrock until only your enoumous calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " image \
     of your "+ macro.footDesc() + " surrounded by irregular mountains that barely peek over the rim of the outer " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that \
     the bottom of the smaller crater is filled with deep ravines.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return (macro.pawArea < 2e14 ||
      hasAtleast(container, "Continent", 1)) &&
      macro.pawArea > 1e11 &&
      !hasAtleast(container, "Planet", 1) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on " + container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. Your " + macro.footDesc() + "\
     continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " image \
     of your "+ macro.footDesc() + " surrounded by irregular mountains of of broken concrete and steel that barely peek over the rim of the outer " + length((Math.pow(macro.pawArea / Math.PI, .5) * 3), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its \
     molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. With time, a supervolcano will form here.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return (macro.pawArea < 2e14 ||
      hasAtleast(container, "Continent", 1)) &&
      macro.pawArea > 1e11 &&
      !hasAtleast(container, "Planet", 1) &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on " + container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. The shrapnel riding behind the \
     shocwave rips thorugh the area, painting it in red. Your " + macro.footDesc() + " continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a \
     " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " image of your " + macro.footDesc() + " surrounded by irregular mountains composed of broken concrete and steel that barely peek over the rim of the outer \
     " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. The lava \
     seeping upwards begins melting the steel, glass, concrete, and bone fragments that surround it.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return (macro.pawArea < 2e14 ||
      hasAtleast(container, "Continent", 1)) &&
      macro.pawArea > 1e11 &&
      !hasAtleast(container, "Planet", 1) &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your massive " + macro.footDesc() + " turns day to night as you bring it down on " + container.describe(verbose) + ". You feel it sink deep into the ground and watch as a visible shockwave extends outwards, knocking over everything in its path. The shrapnel riding behind the \
     shockave rips thorugh the area, painting it in red. Your " + macro.footDesc() + "continues sinking into the bedrock until only your enoumous blood-soaked calf is above where the ground was moments before. Two distict, concentric craters have formed below you. The inner one is a \
     " + length(macro.pawLength, unit, true) + " by " + length(macro.pawWidth, unit, true) + " image of your " + macro.footDesc() + " surrounded by irregular mountains of of broken concrete and steel that barely peek over the rim of the outer \
     " + length((Math.pow(macro.pawArea / Math.PI, .5) * 2.5), unit, true) + " across crater. Once you remove your " + macro.footDesc() + " from its molded print, you notice that the bottom of the smaller crater is filled with ravines that reach all the way to the mantle. The lava \
     seeping upwards begins melting the steel, glass, concrete, and bone fragments that surround it. The simple act of slamming your " + macro.footDesc() + " down has created a " + (1e7 <= (Math.pow(macro.pawArea / Math.PI, .5) * 4) ? "planet-wide" : length((Math.pow(macro.pawArea / Math.PI, .5) * 4), unit, true) + " wide") + " \
     wasteland.";
  }
});

// stomping a planet

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around " + container.describe(verbose) + " and begin to squeeze it between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe \
    begins to bulge outward at the middle, and firmly press against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface, fighting with and evaporating the oceans. As the last of the water drys up, the atmosphere thins and \
    spreads over your form, cooling the lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly crumbling pancake. The \
    remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]) &&
      isGory(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around " + container.describe(verbose) + ". As your " + macro.soleDesc(true) + " spread across the surface of the planet, the civilization beneath breaks apart and lubricates the land.\
    You shift your " + macro.footDesc() + " for better grip and begin to squeeze the planet between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe begins to bulge outward at the middle, \
    and press up against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface. The surface warms beneath you, as the dwindling oceans fill with cooling stone. As the last of the water drys up, the atmosphere thins \
    and spreads over your form, cooling the remaining lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly \
    crumbling pancake. The remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]) &&
      isSadistic(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You place your two unbelievably large " + macro.footDesc(true) + " around " + container.describe(verbose) + ". As your " + macro.soleDesc(true) + " spread across the surface of the planet, the civilization beneath breaks apart and lubricates the land.\
    You shift your " + macro.footDesc() + " for better grip and begin to squeeze the planet between your " + length(macro.pawWidth, unit, true) + " wide " + macro.toeDesc(true) + ". As you apply pressure, the captive globe begins to bulge outward at the middle, \
    and press up against its prison. Continuing to crush it, you feel the continents deform and magma begin to flow over the surface. The planet burns and dies below you, as the dwindling oceans fill with cooling stone. As the last of the water drys up, the atmosphere thins \
    and spreads over your form, cooling the remaining lava against the hard vacuum of space. Left with a crushed rocky orb between your " + macro.footDesc() + ", you start slowly increasing the pressure on the planet, and feel as it goes from a rough sphere to a rapidly \
    crumbling pancake. The remaining rock grinds away to dust as you massage your mighty " + macro.soleDesc(true) + " against each other.";
  }
});

rules["stomp"].push({
  "test": function (container, macro) {
    return (hasAtleast(container, "Star", 1) ||
      hasAtleast(container, "Solar System", 1)) &&
      isFatal(macro);
  }, "desc": function (container, macro, verbose, flat) {
    return "You place your two " + length(macro.pawLength, unit, true) + " long " + macro.footDesc(true) + " around " + container.describe(verbose) + " and begin to squeeze " + (container.count > 1 ? "them" : "it") + " between your " + length(macro.pawWidth, unit, true) + " wide \
    " + macro.toeDesc(true) + ". The crushing gravity your " + macro.footDesc(true) + " generate is enough to vaporize your prey before your " + macro.toeDesc(true) + " even touch each other. As they come together, the energy crushes the remaining dust with enough pressure to form \
    new elements. Eventually nothing remains but the bottom of your " + macro.footDesc(true) + ".";
  }
});
}

// anal-vore

{
rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Person", 1) &&
      hasOnly(container, ["Person"]);
  }, "desc": function (container, macro, verbose, flat) {
    let adjective = ["musky", "winding", "churning"][Math.floor(Math.random() * 3)];
    return "Your weighty rump slams against the ground. A shock of pleasure runs up your spine as a " + container.describe(verbose) + " slides up your ass," +
      (macro.maleParts ? " grinding against your prostate" : "") + ". A powerful clench drags them deeper into your bowels, sealing them away in your " + adjective + " depths.";
  }
});

rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Car", 1) &&
      hasOnly(container, ["Car"]);
  }, "desc": function (container, macro, verbose, flat) {
    return "You ram " + container.describe(verbose) + " up your ass, biting your lip as it" + (macro.maleParts ? " rubs along your prostate" : " slides into velvety depths") + ".\
    You moan and clench hard, yanking it in with a wet <i>shlrrp</i> and abruplty silencing its blaring horn.";
  }
});

rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Bus", 1) &&
      hasOnly(container, ["Bus"]);
  }, "desc": function (container, macro, verbose, flat) {
    return "A speeding bus slams on its brakes as you abruptly sit - but it's too late to stop. A gasp flies from your lips as it penetrates your greedy ass, sinking halfway in and coming to a halt. \
    You grunt and squeeze, causing its frame to creak and groan. Two fingers to the back are enough to get it moving again, and it slowly works inside. You shiver and moan, taking it in all the way. \
    Your ass claims " + container.describe(verbose) + ".";
  }
});

rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Business", 1) &&
      hasOnly(container, ["Business"]);
  }, "desc": function (container, macro, verbose, flat) {
    return "You set your weighty rump down on " + container.describe() + " and feel it penerate your hole. Once your weight has settled you clench your sphincter, seperating the building from its foundations with a <i>crCraCHH</i> \
    pulling it off the groud and inside of your ass. You feel the immense pressure of your anal cavity slowly crushing the building, bringing newfound pleasure with every shift and tremour within the structure.";
  }
});


rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Train", 1) &&
      hasOnly(container, ["Train"]);
  }, "desc": function (container, macro, verbose, flat) {
    var cars = container.contents["Train"].contents["Train Car"].count;
    return "Your massive fingers wrap around a train, yanking it from the rails with a tremendous screech of metal-on-metal. You squat down low, eyes rolling back in anticipation as you thrust the locomotive towards your massive ass - and then it hits home. A moan of pleasure shakes the earth, your ravenous pucker spread around the engine and sucking it in with a <i>squelch</i>. Powerful muscles squeeze and grab...and " + container.describe(verbose) + " swiftly vanishes into your bowels, every one of the " + cars + " cars a fresh shock of pleasure as they glide into your musky depths.";
  }
});

rules["anal-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]);
  }, "desc": function (container, macro, verbose, flat) {
    return "Your enormous hands guide a planet towards your cheeks - pressing it firmly into your pucker with a dull, muffled <i>shlph</i>...and " + container.describe(verbose) + " sinks into your bowels, sealed away from the universe...";
  }
});
}

// cock-vore

{
rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 1000 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You snatch " + container.describe(verbose) + " from the ground and shove them inside your " + macro.describeDick + ". With a <i>sluurp</i> you pull them deep into your shaft. You watch as the bulge in your manhood \
    gets pulled closer to your body by powerful clenches, until it vanishes into your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 50000 &&
      macro.dickMass > 1000 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You pluck " + container.describe(verbose) + " from the ground and shove them against the head of your " + length(macro.dickDiameter, unit, true) + " wide " + macro.describeDick + ". They struggle to escape your grasp, while your cockslit \
    opens and devours them with a <i>sluuurP</i>. You watch as the squirming bulge in your manhood travels down your shaft until it vanishes into your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 5000000 &&
      macro.dickMass > 50000 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "Your gigantic fingers reach down and grab " + container.describe(verbose) + ". Holding them in your iron grip, you raise them to your awaitng " + macro.describeDick + ". As they struggle to escape, your cockslit opens wide and envelops your prey. Once it has swallowed everything, it clamps down and pulls those unfortunate enough to be in your shaft deep inside,\
    packing down its meal with muffled <i>snAps</i> and <i>CRRUnCHes</i>. Enventually your prey reaches the base of your cock, and everything left gets shoved into your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy") + " balls with a final mighty clench.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 1e9 &&
      macro.dickMass > 5000000 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You lay the " + length(macro.dickDiameter, unit, true) + " wide tip of your cock on the ground and thrust forward, filling your cock with " + container.describe(verbose) + ". The tip of your member bulges with its cargo. As you slowly clench to drag your prey into your bulging dick, the sensation of them rubbing against the inside of your cock causes you to release a glob of precum that lubricates your stretched passage. \
    After several more powerful clenches, you feel the bulge pass the halfway mark of your " + macro.describeDick + ". The speed of the bulge picks up, as the entirety of your captive prey has been thoughly lubricated. You feel them slide through your utethra, and shudder with anticipation as they approach your \
      " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls. Finally your meal reaches your body, and drops into your cum factories.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 1e14 &&
      macro.dickMass > 1e9 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You lay the " + length(macro.dickDiameter, unit, true) + " wide tip of your cock on the ground and grind it along the earth, ripping up the terrain and giving all in your path nowhere to go; except into your " + macro.describeDick + ". The colossal tip of your member bulges with " + container.describe(verbose) + ". As you slowly clench your mighty rod, you feel your prey shift and slide along the inside of your cum channel. \
    After a few more moments of pure pleasure, you feel the bulge pass the halfway mark of your tool. The speed of the bulge picks up, as the entirety of your captive prey has been compacted and lubricated by their journey. With every pull, a shudder of ecstasy goes up your spine, until those inside your cock finally reach their ultimate destination, \
    your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return macro.dickMass <= 1e19 &&
      macro.dickMass > 1e14 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You lay your " + length(macro.dickDiameter, unit, true) + " across member on the terrain and begin using your mammoth dick muscles to create a mighty wind, pulling in the surrounding landscape, ripping up the terrain and pulling it within your " + macro.describeDick + ". The colossal slit at the tip of your staff opens wide as buildings, trees, and everything else gets sucked inside.\
      You feel the prey sliding down your cock rub against your utethra as they pass through. You can even see some of the larger buildings as small, quick moving bulges within your manhood. After several minutes of sucking, your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls are filled by " + container.describe(verbose) + ". As you shift you cock off the ground, you \
      the satisfying weight of your prey bounce and jiggle within your sack.";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return (macro.dickMass <= 1e23 ||
      nothingLarger(container, "Continent")) &&
      macro.dickMass > 1e19 &&
      container.count > 0;

  }, "desc": function (container, macro, verbose, flat) {
    return "You lay your " + length(macro.dickDiameter, unit, true) + " across member on the planet and begin using your enourmous dick muscles to vacuum in the surrounding landscape, ripping up  huge chunks of the terrain and pulling them inside your " + macro.describeDick + ". The ginormous gaping slit at the tip of your colossal dick opens wide as cities, rivers, lakes, and mountains vanish into your depths. \
    A steady stream of unbroken friction rubs against the inside of your mammoth tool, almost causing you to black out from pleasure. As your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls fill, you start slowing down your enormous contractions, until you have " + container.describe(verbose) + " captive within your stretched sack.";
  }
});


rules["cock-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]) &&
      macro.dickGirth <= 2.5e14;

  }, "desc": function (container, macro, verbose, flat) {
    return "You shove your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead against the planet as your greedy slit stretches wide. The globe shudders and begins to slowly enter your stretched hole. As you get closer and closer to covering an entire hemisphere with \
      your " + macro.describeDick + ", you feel the pressure rise. Shoving the planet inside your cock takes more and more effort, until with a final shove, you feel your tip of your dick pass the center of the sphere, and hold it snug. You stop to squeeze your shaft, and feel how far it has been stretched outward.\
      You begin flexing your cock to bring the world fully inside your enourmous prick, and after a few  more gulps, light ceases to fall on Earth. You help your cock along with its planetary feast by grabbing it and slowly pulling down the shaft, lodging the planet deeper, and deeper, and deeper within you.\
      After what seems like a lifetime of pleasure, the world finally reaches the base of your thick cock, and squeezes down into your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls. You reach down and touch your sack, feeling it digest " + container.describe(verbose) + ".";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return hasExactly(container, "Planet", 1) &&
      hasOnly(container, ["Planet"]) &&
      macro.dickGirth > 2.5e14;

  }, "desc": function (container, macro, verbose, flat) {
    return "You shove your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead against the planet as your greedy slit stretches wide to envelop it. You feel it slowly enter your gaping hole and after a few massive clences of your " + macro.describeDick + ", light ceases to fall on Earth. \
      You run your fingers down you shaft, feeling the bulge, and massaging it along. The slurping of your cock pulls it toward your abdomen until it eventually runs out of length, and is squeezed down into your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls. You reach down and touch your sack, feeling it digest " + container.describe(verbose) + ".";
  }
});

rules["cock-vore"].push({
  "test": function (container, macro) {
    return hasAtleast(container, "Star", 1) ||
      hasAtleast(container, "Solar System", 1)

  }, "desc": function (container, macro, verbose, flat) {
    return "You open your cumslit wide and let gravity fill your " + length(macro.dickDiameter, unit, true) + " wide throbbing cockhead with " + container.describe(verbose) + ". The tip of your cock closes and begins clenching to pull your prey deeper. \
      You run your fingers down your " + macro.describeDick + ", feeling it work its meal deeper within your shaft, and massaging it ensure everything inside continues towards your " + pickString("throbbing", "churning", "eager", "awaiting", "heavy", "mammoth") + " balls. \
      As your cock finishes its work, you feel the passage to your balls stretch wide, fill, and them empty as your balls fill, and begin the process of digestion.";
  }
});
}

// ball-smother

{
//Balls weigh 1,000kg or less
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1000 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your giant balls impact the ground with a <i>thud</i>, pinning " + container.describe(verbose) + " between your weighty orbs.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1000 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i>, crushing " + container.describe(verbose) + ".";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1000 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i> trapping " + container.describe(verbose) + " and grinding them into the pavement. They briefly struggle to escape before succumbing to the weight bearing down on them.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1000 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + " balls impact the ground with a <i>thud</i> trapping " + container.describe(verbose) + " and grinding them into the pavement. They briefly struggle to escape before being crushed into a gory mess that leaves a slick of blood on your swinging sack.";
  }
});

//Balls weigh  50,000kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 50000 &&
      macro.ballMass > 1000 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls impact the ground with a <i>thump</i>. They spread over " + container.describe(verbose) + " and settle into the ground.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 50000 &&
      macro.ballMass > 1000 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " destroying everything in their path and leaving a gouge in the ground.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 50000 &&
      macro.ballMass > 1000 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " with the force of a wrecking ball. The momentum of the swing destroying everything in their path and leaving a trail of destruction.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 50000 &&
      macro.ballMass > 1000 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls swing down and into " + container.describe(verbose) + " with the force of a wrecking ball. The momentum of your mighty sack destroying everything in its path and leaving a trail of destruction. Your balls swing back through the remains of your prey, the massive weight converting everything remaining into unidentifiable detritus.";
  }
});

//Balls weigh  5,000,000kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 5000000 &&
      macro.ballMass > 50000 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before coming to rest. You feel your sack shift as it settles into the landscape";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 5000000 &&
      macro.ballMass > 50000 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you heave your weighty orbs off the ground, only rubble remains.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 5000000 &&
      macro.ballMass > 50000 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. After you heave your weighty orbs off the ground all that remains of your victims is gore streaked rubble and twisted steel.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 5000000 &&
      macro.ballMass > 50000 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast a shadow over " + container.describe(verbose) + " for a few seconds before slamming into the earth with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. After you heave your weighty orbs off the ground you see that those that were trapped beneath your cum factories are nothing but crumpled bodies lying amist the rubble.";
  }
});

//Balls Weigh 1e9 kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e9 &&
      macro.ballMass > 5000000 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before coming to rest on " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it spreads over the terrain and forms two noticable indents.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e9 &&
      macro.ballMass > 5000000 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before crushing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots in the terrain; testimony of your immense power.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e9 &&
      macro.ballMass > 5000000 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before pulverizing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack shift and settle as it slowly pulverizes everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots filled with rubble and gore in the terrain; testimony of your immense power.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e9 &&
      macro.ballMass > 5000000 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls briefly eclipse the sun before pulverizing " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack move and shudder as it's immense bulk flattens everything unfortunate enough to be trapped beneath it. When you finally heave your mighty manhood off the ground, you notice 2 massive divots filled with rubble and gore in the terrain; a fitting grave for those lesser than you.";
  }
});

//Balls Weigh 1e12 kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e12 &&
      macro.ballMass > 1e9 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky before coming to rest on " + container.describe(verbose) + " with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your sack push the ground aside to form two massive craters.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e12 &&
      macro.ballMass > 1e9 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
      resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you you heave your sack off the ground, two massive craters have formed at the impact site.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e12 &&
      macro.ballMass > 1e9 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you heave your sack off the ground, two massive craters have formed at the impact site. A pool of blood and musk is rapidly forming at the bottom of each crater, with peices of debris floating in them.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e12 &&
      macro.ballMass > 1e9 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " diameter balls blot out the sky as they approach your target. The unstoppable force of your gigantic testicles <i>CRASHES</i> through " + container.describe(verbose) + " with little \
resistance, pancaking them into the ground. The violent impact generates a shockwave that bowls over surrounding trees and buildings. As you heave your sack off the ground, two massive craters have formed at the impact site. A pool of blood and musk is rapidly forming at the bottom of each crater, with bones and peices of debris floating in them.";
  }
});

//Balls Weigh 1e15 kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e15 &&
      macro.ballMass > 1e12 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over " + container.describe(verbose) + " before settling into the terrain with the weight of " + mass(macro.ballMass, unit, false) + " each. You feel your gigantic orbs shovel out a spot for themselves with their mass alone.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e15 &&
      macro.ballMass > 1e12 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, true) + " destroying all in its path. As the initial impact subsides you feel your \
enormous balls shift away from each other as they furrow into the landscape.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e15 &&
      macro.ballMass > 1e12 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, false) + " tossing people into the air and drestroying all in its path. As the \
initial impact subsides you feel your enormous balls shift away from each other as they furrow into the landscape and over the people that attempted to flee.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e15 &&
      macro.ballMass > 1e12 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " wide balls cast darkness over the land as they swing low and right through " + container.describe(verbose) + " like a hot knife through butter. \
      You shudder as you feel the force of the impact travel through the entirety of your testicles. The shockwave travels for " + length(macro.ballDiameter, unit, false) + " tossing people into the air and drestroying all in its path. As the \
initial impact subsides you feel your enormous balls shift away from each other as they furrow into the landscape and over the people that attempted to flee. The ground is stained red with blood and gore.";
  }
});

//Balls Weigh 1e20 kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e20 &&
      macro.ballMass > 1e15 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall before they come to rest on" + container.describe(verbose) + " . Each titanic testicle weighing " + mass(macro.ballMass, unit, false) + " . The craters left by each orb will scar the planet until its destruction.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e20 &&
      macro.ballMass > 1e15 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing shrapnel in every direction. The craters left by your gonads will scar the planet until its destruction.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e20 &&
      macro.ballMass > 1e15 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing shrapnel in every direction. The craters left by your gonads quickly fill with various fluids, leaving two lakes forever on the planet.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e20 &&
      macro.ballMass > 1e15 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " thick balls cause night to fall over the land. As they contact earth, they obliterate " + container.describe(verbose) + " with a dull <i>booOOOOooOOM</i>. \
      The immesive forces involved cause your cum factories to bounce up into the air before coming down on the same spot. The second impact drives your titanic balls deep into the ground while throwing rubble, bodies, and shrapnel in every direction. The craters left by your gonads quickly fill with various fluids, leaving two lakes forever on the planet.";
  }
});

//Balls Weigh 1e24 kg or less

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e24 &&
      macro.ballMass > 1e20 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "The Gravatational pull of your " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall before they come to rest on" + container.describe(verbose) + " . Each monstrous testicle weighing " + mass(macro.ballMass, unit, false) + " . The impact of your manhood creating mountains and shaking earth";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e24 &&
      macro.ballMass > 1e20 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e24 &&
      macro.ballMass > 1e20 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Those that survived the blast are deafened as windows shatter around them and buildings shake on the verge of collapse. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area.";
  }
});

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass <= 1e24 &&
      macro.ballMass > 1e20 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "Your " + mass(macro.ballMass, unit, true) + ", " + length(macro.ballDiameter, unit, true) + " across balls cause night to fall over the land. As they slam into the earth, they obliterate " + container.describe(verbose) + " with a thunderous <i>BOOOOOOM</i>. \
      You feel the Earth twang and vibrate with the impact. The crater kicks up enough dust to throw off the seasons. Those that survived the blast are deafened as windows shatter around them and buildings shake on the verge of collapse. Large fissures spread away from your privates in all directions, while the aftershocks of the impact alter and destroy the geology of the surrounding area. \
      You smell the tang of copper in the air, and know that the next rainfall with be red with the blood of those you have slaughtered.";
  }
});



//Balls Weigh more than 1e24 kg

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass > 1e24 &&
      container.count > 0 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, smushing them firmly against your " + length(macro.ballDiameter, unit, true) + " wide balls. ";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass > 1e24 &&
      container.count > 0 &&
      isFatal(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, crushing " + (container.count == 1 ? "it" : "them") + " firmly against your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs tearing " + (container.count == 1 ? "it" : "them") + " asunder, spreading the debris across \
your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});
rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass > 1e24 &&
      container.count > 0 &&
      isGory(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, obliterating " + (container.count == 1 ? "it" : "them") + " with \
    your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs tearing " + (container.count == 1 ? "it" : "them") + " asunder. The many fragments of the collision \
    expand outward before being pulled back against your groin. The debris spread across your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});

rules["ball-smother"].push({
  "test": function (container, macro) {
    return macro.ballMass > 1e24 &&
      container.count > 0 &&
      isSadistic(macro);

  }, "desc": function (container, macro, verbose, flat) {
    return "The gravitational pull of your " + mass(macro.ballMass, unit, true) + " balls draw " + container.describe(verbose) + " into your sack, decimating " + (container.count == 1 ? "it" : "them") + " with \
    your " + length(macro.ballDiameter, unit, true) + " wide balls.  The gravity each of your orbs ripping and tearing " + (container.count == 1 ? "it" : "them") + " asunder. The many fragments of the collision \
    expand outward before being pulled back against your groin. The debris spread across your sack, flattening and grinding until nothing remains but your colossal manhood.";
  }
});
}

// male-orgasm

{
  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasOnly(container, ["Person"]) &&
        hasExactly(container, "Person", 1) &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, hosing down " + container.describe(verbose) + " with $VOLUME of your seed.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasOnly(container, ["Person"]) &&
        hasExactly(container, "Person", 1) &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall and drowning them in a $VOLUME-torrent of cum.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasOnly(container, ["Person"]) &&
        hasExactly(container, "Person", 1) &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall; pinning them in place and suffocating them in a $VOLUME-torrent of cum.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasOnly(container, ["Person"]) &&
        hasExactly(container, "Person", 1) &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " erupts, shoving " + container.describe(verbose) + " them into a wall; pinning  them in place with a $VOLUME-torrent of cum. As they gasp for breath, your cum fills their lungs and stomach. \
Their form falls lifeless on the ground once your cumshot has ended.";
    }
  });

  //more than 5 and less than 50

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 50 &&
        spurtVolume > 5 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 50 &&
        spurtVolume > 5 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", shoving your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your cumshot.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 50 &&
        spurtVolume > 5 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", shoving your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your \
      cumshot. The rubble and hardening cum covering the wall holds your victims in place against the structure.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 50 &&
        spurtVolume > 5 &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " convulses as it sprays $VOLUMEs of cum over " + container.describe(verbose) + ", crushing your prey against a nearby building. As your stream tapers off, you see that none of your prey could withstand the pressure of your \
      cumshot. The rubble and red-dyed cum covering the wall holds your victims in place against the structure.";
    }
  });

  //less than 5e2

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 500 &&
        spurtVolume > 50 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 500 &&
        spurtVolume > 50 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", crushing and downing them at the same time.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 500 &&
        spurtVolume > 50 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUMEs of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", compacting and mangling everything in its path. As your cumshot ends, \
      a thick stream of pink frothing fluids pours into nearby sewer drains, filling and clogging them.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 500 &&
        spurtVolume > 50 &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " twitches wildy as it sprays $VOLUME of cum into the air. A powerful white stream of musky fluid smashes into " + container.describe(verbose) + ", compacting and mangling everything in its path. The sheer pressure propelling \
      your cum severs limbs and crumples steel. As your cumshot ends, a thick stream of pink frothing fluids pours into nearby sewer drains, filling and clogging them.";
    }
  });

  //less than 5e3

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5000 &&
        spurtVolume > 500 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.ballDiameter + " balls bounce and your " + macro.describeDick + "begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5000 &&
        spurtVolume > 500 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      Limbs and rubble float away on the jizz, vanishing into the storm drains and down the street.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5000 &&
        spurtVolume > 500 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      The torrent of jizz seeps away; leaving behind rubble and corpses.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5000 &&
        spurtVolume > 500 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls bounce and your " + macro.describeDick + " begins to twitch uncontrollably. Moments later a $VOLUME shower of jism is lobbed into the air. The rain of cum flows into the street and carries away " + container.describe(verbose) + ".\
      The torrent of jizz and blood seeps away; leaving behind rubble and corpses.";
    }
  });

  //less than 1e6

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e6 &&
        spurtVolume > 5000 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e6 &&
        spurtVolume > 5000 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e6 &&
        spurtVolume > 5000 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz. The debris filled river of cum rages down the street, revealing more twisted steel and corpses with every building it brushes past.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e6 &&
        spurtVolume > 5000 &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + length(macro.ballDiameter, unit, true) + " wide balls clench while your " + macro.describeDick + " bobs and spurts thick ropes of semen. $VOLUMEs of your splooge flood the area, enveloping " + container.describe(verbose) + " in a suffocating \
      wave of jizz. The debris filled river of cum and gore rages down the street, revealing more twisted steel and corpses with every building it brushes past.";
    }
  });

  //less than 1e9

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e9 &&
        spurtVolume > 1e6 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum covers " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e9 &&
        spurtVolume > 1e6 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e9 &&
        spurtVolume > 1e6 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + " as \
      it flies through air. Those caught in its path are smashed to pieces and dragged away by the intense current. The sheer volume of fluid overwelmes the sewers; you see cum spew from manholes and strom drains for several blocks.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e9 &&
        spurtVolume > 1e6 &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " swells while your cumslit spews a massive unbroken river of semen. The twitching of your gargantuan cock sends your load in all directions. The mighty spurt of cum smashes apart " + container.describe(verbose) + " as \
      it flies through air. Those caught in its path are smashed to pieces and dragged away by the intense current. The sheer volume of fluid overwelmes the sewers; you see cum, gore, glass, and steel spew from manholes and strom drains for several blocks.";
    }
  });

  //less than 1e12

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e12 &&
        spurtVolume > 1e9 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " throbs as it fires $VOLUMEs of jizz into the sky. An enoumous sea of cum crashes out of the sky and onto " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e12 &&
        spurtVolume > 1e9 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " throbs as it fires $VOLUMEs of jizz into the sky. An enoumous sea of cum crashes out of the sky and splashes over " + container.describe(verbose) + " with more ferocity than the flood from a broken dam. \
      After the massive barrage lands, its viscously sloshes down the natural contours of the land, dragging trees and buildings deep into a nearby valley. The sheer volume of dirt and detritus that it picks up darkens the fluid into an opaque tide of frothing brown.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e12 &&
        spurtVolume > 1e9 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " throbs as it fires $VOLUMEs of jizz into the sky. An enoumous sea of cum crashes out of the sky and splashes over " + container.describe(verbose) + " with more ferocity than the flood from a broken dam. \
      After the massive barrage lands, its viscously sloshes down the natural contours of the land, dragging trees, people, animals, and buildings deep into a nearby valley. The sheer volume of dirt and detritus that it picks up darkens the fluid into an opaque tide of \
      frothing brown. You watch as the sticky mess flows away from you, leaving only the foundations of buildings and rocks in its bed.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e12 &&
        spurtVolume > 1e9 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " throbs as it fires $VOLUMEs of jizz into the sky. An enoumous sea of cum crashes out of the sky and splashes over " + container.describe(verbose) + " with more ferocity than the flood from a broken dam. \
      After the massive barrage lands, its viscously sloshes down the natural contours of the land, dragging trees, people, animals, and buildings deep into a nearby valley. The sheer volume of dirt and detritus that it picks up darkens the fluid into an opaque tide of \
      frothing brown. You watch as the sticky mess flows away from you, leaving only the foundations of buildings and rocks in its bed. The retreating semen also reveals the mangeled and drowned corpses of your victims.";
    }
  });

  //less than 1e16

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e16 &&
        spurtVolume > 1e12 &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " jerks upawrds as it spews $VOLUMEs of semen in a wide arc that clips a nearby cloud. A white tsunami envelopes " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e16 &&
        spurtVolume > 1e12 &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " jerks upawrds as it spews $VOLUMEs of semen in a wide arc that clips a nearby cloud. A white tsunami wipes out " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e16 &&
        spurtVolume > 1e12 &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " jerks upawrds as it spews $VOLUMEs of semen in a wide arc that clips a nearby cloud. A white tsunami wipes out " + container.describe(verbose) + ". As the mighty wave crashes through city grids, it \
      moves with surprising speed, catching up to and destroying fleeing vehicles.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e16 &&
        spurtVolume > 1e12 &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " jerks upawrds as it spews $VOLUMEs of semen in a wide arc that anniliates a flock of birds. A white tsunami wipes out " + container.describe(verbose) + ". As the mighty wave crashes through city grids, it \
      moves with surprising speed, catching up to and destroying fleeing vehicles. Your cum smashes dams, bridges, and erodes the land as it travels, cutting a deep channel the local rivers begin flowing into.";
    }
  });

  //less than 5e19

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5e19 &&
        spurtVolume > 1e16 &&
        !hasAtleast(container, "Planet", 1) &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " launches $VOLUMEs of frothing load into the atmosphere. As the ocean of cum lands, it washes over " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5e19 &&
        spurtVolume > 1e16 &&
        !hasAtleast(container, "Planet", 1) &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " launches $VOLUMEs of frothing load into the atmosphere. As the ocean of cum roars across the planet, it smashes through " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e19 &&
        spurtVolume > 1e16 &&
        !!hasAtleast(container, "Planet", 1) &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " launches $VOLUMEs of frothing load into the atmosphere. As the ocean of cum roars across the planet, it smashes through " + container.describe(verbose) + ". Everything your semen rolls across \
      is basted to smithereens as it carves a deep chasm. The destroyed buildings and people it swept along are deposited at the sides of the chasm, forming an unstable wall of gore and rubble.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 5e19 &&
        spurtVolume > 1e16 &&
        !hasAtleast(container, "Planet", 1) &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " launches $VOLUMEs of frothing load into the atmosphere. As the ocean of cum roars across the planet, it smashes through " + container.describe(verbose) + ". Everything your semen rolls across \
      is basted to smithereens as it carves a deep gore lined chasm that extends from where it landed to the ocean. As it hits the ocean the resulting wave reverses the tide, dashes ships, and turns the water into an inhabitable murky soup. The destroyed \
      buildings and people it swept along are deposited at the bottom of the bay.";
    }
  });

  //less than 1e25

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e25 &&
        spurtVolume > 5e19 &&
        !hasAtleast(container, "Planet", 1) &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! You open your " + macro.jawDesc(true) + " wide; letting out an earth-shattering roar while $VOLUMEs of cum explode out of your " + macro.describeDick + ". The colossal load sprays down on" + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e25 &&
        spurtVolume > 5e19 &&
        !hasAtleast(container, "Planet", 1) &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! You open your " + macro.jawDesc(true) + " wide; letting out an earth-shattering roar while $VOLUMEs of cum explode out of your " + macro.describeDick + ". The colossal load punches through " + container.describe(verbose) + " without \
      even slowing down. Runing out of land to wash over, it sloshes to an ocean, sending huge waves of cum and seawater hundereds of feet into the sky.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e25 &&
        spurtVolume > 5e19 &&
        !hasAtleast(container, "Planet", 1) &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! You open your " + macro.jawDesc(true) + " wide; letting out an earth-shattering roar while $VOLUMEs of cum explode out of your " + macro.describeDick + ". The colossal load punches through " + container.describe(verbose) + " without \
      even slowing down. Runing out of land to wash over, it sloshes to an ocean, sending huge waves of cum and seawater hundereds of feet into the sky. As the thick goopy mix settles down, the increased volume causes tsunamis and floods over the entire globe.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return spurtVolume <= 1e25 &&
        spurtVolume > 5e19 &&
        !hasAtleast(container, "Planet", 1) &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! You open your " + macro.jawDesc(true) + " wide; letting out an earth-shattering roar while $VOLUMEs of cum explode out of your " + macro.describeDick + ". The colossal load punches through " + container.describe(verbose) + " without \
      even slowing down. Runing out of land to wash over, it sloshes to an ocean, sending huge waves of cum and seawater hundereds of feet into the sky. Every ship sailing on that ocean is overwhelmed by the force and capsizes. As the thick goopy mix \
      settles down, the increased volume causes tsunamis and floods over the entire globe. The sticky white surface is coveved by dead marine life; schools of bloated tuna, giant squid, sharks, and whales.";
    }
  });

  //cum envelops planet

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasExactly(container, "Planet", 1) &&
        hasOnly(container, ["Planet"]) &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your reach down and aim your " + macro.describeDick + " at a nearby planet. $VOLUMEs of semen are flung into space, where they contact and completly cover " + container.describe(verbose) + ".";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasExactly(container, "Planet", 1) &&
        hasOnly(container, ["Planet"]) &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your reach down and aim your " + macro.describeDick + " at a nearby planet. $VOLUMEs of semen wash over " + container.describe(verbose) + ". The once green globe is now a sloshing white ocean of sticky cum.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasExactly(container, "Planet", 1) &&
        hasOnly(container, ["Planet"]) &&
        isGory(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your reach down and aim your " + macro.describeDick + " at a nearby planet. $VOLUMEs of semen wash over " + container.describe(verbose) + ". When your seed splashes over the surface, it instantly crushes and \
      wipes away an entire civilization. The once green globe is now a sloshing white ocean of sticky cum.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return hasExactly(container, "Planet", 1) &&
        hasOnly(container, ["Planet"]) &&
        isSadistic(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your reach down and aim your " + macro.describeDick + " at a nearby planet. $VOLUMEs of semen wash over " + container.describe(verbose) + ". Your seed crashes into the center of the globe and creads outward, \
      slowly enveloping the world. As it spreads through the oceans and continents in a " + length((Math.pow(spurtVolume, 1 / 3) * .5), unit, true) + " high wave, it instantly crushes and wipes away an entire civilization. The once green globe \
      is now a sloshing white ocean of sticky cum.";
    }
  });

  //cum larger than planet

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return (hasAtleast(container, "Star", 1) ||
        hasAtleast(container, "Solar System", 1)) &&
        isNonFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " expells a $VOLUME cumshot into deep space. As it floats away, the gravity it generates pulls " + container.describe(verbose) + " inside of the sticky fluid.";
    }
  });

  rules["male-orgasm"].push({
    "test": function (container, macro, spurtVolume) {
      return (hasAtleast(container, "Star", 1) ||
        hasAtleast(container, "Solar System", 1)) &&
        isFatal(macro);

    }, "desc": function (container, macro, spurtVolume) {
      return "You're cumming! Your " + macro.describeDick + " expells a $VOLUME cumshot into deep space. As it floats away, the gravity it generates traps " + container.describe(verbose) + " inside of the sticky fluid forever.";
    }
  });
}

// male-spurt

{
//contains a person
rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum sprays from your " + macro.describeDick + ". The musky stream covers " + container.describe(verbose) + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum leaks from your " + macro.describeDick + ". The musky stream covers " + container.describe(verbose) + ", drowing them.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum leaks from your " + macro.describeDick + ". The musky stream falls over the shoulders of " + container.describe(verbose) + ", knocking them unconsious. They fall face down in the puddle and slowly drown in your pre.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return hasOnly(container, ["Person"]) &&
      hasExactly(container, "Person", 1) &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "You grab " + container.describe(verbose) + " and hold their face against your " + length(macro.dickDiameter, unit, true) + " wide cockhead. $VOLUMEs of precum leaks from your " + macro.describeDick + " and down their streched throat. The musky \
      discarge fills their lungs and stomach, until your precum runs out of room and begins to leak out of your victim's nose and eyeballs. You drop your toy, watching them fall to the ground and try to cough up the suffocating fluid. Pre pours from their \
      mouth, while they slump over and die.";
  }
});

//more than 5 and less than 50

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 50 &&
      spurtVolume > 5 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead throbs, releasing $VOLUMEs of pre. The pungent glob spashes over " + container.describe(verbose) + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 50 &&
      spurtVolume > 5 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead throbs, releasing $VOLUMEs of pre. The pungent glob spashes onto the street; crushing " + container.describe(verbose) + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 50 &&
      spurtVolume > 5 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead throbs, releasing $VOLUMEs of pre. The pungent glob spashes onto the street; crushing " + container.describe(verbose) + ". The bloodstained pool of precum washes down the street and \
      pours into a nearby stromdrain.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 50 &&
      spurtVolume > 5 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead throbs, releasing $VOLUMEs of pre. The pungent glob spashes onto the street; crushing " + container.describe(verbose) + ". The bloodstained pool of precum washes broken glass and \
      " + pickString("intestines", "gore", "organs") + " down the street and into a nearby stormdrain.";
  }
});

//less than 5e2

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 5e2 &&
      spurtVolume > 50 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum flow out of your urethra, soaking " + container.describe(verbose) + " and filling the air with your musk.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 5e2 &&
      spurtVolume > 50 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum flow out of your urethra, trapping " + container.describe(verbose) + " within a pond of your pre-ejaculate.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 5e2 &&
      spurtVolume > 50 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum flow out of your urethra, trapping " + container.describe(verbose) + " within a pond of your pre-ejaculate. Those unlucky enough to be in the way are crushed by the sudden swell of the fluid. Their floating \
      corpses dye the fluid a dark red.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 5e2 &&
      spurtVolume > 50 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of precum flow out of your urethra, trapping " + container.describe(verbose) + " within a pond of your pre-ejaculate. Those unlucky enough to be in the way are crushed by the sudden swell of the fluid. Their floating \
      corpses slowly break apart; dyeing the fluid a dark red.";
  }
});

//less than 1e4

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e4 &&
      spurtVolume > 5e2 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + macro.describeDick + " spews $VOLUMEs of precum, dousing " + container.describe(verbose) + " with your emmisions.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e4 &&
      spurtVolume > 5e2 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + macro.describeDick + " spews $VOLUMEs of precum, smothering " + container.describe(verbose) + " with your emmisions.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e4 &&
      spurtVolume > 5e2 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + macro.describeDick + " spews $VOLUMEs of precum, smothering " + container.describe(verbose) + " with your emmisions. The slick fluid doesn't instanstly kill your prey; they attmept to crawl out of it while gasping and choking.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e4 &&
      spurtVolume > 5e2 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + macro.describeDick + " spews $VOLUMEs of precum, smothering " + container.describe(verbose) + " with your emmisions. The slick fluid ozzes over your prey, soaking and shoving them into the mud. \
      You watch as they gasp and choke inside their liquid prison; unsucessefully attempting to crawl out.";
  }
});

//less than 1e6

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e6 &&
      spurtVolume > 1e4 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead bulges as it pushes out $VOLUMEs of precum, tossing the clear fluid over " + container.describe() + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e6 &&
      spurtVolume > 1e4 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead bulges as it pushes out $VOLUMEs of precum, tossing the clear fluid over " + container.describe() + ". The speed and sheer mass of the falling \
      pre ensures that the area where it lands is obliterated.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e6 &&
      spurtVolume > 1e4 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead bulges as it pushes out $VOLUMEs of precum, tossing the clear fluid over " + container.describe() + ". The speed and sheer mass of the falling \
      pre ensures that the area where it lands is converted to a musky mudpit filled with rubble and corpses.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e6 &&
      spurtVolume > 1e4 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "Your " + length(macro.dickDiameter, unit, true) + " wide cockhead bulges as it pushes out $VOLUMEs of precum, tossing the clear fluid over " + container.describe() + ". The speed and sheer mass of the falling \
      pre ensures that the area where it lands is converted to a musky mudpit filled with rubble and corpses. A mix of pre-ejaculate, blood, and nuggest of flesh flow away from the area; a grisly warning that shows what happens to those in your way.";
  }
});



//less than 1e12

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e9 &&
      spurtVolume > 1e6 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre rages out of your cavernous urethra, slicking your " + macro.describeDick + " and raining on " + container.describe() + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e9 &&
      spurtVolume > 1e6 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, slicking your " + macro.describeDick + " and flooding out " + container.describe() + ". Each massive drop of your fluid creates a crater and resulting lake when they land,\
      saturating the area with the proof of your passion.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e9 &&
      spurtVolume > 1e6 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, slicking your " + macro.describeDick + " and flooding out " + container.describe() + ". Each massive drop of your fluid crushes buildings, creating a crater and resulting lake \
      when they land, saturating the rubble with the signs of your passion.";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e9 &&
      spurtVolume > 1e6 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, slicking your " + macro.describeDick + " and flooding out " + container.describe() + ". Each massive drop of your fluid crushes buildings and creats a crater when they land, \
      saturating the rubble with a lake of your passion. Those that narrowly escaped the initial splash flail about helplessly in the slick mud until they eventually tire out and suffocate.";
  }
});

//less than 1e12

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e12 &&
      spurtVolume > 1e9 &&
      isNonFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, lubricating your " + macro.describeDick + " and splashing over " + container.describe() + ".";
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e12 &&
      spurtVolume > 1e9 &&
      isFatal(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, lubricating your " + macro.describeDick + " and engulfing "
      + container.describe() + ". Waves of your pre carve out new canyons and " + pickString("overwhelm a dam in the distance.", "swell the rivers into a frothy tide.", "form a lake of lust");
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e12 &&
      spurtVolume > 1e9 &&
      isGory(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, lubricating your " + macro.describeDick + " and engulfing "
      + container.describe() + ". Waves of your pre carve out new canyons and " + pickString("overwhelm a dam, flooding a town with a soup of mud, pre, bodies, and rubble.", "swell the rivers into a frothy tide that smashes boats and buildings apart.", "turn a farming valley into a lake of of gore and lust");
  }
});

rules["male-spurt"].push({
  "test": function (container, macro, spurtVolume) {
    return spurtVolume <= 1e12 &&
      spurtVolume > 1e9 &&
      isSadistic(macro);

  }, "desc": function (container, macro, spurtVolume) {
    return "$VOLUMEs of pre sloshes out of your gaping cockslit, lubricating your " + macro.describeDick + " and engulfing "
      + container.describe() + ". As your fluid flows across the land, small splashes of red along its edge mark bodies being pulverized.";
  }
});
}

//--------TODO LIST-----

//precum  "male-spurt"

//musk 

//boobs 

//waste   "marking territory"

//more interactions for donning/doffing shoes

//smaller approx units

//home planet rules

//moon, dead planet, dwarf planet, asteroid, gas giant

//stomping interactions based on different footwear

//commerical vehicles

//more objects on city/town continent scale(maybe countries)

//clean up growth with make/break sphere, circle, rect, and cube

//make unit prefrencerance a saved value

//cum text for skyscraper : cum text for single macro

//powerplants factories

//anal vore test "ring seals to the ground and pulls in" usde weight of rear to pull in more mass
