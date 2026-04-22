import type { UserType } from '@/pages/jotai/jotai.types';

import { EditFilled } from '@ant-design/icons';
import { Avatar, Button, Card, Space, Typography } from 'antd';

import styles from '@/pages/jotai/components/user-tiles/components/user-tile/user-tile.module.css';

interface UserTileProps {
  user: UserType;
  onSelect: (user: UserType) => void;
}

const titleFromName = (name: string) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || '?';

const { Text } = Typography;

const UserTile = ({ user, onSelect }: UserTileProps) => (
  <Card
    className={styles.card}
    extra={
      <Button
        aria-label={`Edit ${user.name}`}
        icon={<EditFilled />}
        size="small"
        type="primary"
        onClick={() => onSelect(user)}
      />
    }
    size="small"
    title={
      <Space align="start" className={styles.titleRow} size="small" wrap>
        <Avatar size="medium">{titleFromName(user.name)}</Avatar>
        <Text className={styles.titleName} strong>
          {user.name}
        </Text>
      </Space>
    }
  >
    <div className={styles.body}>
      <div className={styles.field}>
        <Text className={styles.label}>Age</Text>
        <Text className={`${styles.value} ${styles.valueMono}`}>{user.age}</Text>
      </div>
      <div className={styles.field}>
        <Text className={styles.label}>Email</Text>
        <Text className={styles.value}>{user.email}</Text>
      </div>
      <div className={styles.field}>
        <Text className={styles.label}>Penalty</Text>
        <Text className={`${styles.value} ${styles.valueMono}`}>
          {user.penalty.toLocaleString()}
        </Text>
      </div>
    </div>
  </Card>
);

export default UserTile;
