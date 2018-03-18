/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-02-22T13:03:47+00:00
*/

var kslide;
var dslide;
var itslide;

function setup() {
	createCanvas(640, 400);
	pixelDensity(1);
  colorMode(HSB, 255, 255, 255);
	 kslide = createSlider(2, 10, 0.1);
	 dslide = createSlider(1, 20, 1);
	 itslide = createSlider(1, 20, 1);
	background(42, 221, 21);
}

var off = 0;
function draw() {
	var d = dslide.value();
	var k = kslide.value() / d;
	var it = itslide.value();


  background(42, 221, 21);
	translate(width / 2, height/2);
	beginShape();
	strokeWeight(2);

	off = (off + 0.01) % TWO_PI;
	var col = color(off / TWO_PI * 255, 255, 255);
	stroke(col);
	for (var a = 0; a < TWO_PI * it; a += 0.01)
		{
			var r = 100 * cos(k*a);
			var x = r * cos(a + off);
			var y = r * sin(a + off);

			noFill();
			vertex(x, y);

	}
	endShape(CLOSE);

	//noLoop();
}
