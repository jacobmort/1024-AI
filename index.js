/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Spooky = require('spooky');
const GameState = require('./GameState');

class Driver {
  constructor() {
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

    this.spooky.on('board', (board) => {
      console.log('start parse');
      console.log(GameState.parseBoard(board));
      console.log('endparse');
    });
  }

  run(err) {
    if (err) {
      throw err;
    } else {
      this.spooky.start('http://1024game.org/');
      this.spooky.then(function spookyEval() {
        this.emit('board', this.evaluate(function getBoardCells() {
          return document.querySelectorAll('.tile-container')[0].children;
        }));
      });
      this.spooky.run();
    }
  }

  static getScore() {
    return this.gameState.parseGameScoreString($('.score-container').innerHTML);
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

}

const driver = new Driver();
