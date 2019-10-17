let x_vals = [];
let y_vals = [];

let m, b;

const learningRate = 0.5;
const optimiser = tf.train.sgd(learningRate);

function setup() {
	createCanvas(400, 400);

	a = tf.variable(tf.scalar(random(-1, 1)));
	b = tf.variable(tf.scalar(random(-1, 1)));

	// for (let i = 0; i < 10; i++) {
	// 	x_vals[i] = random(-1, 1);
	// 	y_vals[i] = random(-1, 1);
	// }
}

function draw() {
	background(0);
	stroke(255);
	strokeWeight(8);

	tf.tidy(() => {
		if (x_vals.length > 0) {
			const ys = tf.tensor1d(y_vals);
			optimiser.minimize(() => loss(predict(x_vals), ys));
		}
	});

	for (let i = 0; i < x_vals.length; i++) {
		let px = map(x_vals[i], -1, 1, 0, width);
		let py = map(y_vals[i], -1, 1, height, 0);

		point(px, py);
	}

	const lineX = [-1, 1];

	const ys = tf.tidy(() => predict(lineX));
	const lineY = ys.dataSync();
	ys.dispose();

	let x1 = map(lineX[0], -1, 1, 0, width);
	let x2 = map(lineX[1], -1, 1, 0, width);

	let y1 = map(lineY[0], -1, 1, height, 0);
	let y2 = map(lineY[1], -1, 1, height, 0);

	strokeWeight(2);
	line(x1, y1, x2, y2);
}

function loss(pred, label) {
	return pred
		.sub(label)
		.square()
		.mean();
}

function predict(x) {
	const xs = tf.tensor1d(x);
	const ys = xs.mul(a).add(b);

	return ys;
}

function mousePressed() {
	let x = map(mouseX, 0, width, -1, 1);
	let y = map(mouseY, 0, height, 1, -1);

	x_vals.push(x);
	y_vals.push(y);
}
