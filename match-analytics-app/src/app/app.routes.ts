import { Routes } from '@angular/router';
import { MatchDashboardComponent } from './components/match-dashboard/match-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: MatchDashboardComponent,
    title: 'Match Dashboard'
  },
  {
    path: 'match/:id',
    component: MatchDashboardComponent,
    title: 'Match Details'
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];