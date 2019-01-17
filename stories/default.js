import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { ValidationField, createForm } from '../src';

const rules = {
  name: [
    {
      validator: name => name,
      message: 'Required',
    },
  ],
  password: {
    validator: password =>
      new Promise((res, rej) => {
        setTimeout(() => {
          if (password) {
            res(password);
          } else {
            rej(password);
          }
        }, 1000 * Math.random());
      }),
    message: 'Required',
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
