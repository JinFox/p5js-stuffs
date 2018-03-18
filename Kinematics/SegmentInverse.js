/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-23T11:31:11+00:00
*/


function SegmentInverse() {
	var a;
	var b;
	var angle;
	//var selfAngle;
	var len;

	var weight;
	var color;

	this.fromPoint = function (x, y, len, angle = 0, weight = 3, col = 255)
	{
			this.a = createVector(x, y);
			this.angle = angle;
	//		this.selfAngle = angle;
			this.len = len;
			this.b = 	this.a.copy();

			this.weight = weight;
			this.color = col;

			this.calculateB();
			return this;
	}

	this.fromParent = function (parent,  len, angle=0, weight = 3, col = 255)
	{
			this.a = parent.b.copy();
			this.len = len;
			this.angle = angle;
			this.weight = weight;
			this.color = col;

			this.calculateB();
			return this;
	}

	this.calculateB = function (t)
	{
		if (this.b === undefined)
				this.b = createVector(0,0);

			var nx = this.len * cos(this.angle);
			var ny = this.len * sin(this.angle);
			this.b.set(nx, ny).add(this.a);

	}
	this.setA = function (newA){
		this.a.set(newA);
		this.calculateB();
	}

	this.follow = function (tx, ty) {
		var target = createVector(tx, ty);

		var dir = p5.Vector.sub(target, this.a);
		this.angle = dir.heading();

		dir.setMag(this.len);
		dir.mult(-1);

		this.a = p5.Vector.add(target, dir);
	}

	this.update = function() {
		this.calculateB();
	}

	this.show =  function(){
		stroke(this.color);
		strokeWeight(this.weight);
		line(this.a.x,this.a.y,this.b.x,this.b.y);
	}

}
