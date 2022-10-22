import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay, Container, Footer } from './styles';

import Button from '../Button';

export default function Modal({
  danger,
  title,
  isLoading,
  children,
  cancelLabel,
  confirmLabel,
  onCancel,
  onConfirm,
  visible,
}) {
  if(visible) {
    return ReactDOM.createPortal(
      <Overlay>
        <Container danger={danger}>
          <h1>{title}</h1>
          <div className="modal-body">{children}</div>
          <Footer>
            <button type="button" className="cancel-button" onClick={onCancel} disabled={isLoading}>
              {cancelLabel}
            </button>
            <Button type="button" danger={danger} onClick={onConfirm} isLoading={isLoading}>
              {confirmLabel}
            </Button>
          </Footer>
        </Container>
      </Overlay>,
      document.getElementById('modal-root')
    );
  }

  return null;
}

Modal.propTypes = {
  danger: PropTypes.bool,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  cancelLabel: PropTypes.string,
  confirmLabel: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
};

Modal.defaultProps = {
  danger: false,
  isLoading: false,
  cancelLabel: 'Cancelar',
  confirmLabel: 'Confirmar',
};
