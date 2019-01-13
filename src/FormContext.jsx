import React from 'react';

const FormContext = React.createContext({});
export default FormContext;
export function connect(Component) {
  function WrappedField(props) {
    const { forwardedRef, ...other } = props;
    return (
      <FormContext.Consumer>
        {context => <Component {...context} {...other} ref={forwardedRef} />}
      </FormContext.Consumer>
    );
  }
  function forwardRef(props, ref) {
    return <WrappedField {...props} forwardedRef={ref} />;
  }

  // Give this component a more helpful display name in DevTools.
  forwardRef.displayName = `EasyFormConnectedField`;
  return React.forwardRef(forwardRef);
}
