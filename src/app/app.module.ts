import { FlightSearchPageModule } from './components/flight-search-page/flight-search-page.module';
import { AngularMaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarService } from './services/utility/toolbar.service';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    FlightSearchPageModule
  ],
  providers: [ToolbarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
