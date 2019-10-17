let x_vals = [];
let y_vals = [];

let a, b, c, d, e;

let vars = [];
let degrees;

let learningRate = 0.5;
const optimiser = tf.train.adam(learningRate);

let learningRateSlider;
let learningRateP;

function setup() {
	createCanvas(400, 400);

	a = tf.variable(tf.scalar(random(-1, 1)));
	b = tf.variable(tf.scalar(random(-1, 1)));
	c = tf.variable(tf.scalar(random(-1, 1)));
	d = tf.variable(tf.scalar(random(-1, 1)));
	e = tf.variable(tf.scalar(random(-1, 1)));

	learningRateP = createP("Learning rate: X");
	learningRateSlider = createSlider(0.01, 0.5, 0.1, 0.01);
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(8);

	learningRateP.html("Learning rate: " + learningRateSlider.value());

	if (!mouseIsPressed) {
		tf.tidy(() => {
			if (x_vals.length > 0) {
				const ys = tf.tensor1d(y_vals);
				optimiser.minimize(() => loss(predict(x_vals), ys));
			}
		});
	}
	for (let i = 0; i < x_vals.length; i++) {
		let px = map(x_vals[i], -1, 1, 0, width);
		let py = map(y_vals[i], -1, 1, height, 0);

		point(px, py);
	}

	const curveX = [];

	for (let x = -1; x <= 1.01; x += 0.05) {
		curveX.push(x);
	}

	const ys = tf.tidy(() => predict(curveX));
	const curveY = ys.dataSync();
	ys.dispose();

	strokeWeight(2);
	noFill();
	beginShape();

	for (let i = 0; i < curveX.length; i++) {
		let x = map(curveX[i], -1, 1, 0, width);
		let y = map(curveY[i], -1, 1, height, 0);
		vertex(x, y);
	}

	endShape();

	//console.log(tf.memory().numTensors);
}

function loss(pred, label) {
	return pred
		.sub(label)
		.square()
		.mean();
}

function predict(x) {
	const xs = tf.tensor1d(x);
	//const ys = xs.mul(a).add(b);
	const ys = xs
		.pow(tf.scalar(4))
		.mul(a)
		.add(xs.pow(tf.scalar(3)).mul(b))
		.add(xs.square().mul(c))
		.add(xs.mul(d))
		.add(e);

	return ys;
}

function mouseDragged() {
	if (mouseX >= 0 && mouseX < width) {
		if (mouseY >= 0 && mouseY < height) {
			let x = map(mouseX, 0, width, -1, 1);
			let y = map(mouseY, 0, height, 1, -1);

			x_vals.push(x);
			y_vals.push(y);
		}
	}
}
