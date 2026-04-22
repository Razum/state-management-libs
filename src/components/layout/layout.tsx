import { Outlet, Link } from '@tanstack/react-router';
import { App, Layout as AntdLayout } from 'antd';

import styles from '@/components/layout/layout.module.css';

const { Header, Content, Footer } = AntdLayout;

export const Layout = () => (
  <App>
    <AntdLayout className={styles.layout}>
      <Header className={styles.header}>
        <Link to="/">State Management Playground</Link>
      </Header>

      <Content className={styles.content}>
        <Outlet />
      </Content>

      <Footer className={styles.footer}>
        <p>© 2025 State Management Playground. All rights reserved.</p>
      </Footer>
    </AntdLayout>
  </App>
);

export default Layout;
