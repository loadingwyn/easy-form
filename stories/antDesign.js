import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.css';
import { ValidationField, createForm } from '../src';

const FormItem = Form.Item;

const rules = {
  name: {
    validator: name =>
      new Promise((res, rej) => {
        setTimeout(() => {
          if (name) {
            res(name);
          } else {
            rej(name);
          }
        }, 200);
      }),
    message: '用户名不能为空',
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
    submit(data => console.log(data), error => console.log(error))();
  };
  render() {
    const { isValid, submitting, initialize } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <ValidationField name="name" label="用户名" validateTrigger="onBlur">
          <Input placeholder="Username" />
        </ValidationField>
        <ValidationField name="password" label="密码" validateTrigger="onBlur">
          <Input placeholder="Password" type="password" />
        </ValidationField>
        <FormItem wrapperCol={{ span: 12, offset: 5 }}>
          <Button
            htmlType="submit"
            color="primary"
            style={{
              flex: '0 0 auto',
              marginRight: '20px',
            }}
            disabled={!isValid || submitting}>
            登录
          </Button>
          <Button
            onClick={() => initialize()}
            color="primary"
            style={{
            marginLeft: '10px',
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
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 },
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
storiesOf('Form 扩展', module).add('with antd', () => <Demo />);
