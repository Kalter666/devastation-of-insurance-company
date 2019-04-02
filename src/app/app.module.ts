import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { HeaderComponent } from './main/header/header.component';
import { Model2Component } from './model2/model2.component';
import { GraphComponent } from './shared/graph/graph.component';
import { MarkovChainComponent } from './markov-chain/markov-chain.component';
import { TableComponent } from './markov-chain/table/table.component';
import { InputFormComponent } from './markov-chain/input-form/input-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    GraphComponent,
    Model2Component,
    HeaderComponent,
    MarkovChainComponent,
    TableComponent,
    InputFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
