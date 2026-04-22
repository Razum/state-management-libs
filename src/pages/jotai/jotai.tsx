import type { UserType } from '@/pages/jotai/jotai.types';

import { useCallback } from 'react';

import UserDrawer from '@/pages/jotai/components/user-drawer';
import UserSearch from '@/pages/jotai/components/user-search';
import UserTable from '@/pages/jotai/components/user-table';
import UserTiles from '@/pages/jotai/components/user-tiles';
import {
  selectedUserAtom,
  userDrawerAtom,
  usersManagerAtom,
  viewAtom
} from '@/pages/jotai/jotai.store';
import { AppstoreOutlined, BarsOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Segmented } from 'antd';
import { useAtom } from 'jotai';

import styles from '@/pages/jotai/jotai.module.css';

const JotaiPage = () => {
  const [users] = useAtom(usersManagerAtom);
  const [view, setView] = useAtom(viewAtom);
  const [, setIsUserDrawerOpen] = useAtom(userDrawerAtom);
  const [, setSelectedUser] = useAtom(selectedUserAtom);
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
      <Flex vertical gap="middle">
        <Flex gap="middle" justify="space-between">
          <UserSearch className={styles.searchInput} />
          <Button
            className={styles.addUserButton}
            icon={<PlusOutlined />}
            type="primary"
            size="middle"
            onClick={handleAddUser}
          >
            Add User
          </Button>
          <Segmented
            size="middle"
            value={view}
            defaultValue={view}
            onChange={setView}
            options={[
              { value: 'list', icon: <BarsOutlined /> },
              { value: 'tiles', icon: <AppstoreOutlined /> }
            ]}
          />
        </Flex>
        {view === 'list' && <UserTable dataSource={users} onSelect={handleSelect} />}
        {view === 'tiles' && <UserTiles dataSource={users} onSelect={handleSelect} />}
      </Flex>
      <UserDrawer />
    </>
  );
};

export default JotaiPage;
