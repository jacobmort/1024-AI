const EMPTY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

class GameState {
  constructor() {
    this.gameRunning = false;
    this.totalScore = 0;
    this.board = null;
  }

  startGame() {
    this.gameRunning = true;
  }

  endGame() {
    this.gameRunning = false;
  }

  setBoard(board) {
    this.board = board;
  }

  setScore(score) {
    this.totalScore = score;
  }

  static getEmptyBoard() {
    return EMPTY_BOARD.map(arr => arr.slice());
  }

  static parseBoard(tileClasses) {
    const board = GameState.getEmptyBoard();
    tileClasses.forEach((tileClass) => {
      // console.log(tileClass);
      const score = this.parseTileScore(tileClass);
      // console.log(`tile score:${score}`);
      const { x, y } = this.parseTilePosition(tileClass);
      // console.log(`tile x:${x} y:${y}`);
      board[y][x] = score;
    });
    return board;
  }

  logBoard() {
    this.board.forEach((row) => {
      console.log(row.reduce((accum, cell) => `${accum} ${cell}`));
    });
  }

  static parseGameScoreString(score) {
    return parseInt(score.split('<div')[0], 10);
  }

  static parseTilePosition(tile) {
    const matches = /tile-position-(\d*)-(\d*)/.exec(tile);
    return {
      x: parseInt(matches[1] - 1, 10),
      y: parseInt(matches[2] - 1, 10),
    };
  }

  static parseTileScore(tile) {
    return parseInt(/tile-(\d*)/.exec(tile)[1], 10);
  }
}

module.exports = GameState;
