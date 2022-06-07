import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { User } from './entities/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiService {

  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.apiURL = this.apiURL + 'Users/';
  }

  createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.apiURL, JSON.stringify(user), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUser(id: string): Observable<User> {
    return this.http
      .get<User>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUser(id: string, user: User): Observable<User> {
    return this.http
      .put<User>(
        this.apiURL + id, JSON.stringify(user), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteUser(id: string): Observable<User> {
    return this.http
      .delete<User>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
