var VF = Vex.Flow;

// Create SVG renderer and attach it to the div element named "bar"
var div = document.getElementById("bar");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Size our svg
renderer.resize(800, 800);

// Get drawing context
var context = renderer.getContext();

// Create a stave at position 10, 40, of width 700 on the canvas
var stave = new VF.Stave(10, 40, 700);

// Add a clef and time signature
stave.addClef("percussion").addTimeSignature("4/4");

// Connect it to the rendering context and draw
stave.setContext(context).draw();

// 16th accent on 1
var notes1 = [
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}).
	addArticulation(0, new VF.Articulation("a>").setPosition(3)),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1}),
	new VF.StaveNote({keys: ["c/5"], duration: "16", stem_direction: 1})
];

// 16th accent on "e"
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

var beams = [
	new VF.Beam(notes1),
	new VF.Beam(notes2),
	new VF.Beam(notes3),
	new VF.Beam(notes4),
	new VF.Beam(notes5)
]

var all_notes = notes1.concat(notes2).concat(notes3).concat(notes4).concat(notes5);
VF.Formatter.FormatAndDraw(context, stave, all_notes);
beams.forEach(function(b) {b.setContext(context).draw()});