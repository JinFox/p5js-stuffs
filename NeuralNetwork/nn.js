/**
* @Author: Joaquim RENARD
* @Date:   2017-11-13T08:59:23+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-11-13T17:14:24+00:00
* @ Based on the model made by Daniel Shiffman
*/

function sigmoid(x) {
  return 1 / (1 + Math.exp(-x));
}

function dsigmoid(y) {
  // y is already sigmoided
  return y * (1 - y);
}

class NeuralNetwork {
  // TODO: MULTI HIDDEN LAYER 
  constructor(input_nb, hidden_nb, output_nb)
  {
    this.input_nodes = input_nb;
    this.hidden_nodes = hidden_nb;
    this.output_nodes = output_nb;
    this.activationFunc = sigmoid; // default activation function is sigmoid
    this.learning_rate = 0.1;

    this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

    this.weights_ih.randomize();
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);

    this.bias_h.randomize();
    this.bias_o.randomize();

  }
  
  /**
   * @param  {Array} inputs 
   * @returns {Array} output of the Neural network
   */
  feedForward(inputs) {
    // Compute hidden layer using inputs and weight Matrix
    let hidden = Matrix.multiply(this.weights_ih, Matrix.fromArray(inputs));
    hidden.add(this.bias_h);
    // Activation function
    hidden.map(this.activationFunc);

    // Generating the output
    let output = Matrix.multiply(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(this.activationFunc);
   
    return output.toArray();
  }

  /**
   * Supervised training function
   * @param  {Array} inputs
   * @param  {Array} targets The expected answer
   */
  train(inputs, targets) {
    // Compute hidden layer using inputs and weight Matrix
    let hidden = Matrix.multiply(this.weights_ih, Matrix.fromArray(inputs));
    hidden.add(this.bias_h);
    hidden.map(this.activationFunc);

    // Generating the output
    let outputs = Matrix.multiply(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(this.activationFunc);

    
    inputs = Matrix.fromArray(inputs);
    targets = Matrix.fromArray(targets);
    
    // Calculate the error
    let output_errors = Matrix.subtract(targets, outputs);

    // Calculate the gradient
    let output_gradients = Matrix.map(outputs, dsigmoid);
    output_gradients.multiply(output_errors);
    output_gradients.multiply(this.learning_rate);

    let hidden_t = Matrix.transpose(hidden);
    let weight_ho_deltas = Matrix.multiply(output_gradients, hidden_t);

    // apply the calculated deltas to weight
    this.weights_ho.add(weight_ho_deltas);
    // adjust the bias by deltas (just the gradients)
    this.bias_o.add(output_gradients);
    
    /////////////////////////////////////////////////////////////

    // Calculate hidden layer errors 
    // Get ponderated errors for hidden layer using transposed weights and output layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);

    // Calculate hidden gradient
    let hidden_gradients = Matrix.map(hidden, dsigmoid);
    hidden_gradients.multiply(hidden_errors);
    hidden_gradients.multiply(this.learning_rate);

    // calculate input to hidden deltas
    let inputs_t = Matrix.transpose(inputs);
    let weight_ih_deltas = Matrix.multiply(hidden_gradients, inputs_t);

    // apply the calculated deltas to weights_ih
    this.weights_ih.add(weight_ih_deltas);
    // adjust the hidden bias by deltas (just the hidden gradients)
    this.bias_h.add(hidden_gradients);


  }

}

