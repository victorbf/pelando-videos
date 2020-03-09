import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';
import ActionButton from '../ActionButton';

const CommonModal = ({
  title,
  children,
  isModalOpen,
  onCloseModal,
}) => (
  <Modal
    isOpen={isModalOpen}
  >
    {title && (
    <div className="flex justify-between items-center">
      <h2>{title}</h2>
      <ActionButton
        type="button"
        onClick={onCloseModal}
      >
        <FontAwesomeIcon icon="times" />
      </ActionButton>
    </div>
    )}
    <div className="mt-3">
      {children}
    </div>
  </Modal>
);

CommonModal.propTypes = {
  title: PropTypes.string,
  isModalOpen: PropTypes.bool,
  children: PropTypes.node.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

CommonModal.defaultProps = {
  title: '',
  isModalOpen: false,
};

export default CommonModal;
