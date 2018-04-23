import React, { Component, cloneElement } from 'react';
import { withForm } from './FormContext';

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
      children,
      id,
      validateTrigger,
      values,
      name,
      valuePropName,
      defaultValue,
    } = this.props;
    const input = cloneElement(children, {
      id: children.props.id || id,
      [valuePropName]: values[name] || defaultValue,
      [validateTrigger]: this.handleValueChange,
    });
    return <div>{input}</div>;
  }
}
export default withForm(ValidationField);
