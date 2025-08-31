import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ErrorInfo {
  message: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  private errorSubject = new BehaviorSubject<ErrorInfo | null>(null);
  public error$ = this.errorSubject.asObservable();

  showError(message: string): void {
    this.errorSubject.next({
      message,
      timestamp: new Date()
    });
  }

  clearError(): void {
    this.errorSubject.next(null);
  }
}
