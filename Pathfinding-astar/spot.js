/**
* @Author: Joaquim RENARD <Jin47>
* @Date:   2017-01-17T15:01:23+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-01-18T14:00:44+00:00
*/

function Spot(x, y, isWall) {
// score
  this.f = 0;
  this.g = 0;
  this.h = 0;

//coord
  this.x = x;
  this.y = y;

	this.wall = isWall;



	this.neighbors = [];
	this.previous = undefined;
	this.show = function (col)
  {
		if (this.wall)
		{
			fill(0);
			strokeWeight(0);
			//rect(x * sizeX, y * sizeY, sizeX , sizeY);
			ellipse(x * sizeX + offX, y * sizeY + offY, sizeX , sizeY);
		}
		else {
			fill(col);
			noStroke();
			//strokeWeight(1);
			rect(x * sizeX, y * sizeY, sizeX , sizeY );
		}

  }
	this.showLine = function (col)
	{
		fill(this.wall ? 0 : col);
		stroke(col);
		strokeWeight(3);

		if (this.previous)
    {
			line(x * sizeX + offX, y * sizeY + offY,
				 this.previous.x *sizeX + offX , this.previous.y *sizeY + offY);
    }

	}

	this.addNeighbors = function(grid)
	{
		var starti = this.x > 0 ? -1 : 0;
		var endi = this.x < cols - 1 ? 1 : 0;
		var startj = this.y > 0 ? -1 : 0;
		var endj = this.y < rows - 1 ? 1 : 0;

		for (var i = starti; i <= endi; i++) {
			for (var j = startj; j <= endj; j++) {
        if ((i == 0 && j == 0) || (!enableDiagonals && !(i == 0 || j == 0)))
          continue;

  			var cur = grid[this.x + i][this.y + j];
  			if (!cur.wall)
  		     this.neighbors.push(cur);
			}
		}

	}
}
