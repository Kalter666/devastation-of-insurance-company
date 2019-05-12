import { eval as mathEval } from 'mathjs';

export interface CapitalRange {
  min: number;
  max: number;
}

export const defaultEpsilon = 1e-1;

export class Model1Service {
  private S: number[];
  private a: number;
  private b: number;
  private theta: number;
  private P: number[];

  constructor(
    capitalRange: CapitalRange,
    a: number,
    b: number,
    theta: number,
    epsilon: number = defaultEpsilon
  ) {
    this.a = a;
    this.b = b;
    this.theta = theta;
    this.buildCapitals(capitalRange, epsilon);
  }

  private buildCapitals(capitalRange: CapitalRange, epsilon: number) {
    const S: number[] = [];
    for (let i = capitalRange.min; i < capitalRange.max; i += epsilon) {
      S.push(i);
    }
    this.S = S;
  }

  private buildProbs() {
    const formula = '(a + b) / (a + b * (1 + theta)) * e ^ (-(theta * S)/(a + b * (1 + theta)))';
    const baseScope = {
      a: this.a,
      b: this.b,
      theta: this.theta
    };
    const capitals = this.S;
    const P: number[] = [];
    for (const S of capitals) {
      const scope = { ...baseScope, S };
      const res = mathEval(formula, scope);
      P.push(res);
    }
    this.P = P;
  }

  get probs() {
    this.buildProbs();
    return this.P;
  }

  get caps() {
    return this.S;
  }
}
