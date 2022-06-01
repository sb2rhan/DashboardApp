import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { isBefore } from 'date-fns';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiURL = 'https://localhost:7123/api/v1/Authenticate/';
  
  static TOKEN_KEY: string = "token";
  static EXPIRATION: string = "expires_at";
  static USER_ID: string = "user_id";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
   
  constructor(protected http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post(
      this.apiURL + "login",
      JSON.stringify({ "username": username, "password": password }),
      this.httpOptions
    ).pipe(retry(1), catchError(this.handleError));
  }

  setSession(token: string, expiration: string, id: string, username: string) {
    localStorage.setItem(AuthService.TOKEN_KEY, token);
    localStorage.setItem(AuthService.EXPIRATION, expiration);
    localStorage.setItem(AuthService.USER_ID, `${id} ${username}`);
  }

  logout() {
    localStorage.removeItem(AuthService.TOKEN_KEY);
    localStorage.removeItem(AuthService.EXPIRATION);
    localStorage.removeItem(AuthService.USER_ID);
  }

  isLoggedIn() {
    const expires_at = this.getExpiration();
    if (expires_at == null) {
      return false;
    }
    return isBefore(new Date(), expires_at);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem(AuthService.EXPIRATION);
    if (expiration == null) return null;
    return new Date(expiration);
  }

  getToken() {
    return localStorage.getItem(AuthService.TOKEN_KEY);
  }

  getUserId() {
    return localStorage.getItem(AuthService.USER_ID)?.split(' ')[0];
  }

  getUsername() {
    return localStorage.getItem(AuthService.USER_ID)?.split(' ')[1];
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
