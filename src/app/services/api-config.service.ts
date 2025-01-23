/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly apiBaseUrl = 'https://localhost:7122/api';

  constructor() { }

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get authUrl(): string {
    return `${this.apiBaseUrl}/Auth`;
  }

  get userUrl(): string {
    return `${this.apiBaseUrl}/Users`;
  }

  get familyUrl(): string {
    return `${this.apiBaseUrl}/Families`;
  }
  get profileUrl(): string {
    return `${this.apiBaseUrl}/Profile`;
  }

}
