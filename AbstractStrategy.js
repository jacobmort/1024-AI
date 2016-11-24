class AbstractStrategy {
  constructor() {
    this.availableMoves = ['Up', 'Down', 'Right', 'Left'];
    this.population = null;
  }

  getAvailableMoves() { return this.availableMoves; }
  getPopulation() { return this.population; }
  isDone() { return true; } // Default is to only run 1 time

  // Methods that must be implemented
  pickMove() { throw new Error('subclass must implement'); }
  processTotalScore() { throw new Error('subclass must implement'); }
  nextGeneration() { throw new Error('subclass must implement'); }
  outputPopulationSummary() { throw new Error('subclass must implement'); }
}

module.exports = AbstractStrategy;
