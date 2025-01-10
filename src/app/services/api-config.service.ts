import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  private readonly apiBaseUrl: string = 'https://localhost:7122/api';

  constructor() { }

  get apiUrl(): string {
    return this.apiBaseUrl;
  }

  get userUrl(): string {
    return `${this.apiBaseUrl}/Users`;
  }

  get authUrl(): string {
    return `${this.apiBaseUrl}/Auth`;
  }

  get familyUrl(): string {
    return `${this.apiBaseUrl}/Family`;
  }
}
