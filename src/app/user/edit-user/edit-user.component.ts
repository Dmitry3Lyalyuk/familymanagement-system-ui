import { CommonModule } from '@angular/common';
import { Component, Inject, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../../services/user.service';
import { SnakbarService } from '../../services/snakbar.service';
import { IUser } from '../../models/user';
import { Country } from '../../models/user-update';

@Component({
  selector: 'app-edit-user',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css',
})
export class EditUserComponent {
  userService = inject(UserService);
  snackbar = inject(SnakbarService);

  user: IUser;

  constructor(
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUser
  ) {
    this.user = { ...data };
  }

  onSave(): void {
    this.userService
      .updateUser(this.user.id, {
        id: this.user.id,
        country: this.user.country as Country,
        email: this.user.email,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(this.user);
        },
        error: err => this.snackbar.showError(err),
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
