import type { TaskDataType, TaskType } from '@/pages/mobx/mobx.types';

import {
  handleMobxFormEvent,
  TaskFormFields,
  TaskFormFooter,
  useMobxTaskForm
} from '@/pages/mobx/components/task-drawer/components/task-form';
import { Drawer } from 'antd';

type TaskDrawerProps = {
  editingTask: TaskType | null;
  onClose: () => void;
  onSubmit: (data: TaskDataType) => void;
  open: boolean;
};

const TaskDrawer = ({ editingTask, onClose, onSubmit, open }: TaskDrawerProps) => {
  const initialValues: TaskDataType | undefined = editingTask
    ? {
        assignee: editingTask.assignee,
        description: editingTask.description,
        status: editingTask.status,
        tags: editingTask.tags,
        title: editingTask.title
      }
    : undefined;

  const { form, formId } = useMobxTaskForm({ initialValues, onSubmit });
  const isEdit = Boolean(editingTask);

  return (
    <Drawer
      closable={{ 'aria-label': 'Close drawer' }}
      destroyOnClose
      footer={
        <TaskFormFooter
          form={form}
          formId={formId}
          submitLabel={isEdit ? 'Save changes' : 'Create task'}
        />
      }
      onClose={onClose}
      open={open}
      size="large"
      title={isEdit ? 'Edit task' : 'Create task'}
    >
      <form id={formId} noValidate onSubmit={(event) => handleMobxFormEvent(form, event)}>
        <TaskFormFields form={form} />
      </form>
    </Drawer>
  );
};

export default TaskDrawer;
