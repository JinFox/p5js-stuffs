
function setup(){
  createCanvas(500,500);
    colorMode(HSB, 255, 255, 255);
//  ortho(-width, width, height, -height/2, 0.1, 100);
	//sliderx = createSlider(-1, 1, 0, 0.05);
	//slidery = createSlider(-1, 1, 0, 0.05);
	background(47);
}

var t = 0;
function draw(){
    t += 0.01;
		background(0);
		noFill();
		//var dirY = (mouseY / height - 0.5) *2;
		//var dirX = (mouseX / width - 0.5) *2;
    translate(width / 2, height / 2);
		//directionalLight(250, 250, 250, sliderx.value(), slidery.value(), 0.25);
		//lights();

		//ambientMaterial(250);
    var r = 150;
    var total = 90;
    beginShape();
    stroke(sin(t) * 128 + 128, 255,255);
    for (var i = 0; i < total; i++) {

      //strokeWeight(map(i, 0, total,1, 5));
      var lon = map(i, 0, total,0, TWO_PI);
      for (var j = 0; j < total; j++) {
        var lat = map(j, 0, total, 0, TWO_PI);

        var x = r * sin(lon) * cos(lat);
        var y = r * sin(lon) * sin(lat);
        var z = r * cos(lon);

        //strokeWeight(5);
        var zx = (z / 3) * cos(t/2);
        var zy = (z / 3) * sin(t);
        vertex(x + zx, y + zy);

      }

    }
  endShape(CLOSE);
}
