import type { ChartInput } from '@/pages/valtio/components/chart/chart.utils';
import type { CountryData, Selection, ValtioStore } from '@/pages/valtio/valtio.store';

import { useMemo } from 'react';

type UseValtioDatasetParams = {
  selected: Selection;
  countries: Readonly<ValtioStore['countries']>;
};

type UseValtioDatasetResult = {
  chartTitle: string;
  chartInput: ChartInput;
  visibleCountries: readonly CountryData[];
};

export type StatItem = {
  title: string;
  value: number;
};

export const useValtioDataset = ({
  selected,
  countries
}: UseValtioDatasetParams): UseValtioDatasetResult => {
  return useMemo(() => {
    const visibleCountries = selected === 'all' ? Object.values(countries) : [countries[selected]];
    const labels = visibleCountries[0]?.data.map((point) => point.year) ?? [];
    const datasets = visibleCountries.map((countryData) => ({
      color: countryData.color,
      data: countryData.data.map((point) => point.value),
      label: countryData.label
    }));

    return {
      chartInput: { datasets, labels },
      chartTitle: selected === 'all' ? 'All Countries' : countries[selected].label,
      visibleCountries
    };
  }, [countries, selected]);
};

export const useValtioStats = (visibleCountries: readonly CountryData[]): StatItem[] => {
  return useMemo(() => {
    const values = visibleCountries.flatMap((countryData) =>
      countryData.data.map((point) => point.value)
    );
    const average = Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
    const min = Math.min(...values);
    const max = Math.max(...values);
    const latestTotal = visibleCountries.reduce((sum, countryData) => {
      return sum + (countryData.data.at(-1)?.value ?? 0);
    }, 0);

    return [
      { title: 'Average', value: average },
      { title: 'Min', value: min },
      { title: 'Max', value: max },
      {
        title: visibleCountries.length > 1 ? 'Latest Total' : 'Latest',
        value: latestTotal
      }
    ];
  }, [visibleCountries]);
};
