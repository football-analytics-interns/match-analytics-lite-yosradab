import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Match } from '../../models/models';

@Component({
  selector: 'app-match-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white rounded-2xl p-8 mb-8 shadow-2xl card-hover">
      <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <!-- Left Side - Match Info -->
        <div class="mb-6 lg:mb-0">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-4">
              <span class="text-2xl">⚽</span>
            </div>
            <div>
              <h1 class="text-3xl lg:text-4xl font-bold">Match Dashboard</h1>
              <p class="text-blue-100 text-lg">{{ match().date | date:'EEEE, MMMM d, y' }}</p>
            </div>
          </div>
          <div class="flex items-center text-blue-100">
            <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
            </svg>
            <span>Live Match Analysis</span>
          </div>
        </div>

        <!-- Right Side - Score Display -->
        <div class="text-center lg:text-right">
          <div class="bg-white bg-opacity-10 rounded-2xl p-6 backdrop-blur-sm">
            <div class="text-5xl lg:text-6xl font-bold mb-4 tracking-tight">
              <span class="text-green-300">{{ match().homeScore }}</span>
              <span class="text-white mx-3">-</span>
              <span class="text-red-300">{{ match().awayScore }}</span>
            </div>
            <div class="flex flex-col lg:flex-row items-center justify-center lg:justify-end space-y-2 lg:space-y-0 lg:space-x-4 text-lg">
              <div class="bg-blue-500 bg-opacity-30 px-4 py-2 rounded-lg">
                <span class="font-semibold">{{ match().homeTeam }}</span>
              </div>
              <span class="text-blue-100 font-medium">vs</span>
              <div class="bg-red-500 bg-opacity-30 px-4 py-2 rounded-lg">
                <span class="font-semibold">{{ match().awayTeam }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card-hover {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .card-hover:hover {
      transform: translateY(-4px);
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
  `]
})
export class MatchHeaderComponent {
  match = input.required<Match>();
}