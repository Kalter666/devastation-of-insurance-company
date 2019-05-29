import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Model1Component } from './model1/model1.component';
import { Model2Component } from './model2/model2.component';
import { Model3Component } from './model3/model3.component';

const routes: Routes = [
  { path: '', component: Model1Component },
  { path: 'model2', component: Model2Component },
  { path: 'model3', component: Model3Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
