[![Build Status](https://travis-ci.org/ubien/1024-AI.svg?branch=master)](https://travis-ci.org/ubien/1024-AI.svg?branch=master)

# Automating 1024 Play

Exploring AI using the game of [1024](http://1024game.org/).  Uses the excellent [nightmarejs](https://github.com/segmentio/nightmare) library to control the game.  Figuring out how to control timing of nightmare to not run all operations at once was challenging (see playARound() in [index.js](https://github.com/ubien/1024-AI/blob/master/index.js)).

## Setup
Clone, `npm install` or `yarn install` (better) then
`node index.js`.

If you get some nonsense about `ENOENT: no such file or directory /node_modules/electron/path.txt` then `cd ./node_modules/electron/ && node install.js`

### Testing
`npm test` runs the handful.  Not trying for full coverage just using them to help development.

## [Is our childrens learning?](https://www.youtube.com/watch?v=-ej7ZEnjSeA)

### [Naive Genetic Algorithm](https://github.com/ubien/1024-AI/blob/master/GeneticStrategy.js)

Starts with 10 Genes, each with 400 randomly generated moves.  Have each play the game, take the top 3 scores and combine randomly to form the next generation.  Repeat over and over.  
![graph showing no learning](https://cloud.githubusercontent.com/assets/361696/20516167/a66a9052-b041-11e6-94d8-c8e29516f899.png)

Looks to me like it does no better than randomly choosing a move.  I think the problem with this is that the game contains randomness (starting position and position/value of new blocks) that this type of simple algorithm performs poorly against.

I think it can be improved by running each Gene against more than 1 game to reduce effect of randomness on scores.

### Tensor Flow?
Coming soon...
