let font;
let name;
let vehicles = [];

function preload() {
    font = loadFont("https://srv-file7.gofile.io/download/MadZ6T/ProductSans-Regular.ttf");
}

function setup() {
    createCanvas(600, 300);

    name = "Charlie";
    textFont(font);
    textSize(150);

    let points = font.textToPoints(name, width / 2 - textWidth(name) / 2, 200, 150, { sampleFactor: 0.75 });

    for (let pt of points) {
        var vehicle = new Vehicle(pt.x, pt.y);
        vehicles.push(vehicle);
    }
}

function mousePressed() {
    explode();
}

function mouseDragged() {
    explode();
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
