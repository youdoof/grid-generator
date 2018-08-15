var VF = Vex.Flow;

// Constants for stave size and locations
// 16TH NOTE
var MEASURE_WIDTH = 600;
var MEASURE_HEIGHT = 90;

// triplet
var MEAS_WIDTH_TRIP = 450;

// Get drawing context

// var contexts = createContexts(EIGHT_BARS);

var context1 = createContext("#measure1");
var context2 = createContext("#measure2");
var context3 = createContext("#measure3");
var context4 = createContext("#measure4");
var context5 = createContext("#measure5");
var context6 = createContext("#measure6");
var context7 = createContext("#measure7");
var context8 = createContext("#measure8");
// var context9 = createContext("#measure9");

// var staves = createStaves(EIGHT_BARS);

// Create a stave of width 90 on the canvas
var stave01 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave02 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave03 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave04 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave05 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave06 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave07 = new VF.Stave(0, 0, MEASURE_WIDTH);
var stave08 = new VF.Stave(0, 0, MEASURE_WIDTH);
// var stave09 = new VF.Stave(0, 0, MEAS_WIDTH_TRIP);

// Repeats ?
stave05.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
stave06.setEndBarType(VF.Barline.type.REPEAT_END);
stave07.setBegBarType(VF.Barline.type.REPEAT_BEGIN);
stave08.setEndBarType(VF.Barline.type.REPEAT_END);

// createRepeats(staves);

// Connect staves to the rendering context and draw
stave01.setContext(context1).draw();
stave02.setContext(context2).draw();
stave03.setContext(context3).draw();
stave04.setContext(context4).draw();
stave05.setContext(context5).draw();
stave06.setContext(context6).draw();
stave07.setContext(context7).draw();
stave08.setContext(context8).draw();
// stave09.setContext(context9).draw();

// setContextAndDraw(staves, contexts);

/*
	These variations should be customizable by the GUI on the webpage.
	That's a plan for the future. Press buttons, check checkboxes.
	ACHIEVE GREATNESS.

	Note: this only works for the 16th note version, which has 4 variants.
	the triplet version would have only 3 variants, so need to get that.
*/
var variation1 = {
	rhythm: SIXTEENTH,
	accent: SECOND_PARTIAL,
	flam: FIRST_PARTIAL,
	drag: SECOND_PARTIAL
}

var variation2 = {
	rhythm: SIXTEENTH,
	accent: SECOND_PARTIAL,
	flam: SECOND_PARTIAL,
	drag: THIRD_PARTIAL
}

var variation3 = {
	rhythm: SIXTEENTH,
	accent: SECOND_PARTIAL,
	flam: THIRD_PARTIAL,
	drag: FOURTH_PARTIAL
}

var variation4 = {
	rhythm: SIXTEENTH,
	accent: SECOND_PARTIAL,
	flam: FOURTH_PARTIAL,
	drag: FIRST_PARTIAL
}

var trip1 = {
	rhythm: TRIPLET,
	accent: SECOND_PARTIAL,
	flam: NONE,
	drag: SECOND_PARTIAL
}

/*
	MEASURE 01
*/
var m01 = getFourCounts(variation1);
var b01 = VF.Beam.generateBeams(m01, {stem_direction: 1});
VF.Formatter.FormatAndDraw(context1, stave01, m01);
b01.forEach(function(b) {b.setContext(context1).draw()});
// setContextAndDraw(b01, contexts[0])

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

/*
	MEASURE 09
	TRIPLET TOWN
*/
//
// var m09 = getFourCounts(trip1);
// var b09 = [
// 	[0, 3],
// 	[3, 6],
// 	[6, 9],
// 	[9, 12]
// ].map(function(n) {
// 	return new VF.Beam(m09.slice(n[0], n[1]));
// });
// var t09 = [
// 	[0,3],
// 	[3,6],
// 	[6,9],
// 	[9,12]
// ].map(function(n) {
// 	return new VF.Tuplet(m09.slice(n[0], n[1]));
// });
// // var simpleTriplet = new Vex.Flow.Tuplet(notes.slice(14,17));
// VF.Formatter.FormatAndDraw(context9, stave09, m09);
// b09.forEach(function(b) {b.setContext(context9).draw()});
// t09.forEach(function(t) {t.setContext(context9).draw()});


var btn = document.querySelector("#generateBtn");
// btn.onclick(dingus());


// This code coupled with css entry for SVG makes the svg scale and respond to the
// webpage changing size and shape
var svg = document.querySelectorAll('svg');
svg.forEach(function(f){
	f.setAttribute("viewBox", `0 0 ${MEASURE_WIDTH} ${MEASURE_HEIGHT}`);
})

// document.querySelector('div #measure9 svg').setAttribute("viewBox", `0 0 ${MEAS_WIDTH_TRIP} ${MEASURE_HEIGHT}`);

// Pass in querySelectorAll of measures.
function deleteBar(q) {
	for (i = 0; i < q.length; i++) {
		while (q[i].hasChildNodes()) {
			q[i].removeChild(q[i].lastChild);
		}
	}
}
