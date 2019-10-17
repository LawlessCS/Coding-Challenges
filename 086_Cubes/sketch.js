let angle;
let w;
let ma;
let maxD;

function setup() {
  createCanvas(400, 400, WEBGL);

  angle = 0;
  w = 18;
  ma = atan(1 / sqrt(2));
  maxD = dist(0, 0, 200, 200);
}

function draw() {
  background(100);
  ortho(-300, 300, -300, 300, 0, 1000);
  translate(0, 50, -100);
  rectMode(CENTER);

  rotateX(-ma);
  rotateY(-0.25 * PI);

  let offset = 0;

  for (let z = 0; z < width; z += w) {
    for (let x = 0; x < width; x += w) {
      push();
      let d = dist(x, z, width / 2, height / 2);
      let offset = map(d, 0, maxD, -PI, PI);
      let a = angle + offset;
      let h = floor(map(sin(a), -1, 1, 100, 300));
      translate(x - width / 2, 0, z - height / 2);
      normalMaterial();
      //rect(x - width / 2 + w / 2, 0, w - 2, h);
      box(w - 2, h, w - 2);
      pop();
    }
  }

  angle -= 0.125;
}
