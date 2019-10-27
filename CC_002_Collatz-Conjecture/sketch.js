const len = 5;
const angle = 0.15;

function setup() {
	createCanvas(600, 600);
	background(0);

	stroke(255, 10);
	strokeWeight(4);

	for (let i = 1; i < 10000; i++) {
		let sequence = [];
		let n = i;

		do {
			sequence.push(n);
			n = collatz(n);
		} while (n != 1);

		sequence.push(1);
		sequence.reverse();

		resetMatrix();
		translate(0, height / 2);

		for (let j = 0; j < sequence.length; j++) {
			let value = sequence[j];

			rotate(value % 2 == 0 ? -angle : angle);
			line(0, 0, len, 0);
			translate(len, 0);
		}
	}
}

function collatz(n) {
	if (n % 2 == 0) {
		return n / 2;
	} else {
		return (3 * n + 1) / 2;
	}
}
