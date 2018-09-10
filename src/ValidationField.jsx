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
    defaultValue: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.bool,
    ]),
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
  };

  static defaultProps = {
    valuePropName: 'value',
    validateTrigger: 'onChange',
    trigger: 'onChange',
    defaultValue: '',
  };

  constructor(props) {
    super(props);
    const { register, name } = props;
    if (!register) {
      throw new Error(
        'Field must be inside a component decorated with createForm()',
      );
    }
    if (register) {
      register(name, this.handleValidate);
    }
  }

  componentDidUpdate(prevProps) {
    const { name, register, unRegister } = this.props;
    if (name !== prevProps.name) {
      unRegister(prevProps.name);
      register(name, this.handleValidate);
    }
  }

  componentWillUnmount() {
    const { unRegister, name } = this.props;
    if (unRegister) {
      unRegister(name);
    }
  }

  getValueFromEvent(e, value, ...other) {
    let newValue;
    const { valuePropName, getValueFromEvent } = this.props;
    if (getValueFromEvent) {
      return getValueFromEvent(e, value, ...other);
    }
    if (!e.preventDefault) {
      newValue = e;
    } else if (e.target[valuePropName] != null) {
      newValue = e.target[valuePropName];
    } else if (value != null) {
      newValue = value;
    } else {
      newValue = e.target.value;
    }
    return newValue;
  }

  format(e, oldValue, name) {
    const { formatter } = this.props;
    const value = this.getValueFromEvent(e, oldValue);
    const formattedValue = formatter ? formatter(value) : value;
    return typeof formattedValue === 'object'
      ? formattedValue
      : { [name]: formattedValue };
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
      options,
      [validateTrigger]: onTrigger,
    } = this.props;
    const formattedValue = this.format(e, value, name);
    onFieldChange(formattedValue);
    const result = validateItem(
      name,
      formattedValue[name],
      options,
      this.props,
    );
    if (result) result.then(onValidate, onValidate);
    if (onTrigger) {
      onTrigger(e, value, ...args);
    }
  };

  handleValueChange = (e, value, ...args) => {
    if (!e) {
      return;
    }
    const {
      name,
      onFieldChange,
      validateTrigger,
      [validateTrigger]: onTrigger,
    } = this.props;
    const formattedValue = this.format(e, value, name);
    onFieldChange(formattedValue);
    if (onTrigger) {
      onTrigger(e, value, ...args);
    }
  };

  handleValidate = (e, value) => {
    let result;
    const {
      name, validateItem, onValidate, options,
    } = this.props;
    if (!e) {
      result = validateItem(name, null, this.props);
    } else {
      const formattedValue = this.format(e, value, name);
      result = validateItem(name, formattedValue[name], options, this.props);
    }
    if (result) result.then(onValidate, onValidate);
    return result;
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
    const dataBind = {
      [valuePropName]: values[name] || defaultValue,
      [trigger]: this.handleValueChange,
    };
    if (validateTrigger !== 'ignore') {
      dataBind[validateTrigger] = validateTrigger === trigger
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
      dataBind,
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
