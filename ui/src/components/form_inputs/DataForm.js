import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

const DataForm = ({
  onSubmit, children, initialValues, ...props
}) => (
  <Formik
    initialValues={initialValues}
    onSubmit={onSubmit}
  >
    <Form
      {...props}
    >
      {children}
    </Form>
  </Formik>
);

DataForm.propTypes = {
  initialValues: PropTypes.objectOf(PropTypes.array),
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

DataForm.defaultProps = {
  initialValues: {},
};

export default DataForm;
