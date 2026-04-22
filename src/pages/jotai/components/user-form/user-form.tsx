import type { UserDataType, UserType } from '@/pages/jotai/jotai.types';

import type { FormEvent } from 'react';

import schema from '@/pages/jotai/components/user-form/user-form.schema';
import { useForm } from '@tanstack/react-form';
import { Button, Flex, Form, Input, InputNumber, Slider, Typography } from 'antd';

import styles from '@/pages/jotai/components/user-form/user-form.module.css';

const DEFAULT_FORM_ID = 'jotai-user-form';
const { Text } = Typography;

type JotaiUserFormOptions = {
  formId?: string;
  onSubmit: (data: UserDataType, userId?: string) => void;
  user?: UserType;
};

export function useJotaiUserForm({
  formId = DEFAULT_FORM_ID,
  onSubmit,
  user
}: JotaiUserFormOptions) {
  const form = useForm({
    defaultValues: {
      age: user?.age ?? 0,
      email: user?.email ?? '',
      name: user?.name ?? '',
      penalty: user?.penalty ?? 0
    } satisfies UserDataType,
    validators: {
      onChange: schema
    },
    onSubmit: ({ value }) => {
      onSubmit(value, user?.id);
      form.reset();
    }
  });

  return { form, formId } as const;
}

type JotaiForm = ReturnType<typeof useJotaiUserForm>['form'];

export function UserFormFields({ form }: { form: JotaiForm }) {
  return (
    <Flex vertical gap="middle">
      <form.Field name="name">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Name"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Input
              id={field.name}
              placeholder="Full name"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </Form.Item>
        )}
      </form.Field>
      <form.Field name="age">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Age"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <InputNumber
              className={styles.numberInput}
              id={field.name}
              max={100}
              min={0}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(v) => field.handleChange(v ?? 0)}
            />
          </Form.Item>
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <Form.Item
            help={field.state.meta.errors.at(0)?.message}
            label="Email"
            layout="vertical"
            required
            validateStatus={field.state.meta.errors.length > 0 ? 'error' : undefined}
          >
            <Input
              id={field.name}
              placeholder="name@example.com"
              type="email"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          </Form.Item>
        )}
      </form.Field>
      <form.Field name="penalty">
        {(field) => (
          <Form.Item
            className={styles.penaltyItem}
            label="Penalty points"
            layout="vertical"
            tooltip="Used for the demo. Range 0–2000."
          >
            <Flex vertical className={styles.penaltyBlock} gap="small">
              <div className={styles.penaltyValueRow}>
                <Text type="secondary">Current</Text>
                <Text strong>
                  {field.state.value} <span className={styles.muted}>/ 2000</span>
                </Text>
              </div>
              <Slider
                max={2000}
                min={0}
                value={field.state.value}
                onChange={(v) => field.handleChange(v as number)}
              />
              <InputNumber
                addonAfter="pts"
                className={styles.penaltyInput}
                id={`${field.name}-number`}
                max={2000}
                min={0}
                value={field.state.value}
                onChange={(v) => field.handleChange(v ?? 0)}
              />
            </Flex>
          </Form.Item>
        )}
      </form.Field>
    </Flex>
  );
}

export function UserFormFooter({ form, formId }: { form: JotaiForm; formId: string }) {
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
            Submit
          </Button>
        </Flex>
      )}
    </form.Subscribe>
  );
}

export const jotaiFormIdDefault = DEFAULT_FORM_ID;

export function handleJotaiFormEvent(form: JotaiForm, event: FormEvent) {
  event.preventDefault();
  void form.handleSubmit();
}
