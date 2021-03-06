import React, { cloneElement } from 'react';
import { connect, Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { bindActionCreators, combineReducers, createStore } from 'redux';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ValidationField, createForm } from '../src';

const formReducer = (state = {}, formAction) => {
  if (!formAction.payload) {
    return state;
  }
  if (formAction.type === 'RESET_FORM_VALUE') {
    return formAction.payload || {};
  }
  return Object.assign({}, state, formAction.payload);
};

const actionCreator = payload => ({
  type: 'CHANGE_FORM_VALUE',
  payload,
});

const resetActionCreator = payload => ({
  type: 'RESET_FORM_VALUE',
  payload,
});
const rootReducer = combineReducers({
  formData: formReducer,
});
/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

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

class ReduxForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(action('submit-success'), action('submit-fail'))();
  };

  // handleChange = value => {
  //   const { update } = this.props;
  //   update(value);
  // };
  render() {
    const { isValid, initialize } = this.props;
    return (
      <Paper style={{ width: '400px', padding: '40px', margin: '20px' }}>
        <Typography variant="h5">登录</Typography>
        <form onSubmit={this.handleSubmit}>
          <ValidationField
            name="name"
            label="用户名"
            isInput
            // formatter={value => ({
            //   name: value,
            //   password: value,
            // })}
            validateTrigger="onBlur">
            <Input placeholder="Username" />
          </ValidationField>
          <ValidationField
            name="password"
            label="密码"
            isInput
            // trigger="onBlur"
            // valuePropName="defaultValue"
            validateTrigger="onBlur">
            <Input placeholder="Password" type="password" />
          </ValidationField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{
              marginTop: 10,
              width: 80,
              padding: '8px 24px',
            }}
            disabled={!isValid}>
            登录
          </Button>
          <Button
            onClick={() => initialize()}
            style={{
              marginTop: 10,
              marginLeft: 16,
            }}
            color="primary">
            恢复
          </Button>
        </form>
      </Paper>
    );
  }
}

function fieldRender({
  children,
  id,
  error,
  required,
  validating,
  label,
  dataBindProps,
  isInput,
}) {
  const labelNode = <InputLabel htmlFor={id}>{label}</InputLabel>;
  const input = cloneElement(
    children,
    Object.assign(
      {
        id,
        ...dataBindProps,
        error: error && error.length > 0,
      },
      isInput
        ? {
            endAdornment: validating ? (
              <InputAdornment position="end">
                <CircularProgress size={20} />
                <span />
              </InputAdornment>
            ) : null,
            ...children.props.endAdornment,
          }
        : null,
    ),
  );
  return (
    <FormControl
      fullWidth
      error={error && error.length > 0}
      style={{ marginTop: '6px' }}
      required={required}>
      {labelNode}
      {input}
      <FormHelperText>{error ? error[0] : ''}</FormHelperText>
    </FormControl>
  );
}

const WrappedForm = createForm({}, rules, {
  fieldRender,
  onFormChange: ({ update }, value) => {
    update(value);
  },
  onFormReset: ({ reset }, value) => {
    reset(value);
  },
})(ReduxForm);

const Demo = connect(
  state => ({
    values: state.formData,
  }),
  dispatch =>
    bindActionCreators(
      {
        update: actionCreator,
        reset: resetActionCreator,
      },
      dispatch,
    ),
)(props => <WrappedForm {...props} />); // react-redux does not support rorwarding fefs.

storiesOf('Form with Material-ui', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('login with redux', () => <Demo />);
