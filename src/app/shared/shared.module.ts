import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AngularMaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToolbarService } from './services/toolbar.service';
import { CenteredLoadingSpinnerComponent } from './components/centered-loading-spinner/centered-loading-spinner.component';
import { SortByPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [CenteredLoadingSpinnerComponent, SortByPipe],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [
    // Shared Modules
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,

    // Shared Components
    CenteredLoadingSpinnerComponent,

    // Shared Pipes
    SortByPipe,
    DatePipe
  ],
  providers: [ToolbarService, DatePipe]
})
export class SharedModule { }
