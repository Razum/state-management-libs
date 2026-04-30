import { Flex, Typography } from 'antd';

import styles from '@/pages/tanstack/tanstack.module.css';

const { Title } = Typography;

const TanStackPage = () => (
  <Flex className={styles.page} vertical gap="large">
    <Title level={2}>TanStack</Title>
  </Flex>
);

export default TanStackPage;
