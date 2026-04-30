import { proxy } from 'valtio';

export type Country = 'australia' | 'germany' | 'japan';
export type Selection = 'all' | Country;
export type CountryPoint = { readonly year: number; readonly value: number };

export type CountryData = {
  readonly label: string;
  readonly data: readonly CountryPoint[];
  readonly color: string;
};

export type ValtioStore = {
  selected: Selection;
  countries: Record<Country, CountryData>;
};

const store = proxy<ValtioStore>({
  selected: 'australia',
  countries: {
    australia: {
      label: 'Australia',
      color: '#1677ff',
      data: [
        { year: 2020, value: 1240 },
        { year: 2021, value: 1188 },
        { year: 2022, value: 1356 },
        { year: 2023, value: 1421 },
        { year: 2024, value: 1289 },
        { year: 2025, value: 1517 }
      ]
    },
    germany: {
      label: 'Germany',
      color: '#52c41a',
      data: [
        { year: 2020, value: 2104 },
        { year: 2021, value: 1987 },
        { year: 2022, value: 2231 },
        { year: 2023, value: 600 },
        { year: 2024, value: 2388 },
        { year: 2025, value: 2265 }
      ]
    },
    japan: {
      label: 'Japan',
      color: '#fa8c16',
      data: [
        { year: 2020, value: 3055 },
        { year: 2021, value: 2912 },
        { year: 2022, value: 3188 },
        { year: 2023, value: 3024 },
        { year: 2024, value: 3277 },
        { year: 2025, value: 3191 }
      ]
    }
  }
});

/** Adds one year to every series so chart labels stay aligned. */
export function addNextYearDataset(): void {
  const { countries } = store;
  const nextYear =
    Math.max(0, ...Object.values(countries).map((c) => c.data.at(-1)?.year ?? 0)) + 1;

  for (const key of Object.keys(countries) as Country[]) {
    const country = countries[key];
    countries[key] = {
      ...country,
      data: [...country.data, { year: nextYear, value: Math.floor(Math.random() * 5001) }]
    };
  }
}

export default store;
