/* global $, document */

const EMPTY_BOARD = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

class GameState {

  static getBoard() {
    return this.parseBoard($('.tile-container').children);
  }

  static getScore() {
    return this.parseGameScoreString($('.score-container').innerHTML);
  }

  static isGameOver() {
    return $('.game-over');
  }

  static startNewGame() {
    this.dispatchKeypress(32);
  }

  static moveLeft() {
    this.dispatchKeypress(37);
  }

  static moveRight() {
    this.dispatchKeypress(39);
  }

  static moveDown() {
    this.dispatchKeypress(40);
  }

  static moveUp() {
    this.dispatchKeypress(38);
  }

  static dispatchKeypress(key) {
    const el = $('.grid-container');
    const eventObj = document.createEvent('Events');
    eventObj.initEvent('keydown', true, true);
    eventObj.which = key;
    el.dispatchEvent(eventObj);
  }

  static parseBoard(boardChildren) {
    const board = [].concat(EMPTY_BOARD);
    boardChildren.forEach((tile) => {
      const className = this.getClassName(tile);
      const score = this.parseTileScore(className);
      const { x, y } = this.parseTilePosition(className);
      board[x][y] = score;
    });
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

export default GameState;
