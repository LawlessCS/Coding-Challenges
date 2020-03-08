let counter = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(map(Math.sin(0.1 * counter), -1,  1, 50, 200));
    counter++;
}