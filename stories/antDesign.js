import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { Form, Input, Button, Card } from 'antd';
import 'antd/dist/antd.css';
import { ValidationField, createForm } from '../src';

const FormItem = Form.Item;

const rules = {
  name: [
    {
      validator: name => name,
      message: 'Required',
    },
  ],
  password: {
    validator(password) {
      return new Promise((res, rej) => {
        setTimeout(() => {
          if (password) {
            res();
          } else {
            rej();
          }
        }, 500);
      });
    },
    message: 'Required',
  },
};

const headerStyle = {
  textAlign: 'center',
  fontSize: 22,
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
      <Card style={{ width: 400, margin: 40 }}>
        <form onSubmit={this.handleSubmit}>
          <h1 style={headerStyle}>Easy Form</h1>
          <ValidationField
            name="name"
            label=""
            // validateTrigger="onBlur"
            onValidate={action('validate')}>
            <Input placeholder="Username" />
          </ValidationField>
          <ValidationField name="password" label="" validateTrigger="onBlur">
            <Input placeholder="Password" type="password" />
          </ValidationField>
          <FormItem wrapperCol={{ span: 18, offset: 3 }}>
            <Button
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
              style={{
                width: '100%',
              }}
              disabled={!isValid || isSubmitting}>
              Log In
            </Button>
          </FormItem>
          <div style={{ textAlign: 'center', marginTop: -16 }}>
            <button
              type="button"
              onClick={initialize}
              style={{
                color: '#1890ff',
                background: 'transparent',
                outline: 'none',
                cursor: 'pointer',
                padding: 0,
                border: 'none',
              }}>
              reset
            </button>
            ・<a href="/">register now!</a>
          </div>
        </form>
      </Card>
    );
  }
}

const formItemLayout = {
  labelCol: {
    sm: { span: 4 },
    xs: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 18, offset: 3 },
    sm: { span: 18, offset: 3 },
  },
};

function fieldRender({ children, id, error, status, label, dataBindProps }) {
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
