import type { ReactNode } from 'react';

import { Card, Flex, Typography } from 'antd';

import styles from '@/pages/mobx/components/column/column.module.css';

interface ColumnProps {
  children?: ReactNode;
  count: number;
  title: string;
}

const { Text } = Typography;

const Column = ({ children, count, title }: ColumnProps) => (
  <Card
    title={
      <Flex align="center" justify="space-between">
        <Text strong>{title}</Text>
        <Text type="secondary">{count}</Text>
      </Flex>
    }
  >
    <div className={styles.body}>{children}</div>
  </Card>
);

export default Column;
