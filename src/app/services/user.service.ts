import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../models/user.type';
import { UserUpdate } from '../models/user-update.type';

export interface IPaginatedResponse<T> {
  items: T[],
  pageNumber: number,
  totalPages: number,
  totalCount: number,
  hasPreviousPage: boolean,
  hasNextPage: boolean
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  set(items: User[]) {
    throw new Error('Method not implemented.');
  }
http = inject(HttpClient);
apiConfig=inject(ApiConfigService);

getUsers(): Observable<Array<User>> {
  return this.http.get<Array<User>>(this.apiConfig.userUrl)
  .pipe(
    map((users: User[]) => users.sort((a, b) => a.email.localeCompare(b.email))),
    catchError(this.handleError)
  )
}

getPaginatedUsers(pageNumber: number, pageSize: number): Observable<IPaginatedResponse<User>> {
  return this.http.get<IPaginatedResponse<User>>(`${this.apiConfig.userUrl}/Paginated?pageNumber=${pageNumber}&
    pageSize=${pageSize}`);
}

getUserById(id: string): Observable<User> {
  return this.http.get<User>(`${this.apiConfig.userUrl}/${id}`).pipe(
    catchError(this.handleError)
  );

}

  updateUser(id: string, user: UserUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiConfig.userUrl}/${id}`, user).pipe(
      catchError(this.handleError)
    );
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.userUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

private handleError(error: any) {
  console.error('Error occured!', error);

  return throwError (error);
}
}
