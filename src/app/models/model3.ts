import { defaultEpsilon } from '../shared/constants';
import { CapitalRange } from './interfaces';

import { eval as mathEval, simplify } from 'mathjs';

export class Model3 {
  private theta: number;
  private S: number[];
  private k: number;
  private thetaTerm: number;

  constructor(
    theta: number,
    capitalRange: CapitalRange,
    k: number = 10,
    epsilon: number = defaultEpsilon
  ) {
    this.k = k;
    this.theta = theta;
    this.buildCapitals(capitalRange, epsilon);
    this.findThetaTerm();
  }

  private buildCapitals(capitalRange: CapitalRange, epsilon: number) {
    const S: number[] = [];
    for (let i = capitalRange.min; i <= capitalRange.max; i += epsilon) {
      S.push(i);
    }
    this.S = S;
  }

  private findSum(s: number) {
    const terms: number[] = [];
    const scopes = [];
    const formula = '( (-1)^ n * (s-a*n)^n ) / ( (1 + theta)^ n * a^n * n! ) * exp( (s-a*n) / ((1 + theta) * a) )';

    for (let n = 0; n <= this.k; n++) {
      const a = s / this.k + this.theta;
      const scope = { s, a, n, theta: this.theta };
      scopes.push(scope);
      const term = +mathEval(formula, scope);
      terms.push(term);
    }

    const reducer = (res: number, val: number) => res += val;
    const sum = terms.reduce(reducer, 0);
    return sum;
  }

  private findThetaTerm() {
    const formula = 'theta / (1 + theta)';
    const scope = { theta: this.theta };
    const term = mathEval(formula, scope);
    this.thetaTerm = +term;
  }

  private findProb(s: number) {
    const thetaTerm = this.thetaTerm;
    const sum = this.findSum(s);
    return 1 - thetaTerm * sum;
  }

  private findProbs() {
    const probs: number[] = [];

    for (const s of this.S) {
      const prob = this.findProb(s);
      probs.push(prob);
    }
    return probs;
  }

  get probs() {
    return this.findProbs();
  }

  get capitals() {
    return this.S;
  }
}
