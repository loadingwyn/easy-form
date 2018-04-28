import { Component } from 'react';
import { withFormData } from './FormContext';

class ValidationField extends Component {
  static defaultProps = {
    disabled: false,
    valuePropName: 'value',
    validateTrigger: 'onChange',
    defaultValue: '',
  };

  getNewValue(e, value) {
    let newValue;
    const { valuePropName } = this.props;
    if (!e.preventDefault) {
      newValue = e;
    } else if (value) {
      newValue = value;
    } else if (e.target[valuePropName]) {
      newValue = e.target[valuePropName];
    } else {
      newValue = e.target.value;
    }
    return newValue;
  }

  handleValueChange = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const newValue = this.getNewValue(e, value);
    const {
      name,
      handleChange,
      validateItem,
      validateTrigger,
      onValidate,
    } = this.props;
    handleChange(name, newValue);
    const result = validateItem(name, newValue);
    if (result) result.then(onValidate, onValidate);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value, ...args);
    }
  };

  handleChange = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const newValue = this.getNewValue(e, value);
    const { name, handleChange, validateTrigger } = this.props;
    handleChange(name, newValue);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value, ...args);
    }
  };

  handleValidate = (e, value) => {
    if (!e) {
      return;
    }
    const newValue = this.getNewValue(e, value);
    const { name, validateItem, onValidate } = this.props;
    const result = validateItem(name, newValue);
    if (result) result.then(onValidate, onValidate);
  };

  render() {
    const {
      defaultValue,
      values,
      errors,
      validating,
      name,
      render,
      validateTrigger,
      valuePropName,
      ...other
    } = this.props;
    const dataBindProps = {
      [valuePropName]: values[name] || defaultValue,
      onChange: this.handleChange,
      [validateTrigger]:
        validateTrigger === 'onChange'
          ? this.handleValueChange
          : this.handleValidate,
    };
    return render({
      ...other,
      name,
      dataBindProps,
      onValidate: this.handleValidate,
      onChange: this.handleChange,
      onValueChange: this.handleValueChange,
      error: errors[name],
      validating: validating[name],
    });
  }
}
export default withFormData(ValidationField);
