import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { DataAnalyzer } from 'src/app/shared/data-analyzer';

import { DataPreparer } from '../../shared/data-preparer';
import { thetaValidator } from '../../shared/directives/theta.directive';
import { Devastation2 } from './model2';

@Component({
  selector: 'app-model2',
  templateUrl: './model2.component.html',
  styleUrls: ['./model2.component.scss']
})
export class Model2Component implements OnInit {
  multi: any[] = [];
  graphVisible = false;

  mins = [];
  maxs = [];
  averages = [];

  calculateGroup = new FormGroup({
    a: new FormControl(1, [Validators.required]),
    theta: new FormControl(0.5, [Validators.required, thetaValidator()]),
    capitalRange: new FormGroup({
      min: new FormControl(0, [Validators.required]),
      max: new FormControl(20, [Validators.required])
    })
  });

  min = this.calculateGroup.value.capitalRange.min;
  max = this.calculateGroup.value.capitalRange.max;

  constructor() { }

  ngOnInit() {
    this.onCalculate();

    this.calculateGroup.valueChanges
      .pipe(debounceTime(1))
      .subscribe(this.onValueChanges);
  }

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

    const dataAnalyser = new DataAnalyzer(this.multi);
    this.mins = dataAnalyser.min;
    this.maxs = dataAnalyser.max;
    this.averages = dataAnalyser.average;
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
    this.maxs = null;
    this.mins = null;
    this.averages = null;
  }

  onValueChanges({ capitalRange: { min, max } }) {
    this.min = min;
    this.max = max;
  }
}
