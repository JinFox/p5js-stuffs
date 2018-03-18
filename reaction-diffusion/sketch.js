/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-21T20:10:38+00:00
*/

// Reference : http://www.karlsims.com/rd.html
// Also, for reference
// http://hg.postspectacular.com/toxiclibs/src/44d9932dbc9f9c69a170643e2d459f449562b750/src.sim/toxi/sim/grayscott/GrayScott.java?at=default

var grid;
var next;

var dA = 1;
var dB = .5;
var feed = 0.0545; // 0.045 0.07
var kill = 0.062; //0.01 0.1
// feed rate of 0.0367 and a removal rate of 0.0649
//feed rate of 0.0545 and removal rate of 0.062

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  //background(42, 221, 21);

	grid = [];
	next = [];

	for (var y = 0; y < height; y++) {
			grid[y] = [];
			next[y] = [];
			for (var x = 0; x < width; x++) {
				grid[y][x] = {a:1, b:0};//x % 50 < 10 && y % 50 < 10 ? 1 : 0
				next[y][x] = {a: 1, b:0};
			}
		}

		for (var y = 145; y < 155; y++) {
				for (var x = 145; x < 155; x++) {
					grid[y][x].b = 1;
				}
			}
}

var values = [0.05,0.2,0.05,
							0.2, -1, 0.2,
							0.05,0.2,0.05];
function laplace(x, y, letter){
	var starti = x > 0 ? -1 : 0;
	var endi = x < width - 1 ? 1 : 0;
	var startj = y > 0 ? -1 : 0;
	var endj = y < height - 1 ? 1 : 0;

	var k = 0;
	var sum = 0;
	for (var j = startj; j <= endj; j++) {
		for (var i = starti; i <= endi; i++) {
			var newx = x + i;
			var newy = y + j;
			sum += (grid[newy][newx][letter]) * values[k];
			k++;
		}
	}


	return sum;
}

var deltaTime = 1;
var nbItPerFrame = 30;

function draw() {
	var it = 0;
	while (it++ < nbItPerFrame)
	{
	for (var y = 1; y < height - 1; y++) {
			for (var x = 1; x < width - 1; x++) {
				var a = grid[y][x].a;
				var b = grid[y][x].b;

				var variationA = (dA * laplace(x, y, "a")) -
												(a * b * b) +
												(feed * (1 - a));
				next[y][x].a = a + variationA * deltaTime;

				var variationB = 	(dB * laplace(x,y,"b")) +
													(a * b * b) -
													((kill + feed) * b);
				next[y][x].b = b + variationB * deltaTime;



			next[y][x].a = constrain(next[y][x].a, 0, 1);
      next[y][x].b = constrain(next[y][x].b, 0, 1);
			}
		}
		swap();
	}

		loadPixels();

		//console.log("displayying : " + next[0][0].name);
		for (var y = 0; y < height; y++) {
				for (var x = 0; x < width; x++) {
					var p = (x + y * width) * 4;
					var a = grid[y][x].a;
       		var b = grid[y][x].b;
       		var c = constrain(floor((a - b) * 255), 0, 255);
       		pixels[p + 0] = c;
       		pixels[p + 1] = c;
       		pixels[p + 2] = c;
					pixels[p + 3] = 255;
				}
			}

			updatePixels();

			//noLoop();
}



function swap(){
	var temp = grid;
	grid = next;
	next = temp;
}
