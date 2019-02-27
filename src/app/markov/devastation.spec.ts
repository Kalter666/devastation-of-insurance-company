import { Devastation, CapitalRange } from './devastation';

describe('Devastation model test', () => {
  let service: Devastation;

  it('shoud create devastation model', () => {
    const r = .001;
    const capitalRange: CapitalRange = {
      min: 1,
      max: 10
    };
    const a = .1;
    const sigma = .5;
    const k = 100;
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
