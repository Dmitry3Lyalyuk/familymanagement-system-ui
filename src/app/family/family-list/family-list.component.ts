/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, inject, OnInit, signal } from '@angular/core';
import { FamilyListService } from '../../services/familyservice';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialog } from '@angular/material/dialog';
import { IFamily } from '../../models/family';

@Component({
  selector: 'app-family-list',
  imports: [],
  templateUrl: './family-list.component.html',
  styleUrl: './family-list.component.css',
})
export class FamilyListComponent implements OnInit {
  familyServise = inject(FamilyListService);
  snackbar = inject(SnakbarService);
  dialog = inject(MatDialog);

  families = signal<IFamily[]>([]);
  errorMessage = '';

  constructor() {}
  ngOnInit(): void {
    this.loadFamily();
  }

  loadFamily(): void {
    this.familyServise.getFamily().subscribe({
      next: data => {
        this.families.set(data);
      },
      error: err => {
        this.errorMessage = err;
        console.error('Error occured!', err);
        this.snackbar.openSnackBar(err, 'close');
      },
    });
  }
}
