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
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <span>
        {input}
        {validating ? <LoadingIcon className="easy-form-loading" /> : null}
      </span>
      <span>{error}</span>
    </div>
  );
}
