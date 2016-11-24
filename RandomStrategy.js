const AbstractStrategy = require('./AbstractStrategy');

class RandomStrategy extends AbstractStrategy {
  constructor() {
    super();
    this.population = [1];
  }
  pickMove() {
    return RandomStrategy.randomMove(this.availableMoves);
  }

  static randomMove(moves) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  nextGeneration() {} // every move is random no need

  processTotalScore(totalScore) {
    this.totalScore = totalScore;
  }

  outputPopulationSummary() {
    console.log(this.totalScore);
  }
}

module.exports = RandomStrategy;
