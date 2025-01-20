import { Component, inject } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { SnakbarService } from '../../services/snakbar.service';
import { IFamilyCreate } from '../../models/family-create';

import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-create-family',
  imports: [FormsModule, CommonModule, MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule,
    CommonModule, ReactiveFormsModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatIconModule, MatCardModule
  ],
  templateUrl: './create-family.component.html',
  styleUrl: './create-family.component.css'
})
export class CreateFamilyComponent {
  familyService = inject(FamilyService);
  snackbar = inject(SnakbarService);
  fb = inject(FormBuilder)
  router = inject(Router)
  dialogRef = inject(MatDialogRef)

  createFamilyForm: FormGroup;
  newFamily: IFamilyCreate | undefined;

  constructor() {
    this.createFamilyForm = this.fb.group({
      Category: ['', [Validators.required]],
      name: ['', [Validators.required]],
      brand: ['', [Validators.required]]
    })
  }
  async onCreationFamily(): Promise<void> {
    if (this.createFamilyForm.valid) {
      const formValues: IFamilyCreate = this.createFamilyForm.value;

      try {
        this.familyService.createFamily(formValues);
        this.router.navigate(['/family']);
      } catch (error) { }
    } else {
      console.warn('Form is invalid');
    }
  }

  // onCreationFamily(): void {
  //   if (this.createFamilyForm.valid) {
  //     const newFamily: IFamilyCreate = this.createFamilyForm.value;
  //     this.familyService.createFamily(newFamily).subscribe({
  //       next: () => {
  //         this.dialogRef.close(this.newFamily);
  //       },
  //       error: err => this.snackbar.openSnackBar(err, 'close'),
  //     });
  //   }
  // }
  onClose(): void {
    this.dialogRef.close();
  }
}
