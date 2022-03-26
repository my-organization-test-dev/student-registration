import { AuthApiService } from './auth-api-services';
import { Injectable } from '@angular/core';
import { User } from './user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private readonly authApiService: AuthApiService,
    private readonly router: Router
  ) {}

  login(user: User): string {
    return this.authApiService.login(user);
  }
  logout(): void {
    localStorage.clear();
    localStorage.removeItem('token');
    this.router.navigate(['login']);
  }
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
