import React from 'react';
import { storiesOf } from '@storybook/react';
import { ValidationField, createForm } from '../src';

const rules = {
  name: {
    validator: name => new Promise((res, rej) => {
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

class LoginForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(data => console.log(data), error => console.log(error))();
  };

  render() {
    const { isValid } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <ValidationField
          name="name"
          label="Username"
          onValidate={(...params) => console.log(...params)}>
          <input placeholder="Username" />
        </ValidationField>
        <ValidationField name="password" label="Password">
          <input placeholder="Password" />
        </ValidationField>
        <button
          style={{
            display: 'inline-block',
            marginLeft: 180,
          }}
          disabled={!isValid}
          type="submit">
          Login
        </button>
      </form>
    );
  }
}

const Demo = createForm({}, rules)(LoginForm);
storiesOf('Default', module).add('login', () => <Demo />);
