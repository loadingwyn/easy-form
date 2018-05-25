import React, { cloneElement } from 'react';
import { connect, Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { bindActionCreators, combineReducers, createStore } from 'redux';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { InputAdornment } from 'material-ui/Input';
import { ValidationField, createForm } from '../src';
import LoadingIcon from '../src/icons/Loading';

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
      <form onSubmit={this.handleSubmit}>
        <ValidationField
          name="name"
          label="用户名"
          validateTrigger="onBlur">
          <TextField placeholder="Username" />
        </ValidationField>
        <ValidationField
          name="password"
          label="密码"
          trigger="onBlur"
          valuePropName="defaultValue"
          validateTrigger="onBlur">
          <TextField placeholder="Password" type="password" />
        </ValidationField>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          style={{
            marginLeft: '10px',
          }}
          disabled={!isValid}>
          登录
        </Button>
        <Button
          onClick={() => initialize()}
          color="primary"
          style={{
            marginLeft: '10px',
          }}>
          恢复
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
)(createForm({}, rules, {
  fieldRender,
  onFieldsChange: (props, value) => {
    props.update(value);
  },
  onFieldsReset: (props, value) => {
    props.reset(value);
  },
})(ReduxForm));

storiesOf('Form 扩展', module)
  .addDecorator(story => <Provider store={store}>{story()}</Provider>)
  .add('with redux', () => <Demo />);
