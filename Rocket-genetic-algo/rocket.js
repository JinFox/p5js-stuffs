

function Rocket(dna)
{
	this.id = -1;
	this.pos = startPos.copy();
	this.velocity = createVector();
	this.acceleration = createVector();
  this.fitness = 0;
	this.reachedTarget = false;
	this.crashed = false;


  this.dna;
  if (dna) {
    this.dna = dna;
  } else {
    this.dna = new DNA();
  }

	this.calcFitness = function()
	{
		var d = dist(this.pos.x, this.pos.y, target.x, target.y);
		this.fitness = map(d, 0, width, width, 0);
		if (this.reachedTarget)
		{
			this.fitness *= 10;
		}
		if (this.crashed)
		{
			this.fitness /= 10;
		}
	}

	this.applyForce = function(force)  	{
			this.acceleration.add(force);
		}

	this.update = function()
	{
			var d = dist(this.pos.x, this.pos.y, target.x, target.y);
			if (d < 10)
			{
				this.reachedTarget = true;
				this.pos = target.copy();
			}

			this.manageObstacle();

			this.applyForce(this.dna.genes[count]);
			if (!this.reachedTarget && !this.crashed)
			{
				this.velocity.add(this.acceleration);
				this.pos.add(this.velocity);
				this.acceleration.mult(0);
				this.velocity.limit(maxVelocity);
			}
	}

	this.show = function ()
	{
		push();
    noStroke();
    rectMode(CENTER);
		translate(this.pos.x, this.pos.y);
		rotate(this.velocity.heading());

		if (this.reachedTarget) { fill(0, 255, 0, 150);
		} else if (this.crashed) { fill(255, 0, 0, 150);
		} else { fill(255, 150); }

		rect(0,0, 24, 8);
    fill(255);
		//text(this.id, 0, 0);//display rocket ID
		pop();
	}

	this.manageObstacle = function()
	{
		if ((this.pos.x > rx && this.pos.x < rx + rw &&	this.pos.y > ry && this.pos.y < ry + rh))	this.crashed = true;

		if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0)
					this.crashed = true;

	}
}
