VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV named "foo"
var div = document.querySelector("#foo");
var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

var canvasDimensions = {
	width: 820,
	height: 300
};

// Configure the rendering context
renderer.resize(canvasDimensions.width, canvasDimensions.height);
var context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

/*

	Left Side Staves

*/

// Create a stave of width 400 at position x10, y40 on the SVG
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature
stave.addClef("percussion").addTimeSignature("12/8");

// Connect it to the rendering context & draw!
stave.setContext(context).draw();

var stave2 = new VF.Stave(10, 120, 400);
stave2.addClef("alto").addTimeSignature("12/8");
stave2.setContext(context).draw();

/*

	Right Side Staves

*/

var stave3 = new VF.Stave(420, 40, 400);
stave3.addClef("baritone-f").addTimeSignature("13/16");
stave3.setContext(context).draw();

var stave4 = new VF.Stave(420, 120, 400);
stave4.addClef("mezzo-soprano");
stave4.setContext(context).draw();


