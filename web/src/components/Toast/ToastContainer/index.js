import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    items,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  } = useToastContainer();

  return (
    <Container>
      {items.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          onAnimationEnd={handleAnimationEnd}
          isLeaving={pendingRemovalItemsIds.includes(message.id)}
        />
      ))}
    </Container>
  );
}
