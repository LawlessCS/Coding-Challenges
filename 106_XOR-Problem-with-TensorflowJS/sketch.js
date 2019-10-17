// Daniel Shiffman
// http://codingtra.in

// XOR
// https://youtu.be/188B6k_F9jU

// Neural Network Library
// https://github.com/CodingTrain/Toy-Neural-Network-JS

let nn;
let model;

let resolution = 20;
let cols, rows;

let xs;

const train_xs = tf.tensor2d([[0, 0], [0, 1], [1, 0], [1, 1]]);
const train_ys = tf.tensor2d([[0], [1], [1], [0]]);

let training_data = [
	{
		inputs: [0, 0],
		outputs: [0]
	},
	{
		inputs: [0, 1],
		outputs: [1]
	},
	{
		inputs: [1, 0],
		outputs: [1]
	},
	{
		inputs: [1, 1],
		outputs: [0]
	}
];

function setup() {
	createCanvas(400, 400);

	cols = width / resolution;
	rows = height / resolution;

	// Create input data
	let inputs = [];
	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let x1 = i / cols;
			let x2 = j / rows;
			inputs.push([x1, x2]);
		}
	}

	xs = tf.tensor2d(inputs);

	model = tf.sequential();
	let hidden = tf.layers.dense({
		inputShape: [2],
		units: 4,
		activation: "sigmoid"
	});
	let output = tf.layers.dense({
		units: 1,
		activation: "sigmoid"
	});
	model.add(hidden);
	model.add(output);

	const optimizer = tf.train.adam(0.1);
	model.compile({
		optimizer: optimizer,
		loss: "meanSquaredError"
	});

	setTimeout(train, 50);
}

function trainModel() {
	return model.fit(train_xs, train_ys, {
		shuffle: true,
		epochs: 100
	});
}

function train() {
	trainModel().then(result => {
		console.log(result.history.loss[0]);
		train();
	});
}

function draw() {
	background(0);	

	tf.tidy(() => {
		let ys = model.predict(xs);
		let y_values = ys.dataSync();

		let index = 0;
		for (let i = 0; i < cols; i++) {
			for (let j = 0; j < rows; j++) {
				let br = y_values[index] * 255;
				fill(br);
				rect(i * resolution, j * resolution, resolution, resolution);
				fill(255 - br);
				textAlign(CENTER, CENTER);
				textSize(8);
				text(
					nf(y_values[index], 1, 2),
					i * resolution + resolution / 2,
					j * resolution + resolution / 2
				);
				index++;
			}
		}
	});
}
