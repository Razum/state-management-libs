import type { TaskType } from '@/pages/mobx/mobx.types';

import Column from '@/pages/mobx/components/column/column';
import TaskCard from '@/pages/mobx/components/task-card/task-card';
import tasksStore from '@/pages/mobx/mobx.store';
import { TaskStatus } from '@/pages/mobx/mobx.types';
import { observer } from 'mobx-react-lite';

import styles from '@/pages/mobx/components/board/board.module.css';

type BoardProps = {
  onEditTask: (task: TaskType) => void;
  tasks: TaskType[];
};

const Board = observer(({ onEditTask, tasks }: BoardProps) => {
  const grouped = Object.groupBy(tasks, (task) => task.status);
  const todo = grouped[TaskStatus.TODO];
  const inProgress = grouped[TaskStatus.IN_PROGRESS];
  const done = grouped[TaskStatus.DONE];

  return (
    <div className={styles.board}>
      <Column count={todo?.length ?? 0} title="To do">
        {todo?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => tasksStore.removeTask(task.id)}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </Column>
      <Column count={inProgress?.length ?? 0} title="In progress">
        {inProgress?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => tasksStore.removeTask(task.id)}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </Column>
      <Column count={done?.length ?? 0} title="Done">
        {done?.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => tasksStore.removeTask(task.id)}
            onEdit={() => onEditTask(task)}
          />
        ))}
      </Column>
    </div>
  );
});

export default Board;
