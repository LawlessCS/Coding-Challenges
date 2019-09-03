class Vehicle {
    constructor(x, y) {
        this.pos = createVector(random(width), random(height));
        this.vel = p5.Vector.random2D();
        this.acc = createVector();

        this.r = 3;
        this.maxSpeed = 5;
        this.maxForce = 0.5;
        this.target = createVector(x, y);

        this.arriveWeight = 1;
        this.fleeWeight = 15;

        this.mouseRange = 50;
    }

    update() {
        this.behaviours();

        this.pos.add(this.vel);
        this.vel.add(this.acc);
        this.acc.mult(0);
    }

    show() {
        fill(0, 255, 0);
        noStroke();
        ellipse(this.pos.x, this.pos.y, this.r, this.r);
    }

    behaviours() {
        let arrive = this.arrive(this.target);
        let mouse = createVector(mouseX, mouseY);

        arrive.mult(this.arriveWeight);

        this.applyForce(arrive);
    }

    arrive(target) {
        let desired = p5.Vector.sub(target, this.pos);
        let d = desired.mag();
        let speed = this.maxSpeed;

        if (d < 100) speed = map(d, 0, 100, 0, this.maxSpeed);

        desired.setMag(speed);

        let steer = p5.Vector.sub(desired, this.vel);
        steer.limit(this.maxForce);

        return steer;
    }

    flee(target) {
        let desired = p5.Vector.sub(target, this.pos);
        var d = desired.mag();

        if (d < this.mouseRange) {
            desired.setMag(this.maxSpeed);
            desired.mult(-1);

            let steer = p5.Vector.sub(desired, this.vel);
            steer.limit(this.maxForce);

            return steer;
        } else {
            return createVector(0, 0);
        }
    }

    applyForce(force) {
        this.acc.add(force);
    }
}
