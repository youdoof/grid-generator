var VF = Vex.Flow;

// Constants for stave size and locations
var MEASURE_WIDTH = 600;
var MEASURE_HEIGHT = 90;

// Bar Lengths, related to 2, 3, and 4 variations
var EIGHT_BARS = 8;
var NINE_BARS = 9;
var FOUR_BARS = 4;

// Partials for creating beats
var NONE = -1;
var FIRST_PARTIAL = 0;
var SECOND_PARTIAL = 1;
var THIRD_PARTIAL = 2;
var FOURTH_PARTIAL = 3;

// Rhythm Constants
var SIXTEENTH = 0;
var TRIPLET = 1;
var EIGHTH = 2;

function createContexts(number) {
	var contexts = [];
	for (i = 1; i <= number; i++) {
		var temp = new VF.Renderer(
			document.querySelector(`#measure${i}`),
			VF.Renderer.Backends.SVG
		);
		temp.resize(MEASURE_WIDTH, MEASURE_HEIGHT);
		contexts.push(temp);
	}
	return contexts;
}

function createContext(divID) {
	var d = document.querySelector(divID);
	var r = new VF.Renderer(d, VF.Renderer.Backends.SVG);
	if (divID === "#measure9") {
		r.resize(MEAS_WIDTH_TRIP, MEASURE_HEIGHT);
	} else {
		r.resize(MEASURE_WIDTH, MEASURE_HEIGHT);
	}
	return r.getContext();
}

function createStaves(number) {
	var staves = [];
	for (var i = 0; i < number; i++) {
		staves.push(new VF.Stave(0, 0, MEASURE_WIDTH));
	}
	return staves;
}

function createRepeats(staves) {
	if (staves.length === EIGHT_BARS) {
		staves[4].setBegBarType(VF.Barline.type.REPEAT_BEGIN);
		staves[5].setEndBarType(VF.Barline.type.REPEAT_END);
		staves[6].setBegBarType(VF.Barline.type.REPEAT_BEGIN);
		staves[7].setEndBarType(VF.Barline.type.REPEAT_END);
	} else if (staves.length === FOUR_BARS) {
		for (var i = 0; i < staves.length; i++) {
			staves[i].setBegBarType(VF.Barline.type.REPEAT_BEGIN);
			staves[i].setEndBarType(VF.Barline.type.REPEAT_END);
		}
	}
}

function setContextAndDraw(obj, ctx) {
	for (var i = 0; i < obj.length; i++) {
		obj[i].setContext(ctx[i]).draw();
	}
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
	var flam = new VF.GraceNote({keys: ["c/5"], duration: "8", slash: false });
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
		notes[obj.drag].addArticulation(0, new VF.Tremolo(1));
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
