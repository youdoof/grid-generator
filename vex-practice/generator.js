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

function addSouperGraceNote(StaveNote) {
	StaveNote.addModifier(0, addGraceNote);
}

// Create 4 new StaveNotes
function sixteenth() {
	return [
		createNote("16"),
		createNote("16"),
		createNote("16"),
		createNote("16")
	];
}

// Create 3 new StaveNotes
function triplet() {
	return [
		createNote("8"),
		createNote("8"),
		createNote("8")
	];
}


// Create first four counts of the grid, one variation at a time
function getFourCounts() {

}

// Not sure if this will work yet...
function getTwoCounts() {

}
