var VF = Vex.Flow;

// Constants for stave size and locations
var ROW_ONE = 0;
var ROW_TWO = 125;
var OFFSET = 10;
var MEASURE_SIZE = 500;
var MEASURE_ONE = OFFSET;
var MEASURE_TWO = MEASURE_SIZE + OFFSET;
var MEASURE_THREE = MEASURE_SIZE * 2 + OFFSET;

// Create SVG renderer and attach it to the div element named "renderSpace"
var div = document.querySelector("#renderSpace");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg
renderer.resize(1520, 300);

// Get drawing context
var context = renderer.getContext();

// Create a stave at position 10, 40, of width 300 on the canvas
var stave01 = new VF.Stave(MEASURE_ONE, ROW_ONE, MEASURE_SIZE);
var stave02 = new VF.Stave(MEASURE_TWO, ROW_ONE, MEASURE_SIZE);
var stave03 = new VF.Stave(MEASURE_THREE, ROW_ONE, MEASURE_SIZE);

var stave11 = new VF.Stave(MEASURE_ONE, ROW_TWO, MEASURE_SIZE);
var stave12 = new VF.Stave(MEASURE_TWO, ROW_TWO, MEASURE_SIZE);
var stave13 = new VF.Stave(MEASURE_THREE, ROW_TWO, MEASURE_SIZE);

// Add clefs and time signatures
stave01.addClef("percussion").addTimeSignature("4/4");
stave11.addClef("percussion").addTimeSignature("4/4");

// Connect staves to the rendering context and draw
stave01.setContext(context).draw();
stave02.setContext(context).draw();
stave03.setContext(context).draw();
stave11.setContext(context).draw();
stave12.setContext(context).draw();
stave13.setContext(context).draw();

/*
	Measure 1, 16th notes
*/
// Populate 4 counts of 16th notes
var m01 = sixteenth().concat(sixteenth()).concat(sixteenth()).concat(sixteenth());
// Setup Beams and Stem Directions
var b01 = VF.Beam.generateBeams(m01, {stem_direction: 1});
// Format and Draw StaveNotes
VF.Formatter.FormatAndDraw(context, stave01, m01);
// Draw beams
b01.forEach(function(b) {b.setContext(context).draw()});

/*
	Measure 2, Triplets
*/
// Populate 4 counts of triplets
var m02 = triplet().concat(triplet()).concat(triplet()).concat(triplet());

// Setup tuplets
var tuplets = [
	[0,3],
	[3,6],
	[6,9],
	[9,12]
].map(function(i){
	return new VF.Tuplet(m02.slice(i[0], i[1]));
});

// Setup Beams
var b02 = VF.Beam.generateBeams(m02, {stem_direction: 1});

VF.Formatter.FormatAndDraw(context, stave02, m02);

// Draw beams
b02.forEach(function(b) {b.setContext(context).draw()});

// Draw tuplets
tuplets.forEach(function(t){
	t.setContext(context).draw();
});


// This code coupled with css entry for SVG makes the svg scale and respond to the
// webpage changing size and shape
var svg = document.querySelector('svg');
// Adding a viewBox attribute with the width and height same as the size of the file
svg.setAttribute("viewBox", "0 0 1520 300");
