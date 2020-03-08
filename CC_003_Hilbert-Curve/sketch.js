let counter = 0;
let finished = false;

let order = 11;
let N = Math.pow(2, order);
let total = N * N;

let path = [];

function setup() {
    createCanvas(8192, 8192);
    background(0);

    for (let i = 0; i < total; i++) {
        path.push(hilbert(i));
        let len = width / N;
        path[i].mult(len);
        path[i].add(len / 2, len / 2);
    }
}

function draw() {
    background(0);
    stroke(255);
    strokeWeight(2);
    noFill();

    colorMode(HSB);
    beginShape();
    for (let i = 1; i < counter; i++) {
        let h = map(i, 0, path.length, 0, 360);
        stroke(h,255,255);
        line(path[i].x, path[i].y, path[i-1].x, path[i-1].y);
    }
    endShape();

    let drawSpeed = total;

    if (counter < path.length - drawSpeed) {
        counter += drawSpeed;
    } else if (counter != path.length) {
        counter = path.length;
    } else {
        if (!finished) {
            var canvas = document.getElementById("defaultCanvas0");
            var img = canvas.toDataURL("image/png", '_blank');
            createA(img, "Save as image", "_blank");
            location = img;
            finished = true;
        }
    }
}

function hilbert(index) {
    let points = [
        createVector(0, 0),
        createVector(0, 1),
        createVector(1, 1),
        createVector(1, 0)
    ];

    let i = index & 3;
    let v = points[i];

    for (let j = 1; j < order; j++) {
        index >>>= 2;
        i = index & 3;

        let len = Math.pow(2, j);
        let temp;

        switch (i) {
            case 0:
                temp = v.x;
                v.x = v.y;
                v.y = temp;
                break;
            case 1:
                v.y += len;
                break;
            case 2:
                v.x += len;
                v.y += len;
                break;
            case 3:
                temp = len - 1 - v.x;
                v.x = len - 1 - v.y;
                v.y = temp;
                v.x += len;
                break;
        }
    }

    return v;
}