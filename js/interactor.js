'use strict';
var VF = Vex.Flow;

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

// var staves = createStaves(EIGHT_BARS);

// Create a stave of width 90 on the canvas
var stave01 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave02 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave03 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave04 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave05 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave06 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave07 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);
var stave08 = new VF.Stave(0, 0, MEASURE_WIDTH_FOUR);

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

// setContextAndDraw(staves, contexts);

/*
	These partials should be customizable by the GUI on the webpage.
	That's a plan for the future. Press buttons, check checkboxes.
	ACHIEVE GREATNESS.

	Note: this only works for the 16th note version, which has 4 variants.
	the triplet version would have only 3 variants, so need to get that.
*/

var stay = [FIRST_PARTIAL, SECOND_PARTIAL, FOURTH_PARTIAL];

var move = [FIRST_PARTIAL, SECOND_PARTIAL, THIRD_PARTIAL, FOURTH_PARTIAL];

var partial1 = new Partial(
	SIXTEENTH,
	[SECOND_PARTIAL, THIRD_PARTIAL],
	NONE,
	[FIRST_PARTIAL, FOURTH_PARTIAL],
	[SECOND_PARTIAL]
);

var partial2 = new Partial(
	SIXTEENTH,
	[FIRST_PARTIAL],
	NONE,
	[SECOND_PARTIAL],
	[THIRD_PARTIAL]
);

var partial3 = new Partial(
	SIXTEENTH,
	[FIRST_PARTIAL, FOURTH_PARTIAL],
	[THIRD_PARTIAL],
	NONE,
	NONE
);

var partial4 = new Partial(
	SIXTEENTH,
	[FOURTH_PARTIAL],
	NONE,
	[FOURTH_PARTIAL],
	[FIRST_PARTIAL]
);

var partials = [partial1, partial2, partial3, partial4];

// var measures = createMeasures(partials);

/*
	MEASURE 01
*/
var m01 = partial1.getFourCounts();
var b01 = VF.Beam.generateBeams(m01, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context1, stave01, m01);
b01.forEach(function (b) { b.setContext(context1).draw() });
// setContextAndDraw(b01, contexts[0])

/*
	MEASURE 02
*/
var m02 = partial2.getFourCounts();
var b02 = VF.Beam.generateBeams(m02, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context2, stave02, m02);
b02.forEach(function (b) { b.setContext(context2).draw() });

/*
	MEASURE 03
*/
var m03 = partial3.getFourCounts();
var b03 = VF.Beam.generateBeams(m03, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context3, stave03, m03);
b03.forEach(function (b) { b.setContext(context3).draw() });

/*
	MEASURE 04
*/
var m04 = partial4.getFourCounts();
var b04 = VF.Beam.generateBeams(m04, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context4, stave04, m04);
b04.forEach(function (b) { b.setContext(context4).draw() });

/*
	MEASURE 05
*/
var m05 = partial1.getTwoCounts().concat(partial2.getTwoCounts());
var b05 = VF.Beam.generateBeams(m05, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context5, stave05, m05);
b05.forEach(function (b) { b.setContext(context5).draw() });

/*
	MEASURE 06
*/
var m06 = partial3.getTwoCounts().concat(partial4.getTwoCounts());
var b06 = VF.Beam.generateBeams(m06, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context6, stave06, m06);
b06.forEach(function (b) { b.setContext(context6).draw() });

/*
	MEASURE 07
*/
var m07 = partial1.getOneCount().
	concat(partial2.getOneCount()).
	concat(partial3.getOneCount()).
	concat(partial4.getOneCount());
var b07 = VF.Beam.generateBeams(m07, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context7, stave07, m07);
b07.forEach(function (b) { b.setContext(context7).draw() });

/*
	MEASURE 08
*/
var m08 = partial1.getOneCount().
	concat(partial2.getOneCount()).
	concat(partial3.getOneCount()).
	concat(partial4.getOneCount());
var b08 = VF.Beam.generateBeams(m08, { stem_direction: 1 });
VF.Formatter.FormatAndDraw(context8, stave08, m08);
b08.forEach(function (b) { b.setContext(context8).draw() });

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
svg.forEach(function (f) {
	f.setAttribute("viewBox", `0 0 ${MEASURE_WIDTH_FOUR} ${MEASURE_HEIGHT}`);
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
