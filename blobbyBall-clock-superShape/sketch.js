/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-02-20T14:05:29+00:00
*/

var radius = 100;
var nbStep = 100;

function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(42, 221, 21);
	setupSuperShape();
}

function draw() {
	background(22);

	//displayBlob();
	//displayClock();
	displaySuperShape();
}

var n1 = 1;
var n2 = 1;
var n3 = 1;
var m = 0;
var a = 10;
var b = 10;
var radius = 10;
var slidern1, slidern2, slidern3;
var sliderm;

function setupSuperShape()
{
		slidern1 = createSlider(1, 20, 1);
 	 	slidern2 = createSlider(1, 20, 1);
 	 	slidern3 = createSlider(1, 20, 1);
		sliderm = createSlider(0, 20, 0);

}
function displaySuperShape()
{
	n1 = slidern1.value();
	n2 = slidern2.value();
	n3 = slidern3.value();
	m = sliderm.value();

	beginShape();
	translate(width / 2, height / 2);
	stroke(220);
	strokeWeight(3);
	noFill();
	//fill(255);
	var angleIncrement = TWO_PI / nbStep;

	for(var angle = 0; angle < TWO_PI; angle += angleIncrement)
	{
		var r = superShape(angle);
		var x = r * cos(angle) * radius;
		var y = r * sin(angle) * radius;
		vertex(x, y);
		//point(radius * cos(step * i),radius * sin(step * i));

	}
	endShape(CLOSE);
}

function superShape(angle)
{

	var part1 = (1 / a) * cos(angle * m / 4);
	part1 = abs(part1);
	part1 = pow(part1, n2);
	var part2 = (1 / b) * sin(angle * m / 4);
	part2 = abs(part2);
	part2 = pow(part2, n3);

	var part3 = pow(part1 + part2, 1 / n1);

	if (part3 == 0)
		return 0;
	return (1 / part3);
}


