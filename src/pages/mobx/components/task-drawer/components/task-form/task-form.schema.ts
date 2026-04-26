import { TaskStatus } from '@/pages/mobx/mobx.types';
import * as v from 'valibot';

const taskStatuses = Object.values(TaskStatus);

export default v.object({
  assignee: v.pipe(v.string(), v.trim(), v.minLength(2)),
  description: v.pipe(v.string(), v.trim(), v.minLength(5)),
  status: v.picklist(taskStatuses),
  tags: v.array(v.pipe(v.string(), v.trim(), v.minLength(1))),
  title: v.pipe(v.string(), v.trim(), v.minLength(3))
});
