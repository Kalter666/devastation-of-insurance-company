import { exp } from 'mathjs';
import * as mathjs from 'mathjs';

interface CapitalRange {
  min: number;
  max: number;
}

class Devastation {
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
    this.a = a;
    this.r = r;
    this.sigma = sigma;
    this.capitalRange = capitalRange;
    this.k = k;
    this.approx = approx;
  }

  private buildCapitals(capitalRange: CapitalRange, approx: number): number[] {
    const capitals: number[] = [];
    for (
      let i = capitalRange.min * 10;
      i < capitalRange.max * 10;
      i += approx * 10
    ) {
      capitals.push(i / 10);
    }
    return capitals;
  }

  private findExp(s: number, a: number, r: number, sigma: number): number {
    return exp((s - a * r) / ((1 + sigma) * a));
  }

  private findUnderSum(
    r: number,
    a: number,
    sigma: number,
    s: number,
    n: number
  ): number {
    const scope = { r, a, sigma, s, n };
    const func = `((-1) ^ n) * (s - a * r) ^ n /
     ((1 + sigma) ^ n) * (a ^ n) * r!`;
    return mathjs.eval(func, scope);
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
}
