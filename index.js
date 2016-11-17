/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Nightmare = require('./Nightmare1024');
const GameState = require('./GameState');

class Driver {
  constructor() {
    this.gameState = new GameState();
    this.nightmare = Nightmare({
      show: true,
      openDevTools: true,
    });
    this.moves = [
      'Up',
      'Down',
      'Right',
      'Left',
    ];
  }

  visitPage() {
    return this.nightmare
      .goto('http://1024game.org/')
      .wait('.tile');
  }

  run() {
    this.visitPage()
      .then(() => {
        this.recurseMove();
      });
  }

  recurseMove() {
    this.makeMove()
      .then(() => {
        this.nightmare.isDone()
          .then((done) => {
            if (!done) {
              this.recurseMove();
            } else {
              this.nightmare.end();
            }
          });
      });
  }

  makeMove() {
    const action = this.pickMove();
    console.log(`next action:${action}`);
    switch (action) {
      case 'Up':
        return this.nightmare.moveUp();
      case 'Down':
        return this.nightmare.moveDown();
      case 'Right':
        return this.nightmare.moveRight();
      default:
        return this.nightmare.moveLeft();
    }
  }

  pickMove() {
    return this.moves[Math.floor(Math.random() * this.moves.length)];
  }
}

const driver = new Driver();
driver.run();
