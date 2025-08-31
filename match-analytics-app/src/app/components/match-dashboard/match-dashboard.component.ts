import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { forkJoin, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { MatchService } from '../../services/match.service';

import { MatchHeaderComponent } from '../match-header/match-header.component';
import { PlayerStatsTableComponent } from '../player-stats-table/player-stats-table.component';
import { GoalsAssistsChartComponent } from '../goals-assists-chart/goals-assists-chart.component';
import { EventHeatmapComponent } from '../event-heatmap/event-heatmap.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { ErrorHandlerService } from '../../services/ErrorHandlerService';
import { Match, PlayerSummaryDto ,Event } from '../../models/models';

@Component({
  selector: 'app-match-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatchHeaderComponent,
    PlayerStatsTableComponent,
    GoalsAssistsChartComponent,
    EventHeatmapComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: 'match-dashboard.component.html'})

export class MatchDashboardComponent implements OnInit {
  private matchService = inject(MatchService);
  private errorHandler = inject(ErrorHandlerService);

  // Signals for reactive state management
  match = signal<Match | null>(null);
  playerStats = signal<PlayerSummaryDto[]>([]);
  events = signal<Event[]>([]);
  isLoading = signal(true);

  // Computed values
  totalGoals = computed(() => 
    this.playerStats().reduce((sum, player) => sum + player.goals, 0)
  );

  topScorer = computed(() => {
    const players = this.playerStats();
    if (players.length === 0) return 'N/A';
    
    const topPlayer = players.reduce((max, player) => 
      player.goals > max.goals ? player : max
    );
    
    return topPlayer.goals > 0 ? topPlayer.name : 'No goals yet';
  });

  ngOnInit(): void {
    this.loadMatchData();
  }

  private loadMatchData(): void {
    this.isLoading.set(true);

    this.matchService.getMatch().pipe(
      catchError(error => {
        this.errorHandler.showError(error);
        return of(null);
      }),
      finalize(() => this.isLoading.set(false))
    ).subscribe(match => {
      if (match) {
        this.match.set(match);
        this.loadPlayerData();
        this.loadEventsData();
      }
    });
  }

  private loadPlayerData(): void {
    // Mock player data since backend doesn't have all players
    const mockPlayerData: PlayerSummaryDto[] = [
      { id: 1, name: 'Ali', team: 'Blue FC', position: 'FWD', goals: 1, assists: 0, shots: 2, tackles: 0, rating: 8.5 },
      { id: 2, name: 'Sami', team: 'Blue FC', position: 'MID', goals: 0, assists: 1, shots: 0, tackles: 2, rating: 7.5 },
      { id: 3, name: 'Yassine', team: 'Blue FC', position: 'DEF', goals: 0, assists: 0, shots: 0, tackles: 1, rating: 7.0 },
      { id: 11, name: 'Khaled', team: 'Red United', position: 'FWD', goals: 1, assists: 0, shots: 1, tackles: 0, rating: 8.0 },
      { id: 12, name: 'Omar', team: 'Red United', position: 'GK', goals: 0, assists: 0, shots: 0, tackles: 0, rating: 6.5 }
    ];

    // Try to fetch real data, fall back to mock data
    const playerIds = [1, 2, 3, 11, 12];
    
    const playerRequests = playerIds.map(id => 
      this.matchService.getPlayerSummary(id).pipe(
        catchError(error => {
          console.warn(`Failed to load player ${id}, using mock data`);
          return of(mockPlayerData.find(p => p.id === id) || null);
        })
      )
    );

    forkJoin(playerRequests).subscribe(results => {
      const validPlayers = results.filter(player => player !== null) as PlayerSummaryDto[];
      this.playerStats.set(validPlayers.length > 0 ? validPlayers : mockPlayerData);
    });
  }

  private loadEventsData(): void {
    // Mock events based on your JSON structure
    const mockEvents: Event[] = [
      { id: 1, minute: 12, type: 'GOAL', playerId: 1, meta: { assistId: 2 } },
      { id: 2, minute: 43, type: 'SHOT', playerId: 1, meta: { onTarget: true } },
      { id: 3, minute: 67, type: 'GOAL', playerId: 11, meta: {} },
      { id: 4, minute: 75, type: 'TACKLE', playerId: 3, meta: {} }
    ];
    
    this.events.set(mockEvents);
  }
}