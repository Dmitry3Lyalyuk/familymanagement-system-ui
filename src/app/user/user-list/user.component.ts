/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, inject, OnInit, signal } from '@angular/core';
import { IPaginatedResponse, UserService } from '../../services/user.service';
import { SnakbarService } from '../../services/snakbar.service';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from '../../models/user.type';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
    this.userService.getPaginatedUsers(this.pageNumber, this.pageSize).subscribe({
      next: (response: IPaginatedResponse<IUser>) => {
        this.users.set(response.items);
        this.totalCount = response.totalCount;
      },
      error: err => {
        console.error(err);
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
            this.loadUsers;
          },
          error: err => {
            console.log('Error occured whilst deleting a user', err);
            this.snackbar.openSnackBar(err, 'OK');
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
