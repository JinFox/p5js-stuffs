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
	createCanvas(600, 400);
	pixelDensity(1);
  colorMode(RGB, 255, 255, 255);
  background(0, 0, 0);

  let m1 = new Matrix(3,3);
  m1.randomize();
  
  nn = new NeuralNetwork(2,[4, 25],1);
  lr_slider = createSlider(0.01, 0.5, 0.1, 0.01);
  console.table(nn.predict([0,0]));
  
}

function draw() {
  background(0);
  noStroke();
  nn.setLearningRate(lr_slider.value());

  for (let i = 0; i < 10; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);  
  }
  
  
  // show prediction graph
  showPredictGraph();
  let input = [1,0];
  let layers_result= [];
  let output = nn.predict(input, layers_result);
  showLayer(layers_result);
}

function showPredictGraph() {
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

function showLayer(layerResult)
{
  strokeWeight(2);
  let total_width = (4 * width / 5);
  let total_height = (4 * height / 5);

  let stepX = total_width / layerResult.length;
  let offsetX = (width - total_width) / 2 + (stepX / 2);
  
  for (let i = 0; i < layerResult.length; i++) {
    const layer = layerResult[i];
    
    let stepY = total_height / layer.length;
    let offsetY = (height - total_height) / 2 + (stepY/2);
    let x = offsetX + i * stepX;

    for (let j = 0; j < layer.length; j++) {
      const element = layer[j];
      
      let y = offsetY + j * stepY;
      
      //Draw links
      if (i < layerResult.length - 1)
      {
        let next_layer = layerResult[i + 1];
        
        for (let k = 0; k < next_layer.length; k++) {
          let stepY2 = total_height / next_layer.length;
          let offsetY2 = (height - total_height) / 2 + (stepY2/2);
    
          stroke(element * 255, element * 255, 255);
          line(x, y, x + stepX, offsetY2 + k * stepY2);
          
        }
        
      }
      let value = element * element * 255;
      fill(value, value, element * 127 + 127);
      
      stroke(255);
      ellipse(x, y, 10 + element * 20, 10 + element * 20);
    }

    
    
  }
}
