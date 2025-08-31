import { Component } from '@angular/core';
import { MatchDashboardComponent } from './components/match-dashboard/match-dashboard.component';
import { ErrorDisplayComponent } from './error-display/error-display.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MatchDashboardComponent,
    ErrorDisplayComponent
  ],
  template: `
    <app-match-dashboard />
    <app-error-display />
  `
})
export class AppComponent {
  title = 'match-analytics-frontend';
}
