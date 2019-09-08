let populationSize;
let rocketLifespan;
let target;
let population;
let counter;
let lifeDisplay;

function setup() {
    createCanvas(400, 300);

    populationSize = 10;
    rocketLifespan = 200;
    target = createVector(width / 2, 50);
    population = new Population(populationSize, rocketLifespan, target);

    counter = 0;
    lifeDisplay = createP();
}

function draw() {
    background(0);

    population.run();

    ellipse(target.x, target.y, 16, 16);

    lifeDisplay.html(counter);

    if (counter == rocketLifespan) {
        population.evaluate();
        population.selection();
        counter = 0;
    } else {
        counter++;
    }
}
