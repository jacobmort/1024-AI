import GeneticStrategy from '../GeneticStrategy';

let geneticStrategy;
describe('GeneticStrategy', () => {
  describe('getBestGenes', () => {
    beforeEach(() => {
      geneticStrategy = new GeneticStrategy();
      geneticStrategy.population = ['Worst', 'Best', 'Medium'];
      geneticStrategy.populationScores = [1, 3, 2];
    });
    it('returns new arrays', () => {
      const bestGenes = geneticStrategy.getBestGenes(1);
      bestGenes[0] = 'Bestest';
      expect(geneticStrategy.population[1]).toEqual('Best');
    });

    it('returns top 1', () => {
      const bestGenes = geneticStrategy.getBestGenes(1);
      expect(bestGenes.length).toEqual(1);
      expect(bestGenes[0]).toEqual('Best');
    });

    it('returns top 2', () => {
      const bestGenes = geneticStrategy.getBestGenes(2);
      expect(bestGenes.length).toEqual(2);
      expect(bestGenes[0]).toEqual('Best');
      expect(bestGenes[1]).toEqual('Medium');
    });
  });

  describe('mate', () => {
    it('returns correct length', () => {
      const geneOne = [1, 2];
      const geneTwo = [3, 4];
      const newGene = GeneticStrategy.mate(geneOne, geneTwo);
      expect(newGene.length).toEqual(2);
    });

    it('returns new array', () => {
      const geneOne = [1];
      const geneTwo = [2];
      const newGene = GeneticStrategy.mate(geneOne, geneTwo);
      geneOne[0] = 3;
      geneTwo[0] = 4;
      expect(newGene[0]).not.toEqual(3);
      expect(newGene[0]).not.toEqual(4);
    });

    it('does not modify original genes', () => {
      const geneOne = [1];
      const geneTwo = [2];
      GeneticStrategy.mate(geneOne, geneTwo);
      expect(geneOne[0]).toEqual(1);
      expect(geneTwo[0]).toEqual(2);
    });
  });

  describe('getPopulationAverageScore', () => {
    it('averages correctly', () => {
      geneticStrategy = new GeneticStrategy();
      geneticStrategy.populationScores = [1, 3, 2, 4];
      expect(geneticStrategy.getPopulationAverageScore()).toEqual(2.5);
    });
  });
});
