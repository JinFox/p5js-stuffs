

var vehicle;
function setup() {
  var canvas = createCanvas(800, 600);
  canvas.parent('canvascontainer');
  //debug = select('#debug');

   vehicle = new Vehicle(width/2, height /2);
}

function draw() {
  background(0);

  var mousePos = createVector(mouseX, mouseY);
  fill(200, 200, 200, 100);
  ellipse(mousePos.x, mousePos.y, 30, 30);
  vehicle.seek(mousePos);
  vehicle.update();
  vehicle.display();
}
