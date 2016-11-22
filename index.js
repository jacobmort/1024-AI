/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

const Nightmare = require('./Nightmare1024');
const GameState = require('./GameState');
// const RandomStrategy = require('./RandomStrategy');
const GeneticStrategy = require('./GeneticStrategy');

class Driver {
  constructor() {
    this.strategy = new GeneticStrategy();
  }

  prepForNewGame() {
    this.gameState = new GameState();
    this.nightmare = Nightmare({
      show: true,
      openDevTools: true,
    });
  }

  visitPage() {
    return this.nightmare
      .goto('http://1024game.org/')
      .wait('.tile');
  }

  runStrategy() {
    return this.visitPage()
      .then(() => this.recurseMove());
  }

  recurseMove() {
    return this.makeMove()
      .then(() => this.nightmare.updateGameState(this.gameState))
      .then(() => this.nightmare.isDone())
      .then((done) => {
        if (!done) {
          return this.recurseMove();
        }
        return this.nightmare.halt();
      });
  }

  makeMove() {
    const action = this.strategy.pickMove(this.gameState);
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

  playARound() {
    this.strategy.population.reduce(accumulator =>
      accumulator.then(() => {
        this.prepForNewGame();
        return this.runStrategy()
          .then(() => {
            this.strategy.processTotalScore(this.gameState.totalScore);
          });
      })
    , Promise.resolve([])).then(() => {
      this.strategy.nextGeneration();
      this.strategy.outputPopulationSummary();
      this.playARound();
    });
  }
}

const driver = new Driver();
driver.playARound();
