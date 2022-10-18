import { useState, useEffect } from 'react';
import { Container } from './styles';

import ToastMessage from '../ToastMessage';

import { toastEventManager } from '../../../utils/toast';

export default function ToastContainer() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast)
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast)
    };
  }, []);

  function handleRemoveMessage(id) {
    setMessages(prevState => prevState.filter(message => message.id !== id))
  }

  return (
    <Container>
      {messages.map((message) => (
        <ToastMessage
          key={message.id}
          message={message}
          text={message.text}
          id={message.id}
          type={message.type || 'default'}
          onRemoveMessage={handleRemoveMessage}
        />
      ))}
    </Container>
  );
}
