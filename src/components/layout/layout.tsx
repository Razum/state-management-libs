import {
  ApiOutlined,
  AppstoreOutlined,
  DownOutlined,
  DeploymentUnitOutlined,
  ExperimentOutlined,
  ShoppingOutlined
} from '@ant-design/icons';
import { Link, Outlet } from '@tanstack/react-router';
import { App, Dropdown, Layout as AntdLayout, Space, Typography } from 'antd';

import styles from '@/components/layout/layout.module.css';

const { Header, Content, Footer } = AntdLayout;

export const Layout = () => {
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
            <Dropdown
              className={styles.nav}
              menu={{
                items: [
                  {
                    icon: <ExperimentOutlined />,
                    key: 'jotai',
                    label: <Link to="/jotai">Jotai</Link>
                  },
                  {
                    icon: <ShoppingOutlined />,
                    key: 'zustand',
                    label: <Link to="/zustand">Zustand</Link>
                  },
                  {
                    icon: <AppstoreOutlined />,
                    key: 'mobx',
                    label: <Link to="/mobx">MobX</Link>
                  },
                  {
                    icon: <DeploymentUnitOutlined />,
                    key: 'valtio',
                    label: <Link to="/valtio">Valtio</Link>
                  },
                  {
                    icon: <ApiOutlined />,
                    key: 'tanstack',
                    label: <Link to="/tanstack">TanStack</Link>
                  }
                ],
                selectable: true
              }}
              trigger={['click']}
            >
              <button className={styles.dropdownTrigger} type="button">
                <Space size={6}>
                  <span>Projects</span>
                  <DownOutlined />
                </Space>
              </button>
            </Dropdown>
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
