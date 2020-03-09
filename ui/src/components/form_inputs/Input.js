import React from 'react';
import PropTypes from 'prop-types';
import { useField, useFormikContext } from 'formik';
import InputContainer from './InputContainer';

const Input = ({
  label, className, onChange, ...props
}) => {
  const [field, meta] = useField(props);
  const { setFieldValue } = useFormikContext();

  return (
    <InputContainer className="mr-4">
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
        <label
          htmlFor={field.name}
        >
          {label}
        </label>
      </div>
      {meta.error && <span>{meta.error}</span>}
    </InputContainer>
  );
};

Input.propTypes = {
  onChange: PropTypes.func,
  label: PropTypes.string,
  className: PropTypes.string,
};

Input.defaultProps = {
  onChange: null,
  label: '',
  className: '',
};

export default Input;
