/* global document */

const Nightmare = require('nightmare');
const GameState = require('./GameState');

Nightmare.action('updateBoard', function nightmareUpdateBoard(gameState, done) {
  this.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.tile-container')[0].children);
    console.log(tiles.map(tile => tile.className));
    return tiles.map(tile => tile.className);
  }, gameState, done)
  .then((tileClasses) => {
    gameState.setBoard(GameState.parseBoard(tileClasses));
    gameState.logBoard();
    done();
  });
});

Nightmare.action('updateScore', function nightmareUpdateScore(gameState, done) {
  this.evaluate(() => document.querySelectorAll('.score-container')[0].innerHTML
  , gameState, done)
  .then((scoreHtml) => {
    gameState.setScore(GameState.parseGameScoreString(scoreHtml));
    console.log(`score:${gameState.totalScore}`);
  });
});

module.exports = Nightmare;
