import { Component } from 'react';
import PropTypes from 'prop-types';
import { withFormData } from './FormContext';

export class Field extends Component {
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
     * @param {object} result The result of the validation.
     * You can pull out the return of the validator by accessing `result.promiseValue`.
     */
    onValidate: PropTypes.func,
    /**
     * Render Props.
     * @param {object} props Refer to fieldRender.
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

  handleChangeAndValidate = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const newValue = this.getNewValue(e, value);
    const {
      name,
      changeHandler,
      validateItem,
      validateTrigger,
      onValidate,
    } = this.props;
    changeHandler(name, newValue);
    const result = validateItem(name, newValue);
    if (result) result.then(onValidate, onValidate);
    if (this.props[validateTrigger]) {
      this.props[validateTrigger](e, value, ...args);
    }
  };

  handleValueChange = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const newValue = this.getNewValue(e, value);
    const { name, changeHandler, validateTrigger } = this.props;
    changeHandler(name, newValue);
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
      [validateTrigger]:
        validateTrigger === trigger
          ? this.handleChangeAndValidate
          : this.handleValidate,
    };
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
