/**
* @Author: Joaquim RENARD
* @Date:   2017-11-13T08:59:23+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-11-13T17:14:24+00:00
* @ Based on the model made by Daniel Shiffman
*/


class NeuralNetwork {
  // TODO: MULTI HIDDEN LAYER 
  constructor(input_nb, hidden_nb, output_nb)
  {
    this.input_nodes = input_nb;
    this.hidden_nodes = hidden_nb;
    this.output_nodes = output_nb;

    this.weight_ih = new Matrix(this.hidden_nodes, this.input_nodes);
    this.weight_ho = new Matrix(this.output_nodes, this.hidden_nodes);

    this.weight_ih.randomize();
    this.weight_ho.randomize();

    this.bias_h = new Matrix(this.hidden_nodes, 1);
    this.bias_o = new Matrix(this.output_nodes, 1);

    this.bias_h.randomize();
    this.bias_o.randomize();


  }
  
  /**
   * @param  {Array} inputs 
   * @param  {Array} outputs
   * @returns {Array} output of the Neural network
   */
  feedForward(inputs) {

    let guess = 1;
    
    return guess;
  }

}

