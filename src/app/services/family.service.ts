/* eslint-disable @typescript-eslint/no-empty-function */
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from './api-config.service';
import { catchError, Observable, throwError } from 'rxjs';
import { IFamily } from '../models/family';

@Injectable({
  providedIn: 'root',
})
export class FamilyService {
  http = inject(HttpClient);
  apiConfig = inject(ApiConfigService);

  getFamily(): Observable<IFamily[]> {
    return this.http.get<IFamily[]>(this.apiConfig.familyUrl).pipe(catchError(this.handleError));
  }
  constructor() {}
  private handleError(error: unknown) {
    console.error('Error occured!', error);

    return throwError(error);
  }
}
