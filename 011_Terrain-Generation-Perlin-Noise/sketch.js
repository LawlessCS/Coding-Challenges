let cols;
let rows;

let w;
let h;
let scale;

let flying;

let terrain = [];

let rotateAmt;

function setup() {
    createCanvas(600, 600, WEBGL);

    w = 2000;
    h = 1600;
    scale = 20;

    cols = w / scale;
    rows = h / scale;

    flying = 0;

    for (let i = 0; i < cols; i++) {
        terrain[i] = [];
    }

    rotateAmt = PI / 3;
}

function draw() {
    background(0);
    stroke(100);
    noFill();
    translate(0, 50);
    rotateX(rotateAmt);
    translate(-w / 2, -h / 2);
    
    flying -= 0.1;
    let yoff = flying;

    for (let y = 0; y < rows; y++) {
        let xoff = 0;
        let yScale = y * scale;
        let y1Scale = (y + 1) * scale;

        beginShape(TRIANGLE_STRIP);

        for (let x = 0; x < cols; x++) {
            terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);

            let xScale = x * scale;
            vertex(xScale, yScale, terrain[x][y]);
            vertex(xScale, y1Scale, terrain[x][y + 1]);

            xoff += 0.2;
        }
        
        endShape();

        yoff += 0.2;
    }
}
