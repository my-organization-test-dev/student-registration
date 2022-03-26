import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  user = {
    userName: 'test@gmail.com',
    password: '123123',
  };
  token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6InRlc3RAZ21haWwuY29tIiwicGFzc2F3b3JkIjoiMTIzMTIzIiwiaWF0IjoxNTE2MjM5MDIyfQ.Efx-3U3YeOEMlF9VAggm1pYyevT47w87YcPAj_Y97L4';
  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(user: User): string {
    if (
      this.user.userName === user.userName &&
      this.user.password === user.password
    ) {
      localStorage.setItem('token', this.token);
      this.router.navigate(['students']);
      return this.token;
    } else {
      return 'unauthorized';
    }
  }
}
