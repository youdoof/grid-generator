var VF = Vex.Flow;

// Object to store information about the workspace.
var WorkspaceInformation = {
	div: document.getElementById("display"),
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


// ************************************************************************************
// ************************************************************************************
// ************************************************************************************

var notes = [
	new VF.StaveNote({keys: ["c/4"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(VF.Modifier.Position.ABOVE)),
	new VF.StaveNote({keys: ["c/4"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/4"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/4"], duration: "16", stem_direction: 1}),
	];

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


// ************************************************************************************
// ************************************************************************************
// ************************************************************************************


// Create pool of variations
var EASY_POOL = ["Xxxx", "xXxx", "xxXx", "xxxX", "Xxx", "xXx", "xxX"];
var MODERATE_POOL = ["a", "b", "c", "d", "e", "f", "g"];
var DIFFICULT_POOL = ["a", "b", "c", "d", "e", "f", "g"];



// Get random variation from pool of variations
// Returns variation
function getEasyVariation() {
	return Math.floor(Math.random() * VARIATION_POOL.length);
}

function getModerateVariation() {
	return Math.floor(Math.random() * MODERATE_POOL.length);
}

function getDifficultVariation() {
	return Math.floor(Math.random() * DIFFICULT_POOL.length);
}
