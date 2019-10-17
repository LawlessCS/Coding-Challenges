let d = {
    slider:0,
    display:0
}
let n = {
    slider:0,
    display:0
}

function setup() {
    createCanvas(400, 400);
    d.display = createP("D value: ");
    d.slider = createSlider(1, 10, 7, 1);

    n.display = createP("N Value: ");
    n.slider = createSlider(1, 10, 9, 1);
}

function draw() {
    background(51);
    translate(width / 2, height / 2);

    stroke(255);
    strokeWeight(4);
    noFill();

    d.display.html("D value: " + d.slider.value());
    n.display.html("N Value: " + n.slider.value());

    let k = d.slider.value() / n.slider.value();

    beginShape();
    for (let a = 0; a <= TWO_PI * n.slider.value(); a+= 0.01) {
        let r = 200 * cos(k * a);

        let x = r * cos(a);
        let y = r * sin(a);

        vertex(x, y);
    }
    endShape(CLOSE);
    
}