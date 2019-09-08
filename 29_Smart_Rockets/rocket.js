class Rocket {
    constructor(lifespan, target, dna) {
        this.pos = createVector(width / 2, height - 25);
        this.vel = createVector();
        this.acc = createVector();

        this.dna = dna ? dna : new DNA(lifespan);

        this.target = target;
        this.fitness = 0;
        this.completed = false;

        this.count = 0;
    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
        var d = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);

        if (d < 20) {
            this.completed = true;
            this.pos = this.target;
        }

        this.applyForce(this.dna.genes[this.count]);
        if (!this.completed) {
            this.vel.add(this.acc);
            this.pos.add(this.vel);
            this.acc.mult(0);
        }

        this.count++;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        rectMode(CENTER);
        noStroke();
        fill(255, 150);
        rect(0, 0, 25, 5);
        pop();
    }

    calculateFitness() {
        let d = dist(this.pos.x, this.pos.y, this.target.x, this.target.y);
        this.fitness = map(d, 0, width, width, 0);

        this.fitness *= this.completed ? 10 : 1;
    }
}
