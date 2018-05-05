import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import { ValidationField, createForm } from '../src';
import LoadingIcon from '../src/icons/Loading';

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

class MaterialUIForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(data => console.log(data), error => console.log(error))();
  };
  render() {
    const { isValid, submitting } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <ValidationField name="name" label="用户名" validateTrigger="onBlur">
          <TextField placeholder="Username" />
        </ValidationField>
        <ValidationField name="password" label="密码" validateTrigger="onBlur">
          <TextField placeholder="Password" type="password" />
        </ValidationField>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          style={{
            marginLeft: '10px',
          }}
          disabled={!isValid || submitting}>
          登录
        </Button>
      </form>
    );
  }
}

function fieldRender({
  children,
  id,
  error,
  validating,
  label,
  dataBindProps,
}) {
  const input = cloneElement(children, {
    label,
    id,
    ...dataBindProps,
    error: error && error.length > 0,
    helperText: error ? error[0] : '',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          {validating ? (
            <LoadingIcon
              className="easy-form-loading"
              color="rgba(0, 0, 0, 0.87)" />
          ) : (
            <span />
          )}
        </InputAdornment>
      ),
    },
  });
  return <div style={{ margin: '10px' }}>{input}</div>;
}
const Demo = createForm({}, rules, { fieldRender })(MaterialUIForm);
storiesOf('Form 扩展', module)
  .add('with material-ui@1.x', () => <Demo />);

