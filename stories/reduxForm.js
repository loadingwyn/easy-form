import React, { cloneElement } from 'react';
import { connect, Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
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

const formReducer = (state = {}, action) => {
  if (!action.payload) {
    return state;
  }
  if (action.type === 'RESET_FORM_VALUE') {
    return action.payload || {};
  }
  return Object.assign({}, state, action.payload);
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

class ReduxForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(data => console.log(data), error => console.log(error))();
  };

  // handleChange = value => {
  //   const { update } = this.props;
  //   update(value);
  // };
  render() {
    const { isValid, initialize } = this.props;
    return (
      <Paper style={{ width: '400px', padding: '40px', margin: '20px' }}>
        <Typography variant="headline">登录</Typography>
        <form onSubmit={this.handleSubmit}>
          <ValidationField
            name="name"
            label="用户名"
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
            // trigger="onBlur"
            // valuePropName="defaultValue"
            validateTrigger="onBlur">
            <Input placeholder="Password" type="password" />
          </ValidationField>
          <Button
            type="submit"
            variant="raised"
            color="primary"
            style={{
              padding: '8px 24px',
            }}
            disabled={!isValid}>
            登录
          </Button>
          <Button
            onClick={() => initialize()}
            style={{
              marginLeft: '6px',
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

const Demo = connect(
  state => ({
    values: state.formData,
  }),
  dispatch => bindActionCreators(
    {
      update: actionCreator,
      reset: resetActionCreator,
    },
    dispatch,
  ),
)(
  createForm({}, rules, {
    fieldRender,
    onFormChange: ({ update }, value) => {
      update(value);
    },
    onFormReset: ({ reset }, value) => {
      reset(value);
    },
  })(ReduxForm),
);

storiesOf('Form with Material-ui', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('login with redux', () => <Demo />);
