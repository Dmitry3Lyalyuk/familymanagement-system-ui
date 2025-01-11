/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConfigService {
  private readonly apiBaseUrl: string = 'https://localhost:7122/api';

  constructor() {}

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get authUrl(): string {
    return `${this.apiBaseUrl}/Auth`;
  }

  get userUrl(): string {
    return `${this.apiBaseUrl}/Users`;
  }

  get projectUrl(): string {
    return `${this.apiBaseUrl}/Family`;
  }
}
