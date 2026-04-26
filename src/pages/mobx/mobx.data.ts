import { TaskStatus } from './mobx.types';
import type { TaskType } from './mobx.types';

export const initialTasks: TaskType[] = [
  {
    id: '1',
    title: 'Set up MobX store',
    description: 'Create BoardStore with observable columns and cards.',
    tags: ['setup', 'mobx'],
    assignee: 'John Doe',
    status: TaskStatus.TODO
  },
  {
    id: '2',
    title: 'Design board layout',
    description: 'Sketch column structure and responsive grid for the kanban board.',
    tags: ['design', 'ui'],
    assignee: 'Alice Smith',
    status: TaskStatus.IN_PROGRESS
  },
  {
    id: '3',
    title: 'Implement drag and drop',
    description: 'Allow tasks to be reordered between columns with smooth animations.',
    tags: ['feature', 'dnd'],
    assignee: 'Bob Johnson',
    status: TaskStatus.IN_PROGRESS
  },
  {
    id: '4',
    title: 'Add task filtering',
    description: 'Support filtering tasks by tag, assignee, and status.',
    tags: ['feature', 'search'],
    assignee: 'Maria Garcia',
    status: TaskStatus.TODO
  },
  {
    id: '5',
    title: 'Write unit tests',
    description: 'Cover BoardStore actions and computed values with Vitest.',
    tags: ['testing'],
    assignee: 'Liam Chen',
    status: TaskStatus.DONE
  }
];
