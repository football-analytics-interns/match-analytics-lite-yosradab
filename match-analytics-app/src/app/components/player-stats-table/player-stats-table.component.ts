import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSummaryDto } from '../../models/models';

@Component({
  selector: 'app-player-stats-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'player-stats-table.component.html'
})
export class PlayerStatsTableComponent {
  players = input.required<PlayerSummaryDto[]>();

  trackByPlayerId(index: number, player: PlayerSummaryDto): number {
    return player?.id || index;
  }

  getTeamBadgeClass(team: string): string {
    return team === 'Blue FC' 
      ? 'bg-blue-100 text-blue-800' 
      : 'bg-red-100 text-red-800';
  }

}
