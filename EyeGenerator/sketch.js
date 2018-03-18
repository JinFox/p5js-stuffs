/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-24T10:44:44+00:00
*/

var eye;
function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(55);

	eye = new Eye(width/2, height/2, 200, 150);
}

function draw() {
	background(55);
	eye.update();
	eye.show();
}
