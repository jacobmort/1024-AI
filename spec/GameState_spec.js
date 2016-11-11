import cheerio from 'cheerio';
import GameState from '../GameState';

let className;
const boardExampleString = '<div class="tile-container"><div class="tile tile-1 tile-position-1-2"><div class="tile-inner">1</div></div><div class="tile tile-1 tile-position-1-3"><div class="tile-inner">1</div></div><div class="tile tile-1 tile-position-1-3"><div class="tile-inner">1</div></div><div class="tile tile-2 tile-position-1-3 tile-merged"><div class="tile-inner">2</div></div><div class="tile tile-16 tile-position-1-4"><div class="tile-inner">16</div></div><div class="tile tile-2 tile-position-2-2"><div class="tile-inner">2</div></div><div class="tile tile-4 tile-position-2-3"><div class="tile-inner">4</div></div><div class="tile tile-256 tile-position-2-4"><div class="tile-inner">256</div></div><div class="tile tile-1 tile-position-3-2 tile-new"><div class="tile-inner">1</div></div><div class="tile tile-1 tile-position-3-3"><div class="tile-inner">1</div></div><div class="tile tile-64 tile-position-3-4"><div class="tile-inner">64</div></div><div class="tile tile-32 tile-position-4-4"><div class="tile-inner">32</div></div>';
const boardExample = cheerio.load(boardExampleString);

describe('GameState', () => {
  describe('parseGameScoreString', () => {
    it('parses out score', () => {
      const scoreStr = '2604<div class="score-addition">+2</div>';
      const score = GameState.parseGameScoreString(scoreStr);
      expect(score).toEqual(2604);
    });
  });
  describe('parsing tiles', () => {
    describe('parseTilePosition', () => {
      it('parses X Y coords', () => {
        className = 'tile tile-16 tile-position-1-2';
        const { x, y } = GameState.parseTilePosition(className);
        expect(x).toEqual(0);
        expect(y).toEqual(1);
      });

      it('parses X Y coords', () => {
        className = 'tile tile-2 tile-position-1-3 tile-merged';
        const { x, y } = GameState.parseTilePosition(className);
        expect(x).toEqual(0);
        expect(y).toEqual(2);
      });
    });

    describe('parseTileScore', () => {
      it('parses score', () => {
        className = 'tile tile-16 tile-position-1-2';
        const score = GameState.parseTileScore(className);
        expect(score).toEqual(16);
      });
    });
  });
  describe('parseBoard', () => {
    it('parses board', () => {
      const children = boardExample('div').children('.tile');
      const board = GameState.parseBoard(children.toArray());
      expect(board[0][0]).toEqual(0);
      expect(board[1][0]).toEqual(0);
      expect(board[2][0]).toEqual(0);
      expect(board[3][0]).toEqual(0);

      expect(board[0][1]).toEqual(1);
      expect(board[1][1]).toEqual(2);
      expect(board[2][1]).toEqual(1);
      expect(board[3][1]).toEqual(0);

      expect(board[0][2]).toEqual(2);
      expect(board[1][2]).toEqual(4);
      expect(board[2][2]).toEqual(1);
      expect(board[3][2]).toEqual(0);

      expect(board[0][3]).toEqual(16);
      expect(board[1][3]).toEqual(256);
      expect(board[2][3]).toEqual(64);
      expect(board[3][3]).toEqual(32);
    });
  });
});
