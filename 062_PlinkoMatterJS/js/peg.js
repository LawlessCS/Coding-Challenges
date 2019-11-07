class Peg {
    constructor(x, y, r) {
        this.radius = r;
        // Set peg body to physics circle and make static
        this.body = Bodies.circle(x, y, this.radius, { isStatic: true, friction: 0.75 });
        // Set label of body to peg
        this.body.label = "peg";
        // Add peg body to world
        World.add(world, this.body);
    }

    show() {
        // Get position of physics body
        let pos = this.body.position;

        // Set drawing colours
        fill(0, 0, 50);
        stroke(0);
        strokeWeight(1);

        // Save canvas translation
        push();
        // Translate canvas, centering peg
        translate(pos.x, pos.y);
        // Draw peg at new center
        ellipse(0, 0, this.radius * 2);
        // Restore canvas translation
        pop();
    }
}
