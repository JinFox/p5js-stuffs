/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-20T14:33:12+00:00
*/


function SegmentForward() {
	var a;
	var b;
	var angle;
	var selfAngle;
	var len;
	var weight;
	var color;
	var rand;
	var parent = undefined;
	var child = undefined;


	this.calculateB = function ()
	{
		if (this.b !== undefined)
		{
			//console.log("calculating angle : " + this.angle);
			this.b.set((this.len * cos(this.angle)),
			 						(this.len * sin(this.angle)));
			this.b = this.b.add(this.a);
		}
	}

	this.setAngle = function (angle, relative = false)
	{
		if (relative){
			this.selfAngle += angle;
			this.calculateAngle();
		}
		else {
			this.selfAngle = angle;
			this.calculateAngle();
		}
	}

	this.calculateAngle = function(){
		this.angle = this.selfAngle;
		if (this.parent !== undefined)
			this.angle += this.parent.angle;
	}

	this.fromPoint = function (x, y, angle, len, weight = 3, col = 255)
	{
			this.a = createVector(x, y);
			this.angle = angle;
			this.selfAngle = angle;
			this.len = len;
			this.b = 	this.a.copy();
			this.weight = weight;
			this.color = col;
			this.rand = random(255);
			this.calculateAngle();
			this.calculateB();
			return this;
	}

	this.fromParent = function (parent,  angle, len, weight = 3, col = 255)
	{
			this.a = parent.b.copy();
			this.selfAngle = angle;
			this.len = len;
			this.b = this.a.copy();
			this.weight = weight;
			this.color = col;
			this.parent = parent;
			this.rand = random(255);
			this.calculateAngle();
			this.calculateB();
			return this;
	}


	this.update = function() {
		if (this.parent !== undefined)
			this.a.set(this.parent.b);
		this.calculateAngle();
		this.calculateB();
	}

	this.show =  function(){
		stroke(this.color);
		strokeWeight(this.weight);
		line(this.a.x,this.a.y,this.b.x,this.b.y);
	}

	this.wiggle = function(phase, angleVariation){
		this.setAngle(map(noise(phase + this.rand), 0, 1, -angleVariation, angleVariation));
		this.rand+= 0.01;
	}

}
