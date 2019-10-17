let font;
let name;
let vehicles = [];
let input;
let size;
let numDots;
let numDotsSlider;

function preload() {
    font = loadFont("https://lawlesscs.github.io/Coding-Challenges/059_Steering-Behaviours/ProductSans-Regular.ttf");
}

function setup() {
    createCanvas(600, 300);

    name = "Charlie";
    size = 150;
    textFont(font);

    do {
        size -= 10;
    } while(textWidth(name) > width - 50);

    input = createInput();
    input.input(textChanged);
    input.value(name);

    numDotsSlider = createSlider(5, 750, 350);
    numDotsSlider.input(numDotsChanged);

    textChanged();
}

function mousePressed() {
    explode();
}

function mouseDragged() {
    explode();
}

function numDotsChanged() {
    numDots = numDotsSlider.value() / 1000;
    textChanged();
}

function textChanged() {
    name = input.value();

    size = 300;

    do {
        size -= 10;
        textSize(size);
    } while(textWidth(name) > width - 50);

    let points = font.textToPoints(name, width / 2 - textWidth(name) / 2, 200, size, { sampleFactor: numDots });

    vehicles = [];

    for (let pt of points) {
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function explode() {
    for (let v of vehicles) {
        let mouse = createVector(mouseX, mouseY);
        let flee = v.flee(mouse);
        flee.mult(v.fleeWeight);
        v.applyForce(flee);
    }
}

function draw() {
    background(51);

    for (let v of vehicles) {
        v.update();
        v.show();
    }
}
