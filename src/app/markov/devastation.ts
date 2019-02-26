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
}
