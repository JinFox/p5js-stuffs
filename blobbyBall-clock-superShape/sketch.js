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


var time = 0;
function displayBlob()
{
	time += 0.005;
	beginShape();

	translate(width / 2, height / 2);
	noStroke();
	strokeWeight(5);
	fill(255);
	var angleIncrement = TWO_PI / nbStep;

	for(var angle = 0; angle < TWO_PI; angle += angleIncrement)
	{
		var x = cos(angle);
		var y = sin(angle);
		var nValue = noise(time + x, -time + y);
		var rad = radius + map(nValue, 0, 1, -30,30);

		vertex(rad * x,rad * y );

		//point(radius * cos(step * i),radius * sin(step * i));

	}

	endShape(CLOSE);
}

function displayClock()
{
	var clockMax = 12;
	var date = new Date();
	var h = date.getHours();
	var m = date.getMinutes();
	var s = date.getSeconds();
	var ms = date.getMilliseconds();

	textSize(20);


	beginShape();
	translate(width / 2, height / 2);

	stroke(0,150,0);
	strokeWeight(1);
	noFill();

	var angleInc = TWO_PI / nbStep;
	var offsetAngle = -HALF_PI;
	text(h + ":" + m +":" + s , -50, height / 2 - 50);
	for(var i = 0; i < nbStep; i++)
	{
		var angle = (i * angleInc) + offsetAngle;
		var cosa = cos(angle);
		var sina = sin(angle);

		var rad = radius;

		vertex(rad * cosa, rad * sina);


		//point(radius * cos(step * i),radius * sin(step * i));
		strokeWeight(2);
	}

	endShape(CLOSE);


	var hAngleInc = TWO_PI / clockMax;
	var smAngleInc = TWO_PI / 60;
	strokeWeight(2);
	for(var i = 0; i < clockMax; i++)
	{
		var angle = (i * hAngleInc) + offsetAngle;
		var rad = radius + 20;

		text(i == 0 ? clockMax : i, rad *  cos(angle) - 5, rad * sin(angle));
	}

	strokeWeight(2);
	s = s + (ms / 1000.0);
	var sAngle = ((s % 60) * smAngleInc) + offsetAngle;
	line(0,0,	radius * 0.8 * cos(sAngle),
				radius * 0.8 * sin(sAngle));

	strokeWeight(5);

	m = m + (s / 60.0);
	var mAngle = ((m % 60) * smAngleInc) + offsetAngle;
	line(0,0,	radius * 0.7 * cos(mAngle), radius * 0.7 * sin(mAngle));

	h = h + (m / 60.0);
	var hAngle = ((h % clockMax) * hAngleInc) + offsetAngle;
	line(0,0,	radius * 0.4 * cos(hAngle), radius * 0.4 * sin(hAngle));

}
