import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

const ACCESS_TOKEN = 'access_token';
const REFRESH_TOKEN = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor( private jwtHelperService: JwtHelperService,) {}



  getToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token: any) {
    localStorage.setItem(ACCESS_TOKEN, token);
  }

  saveRefreshToken(refreshToken: any) {
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  decodeJwtToken(jwt_token: any) {
    return this.jwtHelperService.decodeToken(jwt_token);
  }


  removeToken() {
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken() {
    localStorage.removeItem(REFRESH_TOKEN);
  }
}