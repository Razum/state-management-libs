import type { UserType } from '@/pages/jotai/jotai.types';

import { EditFilled } from '@ant-design/icons';
import { Button, Card, Descriptions } from 'antd';

interface UserTileProps {
  user: UserType;
  onSelect: (user: UserType) => void;
}

const UserTile = ({ user, onSelect }: UserTileProps) => (
  <Card>
    <Descriptions
      title={user.name}
      extra={<Button type="primary" icon={<EditFilled />} onClick={() => onSelect(user)} />}
    >
      <Descriptions.Item label="Age">{user.age}</Descriptions.Item>
      <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
    </Descriptions>
  </Card>
);

export default UserTile;
