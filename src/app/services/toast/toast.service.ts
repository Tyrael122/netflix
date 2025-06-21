import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private snackBar = inject(MatSnackBar);

  showToast(message: string, action: string = 'Close', duration: number = 3000) {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
    });
  }

  showError(message: string, action: string = 'Close', duration: number = 5000) {
    this.showToast(message, action, duration);
  }
}
