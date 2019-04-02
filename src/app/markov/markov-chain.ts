import { matrix, Matrix, multiply, transpose, MathArray, pow } from 'mathjs';

export class MarkovChain {
  private init: Matrix;
  private u: Matrix | MathArray;

  constructor(p: number[][], u: number[]) {
    this.init = matrix(p);
    this.u = transpose(u);
  }

  private findProb(i: number): Matrix {
    return; // TODO: implement this method
  }

  get initial(): Matrix {
    return this.init;
  }

  getProb(i: number): Matrix {
    return this.findProb(i);
  }

  get Probs(): Matrix[] {
    return this.Probs;
  }
}
