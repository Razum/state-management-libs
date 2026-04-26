import type { TaskType } from '@/pages/mobx/mobx.types';
import type { MenuProps } from 'antd';

import { DeleteOutlined, EditOutlined, MoreOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Dropdown, Flex, Tag, Typography } from 'antd';

import styles from '@/pages/mobx/components/task-card/task-card.module.css';

const { Text } = Typography;

type TaskCardProps = {
  onDelete?: () => void;
  onEdit?: () => void;
  task: TaskType;
};

const TaskCard = ({ onDelete, onEdit, task }: TaskCardProps) => {
  const menu: MenuProps = {
    items: [
      {
        icon: <EditOutlined />,
        key: 'edit',
        label: 'Edit'
      },
      {
        danger: true,
        icon: <DeleteOutlined />,
        key: 'delete',
        label: 'Delete'
      }
    ],
    onClick: ({ key }) => {
      if (key === 'edit') {
        onEdit?.();
      }
      if (key === 'delete') {
        onDelete?.();
      }
    }
  };

  return (
    <Card className={styles.card} size="small">
      <Flex vertical gap={8}>
        <Flex align="flex-start" gap={8} justify="space-between" wrap="wrap">
          <Text strong className={styles.title}>
            {task.title}
          </Text>
          <Dropdown menu={menu} trigger={['click']}>
            <Button
              aria-haspopup="menu"
              aria-label="Task actions"
              className={styles.menuTrigger}
              icon={<MoreOutlined />}
              size="small"
              type="text"
            />
          </Dropdown>
        </Flex>
        <Text type="secondary">{task.description}</Text>
        <div className={styles.footer}>
          {task.tags.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
          <Avatar className={styles.avatar} size="small">
            {task.assignee.slice(0, 2)}
          </Avatar>
        </div>
      </Flex>
    </Card>
  );
};

export default TaskCard;
