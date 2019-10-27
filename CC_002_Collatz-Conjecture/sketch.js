let counter = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    let backColour = map(0.5 + 0.5 * sin(counter / 25), 0, 1, 0.25, 0.75);
    backColour *= 255;
    background(backColour);

    counter++;
}