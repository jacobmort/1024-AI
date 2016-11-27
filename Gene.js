class Gene {
  constructor(moves) {
    this.moves = moves;
    this.totalScore = 0;
    this.numMoves = 0;
  }

  nextMove() {
    const move = this.moves[this.numMoves];
    this.numMoves += 1;
    return move;
  }
}

module.exports = Gene;
