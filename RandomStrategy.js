const MOVES = require('./Moves');

class RandomStrategy {
  static pickMove() {
    return MOVES[Math.floor(Math.random() * MOVES.length)];
  }

  static processTotalScore() {}
  static populationSize() { return 1; }
}

module.exports = RandomStrategy;
