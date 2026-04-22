import type { UserDataType, UserType } from '@/pages/jotai/jotai.types';

import schema from '@/pages/jotai/components/user-form/user-form.schema';
import { useForm } from '@tanstack/react-form';
import { Button, Flex, Form, Input, InputNumber, Slider } from 'antd';

import styles from '@/pages/jotai/components/user-form/user-from.module.css';

interface UserFormProps {
  onSubmit: (data: UserDataType, userId?: string) => void;
  user?: UserType;
}

const UserForm = ({ onSubmit, user }: UserFormProps) => {
  const form = useForm({
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      age: user?.age ?? 0,
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
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    form.handleSubmit();
  };

  return (
    <form onSubmit={handleFormSubmit} noValidate>
      <Flex vertical gap="middle">
        <form.Field name="name">
          {(field) => (
            <Form.Item
              layout="vertical"
              label="Name"
              required
              help={field.state.meta.errors.at(0)?.message}
              validateStatus={field.state.meta.errors?.length > 0 ? 'error' : ''}
            >
              <Input
                placeholder="Enter name"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </Form.Item>
          )}
        </form.Field>
        <form.Field name="age">
          {(field) => (
            <Form.Item
              layout="vertical"
              label="Age"
              required
              validateStatus={field.state.meta.errors?.length > 0 ? 'error' : ''}
            >
              <InputNumber
                className={styles.numberInput}
                min={0}
                max={100}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(value) => field.handleChange(value ?? 0)}
              />
            </Form.Item>
          )}
        </form.Field>
        <form.Field name="email">
          {(field) => (
            <Form.Item
              layout="vertical"
              label="Email"
              required
              help={field.state.meta.errors.at(0)?.message}
              validateStatus={field.state.meta.errors?.length > 0 ? 'error' : ''}
            >
              <Input
                placeholder="Enter email"
                value={field.state.value}
                onBlur={field.handleBlur}
                type="email"
                onChange={(event) => field.handleChange(event.target.value)}
              />
            </Form.Item>
          )}
        </form.Field>
        <form.Field name="penalty">
          {(field) => (
            <Form.Item layout="vertical" label="Penalty">
              <Slider
                min={0}
                max={2000}
                value={field.state.value}
                onChange={(value) => field.handleChange(value ?? 0)}
              />
            </Form.Item>
          )}
        </form.Field>
        <Flex justify="space-between">
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting, state.isDirty]}
            children={([canSubmit, isSubmitting, isDirty]) => (
              <>
                <Button
                  color="primary"
                  variant="outlined"
                  htmlType="reset"
                  onClick={() => form.reset()}
                >
                  Reset
                </Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={!canSubmit || isSubmitting || !isDirty}
                >
                  Submit
                </Button>
              </>
            )}
          />
        </Flex>
      </Flex>
    </form>
  );
};

export default UserForm;
