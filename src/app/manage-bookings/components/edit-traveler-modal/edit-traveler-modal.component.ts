import { Response } from 'src/app/shared/models/api-response-types';
import { TravelerService } from './../../../services/traveler.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TravelerModel } from './../../models/booking-types';
import { Component, Inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface ModalData {
  traveler: TravelerModel;
  bookingId: number;
  mode: 'add' | 'edit';
}

@Component({
  selector: 'app-edit-traveler-modal',
  templateUrl: './edit-traveler-modal.component.html',
  styleUrls: ['./edit-traveler-modal.component.scss']
})
export class EditTravelerModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ModalData,
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
    const travelerRequest = (traveler: TravelerModel, bookingId: number) =>
      this.modalData.mode === 'add' ? this.travelerService.addTraveler(traveler, bookingId) :
      this.travelerService.updateTraveler(traveler);
    const requestVerb = this.modalData.mode === 'add' ? 'added' : 'updated';
    travelerRequest(this.modalData.traveler, this.modalData.bookingId).subscribe((response: Response<TravelerModel>) => {
      if (response.data) {
        this.snackBar.open(`Traveler ${requestVerb} successfully.`, 'Close', {
          duration: 3000
        });
      } else if (response.error) {
        this.snackBar.open(response.error, 'Close', {
          duration: 3000
        });
      }
    });
    this.dialogRef.close();
  }
}
