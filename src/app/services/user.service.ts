import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { IUser } from '../models/user';
import { IUserUpdate } from '../models/user-update';

export interface IPaginatedRespose<T> {
  items: T[];
  pageNumber: number,
  totalPages: number,
  totalCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiConfig.userUrl).pipe(
      map((users: IUser[]) => users.sort((a, b) => a.email.localeCompare(b.email))),
      catchError(this.handleError)
    );
  }

  getUserById(id: string): Observable<IUser> {
    return this.http.get<IUser>(`${this.apiConfig.userUrl}/${id}`).pipe(catchError(this.handleError));
  }

  updateUser(id: string, user: IUserUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiConfig.userUrl}/${id}`, user).pipe(catchError(this.handleError));
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.userUrl}/${id}`).pipe(catchError(this.handleError));
  }

  private handleError(error: unknown) {
    console.error('Error occured!', error);

    return throwError(error);
  }
}
