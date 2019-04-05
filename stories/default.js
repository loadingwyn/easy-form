import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ValidationField, createForm } from '../src';

const rules = {
  name: [
    {
      validator: name => name,
      message: '用户名不能为空',
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
    message: '密码不能为空',
  },
};

class LoginForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(action('submit-success'), action('submit-fail'))();
  };

  render() {
    const { isValid } = this.props;
    return (
      <form onSubmit={this.handleSubmit} style={{ marginTop: 40 }}>
        <ValidationField name="name" label="Username">
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
