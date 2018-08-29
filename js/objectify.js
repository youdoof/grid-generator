// Variation Constructor
function Variation(rhythm, accent, flam, drag) {
    this.rhythm = rhythm;
    this.accent = accent;
    this.flam = flam;
    this.drag = drag;
}

Variation.prototype.getBeat = function() {
    var notes;

	if (this.rhythm === SIXTEENTH) {
		notes = [
			createNote("16"),
			createNote("16"),
			createNote("16"),
			createNote("16")
		];
	} else if (this.rhythm === TRIPLET) {
		notes = [
			createNote("8"),
			createNote("8"),
			createNote("8")
		];
	} else if (this.rhythm === EIGHTH) {
		notes = [
			createNote("8"),
			createNote("8")
		];
	}

	if (this.flam !== NONE) {
		notes[this.flam].addModifier(0, addFlam());
	}

	if (this.accent !== NONE) {
		notes[this.accent].addArticulation(0, addAccent());
	}

	if (this.drag !== NONE) {
		notes[this.drag].addArticulation(0, newTremolo());
	}

	return notes;
}
Variation.prototype.getFourCounts = function() {

}
