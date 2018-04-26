import React, { Component } from 'react';
import Validator from 'validator-runner';
import FormContext from './FormContext';
import render from './fieldRender';
// import PropTypes from 'prop-types';

export default (
  defaultValues,
  rules,
  option,
  fieldRender = render,
) => ComposedComponent =>
  class extends Component {
    static propTypes = {};

    static defaultProps = {};

    initialized = true;
    constructor(props, context) {
      super(props, context);
      const data = props.defaultValues ? props.defaultValues : defaultValues;
      this.originalData = data || {};
      this.state = {
        values: {
          ...data,
        },
        errors: {},
        validating: {},
        submitting: false,
      };
      this.validator = new Validator(props.rules ? props.rules : rules, option);
      this.lastValidation = {};
    }

    handleChange = (name, value, cb) => {
      this.setState(state => {
        this.initialized = false;
        return {
          values: {
            ...state.values,
            [name]: value,
          },
        };
      }, () => cb && cb(name));
    };

    initialize = () => {
      this.validator.cancelAll();
      this.setState(() => {
        this.initialized = true;
        return {
          values: {
            ...this.originalData,
          },
          errors: {},
          validating: {},
        };
      });
    };

    validateItem = (name, value) => {
      this.setState(state => ({
        validating: {
          ...state.validating,
          [name]: true,
        },
      }));
      const validation = this.validator.validateItem(
        { [name]: value },
        name,
        errors => {
          this.setState(state => ({
            errors: {
              ...state.errors,
              [name]: errors,
            },
            validating: {
              ...state.validating,
              [name]: false,
            },
          }));
        },
      );
      return validation;
    };

    validateAll = () => {
      const { values } = this.state;
      return this.validator.validate(
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
              validating: {
                ...state.validating,
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
      return (
        <FormContext.Provider
          value={{
            ...this.state,
            handleChange: this.handleChange,
            validateItem: this.validateItem,
            render: fieldRender,
          }}>
          <ComposedComponent
            {...this.state}
            {...this.props}
            isValidating={
              Object.values(this.state.validating).filter(msg => msg).length > 0
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
