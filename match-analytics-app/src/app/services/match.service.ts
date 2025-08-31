import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Match, PlayerSummaryDto } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api';
  private platformId = inject(PLATFORM_ID);

  getMatch(): Observable<Match> {
    return this.http.get<Match>(`${this.apiUrl}/match`)
      .pipe(catchError(this.handleError));
  }

  addEvent(event: Event): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/event`, event)
      .pipe(catchError(this.handleError));
  }

  getPlayerSummary(id: number): Observable<PlayerSummaryDto> {
    return this.http.get<PlayerSummaryDto>(`${this.apiUrl}/player/${id}`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    
    // Check for platform to prevent 'ErrorEvent is not defined' in SSR
    if (isPlatformBrowser(this.platformId) && error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 404:
          errorMessage = 'Resource not found';
          break;
        case 500:
          errorMessage = 'Internal server error';
          break;
        case 0:
          errorMessage = 'Network Error: Check your backend server is running.';
          break;
        default:
          errorMessage = `Server returned status: ${error.status}, error: ${error.message}`;
          break;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
