import { defaultEpsilon } from '../shared/constants';
import { CapitalRange } from './interfaces';

import { eval as mathEval } from 'mathjs';

export class Model3 {
  private a: number;
  private theta: number;
  private S: number[];
  private k: number;
  private thetaTerm: number;

  constructor(
    a: number,
    theta: number,
    capitalRange: CapitalRange,
    k: number = 10,
    epsilon: number = defaultEpsilon
  ) {
    this.k = k;
    this.a = a;
    this.theta = theta;
    this.buildCapitals(capitalRange, epsilon);
    this.findThetaTerm();
  }

  private buildCapitals(capitalRange: CapitalRange, epsilon: number) {
    const S: number[] = [];
    for (let i = capitalRange.min; i < capitalRange.max; i += epsilon) {
      S.push(i);
    }
    this.S = S;
  }

  private findExp(S: number, a: number, n: number) {
    const formula = 'exp( (S-a*n) / (a * (1 + theta))';
    const scope = {
      S,
      a,
      n,
      theta: this.theta
    };
    return +mathEval(formula, scope);
  }

  private findSum(s: number) {
    const a = this.a;
    const terms: number[] = [];
    const formula = '(-1)^n * (s-a*n)^n / (1+a*n)^n * a^n * n! * x';

    for (let n = 0; n <= this.k; n++) {
      const x = this.findExp(s, a, n);
      const scope = { s, a, n, x };
      const term = +mathEval(formula, scope);
      terms.push(term);
    }

    const reducer = (res: number, val: number) => res += val;
    const sum = terms.reduce(reducer, 0);
    return sum;
  }

  private findThetaTerm() {
    const formula = 'theta / (1 - theta)';
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
