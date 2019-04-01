import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChartComponent } from './chart/chart.component';
import { Model2Component } from './model2/model2.component';

const routes: Routes = [
  { path: '', component: ChartComponent },
  { path: 'model2', component: Model2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
