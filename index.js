/* global document */
/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }]*/
/* spooky can't handle fat arrows */

//const Nightmare = require('nightmare');
const Nightmare = require('./Nightmare1024');
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
      .updateBoard(this.gameState)
      .updateScore(this.gameState)
      .then((args) => {
        console.log(`done args:${args}`);
      })
      // .evaluate((getBoard) => {
      //   // const tiles = Array.from(document.querySelectorAll('.tile-container')[0].children);
      //   // return tiles.map(tile => tile.className);
      //   return getBoard(document);
      // }, this.getBoard)
      // .then(tileClasses => this.updateBoard(tileClasses))
      // .then(() => this.nightmare.type('.tile-container', 'a'))
      // .then(() => this.nightmare.evaluate(this.getBoard))
      .catch((error) => {
        console.error(`error: ${error}`);
      });
  }

  // getBoard(document) {
  //   const tiles = Array.from(document.querySelectorAll('.tile-container')[0].children);
  //   return tiles.map(tile => tile.className);
  // }

  // updateBoard(tileClasses) {
  //   this.gameState.setBoard(GameState.parseBoard(tileClasses));
  //   this.gameState.logBoard();
  //   return Promise.resolve();
  // }
}

const driver = new Driver();
driver.run();
