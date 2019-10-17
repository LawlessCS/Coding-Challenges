let a;
let slider;

function setup() {
    createCanvas(400, 400);

    a = PI / 4;
    slider = createSlider(0, PI, PI / 4, 0.01);
}

function draw() {
    background(51);

    a = slider.value();

    stroke(255);
    translate(200, height);
    branch(100);
}

function branch(length) {
    line(0, 0, 0, -length);
    translate(0, -length);

    if (length > 4) {
        push();
        rotate(a);
        branch(length * 0.7);
        pop();
        rotate(-a);
        branch(length * 0.7);
    }
}
