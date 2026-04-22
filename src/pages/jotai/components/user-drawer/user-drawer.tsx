import type { UserDataType } from '@/pages/jotai/jotai.types';

import UserForm from '@/pages/jotai/components/user-form';
import { selectedUserAtom, userDrawerAtom, usersManagerAtom } from '@/pages/jotai/jotai.store';
import { Drawer } from 'antd';
import { useAtom } from 'jotai';

const UserDrawer = () => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useAtom(userDrawerAtom);
  const [selectedUser] = useAtom(selectedUserAtom);
  const [, manageUser] = useAtom(usersManagerAtom);
  const handleClose = () => {
    setIsUserDrawerOpen(false);
  };

  const handleSubmit = (data: UserDataType, userId?: string) => {
    if (userId) {
      manageUser({ ...data, id: userId });
    } else {
      manageUser(data);
    }
    handleClose();
  };

  return (
    <Drawer
      title="Basic Drawer"
      closable={{ 'aria-label': 'Close Button' }}
      onClose={handleClose}
      open={isUserDrawerOpen}
      size="large"
    >
      <UserForm onSubmit={handleSubmit} user={selectedUser} />
    </Drawer>
  );
};

export default UserDrawer;
