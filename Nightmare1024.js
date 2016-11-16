/* global document */

const Nightmare = require('nightmare');
const GameState = require('./GameState');

Nightmare.action('updateBoard', function nightmareUpdateBoard(gameState, done) {
  this.evaluate(() => {
    const tiles = Array.from(document.querySelectorAll('.tile-container')[0].children);
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
    console.log(`scoreHtml:${scoreHtml}`);
    gameState.setScore(GameState.parseGameScoreString(scoreHtml));
    console.log(`score:${gameState.totalScore}`);
    done();
  });
});

Nightmare.action('moveLeft', function nightmareMoveLeft(done) {
  this.move('a')
  .then(() => done());
});

Nightmare.action('moveRight', function nightmareMoveRight(done) {
  this.move('d')
  .then(() => done());
});

Nightmare.action('moveUp', function nightmareMoveRight(done) {
  this.move('w')
  .then(() => done());
});

Nightmare.action('moveDown', function nightmareMoveRight(done) {
  this.move('s')
  .then(() => done());
});

Nightmare.action('move', function nightmareMove(key, done) {
  this.type('.tile-container', key)
  .then(() => this.wait('.tile-new'))
  .then(() => done());
});

module.exports = Nightmare;
