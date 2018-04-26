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

class LoginForm extends React.PureComponent {
  render() {
    const { submit, isValid } = this.props;
    return (
      <form>
        <ValidationField name="name" label="用户名">
          <TextField placeholder="Username" />
        </ValidationField>
        <ValidationField name="password" label="密码">
          <TextField placeholder="Password" type="password" />
        </ValidationField>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          style={{
            flex: '0 0 auto',
            marginRight: '20px',
          }}
          disabled={!isValid}
          onClick={submit(
            data => console.log(data),
            error => console.log(error),
          )}>
          登陆
        </Button>
      </form>
    );
  }
}

function fieldRender({
  children,
  id,
  value,
  error,
  validating,
  label,
  onValueChange,
  valuePropName,
  validateTrigger,
}) {
  const input = cloneElement(children, {
    label,
    id,
    [valuePropName]: value,
    [validateTrigger]: onValueChange,
    error: error && error.length > 0,
    helperText: error ? error[0] : '',
    InputProps: {
      endAdornment: (
        <InputAdornment position="end">
          {validating ? <LoadingIcon className="easy-form-loading" color="rgba(0, 0, 0, 0.87)" /> : <span />}
        </InputAdornment>
      ),
    },
  });
  return <div style={{ margin: '10px' }}>{input}</div>;
}
const Demo = createForm({}, rules, {}, fieldRender)(LoginForm);
storiesOf('Form 扩展', module).add('material-ui@1.x', () => <Demo />);
