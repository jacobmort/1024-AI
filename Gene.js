class Gene {
  constructor(moves) {
    this.moves = moves;
    this.totalScore = 0;
    this.playedMoves = 0;
  }

  nextMove() {
    const move = this.moves[this.playedMoves];
    this.playedMoves += 1;
    return move;
  }
}

module.exports = Gene;
