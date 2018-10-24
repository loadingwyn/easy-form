import React from 'react';

const FormContext = React.createContext({});
export default FormContext;
export function withFormData(Component) {
  function WrappedComponent(props) {
    const { forwardedRef, ...other } = props;
    return (
      <FormContext.Consumer>
        {context => <Component {...context} {...other} ref={forwardedRef} />}
      </FormContext.Consumer>
    );
  }
  function forwardRef(props, ref) {
    return <WrappedComponent {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  const name = Component.displayName || Component.name;
  forwardRef.displayName = `ValidationField(${name})`;
  return React.forwardRef(forwardRef);
}
