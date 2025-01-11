import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnakbarService {
  constructor(private snackBar: MatSnackBar) {}

  openSnackBar(massenge: string, action: string, duration = 4000): void {
    this.snackBar.open(massenge, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  showSuccess(massenge: string): void {
    this.snackBar.open(massenge, 'OK', {
      duration: 3000,
      panelClass: 'snack-success',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showError(massenge: string): void {
    this.snackBar.open(massenge, 'OK', {
      duration: 5000,
      panelClass: 'snack-error',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showWarning(massenge: string): void {
    this.snackBar.open(massenge, 'OK', {
      duration: 4000,
      panelClass: 'snack-warning',
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }
}
