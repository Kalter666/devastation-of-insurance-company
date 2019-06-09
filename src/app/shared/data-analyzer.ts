export class DataAnalyzer {
  private grouped: Map<string, Map<number, number>>;

  constructor(multi: any[]) {
    const grouped = new Map();

    for (const { name, series } of multi) {
      const groupedSeries = this.createMap(series);
      grouped.set(name, groupedSeries);
    }

    this.grouped = grouped;
  }

  get min() {
    const grouped = this.grouped;
    const mins = [];

    for (let [name, series] of grouped) {
      const min = this.findMin(series);
      name = (+name).toFixed(4);
      mins.push({ name, min });
    }

    return mins;
  }

  get max() {
    const grouped = this.grouped;
    const maxs = [];

    for (let [name, series] of grouped) {
      const max = this.findMax(series);
      name = (+name).toFixed(4);
      maxs.push({ name, max });
    }

    return maxs;
  }

  get average() {
    const grouped = this.grouped;
    const averages = [];

    for (let [name, series] of grouped) {
      const average = this.findAverage(series);
      name = (+name).toFixed(4);
      averages.push({ name, average });
    }

    return averages;
  }

  private findAverage(series: Map<number, number>) {
    let sum = 0;
    const size = series.size;

    for (const [key, value] of series) {
      sum += value;
    }

    return sum / size;
  }

  private findMin(series: Map<number, number>) {
    let min = null;
    let capital = null;

    for (const [key, value] of series) {
      min = !min ? value : min;
      if (value < min) {
        min = value;
        capital = key;
      }
    }

    min = (+min).toFixed(4);
    capital = (+capital).toFixed(4);

    return { min, capital };
  }

  private findMax(series: Map<number, number>) {
    let max = null;
    let capital = null;

    for (const [key, value] of series) {
      max = !max ? value : max;
      if (value > max) {
        max = value;
        capital = key;
      }
    }

    max = (+max).toFixed(4);
    capital = (+capital).toFixed(4);

    return { max, capital };
  }

  private createMap(series: any): Map<number, number> {
    const grouped = new Map();

    for (const { value, name } of series) {
      grouped.set(+name, +value);
    }

    return grouped;
  }
}
