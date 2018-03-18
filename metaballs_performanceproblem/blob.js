/**
* @Author: Joaquim RENARD
* @Date:   2017-01-22T00:02:39+00:00
* @Last modified by:   Joaquim RENARD
* @Last modified time: 2017-01-22T10:17:40+00:00
*/

function Blob(x, y)
{
  this.pos = new p5.Vector(x, y);
  this.vel = p5.Vector.random2D();
  this.vel.mult(random(2, 5));
  this.radius = 4000;

  this.update = function()
  {
    this.pos.add(this.vel);

    if (this.pos.x > width || this.pos.x < 0)
    {
      this.vel.x *= -1;
    }

    if (this.pos.y > height || this.pos.y < 0)
    {
      this.vel.y *= -1;
    }

  }

  this.show = function()
  {
    //noStroke();
    stroke(255);
    noFill();
    ellipse(this.pos.x, this.pos.y, this.radius, this.radius);
  }
}
