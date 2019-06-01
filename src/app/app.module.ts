import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppTranslateModule } from './app-translate.module';
import { AppComponent } from './app.component';
import { ModelsModule } from './models/models.module';
import { HeaderComponent } from './shared/header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    AppTranslateModule,
    BrowserAnimationsModule,
    BrowserModule,
    ModelsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
