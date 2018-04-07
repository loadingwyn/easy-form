import React, { Component } from 'react';
import Validator from 'validator-runner';
// import PropTypes from 'prop-types';

export default (defaultValues, rules, option) => ComposedComponent =>
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
        loadingStatus: {},
        isSubmitting: false,
      };
      this.validator = new Validator(props.rules ? props.rules : rules, option);
      this.lastValidation = {};
    }

    getChildContext() {
      const { formData, errorMsg, formValidatingStatus } = this.state;
      return {
        nuiFormData: {
          inline: this.props.inline,
          formValues: formData,
          formErrorMsgs: errorMsg,
          formValidatingStatus,
          updateItemData: this.updateItemData,
          validateItem: this.validateItem,
          validateAll: this.validateAll,
        },
      };
    }
    componentWillReceiveProps(nextProps) {
      const { defaultValues, rules } = nextProps;
      if (defaultData && defaultData !== this.props.defaultData) {
        this.initialized = false;
        this.setState({
          formData: {
            ...defaultData,
          },
        });
      }
      if (ruleSet && ruleSet !== this.props.ruleSet) {
        this.validator = new Validator(ruleSet, option);
      }
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
          formData: {
            ...this.originalData,
          },
          errorMsg: {},
          formValidatingStatus: {},
        };
      });
    };

    validateItem = (newValue, name) => {
      this.setState(state => ({
        loadingStatus: {
          ...state.loadingStatus,
          [name]: true,
        },
      }));
      const validation = this.validator.validateItem(
        { [name]: newValue },
        name,
        errors => {
          this.setState(state => ({
            errors: {
              ...state.errors,
              [name]: errors,
            },
            loadingStatus: {
              ...state.loadingStatus,
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
              loadingStatus: {
                ...state.loadingStatus,
                [name]: false,
              },
            }));
          },
        },
      );
    };

    itemWrapper = (name, validatedProp = 'defaultValue') => {
      const { formData, errorMsg, formValidatingStatus } = this.state;
      return InputEl => {
        let validateStatus = 'initial';
        if (errorMsg[name] && errorMsg[name].length > 0) {
          validateStatus = 'error';
        } else if (errorMsg[name] != null) {
          validateStatus = 'success';
        }
        const newProps = {
          name,
          validateStatus,
          formValidatingStatus: formValidatingStatus[name],
          inputProps: {
            [validatedProp]: formData[name],
          },
        };
        if (errorMsg[name] && errorMsg[name].length > 0) {
          newProps.helperText = errorMsg[name];
        }
        return React.cloneElement(InputEl, newProps);
      };
    };

    submit = (onSubmitSuccess, onSubmitFail) => () => {
      this.setState({
        isSubmitting: true,
      });
      return this.validateAll()
        .then(() => onSubmitSuccess(this.state.formData), onSubmitFail)
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
      return (
        <ComposedComponent
          {...this.state}
          {...this.props}
          isValidating={
            Object.values(this.state.formValidatingStatus).filter(msg => msg)
              .length > 0
          }
          isValid={
            Object.values(this.state.errorMsg).filter(msg => msg && msg.length > 0).length <= 0
          }
          validateAll={this.validateAll}
          validateItem={this.validateItem}
          updateItemData={this.updateItemData}
          validate={this.validate}
          initialize={this.initialize}
          submit={this.submit}
          isInitialized={this.initialized} />
      );
    }
  };
