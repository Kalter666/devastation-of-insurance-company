export class DataPreparer {
  static buildSingle(probs: number[], capitals: number[], theta: number) {
    const res = {
      name: `theta = ${theta}`,
      series: []
    };
    for (let i = 0; i < capitals.length; i++) {
      res.series.push({
        value: probs[i],
        name: capitals[i]
      });
    }
    return res;
  }
}
