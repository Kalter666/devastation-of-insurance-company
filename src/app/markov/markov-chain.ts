import { matrix, Matrix, multiply, transpose, MathArray, pow } from 'mathjs';

export class MarkovChain {
  private init: Matrix;
  private u: Matrix | MathArray;

  constructor(p: number[][], u: number[]) {
    this.init = matrix(p);
    this.u = transpose(u);
  }

  getProb(i: number): Matrix | MathArray {
    return multiply(this.u, pow(this.init, i));
  }

  get initial(): Matrix {
    return this.init;
  }
}
