import React, { Component } from 'react';
import Validator from 'validator-runner';
import FormContext from './FormContext';
import render from './fieldRender';
// import PropTypes from 'prop-types';

export default (
  /**
   * The default value of form.
   */
  defaultValues = {},
  /**
   * Validation rules.
   */
  defaultRules = {},
  /**
   * Form options.
   */
  options = {},
) => ComposedComponent =>
  class extends Component {
    static defaultProps = {};

    initialized = true;
    constructor(props, context) {
      super(props, context);
      const { values = defaultValues, rules = defaultRules } = props;
      const { formOptions } = options;
      this.originalData = values;
      this.state = {
        values: this.originalData,
        errors: {},
        validatings: {},
        submitting: false,
        validator: new Validator(rules, formOptions),
      };
      this.lastValidation = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const { rules, values } = nextProps;
      const nextState = {};
      const { formOptions } = options;
      if (nextProps.values !== prevState.lastValues) {
        Object.assign(nextState, {
          values,
          lastValues: nextProps.values,
        });
      }
      if (nextProps.rules !== prevState.lastRules) {
        Object.assign(nextState, {
          validator: new Validator(rules, formOptions),
          lastRules: nextProps.rules,
        });
      }
      return nextState;
    }

    getFieldValue = (value = {}) => {
      const {
        onChange,
      } = this.props;
      let allValues;
      this.initialized = false;
      this.setState(state => {
        allValues = {
          ...state.values,
          ...value,
        };
        return { values: allValues };
      });
      if (onChange) onChange(value, allValues);
    };

    handleFieldChange = (value = {}) => {
      const {
        onFieldsChange,
      } = options;
      if (onFieldsChange) {
        onFieldsChange(this.props, value, this.getFieldValue);
      } else {
        this.getFieldValue(value);
      }
    };

    initialize = newData => {
      const {
        onFieldsReset,
      } = options;
      this.state.validator.cancelAll();
      this.initialized = true;
      if (onFieldsReset) {
        onFieldsReset(this.props, newData || this.originalData, this.setFormValues);
      } else {
        this.setFormValues(newData || this.originalData);
      }
      this.setState(() => ({
        errors: {},
        validatings: {},
      }));
    };

    setFormValues = newValues => {
      this.setState({
        values: newValues,
      });
    }
    validateItem = (name, value) => {
      this.setState(state => ({
        validatings: {
          ...state.validatings,
          [name]: true,
        },
      }));
      const validation = this.state.validator.validateItem(
        { [name]: value },
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
      );
      return validation;
    };

    validateAll = () => {
      const { values } = this.state;
      const { rules = defaultRules } = this.props;
      this.setState(state => {
        const newState = {};
        Object.keys(rules).forEach(key => {
          newState[key] = true;
        });
        return {
          validatings: {
            ...state.validatings,
            ...newState,
          },
        };
      });
      return this.state.validator.validate(
        values,
        errors => {
          this.setState(state => ({
            errors: {
              ...state.errors,
              ...errors,
            },
          }));
        },
        {
          fieldCallback: name => {
            this.setState(state => ({
              validatings: {
                ...state.validatings,
                [name]: false,
              },
            }));
          },
        },
      );
    };

    submit = (onSubmitSuccess, onSubmitFail) => () => {
      this.setState({
        submitting: true,
      });
      return this.validateAll()
        .then(() => onSubmitSuccess(this.state.values), onSubmitFail)
        .then(
          () => {
            this.setState({
              submitting: false,
            });
          },
          () => {
            this.setState({
              submitting: false,
            });
          },
        );
    };

    render() {
      const {
        onFieldsChange,
        onChange,
        ...other
      } = this.props;
      return (
        <FormContext.Provider
          value={{
            ...this.state,
            onFieldChange: this.handleFieldChange,
            validateItem: this.validateItem,
            render: options.fieldRender || render,
          }}>
          <ComposedComponent
            {...this.state}
            {...other}
            isvalidating={
              Object.values(this.state.validatings).filter(msg => msg).length > 0
            }
            isValid={
              Object.values(this.state.errors).filter(msg => msg && msg.length > 0).length <= 0
            }
            validateAll={this.validateAll}
            validateItem={this.validateItem}
            initialize={this.initialize}
            submit={this.submit}
            isInitialized={this.initialized} />
        </FormContext.Provider>
      );
    }
  };
