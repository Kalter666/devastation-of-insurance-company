import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DataPreparer } from '../shared/data-preparer';
import { Devastation2 } from './../markov/model2';

@Component({
  selector: 'app-model2',
  templateUrl: './model2.component.html',
  styleUrls: ['./model2.component.scss']
})
export class Model2Component implements OnInit {
  multi: any[] = [];
  graphVisible = false;

  calculateGroup = new FormGroup({
    a: new FormControl(11, [Validators.required]),
    theta: new FormControl(0.5, [Validators.required]),
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

  buildDevastation({ a, theta, capitalRange }) {
    const devastation = new Devastation2(
      capitalRange.min,
      capitalRange.max,
      theta,
      a
    );
    const probs = devastation.devastations;
    const capitals = devastation.capitals;
    return { probs, capitals };
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }
}
