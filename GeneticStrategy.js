const AbstractStrategy = require('./AbstractStrategy');
const RandomStrategy = require('./RandomStrategy');

class GeneticStrategy extends AbstractStrategy {
  constructor() {
    super();
    this.population = this.getInitialPopulations(10);
    this.populationScores = [];
    this.currentGeneIdx = 0;
    this.currentGeneMoves = 0;
    this.evoluationNum = 0;
  }

  getInitialPopulations(n) {
    const population = [];
    for (let i = 0; i < n; i += 1) {
      population[i] = [];
      for (let j = 0; j < 500; j += 1) {
        population[i].push(RandomStrategy.randomMove(this.getAvailableMoves()));
      }
    }
    return population;
  }

  isDone() {
    return false;
  }

  pickMove() {
    this.currentGeneMoves += 1;
    return this.population[this.currentGeneIdx][this.currentGeneMoves];
  }

  processTotalScore(totalScore) {
    // console.log(`gene ${this.currentGeneIdx} scored ${totalScore}`);
    this.populationScores[this.currentGeneIdx] = totalScore;
    this.nextPopulation();
  }

  nextPopulation() {
    this.currentGeneMoves = 0;
    this.currentGeneIdx += 1;
  }

  nextGeneration() {
    this.currentGeneMoves = 0;
    this.currentGeneIdx = 0;
    this.evolve();
  }

  evolve() {
    this.evoluationNum += 1;
    const bestGenes = this.getBestGenes(3);
    this.population[0] = bestGenes[0];

    this.population[1] = GeneticStrategy.mate(bestGenes[0], bestGenes[0]);
    this.population[2] = GeneticStrategy.mate(bestGenes[0], bestGenes[1]);
    this.population[3] = GeneticStrategy.mate(bestGenes[0], bestGenes[2]);

    this.population[4] = GeneticStrategy.mate(bestGenes[1], bestGenes[0]);
    this.population[5] = GeneticStrategy.mate(bestGenes[1], bestGenes[1]);
    this.population[6] = GeneticStrategy.mate(bestGenes[1], bestGenes[2]);

    this.population[7] = GeneticStrategy.mate(bestGenes[2], bestGenes[0]);
    this.population[8] = GeneticStrategy.mate(bestGenes[2], bestGenes[1]);
    this.population[9] = GeneticStrategy.mate(bestGenes[2], bestGenes[2]);
  }

  static mate(geneOne, geneTwo) {
    const cutOver = Math.floor(Math.random() * geneTwo.length);
    return geneOne.slice(0, cutOver).concat(geneTwo.slice(cutOver, geneTwo.length));
  }

  getBestGenes(n) {
    const indicies = [];
    this.populationScores.forEach((val, i) => {
      indicies[i] = i;
    });
    indicies.sort((a, b) => {
      return this.populationScores[a] > this.populationScores[b] ? -1 : 1;
    });
    return indicies.slice(0, n).map(i => this.population[i]);
  }

  outputPopulationSummary() {
    console.log(`${this.evoluationNum}, ${this.getPopulationAverageScore()}, ${Math.max.apply(null, this.populationScores)}`);
  }

  getPopulationAverageScore() {
    return this.populationScores.reduce((accumulator, value) => accumulator + value)
      / this.populationScores.length;
  }

  populationSize() { return this.population.length; }
}

module.exports = GeneticStrategy;
