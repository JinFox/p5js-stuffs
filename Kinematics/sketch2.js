/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-24T08:56:15+00:00
*/


var tentacles = [];
var numberTentacle = 15;
var ball;
var ballVel;

function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
	colorMode(HSB, 255, 255, 255);
	background(42, 0, 21);
	ball = createVector(width/2, height/2);
	ballVel = p5.Vector.random2D();
	ballVel = ballVel.mult(3);

	var nb = 15;
	var r = 300;
	var step = TWO_PI / nb;
	var lengthJoint = 20;
	var weightTentacle = 20;
	var weightRatio = .95;
	var nbJoints = 20;

	for (var i = 0; i < nb; i++) {
		var x = r * cos(i*step);
		var y = r * sin(i*step);
		var col = color((i / 15.0) * 255, 255, 255);
		tentacles.push(new Tentacle(x + width/2, y + height/2,
			 													lengthJoint, nbJoints,
																weightTentacle, weightRatio, col));
	}


}

var t = 0;
function draw() {
	t+= 0.03;
	background(42, 0, 21);

	var mouse = createVector(mouseX, mouseY);
	for (var i = 0 ; i < tentacles.length; i++){
		tentacles[i].update(ball);
		tentacles[i].show();
	}
	// noise
	ballVel = createVector(noise(t) * 2 - 1, noise(t + 20000) * 2 - 1).normalize();

	if (ball.x < 0  && ballVel.x < 0 || ball.x > width &&ballVel.x > 0)
	{
		ballVel.x *= -1;
		t = random(3000000);
	}
	if (ball.y < 0 &&ballVel.y < 0 || ball.y > height &&ballVel.y > 0)
	{
		ballVel.y *= -1;
		t = random(3000000);
	}

	ballVel.mult(6);
	console.log(ball);
	ball.add(ballVel);

	stroke(200,50,200,200);
	strokeWeight(10);
	noFill();
	ellipse(ball.x, ball.y, 50, 50);
}
