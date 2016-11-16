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
  }

  run() {
    this.nightmare
      .goto('http://1024game.org/')
      .wait('.tile')
      .updateGameState(this.gameState)
      .moveRight()
      .updateGameState(this.gameState)
      .then((args) => {
        console.log(`done args:${args}`);
      })
      // .then(() => this.nightmare.type('.tile-container', 'a'))
      .catch((error) => {
        console.error(`error: ${error}`);
      });
  }
}

const driver = new Driver();
driver.run();
