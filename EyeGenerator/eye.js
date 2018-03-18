/**
* @Date:   2017-01-12T15:16:55+00:00
* @Last modified time: 2017-03-24T11:12:39+00:00
*/



function Eye(x_, y_, sizeX_, sizeY_){
		this.pos = createVector(x_, y_);
		this.size = createVector(sizeX_, sizeY_);
		this.nbVertex = 500;
		this.t = 0;
		this.update = function() {

		}


		this.show = function () {
			var da = TWO_PI / this.nbVertex;
			
			stroke(255, 150, 50);
			fill(255, 150, 50);
			beginShape();
			for(var i = 0; i < this.nbVertex; i++)
			{
				var dx = this.pos.x + this.size.x * cos(i * da);
				var dy = this.pos.y + this.size.y * sin(i * da);
				//var r = noise(this.t + i) * 155;

				vertex(dx, dy);
			}
			endShape(CLOSE);
			for(var i = 0; i < this.nbVertex; i++)
			{
				var dx = this.pos.x + this.size.x * cos(TWO_PI - i * da);
				var dy = this.pos.y + this.size.y * sin(TWO_PI - i * da);
				var r = noise(this.t + i) * 155;

				stroke(255, r + 100, 50);
				strokeWeight(random(3) + 10);
				//line(this.pos.x, this.pos.y, dx, dy);

			}

			//line(this.pos.x, this.pos.y, dx, dy);
			stroke(0);
			fill(0);
			strokeWeight(0);
			var offx = + noise(this.t) * this.size.x;
			var offy = + noise(this.t + 5000 ) * 20;
			ellipse(this.pos.x , this.pos.y , 150, 150);
			this.t += 0.01;

		}

}
