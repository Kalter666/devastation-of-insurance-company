import { Component, OnInit } from '@angular/core';

import { CapitalRange, Devastation } from '../markov/devastation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  multi: any[];
  graphVisible = false;

  devastation: Devastation;

  constructor() {}

  ngOnInit() {}

  onCalculate() {
    const r = 1;
    const capitalRange: CapitalRange = {
      min: 0,
      max: 20
    };
    const a = 11;
    const sigma = 0.5;
    const k = 10;
    this.devastation = new Devastation(a, r, sigma, capitalRange, k, 0.5);
    const probs = this.devastation.probabilities;
    const capitals = this.devastation.capitals;
    const res = {
      name: 'sigma = 0.5',
      series: []
    };
    for (let i = 0; i < capitals.length; i++) {
      res.series.push({
        value: probs[i],
        name: capitals[i]
      });
    }
    this.multi = [res];
    this.graphVisible = true;
  }
}
