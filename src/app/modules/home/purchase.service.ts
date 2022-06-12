import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, retry, Observable } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { Purchase } from './entities/purchase';

@Injectable({
  providedIn: 'root'
})
export class PurchaseService extends ApiService {

  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.auth_service.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private auth_service: AuthService) {
    super();
    this.apiURL = this.apiURL + 'Purchases/';
  }

  getPurchase(id: string): Observable<Purchase> {
    return this.http
      .get<Purchase>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getPurchases(): Observable<Purchase[]> {
    return this.http
      .get<Purchase[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updatePurchase(id: string, purchase: Purchase): Observable<Purchase> {
    return this.http
      .put<Purchase>(
        this.apiURL + id, JSON.stringify(purchase), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deletePurchase(id: string): Observable<Purchase> {
    return this.http
      .delete<Purchase>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
