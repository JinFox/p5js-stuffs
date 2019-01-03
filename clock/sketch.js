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
	
}

function draw() {
	background(22);
	displayClock();
	
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