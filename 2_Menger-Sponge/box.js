class Box {
    constructor(x, y, z, size) {
        this.pos = createVector(x, y, z);
        this.size = size;
    }

    generate() {
        let boxes = [];

        for (let x = -1; x < 2; x++) {
            for (let y = -1; y < 2; y++) {
                for (let z = -1; z < 2; z++) {
                    if (Math.abs(x) + Math.abs(y) + Math.abs(z) > 1) {
                        let newSize = this.size / 3;
                        let b = new Box(
                            this.pos.x + x * newSize,
                            this.pos.y + y * newSize,
                            this.pos.z + z * newSize,
                            newSize
                        );
                        boxes.push(b);
                    }
                }
            }
        }

        return boxes;
    }

    show() {
        push();
        translate(this.pos.x, this.pos.y, this.pos.z);
        noStroke();
        fill(255);
        normalMaterial();
        box(this.size);
        pop();
    }
}
