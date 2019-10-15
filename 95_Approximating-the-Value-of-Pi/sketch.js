let r = 400;

let total = 0;
let circle = 0;

let piDisplay;
let pauseBtn;

let paused = false;

let speed = 25;

function setup() {
  createCanvas(810, 810);

  drawShapes();

  piDisplay = createP("Approx. Pi: X");
  pauseBtn = createButton("Play / Pause");
  pauseBtn.mousePressed(playpause);
}

function draw() {
  translate(width / 2, height / 2);

  for (let i = 0; i < speed; i++) {
    let x = random(-r, r);
    let y = random(-r, r);

    let d = x * x + y * y;
    if (d <= r * r) {
      // Inside circle
      stroke("green");
      circle++;
    } else {
      // Outside circle
      stroke("red");
    }
    total++;
    point(x, y);
  }

  piDisplay.html("Approx. Pi: " + (4 * circle) / total);
}

function drawShapes() {
  background(0);
  translate(width / 2, height / 2);
  stroke(255);
  strokeWeight(4);
  noFill();
  ellipse(0, 0, r * 2, r * 2);
  rectMode(CENTER);
  rect(0, 0, r * 2, r * 2);
}

function playpause() {
  paused = !paused;
  if (paused) {
    noLoop();
  } else {
    loop();
  }
}
