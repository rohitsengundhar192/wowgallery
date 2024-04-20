import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { SpinnerComponent } from './spinner.component';

interface Config {
  width?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CustomSpinnerService {
  dialogRef!: MatDialogRef<SpinnerComponent>;
  constructor(private dialog: MatDialog) {}

  public open(
    title: string = 'Please wait',
    config: Config = { width: '200px' }
  ): Observable<boolean> {
    this.dialogRef = this.dialog.open(SpinnerComponent, {
      panelClass: 'custom-modalbox',
      disableClose: true,
      backdropClass: 'light-backdrop',
    });
    this.dialogRef.updateSize(config.width);
    this.dialogRef.componentInstance.title = title;
    return this.dialogRef.afterClosed();
  }

  public close() {
    if (this.dialogRef) this.dialogRef.close();
  }
}
