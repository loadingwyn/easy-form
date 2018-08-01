import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Validator from 'validator-runner';
import FormContext from './FormContext';
import render from './fieldRender';

export default (
  /**
   * The default value of form.
   */
  defaultValues = {},
  /**
   * Validation rules.
   */
  defaultSchema = {},
  /**
   * Form options.
   */
  options = {},
) => ComposedComponent => class extends Component {
    static defaultProps = {
      values: defaultValues,
      schema: defaultSchema,
    };

    static propTypes = {
      /**
       * The values of the form.
       */
      values: PropTypes.object,
      schema: PropTypes.object,
      /**
       * Handler while value of any field is changed
       * @param {object} changedValue The value of the changed input.
       * @param {object} values The values of the whole form.
       */
      onChange: PropTypes.func,
    };

    isPristine = true;

    fieldValidators = {};

    constructor(props, context) {
      super(props, context);
      const { values, schema } = props;
      this.originalData = values;
      this.schema = schema;
      this.state = {
        values: this.originalData,
        errors: {},
        validatings: {},
        isSubmitting: false,
      };
      this.validator = new Validator(schema, options);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const { values } = nextProps;
      const nextState = {};
      if (values !== prevState.lastValues) {
        Object.assign(nextState, {
          values,
          lastValues: nextProps.values,
        });
      }
      return nextState;
    }

    componentDidUpdate(prevProps) {
      const { schema } = this.props;
      if (schema !== prevProps.schema) {
        this.validator = new Validator(schema, options);
        this.schema = schema;
      }
    }

    getFieldValue = (value = {}) => {
      const { onChange } = this.props;
      let values;
      this.isPristine = false;
      this.setState(state => {
        values = {
          ...state.values,
          ...value,
        };
        return { values };
      });
      if (onChange) onChange(value, values);
    };

    handleFieldChange = (value = {}) => {
      const { onFormChange } = options;
      if (onFormChange) {
        onFormChange(this.props, value, this.getFieldValue);
      } else {
        this.getFieldValue(value);
      }
    };

    initialize = () => {
      const { onFormReset } = options;
      this.validator.cancelAll();
      this.isPristine = true;
      if (onFormReset) {
        onFormReset(this.props, this.originalData, this.updateValues);
      } else {
        this.updateValues(this.originalData);
      }
      this.setState(() => ({
        errors: {},
        validatings: {},
      }));
    };

    updateValues = newValues => {
      this.setState({
        values: newValues,
      });
    };

    updateFieldValue = (name, newValue, shouldValidate = false) => {
      this.isPristine = false;
      this.setState(state => ({
        values: Object.assign({}, state.values, {
          [name]: newValue,
        }),
      }));
      if (shouldValidate) {
        if (this.fieldValidators[name]) {
          this.fieldValidators[name](newValue);
        } else {
          this.validateItem(name, newValue);
        }
      }
    };

    subscribe = (name, fieldValidator) => {
      this.fieldValidators[name] = fieldValidator;
    };

    unSubscribe = name => {
      this.fieldValidators[name] = null;
    };

    updateSchema = newSchema => {
      this.schema = newSchema;
      this.validator.setSchema(newSchema);
    };

    validateItem = (name, value, ...other) => {
      const { values } = this.state;
      this.setState(state => ({
        validatings: {
          ...state.validatings,
          [name]: true,
        },
      }));
      const target = Object.assign(
        {},
        values,
        value != null ? { [name]: value } : {},
      );
      const validation = this.validator.validateItem(
        target,
        name,
        errors => {
          this.setState(state => ({
            errors: {
              ...state.errors,
              [name]: errors,
            },
            validatings: {
              ...state.validatings,
              [name]: false,
            },
          }));
        },
        target,
        values,
        ...other,
      );
      return validation;
    };

    validateAll = () => Promise.all(
      Object.keys(this.schema).map(
        fieldName => (this.fieldValidators[fieldName]
          ? this.fieldValidators[fieldName]()
          : this.validateItem(fieldName)),
      ),
    );

    submit = (onSubmitSuccess, onSubmitFail) => () => {
      this.setState({
        isSubmitting: true,
      });
      const { values } = this.state;
      return this.validateAll()
        .then(results => {
          const errors = {};
          results.forEach(result => {
            errors[result.fieldName] = result.errors;
          });
          if (Object.values(errors).filter(m => m && m.length > 0).length > 0) {
            if (onSubmitFail) {
              onSubmitFail(errors);
            }
          } else if (onSubmitSuccess) {
            onSubmitSuccess(values);
          }
        })
        .then(
          () => {
            this.setState({
              isSubmitting: false,
            });
          },
          () => {
            this.setState({
              isSubmitting: false,
            });
          },
        );
    };

    render() {
      const { onFormChange, onChange, ...other } = this.props;
      const { validatings, errors } = this.state;
      const isValidating = Object.values(validatings).filter(msg => msg).length > 0;
      const isValid = Object.values(errors).filter(msg => msg && msg.length > 0).length <= 0;
      return (
        <FormContext.Provider
          value={{
            ...this.state,
            onFieldChange: this.handleFieldChange,
            validateItem: this.validateItem,
            render: options.fieldRender || render,
            subscribe: this.subscribe,
            unSubscribe: this.unSubscribe,
          }}>
          <ComposedComponent
            {...other}
            {...this.state}
            updateFieldValue={this.updateFieldValue}
            updateValues={this.updateValues}
            updateSchema={this.updateSchema}
            isValidating={isValidating}
            isValid={isValid}
            validateAll={this.validateAll}
            validateItem={this.validateItem}
            initialize={this.initialize}
            submit={this.submit}
            isPristine={this.isPristine} />
        </FormContext.Provider>
      );
    }
};
