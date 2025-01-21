import { Component, Inject, inject } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { SnakbarService } from '../../services/snakbar.service';
import { IFamily } from '../../models/family';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-edit-family',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule],
  templateUrl: './edit-family.component.html',
  styleUrl: './edit-family.component.css'
})
export class EditFamilyComponent {
  familyService = inject(FamilyService);
  snackbar = inject(SnakbarService);

  family: IFamily;

  constructor(
    public dialogRef: MatDialogRef<EditFamilyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IFamily
  ) {
    this.family = { ...data };
  }

  onSave(): void {
    this.familyService
      .updateFamily(this.family.id, {
        id: this.family.id,
        name: this.family.name,
        brand: this.family.brand,
      })
      .subscribe({
        next: () => {
          this.dialogRef.close(this.family);
        },
        error: err => this.snackbar.openSnackBar(err, 'close'),
      });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
