import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface ModalData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-action-modal',
  templateUrl: './confirm-action-modal.component.html',
  styleUrls: ['./confirm-action-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmActionModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public modalData: ModalData,
    private dialogRef: MatDialogRef<ConfirmActionModalComponent>
  ) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
