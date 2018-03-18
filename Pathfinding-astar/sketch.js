/**
* @Author: Joaquim RENARD <Jin47>
* @Date:   2017-01-17T14:27:54+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-01-19T08:05:26+00:00
*/

var enableDiagonals = true;
var percentWall = 0.35;
var cols = 60;
var rows = 60;
var sizeX;
var sizeY;
var offX = sizeX/2;
var offY = sizeY/2;
var itPerFrame = 1;

var grid = new Array(cols);

var openSet = [];
var closedSet = [];
var start;
var end;

function removeFromArray(array, elem)
{
	for (var i = array.length - 1; i >= 0; i--) {
		if (array[i] == elem)
			array.splice(i, 1);
	}
}

function setup() {
	createCanvas(600, 600);
	pixelDensity(1);

	sizeX = width / cols;
	sizeY = height / rows;
	offX = sizeX/2;
	offY = sizeY/2;

	console.log("cols = ["+cols+"] and rows = ["+rows+"]");

	for (var x = 0; x < cols; x++) {
		grid[x] = new Array();
		for (var y = 0; y < rows; y++) {
			grid[x][y] = new Spot(x, y, random(1) < percentWall);
		}
	}

	start = grid[0][0];
	end = grid[cols - 1][rows - 1];
	start.wall = false;
	end.wall=false;

	for (var x = 0; x < cols; x++) {
		for (var y = 0; y < rows; y++) {
			grid[x][y].addNeighbors(grid);
		}
	}

	openSet.push(start);
}

function heuristic(a, b) {
  var d;
  if (enableDiagonals) {
    d = dist(a.x, a.y, b.x, b.y);
  } else {
    d = abs(a.x - b.x) + abs(a.y - b.y);
  }
  return d;
}

function getSpotWithLowestF()
{
	var winner = 0;
	for (var i = 0; i < openSet.length; i++) {
		if (openSet[i].f < openSet[winner].f)	{
			winner = i;
		}
	}
	return 	openSet[winner];
}


function addNeighborsToOpenSet(current)
{
	for (var i = 0; i < current.neighbors.length; i++) {
		var neighbor = current.neighbors[i];

		if (!closedSet.includes(neighbor)) // TODO:more efficient algo
		{
			var tempG = current.g + 1;//heuristic(current, neighbor);

			if (!openSet.includes(neighbor)) {
				openSet.push(neighbor);
			}
			else if (tempG >= neighbor.g)	{
				continue;
			}

			neighbor.g = tempG;
			neighbor.h = heuristic(neighbor, end);
			neighbor.f = neighbor.g + neighbor.h;
			neighbor.previous = current;
		}
	}
}

function displayState(current)
{
	// display
		for (var x = 0; x < grid.length; x++) {
				for (var y = 0; y < grid[x].length; y++) {
					grid[x][y].show(color(255));
			}
		}

		for( var i = 0; i < closedSet.length; i++)
		{
			closedSet[i].show(color(255, 0, 0));
		}

		for( var i = 0; i < openSet.length; i++)
		{
			openSet[i].show(color(0, 255, 0));
		}

		var temp = current;
		var colo = 255;
		temp.showLine(color(0, 0, colo));
		while (temp.previous)
		{
			temp=temp.previous;
			temp.showLine(color(0, 0, colo));
			if (colo > 0)
				colo -= 2;
		}

}

function draw() {

		for (var n = 0; n < itPerFrame && openSet.length > 0; n++) {
					var current = getSpotWithLowestF();

					if (current === end){
						console.log("FOUND !");
						displayState(end);
						noLoop();
					}

					removeFromArray(openSet, current);
					closedSet.push(current);

				 	addNeighborsToOpenSet(current);
			}

			displayState(current);

			if (openSet.length <= 0 && current !== end)
			{
					// no solution
					console.log("No solution");
					noLoop();
					return;
			}


}
