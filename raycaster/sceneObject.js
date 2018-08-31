class sceneObject {

    constructor(position) {
        this.position = position;
    }

    Intersect(ray) {}

}

class Sphere extends sceneObject {

    constructor(position, radius, color) {

        super(position);
        //this.position = position;
        this.radius = radius;
        this.color = color;
    }

    Intersect(ray) {
        let rs = p5.Vector.sub(this.position, ray.origin)
        // s center of sphere
        // ro ray origin
        // rd direction
        // t dot product between ray and s - ro () (nearest point on the ray from the sphere center)
        let t = p5.Vector.dot(rs, ray.direction);
        console.log(rs);
        console.log(ray.direction);
        console.log(t);
        let p = p5.Vector.add(ray.origin, p5.Vector.mult(ray.direction, t)); // point in space of t along ray direction

        let y =  p5.Vector.dist(p, this.position);

        if (y < this.radius) {
            let x = sqrt(this.radius*this.radius - y*y);
            let t1 = t - x;
            let t2 = t + x;
            console.log("YOUHOU");
            return this.color; // Should return more precise info like point of intersection, normal etc
        }
        return undefined;
    }


}