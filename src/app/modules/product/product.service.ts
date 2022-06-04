import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { Product } from './entities/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends ApiService {
  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.apiURL = this.apiURL + 'Products/';
  }

  getProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateProduct(id: string, newProd: Product) {
    return this.http
      .put<Product>(
        this.apiURL + id, JSON.stringify(newProd), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }
}
