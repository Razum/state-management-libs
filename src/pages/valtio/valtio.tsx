import ValtioChart from '@/pages/valtio/components/chart';
import { useValtioDataset, useValtioStats } from '@/pages/valtio/valtio.hooks';
import store, { addNextYearDataset } from '@/pages/valtio/valtio.store';
import { Button, Card, Col, Flex, Row, Select, Statistic, Typography } from 'antd';
import { useSnapshot } from 'valtio/react';

const { Title } = Typography;

const countryOptions = [
  { label: 'All', value: 'all' },
  { label: 'Australia', value: 'australia' },
  { label: 'Germany', value: 'germany' },
  { label: 'Japan', value: 'japan' }
];

const ValtioPage = () => {
  const { selected, countries } = useSnapshot(store);
  const { chartInput, chartTitle, visibleCountries } = useValtioDataset({
    countries,
    selected
  });
  const stats = useValtioStats(visibleCountries);

  return (
    <Flex vertical gap="large">
      <Title level={2} style={{ margin: 0 }}>
        Valtio
      </Title>
      <Flex align="center" gap="middle" justify="space-between" wrap="wrap">
        <Select
          aria-label="Select country"
          onChange={(value) => {
            store.selected = value;
          }}
          options={countryOptions}
          style={{ minWidth: 160 }}
          value={selected}
        />
        <Button type="primary" onClick={() => addNextYearDataset()}>
          Add Dataset
        </Button>
      </Flex>

      <ValtioChart chartInput={chartInput} title={chartTitle} />

      <Row gutter={[16, 16]}>
        {stats.map((item) => (
          <Col key={item.title} lg={6} md={12} xs={24}>
            <Card>
              <Statistic title={item.title} value={item.value} />
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default ValtioPage;
