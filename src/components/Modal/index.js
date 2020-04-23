import React from "react";
import PropTypes from 'prop-types';
import { ModalWrapper } from "./styles";

const Modal = ({ title, actions, opened, component, onSubmit, onCancel }) => {
  const handleOnOk = e => onSubmit && onSubmit(e);

  return (
    <ModalWrapper
      visible={opened}
      onOk={handleOnOk}
      onCancel={onCancel}
      title={title}
      footer={actions}
      hasComponent={!!component}
    >
      {component && component(onCancel)}
    </ModalWrapper>
  );
};

Modal.propTypes = {
    title: PropTypes.string.isRequired,
    actions: PropTypes.array,
    opened: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  };

export default Modal;
