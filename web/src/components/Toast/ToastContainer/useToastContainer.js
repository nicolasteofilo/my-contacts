import { useCallback, useEffect, useState } from "react";
import { toastEventManager } from "../../../utils/toast";

export default function useToastContainer() {
  const [messages, setMessages] = useState([]);
  const [pendingRemovalMessagesIds, setPendingRemovalMessagesIds] = useState([]);

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setMessages((prevState) => [
        ...prevState,
        {
          id: Math.random(),
          type,
          text,
          duration,
        },
      ]);
    }

    toastEventManager.on('addtoast', handleAddToast);
    return () => {
      toastEventManager.removeListener('addtoast', handleAddToast);
    };
  }, []);

  const handleRemoveMessage = useCallback((id) => {
    setPendingRemovalMessagesIds((prevState) => [...prevState, id]);
  }, []);

  const handleAnimationEnd = useCallback((id) => {
    setMessages((prevState) => prevState.filter((message) => message.id !==  id));
    setPendingRemovalMessagesIds((prevState) => prevState.filter((messageId) => messageId !==  id));
  }, [])

  return {
    messages,
    pendingRemovalMessagesIds,
    handleRemoveMessage,
    handleAnimationEnd,
  }
}
