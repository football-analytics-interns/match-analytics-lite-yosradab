import { Component, input, OnInit, ViewChild, ElementRef, AfterViewInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerSummaryDto } from '../../models/models';

declare var Chart: any;

@Component({
  selector: 'app-goals-assists-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="bg-white rounded-xl shadow-lg p-6 card-hover">
      <div class="flex items-center justify-between mb-6">
        <h3 class="text-xl font-bold text-gray-800">Goals & Assists per Player</h3>
        <div class="flex items-center space-x-4 text-sm">
          <div class="flex items-center">
            <div class="w-3 h-3 bg-green-500 rounded mr-2"></div>
            <span class="text-gray-600">Goals</span>
          </div>
          <div class="flex items-center">
            <div class="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span class="text-gray-600">Assists</span>
          </div>
        </div>
      </div>
      <div class="chart-container">
        <canvas #chartCanvas width="400" height="300"></canvas>
      </div>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      height: 300px;
      width: 100%;
    }
    .card-hover {
      transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    }
    .card-hover:hover {
      transform: translateY(-2px);
      box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
  `]
})
export class GoalsAssistsChartComponent implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;
  players = input.required<PlayerSummaryDto[]>();
  private chart: any;

  constructor() {
    // Update chart when players data changes
    effect(() => {
      if (this.chart && this.players()) {
        this.updateChart();
      }
    });
  }

  ngAfterViewInit(): void {
    // Delay to ensure Chart.js is loaded
    setTimeout(() => {
      this.createChart();
    }, 100);
  }

  private createChart(): void {
    if (typeof Chart === 'undefined') {
      console.error('Chart.js not loaded. Add it to angular.json scripts section.');
      return;
    }

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    const playerData = this.players();

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: playerData.map(p => p.name),
        datasets: [
          {
            label: 'Goals',
            data: playerData.map(p => p.goals),
            backgroundColor: 'rgba(34, 197, 94, 0.8)',
            borderColor: 'rgba(34, 197, 94, 1)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          },
          {
            label: 'Assists',
            data: playerData.map(p => p.assists),
            backgroundColor: 'rgba(59, 130, 246, 0.8)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 2,
            borderRadius: 6,
            borderSkipped: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top' as const,
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                weight: '500'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: 'white',
            bodyColor: 'white',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            callbacks: {
              afterLabel: (context: any) => {
                const playerIndex = context.dataIndex;
                const player = playerData[playerIndex];
                return `Position: ${player.position} | Rating: ${player.rating.toFixed(1)}`;
              }
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1,
              font: {
                size: 11
              }
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            }
          },
          x: {
            ticks: {
              font: {
                size: 11
              }
            },
            grid: {
              display: false
            }
          }
        }
      }
    });
  }

  private updateChart(): void {
    if (!this.chart) return;
    
    const playerData = this.players();
    this.chart.data.labels = playerData.map(p => p.name);
    this.chart.data.datasets[0].data = playerData.map(p => p.goals);
    this.chart.data.datasets[1].data = playerData.map(p => p.assists);
    this.chart.update();
  }
}