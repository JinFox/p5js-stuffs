/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-01-22T00:32:24+00:00
*/
var blob;

function setup() {
	createCanvas(200, 200);
	pixelDensity(1);
  colorMode(HSB, 255, 255, 255);
//background(42, 221, 21);
	blob = new Blob(40, 40);
}

function draw() {
	loadPixels();
	var posx = blob.pos.x;
	var posy = blob.pos.y;
	for (var x = 0; x < width; x++) {
		for (var y = 0; y < height; y++) {
			var d = dist(x, y, posx, posy);
			var c = (blob.radius / d);
			var col = color(c, 255, 255);
			var idx = (x + y * width) * 4;
			pixels[idx] = red(col);
			pixels[idx+1] = blue(col);
			pixels[idx+2] = green(col);
			pixels[idx+3] = 255;
		}
	}
	updatePixels();
	blob.update();
	//blob.show();


}
