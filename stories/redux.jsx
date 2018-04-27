import React, { cloneElement } from 'react';
import { connect } from 'react-redux';
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
  return Object.assign({}, state, {
    [action.payload.name]: action.payload.value,
  });
};

const actionCreator = payload => ({
  type: 'CHANGE_FORM_VALUE',
  payload,
});

const rootReducer = combineReducers({
  formData: formReducer,
});
export const store = createStore(rootReducer);

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
  handleSubmit = e => {
    e.preventDefault();
    const { submit } = this.props;
    submit(data => console.log(data), error => console.log(error))();
  };
  handleChange = (name, value) => {
    const { update } = this.props;
    update({
      name,
      value,
    });
  };
  render() {
    const { isValid } = this.props;
    return (
      <form onSubmit={this.handleSubmit}>
        <ValidationField
          name="name"
          label="用户名"
          validateTrigger="onBlur"
          handleChange={this.handleChange}>
          <TextField placeholder="Username" />
        </ValidationField>
        <ValidationField
          name="password"
          label="密码"
          validateTrigger="onBlur"
          handleChange={this.handleChange}>
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
          disabled={!isValid}>
          登陆
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

export default connect(
  state => ({
    values: state.formData,
  }),
  dispatch =>
    bindActionCreators(
      {
        update: actionCreator,
      },
      dispatch,
    ),
)(createForm({}, rules, { fieldRender })(LoginForm));
