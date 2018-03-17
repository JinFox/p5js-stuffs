/**
* @Author: Joaquim RENARD
* @Date:   2017-11-13T08:59:23+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-11-13T17:14:24+00:00
* @ Based on the model made by Daniel Shiffman
*/

class NeuralNetwork {
  // TODO: MULTI HIDDEN LAYER 
  constructor(a, b, c)
  {
    if (a instanceof NeuralNetwork)
    {
      this.input_nodes = a.input_nodes;
      this.hidden_nodes = a.hidden_nodes;
      this.output_nodes = a.output_nodes;
      
      this.weights_ih = a.weights_ih.copy();
      this.weights_ho = a.weights_ho.copy();

      this.bias_h = a.bias_h.copy();
      this.bias_o = a.bias_o.copy();

      this.setActivationFunction(a.activation_function);
      this.setLearningRate(a.learning_rate);
    } else {
      this.input_nodes = a;
      this.hidden_nodes = b;
      this.output_nodes = c;
      
      this.weights_ih = new Matrix(this.hidden_nodes, this.input_nodes);
      this.weights_ho = new Matrix(this.output_nodes, this.hidden_nodes);

      this.weights_ih.randomize();
      this.weights_ho.randomize();

      this.bias_h = new Matrix(this.hidden_nodes, 1);
      this.bias_o = new Matrix(this.output_nodes, 1);

      this.bias_h.randomize();
      this.bias_o.randomize();
      this.setActivationFunction();
      this.setLearningRate();
    }
    
  }
  computeLayer(inputs, weights, bias) {
    // Apply weights to the inputs
    let layer = Matrix.multiply(weights, inputs);
    // Apply the bias
    layer.add(bias);
    layer.map(this.activation_function.func);
    return layer;
  }

  
  /**
   * @param  {Array} inputs 
   * @returns {Array} output of the Neural network
   */
  predict(inputs) {
    // Compute hidden layer using inputs and weight Matrix
    let hidden = this.computeLayer(inputs, this.weights_ih, this.bias_h);
    // Generating the output
    let outputs = this.computeLayer(hidden, this.weights_ho, this.bias_o);
    return output.toArray();
  }

  /**
   * Supervised training function
   * @param  {Array} inputs
   * @param  {Array} targets The expected answer
   */
  train(inputs, targets) {
    inputs = Matrix.fromArray(inputs);
    targets = Matrix.fromArray(targets);

    // Compute hidden layer using inputs and weight Matrix
    let hidden = this.computeLayer(inputs, this.weights_ih, this.bias_h);

    // Generating the output
    let outputs = this.computeLayer(hidden, this.weights_ho, this.bias_o);

    // Calculate the error
    let output_errors = Matrix.subtract(targets, outputs);
    this.trainLayer(hidden, outputs, output_errors, this.weights_ho, this.bias_o);
    
    /////////////////////////////////////////////////////////////

    // Calculate hidden layer errors 
    // Get ponderated errors for hidden layer using transposed weights and output layer errors
    let who_t = Matrix.transpose(this.weights_ho);
    let hidden_errors = Matrix.multiply(who_t, output_errors);
    
    this.trainLayer(inputs, hidden, hidden_errors, this.weights_ih, this.bias_h);

  }
  
  
  trainLayer(input, out, error, weights, bias) {
    // Calculate the gradient
    let gradients = Matrix.map(out, this.activation_function.dfunc);
    gradients.multiply(error);
    gradients.multiply(this.learning_rate);

    // Apply the gradient in backpropagation to the input (input needs to be transposed for it to work)
    let input_t = Matrix.transpose(input);
    let weights_deltas = Matrix.multiply(gradients, input_t);

    // apply the calculated deltas to weight
    weights.add(weights_deltas);
    // adjust the bias by deltas (just the gradients)
    bias.add(gradients);
    
  }

  setLearningRate(learning_rate = 0.1) {
    this.learning_rate = learning_rate;
  }

  setActivationFunction(func = sigmoid) {
    this.activation_function = func;
  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let nn = new NeuralNetwork(data.input_nodes, data.hidden_nodes, data.output_nodes);
    nn.weights_ih = Matrix.deserialize(data.weights_ih);
    nn.weights_ho = Matrix.deserialize(data.weights_ho);
    nn.bias_h = Matrix.deserialize(data.bias_h);
    nn.bias_o = Matrix.deserialize(data.bias_o);
    nn.learning_rate = data.learning_rate;
    return nn;
  }
  
}


/**
 * Activation function class
 *
 */

class ActivationFunction {
  constructor(func, dfunc) {
    this.func = func;
    this.dfunc = dfunc;
  }
}

let sigmoid = new ActivationFunction(
  x => 1 / (1 + Math.exp(-x)),
  y => y * (1 - y)
);

let tanh = new ActivationFunction(
  x => Math.tanh(x),
  y => 1 - (y * y)
);

