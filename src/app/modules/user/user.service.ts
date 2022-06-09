import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { RegisterUser, User } from './entities/user';
import { UserType } from './entities/user-type';

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

  authApiUrl!: string;

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.authApiUrl = this.apiURL + 'Authenticate/'
    this.apiURL = this.apiURL + 'Users/';
  }

  // returns just message: success or not
  createUser(type: UserType, r_user: RegisterUser): Observable<Object> {
    switch(type) {
      case UserType.Admin: {
        return this.http.post(this.authApiUrl + 'register-admin',
          JSON.stringify(r_user), this.httpOptions)
      }
      case UserType.Cashier: {
        return this.http.post(this.authApiUrl + 'register-cashier',
          JSON.stringify(r_user), this.httpOptions)
      }
      case UserType.Customer: {
        return this.http.post(this.authApiUrl + 'register-customer',
          JSON.stringify(r_user), this.httpOptions)
      }
    }
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
