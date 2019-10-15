let values = [];
let bigI = 0;
let bigJ = 0;
let speed = 5;
let speedSlider;
let speedLabel;

function setup() {
  createCanvas(1200, 500);
  speedLabel = createP("Speed: X");
  speedSlider = createSlider(0, 1000, 5);

  // Initialise array
  for (let i = 0; i < width; i++) {
    values.push(random(height));
    //values.push(noise(i / 100.0) * height);
  }
}

function draw() {
  background(0);
  stroke(255);
  strokeWeight(1);

  speedLabel.html("Speed: " + speedSlider.value());
  speed = speedSlider.value();

  for (let i = 0; i < values.length; i++) {
      line(i, height, i, height - values[i]);
  }

  // Main sort loop
  if (bigI < values.length) {
    for (let iterations = 0; iterations < speed; iterations++) {
      let a = values[bigJ];
      let b = values[bigJ + 1];

      if (a > b) {
        swap(values, bigJ, bigJ + 1);
      }

      bigJ++;
      if (bigJ >= values.length - bigI - 1) {
        bigJ = 0;
        bigI++;
      }
    }
  } else {
      noLoop();
      createP("Finished!");
  }
}

function swap(arr, a, b) {
  let temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
