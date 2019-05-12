import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Model1Service } from '../models/model1.service';
import { DataPreparer } from '../shared/data-preparer';

@Component({
  selector: 'app-model1',
  templateUrl: './model1.component.html',
  styleUrls: ['./model1.component.scss']
})
export class Model1Component implements OnInit {
  multi: any[] = [];
  graphVisible = false;
  calculateGroup = new FormGroup({
    a: new FormControl(1, [Validators.required]),
    b: new FormControl(1, [Validators.required]),
    theta: new FormControl(0.5, [Validators.required]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  constructor() { }

  ngOnInit() {
  }

  onCalculate() {
    const input = this.calculateGroup.value;
    const devastation = this.buildDev(input);
    const res = DataPreparer.buildSingle(
      devastation.probs,
      devastation.capitals,
      input.theta
    );
    this.multi = [...this.multi, res];
    this.graphVisible = true;
  }

  buildDev({ a, b, theta, capitalRange }) {
    const dev = new Model1Service(capitalRange, a, b, theta);
    const capitals = dev.caps;
    const probs = dev.probs;
    return { probs, capitals };
  }

  onClear() {
    this.multi = [];
    this.graphVisible = false;
  }

}
