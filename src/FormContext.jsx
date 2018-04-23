import React from 'react';

const FormContext = React.createContext({});
export default FormContext;
export function withForm(Component) {
  return function WrappedComponent(props) {
    return (
      <FormContext.Consumer>
        {context => <Component {...context} {...props} />}
      </FormContext.Consumer>
    );
  };
}
