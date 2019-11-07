let Engine = Matter.Engine;
let World = Matter.World;
let Bodies = Matter.Bodies;

let engine;
let world;
let particles = [];
let pegs = [];
let bounds = [];

let pop;

function preload() {
    pop = loadSound("../media/pop.wav");
}

function setup() {
    createCanvas(600, 925);
    colorMode(HSB);

    // Set up physics things
    engine = Engine.create();
    world = engine.world;

    // Set layout for pegs
    let rows = 15;
    let cols = 15;
    let spacing = width / cols;

    // Create peg array
    createPegs(rows, cols, spacing);

    // Create boundaries for bottom of screen and buckets
    createBounds(rows, cols, spacing);

    // Create a new particle
    newParticle();
}

function draw() {
    // Clear screen with #515151
    background(0);

    // Create new particle every 40 frames
    if (frameCount % 40 == 0) {
        newParticle();
    }

    // For every particle..
    for (let particle of particles) {
        if (particle.isOffscreen()) {
            // Remove particle if offscreen
            World.remove(world, particle);
            particles.splice(particles.indexOf(particle), 1);
        }
        // Show particle
        particle.show();
    }

    // For every peg..
    for (let peg of pegs) {
        // Show peg
        peg.show();
    }

    // For every boundary
    for (let bound of bounds) {
        // Show boundary
        bound.show();
    }

    // Nexy physics step
    Engine.update(engine, 1000 / 60);
}

function createPegs(rows, cols, spacing) {
    // Loop for each peg needed
    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols + 1; i++) {
            // Apply horizontal spacing
            let x = i * spacing;

            if (j % 2 == 0) {
                // Offset pegs in alterante rows
                x += spacing / 2;
            }
            // Apply vertical spacing
            let y = spacing + j * spacing;
            // Push peg to array
            pegs.push(new Peg(x, y, 4));
        }
    }
}

function createBounds(rows, cols, spacing) {
    // Add bottom of screen boundary
    bounds.push(new Boundary(0, height - 25, width, 25));

    // Add boundaries for buckets at bottom
    for (let i = 0; i < cols + 1; i++) {
        let w = 6;
        let h = 200;
        let x = i * spacing - w / 2;
        let y = height - h - bounds[0].height;

        bounds.push(new Boundary(x, y, w, h));
    }
}

function newParticle() {
    // Create and push new particle to array at top middle of screen (with offset)
    let radius = 6;
    particles.push(new Particle(300 + random(-radius, radius), -radius, radius));
}

function mousePressed() {
    pop.play();
}