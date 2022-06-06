import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { Supplier } from './entities/supplier';

@Injectable({
  providedIn: 'root'
})
export class SupplierService extends ApiService {
  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.apiURL = this.apiURL + 'Suppliers/';
  }

  createSupplier(supplier: Supplier): Observable<Supplier> {
    return this.http
      .post<Supplier>(this.apiURL, JSON.stringify(supplier), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  getSuppliers(): Observable<Supplier[]> {
    return this.http
      .get<Supplier[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getSupplier(id: string): Observable<Supplier> {
    return this.http
      .get<Supplier>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateSupplier(id: string, supplier: Supplier): Observable<Supplier> {
    return this.http
      .put<Supplier>(
        this.apiURL + id, JSON.stringify(supplier), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteSupplier(id: string): Observable<Supplier> {
    return this.http
      .delete<Supplier>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
