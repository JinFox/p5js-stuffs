/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-11-16T15:47:44+00:00
*/

var brain;
var m;
var m2;


let training_data = [
  {inputs:[0,0], targets:[0]},
  {inputs:[0,1], targets:[1]},
  {inputs:[1,0], targets:[1]},
  {inputs:[1,1], targets:[0]}
]



function setup() {
	//createCanvas(800, 600);
	//pixelDensity(1);
  //colorMode(RGB, 255, 255, 255);
  //background(42, 221, 21);

	
  // let a = new Matrix(2, 3).randomize();
  // let b = new Matrix(3, 2).randomize();
  // a.print();
  // b.print();
  // let c = Matrix.multiply(a, b);
  // c.print();
  // Matrix.transpose(a).print();

  let nn = new NeuralNetwork(2,2,1);
  
  for (let i = 0; i < 100000; i++) {
    let data = random(training_data);
    nn.train(data.inputs, data.targets);  
  }

  console.log(nn.feedForward([0,0]));
  console.log(nn.feedForward([0,1]));
  console.log(nn.feedForward([1,0]));
  console.log(nn.feedForward([1,1]));
}

function draw() {

}
