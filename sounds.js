let last_used = {};

let sounds = {
  "crush": [["Thump.", "Thoomp."], ["Crunch."], ["Crrruunch."], ["CRUNCH!"], ["CRRRUNNCH!"], ["SKRRRRUNCH!"], ["SKRRRRRRRSMASH!"]],
  "swallow": [["Ulp.", "Glp.", "Slurp."], ["Glrph.", "Glurk."], ["Gluuuurrkph!", "Glurp - GLK."],["GLRP!", "GULP!", "GLUK!"],["GLRRRRPKH!", "GLUUUURK!"],["GLUUUUURRPKH!", "GLOOOORPH-GLK!"]],
  "drip":
  [["Drip."],["Dribble"],["Drip-sploosh"],["Dribble-SPLOOSH!"],["SPLOOOOOSH!!"]],
  "liquid": [["Sploosh."],["Gush!"],["SPLOOSH!"],["SPLOOSH!"],["SPLOOOOOOSH!"]],
  "insert": [["Slp.", "Shlk."],["Shlp.", "Shlrp."],["Shlllp."],["SHLP!", "SQUELCH!"],["SHLLLLRP!"]],
  "drop": [["Thump."],["Thump!"],["Splat."],["Splat!"],["SPLAT!"]],
  "belch": [["Burp.", "Urp."],["Urph.", "Burph."],["Urrrrrph."],["UuuuuuuRRRRRPPHHHhhhh."],["UUUURRRRPHH!"],["BUUUURRRRRRRRPPPHHH!"]],
  "fart":
  [["Pft."],["Pffft."],["Pfffffbt."],["Frrrrrrrt."],["FRRRRRRRRPBBT!"]],
  "scat":
  [["Clench."],["Squeeeeeze."],["Squeeeeeeeeeeeze."],["Sqlllllch."],["SQLLLLLLCH!"]],
  "digest":
  [["Grrgle."],["Grrrrgle"],["Grrrrlglorp."],["GrrrrGLRRRLPH!"],["GRRRRRLGPRLHK!"]],
  "goo":
  [["Splat."], ["Squish."], ["Squish!"], ["SQLCH!"], ["SQLLLLRCH!"], ["SQQQQUEEEEELLCH!"]],
  "vomit":
  [["Hurk."], ["Hurrk."], ["Bleugh."], ["Bleugh!"], ["Bleeeugh!"], ["BLEEEUGHK!"]],
  "breath":
  [["Woosh."],["Fwoosh."],["FWOOSH."],["FWOOSH!"],["FWOOOOOOSH!"]],
  "chew":
  [["Snap.", "Crack."],["Crunch."],["Crack!"],["CRUNCH!"],["CRRRUNCH!"]],
  "magic":
  [["Zap."],["Zap!"],["Fwoosh!"]]
};

function pickByMass(name, mass) {
  let list = sounds[name];
  let index = Math.floor(Math.log10(mass/100)/2);
  index = Math.max(index, 0);

  choice = index < list.length ? list[index] : list[list.length-1];

  let subindex = Math.floor(Math.random() * Math.floor(choice.length));

  // less likely to repeat
  if (last_used[name] != undefined && last_used[name] == subindex) {
    subindex = Math.floor(Math.random() * Math.floor(choice.length));
  }

  last_used[name] = subindex;

  return choice[subindex];
}

function getSound(name, mass) {
  return "<i>" + pickByMass(name,mass) + "</i>";
}
