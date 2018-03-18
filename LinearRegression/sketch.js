/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-11-16T16:16:28+00:00
*/

var data = [];

var m = 1;
var b = 0;
function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(47, 47, 47);

}

function draw() {
	background(47, 47, 47);

	stroke(255);
	fill(255);

	for (let i= 0; i< data.length; i++){
		let x = map(data[i].x, 0, 1, 0, width);
		let y = map(data[i].y, 0, 1, height, 0);

		ellipse(x,y,8,8);

	}
	drawLine();

}
function drawLine()
{
	var x0 = 0;
	var y0 = m * x0 + b;
	var x1 = width;
	var y1 = m * x1 + b;

	var x0 = map(x0, 0, 1, 0, width);
	var x0 = map(x0, 0, 1, 0, width);
	var x0 = map(x0, 0, 1, 0, width);
	var x0 = map(x0, 0, 1, 0, width);	

	stroke(55,255,55);
	line(x0,y0,x1,y1);

}

function mousePressed() {
	let x = map(mouseX, 0, width, 0,1);
	let y = map(mouseY, 0, height, 1,0);
	data.push(createVector(x, y));
}
