/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-11-16T15:47:44+00:00
*/


let training_data = [
  {inputs:[0,0], targets:[0]},
  {inputs:[0,1], targets:[1]},
  {inputs:[1,0], targets:[1]},
  {inputs:[1,1], targets:[0]}
]

var nn;
var lr_slider;
function setup() {
	createCanvas(400, 400);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(0, 0, 0);

  let m1 = new Matrix(3,3);
  m1.randomize();
  
  
  nn = new NeuralNetwork(2,[5, 5],1);
  lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
  console.table(nn.predict([0,0]));
  
}

function draw() {
  background(0);
  noStroke();
  for (let i = 0; i < 100; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);  
  }
  nn.setLearningRate(lr_slider.value());
  let resolution = 10;
  let cols = width / resolution;
  let rows = height / resolution;
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols;
      let x2 = j / rows;
      let inputs = [x1, x2];
      let y = nn.predict(inputs);

      fill(y * 255);
      rect(i * resolution, j * resolution, resolution, resolution);
    }
  }
}
