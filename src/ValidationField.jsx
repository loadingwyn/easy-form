import { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormData } from './FormContext';

class Field extends Component {
  static propTypes = {
    /**
     * Prop that should be validated. For example, the `valuePropName` of checkbox is `checked`.
     */
    valuePropName: PropTypes.string,
    /**
     * When to validate the value of children node.
     */
    validateTrigger: PropTypes.string,
    /**
     * When to collect the value of children node.
     */
    trigger: PropTypes.string,
    /**
     * The unique identifier of field, corresponding to a value in the form values.
     */
    name: PropTypes.string.isRequired,
    /**
     * @ignore
     */
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]),
    /**
     * Callback fired after validation.
     * @param {object} result The result of validation.
     * You can pull out the return of the validator by accessing `result.promiseValue`.
     */
    onValidate: PropTypes.func,
    /**
     * Handler that format the input.
     * @param {string | boolean | number} value The value of input.
     * @returns {object} The formatted value.
     */
    formatter: PropTypes.func,
    /**
     * Render Props.
     * @param {object} props Please refer to `fieldRender`.
     * @returns {object} The React node to be rendered.
     */
    render: PropTypes.func.isRequired,
  }
  static defaultProps = {
    valuePropName: 'value',
    validateTrigger: 'onChange',
    trigger: 'onChange',
    defaultValue: '',
  };

  getValueFromEvent(e, value) {
    let newValue;
    const { valuePropName } = this.props;
    if (!e.preventDefault) {
      newValue = e;
    } else if (value != null) {
      newValue = value;
    } else if (e.target[valuePropName] != null) {
      newValue = e.target[valuePropName];
    } else {
      newValue = e.target.value;
    }
    return newValue;
  }

  format(e, oldValue, name) {
    const {
      formatter,
    } = this.props;
    const value = this.getValueFromEvent(e, oldValue);
    const formattedValue = formatter ? formatter(value) : value;
    return typeof formattedValue === 'object' ? formattedValue : { [name]: formattedValue };
  }

  handleChangeAndValidate = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const {
      name,
      onFieldChange,
      validateItem,
      validateTrigger,
      onValidate,
    } = this.props;
    const formattedValue = this.format(e, value, name);
    onFieldChange(formattedValue);
    const result = validateItem(name, formattedValue[name]);
    if (result) result.then(onValidate, onValidate);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value, ...args);
    }
  };

  handleValueChange = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const {
      name, onFieldChange, validateTrigger,
    } = this.props;
    const formattedValue = this.format(e, value, name);
    onFieldChange(formattedValue);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value, ...args);
    }
  };

  handleValidate = (e, value) => {
    if (!e) {
      return;
    }
    const { name, validateItem, onValidate } = this.props;
    const formattedValue = this.format(e, value, name);
    const result = validateItem(name, formattedValue[name]);
    if (result) result.then(onValidate, onValidate);
  };

  render() {
    const {
      defaultValue,
      values,
      errors,
      validatings,
      name,
      render,
      validateTrigger,
      valuePropName,
      trigger,
      ...other
    } = this.props;
    const dataBindProps = {
      [valuePropName]: values[name] || defaultValue,
      [trigger]: this.handleValueChange,
    };
    if (validateTrigger !== 'ignore') {
      dataBindProps[validateTrigger] = validateTrigger === trigger
        ? this.handleChangeAndValidate
        : this.handleValidate;
    }
    let status;
    if (validatings[name]) {
      status = 'validating';
    } else if (errors[name] && errors[name].length > 0) {
      status = 'error';
    } else if (errors[name] && errors[name].length === 0) {
      status = 'success';
    }
    return render({
      ...other,
      id: `easy-form-${name}`,
      name,
      dataBindProps,
      trigger,
      status,
      onValidate: this.handleValidate,
      onValueChange: this.handleValueChange,
      onValueChangeAndValidate: this.handleChangeAndValidate,
      error: errors[name],
      validating: validatings[name],
    });
  }
}
export default withFormData(Field);
