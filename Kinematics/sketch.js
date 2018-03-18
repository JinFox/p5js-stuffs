/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-21T09:21:02+00:00
*/


var tentacles = [];
var numberTentacle = 15;
var variation;

function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(42, 0, 21);

	var length = 50;
 	variation = PI / numberTentacle;
	for (var i = 0; i < numberTentacle; i++) {
		tentacles.push(createTentacle(20, 30, 15));
	}

}

function createTentacle(number, length, weight) {
	var newTentacle = new SegmentForward().fromPoint(400,300, weight);
	var current = newTentacle;
	var col = color(0,200,0);
	for (var i = 0; i < number; i++) {
			length *= 0.9;
			weight *= 0.9;
			var next = new SegmentForward().fromParent(current, 0, length, weight, col);
			current.child = next;
			current = next;
	}
	return newTentacle;
}

var phase = 0;
var phase2 = 0;

function draw() {
background(42, 0, 21);

	for (var i = 0; i < tentacles.length; i++) {
		var current =	tentacles[i];

		var initialAngle = (TWO_PI/numberTentacle) * i;

		current.setAngle(map(noise(phase + phase2), 0, 1, initialAngle - variation, initialAngle + variation));
		current.update();
		current.show();
		current = current.child;

		while (current !== undefined)
		{
			current.wiggle(phase, variation);
			//current.setAngle(map(noise(phase + phase2), 0, 1, -variation, variation));
			current.update();
			current.show();
			current = current.child;
			//phase2 += 0.0002;
		}

	}

	phase += 0.01;
	//noLoop();
}
