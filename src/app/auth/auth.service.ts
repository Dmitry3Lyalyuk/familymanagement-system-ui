/* eslint-disable @typescript-eslint/no-empty-function */
import { inject, Injectable } from '@angular/core';
import { ApiConfigService } from '../services/api-config.service';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, retry } from 'rxjs';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { IAuthResponse } from './models/auth-response.model';

export interface IRegisterRequest {
  userName: string;
  country: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  userName: string;
  password: string;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private config = inject(ApiConfigService);
  private http = inject(HttpClient);
  private storage = inject(StorageService);
  private router = inject(Router);

  readonly TOKEN_KEY = 'authToken';
  readonly REFRESH_TOKEN_KEY = 'refreshToken';

  async register(userData: IRegisterRequest) {
    try {
      return await firstValueFrom(this.http.post(`${this.config.authUrl}/register`, userData));
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async login(credentials: ILoginRequest) {
    try {
      await this.authenticate(`${this.config.authUrl}/login`, credentials);
    } catch (error) {
      console.error('Login error', error);
      throw error;
    }
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      return await this.authenticate(`${this.config.authUrl}/refresh-token`, { refreshToken });
    } catch (error) {
      console.error('Error refreshing token', error);
      this.logout();
      throw error;
    }
  }

  logout(): void {
    this.storage.removeItem(this.TOKEN_KEY);
    this.storage.removeItem(this.REFRESH_TOKEN_KEY);
    this.router.navigate(['']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getItem(this.TOKEN_KEY);
  }

  private async authenticate(url: string, body: any): Promise<IAuthResponse> {
    const response = await firstValueFrom(this.http.post<IAuthResponse>(url, body).pipe(retry(3)));

    this.storage.setItem(this.TOKEN_KEY, response.token);
    this.storage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);

    return response;
  }
}
