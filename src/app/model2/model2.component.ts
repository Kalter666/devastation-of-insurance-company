import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Devastation2 } from '../models/model2';
import { DataPreparer } from '../shared/data-preparer';
import { model2Hint } from '../shared/hint/hints';

@Component({
  selector: 'app-model2',
  templateUrl: './model2.component.html',
  styleUrls: ['./model2.component.scss']
})
export class Model2Component implements OnInit {
  multi: any[] = [];
  graphVisible = false;

  isShowHint = false;
  hint = model2Hint;

  calculateGroup = new FormGroup({
    a: new FormControl(1, [Validators.required]),
    theta: new FormControl(0.5, [Validators.required]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  constructor() { }

  ngOnInit() { }

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
    const probs = devastation.probs;
    const capitals = devastation.capitals;
    return { probs, capitals };
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }

  onShowHint() {
    this.isShowHint = !this.isShowHint;
  }
}
