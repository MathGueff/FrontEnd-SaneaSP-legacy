import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, Input, PLATFORM_ID, SimpleChanges, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

@Component({
  selector: 'app-graph',
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css',
  standalone: true
})
export class GraphComponent {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() type: ChartType = 'bar';              // tipo de gráfico: bar, line, pie, etc.
  @Input() data: ChartConfiguration['data'] = {  // dados
    labels: [],
    datasets: [],
  };
  @Input() options: ChartConfiguration['options'] = { responsive: true }; // opções

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  private chart!: Chart;

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      Chart.register(...registerables);
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    // atualiza gráfico quando os @Input() mudam
    if (this.chart && (changes['data'] || changes['type'] || changes['options'])) {
      this.chart.destroy();
      this.renderChart();
    }
  }

  private renderChart(): void {
    if (!this.chartCanvas) return;

    const config = {
      type: this.type,
      data: this.data,
      options: this.options,
    };
    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
