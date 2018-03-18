/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-27T17:00:18+01:00
*/

var points = [];
var angles = [];
var deepness = 150;
var startSize = 200;
var deepnessRatio = 0.7;

var iterations = 40;
var curIte = 0;
var angleInc;
function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(50);

	for (var i = 0; i < deepness ;i++)
	{
		angles.push(0);
	}

	 angleInc = (TWO_PI / iterations);
}



function draw() {
	if(curIte >= iterations)
	{
		points = [];
		curIte = 0;
	}
	curIte++;
	background(50);
	var currentSize = startSize;
	var pos = createVector(width/2, height/2);
	var angleoffset = 0;

	stroke(255,255,255,50);
	noFill();
	strokeWeight(1);

	for (var i = 0; i < deepness ; i++)
	{
		angleoffset += angles[i];
		var newSize = currentSize * deepnessRatio;
		pos = drawOrbitEllipse(pos, currentSize, angleoffset, i + 1 >= deepness ? 0: newSize, -1.0);
		currentSize = newSize;
		angles[i] += angleInc;
	}

	points.push(pos);
	beginShape();
	noFill();
	for(var i = 0; i < points.length ; i++){
		stroke(255);
  	//point(points[i].x, points[i].y);
		vertex(points[i].x, points[i].y);
	}
	endShape();
}

function drawOrbitEllipse(pos, size, angle, nextSize, ratio = 1.0)
{

	ellipse(pos.x, pos.y , size * 2, size * 2);
	var offset = size + (nextSize * ratio);
	var linex = pos.x + offset * cos(angle);
	var liney = pos.y + offset * sin(angle);
	line(pos.x, pos.y, linex, liney);
	return createVector(linex, liney);
}
