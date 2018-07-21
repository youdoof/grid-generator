var VF = Vex.Flow;

// Object to store information about the workspace.
var WorkspaceInformation = {
	div: document.getElementById("foo"),
	canvasWidth: 500,
	canvasHeight: 500
};

// Create a renderer with SVG
var renderer = new VF.Renderer(
	WorkspaceInformation.div,
	VF.Renderer.Backends.SVG
);

// Use the renderer to give the dimensions to the SVG
renderer.resize(WorkspaceInformation.canvasWidth, WorkspaceInformation.canvasHeight);

// Expose the context of the renderer
var context = renderer.getContext();

// Give Style to the SVG
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

/*
	CREATING A NEW STAVE
*/
var stave = new VF.Stave(10, 40, 400);
stave.addClef("treble").addTimeSignature("4/4");
stave.setContext(context).draw();

/*
	DRAWING NOTES
*/
var notes = [
	// A quarter-note C.
	new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
	// D.
	new VF.StaveNote({clef: "treble", keys: ["d/4"], duration: "q" }),
	// Quarter Rest, b/4 sets the vertical position of the rest. "qr" being quarter rest.
	new VF.StaveNote({clef: "treble", keys: ["b/4"], duration: "qr" }),
	// C Major Chord.
	new VF.StaveNote({clef: "treble", keys: ["c/4", "e/4", "g/4"], duration: "q" }),
];

notes[0].addArticulation(0, new VF.Tremolo(1).setPosition(VF.Modifier.Position.ABOVE));

// Create a voice in 4/4 and add the notes from above.
var voice = new VF.Voice({
	num_beats:4,
	beat_value: 4
});
voice.addTickables(notes);

// Format and justify the notes to 400 pixels.
var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 400);

// Render Voice
voice.draw(context, stave);