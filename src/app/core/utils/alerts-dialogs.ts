import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class AlertsDialogs {
    constructor(private snackBar: MatSnackBar) {}

    openSnackBar(
        message: string,
        action: string = 'Close',
        hPosition: MatSnackBarHorizontalPosition = 'center',
        vPosition: MatSnackBarVerticalPosition = 'bottom'
    ): void {
        this.snackBar.open(message, action, {
            duration: 5000,
            horizontalPosition: hPosition,
            verticalPosition: vPosition,
        });
    }
}

