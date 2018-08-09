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

// .addModifier(0, addFlam())
function addFlam() {
	var flam = new VF.GraceNote({keys: ["c/5"], duration: "8", slash: true });
	return new VF.GraceNoteGroup([flam]);
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

	if (obj.flam !== -1) {
		notes[obj.flam].addModifier(0, addFlam());
	}
	
	if (obj.accent !== -1) {
		notes[obj.accent].addArticulation(0, addAccent());
	}

	if (obj.drag !== -1) {
		notes[obj.drag].addArticulation(0, new VF.Tremolo(1).setYShift(-100));
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

// Work in progress here.
function fillBar(obj, mods) {
	var bars = [];
	for (var i = 0; i < mods.length; i++) {
		bars.push(getFourCounts(mods[i]));
	}
	return bars;
}


