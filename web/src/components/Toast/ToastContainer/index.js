import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import useToastContainer from './useToastContainer';

export default function ToastContainer() {
  const {
    handleRemoveItem,
    renderList,
  } = useToastContainer();

  return (
    <Container>
      {renderList((message, { isLeaving, animatedElementRef }) => (
        <ToastMessage
          key={message.id}
          message={message}
          onRemoveMessage={handleRemoveItem}
          isLeaving={isLeaving}
          animatedElementRef={animatedElementRef}
        />
      ))}
    </Container>
  );
}
