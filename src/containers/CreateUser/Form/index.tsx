import React from 'react';
import { Control, FieldErrors, Controller } from 'react-hook-form';

import { Form, Input, Button, Row, Col } from 'antd';

import { CreateUserDTO } from 'models';

const { Item } = Form;

interface Props {
  errors: FieldErrors;
  control: Control<CreateUserDTO>;
  onSubmit: () => void;
}

const UserForm: React.FC<Props> = ({ errors, control, onSubmit }) => {
  return (
    <Form layout={'vertical'}>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <Item
                label={'First Name'}
                validateStatus={errors.firstName && 'error'}
                help={errors.firstName?.message as React.ReactNode}
                required
              >
                <Input {...field} placeholder={'Степан'} autoComplete={'off'} allowClear />
              </Item>
            )}
          />
        </Col>

        <Col span={12}>
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <Item
                label={'Last Name'}
                validateStatus={errors.lastName && 'error'}
                help={errors.lastName?.message as React.ReactNode}
                required
              >
                <Input {...field} placeholder={'Пантера'} autoComplete={'off'} allowClear />
              </Item>
            )}
          />
        </Col>
      </Row>

      <Button type="primary" onClick={onSubmit}>
        Create User
      </Button>
    </Form>
  );
};

export default UserForm;
