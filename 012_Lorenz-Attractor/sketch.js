let x = 0.1;
let y = 0;
let z = 0;

let a = 10;
let b = 28;
let c = 8 / 3;

let dt = 1;

let points = [];

let camX, camY;

function setup() {
	createCanvas(800, 600, WEBGL);
	colorMode(HSB);
}

function draw() {
	background(0);

	let dt = 0.01;
	let dx = a * (y - x) * dt;
	let dy = (x * (b - z) - y) * dt;
	let dz = (x * y - c * z) * dt;

	x = x + dx;
	y = y + dy;
	z = z + dz;

	camera(camX, camY, height / 2.0 / tan((PI * 30.0) / 180.0), 0, 0, 0, 0, 1, 0);

	points.push(createVector(x, y, z));

	scale(5);
	noFill();

	let hue = 0;
	beginShape();
	for (let v of points) {
		stroke(127.5 * sin(hue / 45) + 127.5, 255, 255);
		vertex(v.x, v.y, v.z);
		hue += 0.25;
	}
	endShape();
}

function mouseDragged() {
	camX = map(mouseX, 0, width, -200, 200);
	camY = map(mouseY, 0, height, -200, 200);
}
