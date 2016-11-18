/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Nightmare = require('./Nightmare1024');
const GameState = require('./GameState');
const RandomStrategy = require('./RandomStrategy');

class Driver {
  constructor() {
    this.gameState = new GameState();
    this.nightmare = Nightmare({
      show: true,
      openDevTools: true,
    });
    this.strategy = RandomStrategy;
  }

  visitPage() {
    return this.nightmare
      .goto('http://1024game.org/')
      .wait('.tile');
  }

  * runGeneration(i) {
    yield this.visitPage()
      .then(() => {
        this.recurseMove();
      });
  }

  recurseMove() {
    this.makeMove()
      .then(() => this.nightmare.updateGameState(this.gameState))
      .then(() => this.nightmare.isDone())
      .then((done) => {
        if (!done) {
          this.recurseMove();
        } else {
          this.nightmare.halt();
        }
      });
  }

  makeMove() {
    const action = this.strategy.pickMove();
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
driver.runGeneration(0).next();
