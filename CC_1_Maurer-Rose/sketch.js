let n = 6;
let d = 71;
let dSlider;
let nSlider;
let dPara;
let nPara;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);

    dPara = createP("D Value:");
    dSlider = createSlider(1, 9000, 4100);
    nPara = createP("N Value:");
    nSlider = createSlider(1, 10, 2);

}

function draw() {
    background(0);
    translate(width / 2, height / 2);
    
    d = dSlider.value() / 100;
    n = nSlider.value();

    dPara.html("D Value: " + d);
    nPara.html("N Value: " + n);

    noFill();
    stroke(255);
    strokeWeight(1);
    beginShape();
    for(let i = 0; i < 361; i++) {
        let k = i * d;
        let r = 200 * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);

        vertex(x, y);
    }
    endShape();

    
    stroke(255,0,0, 150);
    strokeWeight(4);
    beginShape();
    for(let i = 0; i < 361; i++) {
        let k = i;
        let r = 200 * sin(n * k);
        let x = r * cos(k);
        let y = r * sin(k);

        vertex(x, y);
    }
    endShape();
}