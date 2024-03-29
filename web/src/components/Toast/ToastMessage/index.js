import { useEffect, memo } from 'react';
import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

function ToastMessage({ message, onRemoveMessage, isLeaving, animatedElementRef }) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveMessage(message.id)
    }, message.duration || 4000);

    return () => {
      clearTimeout(timeoutId);
    }
  }, [message, onRemoveMessage])

  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container
      type={message.type}
      tabIndex={0}
      role="button"
      onClick={handleRemoveToast}
      isLeaving={isLeaving}
      ref={animatedElementRef}
    >
      {message.type === 'success' && <img src={checkCircle} alt="sucesso" />}
      {message.type === 'danger' && <img src={xCircle} alt="erro" />}
      <strong>{message.text}</strong>
    </Container>
  );
}

ToastMessage.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    type: PropTypes.oneOf(['default', 'success', 'danger']),
    text: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
  isLeaving: PropTypes.bool.isRequired,
  animatedElementRef: PropTypes.shape().isRequired,
};

export default memo(ToastMessage);
