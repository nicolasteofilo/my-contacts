import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    messages,
    pendingRemovalMessagesIds,
    handleRemoveMessage,
    handleAnimationEnd,
  } = useToastContainer();

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveMessage}
          onAnimationEnd={handleAnimationEnd}
          isLeaving={pendingRemovalMessagesIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
