// Flight Search Page
import { AirportSearchModalComponent } from './components/flight-search-page/airport-search-modal/airport-search-modal.component';
import { AirportTableComponent } from './components/flight-search-page/airport-table/airport-table.component';
import { FlightSearchPageComponent } from './components/flight-search-page/flight-search-page.component';
import { FlightSearchComponent } from './components/flight-search-page/flight-search/flight-search.component';

import { AngularMaterialModule } from './material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/signup/signup.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ToolbarService } from './services/utility/toolbar.service';
import { AuthService } from './services/api/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FlightResultsPageComponent } from './components/flight-results-page/flight-results-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ToolbarComponent,
    FlightSearchComponent,
    FlightSearchPageComponent,
    AirportTableComponent,
    AirportSearchModalComponent,
    FlightResultsPageComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSnackBarModule,
    FlexLayoutModule,
  ],
  providers: [ToolbarService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
