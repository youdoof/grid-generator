// Partial Constructor
function Partial(rhythm, accent, flam, drag, buzz) {
	this.rhythm = rhythm;
	this.accent = accent;
	this.flam = flam;
	this.drag = drag;
	this.buzz = buzz;
}

// Partial Methods
Partial.prototype.getBeat = function () {
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
		for (var i = 0; i < this.flam.length; i++) {
			notes[this.flam[i]].addModifier(0, newFlam());
		}
	}

	if (this.accent !== NONE) {
		for (var i = 0; i < this.accent.length; i++) {
			notes[this.accent[i]].addArticulation(0, newAccent());
		}
	}

	if (this.drag !== NONE) {
		for (var i = 0; i < this.drag.length; i++) {
			notes[this.drag[i]].addArticulation(0, newDrag());
		}
	}

	if (this.buzz !== NONE) {
		for (var i = 0; i < this.buzz.length; i++) {
			notes[this.buzz[i]].addModifier(0, newBuzz());
		}
	}

	return notes;
}
Partial.prototype.getFourCounts = function () {
	var fourCounts = [
		this.getBeat(),
		this.getBeat(),
		this.getBeat(),
		this.getBeat()
	];
	return fourCounts.reduce((acc, val) => acc.concat(val), []);
}
Partial.prototype.getTwoCounts = function () {
	var twoCounts = [
		this.getBeat(),
		this.getBeat()
	];
	return twoCounts.reduce((acc, val) => acc.concat(val), []);
}
Partial.prototype.getOneCount = function () {
	return this.getBeat();
}

// Measure Constructor
function Measure(partials) {
	if (partials.length = FOUR_PARTIALS_MEASURE_COUNT) {
		this.p1 = partials[0];
		this.p2 = partials[1];
		this.p3 = partials[2];
		this.p4 = partials[3];
	} else if (partials.length = THREE_PARTIALS_MEASURE_COUNT) {
		this.p1 = partials[0];
		this.p2 = partials[1];
		this.p3 = partials[2];
	} else if (partials.length = TWO_PARTIALS_MEASURE_COUNT) {
		this.p1 = partials[0];
		this.p2 = partials[1];
	}
}
Measure.prototype.getFours = function () {
	// Create measures full of the 4 part of 4-2-1
}
Measure.prototype.getTwos = function () {
	// Create measures full of the 2 part of 4-2-1
}
Measure.prototype.getOnes = function () {
	// Create measures full of the 1 part of 4-2-1
}
