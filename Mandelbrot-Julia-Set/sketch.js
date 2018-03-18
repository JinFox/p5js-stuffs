/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-17T13:14:28+00:00
*/

var maxIt = 1000;
var threshold = 64;

//(f(Z) = z*z + c)
//c = a+bi
var minValSlider, maxValSlider;
var aSlider, bSlider;

var ratio;

var xMin, xMax, yMin, yMax;
var dx, dy; // incremental Values
var time;

function setup() {
	time = 0;
	createCanvas(400, 400);
	pixelDensity(1);
	//frameRate(30);
	noStroke();
  colorMode(HSB, 255, 255, 255);

	ratio = width / height;

	xMin = -1.5 * ratio;//-width/2;
	xMax = 1.5 * ratio//;
	yMin = -1.5//-height/2;
	yMax = 1.5//yMin+height;

	dx = (xMax - xMin) / width;
	dy = (yMax - yMin) / height;


}


function draw() {

	loadPixels();
	mandelbrot();
	//juliaSet();
	updatePixels();
	noLoop();
	time += 0.2;
}

function mandelbrot()
{
	var y = yMin;
	for(var j = 0; j < height; j++)
	{
		var x = xMin;
		for (var i = 0; i < width; i++) {
			var a = x;
			var b = y;

			var n = 0;

			while (n < maxIt) {
				var aa = a*a;
				var bb = b*b;
				var twoab = 2 * a * b;

				a = aa - bb + x;
				b = twoab + y;
				if (aa*aa + bb*bb > threshold)
				{
						break;
				}
				n++;
			}

			SetColor(i, j, n, maxIt);

			x += dx;
		}
		y += dy;
	}
}

/*
c=0.45+0.1428i
c=-0.70176-0.3842i
c=-0.8+0.156i
*/
var t= 0;
function juliaSet()
{

	// Julia set variation
//	var ca = map(mouseX, 0, width, -1, 1);
	//var cb = map(mouseY, 0, height, -1, 1);
	//var ca = sin(time);//caValSlider.value();
	//var cb = cos(time/ 2);//caValSlider.value();
	var ca = -0.8;
	var cb = 0.156;

	var y = yMin;
	for(var j = 0; j < height; j++)
	{
		var x = xMin;

		for (var i = 0; i < width; i++) {
			var a = x;
			var b = y;

			var n = 0;

			while (n < maxIt) {
				var aa = a*a;
				var bb = b*b;
				var twoab = 2 * a * b;

				a = aa - bb + ca;
				b = twoab + cb;
				if (aa*aa + bb*bb > threshold)
				{
						break;
				}
				n++;
			}
			 SetColor(i, j, n, maxIt);

			x += dx;
		}
		y += dy;
	}
}

function SetColor(i, j, n, maxIt)
{
	var ocolor;
	if (n == maxIt)
		ocolor = 0;
	else
	{
		//ocolor = map(n, 0 , maxIt, 0, 1);
		ocolor = sqrt(n / maxIt) * 255;//map(, 0, 1, 0 ,255);
	}

	var test = color(ocolor, 255, 255);
	var p = (i + j * width) * 4;
	pixels[p] = red(test);
	pixels[p + 1] = green(test);
	pixels[p + 2] = blue(test);
	pixels[p + 3] = 255;
}
