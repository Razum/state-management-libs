import type { UserDataType, UserType } from '@/pages/jotai/jotai.types';

import {
  handleJotaiFormEvent,
  useJotaiUserForm,
  UserFormFields,
  UserFormFooter
} from '@/pages/jotai/components/user-form';
import { selectedUserAtom, userDrawerAtom, usersManagerAtom } from '@/pages/jotai/jotai.store';
import { Drawer } from 'antd';
import { useAtom } from 'jotai';

const UserFormWithDrawer = ({
  onClose,
  onSubmit,
  user
}: {
  onClose: () => void;
  onSubmit: (data: UserDataType, userId?: string) => void;
  user?: UserType;
}) => {
  const { form, formId } = useJotaiUserForm({ onSubmit, user });
  return (
    <Drawer
      closable={{ 'aria-label': 'Close drawer' }}
      destroyOnClose
      footer={<UserFormFooter form={form} formId={formId} />}
      onClose={onClose}
      open
      size="large"
      title={user ? 'Edit user' : 'Add user'}
    >
      <form id={formId} noValidate onSubmit={(e) => handleJotaiFormEvent(form, e)}>
        <UserFormFields form={form} />
      </form>
    </Drawer>
  );
};

const UserDrawer = () => {
  const [isUserDrawerOpen, setIsUserDrawerOpen] = useAtom(userDrawerAtom);
  const [selectedUser, setSelectedUser] = useAtom(selectedUserAtom);
  const [, manageUser] = useAtom(usersManagerAtom);
  const handleClose = () => {
    setIsUserDrawerOpen(false);
    setSelectedUser(undefined);
  };

  const handleSubmit = (data: UserDataType, userId?: string) => {
    if (userId) {
      manageUser({ ...data, id: userId });
    } else {
      manageUser(data);
    }
    handleClose();
  };

  return isUserDrawerOpen ? (
    <UserFormWithDrawer
      key={selectedUser?.id ?? 'add'}
      onClose={handleClose}
      onSubmit={handleSubmit}
      user={selectedUser}
    />
  ) : null;
};

export default UserDrawer;
