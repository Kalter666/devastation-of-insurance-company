import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { GraphComponent } from './graph/graph.component';
import { HintComponent } from './hint/hint.component';
import { AnalyzeComponent } from './analyze/analyze.component';

@NgModule({
  declarations: [
    GraphComponent,
    HintComponent,
    AnalyzeComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    NgxChartsModule,
    FormsModule,
  ],
  exports: [
    TranslateModule,
    ReactiveFormsModule,
    NgxChartsModule,
    FormsModule,
    GraphComponent,
    HintComponent,
    AnalyzeComponent
  ]
})
export class SharedModule { }
