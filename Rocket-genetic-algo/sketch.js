/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-11-10T20:22:23+00:00
*/

//TODO : Set speed to getto target affect fitness

var lifeSpan = 512;
var populationSize = 1024;
var count;
var population;
var startPos;
var target;

var lifeP;
var mutationRatio = 0.02;
var maxForce = 0.2;
var currentGen = 0;
var maxVelocity = 4;

//obstacle
var rx ;
var ry ;
var rw ;
var rh ;

var nbCyclePerDraw =1;
var slider;
var bestFitnessP;
var checkbox;


function setup() {
	createCanvas(500, 400);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(47,47,47);

	startPos = createVector(width /2, height - 20);
	target = createVector(3*width / 4, 50);
	population = new Population();
	population.initialize();
	count = 0;
	lifeP = createP();

	//obstacle configuration
	rx = width/4;
	ry = height/4;
 	rw = width /1.2;
 	rh = 10;
	bestFitnessP = createP();
	slider = createSlider(1, 100, 1, 1);
  //slider.position(10, 10);
  //slider.style('width', '80px');
	checkbox = createCheckbox('pause', false);
	   checkbox.changed(togglePause);
}
var isPaused = false;
var endCycle = false;
function togglePause()
{
	endCycle = false;
	isPaused = this.checked();

}

function draw() {
	if (isPaused && endCycle)
		return;
	background(47,47,47);
	noFill();
	stroke(255);
	ellipse(target.x, target.y, 16, 16);
	fill(200, 50, 50);
	rect(rx,ry,rw,rh);
	lifeP.html(count);
	nbCyclePerDraw = slider.value();

	for (var i = 0; i< nbCyclePerDraw;i++)
	{
			population.run();
			count++;
			if (count >= lifeSpan)
			{
				i = nbCyclePerDraw;
				population.evaluate();
				count = 0;
				endCycle = true;
				population.selection();

			}
	}
	population.draw();

}
