import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorHandlerService } from '../services/ErrorHandlerService';

@Component({
  selector: 'app-error-display',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="errorService.error$ | async as error" 
         class="fixed top-4 right-4 bg-red-500 text-white p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <div class="flex justify-between items-start">
        <div>
          <h4 class="font-semibold">Error</h4>
          <p class="text-sm mt-1">{{ error.message }}</p>
          <p class="text-xs mt-2 opacity-75">{{ error.timestamp | date:'short' }}</p>
        </div>
        <button (click)="errorService.clearError()" 
                class="ml-3 text-white hover:text-gray-200">
          ×
        </button>
      </div>
    </div>
  `
})
export class ErrorDisplayComponent {
  errorService = inject(ErrorHandlerService);
}
