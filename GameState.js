const EMPTY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

class GameState {
  static parseBoard(boardChildren) {
    let board = [].concat(EMPTY_BOARD);
    try {
      Array.from(boardChildren).forEach((tile) => {
        if (tile) {
          const className = this.getClassName(tile);
          console.log(className);
          const score = this.parseTileScore(className);
          console.log(score);
          const { x, y } = this.parseTilePosition(className);
          console.log(`x:${x} y:${y}`);
          board[x][y] = score;
        }
      });
    } catch (e) {
      console.log(e);
      board = null;
    }
    return board;
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

  static getClassName(domOrCheerioEle) {
    return 'className' in domOrCheerioEle ?
      domOrCheerioEle.className : domOrCheerioEle.attribs.class;
  }
}

module.exports = GameState;
