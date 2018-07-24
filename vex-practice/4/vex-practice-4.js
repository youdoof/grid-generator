var VF = Vex.Flow;

// Constants for stave size and locations
var ROW_ONE = 0;
var ROW_TWO = 125;
var OFFSET = 10;
var MEASURE_SIZE = 400;
var MEASURE_ONE = OFFSET;
var MEASURE_TWO = MEASURE_SIZE + OFFSET;
var MEASURE_THREE = MEASURE_SIZE * 2 + OFFSET;

// Create SVG renderer and attach it to the div element named "bar"
var div = document.getElementById("bar");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg
renderer.resize(1200, 300);

// Get drawing context
var context = renderer.getContext();

// Create a stave at position 10, 40, of width 300 on the canvas
var stave01 = new VF.Stave(MEASURE_ONE, ROW_ONE, MEASURE_SIZE);
var stave02 = new VF.Stave(MEASURE_TWO, ROW_ONE, MEASURE_SIZE);
var stave03 = new VF.Stave(MEASURE_THREE, ROW_ONE, MEASURE_SIZE);

var stave11 = new VF.Stave(MEASURE_ONE, ROW_TWO, MEASURE_SIZE);
var stave12 = new VF.Stave(MEASURE_TWO, ROW_TWO, MEASURE_SIZE);
var stave13 = new VF.Stave(MEASURE_THREE, ROW_TWO, MEASURE_SIZE);

// Add a clef and time signature
stave01.addClef("percussion").addTimeSignature("4/4");
stave11.addClef("percussion").addTimeSignature("4/4");

// Connect staves to the rendering context and draw
stave01.setContext(context).draw();
stave02.setContext(context).draw();
stave03.setContext(context).draw();
stave11.setContext(context).draw();
stave12.setContext(context).draw();
stave13.setContext(context).draw();

// 16th accent on 1
var notes1 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1})
];

var notes11 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1})
];

// 16th accent on "e"
// createNote("16").addArticulation(0, addAccent());
var notes2 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1})
];

// 16th accent on "&"
var notes3 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1})
];

// Sixteenth accent on "a"
var notes4 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3))
];

// Triplet
var notes5 = [
	new VF.StaveNote({keys: ["c/5"], duration: "8", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "8", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "8", stem_direction: 1})
]

// var beams = [
// 	new VF.Beam(notes1),
// 	new VF.Beam(notes2),
// 	new VF.Beam(notes3),
// 	new VF.Beam(notes4)
// ]

// Issue here being shallow copies for StaveNote objects. See vex practice 5.
var m01 = notes1.concat(notes1).concat(notes1).concat(notes1);

var beams = VF.Beam.generateBeams(m01, {stem_direction: 1});
var beamer = VF.Beam.generateBeams(notes11, {stem_direction: 1});

VF.Formatter.FormatAndDraw(context, stave01, m01);
VF.Formatter.FormatAndDraw(context, stave11, notes11);

beams.forEach(function(b) {b.setContext(context).draw()});
beamer.forEach(function(b) {b.setContext(context).draw()});
