import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Model3 as m3 } from './model3';
import { DataPreparer as dp } from '../../shared/data-preparer';

@Component({
  selector: 'app-model3',
  templateUrl: './model3.component.html',
  styleUrls: ['./model3.component.scss']
})
export class Model3Component implements OnInit {
  multi: any[] = [];
  graphVisible = false;

  calculateGroup = new FormGroup({
    theta: new FormControl(0.1, [Validators.required]),
    k: new FormControl(25, [Validators.required]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  constructor() { }

  ngOnInit() {
    this.onCalculate();
  }

  onCalculate() {
    const input = this.calculateGroup.value;
    const devastation = this.buildDevastation(input);
    const res = dp.buildSingle(
      devastation.probs,
      devastation.capitals,
      input.theta
    );
    this.multi = [...this.multi, res];
    this.graphVisible = true;
  }

  buildDevastation({ theta, capitalRange, k }) {
    const devastation = new m3(
      theta,
      capitalRange,
      k
    );
    const probs = devastation.probs;
    const capitals = devastation.capitals;
    return { probs, capitals };
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }

}
