function Particle() {
	this.maxSpeed = 4;
	this.pos = createVector(random(width), random(height));
	this.vel = createVector(0,0);
	this.acc = createVector(0,0);
	
	this.previousPos = this.pos.copy();
	
	
	this.update = function () {
			this.vel.add(this.acc);
			this.vel.limit(this.maxSpeed);
			
			this.pos.add(this.vel);
			this.acc.mult(0);
			
	}
	
	this.applyForce = function(force) {
		this.acc.add(force);
	}
	
	this.follow = function(vectors){
		var x = floor(this.pos.x / scl);
		var y = floor(this.pos.y / scl);
		
		var index = x + y * cols;
		
		var force = vectors[index];
		
		this.applyForce(force);	
	}
	
	this.show = function(zoff) {
		stroke(0, 5);
		//stroke(0);
		strokeWeight(1);
		line(this.pos.x, this.pos.y, this.previousPos.x, this.previousPos.y);
		this.updatePrev()
	}
	
	this.updatePrev = function()
	{
		this.previousPos.x = this.pos.x;
		this.previousPos.y = this.pos.y;
	}
	
	this.edges = function()
	{
		if (this.pos.x > width)
		{
			this.pos.x = 0;
			this.updatePrev();
		}
		if (this.pos.x < 0) 
		{
			this.pos.x = width;
			this.updatePrev();
		}
		if (this.pos.y > height){
			this.pos.y = 0;
			this.updatePrev();
		}
		if (this.pos.y < 0)
		{
			this.pos.y = height;
			this.updatePrev();
		}
	}
	
}
