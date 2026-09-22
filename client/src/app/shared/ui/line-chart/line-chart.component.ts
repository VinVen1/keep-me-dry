import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  input,
  signal,
  Signal,
  ViewChild,
} from '@angular/core';
import { Chart, ChartConfiguration, ChartData } from 'chart.js/auto';

@Component({
  selector: 'kmd-line-chart',
  imports: [],
  template: `
    <div class="chart-container">
      <canvas class="chart" #lineChart>{{ chart() }}</canvas>
    </div>
  `,
  styleUrl: './line-chart.component.scss',
})
export class LineChartComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart: ElementRef | undefined = undefined;
  data = input.required<ChartData>();

  protected chart = signal<Chart | undefined>(undefined);

  private config: Signal<ChartConfiguration> = computed(() => ({
    type: 'line',
    data: this.data(),
    options: {
      aspectRatio: 2.5,
    },
  }));

  ngAfterViewInit() {
    this.chart.set(new Chart(this.lineChart?.nativeElement.getContext('2d'), this.config()));
  }
}
