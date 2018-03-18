var inc = 0.06;
var scl = 40;
var magnitude = 0.7;
var cols, rows;
var zoff = 0;

var particles = [];
var flowField;

function setup() {
	createCanvas(800, 600);
	cols = floor(width / scl);
	rows = floor(height / scl);

	flowField = new Array(cols * rows);

	for (var i = 0; i < 4000; i++)	{
		particles[i] = new Particle();
	}
	background(255);

}


function draw() {
	//background(255);

	var yoff = 0;
	for (var x = 0; x < cols; x++)	{
		var xoff = 0;

		for (var y = 0; y < rows; y++)	{
			var index = x + y * cols;
			var angle = noise(xoff, yoff, zoff) * TWO_PI * 2;

			var v = p5.Vector.fromAngle(angle);

			v.setMag(magnitude);
			flowField[index] = v;

			xoff += inc;

			//stroke(200);
			//strokeWeight(1);
			//push();
			//translate(x*scl, y*scl);
			//rotate(angle);
			//line(0 ,0, 10, 10);
			//pop();

		}
		yoff += inc;

		zoff += 0.001;

	}



	for (var i = 0; i < particles.length; i++)	{
		particles[i].follow(flowField);
		particles[i].show(zoff * 100);
		particles[i].update();
		particles[i].edges();
	}

	// noLoop();

}
