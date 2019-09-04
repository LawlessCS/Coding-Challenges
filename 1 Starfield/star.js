class Star {
    constructor() {
        this.x = random(-width, width);
        this.y = random(-height, height);
        this.z = random(width);

        this.pz = this.z;

        this.size = 4;
    }

    update() {
        this.z -= speed;

        if (this.z < 1) {
            this.x = random(-width / 2 , width / 2);
            this.y = random(-height / 2, height / 2);
            this.z = width;
            this.pz = this.z;
        }
    }

    show() {
        fill(255);
        noStroke();

        let sx = map(this.x / this.z, 0, 1, 0, width);
        let sy = map(this.y / this.z, 0, 1, 0, height);

        this.size = map(this.z, 0, width, 8, 0);
        //ellipse(sx, sy, this.size, this.size);

        let px = map(this.x / this.pz, 0, 1, 0, width);
        let py = map(this.y / this.pz, 0, 1, 0, height);

        this.pz = this.z;
        stroke(255);
        line(px, py, sx, sy);
    }
}