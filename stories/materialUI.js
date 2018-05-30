import React, { cloneElement } from 'react';
import { storiesOf } from '@storybook/react';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import InputAdornment from '@material-ui/core/InputAdornment';
import Switch from '@material-ui/core/Switch';
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
        }, 2000);
      }),
    message: 'Please input your name',
  },
  gender: {
    validator: gender => gender,
    message: 'Please choose your gender',
  },
  terms: {
    validator: agree => agree,
    message: ' ',
  },
};

class MaterialUIForm extends React.PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    const { validateAll } = this.props;
    validateAll();
  };
  render() {
    const { isValid, submitting } = this.props;
    return (
      <form onSubmit={this.handleSubmit} style={{ margin: '40px', maxWidth: '400px' }}>
        <ValidationField name="name" label="Name" validateTrigger="onBlur" isInput>
          <Input />
        </ValidationField>
        <ValidationField name="age" label="Age" isInput>
          <Select >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </ValidationField>
        <ValidationField name="gender" label="Gender">
          <RadioGroup row>
            <FormControlLabel value="male" control={<Radio />} label="Male" />
            <FormControlLabel value="female" control={<Radio />} label="Female" />
            <FormControlLabel value="other" control={<Radio />} label="Other" />
          </RadioGroup>
        </ValidationField>
        <ValidationField name="birth" label="Date of birth">
          <Input
            label="Birthday"
            type="date" />
        </ValidationField>
        <ValidationField name="terms" valuePropName="checked">
          <FormControlLabel value="terms" control={<Switch value="terms" />} label="I agree to terms" />
        </ValidationField>
        <Button
          type="submit"
          variant="raised"
          color="primary"
          disabled={!isValid || submitting}>
          Login
        </Button>
      </form>
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
  const labelNode = isInput
    ? <InputLabel htmlFor={id}>{label}</InputLabel>
    : <FormLabel htmlFor={id}>{label}</FormLabel>;
  const input = cloneElement(children, Object.assign({
    id,
    ...dataBindProps,
  }, isInput ? {
    error: error && error.length > 0,
    endAdornment: validating ? (
      <InputAdornment position="end">
        <CircularProgress size={20} />
        <span />
      </InputAdornment>) : null,
    ...children.props.endAdornment,
  } : null));
  return (
    <FormControl fullWidth error={error && error.length > 0} style={{ marginTop: '6px' }} required={required}>
      {labelNode}
      {input}
      <FormHelperText>{error ? error[0] : ''}</FormHelperText>
    </FormControl>);
}
const Demo = createForm({
  birth: '2018-05-28',
}, rules, { fieldRender })(MaterialUIForm);
storiesOf('Form with Material-ui', module)
  .add('profile', () => <Demo />);
