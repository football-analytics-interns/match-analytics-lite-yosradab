import { Component, input, OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PlayerSummaryDto , Event } from '../../models/models';

declare var Chart: any;

@Component({
  selector: 'app-event-heatmap',
  standalone: true,
  imports: [CommonModule],
  templateUrl : 'event-heatmap.component.html'})
export class EventHeatmapComponent implements AfterViewInit {
  @ViewChild('heatmapCanvas', { static: true }) heatmapCanvas!: ElementRef<HTMLCanvasElement>;
  events = input.required<Event[]>();
  players = input.required<PlayerSummaryDto[]>();
  private chart: any;

  ngAfterViewInit(): void {
    this.createHeatmap();
  }

  private createHeatmap(): void {
    const ctx = this.heatmapCanvas.nativeElement.getContext('2d');
    const events = this.events();
    const players = this.players();

    // Group events by 15-minute intervals
    const intervals = ['0-15', '16-30', '31-45', '46-60', '61-75', '76-90+'];
    const eventTypes = ['GOAL', 'SHOT', 'TACKLE', 'OTHER'];
    
    const heatmapData = intervals.map((interval, intervalIndex) => {
      return eventTypes.map((type, typeIndex) => {
        const [start, end] = interval === '76-90+' ? [76, 120] : interval.split('-').map(Number);
        const count = events.filter(e => 
          e.minute >= start && e.minute <= end && e.type === type
        ).length;
        
        return {
          x: intervalIndex,
          y: typeIndex,
          v: count
        };
      });
    }).flat();

    this.chart = new Chart(ctx, {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'Event Frequency',
          data: heatmapData,
          backgroundColor: (context: any) => {
            const value = context.parsed.v;
            const alpha = value === 0 ? 0.1 : Math.min(0.9, 0.2 + (value * 0.3));
            return `rgba(59, 130, 246, ${alpha})`;
          },
          pointRadius: (context: any) => Math.max(5, context.parsed.v * 8 + 5),
          pointHoverRadius: (context: any) => Math.max(7, context.parsed.v * 8 + 7)
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            callbacks: {
              title: () => '',
              label: (context: any) => {
                const interval = intervals[context.parsed.x];
                const eventType = eventTypes[context.parsed.y];
                const count = context.parsed.v;
                return `${eventType} events in ${interval} min: ${count}`;
              }
            }
          }
        },
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
            min: -0.5,
            max: 5.5,
            ticks: {
              stepSize: 1,
              callback: (value: any) => intervals[value] || ''
            },
            title: {
              display: true,
              text: 'Time Intervals (minutes)'
            }
          },
          y: {
            type: 'linear',
            min: -0.5,
            max: 3.5,
            ticks: {
              stepSize: 1,
              callback: (value: any) => eventTypes[value] || ''
            },
            title: {
              display: true,
              text: 'Event Types'
            }
          }
        }
      }
    });
  }
}
