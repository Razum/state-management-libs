import jotaiImage from '@/assets/images/jotai.png';
import mobxImage from '@/assets/images/mobx.png';
import zustandImage from '@/assets/images/zustand.png';
import LinkCard from '@/pages/home/components/link-card';
import { Col, Row } from 'antd';

const Home = () => (
  <Row gutter={16}>
    <Col xs={24} sm={12} lg={6}>
      <LinkCard title="MobX" image={mobxImage} href="/mobx" />
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <LinkCard title="Zustand" image={zustandImage} href="/zustand" />
    </Col>
    <Col xs={24} sm={12} lg={6}>
      <LinkCard title="Jotai" image={jotaiImage} href="/jotai" />
    </Col>
  </Row>
);

export default Home;
