/**
* @Author: Joaquim RENARD
* @Date:   2017-01-21T20:14:26+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-01-22T00:07:26+00:00
*/

function Cell(i, j)
{
  this.i = i;
  this.j = j;
  this.visited = false;

  this.walls = [true, true, true, true];
  this.depth = 0;
  this.setDepth = function(depth) {
	  this.depth = depth;
  }
  this.show = function(maxDepth)
  {
    var x = this.i*w;
    var y = this.j*h;
    if (this.visited)
      {
        noStroke();
		var col = this.depth ? this.depth/maxDepth * 255 : 0;
        fill(col, 200, 200, 255);
		rect(x, y, w, h);
		fill(255);
		text(this.depth, x + w/3,y + h/2);
        
      }

    stroke(255);
    strokeWeight(1);


    if (this.walls[0])
      line(x    , y     , x + w, y);  //top
    if (this.walls[1])
      line(x + w, y     , x + w, y + h);// right
    if (this.walls[2])
      line(x    , y + h , x + w, y + h);// bottom
    if (this.walls[3])
      line(x    , y     , x    , y + h);// left

    //lolol = ! lolol;
    //rect(x, y, w-1, h -1);
  }
  this.highlight = function(col){
    noStroke();
    fill(col);
    rect((i * w) + 1, (j * h) + 1, w - 1, h - 1);

  }

  this.getNeighbor = function()
  {
    var j = this.j;
    var i = this.i;

    var neighbors = [];

    if (j > 0)
    {
      var top = cells[this.index(i, j - 1)];
      if (!top.visited)
        neighbors.push(top);

    }

    if (i < cols - 1)
    {
        var right = cells[this.index(i + 1, j)];
        if (!right.visited)
          neighbors.push(right);
    }

    if (j < rows - 1)
    {
      var bottom = cells[this.index(i, j + 1)];
      if (!bottom.visited)
        neighbors.push(bottom);

    }

    if (i > 0)
    {
      var left = cells[this.index(i - 1, j)];
      if (!left.visited)
        neighbors.push(left);
      }

      if (neighbors.length > 0)
      {
        return random(neighbors);
      }
      return undefined;

  }

  this.index = function(i, j)
  {
    return (i + j * cols);
  }
}
