import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from '../auth/auth.service';
import { BonusCard } from './entities/bonus-card';

@Injectable({
  providedIn: 'root'
})
export class BonusCardService extends ApiService {

  override httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${this.authService.getToken()}`
    }),
  };

  constructor(protected http: HttpClient, private authService: AuthService) {
    super();
    this.apiURL = this.apiURL + 'BonusCards/';
  }

  createBonusCard(bonusCard: BonusCard): Observable<BonusCard> {
    return this.http
      .post<BonusCard>(this.apiURL, JSON.stringify(bonusCard), this.httpOptions)
      .pipe(retry(1), catchError(this.handleError))
  }

  getBonusCards(): Observable<BonusCard[]> {
    return this.http
      .get<BonusCard[]>(this.apiURL, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getBonusCard(id: string): Observable<BonusCard> {
    return this.http
      .get<BonusCard>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateBonusCard(id: string, bonusCard: BonusCard): Observable<BonusCard> {
    return this.http
      .put<BonusCard>(
        this.apiURL + id, JSON.stringify(bonusCard), this.httpOptions
      )
      .pipe(retry(1), catchError(this.handleError));
  }

  deleteBonusCard(id: string): Observable<BonusCard> {
    return this.http
      .delete<BonusCard>(this.apiURL + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
}
