import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

import { DataAnalyzer } from '../../shared/data-analyzer';
import { DataPreparer } from '../../shared/data-preparer';
import { thetaValidator } from '../../shared/directives/theta.directive';
import { Model1Service } from './model1';

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
    theta: new FormControl(0.5, [Validators.required, thetaValidator()]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  min = this.calculateGroup.value.capitalRange.min;
  max = this.calculateGroup.value.capitalRange.max;

  mins = [];
  maxs = [];
  averages = [];

  constructor() { }

  ngOnInit() {
    this.onCalculate();

    this.calculateGroup.valueChanges
      .pipe(debounceTime(1))
      .subscribe(this.onValueChanges);
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

    const dataAnalyser = new DataAnalyzer(this.multi);
    this.mins = dataAnalyser.min;
    this.maxs = dataAnalyser.max;
    this.averages = dataAnalyser.average;
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
    this.maxs = null;
    this.mins = null;
    this.averages = null;
  }

  onValueChanges({ capitalRange: { min, max } }) {
    this.min = min;
    this.max = max;
  }

}
