import React, { cloneElement } from 'react';
import LoadingIcon from './icons/Loading';
import './style.css';

export default function fieldRender({
  children,
  id,
  value,
  error,
  validating,
  label,
  onValueChange,
  valuePropName,
  validateTrigger,
}) {
  const input = cloneElement(children, {
    id,
    [valuePropName]: value,
    [validateTrigger]: onValueChange,
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
