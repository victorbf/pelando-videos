/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';

const Input = ({
  label, onChange, ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <div>
      <input
        {...field}
        {...props}
        onChange={(event) => {
          setFieldValue(field.name, event.target.value);
          if (onChange) {
            onChange(event.target.value);
          }
        }}
      />
      {label && (
        <label
          htmlFor={field.name}
        >
          {label}
        </label>
      )}
      {meta.error && <span>{meta.error}</span>}
    </div>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
};

Input.defaultProps = {
  onChange: null,
  label: '',
};

export default Input;
