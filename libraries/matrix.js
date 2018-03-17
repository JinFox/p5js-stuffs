/**
* @Author: Joaquim RENARD
* @Date:   2017-11-13T17:14:35+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-11-16T15:56:45+00:00
*/

class Matrix{  
  
  constructor(rows, cols)
  {
    this.rows = rows;
    this.cols = cols;
    this.data = [];
  
    for (let i = 0; i< this.rows ; i++)
    {
      this.data[i] = []
      for (let j = 0; j < this.cols ; j++)
      {
        this.data[i][j] = 0;
      }
    }

  }
  
  copy() {
    let m = new Matrix(this.rows, this.cols);
    m.map((elem, i, j) => this.data[i][j]);
    
    return m;
  }

  
  /**
   * Creates a Matrix with arr.length lines and 1 Column
   * @param  {} arr The Array to convert
   */
  static fromArray(arr) {
    let m = new Matrix(arr.length, 1).map((elem, i) => arr[i]);
    return m;
  }
  
  toArray() {
    let arr = [];
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  }

  static subtract(a, b) {
    if (a.rows !== b.rows || a.cols !== b.cols) {
      console.log('Columns and Rows of A must match Columns and Rows of B.');
      return;
    }

    // Return a new Matrix a-b
    return new Matrix(a.rows, a.cols)
      .map((elem, i, j) => a.data[i][j] - b.data[i][j]);
  }


  set(n) { // copy values of n into this
    if (n instanceof Matrix) {
      this.rows = n.rows;
      this.cols = n.cols;
      this.data = [];
      for (let i = 0; i< this.rows ; i++)
      {
        this.data[i] = [];
        for (let j = 0; j < this.cols ; j++)
        {
          this.data[i][j] = n.data[i][j];
        }
      }
    }
    return this; // for linked call 
   }

   print()
   {
     console.table(this.data);
     return this;
   }

   
   /**
    * @param  {} func A function taking 3 arguments (current elem, row Index, column index)
    */
   map(func)
   {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.data[i][j] = func(this.data[i][j], i, j);
      }
    }
    return this; // for linked call 
   }

  static map(matrix, func) {    
    return new Matrix(matrix.rows, matrix.cols).map((e, i, j) => func(matrix.data[i][j], i, j));
   }


  add(n) {
    if (n instanceof Matrix) {
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }
      return this.map((elem, i, j) => elem + n.data[i][j]);
    } else {
      return this.map(elem => elem + n);
    }
  }

  randomize(min = -1.0, max = 1.0) {
    return this.map(e => Math.random() * (max - min) + min);
  }

  static transpose(n) {
    return new Matrix(n.cols, n.rows).map((_, i, j) => n.data[j][i]);
  }

  
  multiply(n) {
    if (n instanceof Matrix)
    { // dot product
      if (this.rows !== n.rows || this.cols !== n.cols) {
        console.log('Columns and Rows of A must match Columns and Rows of B.');
        return;
      }

      // hadamard product
      return this.map((e, i, j) => e * n.data[i][j]);
    } else {
      return this.map(e => e * n);
    }
  }

  static multiply(m1, m2) {
      if (m1.cols != m2.rows) {
        console.log("Columns of m1 must be equal to rows of m2");
        return ;
      }

      return new Matrix(m1.rows, m2.cols).map((elem, i, j) => {
        let sum = 0;
        for (let k = 0; k < m1.cols; k++) {
          sum += m1.data[i][k] * m2.data[k][j];
        }
        return sum;
      });

  }

  serialize() {
    return JSON.stringify(this);
  }

  static deserialize(data) {
    if (typeof data == 'string') {
      data = JSON.parse(data);
    }
    let matrix = new Matrix(data.rows, data.cols);
    matrix.data = data.data;
    return matrix;
  }


}