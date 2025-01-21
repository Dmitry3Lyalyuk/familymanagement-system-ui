/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, inject, OnInit, signal } from '@angular/core';
import { FamilyService } from '../../services/family.service';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialog } from '@angular/material/dialog';
import { Category, IFamily } from '../../models/family';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { EditUserComponent } from '../../user/edit-user/edit-user.component';
import { EditFamilyComponent } from '../edit-family/edit-family.component';
import { IFamilyCreate } from '../../models/family-create';
import { CreateFamilyComponent } from '../create-family/create-family.component';

@Component({
  selector: 'app-family-list',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule, CommonModule,
    MatButtonModule, MatTooltipModule, MatCardModule, MatButtonModule],

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
  displayedColuumns: string[] = ['id', 'category', 'name', 'brand', 'actions'];
  discount: any;

  constructor() { }
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
  onCreateFamily(newFamily: IFamilyCreate): void {
    const dialogref = this.dialog.open(CreateFamilyComponent, {
      data: newFamily,
    });
    dialogref.afterClosed().subscribe(result => {
      if (result) {
        console.log('Family data after creation', result);
        this.loadFamily();
      }
    });
  }
  onEditFamily(family: IFamily): void {
    const dialogRef = this.dialog.open(EditFamilyComponent, {
      data: family,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Family data after edit', result);
        this.loadFamily();
      }
    })
  }

  onDeleteFamily(familyId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm delection',
        message: 'Are you sure you want to delete this user?',
      },
    });
    dialogRef.afterClosed().subscribe((result: Boolean) => {
      if (result) {
        this.familyServise.deleteFamily(familyId).subscribe({
          next: () => {
            console.log('family deleted');
            this.snackbar.showError('test');
            this.loadFamily;
          },
          error: err => {
            console.log('Error occured whilst deleting a family', err);
            this.snackbar.showError;
          },
        });
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadFamily();
  }

  getCategoryStr(category: Category): string {
    return Category[category];
  }
}
