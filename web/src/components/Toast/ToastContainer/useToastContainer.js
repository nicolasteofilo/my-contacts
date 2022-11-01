import { useEffect } from 'react';
import useAnimatedList from '../../../hooks/useAnimatedList';
import { toastEventManager } from '../../../utils/toast';

export default function useToastContainer() {
  const {
    handleAnimationEnd,
    handleRemoveItem,
    items,
    pendingRemovalItemsIds,
    setItems
  } = useAnimatedList();

  useEffect(() => {
    function handleAddToast({ type, text, duration }) {
      setItems((prevState) => [
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
  }, [setItems]);

  return {
    items,
    pendingRemovalItemsIds,
    handleRemoveItem,
    handleAnimationEnd,
  };
}
