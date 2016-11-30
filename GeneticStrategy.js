const AbstractStrategy = require('./AbstractStrategy');
const RandomStrategy = require('./RandomStrategy');
const Gene = require('./Gene');

class GeneticStrategy extends AbstractStrategy {
  constructor() {
    super();
    this.currentGeneIdx = 0;
    this.evoluationNum = 0;
    this.maximumEvoluationNum = 100;
    this.population = this.getInitialPopulations(10);
  }

  getInitialPopulations(n) {
    const population = [];
    for (let i = 0; i < n; i += 1) {
      const newMoveSet = [];
      for (let j = 0; j < 500; j += 1) {
        newMoveSet.push(RandomStrategy.randomMove(this.getAvailableMoves()));
      }
      population[i] = new Gene(newMoveSet);
    }
    return population;
  }

  isDone() {
    return this.evoluationNum >= this.maximumEvoluationNum;
  }

  pickMove() {
    return this.population[this.currentGeneIdx].nextMove();
  }

  processTotalScore(totalScore) {
    this.population[this.currentGeneIdx].totalScore = totalScore;
    this.nextPopulation();
  }

  nextPopulation() {
    this.currentGeneIdx += 1;
  }

  nextGeneration() {
    this.currentGeneIdx = 0;
    this.evolve();
  }

  evolve() {
    this.evoluationNum += 1;
    const bestGenes = this.getBestGenes(3);

    // Respect your elders, carry over prev. winner incase new generation is garbage
    this.population[0] = bestGenes[0];
    this.population[0].playedMoves = 0;

    this.population[1] = GeneticStrategy.mate(
      bestGenes[0].moves, bestGenes[0].playedMoves,
      bestGenes[0].moves, bestGenes[0].playedMoves
    );
    this.population[2] = GeneticStrategy.mate(
      bestGenes[0].moves, bestGenes[0].playedMoves,
      bestGenes[1].moves, bestGenes[1].playedMoves
    );
    this.population[3] = GeneticStrategy.mate(
      bestGenes[0].moves, bestGenes[0].playedMoves,
      bestGenes[2].moves, bestGenes[2].playedMoves
    );

    this.population[4] = GeneticStrategy.mate(
      bestGenes[1].moves, bestGenes[1].playedMoves,
      bestGenes[0].moves, bestGenes[0].playedMoves
    );
    this.population[5] = GeneticStrategy.mate(
      bestGenes[1].moves, bestGenes[1].playedMoves,
      bestGenes[1].moves, bestGenes[1].playedMoves
    );
    this.population[6] = GeneticStrategy.mate(
      bestGenes[1].moves, bestGenes[1].playedMoves,
      bestGenes[2].moves, bestGenes[2].playedMoves
    );

    this.population[7] = GeneticStrategy.mate(
      bestGenes[2].moves, bestGenes[2].playedMoves,
      bestGenes[0].moves, bestGenes[0].playedMoves
    );
    this.population[8] = GeneticStrategy.mate(
      bestGenes[2].moves, bestGenes[2].playedMoves,
      bestGenes[1].moves, bestGenes[1].playedMoves
    );
    this.population[9] = GeneticStrategy.mate(
      bestGenes[2].moves, bestGenes[2].playedMoves,
      bestGenes[2].moves, bestGenes[2].playedMoves
    );
  }

  static mate(geneOne, geneOneEffectiveNumUsed, geneTwo) {
    const insertIdx = Math.floor(Math.random() * (geneOneEffectiveNumUsed - 1));
    const geneOnePiece = geneOne.slice(0, insertIdx);
    const geneTwoPiece = geneTwo.slice(0, geneOne.length - insertIdx);
    return new Gene(geneOnePiece.concat(geneTwoPiece));
  }

  getBestGenes(n) {
    const indicies = [];
    this.population.forEach((val, i) => {
      indicies[i] = i;
    });

    indicies.sort((a, b) => {
      return this.population[a].totalScore > this.population[b].totalScore ? -1 : 1;
    });
    return indicies.slice(0, n).map(i => this.population[i]);
  }

  outputPopulationSummary() {
    console.log(`${this.evoluationNum}, ${this.getPopulationAverageScore()}, ${Math.max.apply(null, this.getPopulationScores())}`);
  }

  getPopulationScores() {
    return this.population.map(gene => gene.totalScore);
  }

  getPopulationAverageScore() {
    return (this.getPopulationScores().reduce((accumulator, value) => accumulator + value))
      / this.population.length;
  }

  populationSize() { return this.population.length; }
}

module.exports = GeneticStrategy;
