# Easy Form

> Easy Form is a React HOC that allow you to build forms easily and flexibly.


## Example

![Material-UI](demo/materialui.gif)
![Ant Design](demo/antdesign.gif)


## Features

* easy: manage form state conveniently
* flexible: create awesome form easily with Material-UI, Ant-Design, Redux or any library you like.
* powerful: support sync/async validation both.
* tiny: only 19.7kb ungzipped.

## Get Started

1. Run `yarn add easy-form`

2. Render it!

```js
import React from 'react';
import { ValidationField, createForm } from '../src';

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
    message: 'Please input your username',
  },
  password: {
    validator: password => password,
    message: 'Please input your password',
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

export default createForm({}, rules)(LoginForm);
```

## Apis

`todo`
