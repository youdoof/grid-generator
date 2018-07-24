var VF = Vex.Flow;

// Constants for stave size and locations
var MEASURE_WIDTH = 500;
var MEASURE_HEIGHT = 300;

// Create SVG renderer and attach it to the div element named "renderSpace"
// var div1 = document.querySelector("#measure1");
// var renderer1 = new VF.Renderer(div1, VF.Renderer.Backends.SVG);

// Size our svg
// renderer1.resize(MEASURE_WIDTH, MEASURE_HEIGHT);

// Get drawing context
// var context1 = renderer1.getContext();
var context1 = contextMaker("#measure1");
var context2 = contextMaker("#measure2");
var context3 = contextMaker("#measure3");

// Create a stave at position 10, 40, of width 300 on the canvas
var stave01 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave02 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave03 = new VF.Stave(0, 0, MEASURE_WIDTH);

// Add clefs and time signatures
stave01.addClef("percussion").addTimeSignature("4/4");

// Connect staves to the rendering context and draw
stave01.setContext(context1).draw();
stave02.setContext(context2).draw();
stave03.setContext(context3).draw();

/*
	Measure 1, 16th notes
*/


// This code coupled with css entry for SVG makes the svg scale and respond to the
// webpage changing size and shape
var svg = document.querySelectorAll('svg');
svg.forEach(function(f){
	f.setAttribute("viewBox", "0 0 500 300");
})
