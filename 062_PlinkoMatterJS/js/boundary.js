class Boundary {
    constructor(x, y, w, h) {
        this.width = w;
        this.height = h;

        //Change rectmode from top left to center
        let newX = x + this.width / 2;
        let newY = y + this.height / 2;

        // Set boundary body to physics rectangle and make static
        this.body = Bodies.rectangle(newX, newY, this.width, this.height, {
            isStatic: true
        });
        // Add boundary body to world
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
        // Translate canvas, centering boundary
        translate(pos.x, pos.y);
        // Draw boundary at new center
        rect(-this.width / 2, -this.height / 2, this.width, this.height);
        // Restore canvas translation
        pop();
    }
}
