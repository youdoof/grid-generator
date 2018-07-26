var VF = Vex.Flow;

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

// Create 4 new StaveNotes
// grace: number 0 to 3, which subdivision to place grace note
// accent: number 0 to 3, which "" to place accent
function sixteenth(grace, accent) {
	var notes = [
		createNote("16"),
		createNote("16"),
		createNote("16"),
		createNote("16")
	];
	if (grace !== -1) {
		notes[grace].addModifier(0, addGraceNote());
	}
	if (accent !== -1) {
		notes[accent].addArticulation(0, addAccent());
	}
	return notes;
}

// Create 3 new StaveNotes
function triplet() {
	return [
		createNote("8"),
		createNote("8"),
		createNote("8")
	];
}

/*
	Create first four counts of the grid, one variation at a time

	type: 0 - 16ths, 1 - triplet
	mods: [graceNote, accent] 
*/
function getFourCounts(type, mods) {
	var notes;
	if (type === 0) {
		notes = [
			sixteenth(mods[0], mods[1]),
			sixteenth(mods[0], mods[1]),
			sixteenth(mods[0], mods[1]),
			sixteenth(mods[0], mods[1])
		];
	} else {
		notes = [
			triplet(),
			triplet(),
			triplet()
		];
	}
	return notes.reduce((acc, val) => acc.concat(val), []);
}

// Not sure if this will work yet...
function getTwoCounts() {

}
