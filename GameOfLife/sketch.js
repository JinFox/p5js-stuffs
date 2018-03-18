/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-21T20:07:35+00:00
*/

var cols = 50;
var rows = 50;
var w,h;
var grid = [];
var next = [];
var milliseByGeneration = 0;

function setup() {
	createCanvas(300, 300);
	pixelDensity(1);
	colorMode(RGB, 255, 255, 255);
	//background(42, 221, 21);

	w = width / cols;
	h = height / rows;

	for (var x = 0; x < cols; x++) {
		grid[x] = [];
		next[x] = [];
		for (var y = 0; y < rows; y++) {
			//
			grid[x][y] = {s:random([true, false]), n:0}; // 1 = alive
			next[x][y] = {s:false, n:0}; // 1 = alive
		}
	}
	///console.log(countSurrounding(1, 1));
	for (var x = 0; x < cols; x++) {
		for (var y = 0; y < rows; y++) {
			showCell(x, y, grid);
		}
	}
}

// When the user clicks the mouse
var touching = false;
function mouseReleased()
{
	touching = false;
}
function mousePressed() {
	var s = 10;
	touching = true;
  // Check if mouse is inside the circle
	var ptx = floor(mouseX/w);
	var pty = floor(mouseY/h);

	for (var x = ptx - s; x < ptx+s; x++) {
		for (var y = pty - s; y < pty+s; y++) {
			if (x >= 0 && x < cols && y > 0 && y < rows)
					grid[x][y].s = random([true, false]);
		}
	}
}


var timer = 0;
function draw() {
	if (touching)
		return;
	if (timer < milliseByGeneration)
	{
		timer++;
		return;
	}
	timer = 0;
	for (var x = 0; x < cols; x++) {
		for (var y = 0; y < rows; y++) {
			var n = countSurrounding(x, y);
			var state = grid[x][y].s;
			next[x][y].n = n;
			if (state)
			{
				if (n < 2){
					//Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
					next[x][y].s = false;
				}
				else if (n <= 3)
				{
					//Any live cell with two or three live neighbours lives on to the next generation.
					// stay put
					next[x][y].s = state;
				}
				else
				{
					//Any live cell with more than three live neighbours dies, as if by overpopulation.
					next[x][y].s = false;
				}
			}
			else if (!state && n == 3){
				//Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
				next[x][y].s = true;
			}
			else {
				next[x][y].s = state;
			}
		}
	}

	swap();
	for (var x = 0; x < cols; x++) {
		for (var y = 0; y < rows; y++) {
			showCell(x, y, grid);
		}
	}
}

function swap(){
	var temp = grid;
	grid = next;
	next = temp;
}
function showCell(x, y)
{
	var r = grid[x][y].n / 8 * 255;
	var b = grid[x][y].s ? 255 : 0;
	var c = color(r, 0, b);
	fill(c);
	//fill(grid[x][y].s ? 255 : 0);
	//stroke(255 - c);
	noStroke();
	rect(x * w, y * h, w, h);
}


function countSurrounding(x, y){
	var starti = x > 0 ? -1 : 0;
	var endi = x < cols - 1 ? 1 : 0;
	var startj = y > 0 ? -1 : 0;
	var endj = y < rows - 1 ? 1 : 0;

	var sum = 0;
	for (var i = starti; i <= endi; i++) {
		for (var j = startj; j <= endj; j++) {
				if (grid[x+i][y+j].s && !(j == 0 && i == 0))
					sum++;
		}
	}
		return sum;
}
