import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { Category } from './entities/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends ApiService {
  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.apiURL = this.apiURL + 'Categories/';
  }

  createCategory(category: Category): Observable<Category> {
    return this.http
      .post<Category>(this.apiURL, JSON.stringify(category), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCategory(id: string): Observable<Category> {
    return this.http
      .get<Category>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateCategory(id: string, category: Category): Observable<Category> {
    return this.http
      .put<Category>(
        this.apiURL + id, JSON.stringify(category), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteCategory(id: string): Observable<Category> {
    return this.http
      .delete<Category>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
