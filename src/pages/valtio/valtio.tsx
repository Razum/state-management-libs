import { Flex, Typography } from 'antd';

import styles from '@/pages/valtio/valtio.module.css';

const { Paragraph, Title } = Typography;

const ValtioPage = () => (
  <Flex className={styles.page} vertical gap="middle">
    <Title level={2} style={{ margin: 0 }}>
      Valtio
    </Title>
    <Paragraph className={styles.message} type="secondary">
      Placeholder page. The Valtio demo will be added when the app idea is defined.
    </Paragraph>
  </Flex>
);

export default ValtioPage;
