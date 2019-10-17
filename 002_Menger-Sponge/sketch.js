let a = 0;
let b;
let boxSponge;

function setup() {
    createCanvas(400, 400, WEBGL);

    b = new Box(0, 0, 0, 200);
    boxSponge = [];
    boxSponge.push(b);
}

function draw() {
    background(51);
    // directionalLight(255, 255, 255, 0, 1, -1);
    // directionalLight(75, 75, 75, 0, -1, 1);
    lights();

    rotateX(-a);
    rotateY(-a * 0.3);
    rotateZ(-a * 0.6);
    
    for(let b of boxSponge) {
        b.show();
    }

    a += 0.01;
}

function mousePressed() {
    let next = [];

    for (let thisBox of boxSponge) {
        let newBoxes = thisBox.generate();
        next = next.concat(newBoxes);
    }

    boxSponge = next;
}