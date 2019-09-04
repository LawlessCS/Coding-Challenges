let stars = [];
let numStars;
let speed;
let maxSpeed;

function setup() {
    numStars = 400;
    speed = 10;
    maxSpeed = 50;

    createCanvas(800, 800);

    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function draw() {
    background(0);
    translate(width / 2, height / 2);

    speed = map(mouseX, 0, width, 0, maxSpeed);
    for (let star of stars) {
        star.update();
        star.show();
    }
}

function mousePresed() {
    speed = map(mouseX, 0, width, 0, maxSpeed);
}