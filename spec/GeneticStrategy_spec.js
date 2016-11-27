import GeneticStrategy from '../GeneticStrategy';
import Gene from '../Gene';

let geneticStrategy;
describe('GeneticStrategy', () => {
  describe('getBestGenes', () => {
    beforeEach(() => {
      geneticStrategy = new GeneticStrategy();
      const best = new Gene(['Best']);
      best.totalScore = 3;

      const middle = new Gene(['Medium']);
      middle.totalScore = 2;

      const worst = new Gene(['Worst']);
      worst.totalScore = 1;
      geneticStrategy.population = [];
      geneticStrategy.population.push(worst);
      geneticStrategy.population.push(best);
      geneticStrategy.population.push(middle);
    });

    it('returns top 1', () => {
      const bestGenes = geneticStrategy.getBestGenes(1);
      expect(bestGenes.length).toEqual(1);
      expect(bestGenes[0].totalScore).toEqual(3);
    });

    it('returns top 2', () => {
      const bestGenes = geneticStrategy.getBestGenes(2);
      expect(bestGenes.length).toEqual(2);
      expect(bestGenes[0].totalScore).toEqual(3);
      expect(bestGenes[1].totalScore).toEqual(2);
    });
  });

  describe('mate', () => {
    it('returns correct length', () => {
      const geneOne = [1, 2];
      const geneTwo = [3, 4];
      const newGene = GeneticStrategy.mate(geneOne, 2, geneTwo, 2);
      expect(newGene.moves.length).toEqual(2);
    });

    it('returns new gene', () => {
      const geneOne = [1];
      const geneTwo = [2];
      const newGene = GeneticStrategy.mate(geneOne, 1, geneTwo, 1);
      geneOne[0] = 3;
      geneTwo[0] = 4;
      expect(newGene.totalScore).toEqual(0);
      expect(newGene.numMoves).toEqual(0);
      expect(newGene.moves[0]).not.toEqual(3);
      expect(newGene.moves[0]).not.toEqual(4);
    });

    it('does not modify original genes', () => {
      const geneOne = [1];
      const geneTwo = [2];
      GeneticStrategy.mate(geneOne, 1, geneTwo, 1);
      expect(geneOne[0]).toEqual(1);
      expect(geneTwo[0]).toEqual(2);
    });

    describe('junk DNA', () => {
      describe('geneOne splice', () => {
        it('does not include junk from geneOne', () => {
          // 3 is not used
          const geneOne = [1, 2, 3];
          const geneTwo = [4, 5, 6];
          const newGene = GeneticStrategy.mate(geneOne, 2, geneTwo, 3);
          expect(newGene.moves.indexOf(3)).toEqual(-1);
        });
      });
      describe('geneTwo splice', () => {
        it('does not splice geneTwo starting from junk', () => {
          // 5,6 not used
          const geneOne = [1, 2, 3];
          const geneTwo = [4, 5, 6];
          const newGene = GeneticStrategy.mate(geneOne, 3, geneTwo, 1);
          expect(newGene.moves.indexOf(3)).toEqual(-1);
          expect(newGene.moves.indexOf(4)).not.toEqual(-1);
        });
      });
    });
  });

  describe('getPopulationAverageScore', () => {
    it('averages correctly', () => {
      geneticStrategy = new GeneticStrategy();
      geneticStrategy.population = [];
      for (let i = 1; i <= 4; i += 1) {
        const gene = new Gene();
        gene.totalScore = i;
        geneticStrategy.population.push(gene);
      }
      expect(geneticStrategy.getPopulationAverageScore()).toEqual(2.5);
    });
  });

  describe('getPopulationScores', () => {
    it('returns array of scores', () => {
      geneticStrategy = new GeneticStrategy();
      geneticStrategy.population = [];
      for (let i = 1; i <= 4; i += 1) {
        const gene = new Gene();
        gene.totalScore = i;
        geneticStrategy.population.push(gene);
      }
      expect(geneticStrategy.getPopulationScores()).toEqual([1, 2, 3, 4]);
    });
  });
});
