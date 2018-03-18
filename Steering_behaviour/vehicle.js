function Vehicle(x, y)
{
  this.pos = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0, 0);

  this.size = 30;
  this.maxforce = 0.2;
  this.maxspeed = 3;


  this.seek = function (target)
  {
    var desired = p5.Vector.sub(target, this.pos);

    desired.setMag(this.maxspeed);

    var steer = p5.Vector.sub(desired, this.velocity);

    steer.setMag(this.maxforce);
    this.applyForce(steer);
  }


  this.applyForce = function (force)
  {
    this.acceleration.add(force);
  }



  this.update = function ()
  {
    // Update velocity
    this.velocity.add(this.acceleration);
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
    // Reset acceleration to 0 each cycle
    this.acceleration.mult(0);
  }

  this.display = function()
  {
    translate(this.pos.x, this.pos.y);
    var theta = this.velocity.heading();
    rotate(theta);
    noFill();
    strokeWeight(2);
    stroke(150, 150, 240);
    beginShape();
    vertex(this.size, 0);
    vertex(0, this.size / 3);
    vertex(0, -this.size / 3);
    endShape(CLOSE);
  }
}
