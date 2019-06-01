import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { Model1Component } from './model1/model1.component';
import { Model2Component } from './model2/model2.component';
import { Model3Component } from './model3/model3.component';
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    Model1Component,
    Model2Component,
    Model3Component,
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class ModelsModule { }
