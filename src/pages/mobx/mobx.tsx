import type { TaskDataType, TaskType } from '@/pages/mobx/mobx.types';

import { useState } from 'react';

import Board from '@/pages/mobx/components/board';
import TaskDrawer from '@/pages/mobx/components/task-drawer';
import tasksStore from '@/pages/mobx/mobx.store';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Flex, Typography } from 'antd';
import { observer } from 'mobx-react-lite';

import styles from '@/pages/mobx/mobx.module.css';

const { Text, Title } = Typography;

const MobXPage = observer(() => {
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);

  const handleCreate = () => {
    setEditingTask(null);
    setIsTaskDrawerOpen(true);
  };

  const handleEditTask = (task: TaskType) => {
    setEditingTask(task);
    setIsTaskDrawerOpen(true);
  };

  const handleClose = () => {
    setIsTaskDrawerOpen(false);
    setEditingTask(null);
  };

  const handleSubmit = (data: TaskDataType) => {
    if (editingTask) {
      tasksStore.updateTask({ ...data, id: editingTask.id });
    } else {
      tasksStore.addTask(data);
    }
    handleClose();
  };

  return (
    <Flex className={styles.page} vertical gap="large">
      <div className={styles.header}>
        <Flex align="center" justify="space-between" gap="middle">
          <Title level={2} style={{ margin: 0 }}>
            Kanban board
          </Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            Create
          </Button>
        </Flex>
        <Text type="secondary">
          Static Ant Design layout for a future MobX demo with observable columns and task cards.
        </Text>
      </div>
      <Board onEditTask={handleEditTask} tasks={tasksStore.tasks} />
      <TaskDrawer
        key={editingTask?.id ?? 'create'}
        editingTask={editingTask}
        onClose={handleClose}
        onSubmit={handleSubmit}
        open={isTaskDrawerOpen}
      />
    </Flex>
  );
});

export default MobXPage;
