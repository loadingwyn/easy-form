import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { ValidationField, createForm } from '../src';

const FormItem = Form.Item;

const rules = {
  name: {
    rules: {
      validator: name => new Promise((res, rej) => {
        setTimeout(() => {
          if (name[0]) {
            res(name);
          } else {
            rej(name);
          }
        }, 1000);
      }),
      message: '用户名不能为空',
    },
    withFields: ['password'],
  },
  password: {
    validator: password => password,
    message: '密码不能为空',
  },
};

class AntdForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(action('submit-success'), action('submit-fail'))();
  };

  render() {
    const { isValid, isSubmitting, initialize } = this.props;
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <ValidationField
          name="name"
          label="用户名"
          validateTrigger="onBlur"
          onValidate={action('validate')}>
          <Input placeholder="Username" />
        </ValidationField>
        <ValidationField name="password" label="密码" validateTrigger="onBlur">
          <Input placeholder="Password" type="password" />
        </ValidationField>
        <FormItem wrapperCol={{ span: 12, offset: 2 }}>
          <Button
            loading={isSubmitting}
            htmlType="submit"
            type="primary"
            style={{
              flex: '0 0 auto',
            }}
            disabled={!isValid || isSubmitting}>
            登录
          </Button>
          <Button
            onClick={initialize}
            style={{
              marginLeft: '6px',
            }}>
            恢复
          </Button>
        </FormItem>
      </form>
    );
  }
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 2 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
};

function fieldRender({
  children, id, error, status, label, dataBindProps,
}) {
  const input = cloneElement(children, {
    id,
    ...dataBindProps,
  });
  return (
    <FormItem
      {...formItemLayout}
      label={label}
      hasFeedback
      validateStatus={status}
      help={error ? error[0] : ''}>
      {input}
    </FormItem>
  );
}
const Demo = createForm({}, rules, { fieldRender })(AntdForm);
storiesOf('Form with Antd', module).add('login', () => <Demo />);
