import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class SnackBarService {
  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'bottom',
  };

  constructor(public snackBar: MatSnackBar) {}
  success(message:any) {
    this.config.panelClass = ['notification', 'success'];
    this.snackBar.open(message, '', this.config);
  }

  error(message:any) {
    this.config.panelClass = ['notification', 'error'];
    this.snackBar.open(message, '', this.config);
  }
}
