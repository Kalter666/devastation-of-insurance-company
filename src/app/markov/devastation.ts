import { exp } from 'mathjs';
import * as mathjs from 'mathjs';

export interface CapitalRange {
  min: number;
  max: number;
}

export class Devastation {
  // constant, insurance payments
  private a: number;
  // constant, rate of payments
  private r: number;
  private sigma: number;
  private k: number;
  // capital
  private S: number[];
  // probabilities of devastation
  private probs: number[];
  // approximation
  private approx: number;
  // range of capital
  private capitalRange: CapitalRange;

  constructor(
    a: number = 1,
    r: number = 1,
    sigma: number = 0.1,
    capitalRange: CapitalRange,
    k: number = 10,
    approx: number = 0.1
  ) {
    if (!a || !r || !sigma || !capitalRange || !k || !approx) {
      throw new Error('Not enough parameters!');
    }
    this.a = a;
    this.r = r;
    this.sigma = sigma;
    this.capitalRange = capitalRange;
    this.k = k;
    this.approx = approx;
    this.buildProbs();
  }

  private buildCapitals(capitalRange: CapitalRange, approx: number): number[] {
    const capitals: number[] = [];
    for (
      let i = capitalRange.min * 10;
      i <= capitalRange.max * 10;
      i += approx * 10
    ) {
      capitals.push(i / 10);
    }
    return capitals;
  }

  private findExp(s: number, a: number, r: number, sigma: number): number {
    const exponent = exp((s - a * r) / ((1 + sigma) * a));
    if (isNaN(exponent)) {
      throw new Error('Cannot find exponent.');
    }
    return exponent;
  }

  private findUnderSum(
    r: number,
    a: number,
    sigma: number,
    s: number,
    n: number
  ): number {
    const scope = { r, a, sigma, s, n };
    const func = `((-1) ^ n * (s - a * r) ^ n) /
     ((1 + sigma) ^ n * a ^ n * r!)`;
    const res = mathjs.eval(func, scope);
    if (isNaN(res)) {
      throw new Error('Cannot find under sum');
    }
    return res;
  }

  private findPartOfSum(
    s: number,
    a: number,
    r: number,
    sigma: number,
    n: number
  ): number {
    return this.findExp(s, a, r, sigma) * this.findUnderSum(r, a, sigma, s, n);
  }

  private findSum(
    s: number,
    a: number,
    r: number,
    sigma: number,
    k: number
  ): number {
    let sum = 0;
    if (k < 0) {
      throw new Error ('k - cannot be below 0');
    }
    for (let i = 0; i <= k; i++) {
      sum += this.findPartOfSum(s, a, r, sigma, i);
    }
    return sum;
  }

  private findProbability(
    s: number,
    a: number,
    r: number,
    sigma: number,
    k: number
  ): number {
    const left = sigma / (1 + sigma);
    const sum = this.findSum(s, a, r, sigma, k);
    return 1 - left * sum;
  }

  private buildProbs() {
    const a = this.a;
    const r = this.r;
    const sigma = this.sigma;
    const capitalRange = this.capitalRange;
    const k = this.k;
    const approx = this.approx;

    const capitals = this.buildCapitals(capitalRange, approx);
    this.S = capitals;
    const probs = [];

    for (const s of capitals) {
      const prob = this.findProbability(s, a, r, sigma, k);
      if (isNaN(prob)) {
        throw new Error('Cannot find prob');
      }
      probs.push(prob);
    }

    this.probs = probs;
  }

  get probabilities() {
    return this.probs;
  }

  get capitals() {
    if (!this.S || this.S === []) {
      this.S = this.buildCapitals(this.capitalRange, this.approx);
    }
    return this.S;
  }
}
