import { Devastation, CapitalRange } from './devastation';

describe('Devastation model test', () => {
  let service: Devastation;

  it('shoud create devastation model', () => {
    const r = 1;
    const capitalRange: CapitalRange = {
      min: 0,
      max: 20
    };
    const a = 11;
    const sigma = .5;
    const k = 10;
    service = new Devastation(a, r, sigma, capitalRange, k, .5);
    expect(service).toBeDefined();
  });

  it('shoud get probabilities', () => {
    const probs = service.probabilities;
    console.log(probs);
    expect(probs).toBeDefined();
  });

  it('should get capitals', () => {
    const capitals = service.capitals;
    expect(capitals).toBeDefined();
  });
});
