/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-11-16T15:47:44+00:00
*/

var brain;
var m;
var m2;
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
  let input = [1, 0];

  let output = nn.feedForward(input);

  console.log(output);
}

function draw() {

}
