import {
  AppstoreOutlined,
  ExperimentOutlined,
  HomeOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { Link, Outlet, useRouterState } from '@tanstack/react-router';
import { App, Layout as AntdLayout, Menu, Typography } from 'antd';

import styles from '@/components/layout/layout.module.css';

const { Header, Content, Footer } = AntdLayout;

const getSelectedNavKey = (pathname: string) => {
  if (pathname === '/') {
    return '/';
  }
  const first = pathname.split('/').find(Boolean);
  return first ? `/${first}` : '/';
};

export const Layout = () => {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const selectedKey = getSelectedNavKey(pathname);

  return (
    <App>
      <AntdLayout className={styles.layout}>
        <Header className={styles.header}>
          <div className={styles.headerInner}>
            <Link className={styles.brand} to="/">
              <span aria-hidden className={styles.logo}>
                SP
              </span>
              <Typography.Text className={styles.brandText} strong>
                State Playground
              </Typography.Text>
            </Link>
            <Menu
              className={styles.nav}
              items={[
                {
                  icon: <HomeOutlined />,
                  key: '/',
                  label: <Link to="/">Home</Link>
                },
                {
                  icon: <ExperimentOutlined />,
                  key: '/jotai',
                  label: <Link to="/jotai">Jotai</Link>
                },
                {
                  icon: <ShoppingOutlined />,
                  key: '/zustand',
                  label: <Link to="/zustand">Zustand</Link>
                },
                {
                  icon: <AppstoreOutlined />,
                  key: '/mobx',
                  label: <Link to="/mobx">MobX</Link>
                },
                {
                  icon: <AppstoreOutlined />,
                  key: '/valtio',
                  label: <Link to="/valtio">Valtio</Link>
                }
              ]}
              mode="horizontal"
              selectedKeys={[selectedKey]}
            />
          </div>
        </Header>

        <Content className={styles.content}>
          <Outlet />
        </Content>

        <Footer className={styles.footer}>
          <Typography.Text className={styles.footerText} type="secondary">
            © 2025 State Management Playground
          </Typography.Text>
        </Footer>
      </AntdLayout>
    </App>
  );
};

export default Layout;
