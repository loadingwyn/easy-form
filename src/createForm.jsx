import React, { Component } from 'react';
import Validator from 'validator-runner';
import FormContext from './FormContext';
import render from './fieldRender';
// import PropTypes from 'prop-types';

export default (
  defaultValues = {},
  defaultRules = {},
  options = {},
) => ComposedComponent =>
  class extends Component {
    static propTypes = {};

    static defaultProps = {};

    initialized = true;
    constructor(props, context) {
      super(props, context);
      const { values = defaultValues, rules = defaultRules } = props;
      const { retention, traversal, concurrent } = options;
      this.originalData = values;
      this.state = {
        values: this.originalData,
        errors: {},
        validating: {},
        submitting: false,
        validator: new Validator(rules, {
          retention,
          traversal,
          concurrent,
        }),
      };
      this.lastValidation = {};
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const { rules, values } = nextProps;
      const nextState = {};
      const { retention, traversal, concurrent } = options;
      let flag = 0;
      if (nextProps.values !== prevState.lastValues) {
        flag = 1;
        Object.assign(nextState, {
          values,
          lastValues: nextProps.values,
        });
      }
      if (nextProps.rules !== prevState.lastRules) {
        flag = 1;
        Object.assign(nextState, {
          validator: new Validator(rules, {
            retention,
            traversal,
            concurrent,
          }),
          lastRules: nextProps.rules,
        });
      }
      if (flag) {
        return nextState;
      }
      return null;
    }

    handleChange = (name, value, cb) => {
      const { onChange } = this.props;
      this.setState(state => {
        this.initialized = false;
        return {
          values: {
            ...state.values,
            [name]: value,
          },
        };
      }, () => cb && cb(name));
      if (onChange) onChange(name, value);
    };

    initialize = (newData = {}) => {
      this.state.validator.cancelAll();
      this.setState(() => {
        this.initialized = true;
        return {
          values: {
            ...this.originalData,
            ...newData,
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
      const validation = this.state.validator.validateItem(
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
      const { rules = defaultRules } = this.props;
      this.setState(state => {
        const newState = {};
        Object.keys(rules).forEach(key => {
          newState[key] = true;
        });
        return {
          validating: {
            ...state.validating,
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
            render: options.fieldRender || render,
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
