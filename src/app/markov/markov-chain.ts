import { matrix, Matrix, multiply } from 'mathjs';

export class MarkovChain {
  private probs: Matrix[];

  constructor(p: number[][]) {
    const probability = matrix(p);
    this.probs.push(probability);
  }

  private findNextProb(probs: any): any {
    const first = probs[0];
    const last = probs[probs.length - 1];
    return multiply(first, last);
  }

  private findProb(i: number): Matrix {
    if (this.probs.length === 0 || i < 0) {
      return null;
    }
    if (i < this.probs.length) {
      return this.probs[i];
    }
    while (i >= this.probs.length) {
      const nextProb = this.findNextProb(this.probs);
      this.probs.push(nextProb);
    }
    return this.probs[i];
  }

  get initial(): Matrix {
    return this.probs[0];
  }

  getProb(i: number): Matrix {
    return this.findProb(i);
  }

  get Probs(): Matrix[] {
    return this.Probs;
  }
}
