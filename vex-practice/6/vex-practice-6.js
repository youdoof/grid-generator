var VF = Vex.Flow;

// Constants for stave size and locations
var MEASURE_WIDTH = 600;
var MEASURE_HEIGHT = 150;

// Get drawing context
var context1 = contextMaker("#measure1");
var context2 = contextMaker("#measure2");
var context3 = contextMaker("#measure3");
var context4 = contextMaker("#measure4");
var context5 = contextMaker("#measure5");
var context6 = contextMaker("#measure6");
var context7 = contextMaker("#measure7");
var context8 = contextMaker("#measure8");
var context9 = contextMaker("#measure9");

// Create a stave at position 10, 40, of width 150 on the canvas
var stave01 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave02 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave03 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave04 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave05 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave06 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave07 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave08 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave09 = new VF.Stave(0, 0, MEASURE_WIDTH);

// Repeats ?
stave05.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
stave06.setEndBarType(VF.Barline.type.REPEAT_END);
stave07.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
stave08.setEndBarType(VF.Barline.type.REPEAT_END);

// Add clefs and time signatures
// stave01.addClef("percussion").addTimeSignature("4/4");
// stave04.addClef("percussion").addTimeSignature("4/4");
// stave07.addClef("percussion").addTimeSignature("4/4");

// Connect staves to the rendering context and draw
stave01.setContext(context1).draw();
stave02.setContext(context2).draw();
stave03.setContext(context3).draw();
stave04.setContext(context4).draw();
stave05.setContext(context5).draw();
stave06.setContext(context6).draw();
stave07.setContext(context7).draw();
stave08.setContext(context8).draw();
stave09.setContext(context9).draw();

/*
	These variations should be customizable by the GUI on the webpage.
	That's a plan for the future. Press buttons, check checkboxes.
	ACHIEVE GREATNESS.

	Note: this only works for the 16th note version, which has 4 variants.
	the triplet version would have only 3 variants, so need to get that.
*/
var variation1 = {
	rhythm: SIXTEENTH,
	accent: FIRST_PARTIAL,
	graceNote: FOURTH_PARTIAL
}

var variation2 = {
	rhythm: SIXTEENTH,
	accent: FIRST_PARTIAL,
	graceNote: THIRD_PARTIAL
}

var variation3 = {
	rhythm: SIXTEENTH,
	accent: FIRST_PARTIAL,
	graceNote: SECOND_PARTIAL,
	drag:
	buzz:
}

var variation4 = {
	rhythm: SIXTEENTH,
	accent: FIRST_PARTIAL,
	graceNote: FIRST_PARTIAL
}

/*
	MEASURE 01
*/
var m01 = getFourCounts(variation1);
var b01 = VF.Beam.generateBeams(m01, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context1, stave01, m01);
b01.forEach(function(b) {b.setContext(context1).draw()});

/*
	MEASURE 02
*/
var m02 = getFourCounts(variation2);
var b02 = VF.Beam.generateBeams(m02, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context2, stave02, m02);
b02.forEach(function(b) {b.setContext(context2).draw()});

/*
	MEASURE 03
*/
var m03 = getFourCounts(variation3);
var b03 = VF.Beam.generateBeams(m03, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context3, stave03, m03);
b03.forEach(function(b) {b.setContext(context3).draw()});

/*
	MEASURE 04
*/
var m04 = getFourCounts(variation4);
var b04 = VF.Beam.generateBeams(m04, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context4, stave04, m04);
b04.forEach(function(b) {b.setContext(context4).draw()});

/*
	MEASURE 05
*/
var m05 = getTwoCounts(variation1).concat(getTwoCounts(variation2));
var b05 = VF.Beam.generateBeams(m05, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context5, stave05, m05);
b05.forEach(function(b) {b.setContext(context5).draw()});

/*
	MEASURE 06
*/
var m06 = getTwoCounts(variation3).concat(getTwoCounts(variation4));
var b06 = VF.Beam.generateBeams(m06, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context6, stave06, m06);
b06.forEach(function(b) {b.setContext(context6).draw()});

/*
	MEASURE 07
*/
var m07 = getOneCount(variation1).
		concat(getOneCount(variation2)).
		concat(getOneCount(variation3)).
		concat(getOneCount(variation4));
var b07 = VF.Beam.generateBeams(m07, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context7, stave07, m07);
b07.forEach(function(b) {b.setContext(context7).draw()});

/*
	MEASURE 08
*/
var m08 = getOneCount(variation1).
		concat(getOneCount(variation2)).
		concat(getOneCount(variation3)).
		concat(getOneCount(variation4));
var b08 = VF.Beam.generateBeams(m08, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context8, stave08, m08);
b08.forEach(function(b) {b.setContext(context8).draw()});

// This code coupled with css entry for SVG makes the svg scale and respond to the
// webpage changing size and shape
var svg = document.querySelectorAll('svg');
svg.forEach(function(f){
	f.setAttribute("viewBox", "0 0 600 150");
})
