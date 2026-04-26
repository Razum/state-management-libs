import jotaiImage from '@/assets/images/jotai.png';
import mobxImage from '@/assets/images/mobx.png';
import zustandImage from '@/assets/images/zustand.png';
import LinkCard from '@/pages/home/components/link-card';
import { Col, Row, Typography } from 'antd';

import styles from '@/pages/home/home.module.css';

const { Text, Title } = Typography;

const Home = () => (
  <div>
    <header className={styles.hero}>
      <Title level={1}>State management playground</Title>
      <Text className={styles.subtitle} type="secondary">
        Demos and experiments with popular JS state libraries, TanStack tools, and Ant Design. Pick
        a track to see patterns side by side.
      </Text>
    </header>

    <Row className={styles.row} gutter={[16, 16]}>
      <Col lg={8} sm={12} xs={24}>
        <LinkCard
          description="MobX-style observables and actions. Placeholder route until a demo is added."
          href="/mobx"
          image={mobxImage}
          status="implemented"
          title="MobX"
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <LinkCard
          description="A tiny, flexible store with a cart and product grid — great for app-wide state."
          href="/zustand"
          image={zustandImage}
          status="implemented"
          title="Zustand"
        />
      </Col>
      <Col lg={8} sm={12} xs={24}>
        <LinkCard
          description="Bottom-up state with Jotai atoms, forms, and list vs. tile views in one page."
          href="/jotai"
          image={jotaiImage}
          status="implemented"
          title="Jotai"
        />
      </Col>
    </Row>
  </div>
);

export default Home;
