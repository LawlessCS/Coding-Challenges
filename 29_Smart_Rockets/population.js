class Population {
    constructor(popSize, lifespan, target) {
        this.rockets = [];
        this.popSize = popSize;
        this.matingPool = [];

        this.lifespan = lifespan;
        this.target = target;

        for (let i = 0; i < this.popSize; i++) {
            this.rockets[i] = new Rocket(this.lifespan, this.target);
        }
    }

    run() {
        for (let rocket of this.rockets) {
            rocket.update();
            rocket.show();
        }
    }

    evaluate() {
        let maxFitness = 0;

        for (let rocket of this.rockets) {
            rocket.calculateFitness();

            if (rocket.fitness > maxFitness) {
                maxFitness = rocket.fitness;
            }
        }

        createP(maxFitness);

        for (let rocket of this.rockets) {
            rocket.fitness /= maxFitness;
        }

        this.matingPool = [];

        for (let rocket of this.rockets) {
            let n = rocket.fitness * 100;

            for (let i = 0; i < n; i++) {
                this.matingPool.push(rocket);
            }
        }
    }

    selection() {
        let newRockets = [];

        for(let a of this.rockets) {
            let parentA = random(this.matingPool).dna;
            let parentB = random(this.matingPool).dna;

            let child = parentA.crossover(parentB);
            child.mutate();

            newRockets.push(new Rocket(this.lifespan, this.target, child));
        }

        this.rockets = newRockets;
    }
}
