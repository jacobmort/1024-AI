/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Nightmare = require('nightmare');
const GameState = require('./GameState');

class Driver {
  constructor() {
    this.gameState = new GameState();
    this.nightmare = Nightmare({
      show: true,
      openDevTools: true,
    });
  }

  run() {
    this.nightmare
      .goto('http://1024game.org/')
      .wait('.tile')
      .evaluate(() => {
        const tiles = Array.from(document.querySelectorAll('.tile-container')[0].children);
        return tiles.map(tile => tile.className)
      })
      .then((tileClasses) => {
        this.gameState.setBoard(GameState.parseBoard(tileClasses));
        this.gameState.logBoard();
        this.nightmare.end();
      })
      .catch((error) => {
        console.error(`error: ${error}`);
      });


      // this.gameState.startGame();
      // this.spooky.start('http://1024game.org/');
      // this.getBoard();
      // this.makeMove();
      // this.getScore();
      // this.getBoard();
      // this.spooky.run();
  }

  getBoard() {
    this.spooky.then(function spookyEval() {
      this.emit('board', this.evaluate(function getBoardCells() {
        return document.querySelectorAll('.tile-container')[0].children;
      }));
    });
  }

  makeMove() {
    this.moveDown();
  }

  getScore() {
    this.spooky.then(function spookyEval() {
      this.emit('score', this.evaluate(function getBoardCells() {
        return document.querySelectorAll('.score-container')[0].innerHTML;
      }));
    });
  }

  isGameOver() {
    return $('.game-over');
  }

  startNewGame() {
    this.dispatchKeypress(32);
  }

  moveLeft() {
    this.dispatchKeypress(37);
  }

  moveRight() {
    this.dispatchKeypress(39);
  }

  moveDown() {
    this.dispatchKeypress(40);
  }

  moveUp() {
    this.dispatchKeypress(38);
  }

  dispatchKeypress(key) {
    this.spooky.then(function spookyEval() {
      //this.sendKeys('.grid-container', spookyKey);
      // console.log('there');
      // this.evaluate(function sendKey() {
      try {

        // this.page.sendEvent('keypress', 40);
        const el = document.querySelectorAll('.grid-container')[0];
        this.emit('console', el);
        const eventObj = document.createEvent('Events');
        eventObj.initEvent('keydown', true, true);
        eventObj.which = 40;
        el.dispatchEvent(eventObj);
      } catch (e) {
        this.emit('console', e);
      }
      // });
    });
  }
}

const driver = new Driver();
driver.run();
