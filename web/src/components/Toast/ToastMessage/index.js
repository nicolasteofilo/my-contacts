import PropTypes from 'prop-types';

import { Container } from './styles';

import xCircle from '../../../assets/images/icons/x-circle.svg';
import checkCircle from '../../../assets/images/icons/check-circle.svg';

export default function ToastMessage({ message, onRemoveMessage }) {
  function handleRemoveToast() {
    onRemoveMessage(message.id);
  }

  return (
    <Container type={message.type} onClick={handleRemoveToast}>
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
  }).isRequired,
  onRemoveMessage: PropTypes.func.isRequired,
};
