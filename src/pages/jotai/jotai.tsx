import type { UserType, ViewType } from '@/pages/jotai/jotai.types';

import { useCallback } from 'react';

import UserDrawer from '@/pages/jotai/components/user-drawer';
import UserSearch from '@/pages/jotai/components/user-search';
import UserTable from '@/pages/jotai/components/user-table';
import UserTiles from '@/pages/jotai/components/user-tiles';
import {
  selectedUserAtom,
  userDrawerAtom,
  usersAtom,
  usersManagerAtom,
  viewAtom
} from '@/pages/jotai/jotai.store';
import { AppstoreOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Segmented, Space, Typography } from 'antd';
import { useAtom, useAtomValue } from 'jotai';

import styles from '@/pages/jotai/jotai.module.css';

const { Text, Title } = Typography;

const JotaiPage = () => {
  const [users] = useAtom(usersManagerAtom);
  const allUsers = useAtomValue(usersAtom);
  const [view, setView] = useAtom(viewAtom);
  const [, setIsUserDrawerOpen] = useAtom(userDrawerAtom);
  const [, setSelectedUser] = useAtom(selectedUserAtom);
  const totalCount = allUsers.length;

  const handleAddUser = useCallback(() => {
    setIsUserDrawerOpen(true);
  }, [setIsUserDrawerOpen]);

  const handleSelect = useCallback(
    (user: UserType) => {
      setIsUserDrawerOpen(true);
      setSelectedUser(user);
    },
    [setIsUserDrawerOpen, setSelectedUser]
  );

  return (
    <>
      <div className={styles.page}>
        <div className={styles.pageHeader}>
          <Space align="center" size="middle" wrap>
            <Title level={2} style={{ margin: 0 }}>
              Users
            </Title>
            <Text type="secondary">
              {totalCount} {totalCount === 1 ? 'user' : 'users'} total
            </Text>
          </Space>
        </div>

        <div className={styles.toolbar} role="search">
          <UserSearch allowClear className={styles.searchInput} />
          <div className={styles.toolbarActions}>
            <Button icon={<PlusOutlined />} size="middle" type="primary" onClick={handleAddUser}>
              Add user
            </Button>
            <Segmented
              aria-label="View mode"
              onChange={(value) => setView(value as ViewType)}
              options={[
                { icon: <BarsOutlined />, value: 'list' },
                { icon: <AppstoreOutlined />, value: 'tiles' }
              ]}
              size="middle"
              value={view}
            />
          </div>
        </div>

        {view === 'list' && <UserTable dataSource={users} onSelect={handleSelect} />}
        {view === 'tiles' && <UserTiles dataSource={users} onSelect={handleSelect} />}
      </div>
      <UserDrawer />
    </>
  );
};

export default JotaiPage;
