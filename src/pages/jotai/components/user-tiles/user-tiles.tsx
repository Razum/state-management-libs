import type { UserType } from '@/pages/jotai/jotai.types';

import { Flex } from 'antd';

import UserTile from './components/user-tile';

interface UserTilesProps {
  dataSource: UserType[];
  onSelect: (user: UserType) => void;
}

const UserTiles = ({ dataSource, onSelect }: UserTilesProps) => (
  <Flex vertical gap="middle">
    {dataSource.map((user) => (
      <UserTile key={user.id} user={user} onSelect={onSelect} />
    ))}
  </Flex>
);

export default UserTiles;
