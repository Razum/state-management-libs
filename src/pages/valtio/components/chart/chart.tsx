import type { ChartInput, SupportedChartType } from '@/pages/valtio/components/chart/chart.utils';

import { useEffect, useRef, useState } from 'react';

import { buildChartConfig, chartTypeOptions } from '@/pages/valtio/components/chart/chart.utils';
import { Card, Select, Typography } from 'antd';
import { Chart } from 'chart.js';

import styles from '@/pages/valtio/components/chart/chart.module.css';

const { Text } = Typography;

type ValtioChartProps = {
  title: string;
  chartInput: ChartInput;
};

const ValtioChart = ({ chartInput, title }: ValtioChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartType, setChartType] = useState<SupportedChartType>('line');
  const chartLabel =
    chartTypeOptions.find((option) => option.value === chartType)?.label ?? chartType;

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const chart = new Chart(canvasRef.current, buildChartConfig(chartType, chartInput));

    return () => {
      chart.destroy();
    };
  }, [chartType, chartInput]);

  return (
    <Card className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <Text className={styles.chartTitle}>
          {title} ({chartLabel})
        </Text>
        <Select<SupportedChartType>
          aria-label="Select chart type"
          className={styles.chartTypeSelect}
          onChange={setChartType}
          options={chartTypeOptions}
          value={chartType}
        />
      </div>
      <div className={styles.chartContainer}>
        <canvas aria-label={`${chartLabel} chart preview`} ref={canvasRef} role="img" />
      </div>
    </Card>
  );
};

export default ValtioChart;
