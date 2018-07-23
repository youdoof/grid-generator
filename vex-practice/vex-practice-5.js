var VF = Vex.Flow;

// Constants for stave size and locations
var ROW_ONE = 0;
var ROW_TWO = 125;
var OFFSET = 10;
var MEASURE_SIZE = 500;
var MEASURE_ONE = OFFSET;
var MEASURE_TWO = MEASURE_SIZE + OFFSET;
var MEASURE_THREE = MEASURE_SIZE * 2 + OFFSET;

// Create SVG renderer and attach it to the div element named "bar"
var div = document.getElementById("bar");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg
renderer.resize(1600, 300);

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

// 16th >e&a
var d00 = [
	createNote("16").addArticulation(0, addAccent()),
	createNote("16"),
	createNote("16"),
	createNote("16")
];

// 16th 1>&a
var d01 = [
	createNote("16"),
	createNote("16").addArticulation(0, addAccent()),
	createNote("16"),
	createNote("16")
];

// 16th 1e>a
var d02 = [
	createNote("16"),
	createNote("16"),
	createNote("16").addArticulation(0, addAccent()),
	createNote("16")
];

// 16th 1e&>
var d03 = [
	createNote("16"),
	createNote("16"),
	createNote("16"),
	createNote("16").addArticulation(0, addAccent())
];

// Measure 1
var m01 = sixteenth();
var b01 = VF.Beam.generateBeams(m01, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context, stave01, m01);
b01.forEach(function(b) {b.setContext(context).draw()});

// Measure 2