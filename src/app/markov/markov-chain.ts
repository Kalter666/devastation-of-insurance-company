import { MathType, Matrix, matrix, multiply, pow, transpose } from 'mathjs';

export class MarkovChain {
  private init: Matrix;
  private u: MathType;

  constructor(p: number[][], u?: number[]) {
    this.init = matrix(p);
    if (u) {
      this.u = transpose(u);
    }
  }
  /**
   * @returns Matrix of probabilities of "i" iteration (day, week, hour etc.)
   * @description It's computing matrix of probabilities of events
   */
  getProb(i: number): MathType {
    if (this.u) {
      return multiply(this.u, pow(this.init, i));
    }
    return pow(this.init, i);
  }

  /**
   * @returns Initial matrix of probabilities
   */
  get initial(): Matrix {
    return this.init;
  }
}
