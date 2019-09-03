let font;
let name;
let vehicles = [];
let input;
let size;

function preload() {
    font = loadFont("https://srv-file7.gofile.io/download/MadZ6T/ProductSans-Regular.ttf");
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

    textChanged();
}

function mousePressed() {
    explode();
}

function mouseDragged() {
    explode();
}

function textChanged() {
    name = input.value();

    size = 300;

    do {
        size -= 10;
        textSize(size);
    } while(textWidth(name) > width - 50);

    let points = font.textToPoints(name, width / 2 - textWidth(name) / 2, 200, size, { sampleFactor: 0.75 });

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
