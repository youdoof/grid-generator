'use strict';
var VF = Vex.Flow;

// Constants for # of measures across screen
var TWO_MEASURE_SPAN = 2;
var THREE_MEASURE_SPAN = 3;

// Constants for stave size and locations
var MAX_RESOLUTION_WIDTH = 1200;
var MEASURE_WIDTH_FOUR = MAX_RESOLUTION_WIDTH / TWO_MEASURE_SPAN;
var MEASURE_WIDTH_THREE = MAX_RESOLUTION_WIDTH / THREE_MEASURE_SPAN;
var MEASURE_WIDTH_TWO = MAX_RESOLUTION_WIDTH / TWO_MEASURE_SPAN;
var MEASURE_HEIGHT = 90;

// Bar Lengths, related to 2, 3, and 4 partials
var FOUR_PARTIALS_MEASURE_COUNT = 8;
var THREE_PARTIALS_MEASURE_COUNT = 9;
var TWO_PARTIALS_MEASURE_COUNT = 4;

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

// Setup Contexts for each measure on the page
function createContexts(number) {
	var contexts = [];
	for (i = 1; i <= number; i++) {
		var temp = new VF.Renderer(
			document.querySelector(`#measure${i}`),
			VF.Renderer.Backends.SVG
		);
		temp.resize(MEASURE_WIDTH_FOUR, MEASURE_HEIGHT);
		contexts.push(temp);
	}
	return contexts;
}

// Setup context for a measure
function createContext(divID) {
	var d = document.querySelector(divID);
	var r = new VF.Renderer(d, VF.Renderer.Backends.SVG);
	r.resize(MEASURE_WIDTH_FOUR, MEASURE_HEIGHT);
	return r.getContext();
}

// Setup measures *hardcoded for 4 partials right now*
function createStaves(number) {
	var staves = [];
	for (var i = 0; i < number; i++) {
		staves.push(new VF.Stave(0, 0, MEASURE_WIDTH_FOUR));
	}
	return staves;
}

// Place repeats in measures
function createRepeats(staves) {
	if (staves.length === FOUR_PARTIALS_MEASURE_COUNT) {
		staves[4].setBegBarType(VF.Barline.type.REPEAT_BEGIN);
		staves[5].setEndBarType(VF.Barline.type.REPEAT_END);
		staves[6].setBegBarType(VF.Barline.type.REPEAT_BEGIN);
		staves[7].setEndBarType(VF.Barline.type.REPEAT_END);
	} else if (staves.length === TWO_PARTIALS_MEASURE_COUNT) {
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
	return new VF.StaveNote({ keys: ["c/5"], duration: duration });
}

function rhythmSixteenth() {
	return [
		createNote("16"),
		createNote("16"),
		createNote("16"),
		createNote("16")
	];
}

function rhythmTriplet() {
	return [
		createNote("8"),
		createNote("8"),
		createNote("8")
	];
}

function rhythmEighth() {
	return [
		createNote("8"),
		createNote("8")
	];
}

// .addArticulation(0, newAccent())
function newAccent() {
	return new VF.Articulation("a>").setPosition(3);
}

// .addModifier(0, newFlam())
function newFlam() {
	var flam = new VF.GraceNote({ keys: ["c/5"], duration: "8", slash: false });
	return new VF.GraceNoteGroup([flam]);
}

function newDrag() {
	return new VF.Tremolo(1);
}

function newBuzz() {
	// Mordent.
	return new VF.Ornament("mordent");
}

// Work in progress here.
function getBeat(obj) {
	var notes;

	// There's a smarter way to do this
	if (obj.rhythm === SIXTEENTH) {
		notes = rhythmSixteenth();
	} else if (obj.rhythm === TRIPLET) {
		notes = rhythmTriplet();
	} else if (obj.rhythm === EIGHTH) {
		notes = rhythmEighth();
	}

	if (obj.flam !== NONE) {
		notes[obj.flam].addModifier(0, newFlam());
	}

	if (obj.accent !== NONE) {
		notes[obj.accent].addArticulation(0, newAccent());
	}

	if (obj.drag !== NONE) {
		notes[obj.drag].addArticulation(0, newDrag());
	}

	if (obj.buzz !== NONE) {
		notes[obj.buzz].addModifier(0, newBuzz());
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
/*
	Meat & Potatoes here.

	createMeasures puts together all of the notes to create each measure of
	the 4-2-1 grid. Trying my best to keep this thing modular and flexible.
*/
function createMeasures(partials) {
	var measures = [];
	// *** 4 *** //
	// Works for 2, 3, and 4 partials
	for (var i = 0; i < partials.length; i++) {
		measures.push(getFourCounts(partials[i]));
	}

	if (partials.length === FOUR_PARTIALS_MEASURE_COUNT / 2) {
		// *** 2 *** //
		for (var i = 0; i < partials.length; i = i + 2) {
			measures.push(getTwoCounts(partials[i]).
				concat(getTwoCounts(partials[i + 1])));
		}
		// *** 1 *** //
		for (var i = 0; i < 2; i++) {
			var temp = [];
			for (var j = 0; j < partials.length; j++) {
				temp.concat(getOneCount(partials[j]));
			}
			measures.push(temp);
		}

	} else if (partials.length === THREE_PARTIALS_MEASURE_COUNT / 3) {
		// Will find out soon how to do this.
	} else {
		// This for only 2 partials.
	}

	return measures;
}
