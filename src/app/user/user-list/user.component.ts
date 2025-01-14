/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, inject, OnInit, signal } from '@angular/core';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user.type';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  imports: [MatTableModule, MatIconModule, MatButtonModule, MatPaginatorModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  userService = inject(UserService);
  snackbar = inject(SnakbarService);
  dialog = inject(MatDialog);

  users = signal<IUser[]>([]);
  pageNumber = 0;
  pageSize = 5;
  totalCount = 0;

  displayedColumns: string[] = ['id', 'userName', 'country', 'email', 'actions'];
  errorMessage = '';

  constructor() {}
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: data => {
        this.users.set(data);
      },
      error: err => {
        this.errorMessage = err;
        console.error('Error occured!', err);
        this.snackbar.openSnackBar(err, 'close');
      },
    });
  }

  onEditUser(user: IUser): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('User data after edit', result);
        this.loadUsers();
      }
    });
  }

  onDeleteUser(userId: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirm delection',
        message: 'Are you sure you want to delete this user?',
      },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.userService.deleteUser(userId).subscribe({
          next: () => {
            console.log('user deleted');
            this.snackbar.showError('test');
            this.loadUsers;
          },
          error: err => {
            console.log('Error occured whilst deleting a user', err);
            this.snackbar.showError;
          },
        });
      }
    });
  }

  onPageChanged(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageNumber = event.pageIndex + 1;
    this.loadUsers();
  }
}
