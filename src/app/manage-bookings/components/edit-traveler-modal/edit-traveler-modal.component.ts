import { Response } from 'src/app/shared/models/api-response-types';
import { TravelerService } from './../../../services/traveler.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TravelerModel, TravelerRequest } from './../../models/booking-types';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface EditTravelerModalData {
  traveler: TravelerRequest;
  bookingId: number;
  mode: 'add' | 'edit';
}

@Component({
  selector: 'app-edit-traveler-modal',
  templateUrl: './edit-traveler-modal.component.html',
  styleUrls: ['./edit-traveler-modal.component.scss']
})
export class EditTravelerModalComponent implements OnInit {

  loading = false;
  error = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: EditTravelerModalData,
    private travelerService: TravelerService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditTravelerModalComponent>
  ) { }

  ngOnInit(): void {
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    const travelerRequest = (traveler: TravelerRequest, bookingId: number) =>
      this.modalData.mode === 'add' ? this.travelerService.addTraveler(traveler, bookingId) :
      this.travelerService.updateTraveler(traveler);
    const requestVerb = this.modalData.mode === 'add' ? 'added' : 'updated';
    travelerRequest(this.modalData.traveler, this.modalData.bookingId).subscribe((response: Response<TravelerModel>) => {
      this.loading = !response.data && !response.error;
      if (response.data) {
        this.snackBar.open(`Traveler ${requestVerb} successfully.`, 'Close', {
          duration: 3000
        });
        this.dialogRef.close(response.data);
      } else if (response.error) {
        this.error = 'Request failed. Please try again.';
      }
    });
  }
}
