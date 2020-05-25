const NUM_POINTS = 30;
const N = 1;
const rValue = 150000;

const numSlices = 1;
let z = 0;

let points = [];

function setup() {
    createCanvas(1600, 900);
    background(0);
    frameRate(1);

    // Fill points array
    for (let i = 0; i < NUM_POINTS; i++) {
        // Push object with coords to points array
        points.push({
            x: floor(random(width)),
            y: floor(random(height)),
            z: floor(random(numSlices)),
        });
    }

    // Set pixel density to 1 to negate page zoom
    pixelDensity(1);
    // Load canvas pixels into 'pixels' array
    loadPixels();
}

function draw() {
    if (z == numSlices) {
        noLoop();
    } else {
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                let index = getPixelIndex(x, y);
                let distances = [];
                for (let pt of points) {
                    distances.push(hypotSquared(pt.x - x, pt.y - y, pt.z - z));
                }

                distances.sort((a, b) => a - b);

                let r = map(distances[N - 1], 0, rValue * 0.5, 0, 255);
                let g = map(distances[N], 0, rValue, 0, 255);
                let b = map(distances[N + 1], 0, rValue * 1.5, 0, 255);

                setPixel(index, getColour(r, g, b));
            }
        }
        // Update canvas pixels to match 'pixels' array
        updatePixels();
        //save("image_" + nf(z, 3, 0) + ".png");
        z++;
    }
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

function hypotSquared(a, b, c) {
    if (c == null) {
        return Math.abs(a * a + b * b);
    } else {
        return Math.abs(a * a + b * b + c * c);
    }
}
