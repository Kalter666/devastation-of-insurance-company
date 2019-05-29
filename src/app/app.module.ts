import { Model1Service } from './models/model1.service';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './main/header/header.component';
import { Model1Component } from './model1/model1.component';
import { Model2Component } from './model2/model2.component';
import { GraphComponent } from './shared/graph/graph.component';
import { Model3Component } from './model3/model3.component';

@NgModule({
  declarations: [
    AppComponent,
    GraphComponent,
    Model1Component,
    Model2Component,
    HeaderComponent,
    Model3Component,
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
export class AppModule { }