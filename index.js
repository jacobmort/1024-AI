/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Spooky = require('spooky');
const GameState = require('./GameState');

class Driver {
  constructor() {
    this.gameState = new GameState();
    this.spooky = new Spooky({
      child: {
        command: './node_modules/casperjs/bin/casperjs', // add this line
        transport: 'http',
      },
      casper: {
        logLevel: 'debug',
        verbose: true,
      },
    }, this.run.bind(this));

    this.spooky.on('console', (line) => {
      console.log(line);
    });

    this.spooky.on('error', (e, stack) => {
      console.error(e);
      if (stack) {
        console.log(stack);
      }
    });

    this.spooky.on('board', (boardHtml) => {
      try {
        this.gameState.setBoard(GameState.parseBoard(boardHtml));
        console.log(this.gameState.board);
      } catch (e) {
        console.log(e);
      }
    });

    this.spooky.on('score', (scoreHtml) => {
      console.log(`raw gamescore: ${scoreHtml}`);
      try {
        this.gameState.setScore(GameState.parseGameScoreString(scoreHtml));
      } catch (e) {
        console.log(e);
      }
      console.log(`gamescore: ${this.gameState.score}`);
    });
  }

  run(err) {
    if (err) {
      throw err;
    } else {
      this.gameState.startGame();
      this.spooky.start('http://1024game.org/');
      this.getBoard();
      this.makeMove();
      this.getScore();
      this.getBoard();
      this.spooky.run();
    }
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
