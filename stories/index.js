import React from 'react';
import { storiesOf } from '@storybook/react';
import { ValidationField, createForm } from '../src';

const rules = {
  name: {
    validator: name => name,
    message: '用户名不能为空',
  },
  password: {
    validator: password => password,
    message: '密码不能为空',
  },
};

class LoginForm extends React.PureComponent {
  render() {
    const { submit, isValid } = this.props;
    return (
      <React.Fragment>
        <ValidationField name="name">
          <input placeholder="Username" />
        </ValidationField>
        <ValidationField name="password">
          <input placeholder="Password" />
        </ValidationField>
        <button
          style={{
            flex: '0 0 auto',
            marginRight: '20px',
          }}
          disabled={!isValid}
          type="primary"
          onClick={submit(
            data => console.log(data),
            error => console.log(error),
          )}>
          登陆
        </button>
      </React.Fragment>
    );
  }
}

const Demo = createForm({}, rules)(LoginForm);
storiesOf('Form 表单', module).add('基本', () => <Demo />);
