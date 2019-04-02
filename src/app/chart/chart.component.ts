import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Devastation } from '../markov/devastation';
import { DataPreparer } from './../shared/data-preparer';

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
    const res = DataPreparer.buildSingle(
      devastation.probs,
      devastation.capitals,
      input.theta
    );
    this.multi = [...this.multi, res];
    this.graphVisible = true;
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }

  buildDevastation(input: any) {
    const { a, r, theta, capitalRange, k } = input;
    const devastation = new Devastation(a, r, theta, capitalRange, k, 0.5);
    const probs = devastation.probabilities;
    const capitals = devastation.capitals;
    return { probs, capitals };
  }
}
