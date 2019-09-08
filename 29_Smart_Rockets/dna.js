class DNA {
    constructor(lifespan, genes) {
        this.genes = [];
        this.lifespan = lifespan;

        if (genes) {
            this.genes = genes;
        } else {
            for (let i = 0; i < this.lifespan; i++) {
                this.genes[i] = p5.Vector.random2D();
                this.genes[i].setMag(0.1);
            }
        }
    }

    crossover(partner) {
        let newGenes = [];
        let midpoint = floor(random(this.genes.length));

        for (let i = 0; i < this.genes.length; i++) {
            newGenes[i] = random() < 0.5 ? this.genes[i] : partner.genes[i];
        }

        return new DNA(this.lifespan, newGenes);
    }

    mutate() {
        for (let gene of this.genes) {
            if (random(1) < 0.01) {
                gene = p5.Vector.random2D();
                gene.setMag(0.1);
            }
        }
    }
}
