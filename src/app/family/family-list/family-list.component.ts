/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, inject, OnInit, signal } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialog } from '@angular/material/dialog';
import { IFamily } from '../../models/family';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-family-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule],
  templateUrl: './family-list.component.html',
  styleUrl: './family-list.component.css',
})
export class FamilyListComponent implements OnInit {
  familyServise = inject(FamilyService);
  snackbar = inject(SnakbarService);
  dialog = inject(MatDialog);

  families = signal<IFamily[]>([]);
  pageNumber = 0;
  pageSize = 5;
  totalCount = 0;

  errorMessage = '';
  displayedColuumns: string[] = ['id', 'category', 'name', 'brand', 'action'];

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

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadFamily();
  }
}
