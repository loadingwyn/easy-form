# Easy Form

> Easy Form is a React HOC that allow you to build forms easily and flexibly.

## Example

![Material-UI](demo/materialui.png)

<!-- ![Ant Design](demo/antdesign.png) -->

## Features

- easy: manage form state conveniently
- flexible: create awesome form easily with Material-UI, Ant-Design, Redux or any library you like.
- powerful: support sync/async validation both.
- tiny: only 19.7kb ungzipped.

## Get Started

1.  Run `yarn add easy-form`

2.  Render it!

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

### createForm(defaultValues, defaultRules, options)

#### usage:

```js
const rules = {
  birth: {
    validator: date => (date ? true : false),
    message: 'Please input your date of birth',
  },
  description: [
    {
      validator: description => (description ? true : false),
      message: 'Please input your description',
    },
    {
      validator(date) {
        return new Promise((res, rej) => {
          setTimeout(() => {
            date === 'loading' ? res(date) : rej(date);
          }, 0);
        });
      },
      message: name => `"${name}" is not my name!`,
    },
  ],
};
const DecoratedForm = createForm(
  {
    birth: '2018-05-28',
  },
  rules,
  { fieldRender },
)(CustomizedForm);
```

#### defaultValues: `object`

Default values of the form.

#### defaultRules: `object`

The validation rules of the form. You pass an array to customize more than one validators. And the validators will be executed sequentially.
If validation passes, it should return `true` or a resolved promise. Else, it should return `false` or a rejected promise. The message should be a string or a function that receives value of input and result of validation and returns a string.

#### options: `object`

| Property          | Type   | Default value | Description                                                                                                                                                                                                                                       |
| :---------------- | :----- | :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| validationOptions | object | {}            | Please refer to `validation-runner`                                                                                                                                                                                                               |
| fieldRender       | func   | `fieldRender` | The field render prop. <br /> Arguments: <br /> fieldProps: `object` - Props collection of form field <br > Returns `object` — The React node to render.                                                                                          |
| onFieldsChange    | func   |               | Callback fired when the value of `ValidationField` gets changed.<br /> Arguments: <br /> props: `object` — Props of The form component <br /> changedValue: `object` — Value of the changed field <br /> defaultHandler: `func` - Default handler |
| onFieldsReset     | func   |               | Callback fired when the form is reset.<br /> Arguments: <br /> props: `object` — Props of The form component <br /> newValues: `object` — The reset value <br /> defaultHandler: `func` - Default handler                                         |

If the form has been decorated by `createForm` then it owns APIs as follows:

| Property     | Type | Description                                                                                                                                                                                            |
| :----------- | :--- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| isValid      | bool | Whether the form is valid (has no validation error).                                                                                                                                                   |
| isPristine   | bool | Whether the current values of form are different from the initial values.                                                                                                                              |
| isValidating | bool | Whether the form is validating.                                                                                                                                                                        |
| initialize   | func | Resets the form to specified values.                                                                                                                                                                   |
| submit       | func | Submits the form. Returns a promise that will be resolved when the form is submitted successfully, or rejected if the submission fails.<br /> Arguments: <br /> onSuccess: `func`<br /> onFail: `func` |
| validateAll  | func | Validates the form.                                                                                                                                                                                    |
| validateItem | func | Validates the specified field. <br /> Arguments: <br /> name: `string` - Name of the field to validate <br />                                                                                          |

### ValidationField

| Property        | Type   | Default value | Description                                                                                                                                                                               |
| :-------------- | :----- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| formatter       | func   |               | The andler that format the value. <br /> Arguments: <br /> value: `string \| boolean \| number` — The value of input.<br /> Returns `object` — The formatted value.                       |
| name            | string | Required      | The unique identifier of field, corresponding to a value in the form values.                                                                                                              |
| onValidate      | func   |               | Callback fired after validation.<br /> Arguments: <br /> result: `object` — The result of validation. You can pull out the return of the validator by accessing `result.promiseValue`.    |
| render          | func   | Required      | A render prop. Use the property to get what to render.<br /> Arguments: <br />props: `object` — Please refer to `options.fieldRender`. <br />Returns `object` — The React node to render. |
| trigger         | string | onChange      | When to collect the value of children node.                                                                                                                                               |
| validateTrigger | string | onChange      | When to validate the value of children node.                                                                                                                                              |
| valuePropName   | string | value         | Prop that should be validated. For example, the `valuePropName` of checkbox is `checked`.                                                                                                 |
