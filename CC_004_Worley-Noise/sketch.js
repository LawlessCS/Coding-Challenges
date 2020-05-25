const NUM_POINTS = 25;
const N = 1;
const rValue = 2500;

let points = [];

function setup() {
    createCanvas(250, 250);
    background(0);

    // Fill points array
    for (let i = 0; i < NUM_POINTS; i++) {
        // Push object with coords to points array
        points.push({ x: floor(random(width)), y: floor(random(height)) });
    }

    // Set pixel density to 1 to negate page zoom
    pixelDensity(1);
    // Load canvas pixels into 'pixels' array
    loadPixels();
}

function draw() {
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            let index = getPixelIndex(x, y);

            let distances = [];
            for (let point of points) {
                distances.push(hypotSquared(point.x - x, point.y - y));
            }

            distances.sort((a, b) => a - b);

            let noise = map(distances[N - 1], 0, rValue, 0, 255);

            setPixel(index, getColour(noise));
        }
    }

    // Update canvas pixels to match 'pixels' array
    updatePixels();
}

function getPixelIndex(x, y) {
    return 4 * (x + y * width);
}

function setPixel(index, colour) {
    pixels[index + 0] = colour.r;
    pixels[index + 1] = colour.g;
    pixels[index + 2] = colour.b;
    pixels[index + 3] = colour.a;
}

function hypotSquared(a, b) {
    return Math.abs(a * a + b * b);
}
