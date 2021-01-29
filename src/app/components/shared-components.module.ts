import { FlexLayoutModule } from '@angular/flex-layout';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CenteredLoadingSpinnerComponent } from './centered-loading-spinner/centered-loading-spinner.component';



@NgModule({
  declarations: [CenteredLoadingSpinnerComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    FlexLayoutModule
  ],
  exports: [
    CenteredLoadingSpinnerComponent
  ]
})
export class SharedComponentsModule { }
