class Particle {
    constructor(x, y, r) {
        this.hue = random(360);
        this.radius = r;
        // Set particle body to a physics circle with bounce and friction
        this.body = Bodies.circle(x, y, this.radius, { restitution: 0.6, density: 0.5 });
        // Add particle body to world
        World.add(world, this.body);
    }

    show() {
        // Get position of physics body
        let pos = this.body.position;

        // Set drawing colours
        fill(this.hue, 100, 100);
        stroke(0);
        strokeWeight(2);

        // Save canvas translation
        push();
        // Translate canvas, centering particle
        translate(pos.x, pos.y);
        // Draw particle at new center
        ellipse(0, 0, this.radius * 2);
        // Restore canvas translation
        pop();
    }

    isOffscreen() {
        // Get x and y for particle body
        let x = this.body.position.x;
        let y = this.body.position.y;

        // Return true if offscreen horizontallyk
        return x < -this.radius || x > width + this.radius;
    }
}
