
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IFamily } from '../models/family';
import { IFamilyUpdate } from '../models/family-update';


@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);

  getFamily(): Observable<IFamily[]> {
    return this.http.get<IFamily[]>(this.apiConfig.familyUrl).pipe(catchError(this.handleError));
  }
  updateFamily(id: string, family: IFamilyUpdate): Observable<void> {
    return this.http.put<void>(`${this.apiConfig.familyUrl}/${id}`, family).pipe(catchError(this.handleError));
  }
  deleteFamily(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.familyUrl}/${id}`).pipe(catchError(this.handleError));
  }
  constructor() { }
  private handleError(error: unknown) {
    console.error('Error occured!', error);

    return throwError(error);
  }
}
