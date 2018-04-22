import React, { Component } from 'react';
import FormContext from './FormContext';

export default class ValidationField extends Component {
  static defaultProps = {
    disabled: false,
    valuePropName: 'value',
    validateTrigger: 'onChange',
  };

  render() {
    const {
      children,
    } = this.props;
    return (
      <FormContext.Customer>
        <div />
      </FormContext.Customer>

    );
  }
}
