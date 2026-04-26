import type { TaskDataType } from '@/pages/mobx/mobx.types';

import type { FormEvent } from 'react';

import taskFormSchema from '@/pages/mobx/components/task-drawer/components/task-form/task-form.schema';
import { TaskStatus } from '@/pages/mobx/mobx.types';
import { useForm } from '@tanstack/react-form';
import { Button, Flex, Form, Input, Select } from 'antd';

const DEFAULT_FORM_ID = 'mobx-task-form';

const taskStatusOptions: { label: string; value: TaskStatus }[] = [
  { label: 'To do', value: TaskStatus.TODO },
  { label: 'In progress', value: TaskStatus.IN_PROGRESS },
  { label: 'Done', value: TaskStatus.DONE }
];

type MobxTaskFormOptions = {
  formId?: string;
  initialValues?: TaskDataType;
  onSubmit: (data: TaskDataType) => void;
};

export function useMobxTaskForm({
  formId = DEFAULT_FORM_ID,
  initialValues,
  onSubmit
}: MobxTaskFormOptions) {
  const defaultValues: TaskDataType = {
    assignee: initialValues?.assignee ?? '',
    description: initialValues?.description ?? '',
    status: initialValues?.status ?? TaskStatus.TODO,
    tags: initialValues?.tags ?? [],
    title: initialValues?.title ?? ''
  };

  const form = useForm({
    defaultValues,
    validators: {
      onChange: taskFormSchema
    },
    onSubmit: ({ value }) => {
      onSubmit(value);
      form.reset();
    }
  });

  return { form, formId } as const;
}

type MobxTaskForm = ReturnType<typeof useMobxTaskForm>['form'];

export function TaskFormFields({ form }: { form: MobxTaskForm }) {
  return (
    <Flex vertical gap="middle">
      <form.Field name="title">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Title"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Input
              id={field.name}
              placeholder="Task title"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </Form.Item>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Description"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Input.TextArea
              id={field.name}
              placeholder="Describe the task"
              rows={4}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </Form.Item>
        )}
      </form.Field>

      <form.Field name="assignee">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Assignee"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Input
              id={field.name}
              placeholder="Who owns this task?"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
          </Form.Item>
        )}
      </form.Field>

      <form.Field name="status">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Status"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Select
              id={field.name}
              options={taskStatusOptions}
              style={{ width: '100%' }}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(value) => field.handleChange(value)}
            />
          </Form.Item>
        )}
      </form.Field>

      <form.Field name="tags">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Tags"
            layout="vertical"
            tooltip="Press Enter after each tag."
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Select
              id={field.name}
              mode="tags"
              placeholder="Add tags"
              style={{ width: '100%' }}
              tokenSeparators={[',']}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(value) => field.handleChange(value)}
            />
          </Form.Item>
        )}
      </form.Field>
    </Flex>
  );
}

export function TaskFormFooter({
  form,
  formId,
  submitLabel = 'Create task'
}: {
  form: MobxTaskForm;
  formId: string;
  submitLabel?: string;
}) {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty] as const}
    >
      {([canSubmit, isSubmitting, isDirty]) => (
        <Flex justify="space-between" style={{ width: '100%' }} wrap="wrap" gap="small">
          <Button
            color="primary"
            disabled={!isDirty}
            htmlType="button"
            variant="outlined"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button
            disabled={!canSubmit || isSubmitting || !isDirty}
            form={formId}
            htmlType="submit"
            type="primary"
          >
            {submitLabel}
          </Button>
        </Flex>
      )}
    </form.Subscribe>
  );
}

export function handleMobxFormEvent(form: MobxTaskForm, event: FormEvent) {
  event.preventDefault();
  void form.handleSubmit();
}
