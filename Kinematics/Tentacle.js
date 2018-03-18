function Tentacle(x, y, len, nbJoint, weight, segmentFactor = 1, col) {
  this.segments = [];
  this.nbJoint = nbJoint;
  this.base = createVector(x, y);

  this.col = col === undefined ? color(0,200,0) : col;

  this.segments.push(new SegmentInverse().fromPoint(x, y, len, 0, weight, col));

	for (var i = 1; i < nbJoint; i++) {
      weight *= segmentFactor;
      len *= segmentFactor;
      var seg = new SegmentInverse().fromParent(this.segments[i-1], len, 0, weight, this.col);
			this.segments.push(seg);
  }

  this.update = function(toFollow){

    for (var i = this.segments.length - 1; i >= 0; i--) {

        if (i == this.nbJoint-1 && toFollow !== undefined)
        {
          this.segments[i].follow(toFollow.x,toFollow.y);
        }
        else
        {
          var as= this.segments[i + 1].a;
          this.segments[i].follow(as.x, as.y);
        }
        this.segments[i].update();
    }

    this.segments[0].setA(this.base);
    for (var i = 1; i < this.segments.length; i++)
      this.segments[i].setA(this.segments[i - 1].b);
  }

  this.show = function(){
    for (var i = 0; i < this.segments.length; i++) {
         this.segments[i].show();
    }
  }
}
