import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Devastation } from '../markov/devastation';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  multi: any[] = [];
  graphVisible = false;

  calculateGroup = new FormGroup({
    r: new FormControl(1, [Validators.required]),
    a: new FormControl(11, [Validators.required]),
    theta: new FormControl(0.5, [Validators.required]),
    k: new FormControl(10, [Validators.required]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  constructor() {}

  ngOnInit() {}

  onCalculate() {
    const input = this.calculateGroup.value;
    const devastation = this.buildDevastation(input);
    const res = this.buildSingle(devastation.probs, devastation.capitals, input.theta);
    this.multi.push(res);
    this.graphVisible = false;
    setTimeout(() => this.graphVisible = true, 1);
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }

  buildSingle(probs: any[], capitals: any[], theta: number) {
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

  buildDevastation(input: any) {
    const { a, r, theta, capitalRange, k } = input;
    const devastation = new Devastation(a, r, theta, capitalRange, k, 0.5);
    const probs = devastation.probabilities;
    const capitals = devastation.capitals;
    return { probs, capitals };
  }
}
