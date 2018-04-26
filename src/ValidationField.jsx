import { Component } from 'react';
import { withFormData } from './FormContext';

class ValidationField extends Component {
  static defaultProps = {
    disabled: false,
    valuePropName: 'value',
    validateTrigger: 'onChange',
    defaultValue: '',
  };

  handleValueChange = (e, value) => {
    if (!e) {
      return;
    }
    let newValue;
    const {
      name,
      handleChange,
      validateItem,
      valuePropName,
      validateTrigger,
    } = this.props;
    if (!e.preventDefault) {
      newValue = e;
    } else if (value) {
      newValue = value;
    } else {
      newValue = e.target[valuePropName];
    }
    handleChange(name, newValue);
    validateItem(name, newValue);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value);
    }
  };

  render() {
    const {
      defaultValue,
      values, errors, validating, name, render, ...other
    } = this.props;
    return render({
      ...other,
      name,
      onValueChange: this.handleValueChange,
      value: values[name] || defaultValue,
      error: errors[name],
      validating: validating[name],
    });
  }
}
export default withFormData(ValidationField);
