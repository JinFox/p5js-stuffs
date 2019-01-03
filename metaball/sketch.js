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
	displayBlob();
	
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