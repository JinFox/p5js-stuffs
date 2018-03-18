/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-21T23:47:20+00:00
*/

var cols = 10;
var rows = 10;

var w,h;
var cells = [];
var cellStack = [];


function setup() {
	createCanvas(600, 600);
	pixelDensity(1);
//	frameRate(3);
  colorMode(RGB, 255, 255, 255);

	w = floor(width / cols);
	h = floor(height / rows);

	for (var j = 0; j < rows; j++) {
		for (var i = 0; i < cols; i++) {
			var cell = new Cell(i, j);
			cells.push(cell);
		}
	}
	current = cells[0];
}

var current;
function draw() {
	background(55, 55, 55);

	for (var i = 0; i < cells.length; i++) {
		cells[i].show();
	}
	current.visited = true;
	current.highlight(color(0, 255, 0, 200));
	for (var i = 0; i < cellStack.length; i++) {
		cellStack[i].highlight(color(0, 0, 255));
	}
	//STEP 1
	var next = current.getNeighbor();
	if (next)
	{
		next.visited = true;
		//STEP 2
		cellStack.push(current);

		//STEP 3
		removeWall(current, next);

		//STEP 4
		current = next;
	}
	else if (cellStack.length > 0){
		//STEP 4
		current = cellStack.pop();
	}
	else {
		console.log("Finished");
		noLoop();
	}
//	noLoop();
}


function removeWall(a, b)
{
	var x = a.i - b.i;
	var y = a.j - b.j;

	if (x === 1)
	{
		a.walls[3] = false;
		b.walls[1] = false;
	}
	else if (x === -1)
	{
		a.walls[1] = false;
		b.walls[3] = false;
	}
	else if (y === 1)
	{
		a.walls[0] = false;
		b.walls[2] = false;
	}
	else if (y === -1)
	{
		a.walls[2] = false;
		b.walls[0] = false;
	}

}
