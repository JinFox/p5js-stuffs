/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-22T13:23:52+00:00
*/

var totalCities = 7;
var cities = [];
var curBestPath = [];
var p;
var recordDistance;
var order = [];

var totalPermutations;
var count = 0;

function setup() {
	createCanvas(800, 600);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(0);
	//frameRate(3);

	for (var i = 0; i < totalCities; i++) {
		var v  = createVector(random(width), random(height/2));
		 cities[i] = v;
		 order.push(i);
	}

	recordDistance = calcDistance(cities, order);
	curBestPath = order.slice();
	p = createP("Score");
//	noLoop();
	totalPermutations = factorial(totalCities);
	console.log(totalPermutations);
}



function draw() {
	background(0);
	drawCities(color(255, 0 ,255));
	// current attempt paths
	drawPath(cities, curBestPath, color(255, 0, 255), 3);
	translate(0, height/2);
	drawPath(cities, order, 50, 2);

	var d = calcDistance(cities, order);
	if (d < recordDistance)
	{
		recordDistance = d;
		curBestPath = order.slice();
		p.html("Score : " + recordDistance);
	}
	findOrder();

	// percentage

	var percent = 100 * (count / totalPermutations);
	textSize(40);
	fill(255);
	noStroke();
	text(nf(percent, 0, 2) + "% completed", 20, height / 2 - 50 );
}

// lexicographic order
//var order = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
function findOrder() {
//	background(0);
	count++;
	//STEP 1
	var largestI = -1;
	for (var i = 0; i < order.length - 1; i++) {
		if (order[i] < order[i + 1])
				largestI = i;
	}

	if (largestI == -1)
	{
		console.log("Finished");
		noLoop();
	}
	//STEP 2
	var largestJ = -1;
	for (var j = 0; j < order.length; j++) {
		if (order[largestI] < order[j])
				largestJ = j;
	}

	//STEP 3
	swap(order, largestI, largestJ);
	//STEP 4
	var endArray = order.splice(largestI + 1);
	endArray.reverse();
	order = order.concat(endArray);
}

function drawCities(col)
{
	fill(col);
	for (var i = 0; i < cities.length; i++) {
		 ellipse(cities[i].x, cities[i].y, 10, 10);
	}
}

function drawPath(points, order, col, weight)
{

	stroke(col);
	strokeWeight(weight);
	noFill();
	beginShape();
	for (var i = 0; i < order.length; i++) {
		 vertex(points[order[i]].x, points[order[i]].y);
	}
	endShape();
}

function swap(a, i, j)
{
	var temp = a[i];
	a[i] = a[j];
	a[j] = temp;
}

function calcDistance(points, order)
{
	var sum = 0;
	for (var i = 0; i < order.length - 1; i++) {
		var cityAIdx = order[i];
		var cityBIdx = order[i + 1];

		var d = dist(points[cityAIdx].x, points[cityAIdx].y,
			 					points[cityBIdx].x, points[cityBIdx].y);
		sum += d;
	}
	return sum;
}


function factorial(n)
{
	if (n == 1)
	{
		return 1;
	}
	else {
		return n*factorial(n - 1);
	}
}
