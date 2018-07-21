var VF = Vex.Flow;

// Object to store information about the workspace.
var WorkspaceInformation = {
	div: document.getElementById("foo"),
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

/*

	CREATING A STAFF

*/

// Create a stave of width 400 at position x10, y40 on the SVG
var stave = new VF.Stave(10, 40, 400);

// Add a clef and time signature
stave.addClef("percussion").addTimeSignature("15/16");

// Set the context of the stave our previous exposed context and execute the method
stave.setContext(context).draw();