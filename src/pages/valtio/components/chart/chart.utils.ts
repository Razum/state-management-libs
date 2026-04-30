import type { ChartConfiguration } from 'chart.js';

import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
} from 'chart.js';

export type SupportedChartType = 'line' | 'bar';

export const chartTypeOptions = [
  { label: 'Line', value: 'line' },
  { label: 'Bar', value: 'bar' }
] satisfies { label: string; value: SupportedChartType }[];

export type ChartInputDataset = {
  label: string;
  data: number[];
  color: string;
};

export type ChartInput = {
  labels: Array<number | string>;
  datasets: ChartInputDataset[];
};

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  Tooltip
);

const baseOptions = {
  maintainAspectRatio: false,
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
};

export const buildLineChartConfig = ({
  labels,
  datasets
}: ChartInput): ChartConfiguration<'line'> => {
  const lineDatasets = datasets.map(({ label, data, color }) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}22`,
    fill: true,
    tension: 0.35,
    pointRadius: 3,
    pointBackgroundColor: color
  }));

  return {
    type: 'line',
    data: {
      labels,
      datasets: lineDatasets
    },
    options: {
      ...baseOptions,
      plugins: {
        legend: { display: datasets.length > 1 }
      }
    }
  };
};

export const buildBarChartConfig = ({
  labels,
  datasets
}: ChartInput): ChartConfiguration<'bar'> => {
  const barDatasets = datasets.map(({ label, data, color }) => ({
    label,
    data,
    borderColor: color,
    backgroundColor: `${color}99`,
    borderRadius: 6,
    maxBarThickness: 36
  }));

  return {
    type: 'bar',
    data: {
      labels,
      datasets: barDatasets
    },
    options: {
      ...baseOptions,
      plugins: {
        legend: { display: datasets.length > 1 }
      }
    }
  };
};

export const buildChartConfig = (
  chartType: SupportedChartType,
  chartInput: ChartInput
): ChartConfiguration<SupportedChartType> => {
  return chartType === 'bar' ? buildBarChartConfig(chartInput) : buildLineChartConfig(chartInput);
};
