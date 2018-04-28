import React, { cloneElement } from 'react';
import LoadingIcon from './icons/Loading';
import './style.css';

export default function fieldRender({
  children,
  id,
  error,
  validating,
  label,
  dataBindProps,
}) {
  const input = cloneElement(children, {
    id,
    ...dataBindProps,
  });
  /* eslint-disable */
  return (
    <div className="easy-form-field">
      <label htmlFor={id} className="easy-form-label">
        {label}
      </label>
      <div className="easy-form-main">
        <div className="easy-form-input">
          {input}
          {validating ? (
            <LoadingIcon className="easy-form-loading easy-form-state-icon" />
          ) : null}
        </div>
        <span className="easy-form-helper-text">{error}</span>
      </div>
    </div>
  );
  /* eslint-enable */
}
