export enum TaskStatus {
  TODO = 'todo',
  IN_PROGRESS = 'in_progress',
  DONE = 'done'
}

export type TaskType = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  assignee: string;
  status: TaskStatus;
};

export type TaskDataType = Omit<TaskType, 'id'>;
