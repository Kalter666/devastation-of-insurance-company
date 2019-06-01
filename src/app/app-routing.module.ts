import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './welcome/welcome.component';
import { Model1Component } from './models/model1/model1.component';
import { Model2Component } from './models/model2/model2.component';
import { Model3Component } from './models/model3/model3.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'model1', component: Model1Component },
  { path: 'model2', component: Model2Component },
  { path: 'model3', component: Model3Component },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
