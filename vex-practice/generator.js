var VF = Vex.Flow;

// Partials for creating beats.
var NONE = -1;
var FIRST_PARTIAL = 0;
var SECOND_PARTIAL = 1;
var THIRD_PARTIAL = 2;
var FOURTH_PARTIAL = 3;

var SIXTEENTH = 0;
var TRIPLET = 1;
var EIGHTH = 2;

function contextMaker(divID) {
	var d = document.querySelector(divID);
	var r = new VF.Renderer(d, VF.Renderer.Backends.SVG);
	r.resize(MEASURE_WIDTH, MEASURE_HEIGHT);
	return r.getContext();
}

// new VF.StaveNote({keys: ["c/5"], duration: "16"})
function createNote(duration) {
	return new VF.StaveNote({keys: ["c/5"], duration: duration});
}

// .addArticulation(0, addAccent())
function addAccent() {
	return new VF.Articulation("a>").setPosition(3);
}

// .addModifier(0, addGraceNote())
function addGraceNote() {
	var gracenote = new VF.GraceNote({keys: ["c/5"], duration: "8", slash: true });
	return new VF.GraceNoteGroup([gracenote]);
}

// Work in progress here.
function getBeat(obj) {
	var notes;

	if (obj.rhythm === SIXTEENTH) {
		notes = [
			createNote("16"),
			createNote("16"),
			createNote("16"),
			createNote("16")
		];
	} else if (obj.rhythm === TRIPLET) {
		notes = [
			createNote("8"),
			createNote("8"),
			createNote("8")
		];
	} else if (obj.rhythm === EIGHTH) {
		notes = [
			createNote("8"),
			createNote("8")
		];
	}

	if (obj.graceNote !== -1) {
		notes[obj.graceNote].addModifier(0, addGraceNote());
	}
	
	if (obj.accent !== -1) {
		notes[obj.accent].addArticulation(0, addAccent());
	}

	return notes;
}

function getFourCounts(obj) {
	var fourCounts = [
		getBeat(obj),
		getBeat(obj),
		getBeat(obj),
		getBeat(obj)
	];
	return fourCounts.reduce((acc, val) => acc.concat(val), []);
}

function getTwoCounts(obj) {
	var twoCounts = [
		getBeat(obj),
		getBeat(obj)
	];
	return twoCounts.reduce((acc, val) => acc.concat(val), []);
}

function getOneCount(obj) {
	return getBeat(obj);
}

function getRandomVariation() {
	var obj = {
		rhythm: SIXTEENTH,
		accent: getRandomVariant([FIRST_PARTIAL, SECOND_PARTIAL, THIRD_PARTIAL, FOURTH_PARTIAL]),
		graceNote: getRandomVariant([FIRST_PARTIAL, SECOND_PARTIAL, THIRD_PARTIAL, FOURTH_PARTIAL])
	}
	return obj;
}

// From MDN, Random Generator
function getRandomVariant(pass) {
  min = 0;
  max = pass.length;
  return pass[Math.floor(Math.random() * (max - min + 1)) + min]; //The maximum is inclusive and the minimum is inclusive 
}