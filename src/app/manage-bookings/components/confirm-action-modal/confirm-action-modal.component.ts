import { MatSnackBar } from '@angular/material/snack-bar';
import { Response } from 'src/app/shared/models/api-response-types';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';

export interface ActionModalData {
  title: string;
  content: string;
  action$: Observable<Response<any>>;
  successMessage: string;
  failureMessage: string;
}

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmActionModalComponent implements OnInit {

  loading = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ActionModalData,
    private dialogRef: MatDialogRef<ConfirmActionModalComponent>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  performAction(): void {
    this.modalData.action$.subscribe((response: Response<any>) => {
      this.loading = !response.data && !response.error;
      if (response.data) {
        this.dialogRef.close(response.data);
        this.snackBar.open(this.modalData.successMessage, 'Close', { duration: 3000 });
      } else if (response.error) {
        this.snackBar.open(this.modalData.failureMessage, 'Close', { duration: 3000 });
      }
    });
  }

}
