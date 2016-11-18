const MOVES = require('./Moves');

class RandomStrategy {
  static pickMove() {
    return MOVES[Math.floor(Math.random() * MOVES.length)];
  }
}

module.exports = RandomStrategy;
