import * as mathjs from 'mathjs';

export class Devastation2 {
  private S: number[];
  private P: number[];
  private theta: number;
  private a0: number;

  constructor(
    min: number = 0,
    max: number = 20,
    theta: number = 0.5,
    a0: number = 1,
    approx: number = 0.1
  ) {
    this.theta = theta;
    this.a0 = a0;
    this.S = this.buildCapitals(min, max, approx);
  }

  private buildCapitals(min: number, max: number, approx: number): number[] {
    const s = [];
    for (let i = min; i < max; i += approx) {
      s.push(i);
    }
    return s;
  }

  private findA(i: number): number {
    return this.a0;
    if (i === 0) {
      return this.a0;
    }
    return +mathjs.factorial(i) * Math.pow(this.a0, i);
  }

  private findProbs() {
    let i = 0;
    const p = [];
    const left = 1 / (1 + this.theta);
    for (const cap of this.S) {
      const a = this.findA(i);
      const right = Math.exp(-((this.theta * cap) / (a * (1 + this.theta))));
      p.push(left * right);
      i++;
    }
    this.P = p;
  }

  get probs(): number[] {
    this.findProbs();
    return this.P;
  }

  get capitals(): number[] {
    return this.S;
  }
}
