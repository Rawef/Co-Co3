import { Component, OnInit } from '@angular/core';
import { AnnonceService } from '../../service/annonce.service';
import { Chart, registerables, ChartItem } from 'chart.js';

@Component({
  selector: 'app-statistics',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.css']
})
export class StatComponent implements OnInit {
  activeCount = 0;
  inactiveCount = 0;
  loading = true;
  error: string | null = null;
  chart: Chart<'doughnut', number[], unknown> | null = null;

  constructor(private annonceService: AnnonceService) {
    Chart.register(...registerables); // Register Chart.js components
  }

  ngOnInit(): void {
    this.loadStatistics(); // Load statistics on initialization
  }

  loadStatistics(): void {
    this.annonceService.getStatistics().subscribe(
      (data) => {
        this.activeCount = data.active_count; // Update active count
        this.inactiveCount = data.inactive_count; // Update inactive count
        this.loading = false;
        this.initializeChart(); // Initialize the chart after data is loaded
      },
      (error) => {
        this.error = 'Failed to load statistics. Please try again.'; // Set error message
        this.loading = false;
      }
    );
  }

  initializeChart(): void {
    setTimeout(() => { // Delay initialization to ensure the canvas is ready
      const ctx = document.getElementById('statistics-chart') as ChartItem;
      if (ctx && !this.chart) { // Ensure chart isn't already initialized
        this.chart = new Chart<'doughnut', number[], unknown>(ctx, {
          type: 'doughnut', // Set to donut chart
          data: {
            labels: ['Active', 'Inactive'], // Chart labels
            datasets: [
              {
                data: [this.activeCount, this.inactiveCount], // Chart data
                backgroundColor: ['#4CAF50', '#F44336'], // Colors for active/inactive
                borderColor: ['#388e3c', '#d32f2f'], // Border colors
                borderWidth: 1, // Border width
              },
            ],
          },
          options: {
            responsive: true, // Make it responsive
            plugins: {
              legend: {
                display: true, // Show legend
                position: 'top', // Position legend at the top
              },
            },
          },
        });
      }
    }, 100); // Add a slight delay for initialization
  }
}
