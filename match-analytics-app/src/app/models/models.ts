export interface Match {
  id: number;
  date: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
}

export interface Player {
  id: number;
  name: string;
  team: string;
  position: string;
}

export interface Event {
  id?: number;
  minute: number;
  type: string;
  playerId: number;
  meta: { [key: string]: any };
}

export interface PlayerSummaryDto {
  id: number;
  name: string;
  team: string;
  position: string;
  goals: number;
  assists: number;
  shots: number;
  tackles: number;
  rating: number;
}
