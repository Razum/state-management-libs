import type { UserType } from '@/pages/jotai/jotai.types';

import UserTile from '@/pages/jotai/components/user-tiles/components/user-tile';
import { Col, Empty, Row } from 'antd';

interface UserTilesProps {
  dataSource: UserType[];
  onSelect: (user: UserType) => void;
}

const UserTiles = ({ dataSource, onSelect }: UserTilesProps) => {
  if (dataSource.length === 0) {
    return <Empty description="No users match your search" />;
  }

  return (
    <Row gutter={[16, 16]} style={{ width: '100%' }} wrap>
      {dataSource.map((user) => (
        <Col key={user.id} lg={8} sm={12} style={{ minWidth: 0 }} xs={24}>
          <UserTile user={user} onSelect={onSelect} />
        </Col>
      ))}
    </Row>
  );
};

export default UserTiles;
